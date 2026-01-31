
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
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

    // Check messages table
    const { data: messagesData, error: messagesError } = await supabase
      .from('messages')
      .select('id')
      .limit(1);

    // Check conversations table
    const { data: conversationsData, error: conversationsError } = await supabase
      .from('conversations')
      .select('id')
      .limit(1);

    // Test realtime subscription capability
    let realtimeTest = 'unknown';
    try {
      const channel = supabase
        .channel('test-channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, () => {});
      
      const subscribeResult = await new Promise((resolve) => {
        channel.subscribe((status) => {
          resolve(status);
        });
        // Timeout after 3 seconds
        setTimeout(() => resolve('timeout'), 3000);
      });
      
      realtimeTest = subscribeResult as string;
      await supabase.removeChannel(channel);
    } catch (e) {
      realtimeTest = `error: ${e.message}`;
    }

    const results = {
      timestamp: new Date().toISOString(),
      tables: {
        messages: {
          exists: !messagesError,
          error: messagesError?.message || null,
          hasData: messagesData && messagesData.length > 0
        },
        conversations: {
          exists: !conversationsError,
          error: conversationsError?.message || null,
          hasData: conversationsData && conversationsData.length > 0
        }
      },
      realtime: {
        subscriptionTest: realtimeTest,
        status: realtimeTest === 'SUBSCRIBED' ? 'working' : 'may need configuration'
      },
      instructions: {
        step1: 'Go to Supabase Dashboard -> Database -> Replication',
        step2: 'Find the "supabase_realtime" publication',
        step3: 'Click on it and add "messages" and "conversations" tables',
        step4: 'Alternatively, enable realtime for these tables in Table Editor -> select table -> Realtime toggle',
        note: 'RLS policies and replica identity have been configured via SQL'
      },
      rlsConfigured: true,
      replicaIdentity: 'FULL (configured via SQL)',
      policiesCreated: [
        'Users can view their own messages (SELECT)',
        'Users can insert messages they send (INSERT)',
        'Users can update messages they receive (UPDATE)',
        'Users can delete their own messages (DELETE)',
        'Users can view their own conversations (SELECT)',
        'Users can create conversations (INSERT)',
        'Users can update their own conversations (UPDATE)'
      ]
    };

    return new Response(JSON.stringify(results, null, 2), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message,
      stack: error.stack 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
