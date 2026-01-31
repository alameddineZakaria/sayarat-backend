import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  console.log('Env check - hasUrl:', !!supabaseUrl, 'hasKey:', !!supabaseServiceKey);

  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(
      JSON.stringify({ error: 'Server configuration error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  console.log('Parsing body...');
  const body = await req.json();
  const { base64Audio, fileName: providedFileName, userId } = body;
  
  if (!base64Audio) {
    return new Response(
      JSON.stringify({ error: 'No audio data provided' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  const fileName = providedFileName || `voice_${userId || 'anon'}_${Date.now()}.m4a`;
  console.log('File name:', fileName, 'base64 length:', base64Audio.length);
  
  // Decode base64 using globalThis.atob
  console.log('Decoding base64...');
  const binaryStr = globalThis.atob(base64Audio);
  console.log('Binary string length:', binaryStr.length);
  
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  console.log('Bytes array length:', bytes.length);

  console.log('Uploading to storage...');
  const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
    .from('voice-messages')
    .upload(fileName, bytes, {
      contentType: 'audio/m4a',
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return new Response(
      JSON.stringify({ error: 'Upload failed', details: uploadError.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  console.log('Upload success:', uploadData);

  const { data: urlData } = supabaseAdmin.storage
    .from('voice-messages')
    .getPublicUrl(fileName);

  console.log('Public URL:', urlData.publicUrl);

  return new Response(
    JSON.stringify({
      success: true,
      path: uploadData.path,
      publicUrl: urlData.publicUrl,
    }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
});
