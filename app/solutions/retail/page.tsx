"use client";

import { ShoppingBag, ShieldCheck, BarChart3, Lock, ChevronRight, ArrowRight, Eye, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export default function RetailSolutionPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative mt-[112px] sm:mt-[120px] md:mt-[120px] w-full overflow-hidden bg-[#0c0c0e] h-[72vh] min-h-[560px] max-h-[760px] sm:h-[82vh] md:h-[86vh] lg:h-[88vh] sm:min-h-[680px] md:min-h-[720px] sm:max-h-[960px]">
        <div className="absolute inset-0">
          <img 
            src="/navbar/Retail Thumb.png" 
            className="w-full h-full object-cover"
            alt="Retail Security"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:hidden" />
          <div className="hidden sm:block absolute inset-y-0 left-0 w-3/5 lg:w-1/2 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        </div>
        <div className="relative h-full w-full max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12 lg:px-14 flex flex-col justify-center items-start text-left pb-8 sm:pb-0 z-10">
          <div className="max-w-xl lg:max-w-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-maroon/20 border border-maroon/30 rounded-full mb-3 sm:mb-4">
              <ShoppingBag size={14} className="text-maroon" />
              <span className="text-maroon font-black uppercase tracking-[0.25em] text-xs">Retail Sector Solutions</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2 sm:mb-4 leading-tight sm:leading-[1.05]">
              Retail <span className="text-maroon">Excellence</span>
            </h1>
            <p className="text-xs sm:text-base md:text-lg text-gray-200 mb-5 sm:mb-8 leading-relaxed max-w-lg sm:max-w-xl">
              Secure and optimize your retail space with advanced video surveillance, AI analytics, and business intelligence for the UAE.
            </p>
            <div className="flex items-center justify-start gap-3 sm:gap-4 mb-2 sm:mb-0">
              <Link href="/contact" className="inline-flex justify-center items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xl bg-maroon text-white hover:bg-[#a01830] active:scale-95">
                Explore Features
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
              <div className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/15">
                <ShieldCheck size={16} className="text-maroon" />
                <p className="text-xs font-black uppercase tracking-widest text-gray-200">Official Hikvision UAE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-6">
              Advanced Retail Surveillance
            </h2>
            <div className="h-1.5 w-24 bg-maroon mx-auto rounded-full mb-8" />
            <p className="text-gray-500 max-w-3xl mx-auto font-medium text-lg leading-relaxed">
              Modern retail security demands have evolved. Our comprehensive range of security cameras and surveillance systems provide cutting-edge protection, featuring AI-powered analytics and high-resolution monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
             {[
               {
                 title: "Advanced Video Surveillance",
                 desc: "Deploy state-of-the-art HD cameras and NVR systems to monitor store activities, protect assets, and ensure customer safety across all retail locations.",
                 icon: <Eye size={32} />,
                 color: "bg-blue-500"
               },
               {
                 title: "Smart Loss Prevention",
                 desc: "Utilize AI-powered cameras with behavior analysis to detect suspicious activities, prevent theft, and reduce shrinkage in real-time.",
                 icon: <Lock size={32} />,
                 color: "bg-maroon"
               },
               {
                 title: "Business Intelligence",
                 desc: "Leverage built-in analytics to track customer flow, analyze shopping patterns, and generate heat maps for optimized store layouts.",
                 icon: <BarChart3 size={32} />,
                 color: "bg-maroon"
               },
               {
                 title: "Integrated Security Solution",
                 desc: "Implement comprehensive security with integrated cameras, access control, POS integration, and remote monitoring capabilities.",
                 icon: <LayoutGrid size={32} />,
                 color: "bg-maroon"
               }
             ].map((feat, i) => (
               <div key={i} className="group bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-maroon/10 transition-all duration-500 relative overflow-hidden">
                 <div className={`absolute top-0 right-0 w-32 h-32 ${feat.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-bl-[100px]`} />
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 ${feat.color} shadow-lg transition-transform group-hover:scale-110 duration-500`}>
                   {feat.icon}
                 </div>
                 <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4 group-hover:text-maroon transition-colors">{feat.title}</h3>
                 <p className="text-gray-500 font-medium leading-relaxed mb-8">{feat.desc}</p>
                 <Link href="/contact" className="flex items-center gap-2 text-maroon font-black uppercase tracking-widest text-[10px] hover:gap-4 transition-all">
                   Learn More <ArrowRight size={14} />
                 </Link>
               </div>
             ))}
          </div>

          {/* Business Insights Section */}
          <div className="relative rounded-[2.5rem] md:rounded-[60px] overflow-hidden bg-gradient-to-br from-white to-gray-50/50 border border-gray-150/80 shadow-2xl shadow-gray-200/50 p-6 md:p-24">
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
               <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Analytics" />
             </div>
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                   <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tight mb-8">
                     Data Driven <br /> <span className="text-maroon">Operations</span>
                   </h2>
                    <p className="text-gray-600 text-lg font-medium leading-relaxed mb-12">
                      Beyond security, our retail solutions provide actionable business intelligence. Understand your customers better with advanced footfall analysis and heatmapping.
                    </p>
                   <div className="space-y-6">
                      {["Heat Mapping", "People Counting", "Queue Management", "Store Traffic Analysis"].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 text-gray-800">
                           <div className="w-6 h-6 rounded-full bg-maroon/10 flex items-center justify-center text-maroon shadow-sm">
                              <ChevronRight size={14} />
                           </div>
                           <span className="font-black uppercase tracking-widest text-xs">{item}</span>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="bg-white/80 backdrop-blur-md border border-gray-100/85 p-6 md:p-10 rounded-[2rem] md:rounded-[40px] shadow-xl shadow-gray-100/50">
                   <div className="flex items-center justify-between mb-8">
                      <p className="text-gray-900 font-black uppercase tracking-widest text-xs">AI Performance</p>
                      <span className="text-maroon font-black text-lg">99.8%</span>
                   </div>
                   <div className="w-full h-3 bg-gray-100 rounded-full mb-10 overflow-hidden">
                      <div className="w-[99.8%] h-full bg-maroon rounded-full" />
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Accuracy</p>
                        <p className="text-gray-900 text-2xl font-black uppercase">Extreme</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Response</p>
                        <p className="text-gray-900 text-2xl font-black uppercase">Instant</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
             <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tight mb-8">Ready to Optimize Your <span className="text-maroon">Retail Space?</span></h2>
             <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-12">Expert retail security and analytics solutions across the UAE.</p>
             <Link href="/contact" className="inline-flex items-center gap-3 px-12 py-6 bg-maroon text-white rounded-full font-black uppercase tracking-widest hover:bg-[#a01830] transition-all shadow-2xl active:scale-95">
               Request Free Consultation <ArrowRight size={20} />
             </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
