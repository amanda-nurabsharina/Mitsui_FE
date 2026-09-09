'use client';

import React, { useState } from 'react';
import { PageSection, Article } from '@/lib/api-client';
import { Clock, User, ArrowRight, BookOpen, X, Tag } from 'lucide-react';

interface ArticlesSectionProps {
  section?: PageSection;
  articles?: Article[];
}

export default function ArticlesSection({ section, articles }: ArticlesSectionProps) {
  const badgeText = section?.badge_text || 'PUSAT INFORMASI, EDUKASI & PROMO';
  const title = section?.title || 'Artikel, Tips & Trik Otomotif Terkini';
  const description =
    section?.description ||
    'Dapatkan panduan finansial dari OJK, tips perawatan armada bisnis dan mobil keluarga, serta informasi promo kredit suku bunga rendah.';

  const defaultArticles: any[] = [
    {
      id: 1,
      category_id: 1,
      title: 'Promo Spesial Kemerdekaan: Bunga Super Ringan 6.8% Flat p.a.',
      slug: 'promo-spesial-kemerdekaan',
      excerpt: 'Nikmati penawaran bunga paling kompetitif tahun ini khusus untuk kendaraan penumpang baru, berlaku hingga akhir bulan Agustus 2026.',
      content: `Dapatkan fasilitas pembiayaan spesial dari PT Mitsui Leasing Capital Indonesia dalam rangka memeriahkan bulan kemerdekaan. Kami menghadirkan program suku bunga mulai dari 6.8% flat per tahun dengan uang muka ringan mulai 20%.

Keunggulan Program:
1. Proses persetujuan kilat via digital onboarding (e-KYC).
2. Bebas biaya provisi untuk 100 pengajuan pertama.
3. Perlindungan asuransi All Risk komprehensif selama tenor pembiayaan.

Syarat dan Ketentuan:
• Berlaku untuk seluruh merek kendaraan penumpang ATPM resmi di Indonesia.
• Tenor pembiayaan tersedia dari 12 hingga 60 bulan.
• Pengajuan dapat dilakukan langsung melalui website resmi atau kunjungi kantor cabang terdekat.`,
      thumbnail_url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop',
      read_time: '3 min baca',
      author_name: 'Tim Marketing MLCI',
      badge_text: 'PROMO',
      status: 'published',
      published_at: '2026-08-10',
      tags: ['#Promo', '#MobilBaru', '#BungaRendah'],
    },
    {
      id: 2,
      category_id: 2,
      title: '5 Tips Efektif Merawat Armada Truk dan Niaga di Musim Hujan',
      slug: '5-tips-efektif-merawat-armada-truk',
      excerpt: 'Pastikan rantai pasokan logistik bisnis Anda lancar tanpa kendala dengan perawatan preventif komponen kendaraan.',
      content: `Musim hujan menghadirkan tantangan tersendiri bagi operasional kendaraan niaga dan komersial. Pemeriksaan rem, kondisi ban, serta kelistrikan wajib dilakukan berkala agar kendaraan bebas mogok.

Panduan Perawatan Rutin:
1. Inspeksi Alur dan Tekanan Angin Ban: Pastikan kedalaman alur ban masih memenuhi batasan aman untuk mencegah aquaplaning.
2. Pemeriksaan Sistem Pengereman: Bersihkan tromol dan kampas rem dari kontaminasi lumpur dan air hujan.
3. Pelumasan Komponen Chasis dan Engsel: Semprotkan pelumas anti-karat pada bagian suspensi dan sistem penggerak roda.
4. Cek Sistem Kelistrikan dan Lampu Utama: Pastikan seluruh lampu hazard, lampu rem, dan wiper bekerja optimal.`,
      thumbnail_url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop',
      read_time: '4 min baca',
      author_name: 'Divisi Fleet Management',
      badge_text: 'TIPS & TRIK',
      status: 'published',
      published_at: '2026-08-12',
      tags: ['#TipsTrik', '#KendaraanNiaga', '#FleetMaintenance'],
    },
    {
      id: 3,
      category_id: 3,
      title: 'Edukasi OJK: Cara Cerdas Menghitung Kemampuan Cicilan Kendaraan',
      slug: 'edukasi-ojk-cara-cerdas-menghitung-cicilan',
      excerpt: 'Pahami rasio Debt Service Ratio (DSR) ideal agar cicilan kendaraan tidak mengganggu cash flow keluarga.',
      content: `Sebagai bagian dari prinsip perlindungan konsumen dan edukasi literasi keuangan OJK, calon debitur disarankan untuk menghitung kemampuan angsuran secara cermat sebelum mengajukan pembiayaan kredit.

Rekomendasi Batas Aman DSR:
• Total seluruh cicilan hutang bulanan sebaiknya tidak melebihi 30% - 35% dari pendapatan bersih per bulan (Take Home Pay).
• Sisihkan minimal 10% pendapatan untuk dana darurat dan tabungan operasional.
• Gunakan kalkulator simulasi kredit MLCI untuk memperhitungkan estimasi uang muka dan angsuran bulanan secara akurat.`,
      thumbnail_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
      read_time: '5 min baca',
      author_name: 'Compliance & Literasi Keuangan',
      badge_text: 'EDUKASI FINANSIAL',
      status: 'published',
      published_at: '2026-08-14',
      tags: ['#EdukasiFinansial', '#LiterasiOJK', '#SimulasiKredit'],
    },
  ];

  let payload: any = {};
  if (section?.content_payload) {
    try {
      payload = JSON.parse(section.content_payload);
    } catch (e) {
      console.error('Failed to parse articles_news payload:', e);
    }
  }

  const activeArticles =
    Array.isArray(payload.articles) && payload.articles.length > 0
      ? payload.articles
      : articles && articles.length > 0
      ? articles
      : defaultArticles;
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const categories = ['Semua', 'Tips & Trik', 'Promo', 'Edukasi Finansial'];

  const getBadgeBgColor = (article: any) => {
    const cat = (article.badge_text || article.category || '').toLowerCase();
    if (cat.includes('tips')) return 'bg-amber-500';
    if (cat.includes('edukasi')) return 'bg-blue-600';
    return 'bg-red-600';
  };

  const getArticleTags = (article: any): string[] => {
    if (!article) return ['#Promo', '#MobilBaru', '#BungaRendah'];
    if (Array.isArray(article.tags) && article.tags.length > 0) {
      return article.tags;
    }
    if (typeof article.tags === 'string' && article.tags.trim() !== '') {
      return article.tags.split(',').map((t: string) => t.trim());
    }

    const cat = (article.badge_text || article.category || '').toLowerCase();
    if (cat.includes('tips')) {
      return ['#Tips & Trik', '#Armada Niaga', '#Perawatan Kendaraan'];
    }
    if (cat.includes('edukasi')) {
      return ['#Edukasi', '#OJK', '#Literasi Keuangan'];
    }
    return ['#Promo', '#MobilBaru', '#BungaRendah'];
  };

  const filteredArticles =
    selectedCategory === 'Semua'
      ? activeArticles
      : activeArticles.filter((item: any) => {
          const categoryStr = (item.badge_text || item.category || '').toLowerCase();
          return categoryStr.includes(selectedCategory.toLowerCase());
        });

  return (
    <section id="artikel" className="py-16 bg-slate-100 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-block bg-blue-100 text-[#0f285c] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {badgeText}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              {description}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-[#0f285c] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article: any) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img
                    src={article.thumbnail_url || article.coverUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {(article.badge_text || article.category) && (
                    <span className={`absolute top-3 left-3 ${getBadgeBgColor(article)} text-white text-[10px] font-black uppercase px-2.5 py-1 rounded tracking-wide shadow`}>
                      {article.badge_text || article.category}
                    </span>
                  )}
                </div>

                {/* Metadata & Title */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center space-x-3 text-slate-400 text-xs font-medium">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{article.read_time || article.readTime || '3 min baca'}</span>
                    </div>
                    <span>•</span>
                    <span>{article.published_at || article.date ? (article.published_at || article.date).substring(0, 10) : '2026-08-10'}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base group-hover:text-[#0f285c] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Tag Pills matching Screenshot 2 */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {getArticleTags(article).map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200/60"
                      >
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author & Footer Link */}
              <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5 text-slate-500 font-medium truncate max-w-[170px]">
                  <User className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                  <span className="truncate">{article.author_name || article.author || 'Tim Redaksi MLCI'}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="font-extrabold text-[#0f285c] hover:text-blue-700 flex items-center space-x-1 text-xs shrink-0 cursor-pointer transition"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL POPUP: DETAIL ARTIKEL, TIPS & PROMO (MATCHING USER SCREENSHOT 100%) */}
      {/* ========================================================================= */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-100 animate-scaleUp my-auto max-h-[92vh] flex flex-col">
            {/* Hero Cover Header with Dark Overlay */}
            <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900 shrink-0">
              <img
                src={selectedArticle.thumbnail_url || selectedArticle.coverUrl}
                alt={selectedArticle.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Close Button Top Right */}
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer z-10"
                title="Tutup Artikel"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badge & Title Bottom Left Over Cover */}
              <div className="absolute bottom-5 left-5 right-5 space-y-2 text-white">
                {(selectedArticle.badge_text || selectedArticle.category) && (
                  <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded tracking-wide shadow-md inline-block">
                    {selectedArticle.badge_text || selectedArticle.category}
                  </span>
                )}
                <h2 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-md">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            {/* Metadata Sub-Header Bar */}
            <div className="bg-slate-50 px-6 sm:px-8 py-3 border-b border-slate-200/80 flex flex-wrap justify-between items-center text-xs text-slate-500 font-semibold shrink-0 gap-2">
              <div className="flex items-center space-x-2">
                <User className="w-3.5 h-3.5 text-blue-700" />
                <span className="font-bold text-slate-800">{selectedArticle.author_name || selectedArticle.author || 'Tim Redaksi MLCI'}</span>
                <span>•</span>
                <span>{selectedArticle.published_at || selectedArticle.date || '2026-08-10'}</span>
              </div>
              <div className="flex items-center space-x-1 text-slate-600 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Waktu Baca: {selectedArticle.read_time || selectedArticle.readTime || '3 min baca'}</span>
              </div>
            </div>

            {/* Modal Body Content (Scrollable) */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 leading-relaxed text-slate-700 text-xs sm:text-sm">
              {/* Highlighted Excerpt Callout Box */}
              {selectedArticle.excerpt && (
                <div className="bg-blue-50/70 border-l-4 border-blue-600 p-4 rounded-r-2xl text-slate-800 font-bold text-xs sm:text-sm leading-relaxed shadow-2xs">
                  {selectedArticle.excerpt}
                </div>
              )}

              {/* Full Paragraph Content */}
              <div className="whitespace-pre-line text-slate-700 leading-relaxed font-normal space-y-4">
                {selectedArticle.content || selectedArticle.excerpt}
              </div>

              {/* Related Tags */}
              <div className="pt-4 border-t border-slate-100 flex items-center space-x-2 flex-wrap gap-y-2">
                <div className="flex items-center space-x-1 text-xs font-bold text-slate-500 mr-2">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span>Topik Terkait:</span>
                </div>
                {getArticleTags(selectedArticle).map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-slate-100 text-slate-700 text-[11px] font-bold px-3 py-1 rounded-xl border border-slate-200/80"
                  >
                    {tag.startsWith('#') ? tag : `#${tag}`}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <span className="text-[11px] text-slate-400 font-semibold hidden sm:inline-block">
                PT Mitsui Leasing Capital Indonesia • Edukasi & Publikasi Resmi
              </span>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="bg-[#1e3a8a] hover:bg-[#0a1633] text-white font-extrabold text-xs px-7 py-3 rounded-xl transition shadow-md cursor-pointer ml-auto"
              >
                Tutup Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
