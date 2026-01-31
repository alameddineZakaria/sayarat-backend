
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

const BOOST_DURATIONS = {
  '1_day': 1,
  '3_days': 3,
  '1_week': 7
};

const BOOST_AMOUNTS = {
  '1_day': 5,
  '3_days': 12,
  '1_week': 25
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { paymentIntentId, boostType, vehicleId, userId } = await req.json();

    if (!paymentIntentId || !boostType || !vehicleId || !userId) {
      throw new Error('Missing required fields');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Calculate end date based on boost type
    const days = BOOST_DURATIONS[boostType as keyof typeof BOOST_DURATIONS] || 1;
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    // Create boost record
    const { data: boost, error: boostError } = await supabase
      .from('listing_boosts')
      .insert({
        vehicle_id: vehicleId,
        user_id: userId,
        boost_type: boostType,
        end_date: endDate.toISOString(),
        amount_paid: BOOST_AMOUNTS[boostType as keyof typeof BOOST_AMOUNTS] || 5,
        status: 'active',
        payment_intent_id: paymentIntentId,
        impressions: 0,
        clicks: 0,
        inquiries: 0
      })
      .select()
      .single();

    if (boostError) throw boostError;

    // Update vehicle to mark as boosted
    const { error: vehicleError } = await supabase
      .from('vehicles')
      .update({ 
        is_boosted: true, 
        boost_end_date: endDate.toISOString() 
      })
      .eq('id', vehicleId);

    if (vehicleError) {
      console.error('Error updating vehicle:', vehicleError);
    }

    return new Response(JSON.stringify({
      success: true,
      boost: {
        id: boost.id,
        endDate: endDate.toISOString(),
        boostType,
        daysRemaining: days
      }
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});
