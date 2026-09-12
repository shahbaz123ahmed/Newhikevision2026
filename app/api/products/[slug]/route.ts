import { NextResponse } from 'next/server';
import { getProductBySlug, getCategories, getSubCategories } from '@/data/catalog';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const allCats = getCategories();
    const allSubs = getSubCategories();

    const populated = {
      ...product,
      category: allCats.find((c) => c.slug === product.categorySlug) || {
        slug: product.categorySlug,
        name: product.categorySlug,
      },
      subCategory: allSubs.find((s) => s.slug === product.subCategorySlug) || {
        slug: product.subCategorySlug,
        name: product.subCategorySlug,
      },
    };

    return NextResponse.json(populated, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
