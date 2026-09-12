import { NextResponse } from 'next/server';
import { getAllCategories } from '@/data/catalog';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  try {
    const categories = getAllCategories();
    return NextResponse.json(categories, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
