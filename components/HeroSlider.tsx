"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, PhoneCall, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

const posters = [
  {
    id: 1,
    image: '/hero.png',
    tag: 'Official Platinum Distributor',
    title: 'LEADING UAE IN',
    subtitle: 'SECURITY',
    desc: 'The region\'s most trusted provider of Hikvision solutions, delivering cutting-edge surveillance for government and private sectors.',
    cta1: 'Our Solutions',
    cta2: 'Contact Sales',
    accent: 'gold'
  },
  {
    id: 2,
    image: '/poster1.png',
    tag: 'AI-Driven Intelligence',
    title: 'SMARTER CITIES',
    subtitle: 'SAFER LIVES',
    desc: 'Pioneering AI surveillance with DeepinView and AcuSense technology, optimized for the UAE\'s dynamic urban infrastructure.',
    cta1: 'Explore AI',
    cta2: 'Support',
    accent: 'maroon'
  },
  {
    id: 3,
    image: '/poster.jpeg',
    tag: 'Premium Access Control',
    title: 'UNCOMPROMISED',
    subtitle: 'PROTECTION',
    desc: 'State-of-the-art biometric and facial recognition systems designed for the unique security needs of Dubai and Abu Dhabi.',
    cta1: 'View Products',
    cta2: 'Get Quote',
    accent: 'gold'
  },
  {
    id: 4,
    image: '/poster3.png',
    tag: 'Thermal Innovation',
    title: 'THERMAL VISION',
    subtitle: 'REINVENTED',
    desc: 'Advanced heat-detection and fire prevention systems, engineered to perform in the Middle East\'s extreme environmental conditions.',
    cta1: 'Thermal Range',
    cta2: 'Expert Advice',
    accent: 'maroon'
  },
  {
    id: 5,
    image: '/poster4.png',
    tag: 'Intelligent Living',
    title: 'SMART HOMES',
    subtitle: 'FUTURE-READY',
    desc: 'Seamlessly integrating Hik-Connect ecosystems into modern UAE residences for ultimate control and peace of mind.',
    cta1: 'Smart Home',
    cta2: 'Visit Store',
    accent: 'gold'
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % posters.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev - 1 + posters.length) % posters.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] sm:h-screen min-h-[580px] sm:min-h-[700px] w-full overflow-hidden bg-[#C41E3A]">
      {/* Slides */}
      {posters.map((poster, index) => (
        <div
          key={poster.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === current
            ? 'opacity-100 translate-x-0 z-10'
            : index < current
              ? 'opacity-0 -translate-x-full z-0'
              : 'opacity-0 translate-x-full z-0'
            }`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={poster.image}
              alt={poster.title}
              fill
              sizes="100vw"
              className={`object-cover object-[75%_center] md:object-center transition-all duration-[2000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                mounted && index === current ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
              priority
              quality={75}
            />
          </div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 md:bg-gradient-to-r md:from-black/85 md:via-black/45 md:to-transparent" />

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12 md:pb-0 md:items-center pt-24 md:pt-24">
            <div className={`max-w-3xl text-white transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[400ms] ${
              mounted && index === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-6 ${poster.accent === 'gold' ? 'bg-gold/20 border-gold/30 text-gold' : 'bg-maroon/20 border-maroon/30 text-maroon'}`}>
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{poster.tag}</span>
              </div>

              <h1 className="text-2xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-2 sm:mb-4 leading-[0.95] sm:leading-[0.9]">
                {poster.title} <br />
                <span className={poster.accent === 'gold' ? 'text-gold' : 'text-maroon'}>{poster.subtitle}</span>
              </h1>

              <p className="text-xs sm:text-base md:text-xl text-gray-300 mb-4 sm:mb-10 leading-relaxed max-w-xl opacity-90">
                {poster.desc}
              </p>

              <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-5">
                <Link
                  href="/products"
                  className={`inline-flex justify-center items-center gap-2 sm:gap-3 px-5 py-3 sm:px-10 sm:py-5 rounded-full text-xs sm:text-lg font-bold transition-all shadow-2xl ${poster.accent === 'gold'
                    ? 'bg-gold text-maroon hover:bg-white'
                    : 'bg-maroon text-white hover:bg-gold hover:text-maroon'
                    }`}
                >
                  {poster.cta1}
                  <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex justify-center items-center gap-2 sm:gap-3 px-5 py-3 sm:px-10 sm:py-5 rounded-full text-xs sm:text-lg font-bold border border-white/20 backdrop-blur-xl text-white hover:bg-white/10 transition-all"
                >
                  {poster.cta2}
                  <PhoneCall className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls - Responsive positioning */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-auto md:right-[72px] lg:right-[120px] top-1/2 md:top-auto md:bottom-12 -translate-y-1/2 md:translate-y-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all backdrop-blur-md z-30"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 lg:right-12 top-1/2 md:top-auto md:bottom-12 -translate-y-1/2 md:translate-y-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all backdrop-blur-md z-30"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicators - Hidden on extra small devices to avoid clutter */}
      <div className="absolute bottom-12 left-6 sm:left-12 z-30 hidden sm:flex gap-3">
        {posters.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all duration-500 rounded-full ${i === current ? 'w-12 bg-gold' : 'w-4 bg-white/30'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
