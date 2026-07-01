import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ShieldCheck, Clock } from "lucide-react";
import NewsletterForm from "./NewsletterForm";
import FooterNavLink from "./FooterNavLink";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Contact Us", href: "/contact" },
];

const technologies = [
  { name: "TandemVu", href: "/technologies/tandemvu" },
  { name: "AcuSense", href: "/technologies/acusense" },
  { name: "DarkFighter", href: "/technologies/darkfighter" },
  { name: "ColorVu", href: "/technologies/colorvu" },
];

const solutions = [
  { name: "Manufacturing", href: "/solutions/manufacturing" },
  { name: "Retail", href: "/solutions/retail" },
  { name: "Healthcare", href: "/solutions/healthcare" },
  { name: "Education", href: "/solutions/education" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-white to-maroon/10 text-gray-900 overflow-hidden">

      {/* Decorative top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-maroon via-gold to-maroon" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#000000 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-maroon rounded-full blur-[200px] opacity-[0.08] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-maroon rounded-full blur-[200px] opacity-[0.05] pointer-events-none translate-x-1/3 translate-y-1/3" />

      {/* === NEWSLETTER BANNER === */}
      <div className="relative z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon/10 border border-maroon/20 text-maroon text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon animate-pulse" />
                Stay Updated
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-3 text-gray-900">
                Security Insights,{" "}
                <span className="text-maroon">Delivered.</span>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Get the latest Hikvision product launches, security tips, and UAE industry news straight to your inbox.
              </p>
            </div>
            <div className="w-full lg:w-auto lg:min-w-[400px]">
              <NewsletterForm />
              <p className="text-[10px] text-gray-400 mt-3 text-center lg:text-left">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* === MAIN FOOTER GRID === */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

          {/* Brand Column — 4 cols */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <Link href="/" className="inline-block group">
              <Image
                src="/logo.webp"
                alt="Hikvision UAE Logo"
                width={200}
                height={60}
                className="h-12 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              UAE's #1 Official Authorized Hikvision Distributor. Delivering cutting-edge AI surveillance and security solutions across all 7 Emirates.
            </p>

            {/* Trust badge */}
            <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm w-fit">
              <div className="w-9 h-9 rounded-xl bg-maroon flex items-center justify-center text-white shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-maroon">Official Partner</p>
                <p className="text-[11px] text-gray-500 font-medium">Hikvision Authorized Distributor</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+971509693134" className="flex items-center gap-3 text-sm text-gray-500 hover:text-maroon transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-maroon group-hover:text-white transition-all shrink-0 text-gray-400">
                  <Phone size={14} />
                </div>
                +971 50 969 3134
              </a>
              <a href="mailto:sales@hikvisionuae.ae" className="flex items-center gap-3 text-sm text-gray-500 hover:text-maroon transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-maroon group-hover:text-white transition-all shrink-0 text-gray-400">
                  <Mail size={14} />
                </div>
                sales@hikvisionuae.ae
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-500">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5 text-gray-400">
                  <MapPin size={14} />
                </div>
                <span>No. 12, Al Khabaisi, Abu Hail,<br />Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-gray-400">
                  <Clock size={14} />
                </div>
                <span>Mon–Sat: 9:00 AM – 7:00 PM GST</span>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Quick Links — 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {/* data-glow-target lets the ScannerSweep component detect and glow this element */}
                  <span data-glow-target="true">
                    <FooterNavLink href={link.href}>{link.name}</FooterNavLink>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies — 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-6">Technologies</h4>
            <ul className="space-y-4">
              {technologies.map((tech) => (
                <li key={tech.name}>
                  <span data-glow-target="true">
                    <FooterNavLink href={tech.href}>{tech.name}</FooterNavLink>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions + Stats — 3 cols */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-6">Industry Solutions</h4>
            <ul className="space-y-4 mb-10">
              {solutions.map((sol) => (
                <li key={sol.name}>
                  <span data-glow-target="true">
                    <FooterNavLink href={sol.href}>{sol.name}</FooterNavLink>
                  </span>
                </li>
              ))}
            </ul>

            {/* Stats block */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "1000+", label: "Clients" },
                { value: "7", label: "Emirates" },
                { value: "24/7", label: "Support" },
                { value: "100%", label: "Genuine" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  data-glow-box="true"
                  className="bg-white border border-gray-100 rounded-2xl p-4 text-center hover:border-maroon/40 hover:bg-maroon/5 transition-all duration-300 cursor-default shadow-sm"
                >
                  <p className="text-xl font-black text-gray-900">{stat.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === BOTTOM BAR === */}
      <div className="relative z-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-xs text-gray-400 text-center md:text-left">
            © 2026 <span className="font-bold text-gray-900">Hikvision UAE</span>. All rights reserved. Official Authorized Distributor.
          </p>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-xs text-gray-400">
              <Link href="/privacy-policy" className="hover:text-maroon transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-maroon transition-colors">Terms of Service</Link>
              <Link href="/cookie-policy" className="hover:text-maroon transition-colors">Cookie Policy</Link>
            </div>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-maroon hover:text-white hover:border-maroon transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
