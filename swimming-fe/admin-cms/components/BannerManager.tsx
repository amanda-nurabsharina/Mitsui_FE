"use client";

import { useState } from "react";
import { saveBanner, deleteBanner } from "../lib/api-admin";
import { Plus, Trash2, Edit2, Image } from "lucide-react";

export default function BannerManager({
  banners,
  onRefresh,
}: {
  banners: any[];
  onRefresh: () => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any | null>(null);

  const [title, setTitle] = useState("");
  const [badgeText, setBadgeText] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ctaPrimaryText, setCtaPrimaryText] = useState("");
  const [ctaPrimaryUrl, setCtaPrimaryUrl] = useState("");

  const openCreate = () => {
    setEditingBanner(null);
    setTitle("");
    setBadgeText("AKUATIK INDONESIA");
    setDescription("");
    setImageUrl("https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1600&auto=format&fit=crop");
    setCtaPrimaryText("Daftar Now");
    setCtaPrimaryUrl("#register");
    setShowModal(true);
  };

  const openEdit = (b: any) => {
    setEditingBanner(b);
    setTitle(b.title);
    setBadgeText(b.badge_text || "");
    setDescription(b.description || "");
    setImageUrl(b.image_url);
    setCtaPrimaryText(b.cta_primary_text || "");
    setCtaPrimaryUrl(b.cta_primary_url || "");
    setShowModal(true);
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
      sort_order: 1,
      status: "published",
    };

    const res = await saveBanner(payload);
    if (res.success) {
      setShowModal(false);
      onRefresh();
    } else {
      alert("Gagal menyimpan banner");
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
    <div className="space-y-6">
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Image className="w-5 h-5 text-sky-400" /> Kelola Banner Slider Landing Page
          </h2>
          <p className="text-xs text-slate-400">Atur judul, gambar, dan tombol CTA pada banner halaman utama.</p>
        </div>

        <button
          onClick={openCreate}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Tambah Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((b) => (
          <div key={b.id} className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-lg flex flex-col">
            <div className="h-48 relative overflow-hidden bg-slate-950">
              <img src={b.image_url} alt={b.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-sky-500/80 text-white text-[10px] font-bold rounded-lg backdrop-blur-md">
                {b.badge_text || "BANNER"}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{b.description}</p>
              </div>

              <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="text-xs text-sky-400 font-mono">CTA: {b.cta_primary_text}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(b)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-lg text-xs font-semibold"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white rounded-lg text-xs font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4">
            <h3 className="text-lg font-bold text-white">{editingBanner ? "Edit Banner" : "Tambah Banner Baru"}</h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Judul Banner *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Badge Text</label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi Ringkas</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs h-20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">URL Gambar Banner *</label>
              <input
                type="text"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Text Tombol CTA</label>
                <input
                  type="text"
                  value={ctaPrimaryText}
                  onChange={(e) => setCtaPrimaryText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">URL Tombol CTA</label>
                <input
                  type="text"
                  value={ctaPrimaryUrl}
                  onChange={(e) => setCtaPrimaryUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Simpan Banner
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
