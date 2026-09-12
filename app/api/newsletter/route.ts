import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Newsletter subscription:', body);
    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to subscribe' }, { status: 400 });
  }
}
