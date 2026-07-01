"use client";

import Link from "next/link";
import { useState } from "react";

interface FooterNavLinkProps {
  href: string;
  children: React.ReactNode;
  glowing?: boolean;
}

export default function FooterNavLink({ href, children, glowing }: FooterNavLinkProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: hovered ? "6px" : "0px",
        color: hovered || glowing ? "var(--brand-red)" : "#6b7280",
        transform: hovered
          ? "translateX(3px)"
          : "translateX(0px)",
        transition: "all 0.28s cubic-bezier(0.25, 0.8, 0.25, 1)",
        transformOrigin: "left center",
        textShadow: glowing
          ? "0 0 10px rgba(196,30,58,0.9), 0 0 20px rgba(196,30,58,0.5)"
          : hovered
          ? "0 0 8px rgba(196,30,58,0.4)"
          : "none",
        fontSize: "14px",
        fontWeight: 500,
        textDecoration: "none",
      }}
    >
      {/* Red dot that appears on hover */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0,
          width: hovered ? "6px" : "0px",
          height: "6px",
          overflow: "hidden",
          transition: "all 0.25s ease",
        }}
      >
        <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "var(--brand-red)", flexShrink: 0 }} />
      </span>
      {children}
    </Link>
  );
}
