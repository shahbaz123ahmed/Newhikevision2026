import Link from 'next/link';
import { ShieldCheck, ArrowRight, Download } from 'lucide-react';
import { getAllCategories } from '@/data/catalog';

export const metadata = {
  title: 'All Product Categories | Hikvision UAE Official Distributor',
  description: 'Explore the complete Hikvision product catalog in the UAE. IP cameras, PTZ cameras, NVRs, Access Control, Video Intercoms, and switches.',
};

export default function ProductsPage() {
  const categories = getAllCategories();

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Products Full-Width Hero Banner */}
      <section className="relative mt-[112px] sm:mt-[120px] md:mt-[120px] w-full overflow-hidden bg-[#0c0c0e] h-[72vh] min-h-[560px] max-h-[760px] sm:h-[82vh] md:h-[86vh] lg:h-[88vh] sm:min-h-[680px] md:min-h-[720px] sm:max-h-[960px] mb-16">
        <div className="absolute inset-0">
          <img
            src="/navbar/ourproducts.png"
            className="w-full h-full object-cover"
            alt="Hikvision UAE Products Catalog"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent sm:hidden" />
          <div className="hidden sm:block absolute inset-y-0 left-0 w-3/5 lg:w-1/2 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>

        <div className="relative h-full w-full max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12 lg:px-14 flex flex-col justify-center items-start text-left pb-8 sm:pb-0 z-10">
          <div className="max-w-xl lg:max-w-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-maroon/20 border border-maroon/30 rounded-full">
              <ShieldCheck size={14} className="text-maroon" />
              <span className="text-maroon font-black uppercase tracking-[0.25em] text-xs">
                Hikvision UAE Official
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight sm:leading-[0.95]">
              PREMIUM <span className="text-maroon">CATALOG</span>
            </h1>

            <p className="text-xs sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-lg sm:max-w-xl">
              Explore the region's most comprehensive collection of official Hikvision security solutions, engineered for excellence in the UAE.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/Download%20Pdf.pdf"
                download
                className="inline-flex justify-center items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest transition-all shadow-xl bg-maroon text-white hover:bg-[#a01830] active:scale-95"
              >
                Download Catalog
                <Download className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex justify-center items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold border border-white/20 backdrop-blur-xl text-white hover:bg-white/10 active:scale-95 transition-all uppercase tracking-widest"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.id || cat.slug}
              href={`/products/${cat.slug}`}
              className="group relative h-80 rounded-[32px] overflow-hidden bg-white shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-maroon/10 transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              <div className="absolute inset-0">
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center p-20">
                    <ShieldCheck size={120} className="text-maroon/5 opacity-20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent group-hover:via-maroon/20 transition-all duration-500" />
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                 <div className="mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <span className="inline-block px-3 py-1 bg-maroon/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-3">
                      Hikvision Official
                   </span>
                   <h2 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-maroon transition-colors">
                      {cat.name}
                   </h2>
                 </div>
                 
                 <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                   <p className="text-gray-300 text-xs font-bold uppercase tracking-widest">View Collections</p>
                   <div className="w-10 h-10 rounded-full bg-maroon/20 flex items-center justify-center text-maroon border border-maroon/30">
                      <ArrowRight size={18} />
                   </div>
                 </div>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-maroon/30 rounded-[32px] transition-colors duration-500" />
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-maroon rounded-[40px] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4 relative z-10">Technical Consultation</h3>
          <p className="text-white/70 mb-8 max-w-xl mx-auto relative z-10 font-bold uppercase tracking-widest text-xs">Expert support for your security requirements.</p>
          <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-white text-maroon rounded-full font-black uppercase tracking-widest hover:bg-gray-100 hover:text-maroon transition-all shadow-xl active:scale-95 relative z-10">
            Request Quote <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </main>
  );
}
