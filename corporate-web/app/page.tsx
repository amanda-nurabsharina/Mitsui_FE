import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import AboutGovernanceSection from '@/components/AboutGovernanceSection';
import ArticlesSection from '@/components/ArticlesSection';
import ProductsServicesSection from '@/components/ProductsServicesSection';
import ProcedureStepsSection from '@/components/ProcedureStepsSection';
import ValuePropositionsSection from '@/components/ValuePropositionsSection';
import CreditCalculatorSection from '@/components/CreditCalculatorSection';
import CareerOpportunitiesSection from '@/components/CareerOpportunitiesSection';
import Footer from '@/components/Footer';
import { fetchHomepageData } from '@/lib/api-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const data = await fetchHomepageData();

  const menus = data?.menus || [];
  const sections = data?.sections || {};
  const banners = data?.banners || [];
  const articles = data?.articles || [];

  let logoUrl = data?.logo_url;
  if (!logoUrl && sections['about_governance']?.content_payload) {
    try {
      const p = JSON.parse(sections['about_governance'].content_payload);
      if (p.logo_url) logoUrl = p.logo_url;
    } catch (e) {}
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-900 selection:text-white">
      {/* Dynamic Header */}
      <Header menus={menus} logoUrl={logoUrl} />

      {/* Main One-Page Content */}
      <main className="flex-grow">
        {/* 1. Hero Banner Slider */}
        <HeroBanner banners={banners} />

        {/* 2. Perusahaan & Tata Kelola Section */}
        <AboutGovernanceSection section={sections['about_governance']} />

        {/* 3. Artikel, Tips & Trik Otomotif Section */}
        <ArticlesSection section={sections['articles_news']} articles={articles} />

        {/* 4. Layanan & Produk Pembiayaan Section */}
        <ProductsServicesSection section={sections['products_services']} />

        {/* 5. Prosedur Pembiayaan Section */}
        <ProcedureStepsSection section={sections['procedure_steps']} />

        {/* 6. Mengapa Memilih Mitsui Leasing Section */}
        <ValuePropositionsSection section={sections['value_propositions']} />

        {/* 7. Kalkulator Simulasi Kredit Interaktif Section */}
        <CreditCalculatorSection section={sections['credit_calculator']} />

        {/* 8. Peluang Karir HR Section */}
        <CareerOpportunitiesSection section={sections['career_opportunities']} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
