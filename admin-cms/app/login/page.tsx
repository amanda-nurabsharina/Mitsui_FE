'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { adminLogin } from '@/lib/api-admin';
import { Lock, Mail, ShieldAlert, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('admin@mitsui-leasing.co.id');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (searchParams.get('expired') === '1') {
      setSessionExpired(true);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSessionExpired(false);

    try {
      const json = await adminLogin(email, password);
      if (json.success && json.data?.token) {
        localStorage.setItem('cms_token', json.data.token);
        localStorage.setItem('cms_user', JSON.stringify(json.data.user));
        router.push('/dashboard');
      } else {
        setErrorMsg(json.message || 'Login gagal. Periksa email & password.');
      }
    } catch (err: any) {
      setErrorMsg('Gagal terhubung ke backend API Go Fiber.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans selection:bg-blue-900 selection:text-white">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#0f285c] rounded-2xl flex items-center justify-center font-black text-white text-2xl mx-auto shadow-md border border-blue-800">
            M
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin CMS Portal</h1>
          <p className="text-xs text-slate-400">PT Mitsui Leasing Capital Indonesia</p>
        </div>

        {/* Session Expired Notice */}
        {sessionExpired && (
          <div className="bg-amber-950/70 border border-amber-700 text-amber-200 text-xs p-3.5 rounded-xl flex items-center space-x-2 font-medium">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Sesi token Anda telah diperbarui (Masa berlaku 7 hari). Silakan login kembali.</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-red-950/60 border border-red-800/80 text-red-300 text-xs p-3.5 rounded-xl flex items-center space-x-2 font-medium">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300 uppercase tracking-wider">Email Administrator</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-blue-600 transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-300 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-blue-600 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e40af] hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition flex items-center justify-center space-x-2 text-xs uppercase tracking-wider shadow-lg"
          >
            <span>{loading ? 'Authenticating...' : 'Masuk Portal CMS'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 text-center space-y-1">
          <div className="flex items-center justify-center space-x-1 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Terhubung ke PostgreSQL (`mitsui_compro`)</span>
          </div>
          <div>Default Admin: admin@mitsui-leasing.co.id / admin123</div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-xs">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
