
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Verify user is admin
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );
    
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!adminUser) {
      throw new Error('Not an admin user');
    }

    const { action, period = '30d' } = await req.json();

    // Calculate date range
    let startDate = new Date();
    if (period === '7d') startDate.setDate(startDate.getDate() - 7);
    else if (period === '30d') startDate.setDate(startDate.getDate() - 30);
    else if (period === '90d') startDate.setDate(startDate.getDate() - 90);
    else if (period === '1y') startDate.setFullYear(startDate.getFullYear() - 1);

    if (action === 'dashboard_stats') {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get new users in period
      const { count: newUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startDate.toISOString());

      // Get total listings
      const { count: totalListings } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact', head: true });

      // Get active listings
      const { count: activeListings } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      // Get new listings in period
      const { count: newListings } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startDate.toISOString());

      // Get total dealers
      const { count: totalDealers } = await supabase
        .from('dealers')
        .select('*', { count: 'exact', head: true });

      // Get verified dealers
      const { count: verifiedDealers } = await supabase
        .from('dealers')
        .select('*', { count: 'exact', head: true })
        .eq('verified', true);

      // Get pending reports
      const { count: pendingUserReports } = await supabase
        .from('user_reports')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const { count: pendingListingReports } = await supabase
        .from('listing_reports')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Get boost revenue
      const { data: boostData } = await supabase
        .from('listing_boosts')
        .select('amount_paid')
        .gte('created_at', startDate.toISOString())
        .eq('status', 'active');

      const boostRevenue = boostData?.reduce((sum, b) => sum + (b.amount_paid || 0), 0) || 0;

      // Get total messages
      const { count: totalMessages } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startDate.toISOString());

      // Get active promo codes
      const { count: activePromoCodes } = await supabase
        .from('promo_codes')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      return new Response(JSON.stringify({
        success: true,
        stats: {
          users: {
            total: totalUsers || 0,
            new: newUsers || 0,
            dealers: totalDealers || 0,
            verifiedDealers: verifiedDealers || 0
          },
          listings: {
            total: totalListings || 0,
            active: activeListings || 0,
            new: newListings || 0
          },
          reports: {
            pendingUsers: pendingUserReports || 0,
            pendingListings: pendingListingReports || 0,
            total: (pendingUserReports || 0) + (pendingListingReports || 0)
          },
          revenue: {
            boosts: boostRevenue,
            period
          },
          engagement: {
            messages: totalMessages || 0,
            activePromoCodes: activePromoCodes || 0
          }
        }
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });

    } else if (action === 'get_users') {
      const { page = 1, limit = 20, search, filter } = await req.json();
      const offset = (page - 1) * limit;

      let query = supabase
        .from('profiles')
        .select('*, dealers(*), user_bans(*), user_verifications(*)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (search) {
        query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
      }

      const { data: users, count, error } = await query;

      if (error) throw error;

      return new Response(JSON.stringify({
        success: true,
        users,
        total: count,
        page,
        limit
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });

    } else if (action === 'get_listings') {
      const { page = 1, limit = 20, status, search } = await req.json();
      const offset = (page - 1) * limit;

      let query = supabase
        .from('vehicles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (status) {
        query = query.eq('status', status);
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,make.ilike.%${search}%,model.ilike.%${search}%`);
      }

      const { data: listings, count, error } = await query;

      if (error) throw error;

      return new Response(JSON.stringify({
        success: true,
        listings,
        total: count,
        page,
        limit
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });

    } else if (action === 'get_reports') {
      const { type = 'all', status = 'pending' } = await req.json();

      let userReports = [];
      let listingReports = [];

      if (type === 'all' || type === 'users') {
        const { data } = await supabase
          .from('user_reports')
          .select('*, profiles:reported_user_id(*)')
          .eq('status', status)
          .order('created_at', { ascending: false });
        userReports = data || [];
      }

      if (type === 'all' || type === 'listings') {
        const { data } = await supabase
          .from('listing_reports')
          .select('*, vehicles:listing_id(*)')
          .eq('status', status)
          .order('created_at', { ascending: false });
        listingReports = data || [];
      }

      return new Response(JSON.stringify({
        success: true,
        userReports,
        listingReports
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });

    } else {
      throw new Error('Invalid action');
    }

  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});
