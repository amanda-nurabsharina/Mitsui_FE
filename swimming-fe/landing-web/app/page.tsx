"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import EventInfoSection from "../components/EventInfoSection";
import RegistrationFormSection from "../components/RegistrationFormSection";
import StatusCheckerSection from "../components/StatusCheckerSection";
import Footer from "../components/Footer";
import { getBanners } from "../lib/api";

export default function HomePage() {
  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    async function loadBanners() {
      const res = await getBanners();
      if (res && res.data && res.data.length > 0) {
        setBanners(res.data);
      }
    }
    loadBanners();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header />
      <main>
        <HeroBanner banners={banners} />
        <EventInfoSection />
        <RegistrationFormSection />
        <StatusCheckerSection />
      </main>
      <Footer />
    </div>
  );
}
