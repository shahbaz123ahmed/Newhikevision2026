"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main className="min-h-screen w-full bg-[#F8FAFB] text-slate-800">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <div>
        {children}
      </div>
      <Footer />
    </>
  );
}
