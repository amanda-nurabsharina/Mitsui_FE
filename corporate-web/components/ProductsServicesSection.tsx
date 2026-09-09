'use client';

import React from 'react';
import { PageSection } from '@/lib/api-client';
import { Car, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProductsServicesProps {
  section?: PageSection;
}

export default function ProductsServicesSection({ section }: ProductsServicesProps) {
  const badgeText = section?.badge_text || 'FOKUS BISNIS KAMI';
  const title = section?.title || 'Layanan & Produk Pembiayaan';
  const description =
    section?.description ||
    'Kami membagi fokus pembiayaan kami menjadi dua pilar utama untuk memberikan solusi paling tepat sasaran bagi setiap segmen pelanggan.';

  let payload: any = {};
  if (section?.content_payload) {
    try {
      payload = JSON.parse(section.content_payload);
    } catch (e) {
      console.error('Failed to parse products_services payload:', e);
    }
  }

  const retail = payload.retail || {};
  const corporate = payload.corporate || {};

  const retailTitle = retail.title || 'Pembiayaan Konsumen (Retail)';
  const retailBadge = retail.badge || 'Individu / Perorangan';
  const retailDesc =
    retail.description ||
    'Fasilitas pembiayaan khusus untuk kepemilikan kendaraan roda empat bagi individu dengan suku bunga kompetitif dan tenor fleksibel yang disesuaikan dengan kapasitas finansial Anda.';
  const retailItem1Title = retail.item1_title || 'Pembiayaan Mobil Baru';
  const retailItem1Desc =
    retail.item1_desc || 'Bekerja sama dengan dealer resmi (ATPM) berbagai merk terkemuka di Indonesia.';
  const retailItem2Title = retail.item2_title || 'Pembiayaan Mobil Bekas';
  const retailItem2Desc =
    retail.item2_desc || 'Solusi cerdas untuk mendapatkan mobil idaman dari showroom terpercaya pilihan Anda.';
  const retailCtaText = retail.cta_text || 'AJUKAN PEMBIAYAAN RETAIL';
  const retailCtaUrl = retail.cta_url || '#simulasi';

  const corporateTitle = corporate.title || 'Pembiayaan Korporasi (Commercial)';
  const corporateBadge = corporate.badge || 'Badan Usaha / Komersial';
  const corporateDesc =
    corporate.description ||
    'Solusi pembiayaan produktif yang ditujukan untuk badan usaha. Kami mendukung ekspansi bisnis Anda melalui skema investasi, modal kerja, maupun fleet kendaraan operasional.';
  const corporateItem1Title = corporate.item1_title || 'Pembiayaan Investasi';
  const corporateItem1Desc =
    corporate.item1_desc || 'Pembelian barang modal seperti Alat Berat (Excavator, Bulldozer) dan Mesin Industri manufaktur.';
  const corporateItem2Title = corporate.item2_title || 'Pembiayaan Modal Kerja & Fleet';
  const corporateItem2Desc =
    corporate.item2_desc || 'Fasilitas Sale & Leaseback serta pembiayaan armada kendaraan komersial (Truk, Pickup, Minibus).';
  const corporateCtaText = corporate.cta_text || 'AJUKAN PEMBIAYAAN KORPORAT';
  const corporateCtaUrl = corporate.cta_url || '#ajukan-korporat';

  return (
    <section id="produk" className="py-16 bg-white font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block bg-blue-100 text-[#0f285c] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {badgeText}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Dual Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Retail */}
          <div className="bg-blue-50/40 rounded-3xl p-6 sm:p-8 border border-blue-100/80 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#0f285c] rounded-2xl flex items-center justify-center text-white shadow-md">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{retailTitle}</h3>
                  <span className="text-xs text-blue-800 font-semibold">{retailBadge}</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {retailDesc}
              </p>

              {/* Sub items */}
              <div className="space-y-3 pt-2">
                <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-xs flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{retailItem1Title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{retailItem1Desc}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-xs flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{retailItem2Title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{retailItem2Desc}</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={retailCtaUrl}
              className="w-full bg-[#0f285c] hover:bg-[#16387d] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition shadow-sm"
            >
              <span>{retailCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Card 2: Commercial */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-md">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{corporateTitle}</h3>
                  <span className="text-xs text-slate-600 font-semibold">{corporateBadge}</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {corporateDesc}
              </p>

              {/* Sub items */}
              <div className="space-y-3 pt-2">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{corporateItem1Title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{corporateItem1Desc}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{corporateItem2Title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{corporateItem2Desc}</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={corporateCtaUrl}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition shadow-sm"
            >
              <span>{corporateCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
