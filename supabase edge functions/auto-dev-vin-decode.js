export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { vin } = await req.json();

    // Validate VIN format
    if (!vin || typeof vin !== 'string') {
      return new Response(
        JSON.stringify({ error: 'VIN is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // VIN must be exactly 17 characters
    const cleanVin = vin.trim().toUpperCase();
    if (cleanVin.length !== 17) {
      return new Response(
        JSON.stringify({ error: 'VIN must be exactly 17 characters' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // VIN cannot contain I, O, Q
    if (/[IOQ]/i.test(cleanVin)) {
      return new Response(
        JSON.stringify({ error: 'VIN cannot contain letters I, O, or Q' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Get API key from environment
    const apiKey = Deno.env.get('AUTO_DEV_API_KEY');
    if (!apiKey) {
      console.error('AUTO_DEV_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'VIN decode service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Call Auto.dev VIN Decode API
    const apiUrl = `https://api.auto.dev/vin/${cleanVin}`;
    console.log(`Calling Auto.dev API for VIN: ${cleanVin}`);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const responseText = await response.text();
    console.log(`Auto.dev API response status: ${response.status}`);

    if (!response.ok) {
      let errorMessage = 'Failed to decode VIN';
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        // Use default error message
      }
      
      return new Response(
        JSON.stringify({ 
          error: errorMessage,
          status: response.status 
        }),
        { status: response.status, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Parse successful response
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid response from VIN decode service' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Check if VIN is valid
    if (data.vinValid === false) {
      return new Response(
        JSON.stringify({ error: 'Invalid VIN number', vinValid: false }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Map body type to our app's body types
    const bodyTypeMapping: Record<string, string> = {
      'Sedan': 'Sedan',
      'SUV': 'SUV',
      'Truck': 'Pickup',
      'Pickup': 'Pickup',
      'Coupe': 'Coupe',
      'Convertible': 'Convertible',
      'Hatchback': 'Hatchback',
      'Wagon': 'Wagon',
      'Van': 'Van',
      'Minivan': 'Van',
      'Crossover': 'SUV',
    };

    // Map transmission
    const transmissionMapping: Record<string, string> = {
      'Automatic': 'Automatic',
      'Manual': 'Manual',
      'CVT': 'Automatic',
      'Automated Manual': 'Automatic',
      'Direct Drive': 'Automatic',
    };

    // Map drive type
    const driveMapping: Record<string, string> = {
      'FWD': 'FWD',
      'RWD': 'RWD',
      'AWD': 'AWD',
      '4WD': '4WD',
      '4x4': '4WD',
      '4X4': '4WD',
      'Front-Wheel Drive': 'FWD',
      'Rear-Wheel Drive': 'RWD',
      'All-Wheel Drive': 'AWD',
      'Four-Wheel Drive': '4WD',
    };

    // Extract and normalize data
    const vehicleData = {
      vin: cleanVin,
      vinValid: data.vinValid,
      make: data.make || '',
      model: data.model || '',
      year: data.vehicle?.year?.toString() || '',
      trim: data.trim || '',
      style: data.style || '',
      bodyType: bodyTypeMapping[data.body] || data.body || '',
      engine: data.engine || '',
      transmission: transmissionMapping[data.transmission] || data.transmission || 'Automatic',
      drivetrain: driveMapping[data.drive] || data.drive || '',
      manufacturer: data.vehicle?.manufacturer || '',
      origin: data.origin || '',
      // Raw data for reference
      raw: {
        wmi: data.wmi,
        squishVin: data.squishVin,
        checkDigit: data.checkDigit,
        checksum: data.checksum,
        type: data.type,
        ambiguous: data.ambiguous,
      }
    };

    console.log(`VIN decoded successfully: ${vehicleData.year} ${vehicleData.make} ${vehicleData.model}`);

    return new Response(
      JSON.stringify({
        success: true,
        data: vehicleData
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error) {
    console.error('VIN decode error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
});
