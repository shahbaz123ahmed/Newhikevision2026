const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const categoriesDir = path.join(dataDir, 'categories');

if (!fs.existsSync(categoriesDir)) {
  fs.mkdirSync(categoriesDir, { recursive: true });
}

// 1. Load existing products
const existingProducts = JSON.parse(fs.readFileSync(path.join(dataDir, 'products.json'), 'utf-8'));

// 2. Define Category 1: Video Intercom
const videoIntercomCat = {
  id: "cat_video_intercom",
  name: "Video Intercom",
  slug: "video-intercom",
  image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494703/hikvision_uae/categories/mtc610enhqri9taiiptc.webp"
};

const videoIntercomSubs = [
  {
    id: "sub_indoor_stations",
    name: "Indoor Stations",
    slug: "indoor-stations",
    categorySlug: "video-intercom",
    categoryId: "cat_video_intercom",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494711/hikvision_uae/subcategories/pra3sx2turjajygv8k0h.webp"
  }
];

const videoIntercomProducts = existingProducts.filter(p => p.categorySlug === 'video-intercom').map(p => ({
  ...p,
  categoryId: "cat_video_intercom",
  categorySlug: "video-intercom",
  categoryName: "Video Intercom"
}));

// 3. Define Category 2: Turbo-HD Products
const turboHdCat = {
  id: "cat_turbo_hd_products",
  name: "Turbo-HD Products",
  slug: "turbo-hd-products",
  image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494701/hikvision_uae/categories/fjjbfs8jq0sjqe4hcxkn.jpg"
};

const turboHdSubs = [
  {
    id: "sub_turret_cameras",
    name: "Turret Cameras",
    slug: "turret-cameras",
    categorySlug: "turbo-hd-products",
    categoryId: "cat_turbo_hd_products",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494708/hikvision_uae/subcategories/ewudrvezhkqw7i682bqm.webp"
  }
];

const turboHdProducts = existingProducts.filter(p => p.categorySlug === 'analog-cameras').map(p => ({
  ...p,
  categoryId: "cat_turbo_hd_products",
  categorySlug: "turbo-hd-products",
  categoryName: "Turbo-HD Products"
}));

// 4. Define Category 3: Network Products
const networkCat = {
  id: "cat_network_products",
  name: "Network Products",
  slug: "network-products",
  image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494698/hikvision_uae/categories/pu7sqfzvvhqd2wnoowhr.png"
};

const networkSubs = [
  {
    id: "sub_dome_cameras",
    name: "Dome Cameras",
    slug: "dome-cameras",
    categorySlug: "network-products",
    categoryId: "cat_network_products",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494710/hikvision_uae/subcategories/wzlgsb7kvsnmq39lf3pv.webp"
  },
  {
    id: "sub_bullet_cameras",
    name: "Bullet Cameras",
    slug: "bullet-cameras",
    categorySlug: "network-products",
    categoryId: "cat_network_products",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494705/hikvision_uae/subcategories/emsyajevnpzcv5gsysf4.jpg"
  },
  {
    id: "sub_fixed_bullet_cameras",
    name: "Fixed Bullet Cameras",
    slug: "fixed-bullet-cameras",
    categorySlug: "network-products",
    categoryId: "cat_network_products",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494712/hikvision_uae/subcategories/i1hyk4mdmpsxrl7nw5ne.webp"
  },
  {
    id: "sub_ip_ptz_cameras",
    name: "IP PTZ Cameras",
    slug: "ip-ptz-cameras",
    categorySlug: "network-products",
    categoryId: "cat_network_products",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494706/hikvision_uae/subcategories/v3fsseonrsbs8zhlq2m8.webp"
  },
  {
    id: "sub_pro_series_nvr",
    name: "Pro Series NVR",
    slug: "pro-series-nvr",
    categorySlug: "network-products",
    categoryId: "cat_network_products",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494707/hikvision_uae/subcategories/u1qi2rxppp1esjfvqqqy.jpg"
  },
  {
    id: "sub_poe_switches",
    name: "PoE Switches",
    slug: "poe-switches",
    categorySlug: "network-products",
    categoryId: "cat_network_products",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494712/hikvision_uae/subcategories/ltxarkj7z95u12ec3okg.jpg"
  },
  {
    id: "sub_fingerprint_terminals",
    name: "Access Control Terminals",
    slug: "fingerprint-terminals",
    categorySlug: "network-products",
    categoryId: "cat_network_products",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494709/hikvision_uae/subcategories/r3furzx41knw7cbvybst.jpg"
  }
];

const networkProducts = existingProducts.filter(p => 
  ['network-cameras', 'ptz-cameras', 'network-video-recorders', 'switches', 'access-control'].includes(p.categorySlug)
).map(p => ({
  ...p,
  categoryId: "cat_network_products",
  categorySlug: "network-products",
  categoryName: "Network Products"
}));

// 5. Define Category 4: LED Displays
const ledDisplaysCat = {
  id: "cat_led_displays",
  name: "LED Displays",
  slug: "led-displays",
  image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"
};

const ledDisplaysSubs = [
  {
    id: "sub_indoor_led_displays",
    name: "Indoor LED Displays",
    slug: "indoor-led-displays",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"
  },
  {
    id: "sub_commercial_displays",
    name: "Commercial Displays",
    slug: "commercial-displays",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"
  }
];

const ledDisplaysProducts = [
  {
    id: "prod_led_indoor_fine_pitch",
    name: "Hikvision Ultra Fine Pitch Indoor LED Video Wall",
    slug: "hikvision-ultra-fine-pitch-indoor-led-video-wall",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    categoryName: "LED Displays",
    subCategorySlug: "indoor-led-displays",
    subCategoryId: "sub_indoor_led_displays",
    subCategoryName: "Indoor LED Displays",
    images: ["https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"],
    rating: 5,
    isFeatured: true,
    description: "The Hikvision Ultra Fine Pitch Indoor LED Video Wall provides seamless ultra-high definition visualization engineered for command centers, enterprise boardrooms, and control rooms across the UAE. Utilizing advanced pixel calibration and ultra-low latency image processing, this display delivers breathtaking color accuracy and vibrant contrast in any lighting environment. Built with industrial-grade reliability, front-serviceable modular architecture, and dual-power redundancy, it guarantees 24/7 continuous operation for mission-critical security and monitoring environments.",
    features: [
      "Seamless bezel-less modular video wall design",
      "Ultra-fine pixel pitch with vivid color reproduction",
      "Front-service maintenance for rapid module access",
      "High refresh rate eliminating on-camera flicker",
      "Dual power and signal backup redundancy",
      "Wide viewing angle with consistent brightness",
      "Intelligent temperature control and silent cooling",
      "Seamless integration with Hikvision video controllers"
    ],
    keyFeatures: [
      "Fine Pitch",
      "Seamless Display",
      "Front Service",
      "Ultra HD",
      "Dual Backup",
      "High Refresh",
      "Vivid Color",
      "24/7 Reliable"
    ],
    specifications: [
      { label: "Pixel Pitch", value: "P1.2 / P1.5 / P1.8 mm" },
      { label: "Brightness", value: "600 to 1000 nits adjustable" },
      { label: "Refresh Rate", value: "3840 Hz high refresh" },
      { label: "Viewing Angle", value: "160° Horizontal / 140° Vertical" },
      { label: "Maintenance", value: "Full front & rear service" },
      { label: "Lifespan", value: "100,000 hours continuous" }
    ]
  },
  {
    id: "prod_led_commercial_interactive_screen",
    name: "Hikvision 4K UHD Interactive Commercial Display",
    slug: "hikvision-4k-uhd-interactive-commercial-display",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    categoryName: "LED Displays",
    subCategorySlug: "commercial-displays",
    subCategoryId: "sub_commercial_displays",
    subCategoryName: "Commercial Displays",
    images: ["https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"],
    rating: 5,
    isFeatured: true,
    description: "The Hikvision 4K UHD Interactive Commercial Display is designed for modern corporate meeting spaces, educational institutions, and digital signage deployments throughout Dubai and the UAE. Featuring an anti-glare 4K UHD screen with ultra-smooth 20-point multi-touch writing capability, it elevates collaboration and interactive presentations to new standards. Engineered with integrated Android and Windows dual OS support, built-in wireless screen projection, and robust enterprise security, this display ensures frictionless daily operations and dependable commercial performance.",
    features: [
      "Ultra 4K UHD resolution with anti-glare glass coating",
      "High-precision 20-point IR touch whiteboard",
      "Dual OS support with seamless Android and Windows OPS",
      "Wireless screen projection from PC, Mac, and mobile",
      "Integrated 4K camera and 8-array microphone array",
      "Built-in stereo acoustic speakers with crystal audio",
      "Enterprise security with localized data protection",
      "Multiple HDMI, USB-C, and network connectivity ports"
    ],
    keyFeatures: [
      "4K UHD",
      "20-Point Touch",
      "Dual OS",
      "Wireless Cast",
      "Integrated Mic",
      "Anti Glare",
      "USB-C Hub",
      "Smart Board"
    ],
    specifications: [
      { label: "Screen Size", value: "65 / 75 / 86 inch 4K UHD" },
      { label: "Touch Technology", value: "Infrared 20-point touch" },
      { label: "Audio & Mic", value: "Built-in 8-mic array + speakers" },
      { label: "Connectivity", value: "HDMI 2.0, USB-C, LAN, Wi-Fi" },
      { label: "Operating System", value: "Android 13 + Optional Windows OPS" },
      { label: "Glass Protection", value: "4mm AG tempered glass" }
    ]
  }
];

// Helper to write module files
function writeCategoryModule(folderName, categoryObj, subcategoriesArr, productsArr) {
  const dir = path.join(categoriesDir, folderName);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // 1. category.ts
  fs.writeFileSync(
    path.join(dir, 'category.ts'),
    `export const ${folderName.replace(/-/g, '_')}_category = ${JSON.stringify(categoryObj, null, 2)};\nexport default ${folderName.replace(/-/g, '_')}_category;\n`
  );

  // 2. subcategories.ts
  fs.writeFileSync(
    path.join(dir, 'subcategories.ts'),
    `export const ${folderName.replace(/-/g, '_')}_subcategories = ${JSON.stringify(subcategoriesArr, null, 2)};\nexport default ${folderName.replace(/-/g, '_')}_subcategories;\n`
  );

  // 3. products.json
  fs.writeFileSync(
    path.join(dir, 'products.json'),
    JSON.stringify(productsArr, null, 2)
  );

  // 4. products.ts
  fs.writeFileSync(
    path.join(dir, 'products.ts'),
    `export const ${folderName.replace(/-/g, '_')}_products = ${JSON.stringify(productsArr, null, 2)};\nexport default ${folderName.replace(/-/g, '_')}_products;\n`
  );

  // 5. index.ts
  fs.writeFileSync(
    path.join(dir, 'index.ts'),
    `export * from './category';\nexport * from './subcategories';\nexport * from './products';\n`
  );
}

// Write all 4 category folders
writeCategoryModule('video-intercom', videoIntercomCat, videoIntercomSubs, videoIntercomProducts);
writeCategoryModule('led-displays', ledDisplaysCat, ledDisplaysSubs, ledDisplaysProducts);
writeCategoryModule('turbo-hd-products', turboHdCat, turboHdSubs, turboHdProducts);
writeCategoryModule('network-products', networkCat, networkSubs, networkProducts);

console.log('Categories created successfully!');
console.log('Video Intercom products:', videoIntercomProducts.length);
console.log('LED Displays products:', ledDisplaysProducts.length);
console.log('Turbo-HD products:', turboHdProducts.length);
console.log('Network Products products:', networkProducts.length);
