import type { Metadata } from 'next';
import {
  getCategoryBySlug,
  getSubCategoryBySlug,
  getProductBySlug,
  categories,
  subCategories,
  products,
} from '@/data/catalog';
import {
  generateProductMetadata,
  generateCategoryMetadata,
  generateSubCategoryMetadata,
  generateProductJsonLd,
  generateBreadcrumbJsonLd,
  generateFAQJsonLd,
  SITE_URL,
} from '@/lib/seo';
import ProductCatchAllClient from './ProductCatchAllClient';

export async function generateStaticParams() {
  const paths: { slug: string[] }[] = [];

  // 1. Category paths: /products/[category]
  categories.forEach((cat) => {
    paths.push({ slug: [cat.slug] });
  });

  // 2. SubCategory paths: /products/[category]/[subcategory]
  subCategories.forEach((sub) => {
    paths.push({ slug: [sub.categorySlug, sub.slug] });
  });

  // 3. Product paths: /products/[category]/[subcategory]/[product]
  products.forEach((prod) => {
    paths.push({ slug: [prod.categorySlug, prod.subCategorySlug, prod.slug] });
  });

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug.length === 1) {
    const category = getCategoryBySlug(slug[0]);
    if (category) {
      return generateCategoryMetadata(category);
    }
  } else if (slug.length === 2) {
    const category = getCategoryBySlug(slug[0]);
    const subCategory = getSubCategoryBySlug(slug[1]);
    if (subCategory) {
      return generateSubCategoryMetadata(subCategory, category);
    }
  } else if (slug.length >= 3) {
    // Product Detail or nested subcategory
    const lastSegment = slug[slug.length - 1];
    const product = getProductBySlug(lastSegment);
    const category = getCategoryBySlug(slug[0]);
    const subCategory = getSubCategoryBySlug(slug[1]);

    if (product) {
      return generateProductMetadata(product, category, subCategory);
    }

    const seriesSub = getSubCategoryBySlug(lastSegment);
    if (seriesSub) {
      return generateSubCategoryMetadata(seriesSub, category);
    }
  }

  return {
    title: 'Products | Hikvision UAE Official Catalog',
    description:
      'Explore official Hikvision security and CCTV products in Dubai, UAE. 100% genuine products with manufacturer warranty.',
  };
}

export default async function ProductsCatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  // Generate server-side structured data for Googlebot
  let productJsonLd: any = null;
  let breadcrumbsJsonLd: any = null;
  let faqJsonLd: any = null;

  const breadcrumbsList = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
  ];

  if (slug.length >= 1) {
    const cat = getCategoryBySlug(slug[0]);
    breadcrumbsList.push({
      name: cat?.name || slug[0],
      url: `/products/${slug[0]}`,
    });
  }

  if (slug.length >= 2) {
    const sub = getSubCategoryBySlug(slug[1]);
    breadcrumbsList.push({
      name: sub?.name || slug[1],
      url: `/products/${slug[0]}/${slug[1]}`,
    });
  }

  if (slug.length >= 3) {
    const lastSeg = slug[slug.length - 1];
    const product = getProductBySlug(lastSeg);

    if (product) {
      const cat = getCategoryBySlug(slug[0]);
      const sub = getSubCategoryBySlug(slug[1]);
      breadcrumbsList.push({
        name: product.name,
        url: `/products/${slug.join('/')}`,
      });

      productJsonLd = generateProductJsonLd(product, cat, sub);

      // Dynamic Google Search FAQ Accordions
      faqJsonLd = generateFAQJsonLd([
        {
          question: `Where can I buy genuine Hikvision ${product.name} in Dubai, UAE?`,
          answer: `You can purchase genuine Hikvision ${product.name} from Hikvision UAE, the official authorized distributor with stock in Dubai. We supply all emirates with manufacturer warranty and fast delivery.`,
        },
        {
          question: `Does Hikvision ${product.name} come with warranty in UAE?`,
          answer: `Yes, all genuine Hikvision products supplied by Hikvision UAE include an official 3-year manufacturer warranty and technical support across Dubai, Abu Dhabi, Sharjah, and the UAE.`,
        },
        {
          question: `Do you provide installation for Hikvision ${product.name} in UAE?`,
          answer: `Yes, we offer professional installation, AMC (Annual Maintenance Contracts), and configuration services for commercial and residential projects across Dubai and all 7 Emirates.`,
        },
      ]);
    } else {
      const seriesSub = getSubCategoryBySlug(lastSeg);
      if (seriesSub) {
        breadcrumbsList.push({
          name: seriesSub.name,
          url: `/products/${slug.join('/')}`,
        });
      }
    }
  }

  breadcrumbsJsonLd = generateBreadcrumbJsonLd(breadcrumbsList);

  return (
    <>
      {/* Server-Side Pre-rendered JSON-LD Rich Schemas for Google Crawler */}
      {breadcrumbsJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
        />
      )}
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Interactive Client Component */}
      <ProductCatchAllClient slug={slug} />
    </>
  );
}
