"use client";

import { useState } from "react";
import { SwatchBook, Compass, ShieldCheck, Filter } from "lucide-react";

interface SwimmingEvent {
  id: number;
  event_code: number;
  event_name: string;
  distance: string;
  stroke: string;
  gender: string;
  fee: number;
}

export default function EventInfoSection({ events }: { events: SwimmingEvent[] }) {
  const [selectedGender, setSelectedGender] = useState<string>("ALL");
  const [selectedStroke, setSelectedStroke] = useState<string>("ALL");

  const filteredEvents = (events || []).filter((e) => {
    const matchGender = selectedGender === "ALL" || e.gender === selectedGender;
    const matchStroke = selectedStroke === "ALL" || e.stroke === selectedStroke;
    return matchGender && matchStroke;
  });

  return (
    <section id="events" className="py-20 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sky-400 font-bold text-sm tracking-wider uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/30">
            KATEGORI & NOMOR PERLOMBAAN
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">
            Daftar Nomor Lomba Renang
          </h2>
          <p className="mt-2 text-slate-400 text-base">
            Tersedia berbagai nomor pertandingan jarak 50m, 100m, 200m untuk Putra & Putri.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center items-center">
          <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
            <span className="text-xs font-bold text-slate-400 px-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Gender:
            </span>
            {["ALL", "PUTRA", "PUTRI"].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGender(g)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedGender === g
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/30"
                    : "text-slate-300 hover:bg-slate-700"
                }`}
              >
                {g === "ALL" ? "Semua" : g}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
            <span className="text-xs font-bold text-slate-400 px-2">Gaya:</span>
            {["ALL", "FREESTYLE", "BREASTSTROKE", "BACKSTROKE", "BUTTERFLY", "INDIVIDUALMEDLEY"].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStroke(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedStroke === s
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30"
                    : "text-slate-300 hover:bg-slate-700"
                }`}
              >
                {s === "ALL" ? "Semua" : s.replace("INDIVIDUALMEDLEY", "MEDLEY")}
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-sky-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-slate-900 rounded-lg text-xs font-black text-sky-400 border border-sky-500/30">
                  EVENT #{ev.event_code}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                    ev.gender === "PUTRA" ? "bg-blue-500/20 text-blue-300" : "bg-pink-500/20 text-pink-300"
                  }`}
                >
                  {ev.gender}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug">{ev.event_name}</h3>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mt-4 border-t border-slate-700/60 pt-3">
                <div>Jarak: <span className="text-slate-200 font-semibold">{ev.distance}</span></div>
                <div>Gaya: <span className="text-slate-200 font-semibold">{ev.stroke}</span></div>
              </div>

              <div className="mt-4 flex justify-between items-center pt-2">
                <span className="text-sm font-bold text-amber-400">
                  Rp {ev.fee ? ev.fee.toLocaleString("id-ID") : "150.000"} / Nomor
                </span>
                <a
                  href="#register"
                  className="px-3 py-1.5 bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-white text-xs font-bold rounded-lg transition-all"
                >
                  Pilih Lomba
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
