"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "../../lib/api-admin";
import { Waves, Lock, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await adminLogin({ username, password });
    setLoading(false);

    if (res.success && res.data?.token) {
      localStorage.setItem("swimming_admin_token", res.data.token);
      router.push("/dashboard");
    } else {
      setErrorMsg(res.message || "Username atau password salah");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center">
          <div className="inline-flex p-3 bg-sky-500/20 text-sky-400 rounded-2xl border border-sky-400/30 mb-4">
            <Waves className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-2xl font-black text-white">Login Admin CMS</h1>
          <p className="text-xs text-slate-400 mt-1">Kejuaraan Renang Time Trial 2025</p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs text-center font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-semibold focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-semibold focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-500/25 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? "Memverifikasi..." : "Masuk ke Dashboard"}
          </button>
        </form>

        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 text-center">
          Default Credential: <code className="text-sky-400 font-mono">admin</code> / <code className="text-sky-400 font-mono">admin123</code>
        </div>
      </div>
    </div>
  );
}
