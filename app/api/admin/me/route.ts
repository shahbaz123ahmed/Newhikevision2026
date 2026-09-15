import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('hik_admin_session');

  if (session?.value === 'authenticated_admin_hik_2026') {
    return NextResponse.json({
      authenticated: true,
      user: {
        username: process.env.ADMIN_USERNAME || 'hikvisionuae.ae@gmail.com',
        role: 'administrator'
      }
    });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
