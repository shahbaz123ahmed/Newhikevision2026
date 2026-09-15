import fs from 'fs/promises';
import path from 'path';
import { connectToDatabase } from './mongodb';
import { Inquiry } from '@/models/Inquiry';

export interface InquiryItem {
  id: string;
  type: 'contact' | 'product_enquiry';
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject?: string;
  message: string;
  requirement?: string;
  productName?: string;
  productSlug?: string;
  productImage?: string;
  productPath?: string;
  status: 'new' | 'contacted' | 'in_progress' | 'closed';
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'inquiries.json');

const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: "inq-1001",
    type: "contact",
    name: "Ali Al-Mansoor",
    email: "ali.mansoor@bahrainlogistics.com",
    phone: "+973 3948 1122",
    company: "Bahrain Logistics Hub",
    subject: "Enterprise Security Blueprint",
    requirement: "Enterprise Security Blueprint",
    message: "Looking for a comprehensive perimeter security and ANPR camera consultation for our warehouse facility in Hidd Industrial Area.",
    status: "contacted",
    notes: "Followed up via email regarding site visit for perimeter survey.",
    createdAt: "2026-08-31T17:34:46.000Z"
  },
  {
    id: "inq-1002",
    type: "contact",
    name: "Sarah Jenkins",
    email: "sarah.j@gulfretail.bh",
    phone: "+973 3611 9900",
    company: "Gulf Retail Group",
    subject: "General Inquiry",
    requirement: "General Inquiry",
    message: "Can you provide technical support for existing Uniview NVR units and provide a quote for cloud backup licenses?",
    status: "in_progress",
    notes: "Requested serial numbers of NVR units to check warranty status.",
    createdAt: "2026-08-30T23:34:46.000Z"
  },
  {
    id: "inq-1003",
    type: "product_enquiry",
    name: "Tariq Al-Hashemi",
    email: "t.hashemi@dubaiholding.ae",
    phone: "+971 50 492 8811",
    company: "Dubai Holding Asset Management",
    subject: "DS-2DE5425WG1-E Enquiry",
    requirement: "DS-2DE5425WG1-E (4MP 25X DarkFighter Speed Dome)",
    productName: "DS-2DE5425WG1-E",
    productSlug: "ds-2de5425wg1-e",
    productImage: "/vidcom/DS-2DE5425WG1-E.webp",
    productPath: "/products/network-products/ptz-cameras/ds-2de5425wg1-e",
    message: "Need quote for 14 units of DS-2DE5425WG1-E PTZ cameras with wall mounting brackets for Business Bay tower perimeter.",
    status: "new",
    notes: "Urgent quote requested for project approval.",
    createdAt: "2026-09-15T10:15:20.000Z"
  }
];

// Helper to read local json file
async function readLocalFile(): Promise<InquiryItem[]> {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    const data = JSON.parse(content);
    if (Array.isArray(data)) return data;
    return INITIAL_INQUIRIES;
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(INITIAL_INQUIRIES, null, 2), 'utf-8');
    return INITIAL_INQUIRIES;
  }
}

// Helper to write local json file
async function writeLocalFile(data: InquiryItem[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('[INQUIRIES STORE] Failed to write local JSON backup:', err);
  }
}

export async function getInquiries(): Promise<InquiryItem[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const docs = await Inquiry.find().sort({ createdAt: -1 }).lean().exec();
      if (docs && docs.length > 0) {
        const mapped: InquiryItem[] = docs.map((doc: any) => ({
          id: doc.id || doc._id.toString(),
          type: doc.type || 'contact',
          name: doc.name,
          email: doc.email,
          phone: doc.phone,
          company: doc.company,
          subject: doc.subject,
          message: doc.message,
          requirement: doc.requirement,
          productName: doc.productName,
          productSlug: doc.productSlug,
          productImage: doc.productImage,
          productPath: doc.productPath,
          status: doc.status || 'new',
          notes: doc.notes,
          createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
          updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined
        }));
        // Update local backup
        writeLocalFile(mapped);
        return mapped;
      } else {
        // Seed initial to MongoDB
        const local = await readLocalFile();
        for (const item of local) {
          try {
            await Inquiry.create(item);
          } catch {}
        }
        return local;
      }
    }
  } catch (err) {
    console.error('[MONGODB GET ERROR - Using Local Backup]:', err);
  }

  return await readLocalFile();
}

export async function saveInquiry(
  inquiry: Omit<InquiryItem, 'id' | 'createdAt' | 'status'> & { status?: InquiryItem['status'] }
): Promise<InquiryItem> {
  const newInquiry: InquiryItem = {
    ...inquiry,
    id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    status: inquiry.status || 'new',
    createdAt: new Date().toISOString()
  };

  // Try saving to MongoDB
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await Inquiry.create({
        ...newInquiry,
        createdAt: new Date(newInquiry.createdAt)
      });
      console.log('[MONGODB] Inquiry saved to Atlas database:', newInquiry.id);
    }
  } catch (err) {
    console.error('[MONGODB SAVE ERROR - Falling back to local file]:', err);
  }

  // Also update local file
  const local = await readLocalFile();
  const updated = [newInquiry, ...local];
  await writeLocalFile(updated);

  return newInquiry;
}

export async function updateInquiry(
  id: string,
  updates: Partial<Omit<InquiryItem, 'id' | 'createdAt'>>
): Promise<InquiryItem | null> {
  // Update in MongoDB
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await Inquiry.findOneAndUpdate({ id }, { ...updates, updatedAt: new Date() }).exec();
    }
  } catch (err) {
    console.error('[MONGODB UPDATE ERROR]:', err);
  }

  // Update in local file
  const local = await readLocalFile();
  const index = local.findIndex((item) => item.id === id);
  if (index === -1) return null;

  local[index] = {
    ...local[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  await writeLocalFile(local);
  return local[index];
}

export async function deleteInquiry(id: string): Promise<boolean> {
  // Delete from MongoDB
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await Inquiry.findOneAndDelete({ id }).exec();
    }
  } catch (err) {
    console.error('[MONGODB DELETE ERROR]:', err);
  }

  // Delete from local file
  const local = await readLocalFile();
  const filtered = local.filter((item) => item.id !== id);
  if (filtered.length === local.length) return false;

  await writeLocalFile(filtered);
  return true;
}
