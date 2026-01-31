
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

async function deleteFromTable(supabaseUrl: string, supabaseKey: string, table: string): Promise<string> {
  try {
    // Delete all rows where id is not null (matches all rows)
    const response = await fetch(`${supabaseUrl}/rest/v1/${table}?id=not.is.null`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
        'Prefer': 'return=representation',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return `error: ${response.status} - ${errorText}`;
    }
    
    const data = await response.json();
    return `cleared (${Array.isArray(data) ? data.length : 0} rows)`;
  } catch (e) {
    return `error: ${(e as Error).message}`;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing environment variables');
    }

    let body: { type?: string } = {};
    try {
      body = await req.json();
    } catch {
      body = { type: 'all' };
    }
    
    const type = body?.type || 'all';
    const result: Record<string, string> = {};

    if (type === 'messages' || type === 'all') {
      result.messages = await deleteFromTable(supabaseUrl, supabaseServiceKey, 'messages');
      result.conversations = await deleteFromTable(supabaseUrl, supabaseServiceKey, 'conversations');
      result.archived_conversations = await deleteFromTable(supabaseUrl, supabaseServiceKey, 'archived_conversations');
      result.muted_conversations = await deleteFromTable(supabaseUrl, supabaseServiceKey, 'muted_conversations');
      result.deleted_conversations = await deleteFromTable(supabaseUrl, supabaseServiceKey, 'deleted_conversations');
    }

    if (type === 'offers' || type === 'all') {
      result.offer_messages = await deleteFromTable(supabaseUrl, supabaseServiceKey, 'offer_messages');
      result.offer_notifications = await deleteFromTable(supabaseUrl, supabaseServiceKey, 'offer_notifications');
      result.offers = await deleteFromTable(supabaseUrl, supabaseServiceKey, 'offers');
    }

    return new Response(
      JSON.stringify({ success: true, result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
