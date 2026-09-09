"use client";

import { useState, useEffect } from "react";
import { Award, Timer, Users, Trophy, ChevronRight, ChevronLeft } from "lucide-react";

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
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={current.image_url}
          alt={current.title}
          className="w-full h-full object-cover object-center opacity-40 transition-opacity duration-1000 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs sm:text-sm font-bold tracking-wide uppercase mb-8 backdrop-blur-md">
          <Trophy className="w-4 h-4 text-amber-400" />
          {current.badge_text || "AKUATIK INDONESIA"}
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-tight">
          {current.title}
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
          {current.description}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={current.cta_primary_url || "#register"}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-sky-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            {current.cta_primary_text || "Daftar Lomba"}
            <ChevronRight className="w-5 h-5" />
          </a>

          <a
            href={current.cta_secondary_url || "/buku-acara"}
            className="w-full sm:w-auto px-8 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-sky-200 font-bold text-base rounded-2xl border border-sky-500/30 backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            {current.cta_secondary_text || "Buku Acara & Heat"}
          </a>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-sky-500/20 backdrop-blur-md">
            <Timer className="w-6 h-6 text-sky-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-white">25+</div>
            <div className="text-xs font-semibold text-slate-400">Nomor Lomba</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-sky-500/20 backdrop-blur-md">
            <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-white">130+</div>
            <div className="text-xs font-semibold text-slate-400">Perenang Terdaftar</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-sky-500/20 backdrop-blur-md">
            <Award className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-white">Medali</div>
            <div className="text-xs font-semibold text-slate-400">Emas, Perak, Perunggu</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-sky-500/20 backdrop-blur-md">
            <Trophy className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-white">50m</div>
            <div className="text-xs font-semibold text-slate-400">Standard Olympic Pool</div>
          </div>
        </div>
      </div>
    </section>
  );
}
