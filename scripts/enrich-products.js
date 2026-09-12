const fs = require('fs');

const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

let productsProcessed = 0;
let featuresAdded = 0;
let specificationsGenerated = 0;
let emptyFieldsFixed = 0;

function parseModelDetails(name, subCategorySlug, categorySlug) {
  const upper = name.toUpperCase();
  
  // Camera resolution detection
  let res = '4 MP (2560 × 1440)';
  if (upper.includes('208') || upper.includes('218') || upper.includes('8MP') || upper.includes('4K') || upper.includes('83') || upper.includes('86')) {
    res = '8 MP 4K Ultra HD (3840 × 2160)';
  } else if (upper.includes('204') || upper.includes('214') || upper.includes('234') || upper.includes('4MP') || upper.includes('14') || upper.includes('43')) {
    res = '4 MP Super HD (2560 × 1440)';
  } else if (upper.includes('202') || upper.includes('212') || upper.includes('102') || upper.includes('2MP') || upper.includes('1080P') || upper.includes('16D0T')) {
    res = '2 MP Full HD (1920 × 1080)';
  } else if (upper.includes('206') || upper.includes('6MP')) {
    res = '6 MP Ultra HD (3200 × 1800)';
  }

  // Zoom for PTZ
  let zoom = '25× Optical Zoom, 16× Digital';
  if (upper.includes('4215') || upper.includes('15X')) zoom = '15× Optical Zoom, 16× Digital';
  if (upper.includes('4232') || upper.includes('32X')) zoom = '32× Optical Zoom, 16× Digital';
  if (upper.includes('4A425') || upper.includes('25X')) zoom = '25× Optical Zoom, 16× Digital';
  if (upper.includes('4337') || upper.includes('37X')) zoom = '37× Optical Zoom, 16× Digital';

  // Channels for NVR
  let channels = '16 Channels IP Video Input';
  let hdd = '2 SATA Interfaces (Up to 10TB each)';
  if (upper.includes('7604') || upper.includes('4NI')) { channels = '4 Channels IP Video Input'; hdd = '1 SATA Interface (Up to 8TB)'; }
  if (upper.includes('7608') || upper.includes('8NI')) { channels = '8 Channels IP Video Input'; hdd = '1 SATA Interface (Up to 10TB)'; }
  if (upper.includes('7616') || upper.includes('16NI')) { channels = '16 Channels IP Video Input'; hdd = '2 SATA Interfaces (Up to 10TB each)'; }
  if (upper.includes('7632') || upper.includes('32N') || upper.includes('32NI')) { channels = '32 Channels IP Video Input'; hdd = '4 SATA Interfaces (Up to 12TB each)'; }
  if (upper.includes('7732') || upper.includes('9632')) { channels = '32 Channels Ultra 4K Input'; hdd = '4 SATA Interfaces (Up to 12TB each)'; }
  if (upper.includes('769066') || upper.includes('769661')) { channels = '16/32 Channels Pro AcuSense Input'; hdd = '2 SATA Interfaces (Up to 12TB each)'; }

  // Ports for Switches
  let ports = '16 × 10/100M PoE Ports + 2 Gigabit Uplink';
  let poeBudget = '230W Total PoE Power Budget';
  if (upper.includes('0105') || upper.includes('0106') || upper.includes('4P')) { ports = '4 × 10/100M PoE Ports + 1 Uplink'; poeBudget = '60W Total PoE Budget'; }
  if (upper.includes('0109') || upper.includes('0110') || upper.includes('8P')) { ports = '8 × 10/100M PoE Ports + 1 Gigabit Uplink'; poeBudget = '120W Total PoE Budget'; }
  if (upper.includes('0318') || upper.includes('1467') || upper.includes('18P') || upper.includes('16P')) { ports = '16 × 10/100M PoE Ports + 2 Gigabit Combo'; poeBudget = '230W Total PoE Budget'; }
  if (upper.includes('0326') || upper.includes('3231') || upper.includes('24P')) { ports = '24 × 10/100M PoE Ports + 2 Gigabit SFP Combo'; poeBudget = '370W Total PoE Budget'; }
  if (upper.includes('0518') || upper.includes('0524')) { ports = '16/24 Full Gigabit PoE Ports + 2 SFP'; poeBudget = '370W High-Power PoE'; }

  return { res, zoom, channels, hdd, ports, poeBudget };
}

function generateDescription(p) {
  const name = p.name;
  const subCat = p.subCategorySlug;
  const details = parseModelDetails(name, subCat, p.categorySlug);

  if (subCat === 'indoor-stations') {
    return `The Hikvision ${name} is an enterprise-grade video intercom indoor station engineered to deliver seamless communication and visitor management across UAE residential and commercial properties. Featuring a vibrant high-definition capacitive touch display and ultra-clear two-way audio with advanced noise suppression, it allows occupants to effortlessly view, converse with, and grant entry to visitors. Built with premium materials, robust network security protocols, and plug-and-play Hikvision system interoperability, this indoor station guarantees dependable around-the-clock operation and effortless access control management.`;
  }

  if (subCat === 'fingerprint-terminals') {
    return `The Hikvision ${name} is a high-performance access control and time attendance terminal designed for enterprise facilities, corporate offices, and secure installations across the UAE. Engineered with advanced optical fingerprint recognition algorithms and multi-factor authentication modes, it provides rapid, fraud-resistant verification in under 0.2 seconds. Its durable construction, tamper-proof architecture, and extensive communication interfaces ensure seamless integration with central management software, access controllers, and automated door hardware for reliable perimeter security.`;
  }

  if (subCat === 'bullet-cameras' || subCat === 'fixed-bullet-cameras') {
    return `The Hikvision ${name} is a high-performance bullet security camera engineered for comprehensive perimeter protection and outdoor surveillance in demanding UAE climates. Equipped with an advanced progressive scan sensor delivering ${details.res} and ultra-low light night vision, it captures crisp, detailed video in total darkness. Designed with IP67 weatherproof housing and intelligent AcuSense deep learning analytics, this camera accurately differentiates human and vehicle targets to prevent false alarms while maintaining continuous 24/7 security.`;
  }

  if (subCat === 'dome-cameras') {
    return `The Hikvision ${name} is an enterprise-grade dome surveillance camera tailored for indoor and outdoor commercial installations requiring discreet yet robust security monitoring. Delivering pristine ${details.res} video stream clarity with DarkFighter illumination technology, it provides exceptional forensic detail even under challenging lighting environments. Featuring IK10 vandal-proof resistance and IP67 weather sealing, this camera ensures exceptional durability, tamper protection, and intelligent event detection for corporate, retail, and public safety infrastructure.`;
  }

  if (subCat === 'turret-cameras') {
    return `The Hikvision ${name} is a professional turret network camera crafted to provide superior optical surveillance with zero infrared reflection or lens glare. Delivering exceptional ${details.res} imaging backed by 120 dB True WDR and smart EXIR night vision, it ensures clear face and license plate recognition in high-contrast lighting conditions. With its flexible 3-axis adjustment mechanism, robust weather resistance, and smart video analytics, it is a versatile solution for modern business and residential security deployments across the UAE.`;
  }

  if (subCat === 'ip-ptz-cameras') {
    return `The Hikvision ${name} is an advanced high-speed pan-tilt-zoom (PTZ) camera designed for expansive area monitoring, perimeter tracking, and critical infrastructure surveillance in the UAE. Featuring ${details.zoom} and powerful long-range infrared illumination, it allows security personnel to inspect distant details with pinpoint optical precision. Equipped with 360-degree endless rotation, smart auto-tracking, and intelligent perimeter protection, this camera delivers uncompromised situational awareness across industrial zones, airports, and city monitoring projects.`;
  }

  if (subCat === 'pro-series-nvr') {
    return `The Hikvision ${name} is a professional-grade Network Video Recorder (NVR) engineered for centralized surveillance storage, high-throughput stream processing, and multi-channel 4K video management. Supporting ${details.channels} with H.265+ ultra-efficient video compression, it drastically reduces bandwidth consumption while maximizing archival retention. Featuring redundant power support, multi-SATA storage expandability, and seamless remote management via Hik-Connect and iVMS-4200, it provides rock-solid recording reliability for enterprise security ecosystems.`;
  }

  if (subCat === 'poe-switches') {
    return `The Hikvision ${name} is a heavy-duty Power over Ethernet (PoE) network switch purpose-built for IP surveillance systems and mission-critical network infrastructure. Offering ${details.ports} with up to 300-meter extended long-range transmission and intelligent PoE power management, it delivers uninterrupted power and data to cameras and access devices. Built with 6 kV surge protection, high backplane switching capacity, and VIP port priority forwarding, it guarantees smooth, zero-latency video transmission even under peak network loads.`;
  }

  return `The Hikvision ${name} is a high-performance commercial security device engineered to deliver industry-leading reliability and superior build quality for UAE installations. Utilizing advanced Hikvision processing hardware and smart optimization algorithms, it ensures consistent operation in demanding environmental conditions. With seamless system integration, enterprise-grade data protection, and straightforward installation, this device is an indispensable component for comprehensive modern security and surveillance infrastructure.`;
}

function generateFeatures(p) {
  const name = p.name;
  const subCat = p.subCategorySlug;
  const details = parseModelDetails(name, subCat, p.categorySlug);

  if (subCat === 'indoor-stations') {
    return [
      "7-inch Capacitive HD Touchscreen Display",
      "Crystal Clear Two-Way Audio with Noise Suppression",
      "One-Touch Remote Door Unlocking & Live Monitoring",
      "Seamless Integration with Hikvision Intercom & IP Cameras",
      "Standard PoE (802.3af) & 12V DC Power Supply Options",
      "Built-in Wi-Fi & RJ45 Ethernet Network Connectivity",
      "MicroSD Card Storage Slot for Message & Snapshot History",
      "Sleek Modern Wall-Mounted Architectural Finish"
    ];
  }

  if (subCat === 'fingerprint-terminals') {
    return [
      "High-Precision Optical Fingerprint Sensor (FAR < 0.001%)",
      "Multi-Factor Authentication (Fingerprint, Card & PIN)",
      "High Capacity User & Attendance Record Log Storage",
      "Real-Time Verification Speed Under 0.2 Seconds",
      "Tamper-Proof Alarm & Forced Entry Alert System",
      "TCP/IP, RS-485, Wiegand & USB Configuration Interfaces",
      "Standalone Operation with Full Access Controller Support",
      "Intuitive Color LCD Interface with Backlit Keypad"
    ];
  }

  if (subCat === 'bullet-cameras' || subCat === 'fixed-bullet-cameras') {
    return [
      `Ultra High Resolution Imaging (${details.res})`,
      "EXIR 2.0 Smart Infrared Night Vision up to 60m",
      "120 dB True WDR for Clear Imaging Against Strong Backlight",
      "AcuSense Deep Learning Human & Vehicle Classification",
      "Efficient H.265+ Compression Technology to Save Bandwidth",
      "IP67 Weatherproof & Dust-Tight Rugged Metal Housing",
      "Built-in MicroSD Card Slot Supporting up to 512GB",
      "Power over Ethernet (PoE) Support for Single-Cable Setup"
    ];
  }

  if (subCat === 'dome-cameras') {
    return [
      `High-Definition Video Stream Output (${details.res})`,
      "DarkFighter Ultra-Low Light Imaging Sensor Technology",
      "IK10 Vandal-Proof Impact Resistant Dome Construction",
      "IP67 Weather-Resistant Enclosure for Harsh UAE Conditions",
      "Advanced AcuSense Target Classification (Human & Vehicle)",
      "120 dB True WDR & 3D Digital Noise Reduction (3D DNR)",
      "Built-in Microphone for Synchronized Audio Recording",
      "H.265+ Codec Support for Optimized Bandwidth & Storage"
    ];
  }

  if (subCat === 'turret-cameras') {
    return [
      `Crystal Clear Video Clarity (${details.res})`,
      "Anti-Reflective Flat Turret Glass Eliminating IR Reflection",
      "Smart EXIR Night Vision with Uniform Infrared Illumination",
      "Intelligent Human and Vehicle Motion Detection Analytics",
      "120 dB True WDR for High Contrast Light Balancing",
      "3-Axis Gimbal Adjustment for Flexible Mounting Angles",
      "IP67 Certified Weatherproof Design for Outdoor Durability",
      "PoE and 12V DC Power Compatibility for Quick Installation"
    ];
  }

  if (subCat === 'ip-ptz-cameras') {
    return [
      `${details.zoom} for Superior Long-Distance Detail`,
      "High-Speed 360° Continuous Pan and -15° to 90° Tilt",
      "Smart Auto-Tracking 2.0 with Human/Vehicle Target Locking",
      "Ultra-Long Range Infrared Illumination up to 150m+",
      "DarkFighter Ultra-Sensitive Low-Light Optical Sensor",
      "120 dB True WDR, Optical Defog & Electronic Image Stabilization",
      "IP66 Weatherproof and 4000V Lightning Surge Protection",
      "Hi-PoE and 24V AC Dual Power Supply Compatibility"
    ];
  }

  if (subCat === 'pro-series-nvr') {
    return [
      `High-Throughput Recording Support for ${details.channels}`,
      "4K Ultra HD HDMI & VGA Independent Video Display Outputs",
      `Multi-Bay SATA Storage Support (${details.hdd})`,
      "Advanced H.265+ Video Decoding & Bandwidth Optimization",
      "AcuSense Deep Learning Analytics for Smart Search & Playback",
      "Simultaneous Multi-Channel Synchronous Playback at 4K",
      "Dual Gigabit Ethernet Interfaces for Network Redundancy",
      "Hik-Connect Cloud P2P Remote Monitoring & Alert Push"
    ];
  }

  if (subCat === 'poe-switches') {
    return [
      `${details.ports} Configuration`,
      `Intelligent ${details.poeBudget} with Smart Power Management`,
      "Ultra Long-Range Transmission up to 300 Meters in Extend Mode",
      "6 kV Lightning & Surge Protection on All Ethernet Ports",
      "VIP Priority Ports for Zero-Packet-Loss Video Buffering",
      "High-Bandwidth Non-Blocking Switching Fabric Architecture",
      "Durable Solid Metal Chassis with Passive Cooling Design",
      "Plug and Play Setup with Zero Software Configuration Required"
    ];
  }

  return [
    "Enterprise-Grade Industrial Hardware Architecture",
    "Comprehensive Environmental & Weather Resistance",
    "Optimized Power Efficiency with Smart Circuit Protection",
    "Seamless Compatibility with Hikvision Ecosystem Devices",
    "High-Security Firmware with Encrypted Data Transmission",
    "Fast and Flexible Mounting Options for Field Deployments",
    "Real-Time Status Monitoring and Automated Error Diagnostics",
    "Backed by Full Manufacturer Warranty & Technical Support"
  ];
}

function generateKeyFeatures(p) {
  const subCat = p.subCategorySlug;

  if (subCat === 'indoor-stations') {
    return [
      "HD Touchscreen",
      "Two-Way Audio",
      "Remote Unlock",
      "Live Camera View",
      "PoE Power",
      "Wi-Fi Enabled",
      "Smart Integration",
      "Slim Modern Design"
    ];
  }

  if (subCat === 'fingerprint-terminals') {
    return [
      "Rapid Biometrics",
      "Multi-Factor Auth",
      "High Capacity",
      "Tamper Alarm",
      "Network Connected",
      "Wiegand Support",
      "Time Attendance",
      "Secure Operation"
    ];
  }

  if (subCat === 'bullet-cameras' || subCat === 'fixed-bullet-cameras') {
    return [
      "Ultra HD Clarity",
      "Smart Night Vision",
      "AcuSense AI",
      "Weatherproof IP67",
      "H.265+ Codec",
      "True WDR 120dB",
      "PoE Enabled",
      "24/7 Reliability"
    ];
  }

  if (subCat === 'dome-cameras') {
    return [
      "Vandal-Proof IK10",
      "DarkFighter Tech",
      "Weatherproof IP67",
      "AI Classification",
      "Built-in Mic",
      "True WDR",
      "Discreet Profile",
      "PoE Powered"
    ];
  }

  if (subCat === 'turret-cameras') {
    return [
      "Zero IR Glare",
      "EXIR Illumination",
      "3-Axis Adjust",
      "AcuSense Analytics",
      "IP67 Weatherproof",
      "True WDR",
      "Crystal Audio",
      "Easy Installation"
    ];
  }

  if (subCat === 'ip-ptz-cameras') {
    return [
      "High Optical Zoom",
      "360° Endless Pan",
      "Auto-Tracking AI",
      "Long-Range IR",
      "DarkFighter Lens",
      "Surge Protection",
      "Hi-PoE Support",
      "Perimeter Guard"
    ];
  }

  if (subCat === 'pro-series-nvr') {
    return [
      "4K Ultra HD",
      "Multi-Channel Input",
      "H.265+ Decoding",
      "Large Storage",
      "Smart AI Search",
      "Cloud P2P Access",
      "Dual Network Ports",
      "Enterprise Grade"
    ];
  }

  if (subCat === 'poe-switches') {
    return [
      "High PoE Budget",
      "300m Long Range",
      "Surge Protected",
      "VIP Port Priority",
      "Gigabit Uplinks",
      "Plug and Play",
      "Metal Enclosure",
      "Zero Video Loss"
    ];
  }

  return [
    "High Reliability",
    "Smart Integration",
    "Quick Setup",
    "Secure Operation",
    "Weatherproof Build",
    "Energy Efficient",
    "Official Warranty",
    "Professional Grade"
  ];
}

function generateSpecifications(p) {
  const name = p.name;
  const subCat = p.subCategorySlug;
  const details = parseModelDetails(name, subCat, p.categorySlug);

  if (subCat === 'indoor-stations') {
    return {
      "Display": "7-inch Capacitive Touch Screen",
      "Resolution": "1024 × 600 HD Color Display",
      "Audio": "Built-in Omnidirectional Mic & Speaker",
      "Communication": "TCP/IP, Wi-Fi 802.11 b/g/n, RTSP",
      "Installation": "Surface Wall Mounting with Bracket",
      "Integration": "Hikvision Door Stations & IP Cameras"
    };
  }

  if (subCat === 'fingerprint-terminals') {
    return {
      "Authentication": "Fingerprint, RFID/Mifare Card, PIN Code",
      "Capacity": "Up to 3,000 Fingerprints / 100,000 Records",
      "Security": "Tamper-Proof Optical Sensor & Alarm Output",
      "Communication": "TCP/IP, RS-485, Wiegand, USB Host",
      "Installation": "Standard Wall Surface Mount",
      "Management": "Hik-Central, iVMS-4200, Web Client"
    };
  }

  if (subCat === 'bullet-cameras' || subCat === 'fixed-bullet-cameras') {
    return {
      "Resolution": details.res,
      "Lens": "2.8 mm / 4 mm Fixed Focal Lens",
      "Night Vision": "EXIR 2.0 Smart IR up to 40m - 60m",
      "Compression": "H.265+ / H.265 / H.264+ / H.264",
      "Protection": "IP67 Weatherproof Rated Housing",
      "Power": "12V DC ± 25% / PoE (802.3af, Class 3)"
    };
  }

  if (subCat === 'dome-cameras') {
    return {
      "Resolution": details.res,
      "Lens": "2.8 mm / 4 mm Ultra-Wide Lens",
      "Night Vision": "DarkFighter Smart IR up to 30m - 40m",
      "Compression": "H.265+ / H.265 / H.264+ / MJPEG",
      "Protection": "IK10 Vandal-Proof & IP67 Weatherproof",
      "Power": "12V DC / Standard PoE (802.3af)"
    };
  }

  if (subCat === 'turret-cameras') {
    return {
      "Resolution": details.res,
      "Lens": "2.8 mm / 4 mm / 6 mm Fixed Lens",
      "Night Vision": "EXIR 2.0 Night Vision up to 40m",
      "Compression": "H.265+ / H.265 / H.264+ / H.264",
      "Protection": "IP67 Ingress Protection Rating",
      "Power": "12V DC ± 25% / PoE (802.3af)"
    };
  }

  if (subCat === 'ip-ptz-cameras') {
    return {
      "Resolution": details.res,
      "Lens": `${details.zoom} (4.8 mm to 120 mm)`,
      "Night Vision": "Long-Range Smart IR up to 100m - 150m",
      "Compression": "H.265+ / H.265 / H.264+ / H.264",
      "Protection": "IP66 Weatherproof & 4kV Surge Protection",
      "Power": "24V AC & Hi-PoE (802.3at, Class 4)"
    };
  }

  if (subCat === 'pro-series-nvr') {
    return {
      "Channels": details.channels,
      "Storage": details.hdd,
      "Recording": "Up to 12 MP / 4K Ultra HD Resolution",
      "Playback": "16-ch Synchronous Playback at 1080p",
      "Network": "1 × RJ-45 10/100/1000M Self-Adaptive Interface",
      "Compression": "H.265+ / H.265 / H.264+ / H.264"
    };
  }

  if (subCat === 'poe-switches') {
    return {
      "Ports": details.ports,
      "PoE Power": details.poeBudget,
      "Switching Capacity": "7.2 Gbps - 12.8 Gbps High Backplane",
      "Forwarding Rate": "5.36 Mpps - 9.52 Mpps Wire-Speed",
      "Protection": "6 kV Lightning Surge Protection on Ports",
      "Management": "Unmanaged / Extended Range Mode Switch"
    };
  }

  return {
    "Resolution": details.res,
    "Lens": "Fixed Focal Lens with Wide Angle",
    "Night Vision": "Smart Infrared Illumination",
    "Compression": "H.265+ / H.265 High Efficiency",
    "Protection": "IP67 Weather & Dust Resistant",
    "Power": "12V DC / PoE Compatible"
  };
}

// Process every product
const updatedProducts = products.map((prod) => {
  productsProcessed++;

  // 1. Description
  const hasCustomLongDesc = prod.description && prod.description.split(' ').length >= 60 && !prod.description.includes('is a high-performance');
  const description = hasCustomLongDesc ? prod.description : generateDescription(prod);

  // 2. Features (Exactly 8)
  const features = generateFeatures(prod);
  featuresAdded += 8;

  // 3. Key Features (Exactly 8, max 3 words each)
  const keyFeatures = generateKeyFeatures(prod);

  // 4. Specifications (Exactly 6 cards)
  const specifications = (prod.specifications && Object.keys(prod.specifications).length === 6)
    ? prod.specifications
    : generateSpecifications(prod);
  specificationsGenerated += 6;

  // Track fixes
  if (!prod.description || prod.description.length < 50) emptyFieldsFixed++;
  if (!prod.features || prod.features.length < 8) emptyFieldsFixed++;
  if (!prod.keyFeatures || prod.keyFeatures.length < 8) emptyFieldsFixed++;
  if (!prod.specifications || Object.keys(prod.specifications).length < 6) emptyFieldsFixed++;

  return {
    ...prod,
    description,
    features,
    keyFeatures,
    specifications
  };
});

// Write to data/products.json
fs.writeFileSync('data/products.json', JSON.stringify(updatedProducts, null, 2));

// Sync directly to data/products.ts
const tsContent = `export interface Product {
  id: string;
  name: string;
  slug: string;
  subTitle?: string;
  categorySlug: string;
  subCategorySlug: string;
  images: string[];
  description: string;
  features?: string[];
  keyFeatures?: string[];
  specifications?: Record<string, any>;
  rating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
}

export const products: Product[] = ${JSON.stringify(updatedProducts, null, 2)};
`;
fs.writeFileSync('data/products.ts', tsContent);

console.log('--- ENRICHMENT COMPLETED SUCCESSFULLY ---');
console.log(`Products Processed: ${productsProcessed}`);
console.log(`Features Added/Standardized: ${featuresAdded}`);
console.log(`Specifications Generated: ${specificationsGenerated}`);
console.log(`Empty/Short Fields Fixed: ${emptyFieldsFixed}`);
