import { NextResponse } from 'next/server';
import { getNavCatalog } from '@/data/catalog';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  try {
    const catalog = getNavCatalog();
    return NextResponse.json(catalog, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Failed to fetch nav products:', error);
    return NextResponse.json({ error: 'Failed to fetch catalog' }, { status: 500 });
  }
}
