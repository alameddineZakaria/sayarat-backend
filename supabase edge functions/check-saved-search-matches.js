export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  search_query: string | null;
  filters: {
    make?: string;
    bodyType?: string;
    priceRange?: string;
    location?: string;
    condition?: string;
    transmission?: string;
    fuelType?: string;
    minPrice?: string;
    maxPrice?: string;
    minYear?: string;
    maxYear?: string;
    distance?: number;
    color?: string;
  };
  notify_new_matches: boolean;
  last_notified_at: string | null;
  match_count: number;
  current_match_count: number;
  new_matches_since_view: number;
}

interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  body_type: string;
  location: string;
  condition: string;
  transmission: string;
  fuel_type: string;
  images: string[];
  created_at: string;
  specs?: {
    color?: string;
  };
  latitude?: number;
  longitude?: number;
}

interface UserProfile {
  id: string;
  full_name: string;
  language?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { vehicle_id } = await req.json();

    if (!vehicle_id) {
      return new Response(
        JSON.stringify({ error: 'vehicle_id is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Get the new vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', vehicle_id)
      .single();

    if (vehicleError || !vehicle) {
      return new Response(
        JSON.stringify({ error: 'Vehicle not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Get all saved searches with notifications enabled
    const { data: savedSearches, error: searchesError } = await supabase
      .from('saved_searches')
      .select('*')
      .eq('notify_new_matches', true);

    if (searchesError) {
      throw searchesError;
    }

    const matchedSearches: SavedSearch[] = [];
    const userIds = new Set<string>();

    // Check each saved search for matches
    for (const search of savedSearches || []) {
      if (vehicleMatchesSearch(vehicle, search)) {
        matchedSearches.push(search);
        userIds.add(search.user_id);
        
        // Record the match
        await supabase
          .from('saved_search_matches')
          .upsert({
            saved_search_id: search.id,
            vehicle_id: vehicle_id,
            notified: false,
          }, { onConflict: 'saved_search_id,vehicle_id' });

        // Update new_matches_since_view counter
        await supabase
          .from('saved_searches')
          .update({ 
            new_matches_since_view: (search.new_matches_since_view || 0) + 1,
            current_match_count: (search.current_match_count || 0) + 1,
          })
          .eq('id', search.id);
      }
    }

    // Get user profiles for language preferences
    const userProfiles: Map<string, UserProfile> = new Map();
    if (userIds.size > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, language')
        .in('id', Array.from(userIds));
      
      if (profiles) {
        for (const profile of profiles) {
          userProfiles.set(profile.id, profile);
        }
      }
    }

    // Also check user_preferences for language
    const userLanguages: Map<string, string> = new Map();
    if (userIds.size > 0) {
      const { data: prefs } = await supabase
        .from('user_preferences')
        .select('user_id, language')
        .in('user_id', Array.from(userIds));
      
      if (prefs) {
        for (const pref of prefs) {
          if (pref.language) {
            userLanguages.set(pref.user_id, pref.language);
          }
        }
      }
    }

    // Format price for display
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(vehicle.price);

    const formattedPriceAr = new Intl.NumberFormat('ar-LB', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(vehicle.price);

    // Send notifications for matched searches
    const notificationPromises = matchedSearches.map(async (search) => {
      const userLanguage = userLanguages.get(search.user_id) || 'en';
      
      // Create in-app notification
      await supabase.from('notifications').insert({
        user_id: search.user_id,
        type: 'saved_search_match',
        title: userLanguage === 'ar' ? 'مركبة جديدة مطابقة!' : 'New Vehicle Match!',
        message: userLanguage === 'ar' 
          ? `${vehicle.year} ${vehicle.make} ${vehicle.model} يطابق بحثك المحفوظ "${search.name}" - ${formattedPriceAr}`
          : `A ${vehicle.year} ${vehicle.make} ${vehicle.model} matches your saved search "${search.name}" - ${formattedPrice}`,
        data: {
          vehicle_id: vehicle.id,
          vehicle_title: vehicle.title,
          vehicle_make: vehicle.make,
          vehicle_model: vehicle.model,
          vehicle_year: vehicle.year,
          vehicle_price: vehicle.price,
          formatted_price: formattedPrice,
          image_url: vehicle.images?.[0] || null,
          saved_search_id: search.id,
          saved_search_name: search.name,
          location: vehicle.location,
          deep_link: `/vehicle/${vehicle.id}`,
        },
        is_read: false,
      });

      // Update saved search last_notified_at and increment match_count
      await supabase
        .from('saved_searches')
        .update({ 
          last_notified_at: new Date().toISOString(),
          match_count: (search.match_count || 0) + 1,
        })
        .eq('id', search.id);

      // Mark match as notified
      await supabase
        .from('saved_search_matches')
        .update({ notified: true })
        .eq('saved_search_id', search.id)
        .eq('vehicle_id', vehicle_id);

      // Send push notification with proper payload
      try {
        const pushResponse = await fetch(`${supabaseUrl}/functions/v1/send-push-notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify({
            userId: search.user_id,
            title: 'New Vehicle Match!',
            titleAr: 'مركبة جديدة مطابقة!',
            body: `${vehicle.year} ${vehicle.make} ${vehicle.model} - ${formattedPrice}\nMatches "${search.name}"`,
            bodyAr: `${vehicle.year} ${vehicle.make} ${vehicle.model} - ${formattedPriceAr}\nيطابق "${search.name}"`,
            type: 'saved_search_match',
            data: {
              type: 'saved_search_match',
              vehicleId: vehicle.id,
              savedSearchId: search.id,
              vehicleTitle: vehicle.title,
              vehicleMake: vehicle.make,
              vehicleModel: vehicle.model,
              vehicleYear: vehicle.year,
              vehiclePrice: vehicle.price,
              formattedPrice: formattedPrice,
              imageUrl: vehicle.images?.[0] || null,
              savedSearchName: search.name,
              location: vehicle.location,
              deepLink: `/vehicle/${vehicle.id}`,
            },
          }),
        });

        if (!pushResponse.ok) {
          const errorText = await pushResponse.text();
          console.log(`Push notification failed for user ${search.user_id}:`, errorText);
        } else {
          const result = await pushResponse.json();
          console.log(`Push notification sent for user ${search.user_id}:`, result);
        }
      } catch (pushError) {
        console.log('Push notification failed (non-blocking):', pushError);
      }
    });

    await Promise.all(notificationPromises);

    return new Response(
      JSON.stringify({ 
        success: true, 
        matched_searches: matchedSearches.length,
        vehicle_id: vehicle_id,
        vehicle_title: vehicle.title,
        users_notified: userIds.size,
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error) {
    console.error('Error checking saved search matches:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
});

function vehicleMatchesSearch(vehicle: Vehicle, search: SavedSearch): boolean {
  const filters = search.filters || {};
  
  // Check search query
  if (search.search_query) {
    const query = search.search_query.toLowerCase();
    const searchableText = `${vehicle.title} ${vehicle.make} ${vehicle.model}`.toLowerCase();
    if (!searchableText.includes(query)) {
      return false;
    }
  }

  // Check make filter
  if (filters.make && filters.make !== 'All Makes') {
    if (vehicle.make !== filters.make) return false;
  }

  // Check body type filter
  if (filters.bodyType && filters.bodyType !== 'All Types') {
    if (vehicle.body_type !== filters.bodyType) return false;
  }

  // Check location filter
  if (filters.location && filters.location !== 'All Locations') {
    if (vehicle.location !== filters.location) return false;
  }

  // Check condition filter
  if (filters.condition && filters.condition !== 'All') {
    if (vehicle.condition !== filters.condition) return false;
  }

  // Check transmission filter
  if (filters.transmission && filters.transmission !== 'All') {
    if (vehicle.transmission !== filters.transmission) return false;
  }

  // Check fuel type filter
  if (filters.fuelType && filters.fuelType !== 'All') {
    if (vehicle.fuel_type !== filters.fuelType) return false;
  }

  // Check color filter
  if (filters.color && filters.color !== 'All Colors') {
    const vehicleColor = vehicle.specs?.color?.toLowerCase() || '';
    const filterColor = filters.color.toLowerCase();
    if (!vehicleColor.includes(filterColor)) {
      return false;
    }
  }

  // Check min price filter
  if (filters.minPrice) {
    const minPrice = parseInt(filters.minPrice);
    if (!isNaN(minPrice) && vehicle.price < minPrice) {
      return false;
    }
  }

  // Check max price filter
  if (filters.maxPrice) {
    const maxPrice = parseInt(filters.maxPrice);
    if (!isNaN(maxPrice) && vehicle.price > maxPrice) {
      return false;
    }
  }

  // Check min year filter
  if (filters.minYear && filters.minYear !== 'Any') {
    const minYear = parseInt(filters.minYear);
    if (!isNaN(minYear) && vehicle.year < minYear) {
      return false;
    }
  }

  // Check max year filter
  if (filters.maxYear && filters.maxYear !== 'Any') {
    const maxYear = parseInt(filters.maxYear);
    if (!isNaN(maxYear) && vehicle.year > maxYear) {
      return false;
    }
  }

  // Check legacy price range filter (for backwards compatibility)
  if (filters.priceRange && filters.priceRange !== 'Any Price' && !filters.minPrice && !filters.maxPrice) {
    const price = vehicle.price;
    switch (filters.priceRange) {
      case 'Under $30,000':
        if (price >= 30000) return false;
        break;
      case '$30,000 - $50,000':
        if (price < 30000 || price > 50000) return false;
        break;
      case '$50,000 - $80,000':
        if (price < 50000 || price > 80000) return false;
        break;
      case '$80,000 - $120,000':
        if (price < 80000 || price > 120000) return false;
        break;
      case '$120,000 - $200,000':
        if (price < 120000 || price > 200000) return false;
        break;
      case 'Over $200,000':
        if (price <= 200000) return false;
        break;
    }
  }

  // Note: Distance filter is not checked server-side as it requires user's current location
  // which changes over time. Distance filtering should be done client-side when running the search.

  return true;
}
