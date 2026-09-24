"use client";

import { GraduationCap, ShieldCheck, Users, School, ChevronRight, ArrowRight, BookOpen, MapPin, Bus, Zap } from 'lucide-react';
import Link from 'next/link';

export default function EducationSolutionPage() {
   return (
      <main className="min-h-screen bg-gray-50">
         {/* Hero Section */}
         <section className="relative mt-[112px] sm:mt-[120px] md:mt-[120px] w-full overflow-hidden bg-[#0c0c0e] h-[72vh] min-h-[560px] max-h-[760px] sm:h-[82vh] md:h-[86vh] lg:h-[88vh] sm:min-h-[680px] md:min-h-[720px] sm:max-h-[960px]">
            <div className="absolute inset-0">
               <img
                  src="/navbar/education thumb.png"
                  className="w-full h-full object-cover"
                  alt="Education Background"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:hidden" />
               <div className="hidden sm:block absolute inset-y-0 left-0 w-3/5 lg:w-1/2 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
            </div>
            <div className="relative h-full w-full max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12 lg:px-14 flex flex-col justify-center items-start text-left pb-8 sm:pb-0 z-10">
               <div className="max-w-xl lg:max-w-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-maroon/20 border border-maroon/30 rounded-full mb-3 sm:mb-4">
                     <GraduationCap size={14} className="text-maroon" />
                     <span className="text-maroon font-black uppercase tracking-[0.25em] text-xs">Education & Campus Solutions</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2 sm:mb-4 leading-tight sm:leading-[1.05]">
                     Education <span className="text-maroon">Solutions</span>
                  </h1>
                  <p className="text-xs sm:text-base md:text-lg text-gray-200 mb-5 sm:mb-8 leading-relaxed max-w-lg sm:max-w-xl">
                     Empowering UAE schools, colleges, and university campuses with cutting-edge perimeter safety, intelligent attendance, and operational excellence.
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

         {/* Modern Education Section */}
         <section className="py-24 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                  <div className="relative">
                     <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border border-maroon">
                        <img
                           src="/navbar/education thumb.png"
                           className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                           alt="Campus Security"
                        />
                     </div>
                     <div className="absolute -right-8 top-1/2 -translate-y-1/2 space-y-4 hidden md:block">
                        {[
                           { icon: <ShieldCheck className="text-maroon" />, label: "Safety First" },
                           { icon: <Users className="text-maroon" />, label: "Smart ID" },
                           { icon: <Bus className="text-maroon" />, label: "Secure Transport" }
                        ].map((item, i) => (
                           <div key={i} className="p-4 bg-white shadow-xl rounded-2xl flex items-center gap-4 border border-gray-50 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                              <div className="w-10 h-10 rounded-xl bg-maroon/10 flex items-center justify-center">{item.icon}</div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">{item.label}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div>
                     <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-8">Security for <br />Modern Education</h2>
                     <p className="text-gray-500 font-medium leading-relaxed mb-12 text-lg">
                        Hikvision delivers robust, scalable security solutions tailored for educational institutions in the UAE. Our systems combine high-definition cameras, AI analytics, and integrated access control to protect students, staff, and assets while enabling smart learning environments.
                     </p>

                     <div className="space-y-8">
                        <div className="flex gap-6">
                           <div className="w-14 h-14 bg-maroon/5 rounded-2xl flex items-center justify-center text-maroon shrink-0 border border-maroon/10">
                              <School size={24} />
                           </div>
                           <div>
                              <h4 className="text-xl font-black uppercase tracking-tight mb-2">Intelligent Applications</h4>
                              <p className="text-gray-500 font-medium text-sm">State-of-the-art applications designed to create digital campuses with enhanced automation and comprehensive security features.</p>
                           </div>
                        </div>
                        <div className="flex gap-6">
                           <div className="w-14 h-14 bg-maroon/5 rounded-2xl flex items-center justify-center text-maroon shrink-0 border border-maroon/10">
                              <Zap size={24} />
                           </div>
                           <div>
                              <h4 className="text-xl font-black uppercase tracking-tight mb-2">Easy Integration</h4>
                              <p className="text-gray-500 font-medium text-sm">Easily integrates with external information management systems or other third-party systems, adding to the diversity of educational resources.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Comprehensive Campus Security */}
         <section className="py-24">
            <div className="max-w-7xl mx-auto px-4">
               <div className="text-center mb-20">
                  <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-6">Comprehensive Campus Security</h2>
                  <p className="text-gray-500 max-w-4xl mx-auto font-medium text-lg leading-relaxed">
                     Our solutions provide end-to-end security coverage for educational institutions, encompassing school transportation, entry points, perimeter security, building access, and internal monitoring.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     { title: "Advanced Security", desc: "State-of-the-art surveillance systems with AI-powered threat detection and immediate response capabilities.", icon: <ShieldCheck size={32} /> },
                     { title: "Smart Attendance", desc: "Automated attendance tracking using facial recognition and mobile check-in systems for students and staff.", icon: <Users size={32} /> },
                     { title: "Smart Classrooms", desc: "Interactive learning environments with integrated AV systems and automated environmental controls.", icon: <BookOpen size={32} /> }
                  ].map((feat, i) => (
                     <div key={i} className="group bg-white p-12 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-maroon/10 transition-all duration-500">
                        <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-maroon mb-10 group-hover:scale-110 group-hover:bg-maroon group-hover:text-white transition-all duration-500">
                           {feat.icon}
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4">{feat.title}</h3>
                        <p className="text-gray-500 font-medium leading-relaxed mb-10">{feat.desc}</p>
                        <Link href="/contact" className="flex items-center gap-2 text-maroon font-black uppercase tracking-widest text-[10px] hover:gap-4 transition-all">
                           Learn More <ArrowRight size={14} />
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Locations Banner */}
         <section className="max-w-7xl mx-auto px-4 pb-20">
            <div className="bg-maroon rounded-[2.5rem] p-6 sm:p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               </div>
               <div className="relative z-10 text-center md:text-left">
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">Protecting Future <span className="text-white underline decoration-white/40">Leaders</span></h3>
                  <p className="text-white/70 font-bold uppercase tracking-widest text-xs">Available for schools & universities across Dubai, Abu Dhabi & Sharjah.</p>
               </div>
               <Link href="/contact" className="relative z-10 inline-flex items-center gap-4 px-10 py-5 bg-white text-maroon rounded-full font-black uppercase tracking-widest hover:bg-gray-100 transition-all shadow-2xl active:scale-95">
                  Contact Specialist <MapPin size={20} />
               </Link>
            </div>
         </section>
      </main>
   );
}
