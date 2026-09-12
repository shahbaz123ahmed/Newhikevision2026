"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
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
