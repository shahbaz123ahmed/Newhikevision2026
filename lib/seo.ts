import type { Metadata } from 'next';
import { Product, Category, SubCategory } from '@/data/catalog';

export const SITE_URL = 'https://hikvisionuae.ae';
export const SITE_NAME = 'Hikvision UAE';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.webp`;

export const CONTACT_INFO = {
  phone: '+971 50 969 3134',
  phoneFormatted: '+971509693134',
  email: 'sales@hikvisionuae.ae',
  address: {
    streetAddress: 'Al Khabaisi, Abu Hail',
    addressLocality: 'Dubai',
    addressRegion: 'Dubai',
    postalCode: '00000',
    addressCountry: 'AE',
  },
  geo: {
    latitude: '25.2697',
    longitude: '55.3340',
  },
  openingHours: 'Mo,Tu,We,Th,Fr,Sa 09:00-19:00',
  emirates: [
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
    'Fujairah',
    'Umm Al Quwain',
  ],
};

// -------------------------------------------------------------
// 1. DYNAMIC METADATA GENERATORS
// -------------------------------------------------------------

export function generateProductMetadata(
  product: Product,
  category?: Category,
  subCategory?: SubCategory
): Metadata {
  const modelName = product.name;
  const catName = category?.name || 'Security Camera';
  const subName = subCategory?.name || '';
  const canonicalUrl = `${SITE_URL}/products/${product.categorySlug}/${product.subCategorySlug}/${product.slug}`;

  const title = `${modelName} in Dubai, UAE | Hikvision Official Distributor`;
  const description = `Buy genuine Hikvision ${modelName} ${subName ? `(${subName})` : ''} in Dubai, UAE with 3-year official warranty. Authorized distributor in Dubai, Abu Dhabi & Sharjah. Best B2B price, fast delivery & technical support.`;

  const keywords = [
    modelName,
    `Hikvision ${modelName}`,
    `${modelName} Dubai`,
    `${modelName} UAE`,
    `${modelName} price Dubai`,
    `${modelName} datasheet`,
    `buy ${modelName} UAE`,
    `Hikvision ${catName} Dubai`,
    `Hikvision ${subName} UAE`,
    'Hikvision authorized distributor Dubai',
    'CCTV supplier Dubai',
    'Hikvision security cameras UAE',
  ];

  const rawImage = product.images?.[0] || '';
  const imageUrl = rawImage
    ? rawImage.startsWith('http')
      ? rawImage
      : `${SITE_URL}${rawImage}`
    : DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_AE',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${modelName} - Hikvision UAE`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateCategoryMetadata(category: Category): Metadata {
  const catName = category.name;
  const canonicalUrl = `${SITE_URL}/products/${category.slug}`;
  const title = `Hikvision ${catName} in Dubai, UAE | Official Distributor Catalog`;
  const description = `Explore the official Hikvision ${catName} range in the UAE. Genuine products with manufacturer warranty, expert installation & fastest delivery across Dubai, Abu Dhabi, Sharjah & Northern Emirates.`;

  const keywords = [
    `Hikvision ${catName}`,
    `${catName} Dubai`,
    `${catName} UAE`,
    `Hikvision ${catName} price`,
    `buy Hikvision ${catName} UAE`,
    'CCTV distributor Dubai',
    'Hikvision UAE',
  ];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_AE',
      type: 'website',
      images: [
        {
          url: category.image ? (category.image.startsWith('http') ? category.image : `${SITE_URL}${category.image}`) : DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `Hikvision ${catName} Dubai UAE`,
        },
      ],
    },
  };
}

export function generateSubCategoryMetadata(
  subCategory: SubCategory,
  category?: Category
): Metadata {
  const subName = subCategory.name;
  const catName = category?.name || '';
  const canonicalUrl = `${SITE_URL}/products/${subCategory.categorySlug}/${subCategory.slug}`;
  const title = `Hikvision ${subName} ${catName ? `(${catName})` : ''} in Dubai, UAE | Best Price`;
  const description = `Shop official Hikvision ${subName} solutions in Dubai & UAE. High performance ${catName || 'surveillance systems'} with local warranty, B2B wholesale rates, and 24/7 technical support.`;

  const keywords = [
    `Hikvision ${subName}`,
    `${subName} Dubai`,
    `${subName} UAE`,
    `Hikvision ${subName} price Dubai`,
    'Hikvision distributor UAE',
  ];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_AE',
      type: 'website',
      images: [
        {
          url: subCategory.image ? (subCategory.image.startsWith('http') ? subCategory.image : `${SITE_URL}${subCategory.image}`) : DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `Hikvision ${subName} UAE`,
        },
      ],
    },
  };
}

// -------------------------------------------------------------
// 2. GOOGLE STRUCTURED DATA / JSON-LD SCHEMAS
// -------------------------------------------------------------

export function generateProductJsonLd(
  product: Product,
  category?: Category,
  subCategory?: SubCategory
) {
  const canonicalUrl = `${SITE_URL}/products/${product.categorySlug}/${product.subCategorySlug}/${product.slug}`;
  const rawImage = product.images?.[0] || '';
  const imageUrl = rawImage
    ? rawImage.startsWith('http')
      ? rawImage
      : `${SITE_URL}${rawImage}`
    : DEFAULT_OG_IMAGE;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [imageUrl],
    description: product.description || `Genuine Hikvision ${product.name} security hardware supplied by authorized distributor in Dubai, UAE with official warranty.`,
    sku: product.slug,
    mpn: product.name,
    brand: {
      '@type': 'Brand',
      name: 'Hikvision',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Hikvision Digital Technology',
    },
    category: category?.name || 'Security Systems',
    offers: {
      '@type': 'Offer',
      url: canonicalUrl,
      priceCurrency: 'AED',
      price: '1.00', // Request quote / B2B wholesale
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        telephone: CONTACT_INFO.phone,
      },
      areaServed: CONTACT_INFO.emirates.map((emirate) => ({
        '@type': 'AdministrativeArea',
        name: `${emirate}, UAE`,
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '48',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateFAQJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SecuritySystemSupplier',
    '@id': `${SITE_URL}/#organization`,
    name: 'Hikvision UAE - Official Authorized Distributor',
    alternateName: 'Hikvision Dubai',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    image: `${SITE_URL}/herosection/HikUae.webp`,
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    priceRange: 'AED',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.address.streetAddress,
      addressLocality: CONTACT_INFO.address.addressLocality,
      addressRegion: CONTACT_INFO.address.addressRegion,
      postalCode: CONTACT_INFO.address.postalCode,
      addressCountry: CONTACT_INFO.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CONTACT_INFO.geo.latitude,
      longitude: CONTACT_INFO.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    areaServed: CONTACT_INFO.emirates.map((emirate) => ({
      '@type': 'AdministrativeArea',
      name: `${emirate}, United Arab Emirates`,
    })),
    sameAs: [
      'https://www.hikvision.com',
    ],
  };
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Hikvision UAE',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
