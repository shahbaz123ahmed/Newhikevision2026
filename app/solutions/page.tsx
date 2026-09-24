"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, 
  Store, 
  HeartPulse, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Zap, 
  Globe,
  Building,
  Home,
  Truck,
  Hotel,
  Download,
  PhoneCall
} from 'lucide-react';

const industrySolutions = [
  {
    title: "Manufacturing",
    slug: "manufacturing",
    desc: "Intelligent production line monitoring, worker safety analytics, and perimeter protection for industrial complexes.",
    icon: Building2,
    image: "/navbar/Manufacture thumb.png",
    features: ["Thermal Inspection", "PPE Detection", "Access Control"]
  },
  {
    title: "Retail",
    slug: "retail",
    desc: "Loss prevention, footfall analytics, and VIP recognition to optimize customer experience and business operations.",
    icon: Store,
    image: "/navbar/Retail Thumb.png",
    features: ["Heat Mapping", "Queue Management", "POS Integration"]
  },
  {
    title: "Healthcare",
    slug: "healthcare",
    desc: "Patient safety monitoring, restricted area access, and smart hospital management systems.",
    icon: HeartPulse,
    image: "/navbar/Health care thumb.png",
    features: ["Nurse Call Integration", "Stretcher Tracking", "Lab Security"]
  },
  {
    title: "Education",
    slug: "education",
    desc: "Ensuring campus safety with intelligent perimeter guarding, automated attendance, and emergency response systems.",
    icon: GraduationCap,
    image: "/navbar/education thumb.png",
    features: ["Campus Broadcast", "Parent Notifications", "AI Labs"]
  },
  {
    title: "Government",
    slug: "government",
    desc: "Critical infrastructure protection, public safety monitoring, and secure government building management.",
    icon: Building,
    image: "/navbar/government thumb.png",
    features: ["City Surveillance", "Traffic Management", "Data Centers"]
  },
  {
    title: "Residential",
    slug: "residential",
    desc: "Smart villa security, video intercoms, and integrated home automation for modern UAE living.",
    icon: Home,
    image: "/navbar/residential thumb.png",
    features: ["Mobile Control", "Package Detection", "Smart Locks"]
  },
  {
    title: "Logistics",
    slug: "logistics",
    desc: "Fleet management, warehouse optimization, and shipment tracking with AI-powered cameras.",
    icon: Truck,
    image: "/navbar/logistic thumb.png",
    features: ["LPR Cameras", "Dock Management", "Route Optimization"]
  },
  {
    title: "Hospitality",
    slug: "hospitality",
    desc: "Guest safety, luxury hotel management, and intelligent parking solutions for premium resorts.",
    icon: Hotel,
    image: "/navbar/hospital thumb.png",
    features: ["Face Check-in", "Pool Safety", "Energy Saving"]
  }
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Solutions Hero Banner (Matching Hero Section Style) */}
      <section className="relative mt-[112px] sm:mt-[120px] md:mt-[120px] w-full overflow-hidden bg-[#0c0c0e] h-[72vh] min-h-[560px] max-h-[760px] sm:h-[82vh] md:h-[86vh] lg:h-[88vh] sm:min-h-[660px] md:min-h-[720px] sm:max-h-[960px]">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/herosection/Tailored Security For Every Industry..png"
            alt="Tailored Security For Every Industry"
            fill
            sizes="100vw"
            className="object-cover object-[75%_center] sm:object-center"
            priority
            quality={90}
          />
          {/* Partial localized shading for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:hidden" />
          <div className="hidden sm:block absolute inset-y-0 left-0 w-3/5 lg:w-1/2 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
        </div>

        {/* Content - Left Aligned directly over image */}
        <div className="relative h-full w-full max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12 lg:px-14 flex flex-col justify-end sm:justify-center items-start text-left pb-8 sm:pb-0">
          <div className="max-w-xl lg:max-w-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {/* Tag / Category */}
            <div className="inline-block text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] mb-2 sm:mb-3 text-maroon">
              Enterprise Solutions Portfolio
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2 sm:mb-4 leading-tight sm:leading-[1.05]">
              TAILORED SECURITY{" "}
              <span className="text-maroon">FOR EVERY INDUSTRY</span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-base md:text-lg text-gray-200 mb-5 sm:mb-8 leading-relaxed max-w-lg sm:max-w-xl">
              Hikvision UAE provides state-of-the-art intelligent solutions optimized for the specific challenges of various sectors across Dubai, Abu Dhabi, and the Northern Emirates.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-start gap-3 sm:gap-4 mb-2 sm:mb-0">
              <a
                href="/Download%20Pdf.pdf"
                download
                className="inline-flex justify-center items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xl bg-maroon text-white hover:bg-[#a01830] active:scale-95"
              >
                Download Catalog
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex justify-center items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold border border-white/20 backdrop-blur-xl text-white hover:bg-white/10 active:scale-95 transition-all"
              >
                Contact Specialists
                <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-maroon font-black uppercase tracking-[0.4em] text-xs mb-4">Industry Portfolio</h2>
            <p className="text-4xl md:text-5xl font-black text-gray-900 dark:text-[#1D1D1F] tracking-tighter mb-6">
              Our <span className="text-maroon">Expertise</span>
            </p>
            <div className="w-24 h-1.5 bg-maroon mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industrySolutions.map((solution, i) => (
              <Link 
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="group relative flex flex-col bg-white dark:bg-white border border-gray-100 dark:border-gray-200 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Image Placeholder */}
                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-100">
                  <img 
                    src={solution.image} 
                    alt={solution.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                      <solution.icon size={20} />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{solution.title}</h3>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <p className="text-[#6E6E73] dark:text-[#6E6E73] text-sm leading-relaxed mb-6 line-clamp-3">
                    {solution.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {solution.features.map(feature => (
                      <span key={feature} className="px-3 py-1 rounded-full bg-[#F5F5F7] dark:bg-[#F5F5F7] text-[10px] font-bold text-[#6E6E73] dark:text-[#6E6E73] uppercase tracking-widest border border-gray-200/50 dark:border-gray-200/50">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-maroon group-hover:text-[#a01830] transition-colors">Explore Solution</span>
                    <div className="w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-white transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Solutions Section */}
      <section className="py-24 bg-[#F5F5F7] dark:bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-maroon font-black uppercase tracking-[0.4em] text-xs mb-4">The Hikvision Advantage</h2>
              <p className="text-4xl md:text-5xl font-black text-gray-900 dark:text-[#1D1D1F] tracking-tighter mb-8 leading-[1.1]">
                Intelligence Beyond <br />
                <span className="text-maroon">Just Surveillance.</span>
              </p>
              <p className="text-lg text-gray-600 dark:text-[#6E6E73] mb-10 leading-relaxed">
                We don't just provide cameras; we build intelligent ecosystems that transform data into actionable insights for your business.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "AI Integration", desc: "Native deep learning for accurate detection.", icon: Target },
                  { title: "Scalability", desc: "From small offices to smart cities.", icon: Globe },
                  { title: "Efficiency", desc: "Optimize operations and reduce costs.", icon: Zap },
                  { title: "Proven Trust", desc: "Trusted by UAE's top corporations.", icon: CheckCircle2 }
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-white shadow-sm border border-gray-100 dark:border-gray-200">
                    <div className="w-10 h-10 rounded-lg bg-maroon/5 flex items-center justify-center text-maroon shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 dark:text-[#1D1D1F] uppercase tracking-tight text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-400 dark:text-[#86868B] mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-[3rem] bg-gray-100 overflow-hidden shadow-2xl p-2 relative group border border-maroon">
                <img 
                  src="/navbar/education thumb.png" 
                  alt="Solution Overview" 
                  className="w-full h-full object-cover rounded-[2.5rem] transition-transform duration-1000 group-hover:scale-110" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto bg-maroon rounded-[3rem] p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6">
              Ready to Secure <br />
              Your <span className="text-white underline decoration-white/40">Industry?</span>
            </h2>
            <p className="text-white/80 mb-10 font-medium max-w-xl mx-auto">
              Our experts are ready to design a custom solution for your specific requirements.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-3 px-12 py-5 rounded-2xl bg-white text-maroon font-black text-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-xl"
            >
              Get Expert Advice
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
               