export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

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
    length?: number;
    width?: number;
    height?: number;
    wheelbase?: number;
    weight?: number;
    color?: string;
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
    entity?: string;
    disposition?: string;
  }>;
  theftRecords?: Array<{
    date: string;
    location: string;
    status: string;
  }>;
  insuranceRecords?: Array<{
    date: string;
    company: string;
    location: string;
  }>;
  brandRecords?: Array<{
    code: string;
    name: string;
    description: string;
    date?: string;
    state?: string;
  }>;
  ownershipHistory?: Array<{
    purchaseDate: string;
    location: string;
    ownerType: string;
  }>;
  marketValue?: {
    below: number;
    average: number;
    above: number;
    currency?: string;
  };
  error?: string;
  isPaid?: boolean;
  purchaseId?: string;
  rawResponse?: any;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { vin, userId, paymentIntentId, purchaseId } = body;

    const apiKey = Deno.env.get("CARSXE_API_KEY");
    
    console.log(`=== CarsXE History API Request ===`);
    console.log(`VIN: ${vin}`);
    console.log(`API Key configured: ${apiKey ? 'Yes' : 'No'}`);
    
    // If no API key, return demo data
    if (!apiKey) {
      console.log('No CARSXE_API_KEY - returning demo data');
      return new Response(JSON.stringify(generateDemoReport(vin || 'DEMO12345678901234')), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Validate VIN
    if (!vin) {
      throw new Error('VIN is required');
    }

    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
    if (!vinRegex.test(vin)) {
      throw new Error('Invalid VIN format. VIN must be 17 characters.');
    }

    const upperVin = vin.toUpperCase();
    
    // Call CarsXE History API
    const url = `https://api.carsxe.com/history?key=${apiKey}&vin=${upperVin}`;
    
    console.log(`Calling CarsXE API for VIN: ${upperVin}`);
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'VehicleMarketplace/1.0'
        }
      });
      
      console.log(`CarsXE response status: ${response.status}`);
      const text = await response.text();
      console.log(`CarsXE response (first 1000): ${text.substring(0, 1000)}`);
      
      if (!response.ok) {
        // Check for specific error codes
        if (response.status === 401 || response.status === 403) {
          throw new Error('Invalid API key or unauthorized access');
        }
        if (response.status === 404) {
          throw new Error('No history data found for this VIN');
        }
        throw new Error(`CarsXE API returned ${response.status}: ${text.substring(0, 200)}`);
      }
      
      const data = JSON.parse(text);
      
      // Check for API-level errors
      if (data.error) {
        if (data.error.code === 'report_not_found') {
          throw new Error('No vehicle history report found for this VIN');
        }
        throw new Error(`CarsXE error: ${data.error.message || data.error.code}`);
      }
      
      if (!data.success) {
        throw new Error('Failed to retrieve vehicle history data');
      }
      
      // Transform CarsXE response to our format
      const report = transformCarsXEResponse(data, upperVin);
      report.isPaid = !!paymentIntentId;
      report.purchaseId = purchaseId;
      
      // Save report to purchase record if applicable
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
        error: fetchError.message || 'Network error occurred'
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

function transformCarsXEResponse(data: any, vin: string): VehicleHistoryReport {
  const report: VehicleHistoryReport = {
    success: true,
    vin: vin,
    stolenCheck: { isStolen: false, status: 'Clear' }
  };
  
  // Process junk and salvage information
  if (data.junkAndSalvageInformation && Array.isArray(data.junkAndSalvageInformation)) {
    report.salvageRecords = data.junkAndSalvageInformation.map((item: any) => {
      const entity = item.ReportingEntityAbstract;
      return {
        date: item.VehicleObtainedDate ? new Date(item.VehicleObtainedDate).toLocaleDateString() : 'Unknown',
        state: entity?.LocationStateUSPostalServiceCode || 'Unknown',
        type: item.VehicleDispositionText || 'Unknown',
        entity: entity?.EntityName || 'Unknown',
        disposition: item.VehicleDispositionText
      };
    });
  }
  
  // Process insurance information
  if (data.insuranceInformation && Array.isArray(data.insuranceInformation)) {
    report.insuranceRecords = data.insuranceInformation.map((item: any) => {
      const entity = item.ReportingEntityAbstract;
      return {
        date: item.VehicleObtainedDate ? new Date(item.VehicleObtainedDate).toLocaleDateString() : 'Unknown',
        company: entity?.EntityName || 'Unknown',
        location: `${entity?.LocationCityName || ''}, ${entity?.LocationStateUSPostalServiceCode || ''}`.trim()
      };
    });
  }
  
  // Process brand information (title brands like salvage, rebuilt, etc.)
  if (data.brandsInformation && Array.isArray(data.brandsInformation)) {
    report.brandRecords = data.brandsInformation
      .filter((brand: any) => brand.record) // Only include brands that have actual records
      .map((brand: any) => {
        const record = brand.record;
        return {
          code: brand.code,
          name: brand.name,
          description: brand.description,
          date: record?.VehicleBrandDate?.Date ? new Date(record.VehicleBrandDate.Date).toLocaleDateString() : undefined,
          state: record?.ReportingEntityAbstract?.EntityName
        };
      });
    
    // Check for salvage/stolen brands
    const dangerousBrands = ['08', '11', '16', '31', '49', '50']; // Junk, Salvage, Salvage Retention, Totaled, Salvage-Stolen
    const hasDangerousBrand = report.brandRecords?.some(b => dangerousBrands.includes(b.code));
    
    if (hasDangerousBrand) {
      // Add to title records
      report.titleRecords = report.brandRecords
        ?.filter(b => dangerousBrands.includes(b.code))
        .map(b => ({
          date: b.date || 'Unknown',
          state: b.state || 'Unknown',
          odometer: '0',
          titleType: b.name,
          brand: b.name
        }));
    }
    
    // Check for theft-related brands
    const stolenBrands = ['49', '50']; // Salvage-Stolen, Salvage-Stolen & Recovered
    const hasStolenBrand = report.brandRecords?.some(b => stolenBrands.includes(b.code));
    
    if (hasStolenBrand) {
      const stolenRecord = report.brandRecords?.find(b => stolenBrands.includes(b.code));
      report.stolenCheck = {
        isStolen: true,
        status: 'Reported Stolen',
        date: stolenRecord?.date,
        country: stolenRecord?.state
      };
      
      report.theftRecords = [{
        date: stolenRecord?.date || 'Unknown',
        location: stolenRecord?.state || 'Unknown',
        status: stolenRecord?.name || 'Stolen'
      }];
    }
  }
  
  // Process current title information
  if (data.currentTitleInformation && Array.isArray(data.currentTitleInformation)) {
    const existingTitleRecords = report.titleRecords || [];
    const newTitleRecords = data.currentTitleInformation.map((item: any) => ({
      date: item.TitleIssueDate ? new Date(item.TitleIssueDate).toLocaleDateString() : 'Unknown',
      state: item.TitleStateCode || 'Unknown',
      odometer: item.OdometerReading?.toString() || '0',
      titleType: item.TitleStatusText || 'Unknown',
      brand: item.BrandCode === '00' ? 'Clean' : item.BrandText || 'Unknown'
    }));
    report.titleRecords = [...existingTitleRecords, ...newTitleRecords];
  }
  
  // Process history information (detailed records)
  if (data.historyInformation && Array.isArray(data.historyInformation)) {
    // Extract ownership history from history records
    const ownershipRecords = data.historyInformation
      .filter((item: any) => item.EventType === 'TITLE' || item.EventType === 'REGISTRATION')
      .map((item: any) => ({
        purchaseDate: item.EventDate ? new Date(item.EventDate).toLocaleDateString() : 'Unknown',
        location: `${item.City || ''}, ${item.State || ''}`.trim() || 'Unknown',
        ownerType: item.OwnerType || 'Personal'
      }));
    
    if (ownershipRecords.length > 0) {
      report.ownershipHistory = ownershipRecords;
    }
    
    // Extract accident records
    const accidentRecords = data.historyInformation
      .filter((item: any) => item.EventType === 'ACCIDENT' || item.DamageDescription)
      .map((item: any) => ({
        date: item.EventDate ? new Date(item.EventDate).toLocaleDateString() : 'Unknown',
        location: `${item.City || ''}, ${item.State || ''}`.trim() || 'Unknown',
        description: item.DamageDescription || item.EventDescription || 'Accident reported',
        severity: item.DamageSeverity || 'Unknown'
      }));
    
    if (accidentRecords.length > 0) {
      report.accidentRecords = accidentRecords;
    }
  }
  
  // Set VIN changed flag
  if (data.vinChanged) {
    // Add a note about VIN change
    if (!report.titleRecords) {
      report.titleRecords = [];
    }
    report.titleRecords.push({
      date: 'Unknown',
      state: 'Unknown',
      odometer: '0',
      titleType: 'VIN Changed',
      brand: 'VIN Modified'
    });
  }
  
  // Store raw response for debugging
  report.rawResponse = {
    brandsRecordCount: data.brandsRecordCount,
    vinChanged: data.vinChanged,
    status: data.status
  };
  
  return report;
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
    specs: { 
      powerKw: 132, 
      powerHp: 180, 
      displacement: 2500, 
      doors: 4, 
      seats: 5, 
      maxSpeed: 210, 
      fuelConsumption: 7.5, 
      co2Emission: 175,
      length: 4885,
      width: 1840,
      height: 1455,
      wheelbase: 2825
    },
    manufacturing: { 
      manufacturer: make, 
      plantCountry: 'USA', 
      productionYear: year, 
      vehicleType: 'Passenger Car' 
    },
    stolenCheck: { 
      isStolen: false, 
      status: 'Clear - Not reported stolen' 
    },
    titleRecords: [
      {
        date: `${year}-03-15`,
        state: 'CA',
        odometer: '0',
        titleType: 'Original',
        brand: 'Clean'
      },
      {
        date: `${year + 1}-06-20`,
        state: 'CA',
        odometer: '12500',
        titleType: 'Transfer',
        brand: 'Clean'
      }
    ],
    ownershipHistory: [
      {
        purchaseDate: `${year}-03-15`,
        location: 'Los Angeles, CA',
        ownerType: 'Personal'
      },
      {
        purchaseDate: `${year + 1}-06-20`,
        location: 'San Francisco, CA',
        ownerType: 'Personal'
      }
    ],
    salvageRecords: [],
    insuranceRecords: [
      {
        date: `${year}-03-20`,
        company: 'State Farm Insurance',
        location: 'Los Angeles, CA'
      }
    ],
    marketValue: { 
      below: 18500, 
      average: 22000, 
      above: 25500, 
      currency: 'USD' 
    }
  };
}
