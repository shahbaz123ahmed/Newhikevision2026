import Link from 'next/link';
import { ChevronRight, ArrowRight, ShieldCheck, Cpu, Zap, Eye, BarChart3, CloudLightning } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: "Technologies | Hikvision Official Distributor UAE",
  description: "Explore the cutting-edge security technologies from Hikvision, including TandemVu, AcuSense, DarkFighter, and ColorVu. Authorized distributor in Dubai, UAE.",
};

const technologies = [
  {
    name: "TandemVu",
    slug: "tandemvu",
    description: "Dual-lens technology that combines a large area overview with detailed PTZ tracking, ensuring you never miss a moment.",
    image: "/navbar/TandemVu.png",
    accent: "bg-blue-500/10 text-blue-600",
    features: ["Broad Area Coverage", "Detail PTZ Tracking", "AI Detection"]
  },
  {
    name: "AcuSense",
    slug: "acusense",
    description: "AI-powered detection that accurately distinguishes humans and vehicles from other moving objects, reducing false alarms by up to 90%.",
    image: "/navbar/AcuSenseUAE.png",
    accent: "bg-maroon/10 text-maroon",
    features: ["Human Detection", "Vehicle Identification", "Real-time Alerts"]
  },
  {
    name: "DarkFighter",
    slug: "darkfighter",
    description: "Industry-leading low-light technology that captures high-quality, full-color images in near-total darkness.",
    image: "/navbar/HikvisionDarkFighter.png",
    accent: "bg-indigo-500/10 text-indigo-600",
    features: ["Ultra-low Light", "High Sensitivity", "Crystal Clear Night Vision"]
  },
  {
    name: "ColorVu",
    slug: "colorvu",
    description: "Provides 24/7 vivid color imaging with high-performance sensors and advanced lenses for accurate details in darkness.",
    image: "/navbar/ColorVuUAE.png",
    accent: "bg-maroon/10 text-maroon",
    features: ["24/7 Color", "Large Aperture", "Soft Supplemental Light"]
  }
];

export default function TechnologiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Section */}
      <section className="relative mt-[112px] sm:mt-[120px] md:mt-[120px] w-full overflow-hidden bg-[#0c0c0e] h-[72vh] min-h-[560px] max-h-[760px] sm:h-[82vh] md:h-[86vh] lg:h-[88vh] sm:min-h-[680px] md:min-h-[720px] sm:max-h-[960px]">
        <div className="absolute inset-0">
          <img
            src="/navbar/thefuture.png"
            className="w-full h-full object-cover"
            alt="The Future of Intelligence"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent sm:hidden" />
          <div className="hidden sm:block absolute inset-y-0 left-0 w-3/5 lg:w-1/2 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>
        <div className="relative h-full w-full max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12 lg:px-14 flex flex-col justify-center items-start text-left pb-8 sm:pb-0 z-10">
          <div className="max-w-xl lg:max-w-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-maroon/20 border border-maroon/30 rounded-full">
              <ShieldCheck size={14} className="text-maroon" />
              <span className="text-maroon font-black uppercase tracking-[0.25em] text-xs">
                Next-Gen Security Standards
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight sm:leading-[0.95]">
              THE FUTURE OF <span className="text-maroon">INTELLIGENCE</span>
            </h1>
            <p className="text-xs sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-lg sm:max-w-xl">
              Explore the groundbreaking core technologies that power the world's most advanced surveillance systems. From AI-driven detection to vivid color night vision.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/Download%20Pdf.pdf"
                download
                className="inline-flex justify-center items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest transition-all shadow-xl bg-maroon text-white hover:bg-[#a01830] active:scale-95"
              >
                Download Catalog
              </a>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                 
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Accuracy", value: "98.5%", icon: BarChart3 },
              { label: "Response", value: "24ms", icon: Zap },
              { label: "AI Models", value: "500+", icon: Cpu },
              { label: "Deployment", value: "Global", icon: CloudLightning },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 text-maroon mb-2">
                  <stat.icon size={20} />
                </div>
                <p className="text-3xl font-black text-gray-900 leading-none">{stat.value}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Listing */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-[10px] font-black text-maroon uppercase tracking-[0.5em]">The Toolkit</h2>
            <h3 className="text-4xl font-black text-gray-900 uppercase tracking-tight">SIGNATURE <span className="text-maroon">TECHNOLOGIES</span></h3>
            <p className="text-gray-500 font-medium">From low-light environments to advanced AI-driven detection, explore our specialized technologies designed for maximum security.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {technologies.map((tech) => (
              <Link
                key={tech.slug}
                href={`/technologies/${tech.slug}`}
                className="group relative bg-white rounded-[2rem] md:rounded-[40px] p-6 sm:p-8 shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col lg:flex-row gap-8 items-center transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-maroon/10"
              >
                <div className="w-full lg:w-[180px] h-[180px] rounded-3xl overflow-hidden bg-gray-50 p-2 shrink-0 border border-gray-50">
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-black text-gray-900 uppercase tracking-tight group-hover:text-maroon transition-colors">{tech.name}</h4>
                    <div className="w-10 h-10 rounded-full bg-maroon/0 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-white transition-all duration-500">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2">
                    {tech.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tech.features.map(f => (
                      <span key={f} className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-gray-100 rounded-full text-gray-500">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Decorative bottom bar */}
                <div className="absolute bottom-0 left-10 right-10 h-1 bg-maroon transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
<section className="py-24 bg-white relative overflow-hidden">
  <div className="absolute -top-24 -left-24 w-96 h-96 bg-maroon/5 rounded-full blur-[100px]" />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="page-hero rounded-[2.5rem] md:rounded-[50px] p-6 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-16">

      <div className="w-full md:w-1/2 space-y-6 relative z-10">
        <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
          ADVANCED <span className="text-maroon">SURVEILLANCE</span> FOR EVERY ENVIRONMENT
        </h3>

        <p className="text-white/70 text-lg font-medium">
          Our technologies are engineered to perform in the toughest conditions, from the intense desert heat of the UAE to near-total darkness.
        </p>

        <div className="grid grid-cols-2 gap-6 pt-4">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-maroon/20 flex items-center justify-center text-maroon">
              <ShieldCheck size={18} />
            </div>
            <p className="text-sm font-black text-white uppercase tracking-widest">
              Reliable
            </p>
            <p className="text-xs text-white/50">
              24/7 Uninterrupted performance
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-maroon/20 flex items-center justify-center text-maroon">
              <Eye size={18} />
            </div>
            <p className="text-sm font-black text-white uppercase tracking-widest">
              Precise
            </p>
            <p className="text-xs text-white/50">
              High-fidelity detailed imaging
            </p>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 relative">
        <div className="group relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-[40px] shadow-2xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:border-maroon/50 hover:shadow-[0_20px_60px_rgba(196,30,58,0.35)]">

          <img
            src="/navbar/future.png"
            alt="Technology Visual"
            className="w-full h-auto rounded-[30px] opacity-90 transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100"
          />

          {/* Hover Glow */}
          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-maroon/0 via-transparent to-maroon/0 transition-all duration-700 group-hover:from-maroon/20 group-hover:to-red-600/15 pointer-events-none" />

        </div>
      </div>

    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <h2 className="text-[10px] font-black text-maroon uppercase tracking-[1em]">Ready to Upgrade?</h2>
          <h3 className="text-5xl font-black text-gray-900 uppercase tracking-tight">EXPERIENCE THE <span className="text-maroon">DIFFERENCE</span></h3>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Contact our technical team today for a free consultation and find the perfect technology for your security needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="px-12 py-5 bg-maroon text-white rounded-full font-black uppercase tracking-widest text-sm shadow-2xl shadow-maroon/20 hover:bg-maroon transition-all flex items-center gap-3 active:scale-95"
            >
              Contact Sales Team
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/products"
              className="px-12 py-5 border-2 border-gray-100 text-gray-900 rounded-full font-black uppercase tracking-widest text-sm hover:border-maroon transition-all flex items-center gap-3 active:scale-95"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
