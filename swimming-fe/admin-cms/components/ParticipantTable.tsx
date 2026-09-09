"use client";

import { useState } from "react";
import { verifyPayment } from "../lib/api-admin";
import { Search, CheckCircle, XCircle, Eye, ExternalLink } from "lucide-react";

export default function ParticipantTable({
  registrations,
  onRefresh,
}: {
  registrations: any[];
  onRefresh: () => void;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  const filtered = registrations.filter((r) => {
    const matchStatus = filterStatus === "ALL" || r.payment_status === filterStatus;
    const q = search.toLowerCase();
    const matchQuery =
      r.registration_code?.toLowerCase().includes(q) ||
      r.participant?.name?.toLowerCase().includes(q) ||
      r.participant?.club?.toLowerCase().includes(q) ||
      r.swimming_event?.event_name?.toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });

  const handleVerify = async (id: number, status: string) => {
    if (confirm(`Ubah status pembayaran pendaftaran ini menjadi ${status.toUpperCase()}?`)) {
      const res = await verifyPayment(id, status);
      if (res.success) {
        onRefresh();
      } else {
        alert(res.message || "Gagal mengubah status");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Perenang, Kode, Klub..."
              className="pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500 w-64"
            />
          </div>

          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            {["ALL", "pending", "verified", "rejected"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  filterStatus === st ? "bg-sky-500 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs font-semibold text-slate-400">
          Menampilkan <span className="text-sky-400 font-bold">{filtered.length}</span> dari {registrations.length} Pendaftaran
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-800/80 text-slate-300 font-bold border-b border-slate-700 uppercase tracking-wider">
              <th className="p-3">KODE REGISTRASI</th>
              <th className="p-3">NAMA PERENANG</th>
              <th className="p-3">KLUB / KONTINGEN</th>
              <th className="p-3">NOMOR LOMBA</th>
              <th className="p-3 text-center">TIME SEED</th>
              <th className="p-3 text-center">HEAT & LINE</th>
              <th className="p-3 text-center">BUKTI BAYAR</th>
              <th className="p-3 text-center">STATUS</th>
              <th className="p-3 text-right">AKSI VERIFIKASI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-200">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-400">{r.registration_code}</td>
                <td className="p-3 font-bold text-white uppercase">{r.participant?.name}</td>
                <td className="p-3 font-medium text-slate-300">{r.participant?.club}</td>
                <td className="p-3 font-semibold text-cyan-300">{r.swimming_event?.event_name}</td>
                <td className="p-3 text-center font-mono font-bold text-amber-300">{r.time_seed}</td>
                <td className="p-3 text-center font-bold text-slate-300">
                  {r.heat_number > 0 ? (
                    <span className="text-sky-400">H{r.heat_number} / L{r.line_number}</span>
                  ) : (
                    <span className="text-slate-500 font-normal italic">-</span>
                  )}
                </td>
                <td className="p-3 text-center">
                  {r.payment_proof_url ? (
                    <button
                      onClick={() => setSelectedProof(r.payment_proof_url)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-lg border border-slate-700 flex items-center gap-1 mx-auto font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" /> Lihat
                    </button>
                  ) : (
                    <span className="text-slate-500 italic">Tidak ada</span>
                  )}
                </td>
                <td className="p-3 text-center">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      r.payment_status === "verified"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : r.payment_status === "rejected"
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {r.payment_status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleVerify(r.id, "verified")}
                      className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white rounded-lg text-[11px] font-bold transition-all flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Setuju
                    </button>
                    <button
                      onClick={() => handleVerify(r.id, "rejected")}
                      className="px-2.5 py-1 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white rounded-lg text-[11px] font-bold transition-all flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Tolak
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Proof Preview Modal */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-white">Bukti Transfer Pembayaran</h3>
              <button onClick={() => setSelectedProof(null)} className="text-slate-400 hover:text-white text-lg">
                ✕
              </button>
            </div>
            <div className="bg-slate-950 p-2 rounded-2xl overflow-hidden mb-4 max-h-96 flex items-center justify-center">
              <img src={selectedProof} alt="Bukti Transfer" className="max-h-80 object-contain rounded-xl" />
            </div>
            <div className="flex justify-between items-center">
              <a
                href={selectedProof}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-sky-400 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Buka Tab Baru
              </a>
              <button
                onClick={() => setSelectedProof(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
