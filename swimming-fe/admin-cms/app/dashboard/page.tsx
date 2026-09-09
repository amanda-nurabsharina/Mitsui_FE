"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import ParticipantTable from "../../components/ParticipantTable";
import BukuAcaraGenerator from "../../components/BukuAcaraGenerator";
import RaceResultEditor from "../../components/RaceResultEditor";
import BannerManager from "../../components/BannerManager";
import { getRegistrations, getBanners } from "../../lib/api-admin";
import { Users, Calendar, Trophy, CheckCircle, RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("registrations");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const regRes = await getRegistrations();
    if (regRes.success) {
      setRegistrations(regRes.data || []);
    } else if (regRes.message === "Invalid or expired JWT token") {
      router.push("/login");
    }

    const bannerRes = await getBanners();
    if (bannerRes.success) {
      setBanners(bannerRes.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("swimming_admin_token");
    if (!token) {
      router.push("/login");
    } else {
      loadData();
    }
  }, []);

  const totalVerified = registrations.filter((r) => r.payment_status === "verified").length;
  const totalPending = registrations.filter((r) => r.payment_status === "pending").length;

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-white">Dashboard Kejuaraan Renang</h1>
            <p className="text-xs text-slate-400">Akuatik Indonesia Kota Tangerang - Time Trial 2025</p>
          </div>

          <button
            onClick={loadData}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sky-400 font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh Data
          </button>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
            <div className="p-3 bg-sky-500/20 text-sky-400 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{registrations.length}</div>
              <div className="text-xs text-slate-400 font-medium">Total Pendaftaran Lomba</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400">{totalVerified}</div>
              <div className="text-xs text-slate-400 font-medium">Terverifikasi & Siap Tanding</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-amber-400">{totalPending}</div>
              <div className="text-xs text-slate-400 font-medium">Pending Verifikasi Pembayaran</div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {activeTab === "registrations" && (
          <ParticipantTable registrations={registrations} onRefresh={loadData} />
        )}

        {activeTab === "buku-acara" && (
          <div className="space-y-8">
            <BukuAcaraGenerator onGenerated={loadData} />
            <ParticipantTable registrations={registrations} onRefresh={loadData} />
          </div>
        )}

        {activeTab === "results" && (
          <RaceResultEditor registrations={registrations} onRefresh={loadData} />
        )}

        {activeTab === "banners" && (
          <BannerManager banners={banners} onRefresh={loadData} />
        )}
      </main>
    </div>
  );
}
