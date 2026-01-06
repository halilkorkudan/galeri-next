// src/lib/imageLoader.ts

export default function imageLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
  // 1. Senin orijinal resim URL'in (Worker adresi)
  const originalUrl = src;
  
  // 2. wsrv.nl servisine yönlendiriyoruz
  // url: Resmin kaynağı
  // w: İstenen genişlik (Next.js otomatik söyler)
  // q: Kalite (varsayılan 75)
  // output: wepb (Modern format)
  // l: 1 (Orijinal en-boy oranını koru)
  return `https://wsrv.nl/?url=${encodeURIComponent(originalUrl)}&w=${width}&q=${quality || 75}&output=webp&l=1`;
}