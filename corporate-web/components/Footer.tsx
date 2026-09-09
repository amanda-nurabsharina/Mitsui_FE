'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#040b1b] text-white font-sans text-xs border-t border-slate-900">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand & Address (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-[#0f285c] rounded flex items-center justify-center font-bold text-white text-lg">
              M
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-white text-base tracking-wider">
                MITSUI <span className="font-bold text-blue-400">LEASING</span>
              </div>
              <div className="text-[9px] tracking-widest text-slate-400 uppercase font-semibold">
                CAPITAL INDONESIA
              </div>
            </div>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed">
            PT Mitsui Leasing Capital Indonesia (MLCI) adalah perusahaan pembiayaan kendaraan penumpang, niaga, dan alat berat yang berizin dan diawasi resmi oleh Otoritas Jasa Keuangan (OJK).
          </p>

          <div className="space-y-2 text-slate-300 text-xs pt-1">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Head Office: Menara Mitsui, Lantai 18-20, Jl. M.H. Thamrin No. 9, Jakarta Pusat 10350</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Hotline Nasabah: (021) 3983-5000</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Email: customer.care@mitsui-leasing.co.id</span>
            </div>
          </div>
        </div>

        {/* Products Links (3 cols) */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider text-blue-300">Produk & Layanan</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#produk" className="hover:text-white transition">Pembiayaan Mobil Baru</a></li>
            <li><a href="#produk" className="hover:text-white transition">Pembiayaan Mobil Bekas</a></li>
            <li><a href="#produk" className="hover:text-white transition">Pembiayaan Investasi (Alat Berat)</a></li>
            <li><a href="#produk" className="hover:text-white transition">Pembiayaan Modal Kerja & Fleet</a></li>
            <li><a href="#simulasi" className="hover:text-white transition">Simulasi Cicilan Kredit</a></li>
          </ul>
        </div>

        {/* Tata Kelola Links (2 cols) */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider text-blue-300">Perusahaan</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#perusahaan" className="hover:text-white transition">Tentang MLCI</a></li>
            <li><a href="#perusahaan" className="hover:text-white transition">Visi & Misi</a></li>
            <li><a href="#perusahaan" className="hover:text-white transition">Dewan Manajemen & GCG</a></li>
            <li><a href="#perusahaan" className="hover:text-white transition">Laporan Keuangan</a></li>
            <li><a href="#artikel" className="hover:text-white transition">Artikel & Promo</a></li>
          </ul>
        </div>

        {/* Regulatory & OJK Badges (3 cols) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider text-blue-300">Regulasi & Keamanan</h4>
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>Terdaftar & Diawasi oleh OJK</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              PT Mitsui Leasing Capital Indonesia berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK) serta merupakan anggota aktif Asosiasi Perusahaan Pembiayaan Indonesia (APPI).
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-950 border-t border-slate-900/80 py-4 px-4 sm:px-8 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div>
            © 2026 PT Mitsui Leasing Capital Indonesia. All Rights Reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#privacy" className="hover:text-slate-300">Kebijakan Privasi</a>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-300">Syarat & Ketentuan</a>
            <span>•</span>
            <a href="#wbs" className="hover:text-slate-300">Whistleblowing System (WBS)</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
