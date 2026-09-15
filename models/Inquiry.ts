import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiryDoc extends Document {
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
  createdAt: Date;
  updatedAt?: Date;
}

const InquirySchema = new Schema<IInquiryDoc>(
  {
    id: { type: String, required: true, unique: true, index: true },
    type: { type: String, enum: ['contact', 'product_enquiry'], required: true, default: 'contact' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    requirement: { type: String },
    productName: { type: String },
    productSlug: { type: String },
    productImage: { type: String },
    productPath: { type: String },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in_progress', 'closed'],
      default: 'new'
    },
    notes: { type: String }
  },
  {
    timestamps: true
  }
);

export const Inquiry: Model<IInquiryDoc> =
  mongoose.models.Inquiry || mongoose.model<IInquiryDoc>('Inquiry', InquirySchema);
