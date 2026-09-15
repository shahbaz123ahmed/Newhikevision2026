import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard — Inquiries & Lead Management',
  description: 'Hikvision UAE Admin Dashboard for managing contacts, product enquiries, and customer requests.',
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
