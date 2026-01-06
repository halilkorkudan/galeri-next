import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Fontları ekledik
import "./globals.css";

// Modern ve Okunaklı
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Zarif ve Premium (Başlıklar için)
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Özel Koleksiyon | Galeri",
  description: "Etkinlik fotoğraf galerisi",
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