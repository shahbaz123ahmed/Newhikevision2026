import { NextResponse } from 'next/server';
import { saveInquiry } from '@/lib/inquiriesStore';
import { sendInquiryNotificationEmail } from '@/lib/emailService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Enquiry received:', body);

    const {
      name,
      email,
      mobile,
      phone,
      company,
      details,
      message,
      productName,
      productSlug,
      productImage,
      productPath
    } = body;

    const contactPhone = phone || mobile;

    if (!name || !email || !contactPhone) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and mobile number are required.' },
        { status: 400 }
      );
    }

    const requirement = productName
      ? `Product Inquiry: ${productName}`
      : 'Product Specification & Pricing Inquiry';

    const newInquiry = await saveInquiry({
      type: 'product_enquiry',
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(contactPhone).trim(),
      company: company ? String(company).trim() : undefined,
      subject: requirement,
      requirement: requirement,
      message: String(details || message || '').trim() || 'Interested in pricing, availability and technical specs.',
      productName: productName ? String(productName).trim() : undefined,
      productSlug: productSlug ? String(productSlug).trim() : undefined,
      productImage: productImage ? String(productImage).trim() : undefined,
      productPath: productPath ? String(productPath).trim() : undefined
    });

    // Send email notification asynchronously
    sendInquiryNotificationEmail(newInquiry).catch((err) =>
      console.error('Failed to dispatch notification email:', err)
    );

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted and recorded successfully',
      id: newInquiry.id
    });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process enquiry' },
      { status: 500 }
    );
  }
}
