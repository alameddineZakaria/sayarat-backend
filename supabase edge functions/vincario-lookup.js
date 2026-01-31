
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

// SHA1 hash function for control sum generation - returns first 10 characters
async function sha1First10(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const fullHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return fullHash.substring(0, 10);
}

interface VehicleHistoryReport {
  success: boolean;
  vin: string;
  year?: string;
  make?: string;
  model?: string;
  trim?: string;
  style?: string;
  engine?: string;
  transmission?: string;
  drivetrain?: string;
  fuel?: string;
  specs?: {
    powerKw?: number;
    powerHp?: number;
    displacement?: number;
    doors?: number;
    seats?: number;
    maxSpeed?: number;
    fuelConsumption?: number;
    co2Emission?: number;
  };
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    wheelbase?: number;
  };
  manufacturing?: {
    manufacturer?: string;
    plantCountry?: string;
    productionYear?: number;
    vehicleType?: string;
  };
  stolenCheck?: {
    isStolen: boolean;
    date?: string;
    country?: string;
    status?: string;
  };
  marketValue?: {
    below: number;
    average: number;
    above: number;
    currency?: string;
  };
  balance?: {
    decode?: number;
    stolenCheck?: number;
    marketValue?: number;
  };
  error?: string;
  isPaid?: boolean;
  purchaseId?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { vin, reportType = 'full', action = 'decode', paymentIntentId, purchaseId } = body;

    const apiKey = Deno.env.get("VINCARIO_API_KEY");
    const secretKey = Deno.env.get("VINCARIO_SECRET_KEY");
    
    console.log(`=== Vincario API Request ===`);
    console.log(`Action: ${action}`);
    console.log(`API Key: ${apiKey}`);
    console.log(`Secret Key: ${secretKey ? secretKey.substring(0, 4) + '...' : 'NOT SET'}`);
    
    // If no API keys, return demo data
    if (!apiKey || !secretKey) {
      console.log('No credentials - returning demo data');
      if (action === 'balance') {
        return new Response(JSON.stringify({ 
          success: true, 
          balance: { decode: 0, stolenCheck: 0, marketValue: 0 },
          message: 'Demo mode - no API credentials configured'
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
      return new Response(JSON.stringify(generateDemoReport(vin || 'DEMO12345678901234')), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Handle balance check (no VIN required)
    if (action === 'balance') {
      const controlString = `balance|${apiKey}|${secretKey}`;
      const controlSum = await sha1First10(controlString);
      const url = `https://api.vincario.com/3.2/${apiKey}/${controlSum}/balance.json`;
      
      console.log(`Balance URL: ${url}`);
      
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'VehicleMarketplace/1.0'
          }
        });
        
        console.log(`Balance response status: ${response.status}`);
        const text = await response.text();
        console.log(`Balance response body: ${text}`);
        
        if (!response.ok) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: `API returned ${response.status}: ${text}`,
            url: url,
            controlSum: controlSum
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        const data = JSON.parse(text);
        return new Response(JSON.stringify({ 
          success: true, 
          balance: data.balance || data
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      } catch (fetchError) {
        console.error(`Fetch error: ${fetchError.message}`);
        return new Response(JSON.stringify({ 
          success: false, 
          error: `Network error: ${fetchError.message}`,
          url: url
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }

    // For decode action, VIN is required
    if (!vin) {
      throw new Error('VIN is required for decode action');
    }

    // Validate VIN format
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
    if (!vinRegex.test(vin)) {
      throw new Error('Invalid VIN format');
    }

    const upperVin = vin.toUpperCase();
    
    // Control sum for decode: SHA1(VIN|decode|API_KEY|SECRET_KEY) - first 10 chars
    const controlString = `${upperVin}|decode|${apiKey}|${secretKey}`;
    const controlSum = await sha1First10(controlString);
    const url = `https://api.vincario.com/3.2/${apiKey}/${controlSum}/decode/${upperVin}.json`;
    
    console.log(`Decode VIN: ${upperVin}`);
    console.log(`Decode control sum: ${controlSum}`);
    console.log(`Decode URL: ${url}`);
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'VehicleMarketplace/1.0'
        }
      });
      
      console.log(`Decode response status: ${response.status}`);
      const text = await response.text();
      console.log(`Decode response (first 500): ${text.substring(0, 500)}`);
      
      if (!response.ok) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: `API returned ${response.status}: ${text.substring(0, 200)}`,
          url: url
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
      
      const data = JSON.parse(text);
      
      if (data.error) {
        throw new Error(`Vincario error: ${data.error}`);
      }
      
      const report = transformVincarioResponse(data, upperVin);
      report.isPaid = !!paymentIntentId;
      report.purchaseId = purchaseId;
      
      // Add balance info if available
      if (data.balance) {
        report.balance = {
          decode: data.balance['API Decode'],
          stolenCheck: data.balance['API Stolen Check'],
          marketValue: data.balance['API Vehicle Market Value']
        };
      }
      
      // Stolen check (only for full report type)
      if (reportType === 'full') {
        try {
          const stolenControlString = `${upperVin}|stolen-check|${apiKey}|${secretKey}`;
          const stolenControlSum = await sha1First10(stolenControlString);
          const stolenUrl = `https://api.vincario.com/3.2/${apiKey}/${stolenControlSum}/stolen-check/${upperVin}.json`;
          
          const stolenResponse = await fetch(stolenUrl, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });
          
          if (stolenResponse.ok) {
            const stolenData = await stolenResponse.json();
            if (stolenData && !stolenData.error) {
              report.stolenCheck = {
                isStolen: stolenData.stolen === true || stolenData.stolen === 1,
                status: stolenData.stolen ? 'STOLEN' : 'Clear'
              };
            }
          }
        } catch (e) {
          console.log(`Stolen check skipped: ${e.message}`);
        }
        
        // Market value (only for full report type)
        try {
          const mvControlString = `${upperVin}|vehicle-market-value|${apiKey}|${secretKey}`;
          const mvControlSum = await sha1First10(mvControlString);
          const mvUrl = `https://api.vincario.com/3.2/${apiKey}/${mvControlSum}/vehicle-market-value/${upperVin}.json`;
          
          const mvResponse = await fetch(mvUrl, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });
          
          if (mvResponse.ok) {
            const mvData = await mvResponse.json();
            if (mvData && !mvData.error && mvData.price_avg) {
              report.marketValue = {
                below: mvData.price_below || 0,
                average: mvData.price_avg || 0,
                above: mvData.price_above || 0,
                currency: mvData.price_currency || 'EUR'
              };
            }
          }
        } catch (e) {
          console.log(`Market value skipped: ${e.message}`);
        }
      }

      // If this is a paid report, save the report data to the purchase record
      if (paymentIntentId || purchaseId) {
        const supabaseUrl = Deno.env.get("SUPABASE_URL");
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
        
        if (supabaseUrl && supabaseKey) {
          const updateField = purchaseId ? 'id' : 'payment_intent_id';
          const updateValue = purchaseId || paymentIntentId;
          
          await fetch(`${supabaseUrl}/rest/v1/vin_report_purchases?${updateField}=eq.${updateValue}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              report_data: report,
              payment_status: 'completed',
              completed_at: new Date().toISOString()
            })
          });
        }
      }
      
      return new Response(JSON.stringify(report), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
      
    } catch (fetchError) {
      console.error(`Fetch error: ${fetchError.message}`);
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Network error: ${fetchError.message}`
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

  } catch (error) {
    console.error('Error:', error.message);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});

function transformVincarioResponse(data: any, vin: string): VehicleHistoryReport {
  let vehicleData: Record<string, any> = {};
  
  if (data.decode && Array.isArray(data.decode)) {
    data.decode.forEach((item: any) => {
      if (item.label && item.value !== undefined) {
        vehicleData[item.label] = item.value;
      }
    });
  } else if (Array.isArray(data)) {
    data.forEach((item: any) => {
      if (item.label && item.value !== undefined) {
        vehicleData[item.label] = item.value;
      }
    });
  } else {
    vehicleData = data;
  }

  let engineDesc = '';
  if (vehicleData['Engine Displacement (ccm)']) {
    engineDesc += `${(vehicleData['Engine Displacement (ccm)'] / 1000).toFixed(1)}L `;
  }
  if (vehicleData['Engine Power (HP)']) {
    engineDesc += `${vehicleData['Engine Power (HP)']}hp `;
  }
  if (vehicleData['Fuel Type - Primary']) {
    engineDesc += vehicleData['Fuel Type - Primary'];
  }

  return {
    success: true,
    vin: vin,
    year: vehicleData['Model Year']?.toString(),
    make: vehicleData['Make'],
    model: vehicleData['Model'],
    trim: vehicleData['Trim'] || vehicleData['Version'],
    style: vehicleData['Body'],
    engine: engineDesc.trim() || vehicleData['Engine (full)'],
    transmission: vehicleData['Transmission'],
    drivetrain: vehicleData['Drive'],
    fuel: vehicleData['Fuel Type - Primary'],
    specs: {
      powerKw: vehicleData['Engine Power (kW)'],
      powerHp: vehicleData['Engine Power (HP)'],
      displacement: vehicleData['Engine Displacement (ccm)'],
      doors: vehicleData['Number of Doors'],
      seats: parseInt(vehicleData['Number of Seats']) || undefined,
      maxSpeed: vehicleData['Max Speed (km/h)'],
      fuelConsumption: vehicleData['Fuel Consumption Combined (l/100km)'],
      co2Emission: vehicleData['CO2 Emission (g/km)']
    },
    dimensions: {
      length: vehicleData['Length (mm)'],
      width: vehicleData['Width (mm)'],
      height: vehicleData['Height (mm)'],
      wheelbase: vehicleData['Wheelbase (mm)']
    },
    manufacturing: {
      manufacturer: vehicleData['Manufacturer'],
      plantCountry: vehicleData['Plant Country'],
      productionYear: vehicleData['Production Started'],
      vehicleType: vehicleData['Product Type']
    },
    stolenCheck: { isStolen: false, status: 'Not checked' }
  };
}

function generateDemoReport(vin: string): VehicleHistoryReport {
  const year = 2020 + (parseInt(vin.charAt(9), 36) % 5);
  const makes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes-Benz'];
  const models: Record<string, string[]> = {
    'Toyota': ['Camry', 'Corolla', 'RAV4'],
    'Honda': ['Accord', 'Civic', 'CR-V'],
    'Ford': ['F-150', 'Mustang', 'Explorer'],
    'BMW': ['3 Series', '5 Series', 'X3'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC']
  };
  
  const make = makes[parseInt(vin.charAt(1), 36) % makes.length];
  const model = models[make][parseInt(vin.charAt(2), 36) % models[make].length];
  
  return {
    success: true,
    vin: vin,
    year: year.toString(),
    make: make,
    model: model,
    trim: 'SE',
    style: 'Sedan',
    engine: '2.5L 180hp Gasoline',
    transmission: 'Automatic',
    drivetrain: 'FWD',
    fuel: 'Gasoline',
    specs: { powerKw: 132, powerHp: 180, displacement: 2500, doors: 4, seats: 5, maxSpeed: 210, fuelConsumption: 7.5, co2Emission: 175 },
    dimensions: { length: 4885, width: 1840, height: 1455, wheelbase: 2825 },
    manufacturing: { manufacturer: make, plantCountry: 'Japan', productionYear: year, vehicleType: 'Passenger Car' },
    stolenCheck: { isStolen: false, status: 'Clear - Not reported stolen' },
    marketValue: { below: 18500, average: 22000, above: 25500, currency: 'USD' }
  };
}
