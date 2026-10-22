"use client";

import { useState } from "react";
import { saveBanner, deleteBanner, uploadImage } from "../lib/api-admin";
import { Plus, Trash2, Edit2, Image as ImageIcon, Upload, Check, Eye, ExternalLink, RefreshCw } from "lucide-react";

export default function BannerManager({
  banners,
  onRefresh,
}: {
  banners: any[];
  onRefresh: () => void;
}) {
  const [editingBanner, setEditingBanner] = useState<any | null>(null);

  const [title, setTitle] = useState("KEJUARAAN RENANG TIME TRIAL 2025");
  const [badgeText, setBadgeText] = useState("AKUATIK INDONESIA KOTA TANGERANG");
  const [description, setDescription] = useState("Kompetisi renang resmi tingkat regional & nasional. Uji catatan waktu terbaik (seed time) dan raih medali prestasi kejuaraan!");
  const [imageUrl, setImageUrl] = useState("/banner.jpg");
  const [ctaPrimaryText, setCtaPrimaryText] = useState("Daftar Lomba");
  const [ctaPrimaryUrl, setCtaPrimaryUrl] = useState("#register");
  const [ctaSecondaryText, setCtaSecondaryText] = useState("Buku Acara");
  const [ctaSecondaryUrl, setCtaSecondaryUrl] = useState("/buku-acara");
  const [sortOrder, setSortOrder] = useState<number>(1);
  const [status, setStatus] = useState<string>("published");
  const [uploading, setUploading] = useState(false);

  // Quick preset image options for quick click
  const quickImages = [
    { label: "🏊 Kolam Renang Olympic", url: "/banner.jpg" },
    { label: "🥇 Kejuaraan & Medali", url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1600&auto=format&fit=crop" },
    { label: "⏱️ Start Block & Lane", url: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=1600&auto=format&fit=crop" },
    { label: "🌊 Water Burst Dynamic", url: "https://images.unsplash.com/photo-1560090995-01632a28895b?q=80&w=1600&auto=format&fit=crop" },
  ];

  const handleEditSelect = (b: any) => {
    setEditingBanner(b);
    setTitle(b.title || "");
    setBadgeText(b.badge_text || "");
    setDescription(b.description || "");
    setImageUrl(b.image_url || "");
    setCtaPrimaryText(b.cta_primary_text || "");
    setCtaPrimaryUrl(b.cta_primary_url || "");
    setCtaSecondaryText(b.cta_secondary_text || "");
    setCtaSecondaryUrl(b.cta_secondary_url || "");
    setSortOrder(b.sort_order || 1);
    setStatus(b.status || "published");
  };

  const handleResetForm = () => {
    setEditingBanner(null);
    setTitle("");
    setBadgeText("AKUATIK INDONESIA");
    setDescription("");
    setImageUrl("/banner.jpg");
    setCtaPrimaryText("Daftar Lomba");
    setCtaPrimaryUrl("#register");
    setCtaSecondaryText("Buku Acara");
    setCtaSecondaryUrl("/buku-acara");
    setSortOrder(banners.length + 1);
    setStatus("published");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const res = await uploadImage(file);
    if (res.success && res.url) {
      setImageUrl(res.url);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: editingBanner ? editingBanner.id : 0,
      title,
      badge_text: badgeText,
      description,
      image_url: imageUrl,
      cta_primary_text: ctaPrimaryText,
      cta_primary_url: ctaPrimaryUrl,
      cta_secondary_text: ctaSecondaryText,
      cta_secondary_url: ctaSecondaryUrl,
      sort_order: Number(sortOrder),
      status,
    };

    const res = await saveBanner(payload);
    if (res.success) {
      handleResetForm();
      onRefresh();
    } else {
      alert("Gagal menyimpan banner: " + (res.message || "Unknown error"));
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus banner ini?")) {
      const res = await deleteBanner(id);
      if (res.success) {
        onRefresh();
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Form Card (5 Cols on LG) */}
      <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div>
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <span className="text-sky-600 font-bold">+</span>
            {editingBanner ? "Edit Banner Slide" : "Tambah Banner Digital Baru"}
          </h2>
          <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
            Update slider banner promosi di halaman utama publik
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Judul Promosi / Program *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ctr: Promo Kemerdekaan Bunga Mulai 4.8% Flat"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:bg-white focus:border-sky-600 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Sub-judul / Keterangan Singkat</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ctr: Proses Cepat & Persetujuan Instan 1 Hari Kerja"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:bg-white focus:border-sky-600 focus:outline-none transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-slate-700">URL Gambar Banner *</label>
              <label className="text-[10px] font-bold text-sky-600 cursor-pointer hover:underline flex items-center gap-1">
                <Upload className="w-3 h-3" /> {uploading ? "Uploading..." : "Upload File"}
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
            <input
              type="text"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-1543353071-10c8ba85a904"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-mono font-medium focus:bg-white focus:border-sky-600 focus:outline-none transition-all"
            />
          </div>

          {/* Quick Select Buttons */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Pilih Gambar Cepat (HD Renang/Akuatik):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickImages.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(q.url)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                    imageUrl === q.url
                      ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teks Tombol (CTA)</label>
              <input
                type="text"
                value={ctaPrimaryText}
                onChange={(e) => setCtaPrimaryText(e.target.value)}
                placeholder="Ajukan Sekarang"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Link Tombol</label>
              <input
                type="text"
                value={ctaPrimaryUrl}
                onChange={(e) => setCtaPrimaryUrl(e.target.value)}
                placeholder="#simulasi"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Status Publikasi</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold"
              >
                <option value="published">Aktif (Tayang)</option>
                <option value="draft">Draft (Non-Aktif)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Urutan Slider (Order)</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold"
              />
            </div>
          </div>

          {/* Pratinjau Gambar Banner Card */}
          <div className="space-y-1 pt-2">
            <span className="block text-[11px] font-bold text-slate-500">Pratinjau Gambar Banner:</span>
            <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-inner group">
              <img
                src={imageUrl || "/banner.jpg"}
                alt="Pratinjau"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="px-2 py-0.5 bg-sky-600 text-[9px] font-black rounded uppercase tracking-wider mb-1 inline-block">
                  {badgeText || "AKUATIK INDONESIA"}
                </span>
                <h4 className="text-xs font-black line-clamp-1">{title || "Judul Banner"}</h4>
                <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">{description || "Sub-judul banner"}</p>
              </div>
            </div>
          </div>

          {/* Bottom Primary Submit Button */}
          <div className="pt-2 flex gap-2">
            {editingBanner && (
              <button
                type="button"
                onClick={handleResetForm}
                className="px-4 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
              >
                Batal
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-blue-700 via-sky-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-700/20 transition-all flex items-center justify-center gap-2"
            >
              + {editingBanner ? "Update Banner" : "Publikasikan Banner"}
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Active Banners Card List (7 Cols on LG) */}
      <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-black text-slate-900">
                Daftar Banner Digital Aktif ({banners.length})
              </h2>
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                Banner ini ditampilkan pada slideshow hero halaman beranda pengunjung
              </p>
            </div>
            <span className="px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 text-xs font-black rounded-full">
              {banners.filter((b) => b.status === "published").length} Tayang di Web
            </span>
          </div>

          {/* List of Banner Row Items matching screenshot exactly */}
          <div className="space-y-3.5">
            {banners.map((b, idx) => (
              <div
                key={b.id}
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  {/* Thumbnail Image with #1 Badge */}
                  <div className="w-20 h-14 rounded-xl overflow-hidden relative flex-shrink-0 bg-slate-900 border border-slate-200">
                    <img src={b.image_url || "/banner.jpg"} alt={b.title} className="w-full h-full object-cover" />
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-slate-900/80 text-white text-[9px] font-black rounded">
                      #{idx + 1}
                    </span>
                  </div>

                  {/* Title & Sub-title text */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-black text-slate-900 truncate leading-snug">
                      {b.title}
                    </h3>
                    <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                      {b.description}
                    </p>
                    <span className="text-[10px] font-bold text-sky-700 block mt-0.5">
                      cta: {b.cta_primary_text || "Detail"} &rarr;
                    </span>
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-black rounded-lg ${
                      b.status === "published"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {b.status === "published" ? "Aktifkan" : "Draft"}
                  </span>

                  <button
                    onClick={() => handleEditSelect(b)}
                    className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors border border-sky-100"
                    title="Edit Banner"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(b.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                    title="Hapus Banner"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info badge */}
        <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400 font-medium">
          <span>Otomatis tersinkronisasi ke API Landing Web</span>
          <button onClick={onRefresh} className="text-sky-600 font-bold hover:underline flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Segarkan List
          </button>
        </div>
      </div>
    </div>
  );
}
