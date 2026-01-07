import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Fontları ekledik
import "./globals.css";

// Modern ve Okunaklı
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Zarif ve Premium (Başlıklar için)
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL('https://galeri.golcukfuar.site'), // Base URL'i tanımladık
  title: 'Gölcük Evlilik Fuarı 2026 | Dijital Galeri',
  description: 'Fuarın en özel anları burada! HEFA Yazılım altyapısı ile fotoğraflarınızı yüksek kalitede inceleyin ve indirin.',
  openGraph: {
    title: 'Gölcük Evlilik Fuarı 2026 | Dijital Galeri',
    description: 'En özel anlarınız HEFA Yazılım güvencesiyle dijitalleştirildi. Fotoğraflarınızı hemen indirin.',
    url: 'https://galeri.golcukfuar.site',
    siteName: 'Gölcük Fuarı Galeri',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // metadataBase tanımlı olduğu için başına domain yazmasan da olur
        width: 1200,
        height: 630,
        alt: 'Gölcük Evlilik Fuarı 2026',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${playfair.variable} bg-white text-zinc-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}