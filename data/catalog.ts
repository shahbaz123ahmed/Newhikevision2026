import { categories, Category } from './categories';
import { subCategories, SubCategory } from './subcategories';
import { products, Product } from './products';

export * from './categories';
export * from './subcategories';
export * from './products';

export interface NavCategoryItem {
  _id: string;
  name: string;
  slug: string;
  image: string;
  subCategories: {
    _id: string;
    name: string;
    slug: string;
    image: string;
    products: {
      name: string;
      slug: string;
      image: string | null;
    }[];
  }[];
}

// 1. Get all categories
export function getAllCategories(): Category[] {
  return categories;
}

export const getCategories = getAllCategories;

// 2. Get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}

// 3. Get subcategories (optionally by category slug)
export function getSubCategories(categorySlug?: string): SubCategory[] {
  if (!categorySlug) return subCategories;
  return subCategories.filter(
    (s) => s.categorySlug.toLowerCase() === categorySlug.toLowerCase()
  );
}

// 4. Get subcategory by slug
export function getSubCategoryBySlug(slug: string): SubCategory | undefined {
  return subCategories.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
}

// 5. Get products with flexible filters
export interface ProductFilterOptions {
  categorySlug?: string;
  subCategorySlug?: string;
  isFeatured?: boolean;
  search?: string;
  limit?: number;
}

export function getProducts(options: ProductFilterOptions = {}): Product[] {
  let list = [...products];

  if (options.categorySlug) {
    list = list.filter(
      (p) => p.categorySlug.toLowerCase() === options.categorySlug!.toLowerCase()
    );
  }

  if (options.subCategorySlug) {
    list = list.filter(
      (p) => p.subCategorySlug.toLowerCase() === options.subCategorySlug!.toLowerCase()
    );
  }

  if (options.isFeatured !== undefined) {
    list = list.filter((p) => p.isFeatured === options.isFeatured);
  }

  if (options.search) {
    const term = options.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.slug.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term))
    );
  }

  if (options.limit && options.limit > 0) {
    list = list.slice(0, options.limit);
  }

  return list;
}

// 6. Get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

// 7. Get complete Nav Catalog structure
export function getNavCatalog(): NavCategoryItem[] {
  return categories.map((cat) => {
    const catSubs = subCategories.filter((s) => s.categorySlug === cat.slug);

    const mappedSubs = catSubs.map((sub) => {
      const topProducts = products
        .filter((p) => p.subCategorySlug === sub.slug)
        .slice(0, 3)
        .map((p) => ({
          name: p.name,
          slug: p.slug,
          image: p.images?.[0] || null,
        }));

      return {
        _id: sub.id,
        name: sub.name,
        slug: sub.slug,
        image: sub.image,
        products: topProducts,
      };
    });

    return {
      _id: cat.id,
      name: cat.name,
      slug: cat.slug,
      image: cat.image,
      subCategories: mappedSubs,
    };
  });
}
