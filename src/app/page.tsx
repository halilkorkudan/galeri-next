import GalleryViewer, { MediaFile } from '../components/GalleryViewer';
import { Camera, Heart, Sparkles, Instagram, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next'; 

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
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
        url: 'https://galeri.golcukfuar.site/og-image.jpg', // public klasörüne attığın resim
        width: 1200,
        height: 630,
        alt: 'Gölcük Evlilik Fuarı 2026 | Dijital Galeri',
      },
    ],
  },
};


const API_URL = "https://api.golcukfuar.site";
const EVENT_NAME = "golcuk-fuar-2024"; 
const INSTAGRAM_URL = "https://instagram.com/hefayazilim"; // Instagram adresin

async function getFiles(): Promise<MediaFile[]> {
  try {
    const res = await fetch(`${API_URL}/api/list?event=${EVENT_NAME}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const files = await getFiles();

  return (
    <main className="min-h-screen bg-[#fafafa] text-zinc-900 selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden">
      
      {/* --- ARKA PLAN FOTOĞRAFI VE EFEKTLER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* 1. Katman: Senin Fotoğrafın */}
        <div className="absolute inset-0">
            {/* 'bg.png' dosyasını public klasörüne koymalısın */}
            <Image 
                src="/bg.png" 
                alt="Arka Plan" 
                fill 
                className="object-cover opacity-100" // blur-sm ile hafif flu yapıyoruz, opacity ile şeffaflaştırıyoruz
                priority
            />
        </div>
        
        {/* 2. Katman: Beyaz Degrade (Yazıların okunması için alttan yukarı beyazlık) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/90 to-[#fafafa]"></div>
        
        {/* 3. Katman: Hafif noise efekti (Dokulu görünüm için) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="relative z-10 w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 text-white flex items-center justify-center rounded-lg shadow-lg">
                <span className="font-bold font-serif">G</span>
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-600">Gölcük 2026</span>
        </div>
        
        {/* Instagram Linki (Sağ Üst) */}
        <Link 
            href={INSTAGRAM_URL} 
            target="_blank"
            className="group flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-white/40 rounded-full shadow-sm hover:shadow-md hover:bg-white transition-all duration-300"
        >
            <div className="relative">
                <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-500 opacity-20 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]"></span>
                <Instagram size={16} className="text-zinc-600 group-hover:text-white relative z-10 transition-colors duration-300" />
            </div>
            <span className="text-xs font-bold text-zinc-600 group-hover:text-zinc-900">HEFA Yazılım</span>
        </Link>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative z-10 pt-10 pb-16 md:pt-20 md:pb-24 px-4 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/80 backdrop-blur-sm border border-rose-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Heart size={14} className="text-rose-400 fill-rose-400" />
            <span className="text-xs font-medium text-zinc-500 tracking-wide uppercase">En Özel Anlar</span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-zinc-900 tracking-tight leading-[0.9] mb-6 drop-shadow-sm">
          <span className="block animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">Gölcük</span>
          <span className="block italic text-zinc-500/80 font-light animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
             Evlilik Fuarı
          </span>
        </h1>

        <p className="max-w-md mx-auto text-zinc-600 text-lg font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          Unutulmaz anlarınızı ölümsüzleştirdik.<br/>
          <Link href={INSTAGRAM_URL} target="_blank" className="font-medium text-zinc-900 underline decoration-rose-300 decoration-2 underline-offset-2 hover:text-rose-600 transition-colors">
            HEFA Yazılım
          </Link> güvencesiyle.
        </p>

        {/* Aksiyon Butonları */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in zoom-in duration-1000 delay-500">
            {/* İstatistik Kutusu */}
            <div className="flex items-center gap-4 px-6 py-3 bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl shadow-rose-100/20">
                <div className="p-2 bg-zinc-50 rounded-full text-zinc-900">
                    <Camera size={20} strokeWidth={1.5} />
                </div>
                <div className="text-left">
                    <div className="text-2xl font-serif font-bold leading-none text-zinc-900">
                        {files.length}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">
                        Fotoğraf & Video
                    </div>
                </div>
            </div>

            {/* Instagram Takip Butonu */}
            <Link 
                href={INSTAGRAM_URL} 
                target="_blank"
                className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20 group"
            >
                <Instagram size={20} />
                <span className="font-medium text-sm">Bizi Takip Edin</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </header>

      {/* --- GALERİ ALANI --- */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-4 md:px-6 pb-32">
        
        <div className="flex items-center justify-center gap-4 mb-12 opacity-40">
            <div className="h-[1px] w-12 bg-zinc-400"></div>
            <Sparkles size={16} className="text-zinc-400" />
            <div className="h-[1px] w-12 bg-zinc-400"></div>
        </div>

        {files.length > 0 ? (
          <div className="animate-in fade-in duration-1000 delay-300">
              <GalleryViewer files={files} apiUrl={API_URL} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-zinc-400 gap-4 bg-white/50 rounded-3xl border border-dashed border-zinc-200">
             <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center animate-pulse">
                <Camera size={32} className="opacity-20" />
             </div>
             <span className="font-light">Koleksiyon yükleniyor...</span>
          </div>
        )}
      </div>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 border-t border-zinc-200 bg-white/60 backdrop-blur-md py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
            <Link href={INSTAGRAM_URL} target="_blank" className="inline-block group">
                <h3 className="font-serif text-2xl text-zinc-800 mb-2 group-hover:text-rose-600 transition-colors">HEFA Yazılım</h3>
                <div className="h-[1px] w-0 group-hover:w-full bg-rose-600 transition-all duration-300 mx-auto"></div>
            </Link>
            <p className="text-zinc-400 text-sm mb-6 mt-2">Düğün, Etkinlik ve Özel Anlarınız İçin Dijital Çözümler</p>
            
            <div className="flex justify-center gap-6 text-sm font-medium text-zinc-500">
                <Link href={INSTAGRAM_URL} target="_blank" className="hover:text-rose-600 flex items-center gap-1 transition-colors">
                    <Instagram size={14} /> Instagram
                </Link>
                <a href="https://www.hefayazilim.com" target="_blank" className="hover:text-zinc-900 transition-colors">Web Sitesi</a>
                <a href="mailto:iletisim@hefayazilim.com" className="hover:text-zinc-900 transition-colors">İletişim</a>
            </div>
            
            <div className="mt-8 text-xs text-zinc-300">
                &copy; 2026 Gölcük Evlilik Fuarı. Tüm hakları saklıdır.
            </div>
        </div>
      </footer>
    </main>
  );
}