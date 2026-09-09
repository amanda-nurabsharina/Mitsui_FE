'use client';

import React from 'react';
import { PageSection } from '@/lib/api-client';
import {
  FileEdit,
  ShieldCheck,
  FileCheck,
  CheckCircle,
  CreditCard,
  UserCheck,
  DollarSign,
  Building,
  Search,
  Award,
  HelpCircle,
  Send,
  Check,
  FileText,
  LucideIcon,
} from 'lucide-react';

interface ProcedureStepsProps {
  section?: PageSection;
}

const ICON_MAP: Record<string, LucideIcon> = {
  FileEdit,
  ShieldCheck,
  FileCheck,
  CheckCircle,
  CreditCard,
  UserCheck,
  DollarSign,
  Building,
  Search,
  Award,
  HelpCircle,
  Send,
  Check,
  FileText,
};

export default function ProcedureStepsSection({ section }: ProcedureStepsProps) {
  const badgeText = section?.badge_text || 'TRANSPARAN & MUDAH';
  const title = section?.title || 'Bagaimana Prosedur Pembiayaannya?';
  const description =
    section?.description ||
    'Kemudahan pengajuan kredit dalam 4 langkah terstruktur yang mengedepankan prinsip kehati-hatian.';

  const defaultSteps = [
    {
      num: '1',
      icon: FileEdit,
      title: 'Pengajuan',
      desc: 'Pengisian data pengajuan melalui website ini atau kantor cabang terdekat.',
    },
    {
      num: '2',
      icon: ShieldCheck,
      title: 'e-KYC & Verified',
      desc: 'Proses verifikasi dokumen, identitas, dan data finansial secara aman.',
    },
    {
      num: '3',
      icon: FileCheck,
      title: 'Analisa Kredit',
      desc: 'Tim analis menilai permohonan kredit berdasarkan prinsip kehati-hatian.',
    },
    {
      num: '4',
      icon: CheckCircle,
      title: 'Pencairan',
      desc: 'Persetujuan fasilitas dan pencairan dana ke pihak dealer/penjual.',
    },
  ];

  let steps = defaultSteps;

  if (section?.content_payload) {
    try {
      const parsed = JSON.parse(section.content_payload);
      if (Array.isArray(parsed.steps) && parsed.steps.length > 0) {
        steps = parsed.steps.map((item: any, idx: number) => {
          const IconComp = (item.icon && ICON_MAP[item.icon]) ? ICON_MAP[item.icon] : FileCheck;
          return {
            num: item.num || String(idx + 1),
            icon: IconComp,
            title: item.title || '',
            desc: item.desc || item.description || '',
          };
        });
      }
    } catch (e) {
      console.error('Failed to parse procedure_steps content_payload:', e);
    }
  }

  return (
    <section className="py-16 bg-[#091838] text-white font-sans">
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

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-blue-950/40 border border-blue-800/40 rounded-2xl p-6 relative flex flex-col items-center text-center space-y-3 hover:border-blue-500 transition group"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-black text-white text-sm shadow-md group-hover:scale-110 transition-transform">
                  {step.num}
                </div>

                <div className="text-blue-300 pt-1">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-bold text-white text-base">{step.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

