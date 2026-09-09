'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  fetchAdminSections,
  updateAdminSection,
  fetchAdminBanners,
  createAdminBanner,
  updateAdminBanner,
  deleteAdminBanner,
  fetchAdminMenus,
  uploadAdminImage,
} from '@/lib/api-admin';
import {
  BarChart3,
  Users,
  FileText,
  ShieldCheck,
  Award,
  Settings,
  Headphones,
  Building2,
  Image as ImageIcon,
  BookOpen,
  Briefcase,
  UserCheck,
  LogOut,
  ChevronDown,
  Save,
  Edit3,
  Plus,
  Car,
  Truck,
  HardHat,
  Building,
  Upload,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
  Globe,
  Eye,
  EyeOff,
  Hourglass,
  PieChart,
  RotateCcw,
  Target,
  Landmark,
  Camera,
  FileCheck,
  Star,
  Zap,
  MapPin,
  ThumbsUp,
  Lock,
  Clock,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<any>(null);

  // Active sub-tab matching exact screenshot items
  const [activeTab, setActiveTab] = useState<
    | 'layanan'
    | 'cabang'
    | 'hero_banner'
    | 'artikel'
    | 'karir'
    | 'profil'
    | 'bunga'
    | 'master_menus'
    | 'logo_header'
    | 'prosedur'
    | 'nilai_utama'
  >('hero_banner');

  // Real backend data states
  const [sectionsMap, setSectionsMap] = useState<Record<string, any>>({});
  const [banners, setBanners] = useState<any[]>([]);
  const [menus, setMenus] = useState<any[]>([]);

  // Form states for Hero Banner (Direct Upload)
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerBadge, setBannerBadge] = useState('');
  const [bannerDesc, setBannerDesc] = useState('');
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [bannerCtaText, setBannerCtaText] = useState('Ajukan Sekarang');
  const [bannerCtaLink, setBannerCtaLink] = useState('#simulasi');
  const [bannerStatus, setBannerStatus] = useState('published');
  const [bannerSortOrder, setBannerSortOrder] = useState<number>(1);
  const [editingBannerId, setEditingBannerId] = useState<number | null>(null);

  // Form states for Section Editor
  const [currentSectionCode, setCurrentSectionCode] = useState<string>('about_governance');
  const [badgeText, setBadgeText] = useState('');
  const [titleText, setTitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');

  // Karir HR States (Section: career_opportunities)
  const [careerBadge, setCareerBadge] = useState('PELUANG KARIR');
  const [careerTitle, setCareerTitle] = useState('Tumbuh Bersama Mitsui Leasing');
  const [careerDesc, setCareerDesc] = useState(
    'Bergabunglah bersama kami dan jadilah bagian dari institusi keuangan terkemuka yang terus berinovasi.'
  );
  const [jobsList, setJobsList] = useState<any[]>([
    {
      id: 1,
      title: 'Enterprise Risk Specialist',
      department: 'Risk & Compliance',
      date: '2026-08-15',
      status: 'OPEN',
      requirements: [
        "Bachelor's degree in Economics/Accounting/Finance/Statistics.",
        'Minimum 3 years experience in the financial industry.',
      ],
    },
    {
      id: 2,
      title: 'Branch Sales Manager',
      department: 'Sales',
      date: '2026-08-16',
      status: 'OPEN',
      requirements: [
        'Minimal S1 semua jurusan.',
        'Pengalaman sales otomotif 5 tahun.',
        'Memiliki network dealer yang luas.',
      ],
    },
  ]);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDept, setNewJobDept] = useState('Marketing');
  const [newJobReqsText, setNewJobReqsText] = useState('');

  // -------------------------------------------------------------
  // PROFIL KORPORAT & GCG FULL FORM STATES (Matching All User Screenshots 100%)
  // -------------------------------------------------------------
  // 1. Ikhtisar & Legalitas OJK
  const [logoUrl, setLogoUrl] = useState('');
  const [overviewText, setOverviewText] = useState(
    'PT Mitsui Leasing Capital Indonesia (MLCI) didirikan pada tahun 1992 sebagai perusahaan pembiayaan gabungan (joint venture) antara Mitsui & Co., Ltd., Jepang dengan mitra lokal terkemuka di Indonesia. Resmi berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK), MLCI menyediakan solusi pembiayaan investasi, pembiayaan modal kerja, dan pembiayaan multiguna untuk kendaraan bermotor (mobil baru & bekas), armada niaga/truk, serta alat berat industri.'
  );
  const [ojkLicense, setOjkLicense] = useState(
    'Keputusan Menteri Keuangan RI No. 1243/KMK.013/1992 & Izin Usaha OJK KEP-104/D.05/2014'
  );
  const [paidUpCapital, setPaidUpCapital] = useState(
    'Rp 250.000.000.000,- (Dua Ratus Lima Puluh Miliar Rupiah)'
  );
  const [authorizedCapital, setAuthorizedCapital] = useState(
    'Rp 500.000.000.000,- (Lima Ratus Miliar Rupiah)'
  );

  // 2. Visi & Misi Korporasi
  const [visionText, setVisionText] = useState(
    'Menjadi Perusahaan Pembiayaan Terdepan, Terpercaya, dan Terpilih di Indonesia dengan Layanan Digital Berkualitas serta Mengutamakan Kepuasan Pelanggan & Prinsip Tata Kelola Korporasi yang Baik (GCG).'
  );
  const [missionsText, setMissionsText] = useState(
    'Menyediakan fasilitas pembiayaan otomotif, kendaraan niaga, dan alat berat dengan proses cepat, transparan, dan kompetitif.\nMengembangkan kemitraan strategis jangka panjang dengan Dealer, ATPM, dan seluruh pemangku kepentingan.\nMenerapkan prinsip kehati-hatian (Prudential Finance), Manajemen Risiko, dan Kepatuhan penuh terhadap OJK & APPI.\nMeningkatkan kapabilitas Sumber Daya Manusia dan teknologi informasi untuk memberikan pengalaman digital terbaik.'
  );
  const [stat1Value, setStat1Value] = useState('30+');
  const [stat1Label, setStat1Label] = useState('TAHUN PENGALAMAN');
  const [stat2Value, setStat2Value] = useState('15+');
  const [stat2Label, setStat2Label] = useState('CABANG NASIONAL');

  // 3. Sejarah & Milestone Perusahaan
  const [milestonesList, setMilestonesList] = useState<any[]>([
    {
      id: 1,
      year: '1992',
      title: 'Pendirian PT Mitsui Leasing Capital Indonesia',
      desc: 'Menerima izin usaha pembiayaan resmi dari Menteri Keuangan RI No. 1243/KMK.013/1992 dan memulai operasional di Jakarta.',
    },
    {
      id: 2,
      year: '2005',
      title: 'Ekspansi Pembiayaan Otomotif Ritel',
      desc: 'Memperluas portofolio pembiayaan ke pasar mobil penumpang ritel dan menjalin jaringan dealer resmi ATPM se-Jabodetabek.',
    },
    {
      id: 3,
      year: '2015',
      title: 'Pembukaan Jaringan Kantor Cabang Nasional',
      desc: 'Membuka cabang di kota-kota besar Sumatera, Jawa, Bali, Kalimantan, dan Sulawesi untuk menjangkau seluruh nasabah Indonesia.',
    },
    {
      id: 4,
      year: '2022',
      title: 'Transformasi Digital & Integrasi OJK',
      desc: 'Meluncurkan portal aplikasi kredit digital terpadu, sistem pembayaran Virtual Account, dan integrasi pelaporan SLIK OJK.',
    },
    {
      id: 5,
      year: '2026',
      title: 'Pusat Layanan Terpadu & Portal Nasabah Swadaya 24/7',
      desc: 'Menghadirkan layanan customer care omnichannel, Whistleblowing System (mPower WBS), dan simulasi pembiayaan dinamis.',
    },
  ]);

  // 4. Struktur Pemegang Saham
  const [shareholdersList, setShareholdersList] = useState<any[]>([
    {
      id: 1,
      name: 'Mitsui & Co., Ltd. (Japan)',
      percentage: '80',
      category: 'Pemegang Saham Pengendali (PSP)',
    },
    {
      id: 2,
      name: 'PT Triputra Investindo Arya',
      percentage: '20',
      category: 'Pemegang Saham Lokal',
    },
  ]);

  // 5. Manajemen Foto & Anggota Dewan Direksi / Komisaris
  const [boardMembersList, setBoardMembersList] = useState<any[]>([
    {
      id: 1,
      name: 'Reiko Takahashi',
      title: 'Presiden Komisaris',
      category: 'Dewan Komisaris (BOC)',
      avatarUrl:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      bio: 'Berpengalaman lebih dari 28 tahun di bidang perbankan ritel dan pembiayaan internasional di Sumitomo Mitsui Financial Group.',
    },
    {
      id: 2,
      name: 'Mahdan, S.E., Ak., CA',
      title: 'Komisaris Independen',
      category: 'Dewan Komisaris (BOC)',
      avatarUrl:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
      bio: 'Pakar akuntansi dan tata kelola keuangan, memimpin Komite Audit & Risiko Mitsui Leasing Capital Indonesia.',
    },
    {
      id: 3,
      name: 'Yasuaki Miyaoka',
      title: 'Presiden Direktur',
      category: 'Direksi (BOD)',
      avatarUrl:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
      bio: 'Memimpin strategi pertumbuhan korporasi, transformasi digital, dan ekspansi jaringan bisnis MLCI di Indonesia.',
    },
    {
      id: 4,
      name: 'Takao Aoyama',
      title: 'Direktur Eksekutif',
      category: 'Direksi (BOD)',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      bio: 'Mengarahkan divisi bisnis pembiayaan komersial, investasi alat berat, dan kerja sama dealer resmi ATPM.',
    },
    {
      id: 5,
      name: 'Denny Dilham',
      title: 'Direktur Eksekutif',
      category: 'Direksi (BOD)',
      avatarUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      bio: 'Mewadahi operasional pembiayaan konsumen ritel, manajemen risiko kredit, dan pengelolaan cabang nasional.',
    },
    {
      id: 6,
      name: 'Arif Budiman',
      title: 'Direktur Finance & Compliance',
      category: 'Direksi (BOD)',
      avatarUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      bio: 'Mengawasi pengelolaan keuangan, perpajakan, treasury, kepatuhan OJK, dan Whistleblowing System (WBS).',
    },
  ]);

  // 6. Struktur Organisasi & Flowchart Departemen
  const [departmentsList, setDepartmentsList] = useState<any[]>([
    {
      id: 1,
      name: 'Retail Business Division',
      leaderTitle: 'Chief of Retail Business',
      subDepts:
        'Retail Car Financing Business, Regional Branch Network, Dealer Relationship',
    },
    {
      id: 2,
      name: 'Credit & Collection Division',
      leaderTitle: 'Chief of Credit & Collection',
      subDepts:
        'Retail Credit Underwriting, Corporate & Commercial Credit, Credit Operation, Retail Collection & Recovery',
    },
    {
      id: 3,
      name: 'Human Capital & CRM Division',
      leaderTitle: 'Chief of Human Capital & CRM',
      subDepts:
        'Human Capital Strategy & Operations, Customer Relationship Management, Training Academy',
    },
    {
      id: 4,
      name: 'Corporate Transformation & IT',
      leaderTitle: 'Chief Technology Officer',
      subDepts:
        'Business Strategy & Transformation, Information Technology, Corporate Secretary & Legal, Governance, Risk & Compliance',
    },
    {
      id: 5,
      name: 'Finance, Tax & Procurement',
      leaderTitle: 'Chief Financial Officer',
      subDepts:
        'Finance, Accounting & Tax, Corporate Planning & Performance Management, General Affairs & Procurement',
    },
  ]);

  // Top Level Flowchart Customization States
  const [gmsTitle, setGmsTitle] = useState('General Meeting of Shareholders');
  const [presDirTitle, setPresDirTitle] = useState('President Director');
  const [bocTitle, setBocTitle] = useState('Board of Commissioners');
  const [bocCommittees, setBocCommittees] = useState('Audit Committee\nRisk Monitoring Committee\nRemuneration and Nomination');
  const [internalAuditTitle, setInternalAuditTitle] = useState('Internal Audit');

  // 7. Slider Foto Perusahaan
  const [officePhotosList, setOfficePhotosList] = useState<any[]>([
    {
      id: 1,
      caption: 'Kantor Pusat & Eksekutif Suite',
      url:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 2,
      caption: 'Ruang Kolaborasi & Rapat Dewan Direksi',
      url:
        'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 3,
      caption: 'Layanan Pelanggan & Jaringan Cabang Nasional',
      url:
        'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 4,
      caption: 'Gedung Perkantoran Modern & Berkelanjutan (ESG)',
      url:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    },
  ]);

  // 8. Public PDF Reports (Arsip Laporan Keuangan & Keberlanjutan)
  const [report1Title, setReport1Title] = useState('Annual Report MLCI 2025');
  const [report1PdfUrl, setReport1PdfUrl] = useState('');
  const [report2Title, setReport2Title] = useState('Sustainability Report (ESG) 2025');
  const [report2PdfUrl, setReport2PdfUrl] = useState('');

  // 9. Layanan & Produk Pembiayaan Form States (Section: products_services)
  const [retailTitle, setRetailTitle] = useState('Pembiayaan Konsumen (Retail)');
  const [retailBadge, setRetailBadge] = useState('Individu / Perorangan');
  const [retailDesc, setRetailDesc] = useState(
    'Fasilitas pembiayaan khusus untuk kepemilikan kendaraan roda empat bagi individu dengan suku bunga kompetitif dan tenor fleksibel yang disesuaikan dengan kapasitas finansial Anda.'
  );
  const [retailItem1Title, setRetailItem1Title] = useState('Pembiayaan Mobil Baru');
  const [retailItem1Desc, setRetailItem1Desc] = useState(
    'Bekerja sama dengan dealer resmi (ATPM) berbagai merk terkemuka di Indonesia.'
  );
  const [retailItem2Title, setRetailItem2Title] = useState('Pembiayaan Mobil Bekas');
  const [retailItem2Desc, setRetailItem2Desc] = useState(
    'Solusi cerdas untuk mendapatkan mobil idaman dari showroom terpercaya pilihan Anda.'
  );
  const [retailCtaText, setRetailCtaText] = useState('AJUKAN PEMBIAYAAN RETAIL');
  const [retailCtaUrl, setRetailCtaUrl] = useState('#simulasi');

  const [corpTitle, setCorpTitle] = useState('Pembiayaan Korporasi (Commercial)');
  const [corpBadge, setCorpBadge] = useState('Badan Usaha / Komersial');
  const [corpDesc, setCorpDesc] = useState(
    'Solusi pembiayaan produktif yang ditujukan untuk badan usaha. Kami mendukung ekspansi bisnis Anda melalui skema investasi, modal kerja, maupun fleet kendaraan operasional.'
  );
  const [corpItem1Title, setCorpItem1Title] = useState('Pembiayaan Investasi');
  const [corpItem1Desc, setCorpItem1Desc] = useState(
    'Pembelian barang modal seperti Alat Berat (Excavator, Bulldozer) dan Mesin Industri manufaktur.'
  );
  const [corpItem2Title, setCorpItem2Title] = useState('Pembiayaan Modal Kerja & Fleet');
  const [corpItem2Desc, setCorpItem2Desc] = useState(
    'Fasilitas Sale & Leaseback serta pembiayaan armada kendaraan komersial (Truk, Pickup, Minibus).'
  );
  const [corpCtaText, setCorpCtaText] = useState('AJUKAN PEMBIAYAAN KORPORAT');
  const [corpCtaUrl, setCorpCtaUrl] = useState('#ajukan-korporat');

  // 9.5 Prosedur Pembiayaan Form States (Section: procedure_steps)
  const [prosedurBadge, setProsedurBadge] = useState('TRANSPARAN & MUDAH');
  const [prosedurTitle, setProsedurTitle] = useState('Bagaimana Prosedur Pembiayaannya?');
  const [prosedurDesc, setProsedurDesc] = useState(
    'Kemudahan pengajuan kredit dalam 4 langkah terstruktur yang mengedepankan prinsip kehati-hatian.'
  );
  const [prosedurStepsList, setProsedurStepsList] = useState<any[]>([
    {
      id: 1,
      num: '1',
      icon: 'FileEdit',
      title: 'Pengajuan',
      desc: 'Pengisian data pengajuan melalui website ini atau kantor cabang terdekat.',
    },
    {
      id: 2,
      num: '2',
      icon: 'ShieldCheck',
      title: 'e-KYC & Verified',
      desc: 'Proses verifikasi dokumen, identitas, dan data finansial secara aman.',
    },
    {
      id: 3,
      num: '3',
      icon: 'FileCheck',
      title: 'Analisa Kredit',
      desc: 'Tim analis menilai permohonan kredit berdasarkan prinsip kehati-hatian.',
    },
    {
      id: 4,
      num: '4',
      icon: 'CheckCircle',
      title: 'Pencairan',
      desc: 'Persetujuan fasilitas dan pencairan dana ke pihak dealer/penjual.',
    },
  ]);

  // 9.6 Nilai Utama Kami Form States (Section: value_propositions)
  const [valuePropsBadge, setValuePropsBadge] = useState('NILAI UTAMA KAMI');
  const [valuePropsTitle, setValuePropsTitle] = useState('Mengapa Memilih Mitsui Leasing?');
  const [valuePropsDesc, setValuePropsDesc] = useState(
    'Keunggulan kami sebagai mitra finansial terpercaya untuk kebutuhan personal dan bisnis Anda.'
  );
  const [valuePropsItemsList, setValuePropsItemsList] = useState<any[]>([
    {
      id: 1,
      icon: 'ShieldCheck',
      title: 'Terdaftar di OJK',
      desc: 'Resmi berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK).',
    },
    {
      id: 2,
      icon: 'FileText',
      title: 'Syarat Mudah',
      desc: 'Persyaratan dokumen yang fleksibel dengan bantuan konsultan finansial.',
    },
    {
      id: 3,
      icon: 'Zap',
      title: 'Proses Cepat',
      desc: 'Persetujuan kredit kilat dengan estimasi keputusan instan.',
    },
    {
      id: 4,
      icon: 'MapPin',
      title: 'Jaringan Luas',
      desc: 'Didukung jaringan cabang dan mitra dealer otomotif resmi nasional.',
    },
  ]);

  // 9.7 Parameter Suku Bunga & DP Form States (Section: credit_calculator)
  const [calcBadge, setCalcBadge] = useState('Suku Bunga Kompetitif & Sesuai Segmen');
  const [calcTitle, setCalcTitle] = useState('Kalkulator Simulasi Kredit Interaktif');
  const [calcDesc, setCalcDesc] = useState(
    'Hitung perkiraan angsuran bulanan dan Uang Muka (DP) secara akurat sesuai suku bunga resmi MLCI.'
  );
  const [minDp, setMinDp] = useState<number>(20);
  const [fallbackRate, setFallbackRate] = useState<number>(6.2);
  const [matrixBaru, setMatrixBaru] = useState<Record<string, { penumpang: number; komersial: number }>>({
    '12': { penumpang: 4.08, komersial: 5.21 },
    '24': { penumpang: 4.8, komersial: 5.8 },
    '36': { penumpang: 5.2, komersial: 6.21 },
    '48': { penumpang: 6.1, komersial: 7.23 },
    '60': { penumpang: 6.9, komersial: 8.0 },
  });
  const [matrixBekas, setMatrixBekas] = useState<Record<string, { penumpang: number; komersial: number }>>({
    '12': { penumpang: 7.1, komersial: 7.71 },
    '24': { penumpang: 7.73, komersial: 8.3 },
    '36': { penumpang: 8.0, komersial: 9.0 },
    '48': { penumpang: 8.73, komersial: 10.0 },
    '60': { penumpang: 9.5, komersial: 10.71 },
  });

  // 10. Artikel & Tips States
  const [articlesList, setArticlesList] = useState<any[]>([
    {
      id: 1,
      title: 'Promo Spesial Kemerdekaan: Bunga Super Ringan 6.8% Flat p.a.',
      category: 'Promo',
      excerpt: 'Nikmati penawaran bunga paling kompetitif tahun ini khusus untuk kendaraan penumpang dan komersial.',
      content: 'Dalam rangka menyambut Hari Kemerdekaan RI, PT Mitsui Leasing Capital Indonesia menghadirkan promo suku bunga istimewa mulai dari 6.8% flat per tahun. Dapatkan kemudahan proses persetujuan cepat dan bonus perlindungan asuransi komprehensif.',
      coverUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=300',
      author: 'Tim Marketing MLCI',
      readTime: '3 min baca',
      status: 'PUBLISHED',
      tags: 'Promo, Kemerdekaan, Bunga Ringan',
      date: '2026-08-10',
    },
    {
      id: 2,
      title: '5 Tips Efektif Merawat Armada Truk dan Niaga di Musim Hujan',
      category: 'Tips & Trik',
      excerpt: 'Pastikan rantai pasokan logistik bisnis Anda lancar tanpa kendala. Berikut adalah panduan teknis perawatan rutin...',
      content: 'Musim hujan menghadirkan tantangan tersendiri bagi operasional kendaraan niaga dan komersial. Pemeriksaan rem, kondisi ban, serta kelistrikan wajib dilakukan berkala agar kendaraan bebas mogok.',
      coverUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=300',
      author: 'Divisi Fleet Management',
      readTime: '4 min baca',
      status: 'PUBLISHED',
      tags: 'Tips & Trik, Kendaraan Niaga, Perawatan',
      date: '2026-08-12',
    },
    {
      id: 3,
      title: 'Edukasi OJK: Cara Cerdas Menghitung Kemampuan Cicilan Kendaraan',
      category: 'Edukasi Finansial',
      excerpt: 'Pahami rasio Debt Service Ratio (DSR) ideal agar cicilan pembiayaan kendaraan tidak mengganggu arus kas bisnis Anda.',
      content: 'Prinsip tata kelola keuangan yang sehat menganjurkan total angsuran bulanan tidak melebihi 30% hingga 35% dari pendapatan bersih bulanan. Artikel ini mengupas simulasi lengkap perhitungan DSR.',
      coverUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300',
      author: 'Compliance & Literasi Keuangan',
      readTime: '5 min baca',
      status: 'PUBLISHED',
      tags: 'Edukasi Finansial, Simulasi Kredit, OJK',
      date: '2026-08-14',
    },
  ]);

  const [editingArticleId, setEditingArticleId] = useState<number | null>(1);
  const [artTitle, setArtTitle] = useState('Promo Spesial Kemerdekaan: Bunga Super Ringan 6.8% Flat p.a.');
  const [artCategory, setArtCategory] = useState('Promo');
  const [artExcerpt, setArtExcerpt] = useState('Nikmati penawaran bunga paling kompetitif tahun ini khusus untuk kendaraan penumpang baru, berlaku hingga akhir bulan Agustus 2026.');
  const [artContent, setArtContent] = useState(`Dapatkan fasilitas pembiayaan spesial dari PT Mitsui Leasing Capital Indonesia dalam rangka memeriahkan bulan kemerdekaan. Kami menghadirkan program suku bunga mulai dari 6.8% flat per tahun dengan uang muka ringan mulai 20%.

Keunggulan Program:
1. Proses persetujuan kilat via digital onboarding (e-KYC).
2. Bebas biaya provisi untuk 100 pengajuan pertama.
3. Perlindungan asuransi All Risk komprehensif selama tenor pembiayaan.`);
  const [artCoverUrl, setArtCoverUrl] = useState('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop');
  const [artAuthor, setArtAuthor] = useState('Tim Marketing MLCI');
  const [artReadTime, setArtReadTime] = useState('3 min baca');
  const [artStatus, setArtStatus] = useState('PUBLISHED');
  const [artTags, setArtTags] = useState('Promo, Mobil Baru, Bunga Rendah');

  // Uploading & Status states
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('cms_token');
    const storedUser = localStorage.getItem('cms_user');

    if (!storedToken) {
      router.push('/login');
      return;
    }

    setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));

    loadAllData(storedToken);
  }, [router]);

  const checkUnauthorized = (res: any) => {
    if (!res) return false;
    const msg = (res.message || '').toLowerCase();
    if (
      msg.includes('unauthorized') ||
      msg.includes('expired') ||
      msg.includes('invalid') ||
      msg.includes('jwt') ||
      res.error === 'Unauthorized'
    ) {
      localStorage.removeItem('cms_token');
      localStorage.removeItem('cms_user');
      router.push('/login?expired=1');
      return true;
    }
    return false;
  };

  const loadAllData = async (tok: string) => {
    try {
      // 1. Load Sections
      const secJson = await fetchAdminSections(tok);
      if (checkUnauthorized(secJson)) return;
      if (secJson.success && Array.isArray(secJson.data)) {
        const secMap: Record<string, any> = {};
        secJson.data.forEach((s: any) => {
          secMap[s.section_code] = s;
        });
        setSectionsMap(secMap);
        if (secMap['about_governance']) {
          selectSectionForm('about_governance', secMap['about_governance']);
        }
        if (secMap['articles_news']) {
          selectSectionForm('articles_news', secMap['articles_news']);
        }
        if (secMap['procedure_steps']) {
          selectSectionForm('procedure_steps', secMap['procedure_steps']);
        }
        if (secMap['value_propositions']) {
          selectSectionForm('value_propositions', secMap['value_propositions']);
        }
        if (secMap['credit_calculator']) {
          selectSectionForm('credit_calculator', secMap['credit_calculator']);
        }
        if (secMap['career_opportunities']) {
          selectSectionForm('career_opportunities', secMap['career_opportunities']);
        }
      }

      // 2. Load Banners
      const banJson = await fetchAdminBanners(tok);
      if (checkUnauthorized(banJson)) return;
      if (banJson.success && Array.isArray(banJson.data)) {
        setBanners(banJson.data);
      }

      // 3. Load Menus
      const menuJson = await fetchAdminMenus(tok);
      if (checkUnauthorized(menuJson)) return;
      if (menuJson.success && Array.isArray(menuJson.data)) {
        setMenus(menuJson.data);
      }
    } catch (err) {
      console.error('Failed to fetch CMS data:', err);
    }
  };

  const selectSectionForm = (code: string, secObj?: any) => {
    setCurrentSectionCode(code);
    const obj = secObj || sectionsMap[code];
    if (obj) {
      setBadgeText(obj.badge_text || '');
      setTitleText(obj.title || '');
      setDescriptionText(obj.description || '');

      // Parse JSON content payload for Profil Korporat
      if (code === 'about_governance' && obj.content_payload) {
        try {
          const p = JSON.parse(obj.content_payload);
          if (p.logo_url) setLogoUrl(p.logo_url);
          if (p.overview) setOverviewText(p.overview);
          if (p.ojk_license) setOjkLicense(p.ojk_license);
          if (p.paid_up_capital) setPaidUpCapital(p.paid_up_capital);
          if (p.authorized_capital) setAuthorizedCapital(p.authorized_capital);

          if (p.vision) setVisionText(p.vision);
          if (p.missions) setMissionsText(p.missions);

          if (p.stat1_value) setStat1Value(p.stat1_value);
          if (p.stat1_label) setStat1Label(p.stat1_label);
          if (p.stat2_value) setStat2Value(p.stat2_value);
          if (p.stat2_label) setStat2Label(p.stat2_label);

          if (p.gms_title) setGmsTitle(p.gms_title);
          if (p.pres_dir_title) setPresDirTitle(p.pres_dir_title);
          if (p.boc_title) setBocTitle(p.boc_title);
          if (p.boc_committees) setBocCommittees(p.boc_committees);
          if (p.internal_audit_title) setInternalAuditTitle(p.internal_audit_title);

          if (p.report1_title) setReport1Title(p.report1_title);
          if (p.report1_pdf_url) setReport1PdfUrl(p.report1_pdf_url);
          if (p.report2_title) setReport2Title(p.report2_title);
          if (p.report2_pdf_url) setReport2PdfUrl(p.report2_pdf_url);

          if (Array.isArray(p.milestones) && p.milestones.length > 0) {
            setMilestonesList(p.milestones);
          }
          if (Array.isArray(p.shareholders) && p.shareholders.length > 0) {
            setShareholdersList(p.shareholders);
          }
          if (Array.isArray(p.board_members) && p.board_members.length > 0) {
            setBoardMembersList(p.board_members);
          }
          if (Array.isArray(p.departments) && p.departments.length > 0) {
            setDepartmentsList(p.departments);
          }
          if (Array.isArray(p.office_photos) && p.office_photos.length > 0) {
            setOfficePhotosList(p.office_photos);
          }
        } catch (e) {
          console.error('Failed to parse about_governance payload in dashboard:', e);
        }
      }

      if (code === 'articles_news' && obj.content_payload) {
        try {
          const p = JSON.parse(obj.content_payload);
          if (Array.isArray(p.articles) && p.articles.length > 0) {
            setArticlesList(p.articles);
          }
        } catch (e) {
          console.error('Failed to parse articles_news payload in dashboard:', e);
        }
      }

      if (code === 'products_services' && obj.content_payload) {
        try {
          const p = JSON.parse(obj.content_payload);
          if (p.retail) {
            if (p.retail.title) setRetailTitle(p.retail.title);
            if (p.retail.badge) setRetailBadge(p.retail.badge);
            if (p.retail.description) setRetailDesc(p.retail.description);
            if (p.retail.item1_title) setRetailItem1Title(p.retail.item1_title);
            if (p.retail.item1_desc) setRetailItem1Desc(p.retail.item1_desc);
            if (p.retail.item2_title) setRetailItem2Title(p.retail.item2_title);
            if (p.retail.item2_desc) setRetailItem2Desc(p.retail.item2_desc);
            if (p.retail.cta_text) setRetailCtaText(p.retail.cta_text);
            if (p.retail.cta_url) setRetailCtaUrl(p.retail.cta_url);
          }
          if (p.corporate) {
            if (p.corporate.title) setCorpTitle(p.corporate.title);
            if (p.corporate.badge) setCorpBadge(p.corporate.badge);
            if (p.corporate.description) setCorpDesc(p.corporate.description);
            if (p.corporate.item1_title) setCorpItem1Title(p.corporate.item1_title);
            if (p.corporate.item1_desc) setCorpItem1Desc(p.corporate.item1_desc);
            if (p.corporate.item2_title) setCorpItem2Title(p.corporate.item2_title);
            if (p.corporate.item2_desc) setCorpItem2Desc(p.corporate.item2_desc);
            if (p.corporate.cta_text) setCorpCtaText(p.corporate.cta_text);
            if (p.corporate.cta_url) setCorpCtaUrl(p.corporate.cta_url);
          }
        } catch (e) {
          console.error('Failed to parse products_services payload in dashboard:', e);
        }
      }

      if (code === 'procedure_steps' && obj) {
        if (obj.badge_text) setProsedurBadge(obj.badge_text);
        if (obj.title) setProsedurTitle(obj.title);
        if (obj.description) setProsedurDesc(obj.description);
        if (obj.content_payload) {
          try {
            const p = JSON.parse(obj.content_payload);
            if (Array.isArray(p.steps) && p.steps.length > 0) {
              setProsedurStepsList(p.steps);
            }
          } catch (e) {
            console.error('Failed to parse procedure_steps payload in dashboard:', e);
          }
        }
      }

      if (code === 'value_propositions' && obj) {
        if (obj.badge_text) setValuePropsBadge(obj.badge_text);
        if (obj.title) setValuePropsTitle(obj.title);
        if (obj.description) setValuePropsDesc(obj.description);
        if (obj.content_payload) {
          try {
            const p = JSON.parse(obj.content_payload);
            if (Array.isArray(p.items) && p.items.length > 0) {
              setValuePropsItemsList(p.items);
            }
          } catch (e) {
            console.error('Failed to parse value_propositions payload in dashboard:', e);
          }
        }
      }

      if (code === 'credit_calculator' && obj) {
        if (obj.badge_text) setCalcBadge(obj.badge_text);
        if (obj.title) setCalcTitle(obj.title);
        if (obj.description) setCalcDesc(obj.description);
        if (obj.content_payload) {
          try {
            const p = JSON.parse(obj.content_payload);
            if (typeof p.min_dp === 'number') setMinDp(p.min_dp);
            if (typeof p.fallback_rate === 'number') setFallbackRate(p.fallback_rate);
            if (p.matrix_baru) setMatrixBaru(p.matrix_baru);
            if (p.matrix_bekas) setMatrixBekas(p.matrix_bekas);
          } catch (e) {
            console.error('Failed to parse credit_calculator payload in dashboard:', e);
          }
        }
      }

      if (code === 'career_opportunities' && obj) {
        if (obj.badge_text) setCareerBadge(obj.badge_text);
        if (obj.title) setCareerTitle(obj.title);
        if (obj.description) setCareerDesc(obj.description);
        if (obj.content_payload) {
          try {
            const p = JSON.parse(obj.content_payload);
            if (Array.isArray(p.jobs)) setJobsList(p.jobs);
          } catch (e) {
            console.error('Failed to parse career_opportunities payload in dashboard:', e);
          }
        }
      }
    }
  };

  // Handlers for Matrix Suku Bunga & DP Form
  const handleMatrixChange = (
    conditionType: 'baru' | 'bekas',
    tenor: string,
    cat: 'penumpang' | 'komersial',
    val: number
  ) => {
    if (conditionType === 'baru') {
      setMatrixBaru((prev) => ({
        ...prev,
        [tenor]: {
          ...(prev[tenor] || { penumpang: 0, komersial: 0 }),
          [cat]: val,
        },
      }));
    } else {
      setMatrixBekas((prev) => ({
        ...prev,
        [tenor]: {
          ...(prev[tenor] || { penumpang: 0, komersial: 0 }),
          [cat]: val,
        },
      }));
    }
  };

  const handleResetMatrixStandard = () => {
    setMinDp(20);
    setFallbackRate(6.2);
    setMatrixBaru({
      '12': { penumpang: 4.08, komersial: 5.21 },
      '24': { penumpang: 4.8, komersial: 5.8 },
      '36': { penumpang: 5.2, komersial: 6.21 },
      '48': { penumpang: 6.1, komersial: 7.23 },
      '60': { penumpang: 6.9, komersial: 8.0 },
    });
    setMatrixBekas({
      '12': { penumpang: 7.1, komersial: 7.71 },
      '24': { penumpang: 7.73, komersial: 8.3 },
      '36': { penumpang: 8.0, komersial: 9.0 },
      '48': { penumpang: 8.73, komersial: 10.0 },
      '60': { penumpang: 9.5, komersial: 10.71 },
    });
    setStatusMessage('Matriks Suku Bunga berhasil dikembalikan ke standar resmi Mitsui Leasing!');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  // Handlers for Karir HR Jobs Form
  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim()) {
      setErrorMessage('Posisi pekerjaan wajib diisi!');
      return;
    }
    const reqs = newJobReqsText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const todayStr = new Date().toISOString().substring(0, 10);
    const newJob = {
      id: Date.now(),
      title: newJobTitle,
      department: newJobDept,
      date: todayStr,
      status: 'OPEN',
      requirements: reqs.length > 0 ? reqs : ['Minimal S1 semua jurusan.'],
    };

    const updatedJobs = [newJob, ...jobsList];
    setJobsList(updatedJobs);
    setNewJobTitle('');
    setNewJobReqsText('');
    setLoading(true);

    try {
      const payloadObj = { jobs: updatedJobs };
      const res = await updateAdminSection(token, {
        page_slug: 'homepage',
        section_code: 'career_opportunities',
        badge_text: careerBadge,
        title: careerTitle,
        description: careerDesc,
        content_payload: JSON.stringify(payloadObj),
        is_published: true,
      });

      if (checkUnauthorized(res)) return;

      if (res.success) {
        setStatusMessage(`Lowongan "${newJobTitle}" berhasil diposting & disimpan ke PostgreSQL!`);
        await loadAllData(token);
        setTimeout(() => setStatusMessage(''), 3500);
      } else {
        setErrorMessage(`Gagal menyimpan: ${res.message}`);
      }
    } catch (err) {
      setErrorMessage('Gagal terhubung ke server database.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleJobStatus = async (id: number) => {
    const updatedJobs = jobsList.map((j) =>
      j.id === id ? { ...j, status: j.status === 'OPEN' ? 'CLOSED' : 'OPEN' } : j
    );
    setJobsList(updatedJobs);
    setLoading(true);

    try {
      const payloadObj = { jobs: updatedJobs };
      const res = await updateAdminSection(token, {
        page_slug: 'homepage',
        section_code: 'career_opportunities',
        badge_text: careerBadge,
        title: careerTitle,
        description: careerDesc,
        content_payload: JSON.stringify(payloadObj),
        is_published: true,
      });

      if (checkUnauthorized(res)) return;

      if (res.success) {
        setStatusMessage('Status lowongan kerja berhasil diperbarui!');
        await loadAllData(token);
        setTimeout(() => setStatusMessage(''), 3000);
      } else {
        setErrorMessage(`Gagal memperbarui: ${res.message}`);
      }
    } catch (err) {
      setErrorMessage('Gagal terhubung ke server database.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus lowongan pekerjaan ini?')) {
      const updatedJobs = jobsList.filter((j) => j.id !== id);
      setJobsList(updatedJobs);
      setLoading(true);

      try {
        const payloadObj = { jobs: updatedJobs };
        const res = await updateAdminSection(token, {
          page_slug: 'homepage',
          section_code: 'career_opportunities',
          badge_text: careerBadge,
          title: careerTitle,
          description: careerDesc,
          content_payload: JSON.stringify(payloadObj),
          is_published: true,
        });

        if (checkUnauthorized(res)) return;

        if (res.success) {
          setStatusMessage('Lowongan berhasil dihapus dari database.');
          await loadAllData(token);
          setTimeout(() => setStatusMessage(''), 3000);
        } else {
          setErrorMessage(`Gagal menghapus: ${res.message}`);
        }
      } catch (err) {
        setErrorMessage('Gagal terhubung ke server database.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Handlers for Nilai Utama Kami (Value Propositions) Form
  const handleAddValuePropItem = () => {
    setValuePropsItemsList((prev) => [
      ...prev,
      {
        id: Date.now(),
        icon: 'ShieldCheck',
        title: 'Keunggulan Baru',
        desc: 'Deskripsi keunggulan atau fitur unggulan MLCI...',
      },
    ]);
  };

  const handleDeleteValuePropItem = (id: number) => {
    setValuePropsItemsList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateValuePropItem = (id: number, field: string, value: string) => {
    setValuePropsItemsList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Handlers for Prosedur Pembiayaan Steps Form
  const handleAddProsedurStep = () => {
    setProsedurStepsList((prev) => [
      ...prev,
      {
        id: Date.now(),
        num: String(prev.length + 1),
        icon: 'FileCheck',
        title: 'Langkah Baru Pembiayaan',
        desc: 'Deskripsi pengajuan atau verifikasi dokumen...',
      },
    ]);
  };

  const handleDeleteProsedurStep = (id: number) => {
    setProsedurStepsList((prev) => prev.filter((s) => s.id !== id));
  };

  const handleUpdateProsedurStep = (id: number, field: string, value: string) => {
    setProsedurStepsList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  // Handlers for Dynamic Lists in Profil Korporat Form
  const handleAddMilestone = () => {
    setMilestonesList((prev) => [
      ...prev,
      {
        id: Date.now(),
        year: '2026',
        title: 'Milestone Baru Perusahaan',
        desc: 'Deskripsi pencapaian atau proyek strategis baru...',
      },
    ]);
  };

  const handleDeleteMilestone = (id: number) => {
    setMilestonesList((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUpdateMilestone = (id: number, field: string, value: string) => {
    setMilestonesList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleAddShareholder = () => {
    setShareholdersList((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: 'Entitas Saham Baru',
        percentage: '10',
        category: 'Pemegang Saham',
      },
    ]);
  };

  const handleDeleteShareholder = (id: number) => {
    setShareholdersList((prev) => prev.filter((s) => s.id !== id));
  };

  const handleUpdateShareholder = (id: number, field: string, value: string) => {
    setShareholdersList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleAddBoardMember = () => {
    setBoardMembersList((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: 'Nama Pengurus Baru',
        title: 'Jabatan Baru',
        category: 'Direksi (BOD)',
        avatarUrl:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      },
    ]);
  };

  const handleDeleteBoardMember = (id: number) => {
    setBoardMembersList((prev) => prev.filter((b) => b.id !== id));
  };

  const handleUpdateBoardMember = (id: number, field: string, value: string) => {
    setBoardMembersList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  const handleAddDepartment = () => {
    setDepartmentsList((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: 'Divisi / Departemen Baru',
        leaderTitle: 'Chief Title / Head of Division',
        subDepts: 'Sub-Departemen / Bagian Terkait',
      },
    ]);
  };

  const handleDeleteDepartment = (id: number) => {
    setDepartmentsList((prev) => prev.filter((d) => d.id !== id));
  };

  const handleUpdateDepartment = (id: number, field: string, value: string) => {
    setDepartmentsList((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const handleAddOfficePhoto = () => {
    setOfficePhotosList((prev) => [
      ...prev,
      {
        id: Date.now(),
        caption: 'Foto Kantor Perusahaan Baru',
        url:
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      },
    ]);
  };

  const handleDeleteOfficePhoto = (id: number) => {
    setOfficePhotosList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdateOfficePhoto = (id: number, field: string, value: string) => {
    setOfficePhotosList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // Direct File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMessage('');
    setStatusMessage('Mengunggah gambar...');

    try {
      const res = await uploadAdminImage(token, file);
      if (checkUnauthorized(res)) return;

      if (res.success && res.data?.url) {
        setBannerImageUrl(res.data.url);
        setStatusMessage('Gambar banner berhasil diunggah!');
        setTimeout(() => setStatusMessage(''), 3000);
      } else {
        setErrorMessage(`Gagal mengunggah: ${res.message || 'Error Server'}`);
      }
    } catch (err) {
      setErrorMessage('Gagal mengunggah file gambar ke server.');
    } finally {
      setUploading(false);
    }
  };

  const handleBoardMemberFileUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMessage('');
    setStatusMessage('Mengunggah foto profil pengurus...');

    try {
      const res = await uploadAdminImage(token, file);
      if (checkUnauthorized(res)) return;

      if (res.success && res.data?.url) {
        handleUpdateBoardMember(id, 'avatarUrl', res.data.url);
        setStatusMessage('Foto profil pengurus berhasil diunggah!');
        setTimeout(() => setStatusMessage(''), 3000);
      } else {
        setErrorMessage(`Gagal mengunggah foto: ${res.message || 'Error Server'}`);
      }
    } catch (err) {
      setErrorMessage('Gagal mengunggah file foto pengurus ke server.');
    } finally {
      setUploading(false);
    }
  };

  const handleOfficePhotoFileUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMessage('');
    setStatusMessage('Mengunggah foto slider kantor...');

    try {
      const res = await uploadAdminImage(token, file);
      if (checkUnauthorized(res)) return;

      if (res.success && res.data?.url) {
        handleUpdateOfficePhoto(id, 'url', res.data.url);
        setStatusMessage('Foto slider kantor berhasil diunggah!');
        setTimeout(() => setStatusMessage(''), 3000);
      } else {
        setErrorMessage(`Gagal mengunggah foto: ${res.message || 'Error Server'}`);
      }
    } catch (err) {
      setErrorMessage('Gagal mengunggah file foto slider ke server.');
    } finally {
      setUploading(false);
    }
  };

  const handlePdfFileUpload = async (reportNum: 1 | 2, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setErrorMessage('Hanya file dokumen format PDF (.pdf) yang diperbolehkan!');
      return;
    }

    setUploading(true);
    setErrorMessage('');
    setStatusMessage(`Mengunggah file PDF Laporan ${reportNum}...`);

    try {
      const res = await uploadAdminImage(token, file);
      if (checkUnauthorized(res)) return;

      if (res.success && res.data?.url) {
        if (reportNum === 1) {
          setReport1PdfUrl(res.data.url);
        } else {
          setReport2PdfUrl(res.data.url);
        }
        setStatusMessage(`File PDF Laporan ${reportNum} berhasil diunggah!`);
        setTimeout(() => setStatusMessage(''), 3000);
      } else {
        setErrorMessage(`Gagal mengunggah PDF: ${res.message || 'Error Server'}`);
      }
    } catch (err) {
      setErrorMessage('Gagal mengunggah file PDF laporan ke server.');
    } finally {
      setUploading(false);
    }
  };

  const handleArticleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMessage('');
    setStatusMessage('Mengunggah gambar foto cover artikel...');

    try {
      const res = await uploadAdminImage(token, file);
      if (checkUnauthorized(res)) return;

      if (res.success && res.data?.url) {
        setArtCoverUrl(res.data.url);
        setStatusMessage('Foto cover artikel berhasil diunggah!');
        setTimeout(() => setStatusMessage(''), 3000);
      } else {
        setErrorMessage(`Gagal mengunggah gambar: ${res.message || 'Error Server'}`);
      }
    } catch (err) {
      setErrorMessage('Gagal mengunggah file foto cover ke server.');
    } finally {
      setUploading(false);
    }
  };

  const handleLogoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMessage('');
    setStatusMessage('Mengunggah gambar logo icon...');

    try {
      const res = await uploadAdminImage(token, file);
      if (checkUnauthorized(res)) return;

      if (res.success && res.data?.url) {
        setLogoUrl(res.data.url);
        setStatusMessage('Logo icon berhasil diunggah!');
        setTimeout(() => setStatusMessage(''), 3000);
      } else {
        setErrorMessage(`Gagal mengunggah gambar: ${res.message || 'Error Server'}`);
      }
    } catch (err) {
      setErrorMessage('Gagal mengunggah file logo ke server.');
    } finally {
      setUploading(false);
    }
  };

  const resetArticleForm = () => {
    setEditingArticleId(null);
    setArtTitle('');
    setArtCategory('Tips & Trik');
    setArtExcerpt('');
    setArtContent('');
    setArtCoverUrl('');
    setArtAuthor('Divisi Marketing & Fleet');
    setArtReadTime('3 min baca');
    setArtStatus('PUBLISHED');
    setArtTags('Tips & Trik, Kendaraan Niaga, Perawatan');
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle.trim()) {
      setErrorMessage('Judul artikel wajib diisi!');
      return;
    }

    const todayStr = new Date().toISOString().substring(0, 10);
    const newArticle = {
      id: editingArticleId || Date.now(),
      title: artTitle,
      category: artCategory,
      badge_text: artCategory.toUpperCase(),
      excerpt: artExcerpt || artTitle,
      content: artContent,
      coverUrl: artCoverUrl || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=300',
      thumbnail_url: artCoverUrl || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=300',
      author: artAuthor || 'Tim Redaksi MLCI',
      author_name: artAuthor || 'Tim Redaksi MLCI',
      readTime: artReadTime || '3 min baca',
      read_time: artReadTime || '3 min baca',
      status: artStatus,
      tags: artTags,
      date: todayStr,
      published_at: todayStr,
    };

    const updatedList = editingArticleId
      ? articlesList.map((a) => (a.id === editingArticleId ? newArticle : a))
      : [newArticle, ...articlesList];

    setArticlesList(updatedList);
    setLoading(true);

    try {
      const payloadObj = {
        articles: updatedList,
      };
      const res = await updateAdminSection(token, {
        page_slug: 'homepage',
        section_code: 'articles_news',
        badge_text: 'PUSAT INFORMASI, EDUKASI & PROMO',
        title: 'Artikel, Tips & Trik Otomotif Terkini',
        description: 'Dapatkan panduan finansial dari OJK, tips perawatan armada bisnis dan mobil keluarga, serta informasi promo kredit suku bunga rendah.',
        content_payload: JSON.stringify(payloadObj),
        is_published: true,
      });

      if (checkUnauthorized(res)) return;

      if (res.success) {
        setStatusMessage(
          editingArticleId
            ? `Artikel "${artTitle}" berhasil diperbarui & disimpan ke PostgreSQL!`
            : `Artikel "${artTitle}" berhasil dipublikasikan & disimpan ke PostgreSQL!`
        );
        await loadAllData(token);
        resetArticleForm();
        setTimeout(() => setStatusMessage(''), 4000);
      } else {
        setErrorMessage(`Gagal menyimpan ke database: ${res.message}`);
      }
    } catch (err) {
      setErrorMessage('Gagal terhubung ke backend server.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditArticle = (item: any) => {
    setEditingArticleId(item.id);
    setArtTitle(item.title);
    setArtCategory(item.category || item.badge_text || 'Tips & Trik');
    setArtExcerpt(item.excerpt || '');
    setArtContent(item.content || '');
    setArtCoverUrl(item.coverUrl || item.thumbnail_url || '');
    setArtAuthor(item.author || item.author_name || 'Tim Redaksi MLCI');
    setArtReadTime(item.readTime || item.read_time || '3 min baca');
    setArtStatus(item.status || 'PUBLISHED');
    setArtTags(Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '');
  };

  const handleDeleteArticle = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      const updatedList = articlesList.filter((a) => a.id !== id);
      setArticlesList(updatedList);
      setLoading(true);

      try {
        const payloadObj = {
          articles: updatedList,
        };
        const res = await updateAdminSection(token, {
          page_slug: 'homepage',
          section_code: 'articles_news',
          badge_text: 'PUSAT INFORMASI, EDUKASI & PROMO',
          title: 'Artikel, Tips & Trik Otomotif Terkini',
          description: 'Dapatkan panduan finansial dari OJK, tips perawatan armada bisnis dan mobil keluarga, serta informasi promo kredit suku bunga rendah.',
          content_payload: JSON.stringify(payloadObj),
          is_published: true,
        });

        if (checkUnauthorized(res)) return;

        if (res.success) {
          setStatusMessage('Artikel berhasil dihapus & tersimpan di database.');
          await loadAllData(token);
          setTimeout(() => setStatusMessage(''), 3000);
        } else {
          setErrorMessage(`Gagal menghapus: ${res.message}`);
        }
      } catch (err) {
        setErrorMessage('Gagal terhubung ke backend server.');
      } finally {
        setLoading(false);
      }
    }
  };

  const applyPresetImage = (url: string) => {
    setBannerImageUrl(url);
  };

  // Interactive Status Toggle Handler (Published <-> Draft)
  const handleToggleBannerStatus = async (b: any) => {
    const newStatus = b.status === 'published' ? 'draft' : 'published';
    setLoading(true);
    setStatusMessage('');
    setErrorMessage('');

    try {
      const res = await updateAdminBanner(token, b.id, {
        title: b.title,
        badge_text: b.badge_text,
        description: b.description,
        image_url: b.image_url,
        cta_primary_text: b.cta_primary_text,
        cta_primary_url: b.cta_primary_url,
        cta_secondary_text: b.cta_secondary_text,
        cta_secondary_url: b.cta_secondary_url,
        sort_order: b.sort_order,
        status: newStatus,
      });

      if (checkUnauthorized(res)) return;

      if (res.success) {
        setStatusMessage(
          newStatus === 'published'
            ? `Banner #${b.id} Berhasil DIAKTIFKAN & Tayang di Landing Page!`
            : `Banner #${b.id} Berhasil DINONAKTIFKAN (Draft).`
        );
        await loadAllData(token);
        setTimeout(() => setStatusMessage(''), 3500);
      } else {
        setErrorMessage(`Gagal mengubah status: ${res.message}`);
      }
    } catch (err) {
      setErrorMessage('Gagal terhubung ke backend server.');
    } finally {
      setLoading(false);
    }
  };

  // Save Banner Form
  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerImageUrl) {
      setErrorMessage('Silakan unggah file gambar banner terlebih dahulu.');
      return;
    }

    setLoading(true);
    setStatusMessage('');
    setErrorMessage('');

    try {
      const payload = {
        title: bannerTitle || 'Pembiayaan Mobil Baru & Bekas Terpercaya',
        badge_text: bannerBadge || 'PROMO MERDEKA',
        description: bannerBadge || 'Proses kilat dengan suku bunga rendah...',
        image_url: bannerImageUrl,
        cta_primary_text: bannerCtaText || 'Simulasi Cicilan',
        cta_primary_url: bannerCtaLink || '#simulasi',
        cta_secondary_text: 'Ajukan Pembiayaan',
        cta_secondary_url: '#ajukan',
        sort_order: Number(bannerSortOrder),
        status: bannerStatus === 'published' ? 'published' : 'draft',
      };

      let res;
      if (editingBannerId) {
        res = await updateAdminBanner(token, editingBannerId, payload);
      } else {
        res = await createAdminBanner(token, payload);
      }

      if (checkUnauthorized(res)) return;

      if (res.success) {
        setStatusMessage('Banner Digital Berhasil Disimpan & Tampil di Website!');
        resetBannerForm();
        await loadAllData(token);
        setTimeout(() => setStatusMessage(''), 4000);
      } else {
        setErrorMessage(`Gagal: ${res.message}`);
      }
    } catch (err) {
      setErrorMessage('Gagal terhubung ke backend server.');
    } finally {
      setLoading(false);
    }
  };

  const resetBannerForm = () => {
    setEditingBannerId(null);
    setBannerTitle('');
    setBannerBadge('');
    setBannerDesc('');
    setBannerImageUrl('');
    setBannerCtaText('Ajukan Sekarang');
    setBannerCtaLink('#simulasi');
    setBannerStatus('published');
    setBannerSortOrder(banners.length + 1);
  };

  const handleEditBanner = (b: any) => {
    setEditingBannerId(b.id);
    setBannerTitle(b.title || '');
    setBannerBadge(b.badge_text || '');
    setBannerDesc(b.description || '');
    setBannerImageUrl(b.image_url || '');
    setBannerCtaText(b.cta_primary_text || 'Ajukan Sekarang');
    setBannerCtaLink(b.cta_primary_url || '#simulasi');
    setBannerStatus(b.status === 'published' ? 'published' : 'draft');
    setBannerSortOrder(b.sort_order || 1);
  };

  const handleDeleteBanner = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus banner ini?')) {
      const res = await deleteAdminBanner(token, id);
      if (checkUnauthorized(res)) return;
      setStatusMessage('Banner berhasil dihapus.');
      await loadAllData(token);
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  // Save Section Form (Supports JSON content_payload for Profil Korporat)
  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');
    setErrorMessage('');

    try {
      let contentPayloadStr = '';

      if (currentSectionCode === 'about_governance') {
        const payloadObj = {
          logo_url: logoUrl,
          overview: overviewText,
          ojk_license: ojkLicense,
          paid_up_capital: paidUpCapital,
          authorized_capital: authorizedCapital,

          vision: visionText,
          missions: missionsText,

          stat1_value: stat1Value,
          stat1_label: stat1Label,
          stat2_value: stat2Value,
          stat2_label: stat2Label,

          gms_title: gmsTitle,
          pres_dir_title: presDirTitle,
          boc_title: bocTitle,
          boc_committees: bocCommittees,
          internal_audit_title: internalAuditTitle,

          report1_title: report1Title,
          report1_pdf_url: report1PdfUrl,
          report2_title: report2Title,
          report2_pdf_url: report2PdfUrl,

          milestones: milestonesList,
          shareholders: shareholdersList,
          board_members: boardMembersList,
          departments: departmentsList,
          office_photos: officePhotosList,
        };
        contentPayloadStr = JSON.stringify(payloadObj);
      }

      if (currentSectionCode === 'products_services') {
        const payloadObj = {
          retail: {
            title: retailTitle,
            badge: retailBadge,
            description: retailDesc,
            item1_title: retailItem1Title,
            item1_desc: retailItem1Desc,
            item2_title: retailItem2Title,
            item2_desc: retailItem2Desc,
            cta_text: retailCtaText,
            cta_url: retailCtaUrl,
          },
          corporate: {
            title: corpTitle,
            badge: corpBadge,
            description: corpDesc,
            item1_title: corpItem1Title,
            item1_desc: corpItem1Desc,
            item2_title: corpItem2Title,
            item2_desc: corpItem2Desc,
            cta_text: corpCtaText,
            cta_url: corpCtaUrl,
          },
        };
        contentPayloadStr = JSON.stringify(payloadObj);
      }

      if (currentSectionCode === 'procedure_steps') {
        const payloadObj = {
          steps: prosedurStepsList,
        };
        contentPayloadStr = JSON.stringify(payloadObj);
      }

      if (currentSectionCode === 'value_propositions') {
        const payloadObj = {
          items: valuePropsItemsList,
        };
        contentPayloadStr = JSON.stringify(payloadObj);
      }

      if (currentSectionCode === 'credit_calculator') {
        const payloadObj = {
          min_dp: Number(minDp),
          fallback_rate: Number(fallbackRate),
          matrix_baru: matrixBaru,
          matrix_bekas: matrixBekas,
        };
        contentPayloadStr = JSON.stringify(payloadObj);
      }

      if (currentSectionCode === 'career_opportunities') {
        const payloadObj = {
          jobs: jobsList,
        };
        contentPayloadStr = JSON.stringify(payloadObj);
      }

      let activeBadge = badgeText || 'PERUSAHAAN & TATA KELOLA';
      let activeTitle = titleText || 'Melangkah Bersama Menuju Masa Depan';
      let activeDesc = descriptionText || overviewText.substring(0, 150);

      if (currentSectionCode === 'procedure_steps') {
        activeBadge = prosedurBadge;
        activeTitle = prosedurTitle;
        activeDesc = prosedurDesc;
      } else if (currentSectionCode === 'value_propositions') {
        activeBadge = valuePropsBadge;
        activeTitle = valuePropsTitle;
        activeDesc = valuePropsDesc;
      } else if (currentSectionCode === 'credit_calculator') {
        activeBadge = calcBadge;
        activeTitle = calcTitle;
        activeDesc = calcDesc;
      } else if (currentSectionCode === 'career_opportunities') {
        activeBadge = careerBadge;
        activeTitle = careerTitle;
        activeDesc = careerDesc;
      }

      const res = await updateAdminSection(token, {
        page_slug: 'homepage',
        section_code: currentSectionCode,
        badge_text: activeBadge,
        title: activeTitle,
        description: activeDesc,
        content_payload: contentPayloadStr,
        is_published: true,
      });

      if (checkUnauthorized(res)) return;

      if (res.success) {
        setStatusMessage(`Data Section "${activeTitle}" Berhasil Disimpan & Live di Website!`);
        await loadAllData(token);
        setTimeout(() => setStatusMessage(''), 4000);
      } else {
        setErrorMessage(`Gagal: ${res.message}`);
      }
    } catch (err) {
      setErrorMessage('Gagal terhubung ke backend server.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user');
    router.push('/login');
  };

  const activeCount = banners.filter((b) => b.status === 'published').length;

  return (
    <div className="min-h-screen bg-[#f4f7fc] font-sans flex text-slate-800 selection:bg-blue-600 selection:text-white">
      {/* 1. LEFT SIDEBAR (Dark Blue Theme matching exact screenshot) */}
      <aside className="w-64 bg-[#0a1633] text-white flex flex-col justify-between shrink-0 shadow-xl border-r border-slate-800">
        <div>
          {/* Logo Brand */}
          <div className="p-6 flex items-center space-x-3 border-b border-slate-800/80">
            <div className="w-10 h-10 bg-[#1d4ed8] rounded-xl flex items-center justify-center font-black text-white text-xl shadow-md border border-blue-400/30">
              M
            </div>
            <div>
              <div className="font-extrabold text-white text-sm tracking-wider">MITSUI LEASING</div>
              <div className="text-[10px] text-blue-300 font-semibold tracking-widest uppercase">
                CORPORATE PORTAL
              </div>
            </div>
          </div>

          {/* RBAC Role Selector Dropdown */}
          <div className="p-4 mx-3 my-4 bg-[#11224f] rounded-2xl border border-blue-900/60">
            <label className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block mb-1.5">
              AKSES PERAN (SISTEM RBAC AKTUAL):
            </label>
            <div className="relative">
              <select className="w-full bg-[#0a1633] border border-blue-800/60 rounded-xl py-2 px-3 text-xs text-white font-semibold focus:outline-none appearance-none cursor-pointer pr-8">
                <option>Manajemen Eksekutif (Full Dashboard)</option>
                <option>Content Editor</option>
                <option>Content Approver</option>
              </select>
              <ChevronDown className="w-4 h-4 text-blue-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* MENU UTAMA */}
          <div className="px-4 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">
              MENU UTAMA
            </div>

            <a
              href="#dashboard"
              className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-[#11224f] hover:text-white transition"
            >
              <BarChart3 className="w-4 h-4 text-slate-400" />
              <span>Dashboard & Analitik</span>
            </a>

            <a
              href="#crm"
              className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-[#11224f] hover:text-white transition"
            >
              <Users className="w-4 h-4 text-slate-400" />
              <span>CRM Pipeline Lead</span>
            </a>

            {/* Selected Active Pill */}
            <a
              href="#cms"
              className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#1d4ed8] text-white shadow-lg shadow-blue-600/30"
            >
              <FileText className="w-4 h-4 text-white" />
              <span>CMS & Berita (M1)</span>
            </a>

            <a
              href="#wbs"
              className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-[#11224f] hover:text-white transition"
            >
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>Kepatuhan & WBS (M7)</span>
            </a>

            <a
              href="#rbac"
              className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-[#11224f] hover:text-white transition"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>RBAC & Audit Trail (M8)</span>
            </a>
          </div>
        </div>

        {/* User Footer & Logout */}
        <div className="p-4 border-t border-slate-800/80">
          <button
            onClick={handleLogout}
            className="w-full bg-[#11224f] hover:bg-red-950 hover:text-red-300 text-slate-300 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition border border-blue-900/50"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Portal</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar (Matching Screenshot 100%) */}
        <header className="bg-white border-b border-slate-200 py-3.5 px-8 flex justify-between items-center shrink-0 shadow-xs">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">MODUL AKTIF:</span>
            <span className="bg-blue-100/70 text-blue-900 font-extrabold text-xs px-3.5 py-1 rounded-xl">
              CMS
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-[#0a1633] text-white flex items-center justify-center font-black text-xs shadow-md border border-blue-900">
              MA
            </div>
            <div className="text-left">
              <div className="text-xs font-extrabold text-slate-900 leading-tight">Management User</div>
              <div className="text-[10px] font-bold text-emerald-600 leading-tight">
                Online & Terautentikasi
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body Container */}
        <main className="p-8 space-y-6 flex-1">
          {/* Header Section with Title on Left (max space) and Compact Sub-Module Tabs Card on Right */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            {/* Title & Subtitle Left - flex-1 min-w-0 for maximum horizontal space */}
            <div className="flex-1 min-w-0 space-y-1">
              <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Content Management System - CMS (Modul M1)
              </h1>
              <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-2xl">
                Kelola dan perbarui Banner Digital website, Artikel Edukasi, Tips & Trik, dan Lowongan Kerja secara aktual.
              </p>
            </div>

            {/* Sub-Module Tabs White Card Container Right - 3-Column Pixel-Perfect Aligned Grid */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm shrink-0 w-full lg:w-[580px]">
              <div className="grid grid-cols-3 gap-y-2.5 gap-x-2 text-xs font-semibold items-center">
                {/* Column 1 Row 1: Layanan & Produk */}
                <button
                  onClick={() => {
                    setActiveTab('layanan');
                    selectSectionForm('products_services');
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all justify-start ${
                    activeTab === 'layanan'
                      ? 'bg-[#0e1e45] text-white shadow-md font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Headphones className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Layanan & Produk</span>
                </button>

                {/* Column 2 Row 1: Kantor Cabang */}
                <button
                  onClick={() => setActiveTab('cabang')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all justify-start ${
                    activeTab === 'cabang'
                      ? 'bg-[#0e1e45] text-white shadow-md font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Kantor Cabang (18)</span>
                </button>

                {/* Column 3 Row 1: Banner Digital */}
                <button
                  onClick={() => setActiveTab('hero_banner')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all justify-start ${
                    activeTab === 'hero_banner'
                      ? 'bg-[#0e1e45] text-white shadow-md font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Banner Digital ({banners.length})</span>
                </button>

                {/* Column 1 Row 2: Artikel & Tips */}
                <button
                  onClick={() => setActiveTab('artikel')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all justify-start ${
                    activeTab === 'artikel'
                      ? 'bg-[#0e1e45] text-white shadow-md font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Artikel & Tips (3)</span>
                </button>

                {/* Column 2 Row 2: Karir HR */}
                <button
                  onClick={() => {
                    setActiveTab('karir');
                    selectSectionForm('career_opportunities');
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all justify-start ${
                    activeTab === 'karir'
                      ? 'bg-[#0e1e45] text-white shadow-md font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Karir HR ({jobsList.length})</span>
                </button>

                {/* Column 3 Row 2: Profil Korporat */}
                <button
                  onClick={() => {
                    setActiveTab('profil');
                    selectSectionForm('about_governance');
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all justify-start ${
                    activeTab === 'profil'
                      ? 'bg-[#0e1e45] text-white shadow-md font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Profil Korporat</span>
                </button>

                {/* Column 1 Row 3: Parameter Suku Bunga */}
                <button
                  onClick={() => {
                    setActiveTab('bunga');
                    selectSectionForm('credit_calculator');
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all justify-start col-span-1 ${
                    activeTab === 'bunga'
                      ? 'bg-[#0e1e45] text-white shadow-md font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Parameter Suku Bunga</span>
                </button>

                {/* Column 2 Row 3: Master Menu */}
                <button
                  onClick={() => setActiveTab('master_menus')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all justify-start col-span-1 ${
                    activeTab === 'master_menus'
                      ? 'bg-[#0e1e45] text-white shadow-md font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Master Menu ({menus.length})</span>
                </button>

                {/* Column 3 Row 3: Logo & Header */}
                <button
                  onClick={() => {
                    setActiveTab('logo_header');
                    selectSectionForm('about_governance');
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all justify-start col-span-1 ${
                    activeTab === 'logo_header'
                      ? 'bg-[#0e1e45] text-white shadow-md font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 shrink-0 text-blue-400" />
                  <span className="truncate">Logo & Header</span>
                </button>

                {/* Column 1 Row 4: Prosedur Pembiayaan */}
                <button
                  onClick={() => {
                    setActiveTab('prosedur');
                    selectSectionForm('procedure_steps');
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all justify-start col-span-1 ${
                    activeTab === 'prosedur'
                      ? 'bg-[#0e1e45] text-white shadow-md font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <FileCheck className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                  <span className="truncate">Prosedur Pembiayaan</span>
                </button>

                {/* Column 2 Row 4: Nilai Utama Kami */}
                <button
                  onClick={() => {
                    setActiveTab('nilai_utama');
                    selectSectionForm('value_propositions');
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all justify-start col-span-1 ${
                    activeTab === 'nilai_utama'
                      ? 'bg-[#0e1e45] text-white shadow-md font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span className="truncate">Nilai Utama Kami</span>
                </button>
              </div>
            </div>
          </div>

          {/* Error Alert Message */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-300 text-red-900 text-xs p-4 rounded-2xl flex items-center justify-between font-bold shadow-sm">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Success Notification Banner */}
          {statusMessage && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs p-4 rounded-2xl flex items-center justify-between font-bold shadow-sm animate-fade-in">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{statusMessage}</span>
              </div>
            </div>
          )}

          {/* TAB: PARAMETER SUKU BUNGA & DP MANAGER (SECTION: credit_calculator) */}
          {activeTab === 'bunga' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-fadeIn">
              {/* Header Bar matching Screenshot 1 */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between border-b border-slate-100 pb-5 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 text-blue-900 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      CMS SUKU BUNGA
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Matriks Suku Bunga Berdasarkan Kondisi & Penggunaan</span>
                  </div>
                  <h2 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
                    Pengaturan Suku Bunga & DP Pembiayaan
                  </h2>
                  <p className="text-xs text-slate-500 font-medium max-w-3xl leading-relaxed">
                    Sistemkan suku bunga resmi Mitsui Leasing berdasarkan kategori (Unit Baru / Bekas, Penumpang / Komersial) dan Tenor. Nilai ini langsung terhubung ke Kalkulator Simulasi Kredit.
                  </p>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleResetMatrixStandard}
                    className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Reset Standar Mitsui</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveSection}
                    disabled={loading}
                    className="bg-[#1d4ed8] hover:bg-blue-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition shadow-md disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{loading ? 'Menyimpan...' : 'Simpan Matriks Bunga & DP'}</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSaveSection} className="space-y-6 text-xs">
                {/* 1. Parameter Dasar Kalkulator */}
                <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/90 space-y-4">
                  <div className="font-extrabold text-slate-900 text-xs tracking-wider flex items-center space-x-2 uppercase">
                    <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                    <span>Parameter Dasar Kalkulator</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Minimum Uang Muka / DP (%)</label>
                      <div className="relative">
                        <input
                          type="number"
                          min={5}
                          max={80}
                          value={minDp}
                          onChange={(e) => setMinDp(Number(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-black text-sm focus:ring-2 focus:ring-blue-500 pr-10"
                        />
                        <span className="absolute right-3.5 top-3 text-slate-400 font-bold">%</span>
                      </div>
                      <p className="text-[10px] text-slate-400">Batas bawah persen DP di kalkulator publik (standar OJK: 20%)</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Suku Bunga Acuan Dasar Fallback (% p.a.)</label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          value={fallbackRate}
                          onChange={(e) => setFallbackRate(Number(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-black text-sm focus:ring-2 focus:ring-blue-500 pr-10"
                        />
                        <span className="absolute right-3.5 top-3 text-slate-400 font-bold">%</span>
                      </div>
                      <p className="text-[10px] text-slate-400">Digunakan jika ada tenor abnormal di luar matriks</p>
                    </div>
                  </div>
                </div>

                {/* 2. Grid Table Dual Matriks: Unit Baru vs Unit Bekas (Exact Screenshot 1) */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* MATRIKS UNIT BARU */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                    <div className="bg-slate-100/80 px-5 py-3.5 border-b border-slate-200 text-center">
                      <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest block">TABEL SUKU BUNGA RESMI</span>
                      <h3 className="text-base font-black text-slate-900 mt-0.5">Unit Baru</h3>
                    </div>

                    <div className="p-4 overflow-x-auto">
                      <table className="w-full text-center border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-600 bg-slate-50">
                            <th className="py-2.5 px-3 text-left w-20">Tenor (Bulan)</th>
                            <th className="py-2.5 px-3 text-center" colSpan={2}>
                              Suku Bunga (Mobil dari)
                              <div className="grid grid-cols-2 mt-1 text-[10px] font-semibold text-slate-500">
                                <span>Penumpang (Retail)</span>
                                <span>Komersial (Niaga)</span>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                          {['12', '24', '36', '48', '60'].map((t) => (
                            <tr key={`baru-${t}`} className="hover:bg-blue-50/30 transition">
                              <td className="py-3 px-3 font-extrabold text-slate-900 text-left">{t}</td>
                              <td className="py-2 px-2 w-1/2">
                                <div className="relative">
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={matrixBaru[t]?.penumpang ?? 0}
                                    onChange={(e) => handleMatrixChange('baru', t, 'penumpang', Number(e.target.value))}
                                    className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-slate-900 font-extrabold text-center text-xs focus:ring-2 focus:ring-blue-500 pr-7"
                                  />
                                  <span className="absolute right-2 top-2 text-slate-400 text-[10px] font-bold">%</span>
                                </div>
                              </td>
                              <td className="py-2 px-2 w-1/2">
                                <div className="relative">
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={matrixBaru[t]?.komersial ?? 0}
                                    onChange={(e) => handleMatrixChange('baru', t, 'komersial', Number(e.target.value))}
                                    className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-slate-900 font-extrabold text-center text-xs focus:ring-2 focus:ring-blue-500 pr-7"
                                  />
                                  <span className="absolute right-2 top-2 text-slate-400 text-[10px] font-bold">%</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 text-[10px] text-slate-500 font-medium flex justify-between items-center">
                      <span>⚡ Contoh: 12 Bln Penumpang = 4.08%, Komersial = 5.21%</span>
                      <span className="text-emerald-600 font-bold">Otomatis Sync</span>
                    </div>
                  </div>

                  {/* MATRIKS UNIT BEKAS */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                    <div className="bg-amber-50/80 px-5 py-3.5 border-b border-amber-200/80 text-center">
                      <span className="text-[10px] font-black text-amber-900 uppercase tracking-widest block">TABEL SUKU BUNGA RESMI</span>
                      <h3 className="text-base font-black text-slate-900 mt-0.5">Unit Bekas</h3>
                    </div>

                    <div className="p-4 overflow-x-auto">
                      <table className="w-full text-center border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-600 bg-slate-50">
                            <th className="py-2.5 px-3 text-left w-20">Tenor (Bulan)</th>
                            <th className="py-2.5 px-3 text-center" colSpan={2}>
                              Suku Bunga (Mobil dari)
                              <div className="grid grid-cols-2 mt-1 text-[10px] font-semibold text-slate-500">
                                <span>Penumpang (Retail)</span>
                                <span>Komersial (Niaga)</span>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                          {['12', '24', '36', '48', '60'].map((t) => (
                            <tr key={`bekas-${t}`} className="hover:bg-amber-50/30 transition">
                              <td className="py-3 px-3 font-extrabold text-slate-900 text-left">{t}</td>
                              <td className="py-2 px-2 w-1/2">
                                <div className="relative">
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={matrixBekas[t]?.penumpang ?? 0}
                                    onChange={(e) => handleMatrixChange('bekas', t, 'penumpang', Number(e.target.value))}
                                    className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-slate-900 font-extrabold text-center text-xs focus:ring-2 focus:ring-blue-500 pr-7"
                                  />
                                  <span className="absolute right-2 top-2 text-slate-400 text-[10px] font-bold">%</span>
                                </div>
                              </td>
                              <td className="py-2 px-2 w-1/2">
                                <div className="relative">
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={matrixBekas[t]?.komersial ?? 0}
                                    onChange={(e) => handleMatrixChange('bekas', t, 'komersial', Number(e.target.value))}
                                    className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-slate-900 font-extrabold text-center text-xs focus:ring-2 focus:ring-blue-500 pr-7"
                                  />
                                  <span className="absolute right-2 top-2 text-slate-400 text-[10px] font-bold">%</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 text-[10px] text-slate-500 font-medium flex justify-between items-center">
                      <span>⚡ Contoh: 12 Bln Penumpang = 7.10%, Komersial = 7.71%</span>
                      <span className="text-emerald-600 font-bold">Otomatis Sync</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar matching Screenshot 1 */}
                <div className="bg-[#091838] text-white p-4 rounded-2xl border border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-blue-400 shrink-0" />
                    <div>
                      <div className="font-bold text-xs">Sinkronisasi Matriks Suku Bunga Real-Time</div>
                      <div className="text-[10px] text-slate-300">
                        Setiap perubahan nilai di atas akan langsung aktif di kalkulator simulasi kredit publik tanpa perlu restart.
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#1d4ed8] hover:bg-blue-600 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs tracking-wider flex items-center space-x-2 transition shadow-md shrink-0 disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{loading ? 'Menyimpan...' : 'Simpan & Terapkan Semua Perubahan'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: KARIR HR MANAGER (SECTION: career_opportunities) */}
          {activeTab === 'karir' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
              {/* Left Column: Tambah Lowongan Karir (HR) */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">
                    Tambah Lowongan Karir (HR)
                  </h2>
                </div>

                <form onSubmit={handlePostJob} className="space-y-5 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Posisi Pekerjaan</label>
                    <input
                      type="text"
                      value={newJobTitle}
                      onChange={(e) => setNewJobTitle(e.target.value)}
                      placeholder="cth: Risk Specialist"
                      required
                      className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Departemen</label>
                    <div className="relative">
                      <select
                        value={newJobDept}
                        onChange={(e) => setNewJobDept(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer pr-10"
                      >
                        <option value="Marketing">Marketing</option>
                        <option value="Risk & Compliance">Risk & Compliance</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance & Accounting">Finance & Accounting</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Operations">Operations</option>
                        <option value="Internal Audit">Internal Audit</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-4 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      Persyaratan (Tiap baris jadi 1 poin)
                    </label>
                    <textarea
                      rows={5}
                      value={newJobReqsText}
                      onChange={(e) => setNewJobReqsText(e.target.value)}
                      placeholder="Minimal S1 Ekonomi / Hukum&#10;Pengalaman 2 tahun di multifinance"
                      className="w-full bg-white border border-slate-200 rounded-2xl p-4 font-medium text-slate-900 placeholder:text-slate-400 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1b3e8b] hover:bg-blue-900 text-white font-bold py-3.5 rounded-2xl transition text-xs shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <span>Posting Lowongan</span>
                    <Plus className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Right Column: Daftar Lowongan Karir Aktif */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">
                    Daftar Lowongan Karir Aktif ({jobsList.length})
                  </h2>
                </div>

                <div className="space-y-4">
                  {jobsList.map((job) => {
                    const isOpen = job.status === 'OPEN';
                    return (
                      <div
                        key={job.id}
                        className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between hover:shadow-sm transition"
                      >
                        <div className="space-y-1">
                          <h3 className="font-extrabold text-slate-900 text-sm">{job.title}</h3>
                          <div className="text-xs text-slate-500 font-semibold flex items-center space-x-1.5">
                            <span>{job.department || 'General'}</span>
                            <span>•</span>
                            <span>{job.date || '2026-08-15'}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => handleToggleJobStatus(job.id)}
                            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 border transition ${
                              isOpen
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : 'bg-slate-100 text-slate-600 border-slate-300'
                            }`}
                          >
                            <span>{isOpen ? 'OPEN' : 'CLOSED'}</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteJob(job.id)}
                            className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg transition"
                            title="Hapus Lowongan Ini"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB: NILAI UTAMA KAMI MANAGER (SECTION: value_propositions) */}
          {activeTab === 'nilai_utama' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span>Kelola Modul: Nilai Utama Kami (Mengapa Memilih Mitsui Leasing?)</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Kelola judul section, sub-badge, deskripsi ringkasan, serta daftar kartu keunggulan utama (1. Terdaftar di OJK, 2. Syarat Mudah, 3. Proses Cepat, 4. Jaringan Luas, dll.).
                  </p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full border border-emerald-200 shrink-0">
                  LIVE STATUS: PUBLISHED
                </span>
              </div>

              <form onSubmit={handleSaveSection} className="space-y-6 text-xs">
                {/* Header Configuration */}
                <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span>Pengaturan Header Section Nilai Utama</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Sub-Badge Header</label>
                      <input
                        type="text"
                        value={valuePropsBadge}
                        onChange={(e) => setValuePropsBadge(e.target.value)}
                        placeholder="NILAI UTAMA KAMI"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-1.5">
                      <label className="font-bold text-slate-700">Judul Utama Section *</label>
                      <input
                        type="text"
                        value={valuePropsTitle}
                        onChange={(e) => setValuePropsTitle(e.target.value)}
                        placeholder="Mengapa Memilih Mitsui Leasing?"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-extrabold text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Deskripsi Sub-Header Section *</label>
                    <textarea
                      rows={2}
                      value={valuePropsDesc}
                      onChange={(e) => setValuePropsDesc(e.target.value)}
                      placeholder="Keunggulan kami sebagai mitra finansial terpercaya untuk kebutuhan personal dan bisnis Anda."
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 font-medium leading-relaxed"
                    />
                  </div>
                </div>

                {/* Items List Manager */}
                <div className="bg-amber-50/40 p-5 rounded-2xl border border-amber-200/80 space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
                    <div className="font-black text-amber-950 text-xs uppercase tracking-wider flex items-center space-x-2">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span>Daftar Kartu Keunggulan Utamanya ({valuePropsItemsList.length} Kartu)</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddValuePropItem}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1.5 transition text-xs shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Keunggulan Baru</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {valuePropsItemsList.map((item, idx) => (
                      <div
                        key={item.id || idx}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3 relative group"
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="font-extrabold text-slate-900 text-xs flex items-center space-x-1.5">
                            <span className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-[10px] font-black">
                              {idx + 1}
                            </span>
                            <span>Keunggulan #{idx + 1}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteValuePropItem(item.id)}
                            className="text-slate-400 hover:text-red-600 transition p-1"
                            title="Hapus Keunggulan Ini"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-slate-700 text-[10px]">Pilih Icon Card</label>
                          <select
                            value={item.icon || 'ShieldCheck'}
                            onChange={(e) => handleUpdateValuePropItem(item.id, 'icon', e.target.value)}
                            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-900 font-bold bg-white"
                          >
                            <option value="ShieldCheck">ShieldCheck (Legality & OJK)</option>
                            <option value="FileText">FileText (Dokumen / Syarat)</option>
                            <option value="Zap">Zap (Proses Cepat / Kilat)</option>
                            <option value="MapPin">MapPin (Jaringan / Cabang)</option>
                            <option value="Award">Award (Penghargaan / Sertifikat)</option>
                            <option value="Star">Star (Kualitas Terbaik)</option>
                            <option value="CheckCircle">CheckCircle (Terverifikasi)</option>
                            <option value="Clock">Clock (Layanan 24/7)</option>
                            <option value="Lock">Lock (Keamanan BPKB)</option>
                            <option value="ThumbsUp">ThumbsUp (Kepuasan Pelanggan)</option>
                            <option value="TrendingUp">TrendingUp (Bunga Ringan / Pertumbuhan)</option>
                            <option value="Users">Users (Tim Konsultan Professional)</option>
                            <option value="Building">Building (Kemitraan Corporate)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-slate-700 text-[10px]">Judul Keunggulan *</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleUpdateValuePropItem(item.id, 'title', e.target.value)}
                            placeholder="Terdaftar di OJK"
                            required
                            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-900 font-bold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-slate-700 text-[10px]">Deskripsi Singkat *</label>
                          <textarea
                            rows={2}
                            value={item.desc || item.description || ''}
                            onChange={(e) => handleUpdateValuePropItem(item.id, 'desc', e.target.value)}
                            placeholder="Resmi berizin dan diawasi oleh Otoritas Jasa Keuangan..."
                            required
                            className="w-full border border-slate-200 rounded-lg p-2 text-slate-900 font-medium text-xs leading-normal"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#0a1633] hover:bg-blue-900 text-white font-extrabold px-6 py-3 rounded-2xl shadow-md transition flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 text-emerald-400" />
                    <span>{loading ? 'Menyimpan ke Database...' : 'Simpan Section Nilai Utama Kami'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: PROSEDUR PEMBIAYAAN MANAGER (SECTION: procedure_steps) */}
          {activeTab === 'prosedur' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
                    <FileCheck className="w-5 h-5 text-blue-700" />
                    <span>Kelola Modul: Prosedur Pembiayaan (Bagaimana Prosedur Pembiayaannya?)</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Kelola judul section, sub-badge, deskripsi ringkasan, serta daftar langkah prosedur pembiayaan (1. Pengajuan, 2. e-KYC, 3. Analisa, 4. Pencairan, dll.) secara interaktif.
                  </p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full border border-emerald-200 shrink-0">
                  LIVE STATUS: PUBLISHED
                </span>
              </div>

              <form onSubmit={handleSaveSection} className="space-y-6 text-xs">
                {/* Header Configuration */}
                <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span>Pengaturan Header Section Prosedur</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Sub-Badge Header</label>
                      <input
                        type="text"
                        value={prosedurBadge}
                        onChange={(e) => setProsedurBadge(e.target.value)}
                        placeholder="TRANSPARAN & MUDAH"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-1.5">
                      <label className="font-bold text-slate-700">Judul Utama Section *</label>
                      <input
                        type="text"
                        value={prosedurTitle}
                        onChange={(e) => setProsedurTitle(e.target.value)}
                        placeholder="Bagaimana Prosedur Pembiayaannya?"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-extrabold text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Deskripsi Sub-Header Section *</label>
                    <textarea
                      rows={2}
                      value={prosedurDesc}
                      onChange={(e) => setProsedurDesc(e.target.value)}
                      placeholder="Kemudahan pengajuan kredit dalam 4 langkah terstruktur yang mengedepankan prinsip kehati-hatian."
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 font-medium leading-relaxed"
                    />
                  </div>
                </div>

                {/* Steps List Manager */}
                <div className="bg-blue-50/40 p-5 rounded-2xl border border-blue-200/80 space-y-4">
                  <div className="flex items-center justify-between border-b border-blue-200/60 pb-3">
                    <div className="font-black text-blue-950 text-xs uppercase tracking-wider flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-700" />
                      <span>Daftar Langkah Prosedur Pembiayaan ({prosedurStepsList.length} Langkah)</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddProsedurStep}
                      className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1.5 transition text-xs shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Langkah Baru</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prosedurStepsList.map((step, idx) => (
                      <div
                        key={step.id || idx}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3 relative group"
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="font-extrabold text-blue-900 text-xs flex items-center space-x-1.5">
                            <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">
                              {step.num || idx + 1}
                            </span>
                            <span>Langkah #{idx + 1}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteProsedurStep(step.id)}
                            className="text-slate-400 hover:text-red-600 transition p-1"
                            title="Hapus Langkah Ini"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-1">
                            <label className="font-bold text-slate-700 text-[10px]">Nomor Urut</label>
                            <input
                              type="text"
                              value={step.num}
                              onChange={(e) => handleUpdateProsedurStep(step.id, 'num', e.target.value)}
                              placeholder="1"
                              className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-900 font-bold"
                            />
                          </div>

                          <div className="col-span-2 space-y-1">
                            <label className="font-bold text-slate-700 text-[10px]">Pilih Icon</label>
                            <select
                              value={step.icon || 'FileCheck'}
                              onChange={(e) => handleUpdateProsedurStep(step.id, 'icon', e.target.value)}
                              className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-900 font-bold bg-white"
                            >
                              <option value="FileEdit">FileEdit (Form Pengajuan)</option>
                              <option value="ShieldCheck">ShieldCheck (e-KYC / Verifikasi)</option>
                              <option value="FileCheck">FileCheck (Analisa Kredit)</option>
                              <option value="CheckCircle">CheckCircle (Pencairan / Disbursed)</option>
                              <option value="CreditCard">CreditCard (Kartu/Simulasi)</option>
                              <option value="UserCheck">UserCheck (Verifikasi User)</option>
                              <option value="DollarSign">DollarSign (Keuangan)</option>
                              <option value="Building">Building (Kantor/Cabang)</option>
                              <option value="Search">Search (Inspeksi/Survey)</option>
                              <option value="Award">Award (Persetujuan)</option>
                              <option value="HelpCircle">HelpCircle (Bantuan)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-slate-700 text-[10px]">Judul Langkah *</label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => handleUpdateProsedurStep(step.id, 'title', e.target.value)}
                            placeholder="Pengajuan"
                            required
                            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-900 font-bold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-slate-700 text-[10px]">Deskripsi Singkat *</label>
                          <textarea
                            rows={2}
                            value={step.desc || step.description || ''}
                            onChange={(e) => handleUpdateProsedurStep(step.id, 'desc', e.target.value)}
                            placeholder="Pengisian data pengajuan melalui website..."
                            required
                            className="w-full border border-slate-200 rounded-lg p-2 text-slate-900 font-medium text-xs leading-normal"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#0a1633] hover:bg-blue-900 text-white font-extrabold px-6 py-3 rounded-2xl shadow-md transition flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 text-emerald-400" />
                    <span>{loading ? 'Menyimpan ke Database...' : 'Simpan Section Prosedur Pembiayaan'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 0: LAYANAN & PRODUK PEMBIAYAAN MANAGER (SECTION: products_services) */}
          {activeTab === 'layanan' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
                    <Headphones className="w-5 h-5 text-blue-700" />
                    <span>Kelola Modul: Layanan & Produk Pembiayaan</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Atur judul section, deskripsi, serta detail 2 Pilar Utama Pembiayaan (Retail & Korporasi) yang tampil dinamis di landing page.
                  </p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full border border-emerald-200 shrink-0">
                  LIVE STATUS: PUBLISHED
                </span>
              </div>

              <form onSubmit={handleSaveSection} className="space-y-6 text-xs">
                {/* 1. Header Section Configuration */}
                <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span>Pengaturan Header Section Utama</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Sub-Badge Header</label>
                      <input
                        type="text"
                        value={badgeText}
                        onChange={(e) => setBadgeText(e.target.value)}
                        placeholder="FOKUS BISNIS KAMI"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-1.5">
                      <label className="font-bold text-slate-700">Judul Utama Section *</label>
                      <input
                        type="text"
                        value={titleText}
                        onChange={(e) => setTitleText(e.target.value)}
                        placeholder="Layanan & Produk Pembiayaan"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-extrabold text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Deskripsi Ringkasan Section *</label>
                    <textarea
                      rows={2}
                      value={descriptionText}
                      onChange={(e) => setDescriptionText(e.target.value)}
                      placeholder="Kami membagi fokus pembiayaan kami menjadi dua pilar utama untuk memberikan solusi paling tepat sasaran..."
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 font-medium leading-relaxed"
                    />
                  </div>
                </div>

                {/* Dual Pilar Grid: Retail vs Corporate */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* PILAR 1: PEMBIAYAAN KONSUMEN (RETAIL) */}
                  <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-200/80 space-y-4">
                    <div className="flex items-center space-x-2 font-black text-blue-950 text-xs uppercase tracking-wider border-b border-blue-200/60 pb-2.5">
                      <Car className="w-4 h-4 text-blue-700" />
                      <span>Pilar 1: Pembiayaan Konsumen (Retail)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Judul Pilar Retail</label>
                        <input
                          type="text"
                          value={retailTitle}
                          onChange={(e) => setRetailTitle(e.target.value)}
                          placeholder="Pembiayaan Konsumen (Retail)"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Sub-Badge Target</label>
                        <input
                          type="text"
                          value={retailBadge}
                          onChange={(e) => setRetailBadge(e.target.value)}
                          placeholder="Individu / Perorangan"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-blue-800 font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Deskripsi Utama Pilar Retail</label>
                      <textarea
                        rows={3}
                        value={retailDesc}
                        onChange={(e) => setRetailDesc(e.target.value)}
                        placeholder="Fasilitas pembiayaan khusus untuk kepemilikan kendaraan..."
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 font-medium leading-relaxed"
                      />
                    </div>

                    {/* Sub Item 1 */}
                    <div className="bg-white p-3.5 rounded-xl border border-blue-100 space-y-2 shadow-2xs">
                      <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Sub-Produk 1</span>
                      </div>
                      <input
                        type="text"
                        value={retailItem1Title}
                        onChange={(e) => setRetailItem1Title(e.target.value)}
                        placeholder="Pembiayaan Mobil Baru"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 font-bold"
                      />
                      <input
                        type="text"
                        value={retailItem1Desc}
                        onChange={(e) => setRetailItem1Desc(e.target.value)}
                        placeholder="Bekerja sama dengan dealer resmi (ATPM)..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-[11px]"
                      />
                    </div>

                    {/* Sub Item 2 */}
                    <div className="bg-white p-3.5 rounded-xl border border-blue-100 space-y-2 shadow-2xs">
                      <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Sub-Produk 2</span>
                      </div>
                      <input
                        type="text"
                        value={retailItem2Title}
                        onChange={(e) => setRetailItem2Title(e.target.value)}
                        placeholder="Pembiayaan Mobil Bekas"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 font-bold"
                      />
                      <input
                        type="text"
                        value={retailItem2Desc}
                        onChange={(e) => setRetailItem2Desc(e.target.value)}
                        placeholder="Solusi cerdas untuk mendapatkan mobil idaman..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-[11px]"
                      />
                    </div>

                    {/* CTA Button Inputs */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Teks Tombol (CTA)</label>
                        <input
                          type="text"
                          value={retailCtaText}
                          onChange={(e) => setRetailCtaText(e.target.value)}
                          placeholder="AJUKAN PEMBIAYAAN RETAIL"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">URL Link Anchor</label>
                        <input
                          type="text"
                          value={retailCtaUrl}
                          onChange={(e) => setRetailCtaUrl(e.target.value)}
                          placeholder="#simulasi"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 font-mono text-[11px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* PILAR 2: PEMBIAYAAN KORPORASI (COMMERCIAL) */}
                  <div className="bg-slate-100/70 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center space-x-2 font-black text-slate-900 text-xs uppercase tracking-wider border-b border-slate-200 pb-2.5">
                      <Truck className="w-4 h-4 text-slate-800" />
                      <span>Pilar 2: Pembiayaan Korporasi (Commercial)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Judul Pilar Korporasi</label>
                        <input
                          type="text"
                          value={corpTitle}
                          onChange={(e) => setCorpTitle(e.target.value)}
                          placeholder="Pembiayaan Korporasi (Commercial)"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Sub-Badge Target</label>
                        <input
                          type="text"
                          value={corpBadge}
                          onChange={(e) => setCorpBadge(e.target.value)}
                          placeholder="Badan Usaha / Komersial"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Deskripsi Utama Pilar Korporasi</label>
                      <textarea
                        rows={3}
                        value={corpDesc}
                        onChange={(e) => setCorpDesc(e.target.value)}
                        placeholder="Solusi pembiayaan produktif yang ditujukan untuk badan usaha..."
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 font-medium leading-relaxed"
                      />
                    </div>

                    {/* Sub Item 1 */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
                      <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-700" />
                        <span>Sub-Produk 1</span>
                      </div>
                      <input
                        type="text"
                        value={corpItem1Title}
                        onChange={(e) => setCorpItem1Title(e.target.value)}
                        placeholder="Pembiayaan Investasi"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 font-bold"
                      />
                      <input
                        type="text"
                        value={corpItem1Desc}
                        onChange={(e) => setCorpItem1Desc(e.target.value)}
                        placeholder="Pembelian barang modal seperti Alat Berat..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-[11px]"
                      />
                    </div>

                    {/* Sub Item 2 */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
                      <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-700" />
                        <span>Sub-Produk 2</span>
                      </div>
                      <input
                        type="text"
                        value={corpItem2Title}
                        onChange={(e) => setCorpItem2Title(e.target.value)}
                        placeholder="Pembiayaan Modal Kerja & Fleet"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 font-bold"
                      />
                      <input
                        type="text"
                        value={corpItem2Desc}
                        onChange={(e) => setCorpItem2Desc(e.target.value)}
                        placeholder="Fasilitas Sale & Leaseback serta pembiayaan..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-[11px]"
                      />
                    </div>

                    {/* CTA Button Inputs */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Teks Tombol (CTA)</label>
                        <input
                          type="text"
                          value={corpCtaText}
                          onChange={(e) => setCorpCtaText(e.target.value)}
                          placeholder="AJUKAN PEMBIAYAAN KORPORAT"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">URL Link Anchor</label>
                        <input
                          type="text"
                          value={corpCtaUrl}
                          onChange={(e) => setCorpCtaUrl(e.target.value)}
                          placeholder="#ajukan-korporat"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 font-mono text-[11px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-900 hover:bg-blue-950 text-white font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-lg transition flex items-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Data Layanan & Produk Ke PostgreSQL</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 1: HERO BANNER DIGITAL (Matching Screenshot 100%) */}
          {activeTab === 'hero_banner' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column Form: + Tambah Banner Digital Baru (5 cols) */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <div>
                    <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                      <Plus className="w-4 h-4 text-[#1d4ed8]" />
                      <span>{editingBannerId ? `Edit Banner Digital #${editingBannerId}` : 'Tambah Banner Digital Baru'}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Update slider banner promosi di halaman utama publik.
                    </p>
                  </div>
                  {editingBannerId && (
                    <button
                      onClick={resetBannerForm}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800"
                    >
                      Batal Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveBanner} className="space-y-4 text-xs">
                  {/* 1. Direct File Upload Box */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                      <span>Unggah File Gambar Banner *</span>
                      {uploading && <span className="text-blue-600 font-bold animate-pulse">Mengunggah...</span>}
                    </label>

                    <div className="border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-2xl p-5 text-center bg-blue-50/50 hover:bg-blue-50 transition cursor-pointer relative shadow-xs">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow">
                          <Upload className="w-5 h-5" />
                        </div>
                        <span className="font-extrabold text-slate-900 text-xs">Klik / Drag File Gambar Di Sini</span>
                        <span className="text-[10px] text-slate-500 font-medium">Format: JPG, PNG, WEBP (Simpan Kilat Ke PostgreSQL)</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Atau Pilih Gambar HD Cepat:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => applyPresetImage('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop')}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 border border-slate-200"
                      >
                        <Car className="w-3 h-3 text-red-500" />
                        <span>Mobil Penumpang</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => applyPresetImage('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop')}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 border border-slate-200"
                      >
                        <Truck className="w-3 h-3 text-amber-500" />
                        <span>Armada Truk</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => applyPresetImage('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800&auto=format&fit=crop')}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 border border-slate-200"
                      >
                        <HardHat className="w-3 h-3 text-emerald-600" />
                        <span>Alat Berat Konstruksi</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => applyPresetImage('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop')}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 border border-slate-200"
                      >
                        <Building className="w-3 h-3 text-blue-600" />
                        <span>Gedung Korporat</span>
                      </button>
                    </div>
                  </div>

                  {/* 2. Judul Promosi / Program */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Judul Promosi / Program *</label>
                    <input
                      type="text"
                      value={bannerTitle}
                      onChange={(e) => setBannerTitle(e.target.value)}
                      placeholder="cth: Promo Kemerdekaan: Bunga Mulai 6.8% Flat"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>

                  {/* 3. Sub-judul / Keterangan Singkat */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Sub-judul / Keterangan Singkat</label>
                    <input
                      type="text"
                      value={bannerBadge}
                      onChange={(e) => setBannerBadge(e.target.value)}
                      placeholder="cth: Proses Cepat & Persetujuan Instan 1 Hari Kerja"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>

                  {/* 4. CTA Inputs Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Teks Tombol (CTA)</label>
                      <input
                        type="text"
                        value={bannerCtaText}
                        onChange={(e) => setBannerCtaText(e.target.value)}
                        placeholder="Ajukan Sekarang"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Target Link Tombol (Halaman Tujuan)</label>
                      <div className="relative">
                        <select
                          value={bannerCtaLink}
                          onChange={(e) => setBannerCtaLink(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 appearance-none font-medium cursor-pointer text-xs pr-8"
                        >
                          <option value="#simulasi">🧮 #simulasi (Kalkulator Kredit)</option>
                          <option value="#produk">🚗 #produk (Produk Pembiayaan)</option>
                          <option value="#perusahaan">🏢 #perusahaan (Profil Korporat)</option>
                          <option value="#artikel">📰 #artikel (Artikel & Promo)</option>
                          <option value="#prosedur">📝 #prosedur (Prosedur Pembiayaan)</option>
                          <option value="#keunggulan">⭐ #keunggulan (Keunggulan USPs)</option>
                          <option value="#layanan">🎧 #layanan (Layanan Digital Nasabah)</option>
                          <option value="#cabang">📍 #cabang (Kantor Cabang & Peta)</option>
                          <option value="#wbs">🛡️ #wbs (Pengaduan & WBS OJK)</option>
                          <option value="#ajukan">📋 #ajukan (Form Pengajuan)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* 5. Status & Sort Order Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Status Publikasi</label>
                      <div className="relative">
                        <select
                          value={bannerStatus}
                          onChange={(e) => setBannerStatus(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 appearance-none font-semibold cursor-pointer"
                        >
                          <option value="published">🟢 Aktif (Tayang di Web)</option>
                          <option value="draft">🔴 Draft (Non-Aktif)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Urutan Slider (Order)</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={bannerSortOrder}
                        onChange={(e) => setBannerSortOrder(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-bold"
                      />
                    </div>
                  </div>

                  {/* 6. Pratinjau Gambar Banner (Live Image Preview Card matching screenshot) */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Pratinjau Gambar Banner:
                    </label>
                    <div className="h-44 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-900 group shadow-inner">
                      {bannerImageUrl ? (
                        <img
                          src={bannerImageUrl}
                          alt="Pratinjau Banner"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                          <ImageIcon className="w-8 h-8 mb-1" />
                          <span>File gambar akan muncul di sini setelah diunggah</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <div className="font-extrabold text-sm leading-tight drop-shadow-md">
                          {bannerTitle || 'Judul Banner'}
                        </div>
                        <div className="text-[11px] text-slate-300 font-medium truncate mt-0.5">
                          {bannerBadge || 'Subjudul banner promosi'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button matching screenshot dark blue */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0a1633] hover:bg-[#11224f] text-white font-bold py-3.5 rounded-xl transition text-xs shadow-md uppercase tracking-wider flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4 text-blue-400" />
                    <span>{editingBannerId ? 'Simpan Perubahan Banner' : '+ Publikasikan Banner'}</span>
                  </button>
                </form>
              </div>

              {/* Right Column Container: Daftar Banner Digital Aktif (7 cols matching screenshot 100%) */}
              <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-slate-900 text-sm">
                      Daftar Banner Digital Aktif ({banners.length})
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Banner ini ditampilkan pada slideshow hero halaman beranda pengunjung.
                    </p>
                  </div>

                  <span className="bg-emerald-50 text-emerald-800 font-extrabold text-xs px-3.5 py-1.5 rounded-xl border border-emerald-200 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{activeCount} Tayang di Web</span>
                  </span>
                </div>

                <div className="space-y-4">
                  {banners.map((b, idx) => {
                    const isPublished = b.status === 'published';
                    return (
                      <div
                        key={b.id}
                        className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4 hover:shadow-md transition"
                      >
                        {/* Left Thumbnail with #1 #2 #3 Position Badge */}
                        <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-900">
                          <img src={b.image_url} alt={b.title} className="w-full h-full object-cover" />
                          <span className="absolute top-1 left-1 bg-slate-900/80 text-white font-black text-[9px] px-1.5 py-0.5 rounded shadow">
                            #{idx + 1}
                          </span>
                        </div>

                        {/* Middle Details + Explicit Status Badge */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-extrabold text-slate-900 text-xs truncate">{b.title}</h4>
                            <span
                              className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                isPublished
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-amber-100 text-amber-800 border border-amber-300'
                              }`}
                            >
                              {isPublished ? '🟢 AKTIF' : '🔴 DRAFT'}
                            </span>
                          </div>

                          <p className="text-slate-500 text-[11px] line-clamp-1">{b.description || b.badge_text}</p>
                          <div className="text-[10px] text-blue-600 font-extrabold">
                            CTA: {b.cta_primary_text || 'Simulasi Cicilan'} →
                          </div>
                        </div>

                        {/* Right Action Icons & Interactive Toggle Button */}
                        <div className="flex items-center space-x-3 shrink-0">
                          {/* Interactive Active/Inactive Toggle Button */}
                          <button
                            type="button"
                            onClick={() => handleToggleBannerStatus(b)}
                            title={isPublished ? 'Klik untuk non-aktifkan (Draft)' : 'Klik untuk aktifkan (Tayang)'}
                            className={`px-3 py-1.5 rounded-xl font-black text-[11px] flex items-center space-x-1.5 transition border shadow-xs ${
                              isPublished
                                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-300'
                                : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
                            }`}
                          >
                            {isPublished ? (
                              <>
                                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Aktif (Tayang)</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3.5 h-3.5 text-amber-600" />
                                <span>Aktifkan</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleEditBanner(b)}
                            className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition"
                            title="Edit Slide Banner"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteBanner(b.id)}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition"
                            title="Hapus Slide Banner"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Floating Bottom Badge matching screenshot */}
                <div className="fixed bottom-6 right-8 z-50 bg-[#0a1633] text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-blue-800/80 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center font-bold">
                    6
                  </div>
                  <div className="text-xs">
                    <div className="font-bold">Layanan Terpadu</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">Jam Kerja (Online)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFIL KORPORAT & GCG (EXACT FORM DESIGN FROM ALL USER SCREENSHOTS) */}
          {activeTab === 'profil' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              {/* Header Box matching Screenshot 1 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-1">
                  <span className="inline-block bg-blue-100 text-[#1d4ed8] text-[10px] font-extrabold px-3 py-1 rounded-full tracking-wider uppercase">
                    MANAJEMEN PROFIL KORPORAT & GCG
                  </span>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Pusat CMS Profil Perusahaan & Legalitas OJK
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Kelola ikhtisar perusahaan, legalitas OJK, modal disetor, visi-misi, sejarah milestone, serta struktur pemegang saham.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => selectSectionForm('about_governance')}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition self-start sm:self-auto border border-slate-200"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reset Default</span>
                </button>
              </div>

              <form onSubmit={handleSaveSection} className="space-y-6 text-xs">
                {/* 1. Ikhtisar & Legalitas Otoritas Jasa Keuangan (OJK) - Card 1 Matching Screenshot 1 */}
                <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                  <div className="flex items-center space-x-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#1d4ed8]" />
                    <span>Ikhtisar & Legalitas Otoritas Jasa Keuangan (OJK)</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Sekilas Perusahaan (Company Overview)</label>
                    <textarea
                      rows={4}
                      value={overviewText}
                      onChange={(e) => setOverviewText(e.target.value)}
                      placeholder="PT Mitsui Leasing Capital Indonesia (MLCI) didirikan pada tahun 1992..."
                      className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 font-medium leading-relaxed focus:outline-none focus:border-blue-600 shadow-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Nomor Izin Usaha OJK / Keputusan</label>
                      <input
                        type="text"
                        value={ojkLicense}
                        onChange={(e) => setOjkLicense(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium truncate"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Modal Disetor (Paid-up Capital)</label>
                      <input
                        type="text"
                        value={paidUpCapital}
                        onChange={(e) => setPaidUpCapital(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Modal Dasar (Authorized Capital)</label>
                      <input
                        type="text"
                        value={authorizedCapital}
                        onChange={(e) => setAuthorizedCapital(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Visi & Misi Korporasi - Card 2 Matching Screenshot 2 */}
                <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                  <div className="flex items-center space-x-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                    <Target className="w-4 h-4 text-red-500" />
                    <span>Visi & Misi Korporasi</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Visi Perusahaan</label>
                    <textarea
                      rows={2}
                      value={visionText}
                      onChange={(e) => setVisionText(e.target.value)}
                      placeholder="Menjadi Perusahaan Pembiayaan Terdepan..."
                      className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 font-medium leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Misi Perusahaan (satu poin per baris)</label>
                    <textarea
                      rows={5}
                      value={missionsText}
                      onChange={(e) => setMissionsText(e.target.value)}
                      placeholder="Menyediakan fasilitas pembiayaan otomotif...\nMengembangkan kemitraan strategis..."
                      className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 font-medium leading-relaxed font-sans"
                    />
                  </div>

                  {/* Stat Counter Cards Inputs */}
                  <div className="pt-3 border-t border-slate-200/80 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
                      <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider flex items-center space-x-1.5">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span>Statistik Ringkasan 1 (Kotak Kiri)</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1 space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">Nilai Stat</label>
                          <input
                            type="text"
                            value={stat1Value}
                            onChange={(e) => setStat1Value(e.target.value)}
                            placeholder="30+"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 font-extrabold text-xs"
                          />
                        </div>
                        <div className="col-span-2 space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">Label Keterangan</label>
                          <input
                            type="text"
                            value={stat1Label}
                            onChange={(e) => setStat1Label(e.target.value)}
                            placeholder="TAHUN PENGALAMAN"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 font-semibold text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
                      <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider flex items-center space-x-1.5">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <span>Statistik Ringkasan 2 (Kotak Kanan)</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1 space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">Nilai Stat</label>
                          <input
                            type="text"
                            value={stat2Value}
                            onChange={(e) => setStat2Value(e.target.value)}
                            placeholder="15+"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 font-extrabold text-xs"
                          />
                        </div>
                        <div className="col-span-2 space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">Label Keterangan</label>
                          <input
                            type="text"
                            value={stat2Label}
                            onChange={(e) => setStat2Label(e.target.value)}
                            placeholder="CABANG NASIONAL"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 font-semibold text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Sejarah & Milestone Perusahaan - Card 3 Matching Screenshot 3 */}
                <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                      <Hourglass className="w-4 h-4 text-amber-500" />
                      <span>Sejarah & Milestone Perusahaan ({milestonesList.length} Milestone)</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddMilestone}
                      className="bg-[#0a1633] hover:bg-[#11224f] text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-1 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5 text-blue-400" />
                      <span>+ Tambah Milestone</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {milestonesList.map((m) => (
                      <div
                        key={m.id}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4"
                      >
                        <input
                          type="text"
                          value={m.year}
                          onChange={(e) => handleUpdateMilestone(m.id, 'year', e.target.value)}
                          placeholder="Tahun"
                          className="w-20 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-center font-extrabold text-slate-900 shrink-0"
                        />

                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={m.title}
                            onChange={(e) => handleUpdateMilestone(m.id, 'title', e.target.value)}
                            placeholder="Judul Milestone"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-bold text-slate-900"
                          />
                          <input
                            type="text"
                            value={m.desc}
                            onChange={(e) => handleUpdateMilestone(m.id, 'desc', e.target.value)}
                            placeholder="Deskripsi Milestone"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-600 text-[11px]"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteMilestone(m.id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition shrink-0"
                          title="Hapus Milestone"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Struktur Pemegang Saham - Card 4 Matching Screenshot 4 */}
                <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                      <PieChart className="w-4 h-4 text-emerald-600" />
                      <span>Struktur Pemegang Saham ({shareholdersList.length} Entitas)</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddShareholder}
                      className="bg-[#0a1633] hover:bg-[#11224f] text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-1 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5 text-blue-400" />
                      <span>+ Tambah Pemegang Saham</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {shareholdersList.map((s) => (
                      <div
                        key={s.id}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
                      >
                        <div className="md:col-span-5 space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Nama Entitas</label>
                          <input
                            type="text"
                            value={s.name}
                            onChange={(e) => handleUpdateShareholder(s.id, 'name', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-bold text-slate-900"
                          />
                        </div>

                        <div className="md:col-span-2 space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Kepemilikan (%)</label>
                          <input
                            type="text"
                            value={s.percentage}
                            onChange={(e) => handleUpdateShareholder(s.id, 'percentage', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-center font-extrabold text-slate-900"
                          />
                        </div>

                        <div className="md:col-span-4 space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Kategori / Keterangan</label>
                          <input
                            type="text"
                            value={s.category}
                            onChange={(e) => handleUpdateShareholder(s.id, 'category', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-700"
                          />
                        </div>

                        <div className="md:col-span-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleDeleteShareholder(s.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition"
                            title="Hapus Pemegang Saham"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Manajemen Foto & Anggota Dewan Direksi / Komisaris - Card 5 Matching Screenshot 5 */}
                <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span>Manajemen Foto & Anggota Dewan Direksi / Komisaris ({boardMembersList.length} Pengurus)</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddBoardMember}
                      className="bg-[#0a1633] hover:bg-[#11224f] text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-1 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5 text-blue-400" />
                      <span>+ Tambah Pengurus</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {boardMembersList.map((bm) => (
                      <div
                        key={bm.id}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex space-x-4 relative"
                      >
                        {/* Avatar Image Left */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <img
                            src={bm.avatarUrl}
                            alt={bm.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Member Details */}
                        <div className="flex-1 space-y-2 min-w-0">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Nama Lengkap & Gelar</label>
                            <input
                              type="text"
                              value={bm.name}
                              onChange={(e) => handleUpdateBoardMember(bm.id, 'name', e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-bold text-slate-900 text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Jabatan</label>
                              <input
                                type="text"
                                value={bm.title}
                                onChange={(e) => handleUpdateBoardMember(bm.id, 'title', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-slate-800 text-[11px]"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Kategori</label>
                              <select
                                value={bm.category}
                                onChange={(e) => handleUpdateBoardMember(bm.id, 'category', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 text-slate-800 text-[11px] font-medium"
                              >
                                <option value="Dewan Komisaris (BOC)">Dewan Komisaris (BOC)</option>
                                <option value="Direksi (BOD)">Direksi (BOD)</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase block">Unggah Foto Profil (Avatar)</label>
                            <div className="flex items-center space-x-2">
                              <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1.5 transition">
                                <Upload className="w-3.5 h-3.5 text-blue-600" />
                                <span>{uploading ? 'Mengunggah...' : 'PILIH FILE FOTO'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleBoardMemberFileUpload(bm.id, e)}
                                  className="hidden"
                                />
                              </label>
                              <span className="text-[10px] text-slate-400 font-mono truncate max-w-[130px]">
                                {bm.avatarUrl ? '✓ File Terpasang' : 'Belum ada foto'}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Bio / Deskripsi Pengalaman</label>
                            <textarea
                              rows={2}
                              value={bm.bio || ''}
                              onChange={(e) => handleUpdateBoardMember(bm.id, 'bio', e.target.value)}
                              placeholder="Ringkasan pengalaman & keahlian..."
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 text-[11px] font-medium leading-relaxed"
                            />
                          </div>
                        </div>

                        {/* Delete Button Top Right */}
                        <button
                          type="button"
                          onClick={() => handleDeleteBoardMember(bm.id)}
                          className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition"
                          title="Hapus Pengurus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Struktur Organisasi & Flowchart Departemen - Card 6 Matching Screenshots 7 & 8 */}
                <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                      <Landmark className="w-4 h-4 text-blue-700" />
                      <span>Struktur Organisasi & Flowchart Departemen ({departmentsList.length} Divisi)</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddDepartment}
                      className="bg-[#0a1633] hover:bg-[#11224f] text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-1 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5 text-blue-400" />
                      <span>+ Tambah Departemen</span>
                    </button>
                  </div>

                  {/* Pengaturan Puncak Bagan Org Chart (RUPS, Direktur Utama, & Komite BOC) */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="text-[11px] font-extrabold text-blue-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                      Pengaturan Puncak Bagan Flowchart (RUPS, Direktur Utama, & Komite BOC)
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">RUPS (General Meeting Title)</label>
                        <input
                          type="text"
                          value={gmsTitle}
                          onChange={(e) => setGmsTitle(e.target.value)}
                          placeholder="General Meeting of Shareholders"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900 font-bold text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Direktur Utama (President Director)</label>
                        <input
                          type="text"
                          value={presDirTitle}
                          onChange={(e) => setPresDirTitle(e.target.value)}
                          placeholder="President Director"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900 font-bold text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Internal Audit Title</label>
                        <input
                          type="text"
                          value={internalAuditTitle}
                          onChange={(e) => setInternalAuditTitle(e.target.value)}
                          placeholder="Internal Audit"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900 font-bold text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Judul Dewan Komisaris (BOC Box)</label>
                        <input
                          type="text"
                          value={bocTitle}
                          onChange={(e) => setBocTitle(e.target.value)}
                          placeholder="Board of Commissioners"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900 font-bold text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Komite di Bawah BOC (satu per baris)</label>
                        <textarea
                          rows={2}
                          value={bocCommittees}
                          onChange={(e) => setBocCommittees(e.target.value)}
                          placeholder="Audit Committee&#10;Risk Monitoring Committee&#10;Remuneration and Nomination"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 text-[11px] font-medium leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {departmentsList.map((d) => (
                      <div
                        key={d.id}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Nama Departemen</label>
                            <input
                              type="text"
                              value={d.name}
                              onChange={(e) => handleUpdateDepartment(d.id, 'name', e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-extrabold text-slate-900"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Pimpinan (Chief Title)</label>
                            <input
                              type="text"
                              value={d.leaderTitle}
                              onChange={(e) => handleUpdateDepartment(d.id, 'leaderTitle', e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-medium text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Sub-Departemen / Bagian (pisahkan dengan koma atau baris baru)</label>
                          <textarea
                            rows={2}
                            value={d.subDepts}
                            onChange={(e) => handleUpdateDepartment(d.id, 'subDepts', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 text-[11px]"
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleDeleteDepartment(d.id)}
                            className="text-red-600 hover:text-red-800 text-[11px] font-bold flex items-center space-x-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus Departemen</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. Slider Foto Perusahaan - Card 7 Matching Screenshots 8 & 9 */}
                <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                      <Camera className="w-4 h-4 text-emerald-600" />
                      <span>Slider Foto Perusahaan ({officePhotosList.length} Foto)</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddOfficePhoto}
                      className="bg-[#0a1633] hover:bg-[#11224f] text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-1 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5 text-blue-400" />
                      <span>+ Tambah Foto Slider</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {officePhotosList.map((op) => (
                      <div
                        key={op.id}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex space-x-4 relative items-center"
                      >
                        {/* Photo Thumbnail Left */}
                        <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <img
                            src={op.url}
                            alt={op.caption}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Photo Fields */}
                        <div className="flex-1 space-y-2 min-w-0 pr-6">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Keterangan / Caption Foto</label>
                            <input
                              type="text"
                              value={op.caption}
                              onChange={(e) => handleUpdateOfficePhoto(op.id, 'caption', e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-extrabold text-slate-900 text-xs"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase block">Unggah File Gambar Slider</label>
                            <div className="flex items-center space-x-2">
                              <label className="cursor-pointer bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1.5 transition">
                                <Upload className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{uploading ? 'Mengunggah...' : 'PILIH FILE GAMBAR'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleOfficePhotoFileUpload(op.id, e)}
                                  className="hidden"
                                />
                              </label>
                              <span className="text-[10px] text-slate-400 font-mono truncate max-w-[120px]">
                                {op.url ? '✓ File Terpasang' : 'Belum ada foto'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Delete Icon Top Right */}
                        <button
                          type="button"
                          onClick={() => handleDeleteOfficePhoto(op.id)}
                          className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition"
                          title="Hapus Foto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 8. Laporan Keuangan & Sustainability (Public PDF Reports) - Card 8 */}
                <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                  <div className="flex items-center space-x-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-blue-700" />
                    <span>Laporan Keuangan & Keberlanjutan (PDF Dokumen Publik)</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Report 1 Card */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                      <div className="text-xs font-extrabold text-blue-900 uppercase tracking-wider border-b border-slate-100 pb-1.5">
                        Dokumen Laporan 1
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Judul Dokumen Laporan 1</label>
                        <input
                          type="text"
                          value={report1Title}
                          onChange={(e) => setReport1Title(e.target.value)}
                          placeholder="Annual Report MLCI 2025"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-extrabold text-slate-900 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase block">Unggah Dokumen PDF (PDF Only)</label>
                        <div className="flex items-center space-x-2">
                          <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-[11px] font-bold px-3 py-2 rounded-xl flex items-center space-x-1.5 transition">
                            <Upload className="w-3.5 h-3.5 text-blue-600" />
                            <span>{uploading ? 'Mengunggah...' : 'UNGGAH FILE PDF 1'}</span>
                            <input
                              type="file"
                              accept="application/pdf"
                              onChange={(e) => handlePdfFileUpload(1, e)}
                              className="hidden"
                            />
                          </label>
                          <span className="text-[10px] text-slate-400 font-mono truncate max-w-[140px]">
                            {report1PdfUrl ? '✓ PDF Terpasang' : 'Belum ada PDF'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Report 2 Card */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                      <div className="text-xs font-extrabold text-blue-900 uppercase tracking-wider border-b border-slate-100 pb-1.5">
                        Dokumen Laporan 2
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Judul Dokumen Laporan 2</label>
                        <input
                          type="text"
                          value={report2Title}
                          onChange={(e) => setReport2Title(e.target.value)}
                          placeholder="Sustainability Report (ESG) 2025"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-extrabold text-slate-900 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase block">Unggah Dokumen PDF (PDF Only)</label>
                        <div className="flex items-center space-x-2">
                          <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-[11px] font-bold px-3 py-2 rounded-xl flex items-center space-x-1.5 transition">
                            <Upload className="w-3.5 h-3.5 text-blue-600" />
                            <span>{uploading ? 'Mengunggah...' : 'UNGGAH FILE PDF 2'}</span>
                            <input
                              type="file"
                              accept="application/pdf"
                              onChange={(e) => handlePdfFileUpload(2, e)}
                              className="hidden"
                            />
                          </label>
                          <span className="text-[10px] text-slate-400 font-mono truncate max-w-[140px]">
                            {report2PdfUrl ? '✓ PDF Terpasang' : 'Belum ada PDF'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Save Button matching Screenshot 9 */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#0a1633] hover:bg-[#11224f] text-white font-extrabold px-8 py-3.5 rounded-2xl transition text-xs shadow-lg uppercase tracking-wider flex items-center space-x-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{loading ? 'Menyimpan Ke PostgreSQL...' : '✓ SIMPAN & PUBLIKASIKAN PERUBAHAN PROFIL KORPORAT'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: ARTIKEL & TIPS (MATCHING USER SCREENSHOTS 1 & 2 100%) */}
          {activeTab === 'artikel' && (
            <div className="space-y-8">
              {/* Form Card Top: Tulis Artikel, Panduan, atau Tips & Trik Baru */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-base">
                      <span>{editingArticleId ? '✏️ Edit Artikel / Tips & Trik' : '📝 Tulis Artikel, Panduan, atau Tips & Trik Baru'}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      Konten artikel langsung tayang pada halaman publik untuk edukasi debitur dan SEO korporat.
                    </p>
                  </div>
                  {editingArticleId && (
                    <button
                      onClick={resetArticleForm}
                      className="text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200"
                    >
                      Batal Mode Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveArticle} className="space-y-5 text-xs">
                  {/* Row 1: Judul Artikel (2/3) & Kategori Konten (1/3) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="font-bold text-slate-700 uppercase tracking-wider block">
                        Judul Artikel / Tips *
                      </label>
                      <input
                        type="text"
                        value={artTitle}
                        onChange={(e) => setArtTitle(e.target.value)}
                        placeholder="cth: 5 Tips Efektif Menjaga Performa Mesin Truk Ekspedisi"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-900 text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 uppercase tracking-wider block">
                        Kategori Konten *
                      </label>
                      <select
                        value={artCategory}
                        onChange={(e) => setArtCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-800 text-xs cursor-pointer"
                      >
                        <option value="Promo">🏷️ Promo & Penawaran</option>
                        <option value="Tips & Trik">💡 Tips & Trik</option>
                        <option value="Edukasi Finansial">📘 Edukasi Finansial</option>
                        <option value="Berita Korporasi">🏢 Berita Korporasi</option>
                        <option value="Panduan Layanan">📜 Panduan Layanan</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Excerpt */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider block">
                      Ringkasan Singkat (Excerpt) *
                    </label>
                    <textarea
                      rows={2}
                      value={artExcerpt}
                      onChange={(e) => setArtExcerpt(e.target.value)}
                      placeholder="Ringkasan 1-2 kalimat yang tampil di kartu daftar artikel..."
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 font-medium leading-relaxed"
                    />
                  </div>

                  {/* Row 3: Full Content */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider block">
                      Isi Lengkap Artikel (Tips / Panduan / Ulasan) *
                    </label>
                    <textarea
                      rows={5}
                      value={artContent}
                      onChange={(e) => setArtContent(e.target.value)}
                      placeholder="Tuliskan isi panduan lengkap, langkah-langkah tips, atau rincian berita di sini..."
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 font-medium leading-relaxed font-mono text-[11px]"
                    />
                  </div>

                  {/* Row 4: Cover Upload, Author, Read Time, Status */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 uppercase tracking-wider block">
                        URL Foto Cover
                      </label>
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          value={artCoverUrl}
                          onChange={(e) => setArtCoverUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono text-[11px] text-slate-800"
                        />
                        <div className="flex items-center space-x-2">
                          <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-[10px] font-bold px-2.5 py-1.5 rounded-xl flex items-center space-x-1 transition">
                            <Upload className="w-3 h-3 text-blue-600" />
                            <span>{uploading ? 'Uploading...' : 'UNGGAH FILE'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleArticleCoverUpload}
                              className="hidden"
                            />
                          </label>
                          <span className="text-[10px] text-slate-400 font-mono truncate">
                            {artCoverUrl ? '✓ Terpasang' : 'Belum ada'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 uppercase tracking-wider block">
                        Penulis / Divisi
                      </label>
                      <input
                        type="text"
                        value={artAuthor}
                        onChange={(e) => setArtAuthor(e.target.value)}
                        placeholder="Divisi Marketing & Fleet"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold text-slate-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 uppercase tracking-wider block">
                        Estimasi Waktu Baca
                      </label>
                      <input
                        type="text"
                        value={artReadTime}
                        onChange={(e) => setArtReadTime(e.target.value)}
                        placeholder="3 min baca"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold text-slate-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 uppercase tracking-wider block">
                        Status Publikasi
                      </label>
                      <select
                        value={artStatus}
                        onChange={(e) => setArtStatus(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-bold text-slate-900"
                      >
                        <option value="PUBLISHED">🟢 Langsung Tayang (Published)</option>
                        <option value="DRAFT">🔴 Draft (Disimpan)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Tags */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider block">
                      Tagar / Kategori Pencarian (Pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      value={artTags}
                      onChange={(e) => setArtTags(e.target.value)}
                      placeholder="Promo, Mobil Baru, Bunga Rendah"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-semibold text-slate-800"
                    />
                  </div>

                  {/* Row 6: Submit Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#0e1e45] hover:bg-[#162d66] text-white font-extrabold px-8 py-3.5 rounded-2xl transition text-xs shadow-lg uppercase tracking-wider flex items-center space-x-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{editingArticleId ? '✓ Simpan Perubahan Artikel' : '+ Publikasikan Artikel Sekarang'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Table Card Bottom: Daftar Artikel & Tips yang Tersedia */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">
                      Daftar Artikel & Tips yang Tersedia ({articlesList.length})
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Kelola artikel terbitan untuk edukasi publik dan literasi keuangan OJK.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px]">
                      <tr>
                        <th className="p-3">Cover</th>
                        <th className="p-3">Judul & Cuplikan</th>
                        <th className="p-3">Kategori</th>
                        <th className="p-3">Penulis & Tanggal</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {articlesList.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition">
                          <td className="p-3">
                            <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                              <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="p-3 max-w-md">
                            <div className="font-extrabold text-slate-900 line-clamp-1">{item.title}</div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.excerpt}</div>
                          </td>
                          <td className="p-3">
                            <span className="bg-blue-100 text-blue-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-blue-200">
                              {item.category}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-slate-800 text-[11px]">{item.author}</div>
                            <div className="text-[10px] text-slate-400 font-medium">{item.date} • {item.readTime}</div>
                          </td>
                          <td className="p-3">
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-200">
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() => alert(`Preview Artikel:\n\n${item.title}\n\n${item.content || item.excerpt}`)}
                                className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
                                title="Lihat Pratinjau"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEditArticle(item)}
                                className="p-1.5 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition"
                                title="Edit Artikel"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(item.id)}
                                className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition"
                                title="Hapus Artikel"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* OTHER TABS: PARAMETER SUKU BUNGA */}
          {activeTab === 'bunga' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Form Edit Modul: <span className="text-[#1d4ed8]">{currentSectionCode}</span>
                    </h3>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-200">
                    PUBLISHED
                  </span>
                </div>

                <form onSubmit={handleSaveSection} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider">Sub-Badge Text</label>
                    <input
                      type="text"
                      value={badgeText}
                      onChange={(e) => setBadgeText(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider">Judul Utama Modul *</label>
                    <input
                      type="text"
                      value={titleText}
                      onChange={(e) => setTitleText(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-extrabold text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider">Deskripsi Penjelas Modul *</label>
                    <textarea
                      rows={5}
                      value={descriptionText}
                      onChange={(e) => setDescriptionText(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 font-medium leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1d4ed8] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition text-xs shadow-md uppercase tracking-wider flex items-center justify-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan Ke PostgreSQL</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB: MASTER MENUS MANAGER */}
          {activeTab === 'master_menus' && (
            <div className="bg-[#ffffff] rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Pengaturan Master Navigation Menu Website</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3">Urutan (Sort)</th>
                      <th className="p-3">Nama Menu</th>
                      <th className="p-3">URL Link</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {menus.map((m) => (
                      <tr key={m.id}>
                        <td className="p-3 font-bold text-[#1d4ed8]">{m.sort_order}</td>
                        <td className="p-3 font-bold text-slate-900">{m.name}</td>
                        <td className="p-3 text-slate-500">{m.url}</td>
                        <td className="p-3">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: LOGO ICON & HEADER WEBSITE MANAGER */}
          {activeTab === 'logo_header' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
                    <Camera className="w-5 h-5 text-blue-700" />
                    <span>Pengaturan Logo Icon & Header Website</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Kelola logo icon resmi PT Mitsui Leasing Capital Indonesia yang tampil di bar navigasi utama landing page.
                  </p>
                </div>
              </div>

              {/* Form for Logo Upload & Live Preview */}
              <form onSubmit={handleSaveSection} className="space-y-6 text-xs">
                <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200 space-y-6">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800 text-sm flex items-center space-x-2">
                      <span>Logo Icon Navigasi Header</span>
                    </label>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Unggah gambar logo icon perusahaan. Gambar ini akan langsung menggantikan logo icon "M" pada bar navigasi paling atas di website utama.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center space-x-4">
                      {/* Large Square Preview Box */}
                      <div className="w-16 h-16 bg-[#0f285c] rounded-xl flex items-center justify-center font-bold text-white text-2xl shadow-md overflow-hidden shrink-0 border-2 border-blue-900">
                        {logoUrl && (logoUrl.startsWith('http') || logoUrl.startsWith('/') || logoUrl.startsWith('data:')) ? (
                          <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                        ) : (
                          logoUrl || 'M'
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="font-extrabold text-slate-900 text-sm">
                          {logoUrl ? 'Logo Icon Kustom Terpasang' : 'Logo Icon Default ("M")'}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          Rekomendasi format: PNG transparan, JPG, atau WebP (Rasio 1:1, min. 200x200px)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                      {logoUrl && (
                        <button
                          type="button"
                          onClick={() => setLogoUrl('')}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 border border-slate-200 transition cursor-pointer"
                          title="Hapus logo & kembali ke default M"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                          <span>Reset Ke Default (M)</span>
                        </button>
                      )}

                      <label className="bg-blue-900 hover:bg-blue-950 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 cursor-pointer shrink-0 shadow-md transition">
                        <Upload className="w-4 h-4" />
                        <span>{logoUrl ? 'Ganti File Logo' : 'Unggah Logo Baru'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Real-time Header Preview Mockup */}
                  <div className="space-y-2 pt-2">
                    <div className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                      Pratinjau Tampilan Header Website (Simulasi Live)
                    </div>
                    <div className="bg-[#0b1b3d] text-white text-[11px] py-1.5 px-4 rounded-t-xl flex justify-between items-center">
                      <span>PT Mitsui Leasing Capital Indonesia (MLCI) • Afiliasi Mitsui & Co., Ltd.</span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-700">ID ▾</span>
                    </div>
                    <div className="bg-white p-4 rounded-b-xl border border-slate-200 flex items-center justify-between shadow-xs">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#0f285c] rounded-md flex items-center justify-center font-bold text-white text-xl shadow-md border border-blue-900 overflow-hidden">
                          {logoUrl && (logoUrl.startsWith('http') || logoUrl.startsWith('/') || logoUrl.startsWith('data:')) ? (
                            <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                          ) : (
                            logoUrl || 'M'
                          )}
                        </div>
                        <div className="leading-tight">
                          <div className="font-extrabold text-[#0f285c] text-base tracking-wider">
                            MITSUI <span className="font-bold text-[#1e3a8a]">LEASING</span>
                          </div>
                          <div className="text-[9px] tracking-widest text-slate-500 uppercase font-semibold">
                            CAPITAL INDONESIA
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:flex items-center space-x-4 text-xs font-semibold text-slate-600">
                        <span className="text-blue-900 font-bold border-b-2 border-blue-900 pb-0.5">Beranda</span>
                        <span>Perusahaan</span>
                        <span>Produk Pembiayaan</span>
                        <span>Simulasi Kredit</span>
                        <span>Cabang & Peta</span>
                        <span>Artikel & Promo</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={loading || uploading}
                    className="bg-blue-900 hover:bg-blue-950 text-white font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-lg transition flex items-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Pengaturan Logo Ke PostgreSQL</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
