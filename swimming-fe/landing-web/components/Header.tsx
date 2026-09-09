"use client";

import Link from "next/link";
import { Waves, Calendar, FileText, CheckCircle, ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-sky-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/20 rounded-xl border border-sky-400/30 text-sky-400">
              <Waves className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">
                AKUATIK TANGERANG
              </span>
              <p className="text-xs text-sky-300/80 font-medium">TIME TRIAL CHAMPIONSHIP 2025</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold text-slate-200 hover:text-sky-400 transition-colors">
              Beranda
            </Link>
            <Link href="#events" className="text-sm font-semibold text-slate-200 hover:text-sky-400 transition-colors">
              Nomor Lomba
            </Link>
            <Link href="/starting-list" className="text-sm font-semibold text-slate-200 hover:text-sky-400 transition-colors flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-sky-400" />
              Starting List
            </Link>
            <Link href="/buku-acara" className="text-sm font-semibold text-slate-200 hover:text-sky-400 transition-colors flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-400" />
              Buku Acara
            </Link>
            <Link href="#status-check" className="text-sm font-semibold text-slate-200 hover:text-sky-400 transition-colors flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Cek Status
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#register"
              className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5"
            >
              Form Pendaftaran
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
