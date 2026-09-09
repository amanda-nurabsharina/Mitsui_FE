"use client";

import { useState } from "react";
import { generateBukuAcara } from "../lib/api-admin";
import { Zap, LayoutGrid, CheckCircle2, AlertCircle } from "lucide-react";

export default function BukuAcaraGenerator({ onGenerated }: { onGenerated: () => void }) {
  const [maxLanes, setMaxLanes] = useState(3); // Match sample PDF 3 lines
  const [isGenerating, setIsGenerating] = useState(false);
  const [msg, setMsg] = useState<{ success: boolean; text: string } | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setMsg(null);
    const res = await generateBukuAcara(maxLanes);
    setIsGenerating(false);

    if (res.success) {
      setMsg({
        success: true,
        text: `Buku Acara berhasil di-generate dengan ${maxLanes} Lintasan (Line) per Heat!`,
      });
      onGenerated();
    } else {
      setMsg({
        success: false,
        text: res.message || "Gagal generate Buku Acara",
      });
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-2xl border border-cyan-400/30">
          <Zap className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-black text-white">Generator Otomatis Buku Acara & Heat Sheet</h2>
          <p className="text-xs text-slate-400">
            Algoritma akan mengelompokkan perenang berdasarkan Nomor Lomba & Jenis Kelamin, mengurutkan berdasarkan Seed Time, dan menetapkan Heat & Line secara otomatis.
          </p>
        </div>
      </div>

      {msg && (
        <div
          className={`p-4 rounded-xl text-xs font-bold flex items-center gap-3 ${
            msg.success ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-300" : "bg-red-950/80 border border-red-500/40 text-red-300"
          }`}
        >
          {msg.success ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{msg.text}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 border-t border-slate-800">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
            <LayoutGrid className="w-4 h-4 text-sky-400" /> Jumlah Line / Lintasan per Heat:
          </label>
          <div className="flex gap-2">
            {[3, 6, 8, 10].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setMaxLanes(num)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  maxLanes === num
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {num} Line
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-cyan-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          {isGenerating ? "Proses Generating..." : "Jalankan Auto-Generate Heat & Line"}
        </button>
      </div>
    </div>
  );
}
