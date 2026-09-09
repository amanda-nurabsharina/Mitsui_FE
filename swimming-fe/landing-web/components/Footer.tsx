import { Waves, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Waves className="w-6 h-6 text-sky-400" />
            <span className="text-base font-black text-white tracking-wider">AKUATIK TANGERANG</span>
          </div>
          <p className="leading-relaxed">
            Penyelenggara Resmi Kejuaraan Renang Time Trial 2025 Kota Tangerang. Mengembangkan potensi atlet renang Indonesia.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-3">Navigasi Utama</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-sky-400 transition-colors">Beranda</a></li>
            <li><a href="#events" className="hover:text-sky-400 transition-colors">Nomor Perlombaan</a></li>
            <li><a href="/starting-list" className="hover:text-sky-400 transition-colors">Starting List (Pendaftar)</a></li>
            <li><a href="/buku-acara" className="hover:text-sky-400 transition-colors">Buku Acara (Heat & Line)</a></li>
            <li><a href="#register" className="hover:text-sky-400 transition-colors">Form Pendaftaran</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-3">Kontak Panitia</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>0815-4620-6665 (Dherwina - ENSC)</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>0859-5476-1666 (Fajar - MASC)</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>info@akuatik-tangerang.id</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-3">Lokasi Arena</h4>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>Gelanggang Olahraga & Kolam Renang Standar Olympic, Kota Tangerang, Banten.</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-900 text-center text-[11px] text-slate-500">
        &copy; {new Date().getFullYear()} Akuatik Indonesia Kota Tangerang. All rights reserved.
      </div>
    </footer>
  );
}
