'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MasterMenu } from '@/lib/api-client';
import { ChevronDown, Menu, X, Globe, User, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  menus: MasterMenu[];
  logoUrl?: string;
}

export default function Header({ menus, logoUrl }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('ID');

  const defaultMenus = [
    { name: 'Beranda', url: '/' },
    { name: 'Perusahaan', url: '#perusahaan' },
    { name: 'Produk Pembiayaan', url: '#produk' },
    { name: 'Simulasi Kredit', url: '#simulasi' },
    { name: 'Cabang & Peta', url: '#cabang' },
    { name: 'Artikel & Promo', url: '#artikel' },
    { name: 'Layanan Digital', url: '#layanan' },
    { name: 'WBS / Pengaduan OJK', url: '#wbs' },
  ];

  const activeMenus = menus && menus.length > 0 ? menus : defaultMenus;

  const isImageLogo = logoUrl && (logoUrl.startsWith('http') || logoUrl.startsWith('/') || logoUrl.startsWith('data:'));

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 font-sans">
      {/* Top Bar */}
      <div className="bg-[#0b1b3d] text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-300">
            <span className="font-medium text-white">PT Mitsui Leasing Capital Indonesia (MLCI)</span>
            <span className="text-gray-500">•</span>
            <span>Afiliasi Mitsui & Co., Ltd.</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group cursor-pointer flex items-center space-x-1 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
              <Globe className="w-3 h-3 text-blue-400" />
              <span className="font-semibold text-white">{lang}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-[#0f285c] rounded-md flex items-center justify-center font-bold text-white text-xl shadow-md border border-blue-900 group-hover:bg-[#16387c] transition overflow-hidden">
            {isImageLogo ? (
              <img src={logoUrl} alt="Mitsui Leasing Logo" className="w-full h-full object-cover" />
            ) : (
              logoUrl || 'M'
            )}
          </div>
          <div className="leading-tight">
            <div className="font-extrabold text-[#0f285c] text-lg tracking-wider">
              MITSUI <span className="font-bold text-[#1e3a8a]">LEASING</span>
            </div>
            <div className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold">
              CAPITAL INDONESIA
            </div>
          </div>
        </Link>

        {/* Desktop Dynamic Master Navigation */}
        <nav className="hidden lg:flex items-center space-x-5 text-sm font-medium text-slate-700">
          {activeMenus.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              className="hover:text-[#0f285c] transition-colors py-1 relative group text-xs xl:text-sm font-medium"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0f285c] transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3 shadow-lg">
          {activeMenus.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-[#0f285c] border-b border-slate-50 text-sm"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
