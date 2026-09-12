import { NextResponse } from 'next/server';
import { getProducts, getCategories, getSubCategories } from '@/data/catalog';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subCategorySlug = searchParams.get('subcategory');
  const categorySlug = searchParams.get('category');
  const search = searchParams.get('search') || undefined;

  try {
    const productsList = getProducts({
      subCategorySlug: subCategorySlug || undefined,
      categorySlug: categorySlug || undefined,
      search,
    });

    const allCats = getCategories();
    const allSubs = getSubCategories();

    const populated = productsList.map((p) => ({
      ...p,
      category: allCats.find((c) => c.slug === p.categorySlug) || {
        slug: p.categorySlug,
        name: p.categorySlug,
      },
      subCategory: allSubs.find((s) => s.slug === p.subCategorySlug) || {
        slug: p.subCategorySlug,
        name: p.subCategorySlug,
      },
    }));

    return NextResponse.json(populated, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
