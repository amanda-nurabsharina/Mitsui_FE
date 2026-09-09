import { getStartingList } from "../../lib/api-client";
import { FileText, Search, Download } from "lucide-react";

export const revalidate = 0;

export default async function StartingListPage() {
  const res = await getStartingList();
  const list = res?.data || [];

  return (
    <div className="py-16 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-sky-400 font-bold text-xs tracking-wider uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/30">
            DOKUMEN RESMI PERLOMBAAN
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black text-white">
            STARTING LIST - TIME TRIAL 2025
          </h1>
          <p className="mt-2 text-slate-400 text-sm">
            AKUATIK INDONESIA KOTA TANGERANG
          </p>
        </div>

        {/* Action Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800 mb-6 gap-4">
          <div className="text-sm font-semibold text-slate-300">
            Total Pendaftar / Perenang: <span className="text-sky-400 font-bold">{list.length} Item</span>
          </div>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" /> Cetak / Export PDF Starting List
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-800/90 text-slate-300 font-bold border-b border-slate-700 uppercase tracking-wider">
                <th className="p-3 text-center w-12">NO</th>
                <th className="p-3">NAMA</th>
                <th className="p-3">JENIS KELAMIN</th>
                <th className="p-3 text-center">TIME SEED</th>
                <th className="p-3">NOMOR LOMBA</th>
                <th className="p-3">CLUB</th>
                <th className="p-3">PIC</th>
                <th className="p-3">KONTAK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {list.map((item: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 text-center font-bold text-slate-400">{item.no || idx + 1}</td>
                  <td className="p-3 font-bold text-white uppercase">{item.nama}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.jenis_kelamin === "PUTRA" ? "bg-blue-500/20 text-blue-300" : "bg-pink-500/20 text-pink-300"}`}>
                      {item.jenis_kelamin}
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono font-bold text-cyan-300">{item.time_seed}</td>
                  <td className="p-3 font-semibold text-sky-300">{item.nomor_lomba}</td>
                  <td className="p-3 font-medium text-slate-300">{item.club}</td>
                  <td className="p-3 text-slate-400">{item.pic || "-"}</td>
                  <td className="p-3 font-mono text-slate-400">{item.kontak || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
