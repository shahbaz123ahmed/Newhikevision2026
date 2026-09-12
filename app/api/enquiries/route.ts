import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Enquiry received:', body);
    return NextResponse.json({ success: true, message: 'Enquiry submitted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process enquiry' }, { status: 400 });
  }
}
