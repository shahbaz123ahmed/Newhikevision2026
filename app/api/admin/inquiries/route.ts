import { NextResponse } from 'next/server';
import {
  getInquiries,
  saveInquiry,
  updateInquiry,
  deleteInquiry,
  InquiryItem
} from '@/lib/inquiriesStore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category'); // 'all', 'contact', 'product_enquiry'
    const status = searchParams.get('status'); // 'all', 'new', 'contacted', 'in_progress', 'closed'
    const query = searchParams.get('q')?.toLowerCase().trim() || '';

    const allInquiries = await getInquiries();

    // Compute category counts
    const counts = {
      all: allInquiries.length,
      contacts: allInquiries.filter((i) => i.type === 'contact').length,
      productEnquiries: allInquiries.filter((i) => i.type === 'product_enquiry').length,
      newCount: allInquiries.filter((i) => i.status === 'new').length,
      contactedCount: allInquiries.filter((i) => i.status === 'contacted').length,
      inProgressCount: allInquiries.filter((i) => i.status === 'in_progress').length,
      closedCount: allInquiries.filter((i) => i.status === 'closed').length
    };

    let filtered = [...allInquiries];

    if (category && category !== 'all') {
      if (category === 'contacts' || category === 'contact') {
        filtered = filtered.filter((i) => i.type === 'contact');
      } else if (category === 'product_enquiry' || category === 'productEnquiries' || category === 'products') {
        filtered = filtered.filter((i) => i.type === 'product_enquiry');
      }
    }

    if (status && status !== 'all') {
      filtered = filtered.filter((i) => i.status === status);
    }

    if (query) {
      filtered = filtered.filter(
        (i) =>
          i.name.toLowerCase().includes(query) ||
          i.email.toLowerCase().includes(query) ||
          i.phone.toLowerCase().includes(query) ||
          (i.company && i.company.toLowerCase().includes(query)) ||
          (i.requirement && i.requirement.toLowerCase().includes(query)) ||
          (i.productName && i.productName.toLowerCase().includes(query)) ||
          (i.message && i.message.toLowerCase().includes(query))
      );
    }

    return NextResponse.json({
      success: true,
      inquiries: filtered,
      counts,
      total: filtered.length
    });
  } catch (error) {
    console.error('Failed to fetch inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await saveInquiry(body);
    return NextResponse.json({ success: true, inquiry: created });
  } catch (error) {
    console.error('Failed to create inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create inquiry' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Inquiry ID is required' }, { status: 400 });
    }

    const updated = await updateInquiry(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error) {
    console.error('Failed to update inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Inquiry ID is required' }, { status: 400 });
    }

    const deleted = await deleteInquiry(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Failed to delete inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}
