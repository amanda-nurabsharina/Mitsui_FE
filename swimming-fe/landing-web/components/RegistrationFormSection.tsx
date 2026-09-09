"use client";

import { useState } from "react";
import { submitRegistration, uploadPaymentProof } from "../lib/api-client";
import { User, Phone, Mail, Building, Plus, Trash2, Upload, CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface SwimmingEvent {
  id: number;
  event_code: number;
  event_name: string;
  gender: string;
}

export default function RegistrationFormSection({ events }: { events: SwimmingEvent[] }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("PUTRA");
  const [club, setClub] = useState("");
  const [pic, setPic] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  const [selections, setSelections] = useState<{ swimming_event_id: number; time_seed: string }[]>([
    { swimming_event_id: events?.[0]?.id || 1, time_seed: "00.30.00" },
  ]);

  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMsg, setResultMsg] = useState<{ success: boolean; code?: string; text: string } | null>(null);

  const addSelection = () => {
    if (events && events.length > 0) {
      setSelections([...selections, { swimming_event_id: events[0].id, time_seed: "99.99.99" }]);
    }
  };

  const removeSelection = (index: number) => {
    if (selections.length > 1) {
      setSelections(selections.filter((_, i) => i !== index));
    }
  };

  const updateSelection = (index: number, field: string, val: any) => {
    const updated = [...selections];
    updated[index] = { ...updated[index], [field]: val };
    setSelections(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !club) {
      alert("Harap isi nama peserta dan nama klub/sekolah.");
      return;
    }

    setIsSubmitting(true);
    setResultMsg(null);

    let proofUrl = "";
    if (proofFile) {
      const uploadRes = await uploadPaymentProof(proofFile);
      if (uploadRes.success) {
        proofUrl = uploadRes.data?.url || "";
      }
    }

    const payload = {
      name,
      gender,
      club,
      pic,
      contact,
      email,
      payment_proof_url: proofUrl,
      event_selections: selections.map((s) => ({
        swimming_event_id: Number(s.swimming_event_id),
        time_seed: s.time_seed || "99.99.99",
      })),
    };

    const res = await submitRegistration(payload);
    setIsSubmitting(false);

    if (res.success) {
      setResultMsg({
        success: true,
        code: res.data?.registration_code,
        text: `Pendaftaran Berhasil! Kode Registrasi Anda: ${res.data?.registration_code}`,
      });
      // reset form
      setName("");
      setClub("");
      setPic("");
      setContact("");
      setEmail("");
    } else {
      setResultMsg({
        success: false,
        text: res.message || "Gagal melakukan pendaftaran. Silakan coba lagi.",
      });
    }
  };

  return (
    <section id="register" className="py-20 bg-slate-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-emerald-400 font-bold text-xs tracking-wider uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-400/30">
            FORM PENDAFTARAN RESMI
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-white">
            Form Pendaftaran Lomba Berenang
          </h2>
          <p className="mt-2 text-slate-400 text-sm">
            Isi data perenang, pilih nomor lomba yang ingin diikuti, dan masukkan seed time terbaik.
          </p>
        </div>

        {resultMsg && (
          <div
            className={`mb-8 p-6 rounded-2xl border ${
              resultMsg.success
                ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-200"
                : "bg-red-950/80 border-red-500/50 text-red-200"
            }`}
          >
            <div className="flex items-start gap-4">
              {resultMsg.success ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
              ) : (
                <AlertCircle className="w-8 h-8 text-red-400 shrink-0 mt-1" />
              )}
              <div>
                <h3 className="text-lg font-bold">{resultMsg.text}</h3>
                {resultMsg.code && (
                  <div className="mt-3 p-3 bg-slate-900 rounded-xl border border-emerald-500/30 inline-block font-mono text-xl font-bold text-emerald-400">
                    {resultMsg.code}
                  </div>
                )}
                <p className="mt-2 text-xs opacity-80">
                  Simpan kode pendaftaran ini untuk mengecek status verifikasi pembayaran dan pencatatan Heat / Line Buku Acara.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8">
          {/* Data Perenang */}
          <div>
            <h3 className="text-lg font-bold text-sky-400 flex items-center gap-2 mb-4">
              <User className="w-5 h-5" /> Data Diri Perenang & Klub
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Nama Lengkap Perenang *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: MUHAMMAD MIRZA"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Jenis Kelamin *</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500"
                >
                  <option value="PUTRA">PUTRA</option>
                  <option value="PUTRI">PUTRI</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Nama Klub / Sekolah / Kontingen *</label>
                <input
                  type="text"
                  required
                  value={club}
                  onChange={(e) => setClub(e.target.value)}
                  placeholder="Contoh: MASC KOTA TANGERANG / ENSC"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Nama PIC / Pelatih</label>
                <input
                  type="text"
                  value={pic}
                  onChange={(e) => setPic(e.target.value)}
                  placeholder="Contoh: BPK FAJAR YOGANTARA"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">No WhatsApp Kontak</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Contoh: 085954761666"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Pilihan Nomor Lomba & Time Seed */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Pilihan Nomor Lomba & Time Seed
              </h3>

              <button
                type="button"
                onClick={addSelection}
                className="px-3 py-1.5 bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Tambah Lomba
              </button>
            </div>

            <div className="space-y-3">
              {selections.map((sel, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col sm:flex-row gap-3 items-center">
                  <div className="flex-1 w-full">
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Pilih Nomor Lomba</label>
                    <select
                      value={sel.swimming_event_id}
                      onChange={(e) => updateSelection(idx, "swimming_event_id", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-semibold focus:outline-none focus:border-sky-500"
                    >
                      {(events || []).map((ev) => (
                        <option key={ev.id} value={ev.id}>
                          Event #{ev.event_code} - {ev.event_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full sm:w-48">
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      Time Seed (mm.ss.ms)
                    </label>
                    <input
                      type="text"
                      value={sel.time_seed}
                      onChange={(e) => updateSelection(idx, "time_seed", e.target.value)}
                      placeholder="00.32.41 atau 99.99.99"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono text-center focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  {selections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSelection(idx)}
                      className="mt-4 sm:mt-0 p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Hapus pilihan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Upload Bukti Pembayaran */}
          <div>
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2 mb-2">
              <Upload className="w-5 h-5" /> Bukti Pembayaran / Transfer
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Silakan upload foto/pdf bukti transfer pendaftaran (BCA 123-456-7890 a.n Akuatik Tangerang).
            </p>

            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setProofFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-sky-500 file:text-white hover:file:bg-sky-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-base rounded-2xl shadow-xl shadow-sky-500/30 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Mengirim Pendaftaran..." : "Kirim Form Pendaftaran"}
          </button>
        </form>
      </div>
    </section>
  );
}
