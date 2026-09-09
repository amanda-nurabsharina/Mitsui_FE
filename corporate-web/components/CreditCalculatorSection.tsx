'use client';

import React, { useState } from 'react';
import { PageSection } from '@/lib/api-client';
import { Calculator, ArrowRight, ShieldCheck, Check, Car, Truck } from 'lucide-react';

interface CreditCalcProps {
  section?: PageSection;
}

// Default interest rate matrix
const DEFAULT_MATRIX_BARU: Record<string, { penumpang: number; komersial: number }> = {
  '12': { penumpang: 4.08, komersial: 5.21 },
  '24': { penumpang: 4.8, komersial: 5.8 },
  '36': { penumpang: 5.2, komersial: 6.21 },
  '48': { penumpang: 6.1, komersial: 7.23 },
  '60': { penumpang: 6.9, komersial: 8.0 },
};

const DEFAULT_MATRIX_BEKAS: Record<string, { penumpang: number; komersial: number }> = {
  '12': { penumpang: 7.1, komersial: 7.71 },
  '24': { penumpang: 7.73, komersial: 8.3 },
  '36': { penumpang: 8.0, komersial: 9.0 },
  '48': { penumpang: 8.73, komersial: 10.0 },
  '60': { penumpang: 9.5, komersial: 10.71 },
};

export default function CreditCalculatorSection({ section }: CreditCalcProps) {
  const badgeText = section?.badge_text || 'Suku Bunga Kompetitif & Sesuai Segmen';
  const title = section?.title || 'Kalkulator Simulasi Kredit Interaktif';
  const description =
    section?.description ||
    'Hitung perkiraan angsuran bulanan dan Uang Muka (DP) secara akurat sesuai suku bunga resmi MLCI.';

  // Parse CMS content payload if available
  let minDp = 20;
  let fallbackRate = 6.2;
  let matrixBaru = DEFAULT_MATRIX_BARU;
  let matrixBekas = DEFAULT_MATRIX_BEKAS;

  if (section?.content_payload) {
    try {
      const p = JSON.parse(section.content_payload);
      if (typeof p.min_dp === 'number') minDp = p.min_dp;
      if (typeof p.fallback_rate === 'number') fallbackRate = p.fallback_rate;
      if (p.matrix_baru) matrixBaru = { ...DEFAULT_MATRIX_BARU, ...p.matrix_baru };
      if (p.matrix_bekas) matrixBekas = { ...DEFAULT_MATRIX_BEKAS, ...p.matrix_bekas };
    } catch (e) {
      console.error('Failed to parse credit_calculator content_payload:', e);
    }
  }

  // Calculator State
  const [condition, setCondition] = useState<'baru' | 'bekas'>('baru');
  const [category, setCategory] = useState<'penumpang' | 'komersial'>('penumpang');
  const [price, setPrice] = useState<number>(300000000);
  const [dpPercent, setDpPercent] = useState<number>(minDp);
  const [tenure, setTenure] = useState<number>(36); // months

  // Lookup interest rate from dynamic matrix
  const getRateForTenor = (t: number, cond: 'baru' | 'bekas', cat: 'penumpang' | 'komersial'): number => {
    const targetMatrix = cond === 'baru' ? matrixBaru : matrixBekas;
    const row = targetMatrix[String(t)];
    if (row && typeof row[cat] === 'number') {
      return row[cat];
    }
    return fallbackRate;
  };

  const currentRatePercent = getRateForTenor(tenure, condition, category);
  const interestRatePerYear = currentRatePercent / 100;

  // Financial Calculations
  const effectiveDpPercent = Math.max(dpPercent, minDp);
  const dpAmount = (price * effectiveDpPercent) / 100;
  const loanPrincipal = Math.max(0, price - dpAmount);
  const totalInterest = loanPrincipal * interestRatePerYear * (tenure / 12);
  const totalLoan = loanPrincipal + totalInterest;
  const monthlyInstallment = Math.round(totalLoan / tenure);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="simulasi" className="py-16 bg-[#060f24] text-white font-sans border-t border-blue-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block bg-blue-900/80 text-blue-300 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider border border-blue-700/50">
            {badgeText}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Simulator Main Card */}
        <div className="bg-[#0b1739]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Kondisi Kendaraan & 2. Kategori Kendaraan Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Kondisi Kendaraan */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 tracking-wider">1. Kondisi Kendaraan</label>
                  <div className="grid grid-cols-2 gap-1.5 bg-[#060e26] p-1 rounded-2xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setCondition('baru')}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                        condition === 'baru'
                          ? 'bg-[#1d4ed8] text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Car className="w-3.5 h-3.5" />
                      <span className="truncate">Mobil Baru</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCondition('bekas')}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                        condition === 'bekas'
                          ? 'bg-[#1d4ed8] text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Car className="w-3.5 h-3.5" />
                      <span className="truncate">Mobil Bekas</span>
                    </button>
                  </div>
                </div>

                {/* 2. Kategori Kendaraan */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 tracking-wider">2. Kategori Kendaraan</label>
                  <div className="grid grid-cols-2 gap-1.5 bg-[#060e26] p-1 rounded-2xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setCategory('penumpang')}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                        category === 'penumpang'
                          ? 'bg-[#1d4ed8] text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Car className="w-3.5 h-3.5" />
                      <span className="truncate">Penumpang</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCategory('komersial')}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                        category === 'komersial'
                          ? 'bg-[#1d4ed8] text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span className="truncate">Komersial</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sub-label Parameter Suku Bunga Active Indicator */}
              <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800/80">
                <span className="text-slate-400">
                  Parameter Suku Bunga: <strong className="text-blue-300 uppercase">{condition === 'baru' ? 'Baru' : 'Bekas'} - {category === 'penumpang' ? 'Penumpang' : 'Komersial'}</strong>
                </span>
                <a href="#simulasi" className="text-blue-400 hover:underline text-[11px] font-medium">Lihat Matriks Suku Bunga</a>
              </div>

              {/* 3. Harga Kendaraan (OTR) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-300">3. Harga Kendaraan (OTR)</label>
                  <span className="font-black text-blue-400 text-sm">{formatIDR(price)}</span>
                </div>
                <input
                  type="range"
                  min={50000000}
                  max={2000000000}
                  step={10000000}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                  <span>Rp 50 Jt</span>
                  <span>Rp 1 Miliar</span>
                  <span>Rp 2 Miliar</span>
                </div>
              </div>

              {/* 4. Uang Muka (DP) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-300">
                    4. Uang Muka (DP) - {effectiveDpPercent}% (Min {minDp}%)
                  </label>
                  <span className="font-black text-blue-400 text-sm">{formatIDR(dpAmount)}</span>
                </div>
                <input
                  type="range"
                  min={minDp}
                  max={80}
                  step={5}
                  value={effectiveDpPercent}
                  onChange={(e) => setDpPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                  <span>Min {minDp}%</span>
                  <span>50%</span>
                  <span>80%</span>
                </div>
              </div>

              {/* 5. Pilih Jangka Waktu (Tenor) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-300">5. Pilih Jangka Waktu (Tenor)</label>
                  <span className="text-blue-400 font-semibold text-xs">Bunga: {currentRatePercent.toFixed(2)}% Flat p.a.</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[12, 24, 36, 48, 60].map((t) => {
                    const rateForThisTenor = getRateForTenor(t, condition, category);
                    const isSelected = tenure === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTenure(t)}
                        className={`py-3 px-1 rounded-2xl text-center border transition flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-[#1d4ed8] text-white border-blue-500 shadow-lg scale-[1.02]'
                            : 'bg-[#060e26] text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-black">{t} Bln</span>
                        <span className={`text-[10px] font-semibold mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                          {rateForThisTenor.toFixed(2)}%
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Output Box (5 cols - Matching Screenshot 2) */}
            <div className="lg:col-span-5 bg-[#060e26] border border-blue-900/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl relative">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-blue-900/60 pb-4">
                  <div className="text-xs font-bold text-slate-400 tracking-wider">HASIL SIMULASI</div>
                  <span className="bg-blue-950/80 text-blue-300 text-[10px] font-extrabold px-3 py-1 rounded-full border border-blue-800/80 uppercase">
                    {condition === 'baru' ? 'Baru' : 'Bekas'} • {category === 'penumpang' ? 'Penumpang' : 'Komersial'}
                  </span>
                </div>

                <div className="text-center py-2 border-b border-blue-900/60 pb-5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">ESTIMASI CICILAN / BULAN</div>
                  <div className="text-3xl sm:text-4xl font-black text-white mt-2 tracking-tight">
                    {formatIDR(monthlyInstallment)}
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pokok Hutang:</span>
                    <span className="font-bold text-white">{formatIDR(loanPrincipal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Uang Muka (DP):</span>
                    <span className="font-bold text-emerald-400">{formatIDR(dpAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Suku Bunga ({category === 'penumpang' ? 'Penumpang' : 'Komersial'}):</span>
                    <span className="font-bold text-white">{currentRatePercent.toFixed(2)}% Flat p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tenor:</span>
                    <span className="font-bold text-white">{tenure} Bulan ({tenure / 12} Tahun)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href="#ajukan"
                  className="w-full bg-[#1d4ed8] hover:bg-blue-600 text-white font-black py-3.5 rounded-2xl text-xs tracking-wider flex items-center justify-center space-x-2 transition shadow-lg shadow-blue-600/30"
                >
                  <span>AJUKAN BERDASARKAN SIMULASI INI →</span>
                </a>
                <p className="text-[10px] text-slate-400 text-center leading-normal">
                  *Perhitungan merupakan estimasi resmi yang dapat disesuaikan saat evaluasi kredit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

