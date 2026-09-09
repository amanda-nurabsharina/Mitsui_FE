import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Kejuaraan Renang Time Trial 2025 | Akuatik Indonesia Kota Tangerang",
  description: "Portal Resmi Pendaftaran & Buku Acara Kejuaraan Renang Time Trial 2025 Akuatik Indonesia Kota Tangerang.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
