'use client';

import React, { useState, useEffect } from 'react';
import { BannerSlide } from '@/lib/api-client';
import { ChevronLeft, ChevronRight, ShieldCheck, Calculator, ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  banners: BannerSlide[];
}

export default function HeroBanner({ banners }: HeroBannerProps) {
  const defaultBanners: BannerSlide[] = [
    {
      id: 1,
      title: 'Pembiayaan Mobil Baru & Bekas Terpercaya',
      badge_text: 'PROMO MERDEKA • Berizin & Diawasi oleh OJK',
      description: 'Proses kilat dengan suku bunga rendah mulai 6.8% flat p.a. serta jaminan BPKB aman dan tersertifikasi OJK.',
      image_url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop',
      cta_primary_text: 'Simulasi Cicilan',
      cta_primary_url: '#simulasi',
      cta_secondary_text: 'Ajukan Pembiayaan Sekarang →',
      cta_secondary_url: '#ajukan',
      sort_order: 1,
      status: 'published',
    },
    {
      id: 2,
      title: 'Solusi Pembiayaan Fleet & Alat Berat Korporasi',
      badge_text: 'KORPORASI & BISNIS',
      description: 'Dukung pertumbuhan bisnis Anda dengan skema pembiayaan investasi dan modal kerja fleksibel.',
      image_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=1600&auto=format&fit=crop',
      cta_primary_text: 'Konsultasi Fleet',
      cta_primary_url: '#produk',
      cta_secondary_text: 'Unduh Profil Perusahaan',
      cta_secondary_url: '#perusahaan',
      sort_order: 2,
      status: 'published',
    },
  ];

  const slides = banners && banners.length > 0 ? banners : defaultBanners;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const activeSlide = slides[currentSlide] || slides[0];

  return (
    <section className="relative w-full h-[520px] lg:h-[580px] bg-slate-900 overflow-hidden font-sans">
      {/* Background Image Slider with Gradient Overlay */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id || idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.image_url}
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-105 transform transition-transform duration-10000"
          />
          {/* Dark Overlay Gradient matching reference screenshot */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07132b] via-[#07132b]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#07132b]/80 via-transparent to-[#07132b]/40"></div>
        </div>
      ))}

      {/* Slide Content Box */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-8 flex flex-col justify-end pb-16 lg:pb-20">
        <div className="max-w-2xl text-white space-y-4 animate-fade-in">
          {/* Sub-Badge */}
          {activeSlide.badge_text && (
            <div className="inline-flex items-center space-x-2 bg-blue-950/80 backdrop-blur border border-blue-500/40 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{activeSlide.badge_text}</span>
            </div>
          )}

          {/* Dynamic Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
            {activeSlide.title}
          </h1>

          {/* Dynamic Description */}
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl font-normal drop-shadow">
            {activeSlide.description}
          </p>

          {/* Dynamic Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-4 items-center">
            {activeSlide.cta_primary_text && (
              <a
                href={activeSlide.cta_primary_url || '#simulasi'}
                className="bg-[#1e40af] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-lg flex items-center space-x-2 transition shadow-lg hover:shadow-blue-500/30"
              >
                <Calculator className="w-4 h-4" />
                <span>{activeSlide.cta_primary_text}</span>
              </a>
            )}

            {activeSlide.cta_secondary_text && (
              <a
                href={activeSlide.cta_secondary_url || '#ajukan'}
                className="bg-white hover:bg-slate-100 text-[#0f285c] font-bold text-xs sm:text-sm px-6 py-3 rounded-lg flex items-center space-x-2 transition shadow-lg group"
              >
                <span>{activeSlide.cta_secondary_text}</span>
                <ArrowRight className="w-4 h-4 text-[#0f285c] group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Slider Controls / Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-2 bg-slate-950/60 backdrop-blur px-3 py-1.5 rounded-full border border-slate-700/50">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all rounded-full ${
              idx === currentSlide ? 'w-7 h-2 bg-blue-500' : 'w-2 h-2 bg-slate-400 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Next/Prev Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-slate-900/40 hover:bg-slate-900/80 text-white p-2.5 rounded-full border border-white/20 backdrop-blur transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-slate-900/40 hover:bg-slate-900/80 text-white p-2.5 rounded-full border border-white/20 backdrop-blur transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </section>
  );
}
