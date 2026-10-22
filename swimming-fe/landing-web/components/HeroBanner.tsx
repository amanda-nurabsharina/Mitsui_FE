"use client";

import { useState, useEffect } from "react";
import { Award, Timer, Users, Trophy, ChevronRight } from "lucide-react";

interface Banner {
  id: number;
  title: string;
  badge_text: string;
  description: string;
  image_url: string;
  cta_primary_text: string;
  cta_primary_url: string;
  cta_secondary_text: string;
  cta_secondary_url: string;
}

export default function HeroBanner({ banners }: { banners: Banner[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultBanners: Banner[] = [
    {
      id: 1,
      title: "KEJUARAAN RENANG TIME TRIAL 2025",
      badge_text: "AKUATIK INDONESIA KOTA TANGERANG",
      description: "Kompetisi renang resmi tingkat regional & nasional. Uji catatan waktu terbaik (seed time) dan raih medali prestasi kejuaraan!",
      image_url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1600&auto=format&fit=crop",
      cta_primary_text: "Daftar Lomba Now",
      cta_primary_url: "#register",
      cta_secondary_text: "Lihat Buku Acara",
      cta_secondary_url: "/buku-acara",
    },
  ];

  const activeBanners = banners && banners.length > 0 ? banners : defaultBanners;

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  const current = activeBanners[currentIndex];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={current.image_url || "/banner.jpg"}
          alt={current.title}
          className="w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/90 via-cyan-50/85 to-blue-100/90 backdrop-blur-[1px]" />
      </div>

      {/* Soft Background Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs sm:text-sm font-extrabold tracking-wide uppercase mb-8 shadow-sm">
          <Trophy className="w-4 h-4 text-amber-500" />
          {current.badge_text || "AKUATIK INDONESIA"}
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 max-w-5xl mx-auto leading-tight">
          {current.title}
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
          {current.description}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={current.cta_primary_url || "#register"}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-black text-base rounded-2xl shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            {current.cta_primary_text || "Daftar Lomba"}
            <ChevronRight className="w-5 h-5" />
          </a>

          <a
            href={current.cta_secondary_url || "/buku-acara"}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-base rounded-2xl border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            {current.cta_secondary_text || "Buku Acara & Heat"}
          </a>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-md">
            <Timer className="w-6 h-6 text-sky-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-slate-900">25+</div>
            <div className="text-xs font-bold text-slate-500">Nomor Lomba</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-cyan-100 shadow-md">
            <Users className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-slate-900">130+</div>
            <div className="text-xs font-bold text-slate-500">Perenang Terdaftar</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-amber-100 shadow-md">
            <Award className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <div className="text-2xl font-black text-slate-900">Medali</div>
            <div className="text-xs font-bold text-slate-500">Emas, Perak, Perunggu</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-md">
            <Trophy className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-slate-900">50m</div>
            <div className="text-xs font-bold text-slate-500">Standard Olympic Pool</div>
          </div>
        </div>
      </div>
    </section>
  );
}
