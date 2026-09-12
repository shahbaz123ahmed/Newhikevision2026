const fs = require('fs');

const categories = JSON.parse(fs.readFileSync('dump_categories.json', 'utf8'));
const subcategories = JSON.parse(fs.readFileSync('dump_subcategories.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('dump_products.json', 'utf8'));

// Build category map
const catMap = new Map();
categories.forEach(c => {
  catMap.set(c._id.toString(), c);
});

// Build subcategory map
const subMap = new Map();
subcategories.forEach(s => {
  subMap.set(s._id.toString(), s);
});

// Clean categories
const cleanCategories = categories.map(c => ({
  id: c._id.toString(),
  name: c.name,
  slug: c.slug,
  image: c.image || ''
}));

// Clean subcategories
const cleanSubCategories = subcategories.map(s => {
  const parentCat = catMap.get(s.category?.toString());
  return {
    id: s._id.toString(),
    name: s.name,
    slug: s.slug,
    categorySlug: parentCat ? parentCat.slug : '',
    categoryId: s.category?.toString() || '',
    image: s.image || ''
  };
});

// Clean products
const cleanProducts = products.map(p => {
  const parentCat = catMap.get(p.category?.toString());
  const parentSub = subMap.get(p.subCategory?.toString());
  return {
    id: p._id.toString(),
    name: (p.name || '').trim(),
    slug: p.slug,
    subTitle: p.subTitle || '',
    categorySlug: parentCat ? parentCat.slug : (p.categorySlug || ''),
    subCategorySlug: parentSub ? parentSub.slug : (p.subCategorySlug || ''),
    images: Array.isArray(p.images) ? p.images : [],
    description: p.description || '',
    features: Array.isArray(p.features) ? p.features : [],
    keyFeatures: Array.isArray(p.keyFeatures) ? p.keyFeatures : [],
    specifications: p.specifications || {},
    rating: p.rating || 5,
    reviewCount: p.reviewCount || 0,
    isFeatured: !!p.isFeatured
  };
});

if (!fs.existsSync('data')) {
  fs.mkdirSync('data', { recursive: true });
}

// 1. categories.ts
const catCode = `export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export const categories: Category[] = ${JSON.stringify(cleanCategories, null, 2)};
`;
fs.writeFileSync('data/categories.ts', catCode);

// 2. subcategories.ts
const subCode = `export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryId: string;
  image: string;
}

export const subCategories: SubCategory[] = ${JSON.stringify(cleanSubCategories, null, 2)};
`;
fs.writeFileSync('data/subcategories.ts', subCode);

// 3. products.ts
const prodCode = `export interface Product {
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

export const products: Product[] = ${JSON.stringify(cleanProducts, null, 2)};
`;
fs.writeFileSync('data/products.ts', prodCode);

console.log('Successfully generated data/categories.ts, data/subcategories.ts, data/products.ts');
