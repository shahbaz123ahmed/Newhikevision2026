import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Contact form received:', body);
    return NextResponse.json({ success: true, message: 'Message received successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process message' }, { status: 400 });
  }
}
