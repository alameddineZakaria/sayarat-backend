//https://yeophyikblzcprhbfgmn.databasepad.com/functions/v1/carfaxdeals-history
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// CarfaxDeals API configuration
const CARFAXDEALS_API_URL = 'https://api.carfaxdeals.com';
const CARFAXDEALS_API_KEY = Deno.env.get('CARFAXDEALS_API_KEY') || '';

// Make CarfaxDeals API request
async function carfaxDealsRequest(vin: string): Promise<any> {
  const url = `${CARFAXDEALS_API_URL}/vhr/${vin.toUpperCase()}`;
  
  console.log(`CarfaxDeals API request for VIN: ${vin}`);
  console.log(`API URL: ${url}`);
  console.log(`API Key configured: ${CARFAXDEALS_API_KEY ? 'Yes (length: ' + CARFAXDEALS_API_KEY.length + ')' : 'No'}`);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-API-Key': CARFAXDEALS_API_KEY,
      'Accept': 'application/json',
    },
  });
  
  console.log(`Response status: ${response.status}`);
  console.log(`Response content-type: ${response.headers.get('content-type')}`);
  
  const responseText = await response.text();
  console.log(`Response body (first 500 chars): ${responseText.substring(0, 500)}`);
  
  // Check if response is HTML (error page)
  if (responseText.trim().startsWith('<!') || responseText.trim().startsWith('<html')) {
    console.error('CarfaxDeals API returned HTML instead of JSON - likely an error page or invalid endpoint');
    throw new Error(`CarfaxDeals API returned HTML error page (status: ${response.status}). Please verify API key and endpoint.`);
  }
  
  if (!response.ok) {
    console.error(`CarfaxDeals API error: ${response.status} - ${responseText}`);
    throw new Error(`CarfaxDeals API error: ${response.status} - ${responseText.substring(0, 200)}`);
  }
  
  try {
    return JSON.parse(responseText);
  } catch (parseError) {
    console.error(`Failed to parse CarfaxDeals response as JSON: ${parseError}`);
    throw new Error(`Invalid JSON response from CarfaxDeals API`);
  }
}

// Transform CarfaxDeals response to our app format
function transformCarfaxDealsResponse(data: any): any {
  // Extract vehicle info
  const vehicle = data.vehicle || {};
  const history = data.history || {};
  const titleInfo = data.titleInfo || {};
  const theftCheck = data.theftCheck || {};
  const marketValue = data.marketValue || {};
  
  // Build title records
  const titleRecords = [];
  if (titleInfo.records && Array.isArray(titleInfo.records)) {
    for (const record of titleInfo.records) {
      titleRecords.push({
        date: record.date || 'Unknown',
        state: record.state || 'Unknown',
        odometer: record.odometer?.toString() || '0',
        titleType: record.titleType || 'Standard',
        brand: record.brand || 'Clean',
      });
    }
  }
  
  // Build theft records
  const theftRecords = [];
  if (theftCheck.isStolen || theftCheck.records?.length > 0) {
    const records = theftCheck.records || [{ date: 'Unknown', status: 'Reported Stolen' }];
    for (const record of records) {
      theftRecords.push({
        date: record.date || 'Unknown',
        location: record.location || 'Unknown',
        status: record.status || 'Reported',
      });
    }
  }
  
  // Build accident records
  const accidentRecords = [];
  if (history.accidents && Array.isArray(history.accidents)) {
    for (const accident of history.accidents) {
      accidentRecords.push({
        date: accident.date || 'Unknown',
        location: accident.location || 'Unknown',
        description: accident.description || 'Accident reported',
        severity: accident.severity || 'Unknown',
      });
    }
  }
  
  // Build ownership history
  const ownershipHistory = [];
  if (history.owners && Array.isArray(history.owners)) {
    for (const owner of history.owners) {
      ownershipHistory.push({
        purchaseDate: owner.purchaseDate || owner.date || 'Unknown',
        location: owner.location || owner.state || 'Unknown',
        ownerType: owner.ownerType || owner.type || 'Personal',
      });
    }
  }
  
  // Build recall records
  const recallRecords = [];
  if (data.recalls && Array.isArray(data.recalls)) {
    for (const recall of data.recalls) {
      recallRecords.push({
        date: recall.date || 'Unknown',
        component: recall.component || 'Unknown',
        description: recall.description || 'Recall issued',
        remedy: recall.remedy || 'Contact dealer',
      });
    }
  }
  
  // Build salvage records
  const salvageRecords = [];
  if (history.salvage && Array.isArray(history.salvage)) {
    for (const record of history.salvage) {
      salvageRecords.push({
        date: record.date || 'Unknown',
        state: record.state || 'Unknown',
        type: record.type || 'Salvage',
      });
    }
  }
  
  // Build sale records
  const saleRecords = [];
  if (history.sales && Array.isArray(history.sales)) {
    for (const sale of history.sales) {
      saleRecords.push({
        date: sale.date || 'Unknown',
        price: sale.price?.toString() || '0',
        odometer: sale.odometer?.toString() || '0',
        condition: sale.condition || 'Unknown',
      });
    }
  }
  
  // Build lien records
  const lienRecords = [];
  if (data.liens && Array.isArray(data.liens)) {
    for (const lien of data.liens) {
      lienRecords.push({
        date: lien.date || 'Unknown',
        lienHolder: lien.lienHolder || lien.holder || 'Unknown',
        status: lien.status || 'Active',
      });
    }
  }
  
  return {
    success: true,
    vin: data.vin || vehicle.vin,
    year: vehicle.year?.toString() || '',
    make: vehicle.make || '',
    model: vehicle.model || '',
    trim: vehicle.trim || '',
    style: vehicle.bodyStyle || vehicle.style || '',
    engine: vehicle.engine || '',
    transmission: vehicle.transmission || '',
    drivetrain: vehicle.drivetrain || vehicle.driveType || '',
    fuel: vehicle.fuelType || vehicle.fuel || '',
    
    // Additional specs
    specs: {
      displacement: vehicle.displacement || vehicle.engineSize,
      cylinders: vehicle.cylinders,
      power_hp: vehicle.horsepower || vehicle.power,
      power_kw: vehicle.powerKw,
      torque: vehicle.torque,
      maxSpeed: vehicle.maxSpeed,
      acceleration: vehicle.acceleration,
      fuelConsumption: vehicle.fuelConsumption || vehicle.mpg,
      fuelCapacity: vehicle.fuelCapacity,
      co2Emission: vehicle.co2Emission,
      emissionStandard: vehicle.emissionStandard,
      length: vehicle.length,
      width: vehicle.width,
      height: vehicle.height,
      wheelbase: vehicle.wheelbase,
      weight: vehicle.weight || vehicle.curbWeight,
      maxWeight: vehicle.maxWeight || vehicle.gvwr,
      doors: vehicle.doors,
      seats: vehicle.seats?.toString(),
      trunkCapacity: vehicle.trunkCapacity || vehicle.cargoCapacity,
      color: vehicle.exteriorColor || vehicle.color,
      interiorColor: vehicle.interiorColor,
    },
    
    // Manufacturing info
    manufacturing: {
      manufacturer: vehicle.manufacturer,
      manufacturerAddress: vehicle.manufacturerAddress,
      plantCity: vehicle.plantCity || vehicle.assemblyPlant,
      plantCountry: vehicle.plantCountry || vehicle.countryOfOrigin,
      productionStarted: vehicle.productionStarted,
      productionStopped: vehicle.productionStopped,
      madeDate: vehicle.madeDate || vehicle.manufactureDate,
      registeredDate: vehicle.registeredDate,
    },
    
    titleRecords,
    accidentRecords,
    salvageRecords,
    theftRecords,
    recallRecords,
    ownershipHistory,
    saleRecords,
    lienRecords,
    
    // Market value
    marketValue: marketValue.average ? {
      below: marketValue.below || marketValue.low || Math.round(marketValue.average * 0.85),
      average: marketValue.average,
      above: marketValue.above || marketValue.high || Math.round(marketValue.average * 1.15),
    } : null,
  };
}

// Decode VIN to extract vehicle info (positions matter in VIN)
// Position 1: Country, 2: Manufacturer, 3: Vehicle Type, 4-8: Attributes, 9: Check digit, 10: Year, 11: Plant, 12-17: Serial
function decodeVinBasics(vin: string): { year: string; make: string; model: string; country: string } {
  const vinUpper = vin.toUpperCase();
  
  // Year code (position 10) - simplified mapping for recent years
  const yearCodes: Record<string, string> = {
    'A': '2010', 'B': '2011', 'C': '2012', 'D': '2013', 'E': '2014',
    'F': '2015', 'G': '2016', 'H': '2017', 'J': '2018', 'K': '2019',
    'L': '2020', 'M': '2021', 'N': '2022', 'P': '2023', 'R': '2024',
    'S': '2025', 'T': '2026', 'V': '2027', 'W': '2028', 'X': '2029',
    'Y': '2030', '1': '2001', '2': '2002', '3': '2003', '4': '2004',
    '5': '2005', '6': '2006', '7': '2007', '8': '2008', '9': '2009',
  };
  
  // World Manufacturer Identifier (first 3 characters)
  const wmiMakes: Record<string, { make: string; country: string }> = {
    // US Manufacturers
    '1G1': { make: 'Chevrolet', country: 'United States' },
    '1G2': { make: 'Pontiac', country: 'United States' },
    '1G3': { make: 'Oldsmobile', country: 'United States' },
    '1G4': { make: 'Buick', country: 'United States' },
    '1G6': { make: 'Cadillac', country: 'United States' },
    '1GC': { make: 'Chevrolet Truck', country: 'United States' },
    '1GT': { make: 'GMC Truck', country: 'United States' },
    '1FA': { make: 'Ford', country: 'United States' },
    '1FB': { make: 'Ford', country: 'United States' },
    '1FC': { make: 'Ford', country: 'United States' },
    '1FD': { make: 'Ford', country: 'United States' },
    '1FM': { make: 'Ford', country: 'United States' },
    '1FT': { make: 'Ford Truck', country: 'United States' },
    '1FU': { make: 'Freightliner', country: 'United States' },
    '1FV': { make: 'Freightliner', country: 'United States' },
    '1C3': { make: 'Chrysler', country: 'United States' },
    '1C4': { make: 'Chrysler', country: 'United States' },
    '1C6': { make: 'Chrysler', country: 'United States' },
    '1D7': { make: 'Dodge', country: 'United States' },
    '1D3': { make: 'Dodge', country: 'United States' },
    '1D4': { make: 'Dodge', country: 'United States' },
    '1J4': { make: 'Jeep', country: 'United States' },
    '1J8': { make: 'Jeep', country: 'United States' },
    '1LN': { make: 'Lincoln', country: 'United States' },
    '1ME': { make: 'Mercury', country: 'United States' },
    '1N4': { make: 'Nissan', country: 'United States' },
    '1N6': { make: 'Nissan Truck', country: 'United States' },
    '1HG': { make: 'Honda', country: 'United States' },
    '1HD': { make: 'Harley-Davidson', country: 'United States' },
    '1ZV': { make: 'Ford', country: 'United States' },
    
    // Japanese Manufacturers (US plants)
    '2HG': { make: 'Honda', country: 'Canada' },
    '2HK': { make: 'Honda', country: 'Canada' },
    '2HJ': { make: 'Honda', country: 'Canada' },
    '2T1': { make: 'Toyota', country: 'Canada' },
    '2T2': { make: 'Lexus', country: 'Canada' },
    '2T3': { make: 'Toyota', country: 'Canada' },
    
    // Japan
    'JA3': { make: 'Mitsubishi', country: 'Japan' },
    'JA4': { make: 'Mitsubishi', country: 'Japan' },
    'JF1': { make: 'Subaru', country: 'Japan' },
    'JF2': { make: 'Subaru', country: 'Japan' },
    'JHM': { make: 'Honda', country: 'Japan' },
    'JHL': { make: 'Honda', country: 'Japan' },
    'JM1': { make: 'Mazda', country: 'Japan' },
    'JM3': { make: 'Mazda', country: 'Japan' },
    'JN1': { make: 'Nissan', country: 'Japan' },
    'JN8': { make: 'Nissan', country: 'Japan' },
    'JT2': { make: 'Toyota', country: 'Japan' },
    'JT3': { make: 'Toyota', country: 'Japan' },
    'JT4': { make: 'Toyota', country: 'Japan' },
    'JTD': { make: 'Toyota', country: 'Japan' },
    'JTE': { make: 'Toyota', country: 'Japan' },
    'JTH': { make: 'Lexus', country: 'Japan' },
    'JTJ': { make: 'Lexus', country: 'Japan' },
    'JTK': { make: 'Toyota', country: 'Japan' },
    'JTL': { make: 'Toyota', country: 'Japan' },
    'JTM': { make: 'Toyota', country: 'Japan' },
    'JTN': { make: 'Toyota', country: 'Japan' },
    
    // Korea
    'KM8': { make: 'Hyundai', country: 'South Korea' },
    'KMH': { make: 'Hyundai', country: 'South Korea' },
    'KNA': { make: 'Kia', country: 'South Korea' },
    'KND': { make: 'Kia', country: 'South Korea' },
    'KNM': { make: 'Kia', country: 'South Korea' },
    '5NP': { make: 'Hyundai', country: 'United States' },
    '5XY': { make: 'Kia', country: 'United States' },
    
    // Germany
    'WA1': { make: 'Audi', country: 'Germany' },
    'WAU': { make: 'Audi', country: 'Germany' },
    'WBA': { make: 'BMW', country: 'Germany' },
    'WBS': { make: 'BMW M', country: 'Germany' },
    'WBY': { make: 'BMW', country: 'Germany' },
    'WDB': { make: 'Mercedes-Benz', country: 'Germany' },
    'WDC': { make: 'Mercedes-Benz', country: 'Germany' },
    'WDD': { make: 'Mercedes-Benz', country: 'Germany' },
    'WDF': { make: 'Mercedes-Benz', country: 'Germany' },
    'WMW': { make: 'MINI', country: 'Germany' },
    'WP0': { make: 'Porsche', country: 'Germany' },
    'WP1': { make: 'Porsche', country: 'Germany' },
    'WUA': { make: 'Audi', country: 'Germany' },
    'WVW': { make: 'Volkswagen', country: 'Germany' },
    'WVG': { make: 'Volkswagen', country: 'Germany' },
    
    // UK
    'SAJ': { make: 'Jaguar', country: 'United Kingdom' },
    'SAL': { make: 'Land Rover', country: 'United Kingdom' },
    'SCC': { make: 'Lotus', country: 'United Kingdom' },
    'SCF': { make: 'Aston Martin', country: 'United Kingdom' },
    
    // Italy
    'ZAM': { make: 'Maserati', country: 'Italy' },
    'ZAR': { make: 'Alfa Romeo', country: 'Italy' },
    'ZFA': { make: 'Fiat', country: 'Italy' },
    'ZFF': { make: 'Ferrari', country: 'Italy' },
    'ZHW': { make: 'Lamborghini', country: 'Italy' },
    
    // Sweden
    'YS3': { make: 'Saab', country: 'Sweden' },
    'YV1': { make: 'Volvo', country: 'Sweden' },
    'YV4': { make: 'Volvo', country: 'Sweden' },
    
    // Mexico
    '3FA': { make: 'Ford', country: 'Mexico' },
    '3FE': { make: 'Ford', country: 'Mexico' },
    '3G1': { make: 'Chevrolet', country: 'Mexico' },
    '3G5': { make: 'Buick', country: 'Mexico' },
    '3GN': { make: 'Chevrolet', country: 'Mexico' },
    '3GT': { make: 'GMC', country: 'Mexico' },
    '3N1': { make: 'Nissan', country: 'Mexico' },
    '3VW': { make: 'Volkswagen', country: 'Mexico' },
    
    // Tesla
    '5YJ': { make: 'Tesla', country: 'United States' },
  };
  
  // Get year from position 10
  const yearCode = vinUpper.charAt(9);
  const year = yearCodes[yearCode] || '2020';
  
  // Get make from WMI (first 3 characters)
  const wmi = vinUpper.substring(0, 3);
  const makeInfo = wmiMakes[wmi] || { make: 'Unknown', country: 'Unknown' };
  
  // Try to determine model based on make and VIN patterns
  let model = 'Unknown Model';
  const make = makeInfo.make;
  
  // Model determination based on make and VIN attributes (simplified)
  if (make === 'Toyota' || make === 'Lexus') {
    const modelCode = vinUpper.substring(4, 7);
    const toyotaModels: Record<string, string> = {
      'BF1': 'Camry', 'BF5': 'Camry', 'BU5': 'Camry', 'BK1': 'Camry',
      'BU2': 'Corolla', 'BU4': 'Corolla', 'BUR': 'Corolla',
      'GK5': 'RAV4', 'GK2': 'RAV4', 'GK4': 'RAV4',
      'DC1': 'Highlander', 'DC5': 'Highlander',
      'DK1': 'Tacoma', 'DK5': 'Tacoma',
      'FT8': 'Tundra', 'FT1': 'Tundra',
      'EZ1': 'Prius', 'EZ5': 'Prius',
    };
    model = toyotaModels[modelCode] || 'Sedan';
  } else if (make === 'Honda') {
    const modelCode = vinUpper.substring(4, 6);
    const hondaModels: Record<string, string> = {
      'BH': 'Civic', 'BE': 'Civic', 'BG': 'Civic',
      'CG': 'Accord', 'CR': 'Accord', 'CV': 'Accord',
      'RW': 'CR-V', 'RM': 'CR-V', 'RD': 'CR-V',
      'YF': 'Pilot', 'YH': 'Pilot',
      'RT': 'Odyssey', 'RL': 'Odyssey',
    };
    model = hondaModels[modelCode] || 'Sedan';
  } else if (make === 'Ford') {
    const modelCode = vinUpper.substring(4, 6);
    const fordModels: Record<string, string> = {
      'DP': 'F-150', 'KF': 'F-150', 'TF': 'F-150',
      'P3': 'Mustang', 'P8': 'Mustang',
      'RG': 'Explorer', 'RM': 'Explorer',
      'HG': 'Escape', 'HK': 'Escape',
      'P5': 'Fusion', 'P0': 'Fusion',
    };
    model = fordModels[modelCode] || 'Sedan';
  } else if (make === 'Chevrolet' || make === 'Chevrolet Truck') {
    const modelCode = vinUpper.substring(4, 6);
    const chevyModels: Record<string, string> = {
      'C1': 'Silverado', 'CK': 'Silverado', 'GC': 'Silverado',
      'YC': 'Malibu', 'YS': 'Malibu',
      'CD': 'Equinox', 'CJ': 'Equinox',
      'DT': 'Traverse', 'GN': 'Traverse',
      'JC': 'Camaro', 'JH': 'Camaro',
    };
    model = chevyModels[modelCode] || 'Sedan';
  } else if (make === 'Dodge') {
    model = vinUpper.charAt(4) === 'S' ? 'Ram' : 'Charger';
  } else if (make === 'BMW') {
    const series = vinUpper.charAt(4);
    model = series + ' Series';
  } else if (make === 'Mercedes-Benz') {
    const classCode = vinUpper.substring(4, 6);
    const mbModels: Record<string, string> = {
      'HA': 'C-Class', 'HB': 'C-Class',
      'JA': 'E-Class', 'JB': 'E-Class',
      'KA': 'S-Class', 'KB': 'S-Class',
      'GA': 'GLE', 'GB': 'GLE',
      'FA': 'GLC', 'FB': 'GLC',
    };
    model = mbModels[classCode] || 'Sedan';
  } else if (make === 'Tesla') {
    const modelCode = vinUpper.charAt(3);
    const teslaModels: Record<string, string> = {
      'S': 'Model S', 'A': 'Model S',
      '3': 'Model 3', 'E': 'Model 3',
      'X': 'Model X', 'B': 'Model X',
      'Y': 'Model Y', 'C': 'Model Y',
    };
    model = teslaModels[modelCode] || 'Model 3';
  }
  
  return { year, make, model, country: makeInfo.country };
}

// Generate demo data based on VIN - now uses VIN decoding for realistic data
function generateDemoData(vin: string, demoReason: string): any {
  // Decode VIN to get basic vehicle info
  const decoded = decodeVinBasics(vin);
  
  // Generate consistent but varied data based on VIN hash
  const vinHash = vin.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const colors = [
    'Celestial Silver Metallic', 'Midnight Black', 'Pearl White', 'Deep Blue Pearl',
    'Ruby Red Metallic', 'Graphite Gray', 'Champagne Gold', 'Forest Green',
    'Sunset Orange', 'Arctic White', 'Obsidian Black', 'Lunar Silver'
  ];
  
  const interiorColors = ['Black', 'Tan', 'Gray', 'Beige', 'Brown', 'Ivory'];
  
  const transmissions = ['6-Speed Automatic', '8-Speed Automatic', 'CVT', '10-Speed Automatic', '6-Speed Manual'];
  const drivetrains = ['FWD', 'RWD', 'AWD', '4WD'];
  const fuels = ['Gasoline', 'Diesel', 'Hybrid', 'Electric'];
  
  const states = ['California', 'Texas', 'Florida', 'New York', 'Illinois', 'Ohio', 'Georgia', 'Arizona', 'Nevada', 'Washington'];
  const cities = ['Los Angeles', 'Houston', 'Miami', 'New York', 'Chicago', 'Columbus', 'Atlanta', 'Phoenix', 'Las Vegas', 'Seattle'];
  
  // Use VIN hash to select consistent values
  const color = colors[vinHash % colors.length];
  const interiorColor = interiorColors[vinHash % interiorColors.length];
  const transmission = transmissions[vinHash % transmissions.length];
  const drivetrain = drivetrains[vinHash % drivetrains.length];
  const fuel = fuels[vinHash % fuels.length];
  const state1 = states[vinHash % states.length];
  const state2 = states[(vinHash + 3) % states.length];
  const city1 = cities[vinHash % cities.length];
  const city2 = cities[(vinHash + 3) % cities.length];
  
  // Generate year-appropriate data
  const yearNum = parseInt(decoded.year) || 2020;
  const currentYear = new Date().getFullYear();
  const vehicleAge = currentYear - yearNum;
  
  // Estimate mileage based on age (avg 12k miles/year)
  const estimatedMileage = Math.min(vehicleAge * 12000 + (vinHash % 5000), 200000);
  
  // Generate purchase dates
  const purchaseYear1 = yearNum;
  const purchaseYear2 = Math.min(yearNum + Math.floor(vehicleAge / 2) + 1, currentYear);
  
  // Base price estimation (very rough)
  const basePrices: Record<string, number> = {
    'Toyota': 28000, 'Honda': 27000, 'Ford': 32000, 'Chevrolet': 30000,
    'BMW': 45000, 'Mercedes-Benz': 50000, 'Audi': 42000, 'Lexus': 40000,
    'Tesla': 55000, 'Porsche': 75000, 'Hyundai': 25000, 'Kia': 24000,
    'Nissan': 26000, 'Volkswagen': 28000, 'Subaru': 29000, 'Mazda': 27000,
  };
  const basePrice = basePrices[decoded.make] || 30000;
  const depreciatedPrice = Math.round(basePrice * Math.pow(0.85, vehicleAge));
  
  // Determine if there should be accidents (10% chance based on VIN)
  const hasAccident = (vinHash % 10) === 0;
  const accidentRecords = hasAccident ? [{
    date: `${purchaseYear1 + 2}-${String((vinHash % 12) + 1).padStart(2, '0')}-${String((vinHash % 28) + 1).padStart(2, '0')}`,
    location: `${city1}, ${state1}`,
    description: 'Minor collision reported',
    severity: 'Minor',
  }] : [];
  
  // Determine number of owners (1-3 based on age)
  const numOwners = Math.min(Math.max(1, Math.floor(vehicleAge / 4) + 1), 3);
  
  const ownershipHistory = [];
  const titleRecords = [];
  const saleRecords = [];
  
  for (let i = 0; i < numOwners; i++) {
    const ownerYear = purchaseYear1 + Math.floor((vehicleAge / numOwners) * i);
    const ownerState = i === 0 ? state1 : state2;
    const ownerCity = i === 0 ? city1 : city2;
    const ownerMileage = Math.round((estimatedMileage / numOwners) * (i + 1));
    
    ownershipHistory.push({
      purchaseDate: `${ownerYear}-${String((vinHash % 12) + 1).padStart(2, '0')}-${String((vinHash % 28) + 1).padStart(2, '0')}`,
      location: `${ownerCity}, ${ownerState}`,
      ownerType: i === 0 ? 'Personal' : (vinHash % 3 === 0 ? 'Lease' : 'Personal'),
    });
    
    titleRecords.push({
      date: `${ownerYear}-${String((vinHash % 12) + 1).padStart(2, '0')}-${String((vinHash % 28) + 1).padStart(2, '0')}`,
      state: ownerState,
      odometer: String(ownerMileage),
      titleType: i === 0 ? 'Original' : 'Transfer',
      brand: 'Clean',
    });
    
    if (i > 0) {
      const salePrice = Math.round(depreciatedPrice * (1 + (numOwners - i) * 0.15));
      saleRecords.push({
        date: `${ownerYear}-${String((vinHash % 12) + 1).padStart(2, '0')}-${String((vinHash % 28) + 1).padStart(2, '0')}`,
        price: String(salePrice),
        odometer: String(ownerMileage),
        condition: ownerMileage < 50000 ? 'Excellent' : (ownerMileage < 100000 ? 'Good' : 'Fair'),
      });
    }
  }
  
  // Recall records (30% chance)
  const hasRecall = (vinHash % 3) === 0;
  const recallRecords = hasRecall ? [{
    date: `${purchaseYear1 + 1}-${String((vinHash % 12) + 1).padStart(2, '0')}-15`,
    component: ['Airbag', 'Fuel Pump', 'Brake System', 'Steering', 'Electrical'][vinHash % 5],
    description: 'Manufacturer recall issued for potential safety concern',
    remedy: 'Contact dealer for free repair',
  }] : [];
  
  return {
    success: true,
    isDemo: true,
    demoReason: demoReason,
    vin: vin.toUpperCase(),
    year: decoded.year,
    make: decoded.make,
    model: decoded.model,
    trim: ['Base', 'LE', 'SE', 'XLE', 'Limited', 'Sport', 'Touring'][vinHash % 7],
    style: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback', 'Wagon'][vinHash % 6],
    engine: ['2.0L 4-Cylinder', '2.5L 4-Cylinder', '3.5L V6', '5.0L V8', '2.0L Turbo', 'Electric Motor'][vinHash % 6],
    transmission: transmission,
    drivetrain: drivetrain,
    fuel: fuel,
    specs: {
      displacement: [1998, 2494, 3456, 4951, 1998, 0][vinHash % 6],
      cylinders: [4, 4, 6, 8, 4, 0][vinHash % 6],
      power_hp: 150 + (vinHash % 200),
      power_kw: Math.round((150 + (vinHash % 200)) * 0.746),
      torque: 180 + (vinHash % 150),
      maxSpeed: 180 + (vinHash % 80),
      acceleration: 5.5 + (vinHash % 50) / 10,
      fuelConsumption: 7 + (vinHash % 8),
      fuelCapacity: 50 + (vinHash % 30),
      co2Emission: 150 + (vinHash % 100),
      emissionStandard: 'Euro 6',
      length: 4500 + (vinHash % 800),
      width: 1800 + (vinHash % 150),
      height: 1400 + (vinHash % 400),
      wheelbase: 2700 + (vinHash % 300),
      weight: 1400 + (vinHash % 600),
      maxWeight: 2000 + (vinHash % 500),
      doors: [2, 4, 4, 2, 4, 4][vinHash % 6],
      seats: ['4', '5', '5', '4', '5', '7'][vinHash % 6],
      trunkCapacity: 350 + (vinHash % 300),
      color: color,
      interiorColor: interiorColor,
    },
    manufacturing: {
      manufacturer: decoded.make === 'Unknown' ? 'Unknown Manufacturer' : `${decoded.make} Motor Corporation`,
      plantCity: decoded.country === 'United States' ? cities[vinHash % cities.length] : 'International',
      plantCountry: decoded.country,
      madeDate: `${yearNum}-${String((vinHash % 12) + 1).padStart(2, '0')}-${String((vinHash % 28) + 1).padStart(2, '0')}`,
    },
    titleRecords,
    accidentRecords,
    salvageRecords: [],
    theftRecords: [],
    recallRecords,
    ownershipHistory,
    saleRecords,
    lienRecords: [],
    marketValue: {
      below: Math.round(depreciatedPrice * 0.85),
      average: depreciatedPrice,
      above: Math.round(depreciatedPrice * 1.15),
    },
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    const { vin, userId, action } = await req.json();
    
    // Handle balance check action
    if (action === 'balance') {
      return new Response(
        JSON.stringify({ 
          message: 'CarfaxDeals API uses per-request pricing. Check your dashboard for usage.',
          configured: !!CARFAXDEALS_API_KEY 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Validate VIN
    if (!vin) {
      return new Response(
        JSON.stringify({ error: 'VIN is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // VIN must be 17 characters
    const cleanVin = vin.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
    if (cleanVin.length !== 17) {
      return new Response(
        JSON.stringify({ error: 'Invalid VIN format. VIN must be 17 alphanumeric characters.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if API key is configured
    if (!CARFAXDEALS_API_KEY) {
      console.log('CarfaxDeals API key not configured, returning VIN-decoded demo data');
      const demoData = generateDemoData(cleanVin, 'API key not configured - showing VIN-decoded sample data');
      return new Response(
        JSON.stringify(demoData),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    try {
      // Make API request to CarfaxDeals
      const apiData = await carfaxDealsRequest(cleanVin);
      
      // Transform response to our format
      const report = transformCarfaxDealsResponse(apiData);
      
      return new Response(
        JSON.stringify(report),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (apiError: any) {
      console.error('CarfaxDeals API call failed:', apiError.message);
      
      // Return VIN-decoded demo data with error info when API fails
      const demoData = generateDemoData(cleanVin, `API error: ${apiError.message}`);
      
      return new Response(
        JSON.stringify(demoData),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
  } catch (error: any) {
    console.error('CarfaxDeals lookup error:', error);
    
    // Even for general errors, try to return demo data
    try {
      const demoData = generateDemoData('UNKNOWN', `Error: ${error.message || 'Unknown error'}`);
      return new Response(
        JSON.stringify(demoData),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch {
      return new Response(
        JSON.stringify({ error: error.message || 'Failed to fetch vehicle history' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }
});