"use client";

import { Shield, Settings, Zap, Flame, Monitor, Cpu, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ManufacturingSolutionPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative mt-[112px] sm:mt-[120px] md:mt-[120px] w-full overflow-hidden bg-[#0c0c0e] h-[72vh] min-h-[560px] max-h-[760px] sm:h-[82vh] md:h-[86vh] lg:h-[88vh] sm:min-h-[680px] md:min-h-[720px] sm:max-h-[960px]">
        <div className="absolute inset-0">
          <img
            src="/navbar/Manufacture thumb.png"
            className="w-full h-full object-cover"
            alt="Manufacturing Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:hidden" />
          <div className="hidden sm:block absolute inset-y-0 left-0 w-3/5 lg:w-1/2 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        </div>
        <div className="relative h-full w-full max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12 lg:px-14 flex flex-col justify-center items-start text-left pb-8 sm:pb-0 z-10">
          <div className="max-w-xl lg:max-w-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <div className="h-px w-8 bg-maroon" />
              <span className="text-maroon font-black uppercase tracking-[0.25em] text-xs">Industry Solutions</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2 sm:mb-4 leading-tight sm:leading-[1.05]">
              Manufacturing <span className="text-maroon">Security</span>
            </h1>
            <p className="text-xs sm:text-base md:text-lg text-gray-200 mb-5 sm:mb-8 leading-relaxed max-w-lg sm:max-w-xl">
              Hikvision Solutions for Manufacturing in UAE. Secure your factory with advanced surveillance, access control, and AI-powered monitoring.
            </p>
            <div className="flex items-center justify-start gap-3 sm:gap-4 mb-2 sm:mb-0">
              <Link href="/contact" className="inline-flex justify-center items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xl bg-maroon text-white hover:bg-[#a01830] active:scale-95">
                Explore Features
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
              <a
                href="/Download%20Pdf.pdf"
                download
                className="inline-flex justify-center items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold border border-white/20 backdrop-blur-xl text-white hover:bg-white/10 active:scale-95 transition-all"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <h2 className="text-4xl font-black text-maroon uppercase tracking-tight mb-8">
                Security for Modern <span className="text-gray-900">Manufacturing</span>
              </h2>
              <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
                Hikvision delivers robust, scalable security solutions tailored for manufacturing environments in the UAE. Our systems combine high-definition cameras, AI analytics, and integrated access control to protect assets, ensure safety, and optimize operations.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <Shield className="text-maroon" />, title: "Asset Protection" },
                  { icon: <Zap className="text-maroon" />, title: "Operational Safety" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    {item.icon}
                    <span className="font-black uppercase tracking-widest text-[10px] text-gray-900">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-[0_25px_60px_rgba(196,30,58,0.25)] border border-maroon">
                <img
                  src="/navbar/security4modern.png"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  alt="Manufacturing Security"
                />
              </div>
            </div>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {[
              {
                title: "Thermal Imaging Cameras",
                desc: "24/7 temperature monitoring and early fire detection for industrial safety and asset protection.",
                icon: <Flame size={32} />,
                img: "/navbar/Thermal-Imaging Cameras.png",
                slug: "thermal-imaging-cameras"
              },
              {
                title: "PTZ Surveillance Systems",
                desc: "Pan-Tilt-Zoom cameras for 360° coverage, advanced zoom, and auto-tracking for perimeter security.",
                icon: <Settings size={32} />,
                img: "/navbar/PTZ-SurveillanceSystems.png",
                slug: "ptz-surveillance-systems"
              },
              {
                title: "AI-Powered Smart Cameras",
                desc: "Deep learning cameras for intelligent monitoring, PPE compliance, and advanced analytics.",
                icon: <Cpu size={32} />,
                img: "/navbar/AI-Powered.png",
                slug: "ai-powered-smart-cameras"
              }
            ].map((sol, i) => (
              <div key={i} className="group bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="h-64 relative overflow-hidden">
                  <img src={sol.img} alt={sol.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <div className="text-maroon mb-4">{sol.icon}</div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4">{sol.title}</h3>
                  <p className="text-gray-500 font-medium mb-8 leading-relaxed">{sol.desc}</p>
                  <Link href={`/solutions/${sol.slug}`} className="flex items-center gap-2 text-maroon font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="page-hero rounded-[2.5rem] md:rounded-[60px] p-6 md:p-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-maroon/10 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-16">
                Features & <span className="text-maroon">Benefits</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {[
                  { title: "Enhanced Security Monitoring", desc: "Advanced CCTV and AI-powered surveillance for 24/7 monitoring, real-time threat detection, and comprehensive coverage across manufacturing facilities." },
                  { title: "Smart Video Analytics", desc: "Deep learning analytics for automated incident detection, people counting, and behavioral analysis to improve operational intelligence." },
                  { title: "Integrated Access Control", desc: "Seamless integration of access control with CCTV to ensure only authorized personnel access sensitive areas." },
                  { title: "Remote Monitoring", desc: "Access real-time footage and alerts from anywhere via mobile apps and cloud solutions for proactive management." },
                  { title: "Operational Insights", desc: "Gain actionable insights into facility operations, safety compliance, and workflow optimization through intelligent analytics." },
                  { title: "Early Fire & Hazard Detection", desc: "Thermal imaging and smart sensors for early fire, smoke, and hazard detection to protect assets and personnel." }
                ].map((feat, i) => (
                  <div key={i} className="group border-l-2 border-maroon/30 pl-8 hover:border-maroon transition-colors">
                    <h4 className="text-white text-xl font-black uppercase tracking-tight mb-4 group-hover:text-maroon transition-colors">{feat.title}</h4>
                    <p className="text-gray-400 font-medium text-sm leading-relaxed mb-6">{feat.desc}</p>
                    <Link href="/contact" className="text-maroon font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:gap-3 transition-all">
                      Learn More <ChevronRight size={12} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 page-hero relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-8">
            Secure Your <span className="text-maroon">Facility Today</span>
          </h2>
          <p className="text-white/70 text-lg font-bold uppercase tracking-widest mb-12 max-w-2xl mx-auto">
            Expert consultation for industrial security requirements in the UAE.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 px-12 py-6 bg-maroon text-white rounded-full font-black uppercase tracking-widest hover:bg-[#a01830] transition-all shadow-2xl active:scale-95">
            Get Started Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
