
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

interface VINAuditResponse {
  success: boolean;
  vin?: string;
  year?: string;
  make?: string;
  model?: string;
  trim?: string;
  style?: string;
  engine?: string;
  transmission?: string;
  drivetrain?: string;
  fuel?: string;
  titleRecords?: Array<{
    date: string;
    state: string;
    odometer: string;
    titleType: string;
    brand?: string;
  }>;
  accidentRecords?: Array<{
    date: string;
    location: string;
    description: string;
    severity?: string;
  }>;
  salvageRecords?: Array<{
    date: string;
    state: string;
    type: string;
  }>;
  theftRecords?: Array<{
    date: string;
    location: string;
    status: string;
  }>;
  recallRecords?: Array<{
    date: string;
    component: string;
    description: string;
    remedy: string;
  }>;
  ownershipHistory?: Array<{
    purchaseDate: string;
    location: string;
    ownerType: string;
  }>;
  saleRecords?: Array<{
    date: string;
    price: string;
    odometer: string;
    condition: string;
  }>;
  lienRecords?: Array<{
    date: string;
    lienHolder: string;
    status: string;
  }>;
  marketValue?: {
    below: number;
    average: number;
    above: number;
  };
  error?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { vin, reportType = 'full' } = await req.json();

    if (!vin) {
      throw new Error('VIN is required');
    }

    // Validate VIN format (17 characters, alphanumeric, no I, O, Q)
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
    if (!vinRegex.test(vin)) {
      throw new Error('Invalid VIN format. VIN must be 17 characters (letters and numbers, excluding I, O, Q)');
    }

    const vinAuditApiKey = Deno.env.get("VINAUDIT_API_KEY");
    
    // If no API key, return demo data for testing
    if (!vinAuditApiKey) {
      console.log('No VINAUDIT_API_KEY found, returning demo data');
      return new Response(JSON.stringify(generateDemoReport(vin)), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Generate unique report ID
    const reportId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Call VINAudit API
    const apiUrl = `https://api.vinaudit.com/v2/pullreport?id=${reportId}&key=${vinAuditApiKey}&vin=${vin}&format=json`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`VINAudit API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform VINAudit response to our format
    const report = transformVINAuditResponse(data, vin);

    return new Response(JSON.stringify(report), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    console.error('VINAudit lookup error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});

function transformVINAuditResponse(data: any, vin: string): VINAuditResponse {
  // Transform the VINAudit API response to our standardized format
  return {
    success: true,
    vin: vin,
    year: data.attributes?.year || data.year,
    make: data.attributes?.make || data.make,
    model: data.attributes?.model || data.model,
    trim: data.attributes?.trim || data.trim,
    style: data.attributes?.style || data.body,
    engine: data.attributes?.engine || data.engine,
    transmission: data.attributes?.transmission || data.transmission,
    drivetrain: data.attributes?.drivetrain || data.drivetrain,
    fuel: data.attributes?.fuel || data.fuel,
    titleRecords: data.titles?.map((t: any) => ({
      date: t.date,
      state: t.state,
      odometer: t.odometer,
      titleType: t.title_type,
      brand: t.brand
    })) || [],
    accidentRecords: data.accidents?.map((a: any) => ({
      date: a.date,
      location: a.location,
      description: a.description,
      severity: a.severity
    })) || [],
    salvageRecords: data.salvage?.map((s: any) => ({
      date: s.date,
      state: s.state,
      type: s.type
    })) || [],
    theftRecords: data.theft?.map((t: any) => ({
      date: t.date,
      location: t.location,
      status: t.status
    })) || [],
    recallRecords: data.recalls?.map((r: any) => ({
      date: r.date,
      component: r.component,
      description: r.description,
      remedy: r.remedy
    })) || [],
    ownershipHistory: data.owners?.map((o: any) => ({
      purchaseDate: o.purchase_date,
      location: o.location,
      ownerType: o.owner_type
    })) || [],
    saleRecords: data.sales?.map((s: any) => ({
      date: s.date,
      price: s.price,
      odometer: s.odometer,
      condition: s.condition
    })) || [],
    lienRecords: data.liens?.map((l: any) => ({
      date: l.date,
      lienHolder: l.lien_holder,
      status: l.status
    })) || [],
    marketValue: data.market_value ? {
      below: data.market_value.below,
      average: data.market_value.average,
      above: data.market_value.above
    } : undefined
  };
}

function generateDemoReport(vin: string): VINAuditResponse {
  // Generate realistic demo data based on VIN
  const year = 2020 + (parseInt(vin.charAt(9), 36) % 5);
  const makes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes-Benz', 'Nissan', 'Chevrolet'];
  const models: Record<string, string[]> = {
    'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander'],
    'Honda': ['Accord', 'Civic', 'CR-V', 'Pilot'],
    'Ford': ['F-150', 'Mustang', 'Explorer', 'Escape'],
    'BMW': ['3 Series', '5 Series', 'X3', 'X5'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE'],
    'Nissan': ['Altima', 'Maxima', 'Rogue', 'Pathfinder'],
    'Chevrolet': ['Silverado', 'Camaro', 'Equinox', 'Tahoe']
  };
  
  const makeIndex = parseInt(vin.charAt(1), 36) % makes.length;
  const make = makes[makeIndex];
  const modelList = models[make];
  const model = modelList[parseInt(vin.charAt(2), 36) % modelList.length];
  
  const hasAccident = parseInt(vin.charAt(10), 36) % 4 === 0;
  const ownerCount = 1 + (parseInt(vin.charAt(11), 36) % 3);
  
  const baseOdometer = 15000 + (parseInt(vin.charAt(12), 36) * 2000);
  
  return {
    success: true,
    vin: vin,
    year: year.toString(),
    make: make,
    model: model,
    trim: 'SE',
    style: 'Sedan',
    engine: '2.5L 4-Cylinder',
    transmission: 'Automatic',
    drivetrain: 'FWD',
    fuel: 'Gasoline',
    titleRecords: [
      {
        date: `${year}-03-15`,
        state: 'CA',
        odometer: '10',
        titleType: 'Original',
        brand: 'Clean'
      },
      {
        date: `${year + 1}-06-20`,
        state: 'CA',
        odometer: baseOdometer.toString(),
        titleType: 'Transfer',
        brand: 'Clean'
      }
    ],
    accidentRecords: hasAccident ? [
      {
        date: `${year + 1}-09-10`,
        location: 'Los Angeles, CA',
        description: 'Minor rear-end collision',
        severity: 'Minor'
      }
    ] : [],
    salvageRecords: [],
    theftRecords: [],
    recallRecords: [
      {
        date: `${year}-08-01`,
        component: 'Fuel System',
        description: 'Fuel pump may fail causing engine stall',
        remedy: 'Dealer will replace fuel pump assembly'
      }
    ],
    ownershipHistory: Array.from({ length: ownerCount }, (_, i) => ({
      purchaseDate: `${year + i}-0${3 + i * 4}-${10 + i * 5}`,
      location: i === 0 ? 'Los Angeles, CA' : i === 1 ? 'San Diego, CA' : 'Phoenix, AZ',
      ownerType: i === 0 ? 'Personal' : 'Personal'
    })),
    saleRecords: [
      {
        date: `${year}-03-15`,
        price: '32000',
        odometer: '10',
        condition: 'New'
      }
    ],
    lienRecords: [],
    marketValue: {
      below: 18500,
      average: 22000,
      above: 25500
    }
  };
}
