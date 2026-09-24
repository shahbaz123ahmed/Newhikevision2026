"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, PhoneCall, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

const posters = [
  {
    id: 1,
    image: '/herosection/Leading UAE.webp',
    tag: 'Official Platinum Distributor',
    title: 'LEADING UAE IN',
    subtitle: 'SECURITY',
    desc: 'The region\'s most trusted provider of Hikvision solutions, delivering cutting-edge surveillance for government and private sectors.',
    cta1: 'Our Solutions',
    cta2: 'Contact Sales',
    accent: 'maroon'
  },
  {
    id: 2,
    image: '/herosection/Smart cities.webp',
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
    image: '/herosection/Uncompremossied production.webp',
    tag: 'Premium Access Control',
    title: 'UNCOMPROMISED',
    subtitle: 'PROTECTION',
    desc: 'State-of-the-art biometric and facial recognition systems designed for the unique security needs of Dubai and Abu Dhabi.',
    cta1: 'View Products',
    cta2: 'Get Quote',
    accent: 'maroon'
  },
  {
    id: 4,
    image: '/herosection/thermal..webp',
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
    image: '/herosection/Smart Home..webp',
    tag: 'Intelligent Living',
    title: 'SMART HOMES',
    subtitle: 'FUTURE-READY',
    desc: 'Seamlessly integrating Hik-Connect ecosystems into modern UAE residences for ultimate control and peace of mind.',
    cta1: 'Smart Home',
    cta2: 'Visit Store',
    accent: 'maroon'
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative mt-[112px] sm:mt-[120px] md:mt-[120px] w-full overflow-hidden bg-[#0c0c0e] h-[72vh] min-h-[560px] max-h-[760px] sm:h-[82vh] md:h-[86vh] lg:h-[88vh] sm:min-h-[660px] md:min-h-[720px] sm:max-h-[960px]">
      {posters.map((poster, index) => {
        const isActive = index === current;
        return (
          <div
            key={poster.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              isActive
                ? 'opacity-100 translate-x-0 z-10'
                : index < current
                  ? 'opacity-0 -translate-x-full z-0 pointer-events-none'
                  : 'opacity-0 translate-x-full z-0 pointer-events-none'
            }`}
          >
            {/* BACKGROUND IMAGE - Full slide coverage */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={poster.image}
                alt={poster.title}
                fill
                sizes="100vw"
                className="object-cover object-[75%_center] sm:object-center transition-opacity duration-1000"
                priority={index === 0}
                quality={90}
              />
              {/* Partial shading around text for crisp visibility without darkening the rest of the image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:hidden" />
              <div className="hidden sm:block absolute inset-y-0 left-0 w-3/5 lg:w-1/2 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            </div>

            {/* CONTENT - Left-aligned directly over the image, pushed down on mobile */}
            <div className="relative h-full w-full max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12 lg:px-14 flex flex-col justify-end sm:justify-center items-start text-left pb-8 sm:pb-0">
              <div
                className={`max-w-xl lg:max-w-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] transition-all duration-700 ease-out ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                {/* Tag / Category */}
                <div className="inline-block text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] mb-2 sm:mb-3 text-maroon">
                  {poster.tag}
                </div>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2 sm:mb-4 leading-tight sm:leading-[1.05]">
                  {poster.title}{" "}
                  <span className="text-maroon">{poster.subtitle}</span>
                </h1>

                {/* Description */}
                <p className="text-xs sm:text-base md:text-lg text-gray-200 mb-5 sm:mb-8 leading-relaxed max-w-lg sm:max-w-xl">
                  {poster.desc}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-start gap-3 sm:gap-4 mb-2 sm:mb-0">
                  <Link
                    href="/products"
                    className="inline-flex justify-center items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xl bg-maroon text-white hover:bg-[#a01830] active:scale-95"
                  >
                    {poster.cta1}
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex justify-center items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold border border-white/20 backdrop-blur-xl text-white hover:bg-white/10 active:scale-95 transition-all"
                  >
                    {poster.cta2}
                    <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

        {/* Navigation Controls - Desktop Only */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={prevSlide}
            className="absolute right-[72px] lg:right-[120px] bottom-10 sm:bottom-12 w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all backdrop-blur-md z-30"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 sm:right-6 lg:right-12 bottom-10 sm:bottom-12 w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all backdrop-blur-md z-30"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Indicators - Bottom Middle on Mobile, Bottom Left on Desktop */}
        <div className="flex absolute bottom-3 sm:bottom-10 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-10 lg:left-16 xl:left-20 z-30 gap-1.5 sm:gap-3">
          {posters.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 transition-all duration-500 rounded-full ${
                i === current ? 'w-6 sm:w-12 bg-maroon' : 'w-2 sm:w-4 bg-white/30'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
    </section>
  );
}
