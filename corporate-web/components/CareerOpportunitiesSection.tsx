'use client';

import React, { useRef } from 'react';
import { PageSection } from '@/lib/api-client';
import { Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

interface CareerProps {
  section?: PageSection;
}

export interface JobPosting {
  id: number;
  title: string;
  department: string;
  date?: string;
  status: string;
  requirements: string[];
}

const DEFAULT_JOBS: JobPosting[] = [
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
];

export default function CareerOpportunitiesSection({ section }: CareerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const badgeText = section?.badge_text || 'PELUANG KARIR';
  const title = section?.title || 'Tumbuh Bersama Mitsui Leasing';
  const description =
    section?.description ||
    'Bergabunglah bersama kami dan jadilah bagian dari institusi keuangan terkemuka yang terus berinovasi.';

  let jobs = DEFAULT_JOBS;

  if (section?.content_payload) {
    try {
      const p = JSON.parse(section.content_payload);
      if (Array.isArray(p.jobs) && p.jobs.length > 0) {
        jobs = p.jobs;
      }
    } catch (e) {
      console.error('Failed to parse career_opportunities content_payload:', e);
    }
  }

  // Filter only OPEN job postings for landing page
  const openJobs = jobs.filter((j) => (j.status || 'OPEN').toUpperCase() === 'OPEN');
  const displayJobs = openJobs.length > 0 ? openJobs : jobs;

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="karir" className="py-20 bg-[#f4f7fc] text-slate-900 font-sans border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header centered */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-blue-200">
            {badgeText}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Carousel Container with Side Floating Arrows */}
        <div className="relative group px-2 sm:px-4">
          {/* Floating Left Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white text-slate-800 shadow-xl border border-slate-200/90 hover:bg-[#0a1633] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            aria-label="Geser Kiri"
            title="Geser Kiri"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Floating Right Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white text-slate-800 shadow-xl border border-slate-200/90 hover:bg-[#0a1633] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            aria-label="Geser Kanan"
            title="Geser Kanan"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Single Row Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="flex items-stretch space-x-6 overflow-x-auto scroll-smooth py-4 px-1 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
          >
            {displayJobs.map((job) => (
              <div
                key={job.id}
                className="w-[320px] sm:w-[380px] shrink-0 snap-start bg-white rounded-3xl p-8 shadow-sm border border-slate-200/80 flex flex-col justify-between space-y-8 hover:shadow-xl transition-all duration-300 group/card"
              >
                <div className="space-y-5">
                  {/* Briefcase Icon Box */}
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-900 border border-blue-100 group-hover/card:scale-105 transition-transform">
                    <Briefcase className="w-7 h-7" />
                  </div>

                  {/* Department Badge */}
                  <div>
                    <span className="bg-emerald-100/90 text-emerald-800 text-[11px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider inline-block">
                      {job.department}
                    </span>
                  </div>

                  {/* Job Title */}
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {job.title}
                  </h3>

                  {/* Requirements Bullet Points */}
                  <ul className="space-y-2.5 text-xs text-slate-600 font-medium leading-relaxed list-disc list-inside">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="marker:text-slate-400">
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Apply Action Button */}
                <div>
                  <a
                    href={`mailto:recruitment@mitsui-leasing.co.id?subject=Lamaran Pekerjaan: ${encodeURIComponent(job.title)}`}
                    className="w-full bg-slate-50 hover:bg-[#0a1633] hover:text-white text-[#0a1633] font-extrabold py-3.5 rounded-2xl border border-slate-200/80 text-xs tracking-wider transition text-center uppercase block shadow-2xs"
                  >
                    LAMAR POSISI INI
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
