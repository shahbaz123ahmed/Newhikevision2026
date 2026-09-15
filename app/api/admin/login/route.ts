import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const validUsername = process.env.ADMIN_USERNAME || 'hikvisionuae.ae@gmail.com';
    const validPassword = process.env.ADMIN_PASSWORD || 'Hikvision-uae.ae@123';

    const inputUser = String(username || '').trim().toLowerCase();
    const targetUser = validUsername.toLowerCase();

    if (
      (inputUser === targetUser || inputUser === 'hikvisionuae.ae@gmail.com' || inputUser === 'admin') &&
      password === validPassword
    ) {
      const cookieStore = await cookies();
      cookieStore.set('hik_admin_session', 'authenticated_admin_hik_2026', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });

      return NextResponse.json({
        success: true,
        user: {
          username: validUsername,
          role: 'administrator'
        }
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid username/email or password.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Login processing failed.' },
      { status: 500 }
    );
  }
}
