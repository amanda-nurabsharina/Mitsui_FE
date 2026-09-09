import { getBukuAcara } from "../../lib/api-client";
import { Calendar, Download } from "lucide-react";

export const revalidate = 0;

export default async function BukuAcaraPage() {
  const res = await getBukuAcara();
  const eventGroups = res?.data || [];

  return (
    <div className="py-16 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-cyan-400 font-bold text-xs tracking-wider uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-400/30">
            DOKUMEN BAGAN TURNAMEN
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black text-white">
            BUKU ACARA - TIME TRIAL 2025
          </h1>
          <p className="mt-2 text-slate-400 text-sm">
            AKUATIK INDONESIA KOTA TANGERANG
          </p>
        </div>

        {/* Action Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800 mb-8 gap-4">
          <div className="text-sm font-semibold text-slate-300">
            Total Event Terdaftar: <span className="text-cyan-400 font-bold">{eventGroups.length} Event</span>
          </div>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" /> Cetak / Export PDF Buku Acara
          </button>
        </div>

        {/* Event Groups List */}
        <div className="space-y-10">
          {eventGroups.map((group: any, idx: number) => (
            <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
              {/* Event Header Banner */}
              <div className="bg-gradient-to-r from-red-700 via-rose-600 to-red-800 px-6 py-3 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-black font-mono bg-black/30 px-3 py-1 rounded-lg">
                    {group.event_code}
                  </span>
                  <h3 className="text-base sm:text-lg font-black uppercase tracking-wide">
                    {group.event_name}
                  </h3>
                </div>
                <span className="text-xs font-extrabold bg-white/20 px-3 py-1 rounded-full uppercase">
                  {group.gender}
                </span>
              </div>

              {/* Heat Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-800/80 text-slate-300 font-bold border-b border-slate-700 uppercase tracking-wider">
                      <th className="p-3 text-center w-16">HEAT</th>
                      <th className="p-3 text-center w-16">LINE</th>
                      <th className="p-3">NAMA</th>
                      <th className="p-3">JENIS KELAMIN</th>
                      <th className="p-3">CLUB</th>
                      <th className="p-3 text-center">TIME SEED</th>
                      <th className="p-3 text-center">RESULT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200">
                    {group.heats?.map((item: any, hIdx: number) => (
                      <tr key={hIdx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3 text-center font-black text-amber-400">{item.heat}</td>
                        <td className="p-3 text-center font-black text-sky-400">{item.line}</td>
                        <td className="p-3 font-bold text-white uppercase">{item.nama}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.jenis_kelamin === "PUTRA" ? "bg-blue-500/20 text-blue-300" : "bg-pink-500/20 text-pink-300"}`}>
                            {item.jenis_kelamin}
                          </span>
                        </td>
                        <td className="p-3 font-medium text-slate-300">{item.club}</td>
                        <td className="p-3 text-center font-mono font-bold text-cyan-300">{item.time_seed}</td>
                        <td className="p-3 text-center font-mono font-bold text-emerald-400">
                          {item.result || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
