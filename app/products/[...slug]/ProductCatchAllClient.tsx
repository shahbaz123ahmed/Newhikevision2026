"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ShoppingBag,
  Eye,
  CheckCircle2,
  FileText,
  Star,
  Info,
  X,
  Send,
  Download
} from 'lucide-react';

import {
  getNavCatalog,
  getCategoryBySlug,
  getSubCategoryBySlug,
  getProducts,
  getProductBySlug,
  getChildSubCategories,
} from '@/data/catalog';

const HERO_IMAGES: Record<string, string> = {
  // Map category/subcategory slugs to local files in the public folder
  'video-intercom': '/navbar/VideoInter.png',
  'led-displays': '/navbar/LED display.png',
  'turbo-hd-products': '/navbar/Turbo HD Product.png',
  'network-products': '/navbar/Network products.png',
  'fingerprint-terminals': '/Solutions/hero2.png',
  'turret-cameras': '/Solutions/hero2.png',
  'bullet-cameras': '/Solutions/hero3.png',
  'dome-cameras': '/Solutions/hero4.png',
  'fixed-bullet-cameras': '/Solutions/hero5.png',
  'ip-ptz-cameras': '/Solutions/hero7.png',
  'poe-switches': '/Solutions/hero8.png',
  'indoor-stations': '/Solutions/hero9.png',
  'pro-series-nvr': '/Solutions/hero6.png',
};

export default function ProductCatchAllClient({ slug }: { slug: string[] }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Enquiry Form State
  const [mounted, setMounted] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    details: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    try {
      if (slug.length === 1) {
        // Category Page
        const navData = getNavCatalog();
        const cat = navData.find((c: any) => c.slug.toLowerCase() === slug[0].toLowerCase());
        if (cat) {
          setData({ type: 'category', ...cat });
        } else {
          setError(true);
        }
      } else if (slug.length === 2) {
        // Sub-category Page (could be group with children or direct subcategory)
        const cat = getCategoryBySlug(slug[0]);
        const sub = getSubCategoryBySlug(slug[1]);
        const children = getChildSubCategories(slug[1]);

        if (children && children.length > 0) {
          setData({
            type: 'subcategory_group',
            sub,
            children,
            category: cat || { name: slug[0], slug: slug[0] }
          });
        } else if (sub) {
          const prodData = getProducts({ subCategorySlug: slug[1] });
          setData({
            type: 'subcategory',
            sub,
            products: prodData,
            category: cat || { name: slug[0], slug: slug[0] }
          });
        } else {
          setError(true);
        }
      } else if (slug.length === 3) {
        // Could be Product Detail Page OR Nested Series Subcategory Page
        const product = getProductBySlug(slug[2]);
        const cat = getCategoryBySlug(slug[0]);
        const parentSub = getSubCategoryBySlug(slug[1]);
        const seriesSub = getSubCategoryBySlug(slug[2]);

        if (product) {
          setData({
            type: 'product',
            product,
            sub: parentSub || { name: slug[1], slug: slug[1] },
            category: cat || { name: slug[0], slug: slug[0] }
          });
        } else if (seriesSub) {
          const prodData = getProducts({ subCategorySlug: slug[2] });
          setData({
            type: 'subcategory',
            sub: seriesSub,
            parentSub,
            products: prodData,
            category: cat || { name: slug[0], slug: slug[0] }
          });
        } else {
          setError(true);
        }
      } else if (slug.length === 4) {
        // Nested Product Detail Page
        const product = getProductBySlug(slug[3]);
        const cat = getCategoryBySlug(slug[0]);
        const parentSub = getSubCategoryBySlug(slug[1]);
        const seriesSub = getSubCategoryBySlug(slug[2]);

        if (product) {
          setData({
            type: 'product',
            product,
            sub: seriesSub || parentSub || { name: slug[2], slug: slug[2] },
            category: cat || { name: slug[0], slug: slug[0] }
          });
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Data error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // Lock body scroll when enquiry modal is open
  useEffect(() => {
    if (showEnquiryModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showEnquiryModal]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productName: data.product.name,
          productSlug: data.product.slug,
          productImage: data.product.images?.[0] || null,
          productPath: `/products/${slug.join('/')}`
        })
      });
      if (res.ok) {
        setFormSuccess(true);
        setTimeout(() => {
          setShowEnquiryModal(false);
          setFormSuccess(false);
          setFormData({ name: '', email: '', mobile: '', details: '' });
        }, 3000);
      }
    } catch (err) {
      console.error('Enquiry error:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const generatePDF = async () => {
    if (!data?.product) return;
    const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
      import('jspdf'),
      import('jspdf-autotable')
    ]);
    const { product, sub, category } = data;
    const doc = new jsPDF();

    // Header
    doc.setFillColor(139, 0, 0); // Maroon
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('HIKVISION UAE', 20, 25);
    doc.setFontSize(10);
    doc.text('Official Product Data Sheet', 20, 32);

    // Product Image
    let nextY = 55;
    if (product.images?.[0]) {
      try {
        doc.addImage(product.images[0], 'JPEG', 140, 50, 50, 50);
      } catch (e) {
        console.warn('Could not add image to PDF:', e);
      }
    }

    // Product Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text(product.name, 20, nextY);
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(product.subTitle || '', 20, nextY + 7);

    // Details Table
    const tableData = [
      ['Category', category?.name || 'N/A'],
      ['Sub Category', sub?.name || 'N/A'],
      ['Model', product.name],
    ];

    autoTable(doc, {
      startY: nextY + 15,
      head: [['Field', 'Details']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [139, 0, 0] },
      margin: { left: 20 },
      tableWidth: 100
    });

    // Description
    const currentY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.setTextColor(139, 0, 0);
    doc.text('Product Description', 20, currentY);
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    const splitDesc = doc.splitTextToSize(product.description || '', 170);
    doc.text(splitDesc, 20, currentY + 10);

    // Key Highlights
    const highlightY = currentY + 10 + (splitDesc.length * 5) + 10;
    doc.setFontSize(14);
    doc.setTextColor(139, 0, 0);
    doc.text('Key Highlights', 20, highlightY);
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    product.keyFeatures?.forEach((feat: string, i: number) => {
      doc.text(`• ${feat}`, 25, highlightY + 10 + (i * 7));
    });

    // Technical Features
    const featuresY = highlightY + 10 + ((product.keyFeatures?.length || 0) * 7) + 15;
    doc.setFontSize(14);
    doc.setTextColor(139, 0, 0);
    doc.text('Technical Features', 20, featuresY);
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    product.features?.forEach((feat: string, i: number) => {
      doc.text(`- ${feat}`, 25, featuresY + 10 + (i * 7));
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated from hikvisionuae.ae - Professional Security Solutions', 105, 285, { align: 'center' });

    doc.save(`${product.slug}-data-sheet.pdf`);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-maroon border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Synchronizing Products...</p>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} className="text-gray-300" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-4 uppercase">Resource Not Found</h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">The requested path does not match our current catalog.</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3 bg-maroon text-white rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg shadow-maroon/20 active:scale-95 transition-all">
            <ChevronLeft size={16} /> Return to Products
          </Link>
        </div>
      </main>
    );
  }

  // CATEGORY VIEW
  if (data.type === 'category') {
    const heroBg = HERO_IMAGES[slug[0]] || data.image;
    return (
      <main className="min-h-screen bg-gray-50 pb-20">
        {/* Category Hero */}
        <section className="relative mt-[112px] sm:mt-[120px] md:mt-[120px] w-full overflow-hidden bg-[#0c0c0e] h-[68vh] min-h-[520px] max-h-[720px] sm:h-[76vh] md:h-[80vh] sm:min-h-[600px] md:min-h-[660px] sm:max-h-[880px]">
          {heroBg ? (
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={heroBg}
                alt={data.name}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:hidden" />
              <div className="hidden sm:block absolute inset-y-0 left-0 w-3/5 lg:w-1/2 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          )}

          <div className="relative h-full w-full max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12 lg:px-14 flex flex-col justify-center items-start text-left z-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-maroon font-black uppercase tracking-widest text-[10px] mb-3 sm:mb-4 hover:gap-3 transition-all bg-white/5 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md"
            >
              <ChevronLeft size={14} /> Back to Catalog
            </Link>

            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
                <div className="h-px w-8 bg-maroon" />
                <span className="text-maroon font-black uppercase tracking-[0.25em] text-xs">Official Category</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-3 sm:mb-4 leading-tight sm:leading-[1.05]">
                {data.name}
              </h1>
              <p className="text-gray-200 text-xs sm:text-base md:text-lg font-medium leading-relaxed max-w-xl">
                Explore our professional range of {data.name} solutions, engineered for the UAE's most demanding security environments.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.subCategories?.map((sub: any) => (
              <div
                key={sub.id || sub.slug || sub._id}
                className="group bg-white rounded-[32px] p-8 sm:p-10 border border-gray-100/90 shadow-md shadow-gray-200/40 hover:shadow-2xl hover:shadow-maroon/15 hover:border-maroon/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-maroon via-red-500 to-maroon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-b from-gray-50 to-gray-100/60 border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:border-maroon/20 transition-all duration-300 overflow-hidden p-4">
                  {sub.image ? (
                    <img src={sub.image} alt={sub.name} className="w-full h-full object-contain" />
                  ) : (
                    <ShieldCheck size={40} className="text-maroon/20" />
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight mb-3 group-hover:text-maroon transition-colors">
                  {sub.name}
                </h2>

                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/products/${slug[0]}/${sub.slug}`}
                    className="inline-flex items-center gap-2 text-maroon font-black uppercase tracking-widest text-[11px] hover:gap-3 transition-all"
                  >
                    Explore Products <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // SUBCATEGORY GROUP VIEW
  if (data.type === 'subcategory_group') {
    const heroBg = HERO_IMAGES[slug[1]] || data.sub?.image;
    return (
      <main className="min-h-screen bg-gray-50 pb-20">
        <section className="relative mt-[112px] sm:mt-[120px] md:mt-[120px] w-full overflow-hidden bg-[#0c0c0e] h-[68vh] min-h-[520px] max-h-[720px] sm:h-[76vh] md:h-[80vh] sm:min-h-[600px] md:min-h-[660px] sm:max-h-[880px]">
          {heroBg ? (
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={heroBg}
                alt={data.sub?.name || 'Category'}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:hidden" />
              <div className="hidden sm:block absolute inset-y-0 left-0 w-3/5 lg:w-1/2 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          )}

          <div className="relative h-full w-full max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12 lg:px-14 flex flex-col justify-center items-start text-left z-10">
            <div className="flex items-center gap-2 text-maroon font-black uppercase tracking-widest text-[9px] sm:text-[10px] mb-3 sm:mb-4 bg-white/5 w-fit px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <Link href="/products" className="hover:text-white transition-colors">Catalog</Link>
              <ChevronRight size={10} className="text-white/30" />
              <Link href={`/products/${slug[0]}`} className="hover:text-white transition-colors">{data.category?.name || slug[0]}</Link>
              <ChevronRight size={10} className="text-white/30" />
              <span className="text-white/60">{data.sub?.name || slug[1]}</span>
            </div>

            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
                <div className="h-px w-8 bg-maroon" />
                <span className="text-maroon font-black uppercase tracking-[0.25em] text-xs">Product Series</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-3 sm:mb-4 leading-tight sm:leading-[1.05]">
                {data.sub?.name}
              </h1>
              <p className="text-gray-200 text-xs sm:text-base md:text-lg font-medium leading-relaxed max-w-xl">
                Explore specialized series under {data.sub?.name}, built for enterprise reliability and cutting-edge performance.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.children?.map((child: any) => (
              <div
                key={child.id || child.slug}
                className="group bg-white rounded-[32px] p-8 sm:p-10 border border-gray-100/90 shadow-md shadow-gray-200/40 hover:shadow-2xl hover:shadow-maroon/15 hover:border-maroon/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-maroon via-red-500 to-maroon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-b from-gray-50 to-gray-100/60 border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:border-maroon/20 transition-all duration-300 overflow-hidden p-4">
                  {child.image ? (
                    <img src={child.image} alt={child.name} className="w-full h-full object-contain" />
                  ) : (
                    <ShieldCheck size={40} className="text-maroon/20" />
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight mb-4 group-hover:text-maroon transition-colors">
                  {child.name}
                </h2>

                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/products/${slug[0]}/${slug[1]}/${child.slug}`}
                    className="inline-flex items-center gap-2 text-maroon font-black uppercase tracking-widest text-[11px] hover:gap-3 transition-all"
                  >
                    Explore Series <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // SUBCATEGORY / SERIES VIEW
  if (data.type === 'subcategory') {
    const heroBg = HERO_IMAGES[slug[slug.length - 1]] || data.sub?.image;
    return (
      <main className="min-h-screen bg-gray-50 pb-20">
        {/* Subcategory Hero */}
        <section className="relative mt-[112px] sm:mt-[120px] md:mt-[120px] w-full overflow-hidden bg-[#0c0c0e] h-[65vh] min-h-[500px] max-h-[680px] sm:h-[72vh] md:h-[76vh] sm:min-h-[560px] md:min-h-[620px] sm:max-h-[840px]">
          {heroBg ? (
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={heroBg}
                alt={data.sub?.name || 'Category'}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:hidden" />
              <div className="hidden sm:block absolute inset-y-0 left-0 w-3/5 lg:w-1/2 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          )}

          <div className="relative h-full w-full max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12 lg:px-14 flex flex-col justify-center items-start text-left z-10">
            <div className="flex items-center gap-2 text-maroon font-black uppercase tracking-widest text-[10px] sm:text-xs mb-3 sm:mb-4 bg-white/5 w-fit px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <Link href="/products" className="hover:text-white transition-colors">Catalog</Link>
              <ChevronRight size={12} className="text-white/30" />
              <Link href={`/products/${slug[0]}`} className="hover:text-white transition-colors">{data.category?.name || slug[0]}</Link>
              {data.parentSub && (
                <>
                  <ChevronRight size={12} className="text-white/30" />
                  <Link href={`/products/${slug[0]}/${data.parentSub.slug}`} className="hover:text-white transition-colors">{data.parentSub.name}</Link>
                </>
              )}
              <ChevronRight size={12} className="text-white/30" />
              <span className="text-white/60">{data.sub?.name}</span>
            </div>

            <div className="max-w-2xl">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-3 sm:mb-4 leading-tight sm:leading-[1.05]">
                {data.sub?.name || slug[1].replace(/-/g, ' ')}
              </h1>
              <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-maroon/15 border border-maroon/30 rounded-full text-maroon font-bold uppercase tracking-widest text-xs">
                  <span className="w-2 h-2 rounded-full bg-maroon animate-pulse" />
                  {data.products.length} Professional Products
                </span>
                <div className="h-3.5 w-px bg-white/20 hidden sm:block" />
                <p className="text-gray-300 text-xs font-bold uppercase tracking-widest">Hikvision Pro Series • UAE Official</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
            {data.products.length > 0 ? data.products.map((prod: any) => (
              <Link
                key={prod.id || prod.slug || prod._id}
                href={`/products/${slug.join('/')}/${prod.slug}`}
                className="group relative bg-white rounded-[26px] p-5 border border-gray-200/90 shadow-sm hover:shadow-2xl hover:shadow-maroon/15 hover:border-maroon/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-maroon to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative aspect-square rounded-2xl bg-gradient-to-b from-gray-50 via-slate-50/60 to-gray-100/70 p-6 flex items-center justify-center overflow-hidden border border-gray-100 mb-4 group-hover:bg-red-50/10 transition-colors duration-300">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-wider text-maroon shadow-sm border border-gray-100">
                      Hikvision
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-maroon group-hover:text-white group-hover:border-maroon transition-all duration-300">
                    <Eye size={14} />
                  </div>

                  {prod.images?.[0] ? (
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <ShieldCheck size={48} className="text-maroon/10" />
                  )}
                </div>

                <div className="flex-grow flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-black text-maroon uppercase tracking-widest truncate">
                      {data.category?.name || 'Video Intercom'}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded shrink-0">
                      Pro Series
                    </span>
                  </div>

                  <h3 className="text-[15px] font-black text-gray-900 uppercase tracking-tight group-hover:text-maroon transition-colors mb-1.5 line-clamp-1 leading-snug">
                    {prod.name}
                  </h3>

                  <p className="text-[11px] font-medium text-gray-500 uppercase tracking-tight line-clamp-2 leading-relaxed mb-4">
                    {prod.subTitle || prod.description || 'Hikvision Professional Security System'}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={11}
                        className={s <= (prod.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                      />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-black text-maroon uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    View Product <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            )) : (
              <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No products found in this collection yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  // PRODUCT DETAIL VIEW
  if (data.type === 'product') {
    const { product } = data;

    return (
      <main className="min-h-screen bg-white pb-20 relative">
        {/* Enquiry Modal */}
        {showEnquiryModal && mounted && typeof document !== 'undefined' && createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !formLoading && setShowEnquiryModal(false)}
            />

            <div className="relative bg-white w-full max-w-lg rounded-[28px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 z-10 border border-gray-100">
              <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center p-1.5 shadow-sm shrink-0">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt="" className="w-full h-full object-contain" />
                    ) : (
                      <ShieldCheck size={20} className="text-maroon" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-maroon uppercase tracking-widest block leading-tight">Product Enquiry</span>
                    <h3 className="text-base sm:text-lg font-black text-gray-900 uppercase tracking-tight leading-tight">{product.name}</h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEnquiryModal(false)}
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-maroon hover:border-maroon/30 transition-colors shadow-sm cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6">
                {formSuccess ? (
                  <div className="text-center py-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                      <CheckCircle2 size={30} />
                    </div>
                    <h4 className="text-xl font-black text-gray-900 uppercase mb-1">Enquiry Sent!</h4>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Thank you for reaching out. Our team will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Name</label>
                        <input
                          required
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-maroon/40 focus:bg-white transition-all font-bold text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                        <input
                          required
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-maroon/40 focus:bg-white transition-all font-bold text-xs"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mobile Number</label>
                      <input
                        required
                        type="tel"
                        placeholder="+971 XX XXX XXXX"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-maroon/40 focus:bg-white transition-all font-bold text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Requirement Details</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Please describe your requirements..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-maroon/40 focus:bg-white transition-all font-bold text-xs resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full py-3.5 mt-2 bg-maroon text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 hover:bg-black transition-all shadow-lg shadow-maroon/20 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      {formLoading ? 'Processing...' : (
                        <>
                          <span>Send Enquiry</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}

        {/* Product Details Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-gray-500 font-black uppercase tracking-widest text-[10px] mb-10 bg-white w-fit px-4 py-2 rounded-full border border-gray-100 shadow-sm flex-wrap">
            <Link href="/products" className="hover:text-maroon transition-colors">Catalog</Link>
            <ChevronRight size={10} className="text-gray-300" />
            <Link href={`/products/${slug[0]}`} className="hover:text-maroon transition-colors">{data.category?.name || slug[0]}</Link>
            {slug.length > 2 && slug.slice(1, -1).map((seg: string, idx: number) => {
              const segPath = slug.slice(0, idx + 2).join('/');
              return (
                <span key={seg} className="inline-flex items-center gap-2">
                  <ChevronRight size={10} className="text-gray-300" />
                  <Link href={`/products/${segPath}`} className="hover:text-maroon transition-colors">
                    {seg.replace(/-/g, ' ')}
                  </Link>
                </span>
              );
            })}
            <ChevronRight size={10} className="text-gray-300" />
            <span className="text-maroon truncate max-w-[200px]">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="aspect-square rounded-[40px] bg-gray-50 border-[2px] border-[#C41E3A] flex items-center justify-center p-12 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-maroon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <ShieldCheck size={120} className="text-maroon/5" />
                )}

                <div className="absolute bottom-8 left-8 flex items-center gap-3">
                  <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-white shadow-xl flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Official Product</span>
                  </div>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: ShieldCheck, text: 'Genuine UAE' },
                  { icon: CheckCircle2, text: 'Auth. Dealer' },
                  { icon: FileText, text: 'Tech Sheet' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-gray-100">
                    <item.icon size={20} className="text-maroon mb-2" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-maroon text-white rounded-full text-[9px] font-black uppercase tracking-widest">Enterprise Range</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} className={s <= (product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                    ))}
                  </div>
                </div>

                <h2 className="inline-block text-2xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-[#C41E3A] uppercase tracking-tight mb-4 leading-tight py-1">
                  {product.name}
                </h2>
                <p className="text-xl font-bold text-maroon uppercase tracking-tight mb-6">
                  {product.subTitle}
                </p>
                <div className="h-1 w-20 bg-maroon rounded-full mb-8" />

                <p className="text-gray-500 leading-relaxed font-medium text-sm">
                  {product.description}
                </p>
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                {product.keyFeatures?.map((feature: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-maroon mt-0.5 shrink-0" />
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-auto space-y-4">
                <button
                  onClick={() => setShowEnquiryModal(true)}
                  className="w-full py-5 bg-maroon text-white rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-maroon transition-all shadow-2xl shadow-maroon/20 active:scale-95"
                >
                  <ShoppingBag size={18} />
                  Request Professional Quote
                </button>
                <button
                  onClick={generatePDF}
                  className="w-full py-5 bg-white border-2 border-gray-100 text-gray-900 rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:border-maroon hover:text-maroon transition-all"
                >
                  <Download size={18} />
                  Download Data Sheet
                </button>
              </div>
            </div>
          </div>

          {/* Full Features & Capabilities Section */}
          {product.features && product.features.length > 0 && (
            <div className="mt-20 border-t border-gray-100 pt-16">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-gray-50 rounded-2xl text-maroon">
                  <Info size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Key Capabilities & Features</h2>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deep Technical Analysis</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                {product.features.map((feat: string, i: number) => (
                  <div key={i} className="flex gap-5 items-start group p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                    <span className="text-2xl font-black text-[#C41E3A] shrink-0">{(i + 1).toString().padStart(2, '0')}</span>
                    <p className="text-sm font-bold text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                      {feat}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  return null;
}
