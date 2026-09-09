'use client';

import React, { useState, useEffect } from 'react';
import { PageSection } from '@/lib/api-client';
import {
  CheckCircle2,
  Award,
  Building2,
  Download,
  ShieldCheck,
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
  Users,
  Briefcase,
  UserCheck,
  Hourglass,
  BarChart3,
} from 'lucide-react';

interface AboutGovernanceProps {
  section?: PageSection;
}

export default function AboutGovernanceSection({ section }: AboutGovernanceProps) {
  const badgeText = section?.badge_text || 'PERUSAHAAN & TATA KELOLA';
  const title = section?.title || 'Melangkah Bersama Menuju Masa Depan';
  const description =
    section?.description ||
    'Berkomitmen pada transparansi, akuntabilitas, dan pelayanan prima sebagai bagian dari afiliasi global Mitsui & Co., Ltd.';

  // Modal State for Org Chart & Management Profiles Popup
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  // Modal State for Public PDF Reports Download Popup
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Parse JSON content payload if present
  let payload: any = {};
  if (section?.content_payload) {
    try {
      payload = JSON.parse(section.content_payload);
    } catch (e) {
      console.error('Failed to parse about_governance payload:', e);
    }
  }

  const vision =
    payload.vision ||
    '“Menjadi Perusahaan Pembiayaan Terdepan, Terpercaya, dan Terpilih di Indonesia dengan Layanan Digital Berkualitas serta Mengutamakan Kepuasan Pelanggan & Prinsip Tata Kelola Korporasi yang Baik (GCG).”';

  const missions =
    Array.isArray(payload.missions) && payload.missions.length > 0
      ? payload.missions
      : typeof payload.missions === 'string'
      ? payload.missions.split('\n').filter((m: string) => m.trim().length > 0)
      : [
          'Menyediakan fasilitas pembiayaan otomotif, kendaraan niaga, dan alat berat dengan proses cepat, transparan, dan kompetitif.',
          'Mengembangkan kemitraan strategis jangka panjang dengan Dealer, ATPM, dan seluruh pemangku kepentingan.',
          'Menerapkan prinsip kehati-hatian (Prudential Finance), Manajemen Risiko, dan Kepatuhan penuh terhadap OJK & APPI.',
        ];

  const stat1Value = payload.stat1_value || '30+';
  const stat1Label = payload.stat1_label || 'TAHUN PENGALAMAN';
  const stat2Value = payload.stat2_value || '15+';
  const stat2Label = payload.stat2_label || 'CABANG NASIONAL';

  const overview =
    payload.overview ||
    'PT Mitsui Leasing Capital Indonesia (MLCI) didirikan pada tahun 1992 sebagai perusahaan pembiayaan gabungan (joint venture) antara Mitsui & Co., Ltd., Jepang dengan mitra lokal terkemuka di Indonesia. Resmi berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK).';

  const legality =
    payload.legality ||
    'Keputusan Menteri Keuangan RI No. 1243/KMK.013/1992 & Izin Usaha OJK KEP-104/D.05/2014';

  const report1Title = payload.report1_title || 'Annual Report MLCI 2025';
  const report1PdfUrl = payload.report1_pdf_url || '';
  const report2Title = payload.report2_title || 'Sustainability Report (ESG) 2025';
  const report2PdfUrl = payload.report2_pdf_url || '';

  const milestones =
    Array.isArray(payload.milestones) && payload.milestones.length > 0
      ? payload.milestones
      : [
          { year: '1992', title: 'Pendirian PT Mitsui Leasing Capital Indonesia', desc: 'Menerima izin usaha pembiayaan resmi dari Menteri Keuangan RI No. 1243/KMK.013/1992 dan memulai operasional di Jakarta.' },
          { year: '2005', title: 'Ekspansi Pembiayaan Otomotif Ritel', desc: 'Memperluas portofolio pembiayaan ke pasar mobil penumpang ritel dan menjalin jaringan dealer resmi ATPM se-Jabodetabek.' },
          { year: '2015', title: 'Pembukaan Jaringan Kantor Cabang Nasional', desc: 'Membuka cabang di kota-kota besar Sumatera, Jawa, Bali, Kalimantan, dan Sulawesi untuk menjangkau seluruh nasabah Indonesia.' },
          { year: '2022', title: 'Transformasi Digital & Integrasi OJK', desc: 'Meluncurkan portal aplikasi kredit digital terpadu, sistem pembayaran Virtual Account, dan integrasi pelaporan SLIK OJK.' },
          { year: '2026', title: 'Pusat Layanan Terpadu & Portal Nasabah Swadaya 24/7', desc: 'Menghadirkan layanan customer care omnichannel, Whistleblowing System (mPower WBS), dan simulasi pembiayaan dinamis.' },
        ];

  const shareholders =
    Array.isArray(payload.shareholders) && payload.shareholders.length > 0
      ? payload.shareholders
      : [
          {
            name: payload.sh1_name || 'Mitsui & Co., Ltd. (Japan)',
            category: payload.sh1_role || 'Pemegang Saham Pengendali (PSP)',
            percentage: payload.sh1_pct || '80%',
            shares: '800.000 Lembar',
          },
          {
            name: payload.sh2_name || 'PT Triputra Investindo Arya',
            category: payload.sh2_role || 'Pemegang Saham Lokal',
            percentage: payload.sh2_pct || '20%',
            shares: '200.000 Lembar',
          },
        ];

  // DYNAMIC BOARD MEMBERS FROM CMS CARD 5
  const boardMembers =
    Array.isArray(payload.board_members) && payload.board_members.length > 0
      ? payload.board_members
      : [
          {
            name: 'Reiko Takahashi',
            title: 'Presiden Komisaris',
            category: 'Dewan Komisaris (BOC)',
            avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
            bio: 'Berpengalaman lebih dari 28 tahun di bidang perbankan ritel dan pembiayaan internasional di Sumitomo Mitsui Financial Group.',
          },
          {
            name: 'Mahdan, S.E., Ak., CA',
            title: 'Komisaris Independen',
            category: 'Dewan Komisaris (BOC)',
            avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
            bio: 'Pakar akuntansi dan tata kelola keuangan, memimpin Komite Audit & Risiko Mitsui Leasing Capital Indonesia.',
          },
          {
            name: 'Yasuaki Miyaoka',
            title: 'Presiden Direktur',
            category: 'Direksi (BOD)',
            avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
            bio: 'Memimpin strategi pertumbuhan korporasi, transformasi digital, dan ekspansi jaringan bisnis MLCI di Indonesia.',
          },
          {
            name: 'Takao Aoyama',
            title: 'Direktur Eksekutif',
            category: 'Direksi (BOD)',
            avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
            bio: 'Mengarahkan divisi bisnis pembiayaan komersial, investasi alat berat, dan kerja sama dealer resmi ATPM.',
          },
          {
            name: 'Denny Dilham',
            title: 'Direktur Eksekutif',
            category: 'Direksi (BOD)',
            avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
            bio: 'Mewadahi operasional pembiayaan konsumen ritel, manajemen risiko kredit, dan pengelolaan cabang nasional.',
          },
          {
            name: 'Arif Budiman',
            title: 'Direktur Finance & Compliance',
            category: 'Direksi (BOD)',
            avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
            bio: 'Mengawasi pengelolaan keuangan, perpajakan, treasury, kepatuhan OJK, dan Whistleblowing System (WBS).',
          },
        ];

  const commissioners = boardMembers.filter(
    (bm: any) => bm.category === 'Dewan Komisaris (BOC)' || bm.title?.toLowerCase().includes('komisaris')
  );
  const directors = boardMembers.filter(
    (bm: any) => bm.category === 'Direksi (BOD)' || bm.title?.toLowerCase().includes('direktur')
  );

  // DYNAMIC DEPARTMENTS FROM CMS CARD 6
  const departments =
    Array.isArray(payload.departments) && payload.departments.length > 0
      ? payload.departments
      : [
          {
            name: 'Retail Business Division',
            leaderTitle: 'Chief of Retail Business',
            subDepts: 'Retail Car Financing Business, Regional Branch Network',
          },
          {
            name: 'Credit & Collection Division',
            leaderTitle: 'Chief of Credit & Collection',
            subDepts: 'Retail Credit, Corporate & Commercial Credit, Credit Operation, Retail Collection & Recovery, Account Solution',
          },
          {
            name: 'Human Capital & CRM Division',
            leaderTitle: 'Chief of Human Capital & CRM',
            subDepts: 'Human Capital Strategy, Human Capital Operations, Customer Relationship Mgmt., Pool of Advisors',
          },
          {
            name: 'Corporate Transformation & IT',
            leaderTitle: 'Business Strategy and Transformation',
            subDepts: 'Information Technology, Corporate Secretary & Legal, Governance, Risk & Compliance',
          },
          {
            name: 'Finance, Tax & Procurement',
            leaderTitle: 'Finance, Accounting & Tax',
            subDepts: 'Corporate Planning & Performance Management, General Affairs & Procurement',
          },
        ];

  // DYNAMIC TOP LEVEL ORG CHART TITLES FROM CMS CARD 6
  const gmsTitle = payload.gms_title || 'General Meeting of Shareholders';
  const presDirTitle = payload.pres_dir_title || 'President Director';
  const bocTitle = payload.boc_title || 'Board of Commissioners';
  const bocCommitteesList =
    typeof payload.boc_committees === 'string'
      ? payload.boc_committees.split('\n').filter((s: string) => s.trim().length > 0)
      : Array.isArray(payload.boc_committees)
      ? payload.boc_committees
      : ['Audit Committee', 'Risk Monitoring Committee', 'Remuneration and Nomination'];
  const internalAuditTitle = payload.internal_audit_title || 'Internal Audit';

  // DYNAMIC SLIDER IMAGES FROM CMS CARD 7
  const officeImages =
    Array.isArray(payload.office_photos) && payload.office_photos.length > 0
      ? payload.office_photos.map((p: any) => ({
          title: p.caption || p.title || 'Kantor Perusahaan',
          url: p.url || p.imageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
        }))
      : [
          { title: 'Kantor Pusat & Eksekutif Suite', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop' },
          { title: 'Ruang Kolaborasi & Rapat Dewan Direksi', url: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=800&auto=format&fit=crop' },
          { title: 'Layanan Pelanggan & Jaringan Cabang Nasional', url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop' },
          { title: 'Gedung Perkantoran Modern & Berkelanjutan (ESG)', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop' },
        ];

  const [activePhoto, setActivePhoto] = useState(0);

  // Auto-sliding interval (5 seconds)
  useEffect(() => {
    if (officeImages.length <= 1) return;
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % officeImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [officeImages.length]);

  const handlePrevSlide = () => {
    setActivePhoto((prev) => (prev === 0 ? officeImages.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActivePhoto((prev) => (prev === officeImages.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = officeImages[activePhoto] || officeImages[0];

  return (
    <section id="perusahaan" className="py-16 bg-slate-50 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block bg-blue-100 text-[#0f285c] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {badgeText}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Top Grid: Interactive Photo Slider + Vision Mission & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Photo Slider Card (5 cols matching screenshot) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-4">
            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden group bg-slate-900">
              {/* Active Image */}
              <img
                src={currentSlide.url}
                alt={currentSlide.title}
                className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>

              {/* Left Chevron Button */}
              {officeImages.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
                  title="Foto Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Right Chevron Button */}
              {officeImages.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
                  title="Foto Selanjutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              {/* Caption & Counter Badge Bottom */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white text-xs font-semibold">
                <span className="drop-shadow-md truncate max-w-[240px]">
                  {currentSlide.title}
                </span>
                <span className="bg-black/70 px-2.5 py-0.5 rounded-lg text-[11px] font-black border border-white/10 shrink-0">
                  {activePhoto + 1} / {officeImages.length}
                </span>
              </div>
            </div>

            {/* Clickable Dot Pagination Controls + Subtitle matching user screenshot */}
            <div className="flex justify-between items-center px-1">
              <div className="flex space-x-2 items-center">
                {officeImages.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhoto(idx)}
                    title={`Pindah ke foto ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activePhoto ? 'bg-[#0f285c] w-6' : 'bg-slate-300 w-2.5 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs text-slate-500 font-semibold">
                Headquarters Lounge
              </div>
            </div>
          </div>

          {/* Vision, Mission & Stats Card (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-6 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-900 text-xs font-bold px-2.5 py-0.5 rounded">
                <Award className="w-3.5 h-3.5 text-blue-700" />
                <span>Visi & Misi Korporat</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">Visi Perusahaan</h3>
                <p className="text-slate-700 text-sm italic mt-1 bg-white p-3.5 rounded-xl border border-blue-100 shadow-xs leading-relaxed">
                  {vision}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Misi Utama Kami:</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {missions.map((m: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stat Counters */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
                <div className="text-3xl font-extrabold text-[#0f285c]">{stat1Value}</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{stat1Label}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
                <div className="text-3xl font-extrabold text-[#0f285c]">{stat2Value}</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{stat2Label}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sekilas Perusahaan & Legilitas Resmi Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Sekilas Perusahaan & Legalitas Resmi</h3>
            <p className="text-slate-600 text-xs mt-1 leading-relaxed">
              {overview}
            </p>
          </div>

          <div className="bg-blue-50/50 border border-blue-200/60 rounded-xl p-3.5 flex items-center space-x-3 text-xs text-blue-950 font-medium">
            <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
            <span>Legalitas & Pengawasan: {legality}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
            {/* Corporate Milestones matching user screenshot */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-sm mb-4">
                <Hourglass className="w-4 h-4 text-amber-500" />
                <span>Milestone & Perjalanan Korporasi</span>
              </div>
              <div className="relative pl-6 space-y-6 text-xs border-l-2 border-blue-500/80 ml-2">
                {milestones.map((m: any, idx: number) => (
                  <div key={idx} className="relative group">
                    {/* Small Blue Circle Node on line */}
                    <div className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white absolute -left-[31px] top-1 shadow-xs group-hover:scale-125 transition-transform"></div>

                    {/* Blue Year Badge Pill */}
                    <span className="bg-[#1d4ed8] text-white text-[10px] font-black px-2.5 py-0.5 rounded-md inline-block uppercase tracking-wider mb-1 shadow-xs">
                      {m.year || '1992'}
                    </span>

                    {/* Milestone Title */}
                    <h4 className="font-extrabold text-slate-900 text-xs leading-tight">
                      {m.title}
                    </h4>

                    {/* Milestone Description */}
                    <p className="text-slate-600 text-[11px] leading-relaxed mt-1">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shareholder Structure matching user screenshot */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-sm">
                <BarChart3 className="w-4 h-4 text-blue-700" />
                <span>Struktur Kepemilikan Saham</span>
              </div>

              <div className="space-y-3">
                {shareholders.map((s: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200 flex justify-between items-center space-x-4 shadow-2xs"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="font-extrabold text-slate-900 text-xs truncate">
                        {s.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {s.category || s.role || 'Pemegang Saham'}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-lg font-black text-[#1d4ed8]">
                        {s.percentage || `${s.pct}%`}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        {s.shares || (s.percentage === '80%' || s.percentage === '80' ? '800.000 Lembar' : '200.000 Lembar')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Trigger Org Modal Popup */}
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-2">
                  <div className="font-bold text-xs text-slate-900">Manajemen & GCG</div>
                  <p className="text-[11px] text-slate-600">Dewan Komisaris & Direksi menjunjung tinggi standar Good Corporate Governance.</p>
                  <button
                    type="button"
                    onClick={() => setIsOrgModalOpen(true)}
                    className="inline-flex items-center text-[11px] font-bold text-[#0f285c] hover:underline space-x-1 cursor-pointer"
                  >
                    <span>LIHAT PROFIL MANAJEMEN</span>
                    <span>→</span>
                  </button>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-2">
                  <div className="font-bold text-xs text-slate-900">Laporan Keuangan & Sustainability</div>
                  <p className="text-[11px] text-slate-600">Arsip publik Laporan Kinerja Keuangan (Annual Report) transparan.</p>
                  <button
                    type="button"
                    onClick={() => setIsReportModalOpen(true)}
                    className="inline-flex items-center text-[11px] font-bold text-[#0f285c] hover:underline space-x-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3 text-[#0f285c]" />
                    <span>UNDUH LAPORAN TERBARU</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL POPUP: STRUKTUR ORGANISASI & PROFIL MANAJEMEN (MATCHING USER SCREENSHOTS 1, 2, 3 100%) */}
      {/* ========================================================================= */}
      {isOrgModalOpen && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] text-slate-800 font-sans my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/80 shrink-0">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Struktur Organisasi</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Struktur Kepengurusan PT Mitsui Leasing Capital Indonesia
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOrgModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-200 text-slate-600 flex items-center justify-center transition border border-slate-200 shadow-xs cursor-pointer"
                title="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Content Body */}
            <div className="p-6 sm:p-8 space-y-10 overflow-y-auto flex-1">
              {/* PART A: FLOWCHART ORGANISASI (Matching Screenshots 1 & 2) */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-8 overflow-x-auto min-w-[760px] relative">
                {/* Background Watermark Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
                  <span className="text-6xl font-black tracking-widest text-slate-900 uppercase">MITSUI LEASING</span>
                </div>

                {/* Level 1: General Meeting of Shareholders */}
                <div className="text-center">
                  <div className="bg-[#1d4ed8] text-white px-8 py-3 rounded-xl font-extrabold text-xs shadow-md inline-block tracking-wide">
                    {gmsTitle}
                  </div>
                  <div className="w-0.5 h-6 bg-slate-300 mx-auto my-1"></div>
                </div>

                {/* Level 2: BOD & BOC Container */}
                <div className="grid grid-cols-12 gap-4 items-start relative">
                  {/* Left Center: Board of Director (BOD) Container (Dashed Border) */}
                  <div className="col-span-9 border-2 border-dashed border-slate-300 rounded-2xl p-5 space-y-4 relative bg-slate-50/40">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Board of Director (BOD)
                    </div>

                    {/* President Director Top Box */}
                    <div className="text-center">
                      <div className="bg-[#0a1633] text-white px-8 py-2.5 rounded-xl font-extrabold text-xs shadow-md inline-block">
                        {presDirTitle}
                      </div>
                      <div className="w-0.5 h-5 bg-slate-300 mx-auto my-1"></div>
                    </div>

                    {/* Directors Sub-Row */}
                    <div className="flex justify-center space-x-6 items-center flex-wrap gap-y-3">
                      <div className="bg-[#1d4ed8] text-white px-6 py-2 rounded-xl font-bold text-xs shadow-xs">
                        Executive Director
                      </div>
                      <div className="bg-[#1d4ed8] text-white px-6 py-2 rounded-xl font-bold text-xs shadow-xs">
                        Executive Director
                      </div>
                    </div>

                    <div className="text-center pt-1">
                      <div className="bg-[#1d4ed8] text-white px-8 py-2 rounded-xl font-bold text-xs shadow-xs inline-block">
                        Director
                      </div>
                    </div>
                  </div>

                  {/* Right Box: Board of Commissioners (Cyan Card matching Screenshot 2) */}
                  <div className="col-span-3 space-y-3">
                    <div className="bg-[#00b4d8] text-white p-4 rounded-2xl shadow-md space-y-2">
                      <div className="font-extrabold text-xs uppercase tracking-wider border-b border-white/20 pb-1.5">
                        {bocTitle}
                      </div>
                      <div className="text-[10px] space-y-1 leading-relaxed opacity-95">
                        <div className="font-bold">Committee under BOC:</div>
                        {bocCommitteesList.map((com: string, idx: number) => (
                          <div key={idx}>• {com}</div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-slate-300 text-slate-800 text-[11px] font-bold py-2 px-4 rounded-xl text-center shadow-xs">
                      {internalAuditTitle}
                    </div>
                  </div>
                </div>

                {/* Level 3: Board of Management (BOM) Container (Dashed Border) */}
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-5 space-y-4 bg-slate-50/40">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Board of Management (BOM)
                  </div>

                  {/* Dynamic Columns generated from departments List */}
                  <div className="grid grid-cols-5 gap-3 items-start">
                    {departments.map((dept: any, idx: number) => {
                      const subItems = typeof dept.subDepts === 'string'
                        ? dept.subDepts.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0)
                        : Array.isArray(dept.subDepts) ? dept.subDepts : [];

                      return (
                        <div key={idx} className="space-y-2.5">
                          {/* Chief / Department Title Box */}
                          <div className="bg-[#1d4ed8] text-white font-extrabold text-[11px] p-3 rounded-xl text-center shadow-xs min-h-[50px] flex items-center justify-center leading-snug">
                            {dept.leaderTitle || dept.name}
                          </div>

                          {/* Sub-departments List */}
                          <div className="space-y-2">
                            {subItems.map((sub: string, subIdx: number) => (
                              <div
                                key={subIdx}
                                className="bg-white border border-slate-300 text-slate-800 text-[10px] font-bold p-2.5 rounded-xl text-center shadow-2xs leading-snug min-h-[38px] flex items-center justify-center"
                              >
                                {sub}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* PART B: DEWAN KOMISARIS & DIREKSI PROFIL CARDS (Matching Screenshot 3) */}
              <div className="space-y-8 pt-2">
                {/* Dewan Komisaris (Board of Commissioners) */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-sm border-b border-slate-200 pb-2">
                    <ShieldCheck className="w-5 h-5 text-blue-700" />
                    <span>Dewan Komisaris (Board of Commissioners)</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {commissioners.map((bm: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex space-x-4 items-start"
                      >
                        <img
                          src={bm.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'}
                          alt={bm.name}
                          className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-200 shadow-xs"
                        />
                        <div className="space-y-1 min-w-0 flex-1">
                          <span className="inline-block bg-blue-100 text-blue-900 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                            {bm.title || 'KOMISARIS'}
                          </span>
                          <h4 className="text-sm font-extrabold text-slate-900 leading-tight">{bm.name}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1">
                            {bm.bio || 'Berpengalaman dan profesional di bidang kepemimpinan tata kelola korporasi.'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direksi (Board of Directors) */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-sm border-b border-slate-200 pb-2">
                    <Users className="w-5 h-5 text-blue-700" />
                    <span>Direksi (Board of Directors)</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {directors.map((bm: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex space-x-4 items-start"
                      >
                        <img
                          src={bm.avatarUrl || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'}
                          alt={bm.name}
                          className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-200 shadow-xs"
                        />
                        <div className="space-y-1 min-w-0 flex-1">
                          <span className="inline-block bg-emerald-100 text-emerald-900 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                            {bm.title || 'DIREKTUR'}
                          </span>
                          <h4 className="text-sm font-extrabold text-slate-900 leading-tight">{bm.name}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1">
                            {bm.bio || 'Memimpin strategi pertumbuhan korporasi dan operasional pembiayaan terpadu.'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setIsOrgModalOpen(false)}
                className="bg-[#0e1e45] hover:bg-[#11224f] text-white px-6 py-2.5 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer"
              >
                Tutup Bagan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL POPUP 2: UNDUH LAPORAN TERBARU (MATCHING USER SCREENSHOT 100%)       */}
      {/* ========================================================================= */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 animate-scaleUp">
            {/* Modal Header */}
            <div className="p-6 flex justify-between items-center border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">
                Unduh Laporan Terbaru
              </h3>
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
                title="Tutup Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <p className="text-slate-600 text-xs font-medium">
                Berikut adalah arsip dokumen publik perusahaan kami:
              </p>

              <div className="space-y-3">
                {/* Report Item 1 */}
                <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/90 flex items-center justify-between space-x-3">
                  <span className="font-extrabold text-slate-900 text-xs truncate">
                    {report1Title}
                  </span>
                  <a
                    href={report1PdfUrl || '#'}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!report1PdfUrl) {
                        e.preventDefault();
                        alert('File PDF belum diunggah dari Admin CMS.');
                      }
                    }}
                    className="bg-[#1d4ed8] hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs flex items-center space-x-1.5 shrink-0 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </a>
                </div>

                {/* Report Item 2 */}
                <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/90 flex items-center justify-between space-x-3">
                  <span className="font-extrabold text-slate-900 text-xs truncate">
                    {report2Title}
                  </span>
                  <a
                    href={report2PdfUrl || '#'}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!report2PdfUrl) {
                        e.preventDefault();
                        alert('File PDF belum diunggah dari Admin CMS.');
                      }
                    }}
                    className="bg-[#1d4ed8] hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs flex items-center space-x-1.5 shrink-0 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-slate-100 flex justify-end bg-slate-50/50">
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="bg-[#1e3a8a] hover:bg-[#0a1633] text-white font-extrabold text-xs px-6 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
