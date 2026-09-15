import { NextResponse } from 'next/server';
import { saveInquiry } from '@/lib/inquiriesStore';
import { sendInquiryNotificationEmail } from '@/lib/emailService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Contact form received:', body);

    const { name, email, phone, subject, service, company, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and phone number are required.' },
        { status: 400 }
      );
    }

    const requirement = subject || service || 'General Contact Inquiry';

    const newInquiry = await saveInquiry({
      type: 'contact',
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      company: company ? String(company).trim() : undefined,
      subject: requirement,
      requirement: requirement,
      message: String(message || '').trim() || 'No additional message provided.'
    });

    // Send email notification asynchronously
    sendInquiryNotificationEmail(newInquiry).catch((err) =>
      console.error('Failed to dispatch notification email:', err)
    );

    return NextResponse.json({
      success: true,
      message: 'Message received and recorded successfully',
      id: newInquiry.id
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
