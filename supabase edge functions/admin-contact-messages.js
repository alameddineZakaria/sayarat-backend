
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const sendgridApiKey = Deno.env.get('SENDGRID_API_KEY') || '';
    const emailFrom = Deno.env.get('EMAIL_FROM') || 'support@sayarat.com';

    const body = await req.json();
    const action = body.action || 'list';

    // List messages with filters
    if (action === 'list') {
      const status = body.status || '';
      const search = body.search || '';
      const limit = body.limit || 50;
      const offset = body.offset || 0;

      let query = `${supabaseUrl}/rest/v1/contact_messages?select=*&order=created_at.desc&limit=${limit}&offset=${offset}`;
      
      if (status && status !== 'all') {
        query += `&status=eq.${status}`;
      }
      
      if (search) {
        query += `&or=(name.ilike.*${search}*,email.ilike.*${search}*,subject.ilike.*${search}*,message.ilike.*${search}*)`;
      }

      const response = await fetch(query, {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Prefer': 'count=exact'
        }
      });

      const messages = await response.json();
      const totalCount = response.headers.get('content-range')?.split('/')[1] || '0';

      // Get stats
      const statsResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/get_contact_stats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`
        },
        body: JSON.stringify({})
      });

      let stats = { total: 0, new: 0, read: 0, replied: 0, archived: 0 };
      
      // Fallback: get stats manually if RPC doesn't exist
      const allMsgsResponse = await fetch(`${supabaseUrl}/rest/v1/contact_messages?select=status`, {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`
        }
      });
      
      if (allMsgsResponse.ok) {
        const allMsgs = await allMsgsResponse.json();
        stats.total = allMsgs.length;
        stats.new = allMsgs.filter((m: any) => m.status === 'new').length;
        stats.read = allMsgs.filter((m: any) => m.status === 'read').length;
        stats.replied = allMsgs.filter((m: any) => m.status === 'replied').length;
        stats.archived = allMsgs.filter((m: any) => m.status === 'archived').length;
      }

      return new Response(
        JSON.stringify({ success: true, messages, total: parseInt(totalCount), stats }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get single message
    if (action === 'get') {
      const id = body.id;
      if (!id) {
        return new Response(
          JSON.stringify({ success: false, error: 'Message ID required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const response = await fetch(`${supabaseUrl}/rest/v1/contact_messages?id=eq.${id}`, {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`
        }
      });

      const messages = await response.json();
      if (!messages.length) {
        return new Response(
          JSON.stringify({ success: false, error: 'Message not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: messages[0] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update message status
    if (action === 'update_status') {
      const id = body.id;
      const status = body.status;
      
      if (!id || !status) {
        return new Response(
          JSON.stringify({ success: false, error: 'ID and status required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const response = await fetch(`${supabaseUrl}/rest/v1/contact_messages?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({ status, updated_at: new Date().toISOString() })
      });

      const updated = await response.json();
      return new Response(
        JSON.stringify({ success: true, message: updated[0] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Add internal note
    if (action === 'add_note') {
      const id = body.id;
      const note = body.note;
      const adminId = body.admin_id;
      
      if (!id || !note) {
        return new Response(
          JSON.stringify({ success: false, error: 'ID and note required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get current notes
      const getResponse = await fetch(`${supabaseUrl}/rest/v1/contact_messages?id=eq.${id}&select=internal_notes`, {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`
        }
      });

      const current = await getResponse.json();
      const existingNotes = current[0]?.internal_notes || [];
      
      const newNote = {
        id: crypto.randomUUID(),
        text: note,
        admin_id: adminId,
        created_at: new Date().toISOString()
      };

      const updatedNotes = [...existingNotes, newNote];

      const response = await fetch(`${supabaseUrl}/rest/v1/contact_messages?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({ internal_notes: updatedNotes, updated_at: new Date().toISOString() })
      });

      const updated = await response.json();
      return new Response(
        JSON.stringify({ success: true, message: updated[0] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Reply to message via email
    if (action === 'reply') {
      const id = body.id;
      const replyText = body.reply;
      const adminId = body.admin_id;
      
      if (!id || !replyText) {
        return new Response(
          JSON.stringify({ success: false, error: 'ID and reply text required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get message details
      const getResponse = await fetch(`${supabaseUrl}/rest/v1/contact_messages?id=eq.${id}`, {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`
        }
      });

      const messages = await getResponse.json();
      if (!messages.length) {
        return new Response(
          JSON.stringify({ success: false, error: 'Message not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const msg = messages[0];

      // Send reply email
      if (sendgridApiKey) {
        const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sendgridApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: msg.email, name: msg.name }],
              subject: `Re: ${msg.subject} - Sayarat Support`
            }],
            from: { email: emailFrom, name: 'Sayarat Support' },
            reply_to: { email: 'support@sayarat.com', name: 'Sayarat Support' },
            content: [{
              type: 'text/html',
              value: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <div style="background: linear-gradient(135deg, #FF6B00, #FF8533); padding: 20px; text-align: center;">
                    <h1 style="color: white; margin: 0;">Sayarat</h1>
                  </div>
                  <div style="padding: 30px; background: #f9f9f9;">
                    <p style="color: #333;">Dear ${msg.name},</p>
                    <p style="color: #333;">Thank you for contacting us. Here is our response to your inquiry:</p>
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF6B00;">
                      ${replyText.replace(/\n/g, '<br>')}
                    </div>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;"><strong>Your original message:</strong></p>
                    <p style="color: #999; font-size: 12px; font-style: italic;">${msg.message}</p>
                  </div>
                  <div style="background: #333; padding: 20px; text-align: center;">
                    <p style="color: #999; font-size: 12px; margin: 0;">Sayarat - Your Trusted Car Marketplace</p>
                  </div>
                </div>
              `
            }]
          })
        });

        if (!emailResponse.ok) {
          console.error('Failed to send reply email');
        }
      }

      // Update message with reply info
      const replies = msg.replies || [];
      replies.push({
        id: crypto.randomUUID(),
        text: replyText,
        admin_id: adminId,
        sent_at: new Date().toISOString()
      });

      const updateResponse = await fetch(`${supabaseUrl}/rest/v1/contact_messages?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({ 
          status: 'replied', 
          replies,
          replied_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      });

      const updated = await updateResponse.json();
      return new Response(
        JSON.stringify({ success: true, message: updated[0] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'An error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
