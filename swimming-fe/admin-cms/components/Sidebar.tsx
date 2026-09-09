"use client";

import { Waves, Users, Calendar, Image, LogOut, CheckSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("swimming_admin_token");
    router.push("/login");
  };

  const menuItems = [
    { id: "registrations", label: "Kelola Pendaftaran", icon: Users },
    { id: "buku-acara", label: "Buku Acara & Heat", icon: Calendar },
    { id: "results", label: "Catat Hasil Lomba", icon: CheckSquare },
    { id: "banners", label: "Kelola Banner", icon: Image },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-800">
          <div className="p-2 bg-sky-500/20 rounded-lg text-sky-400 border border-sky-400/30">
            <Waves className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-black text-white tracking-wider">CMS AKUATIK</h1>
            <p className="text-[10px] text-sky-400 font-medium">ADMIN DASHBOARD 2025</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-red-500/20"
      >
        <LogOut className="w-4 h-4" />
        Keluar (Logout)
      </button>
    </aside>
  );
}
