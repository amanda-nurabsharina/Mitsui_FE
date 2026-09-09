'use client';

import React from 'react';
import { PageSection } from '@/lib/api-client';
import {
  ShieldCheck,
  FileText,
  Zap,
  MapPin,
  Award,
  Star,
  CheckCircle,
  Clock,
  Lock,
  ThumbsUp,
  TrendingUp,
  Users,
  Building,
  LucideIcon,
} from 'lucide-react';

interface ValuePropsProps {
  section?: PageSection;
}

const ICON_MAP: Record<string, LucideIcon> = {
  ShieldCheck,
  FileText,
  Zap,
  MapPin,
  Award,
  Star,
  CheckCircle,
  Clock,
  Lock,
  ThumbsUp,
  TrendingUp,
  Users,
  Building,
};

export default function ValuePropositionsSection({ section }: ValuePropsProps) {
  const badgeText = section?.badge_text || 'NILAI UTAMA KAMI';
  const title = section?.title || 'Mengapa Memilih Mitsui Leasing?';
  const description =
    section?.description ||
    'Keunggulan kami sebagai mitra finansial terpercaya untuk kebutuhan personal dan bisnis Anda.';

  const defaultFeatures = [
    {
      icon: ShieldCheck,
      title: 'Terdaftar di OJK',
      desc: 'Resmi berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK).',
    },
    {
      icon: FileText,
      title: 'Syarat Mudah',
      desc: 'Persyaratan dokumen yang fleksibel dengan bantuan konsultan finansial.',
    },
    {
      icon: Zap,
      title: 'Proses Cepat',
      desc: 'Persetujuan kredit kilat dengan estimasi keputusan instan.',
    },
    {
      icon: MapPin,
      title: 'Jaringan Luas',
      desc: 'Didukung jaringan cabang dan mitra dealer otomotif resmi nasional.',
    },
  ];

  let features = defaultFeatures;

  if (section?.content_payload) {
    try {
      const parsed = JSON.parse(section.content_payload);
      if (Array.isArray(parsed.items) && parsed.items.length > 0) {
        features = parsed.items.map((item: any) => {
          const IconComp = (item.icon && ICON_MAP[item.icon]) ? ICON_MAP[item.icon] : ShieldCheck;
          return {
            icon: IconComp,
            title: item.title || '',
            desc: item.desc || item.description || '',
          };
        });
      }
    } catch (e) {
      console.error('Failed to parse value_propositions content_payload:', e);
    }
  }

  return (
    <section className="py-16 bg-[#07132b] text-white font-sans border-t border-blue-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block bg-blue-900/80 text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-700/50">
            {badgeText}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center space-y-3 hover:border-blue-500/60 transition group shadow-md"
              >
                <div className="w-12 h-12 bg-blue-950 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-800/60 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

