import GalleryViewer, { MediaFile } from '../components/GalleryViewer';
//export const runtime = 'edge';
export const dynamic = 'force-dynamic';
// SENİN API ADRESİN
const API_URL = "https://api.golcukfuar.site";
const EVENT_NAME = "golcuk-fuar-2024"; 

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
    <main className="min-h-screen bg-white">
      {/* Header: Çok sade, çok şık */}
      <header className="pt-16 pb-12 text-center px-4">
        <h1 className="font-serif text-4xl md:text-5xl text-zinc-900 tracking-tight mb-3">
         Gölcük Evlilik Fuarı 
        </h1>
        <p className="font-sans text-zinc-500 text-sm tracking-widest uppercase">
          {files.length} Anı
        </p>
      </header>

      {/* Galeri Alanı */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 pb-20">
        {files.length > 0 ? (
          <GalleryViewer files={files} apiUrl={API_URL} />
        ) : (
          <div className="text-center py-20 text-zinc-300 font-light">
            Koleksiyon yükleniyor veya boş.
          </div>
        )}
      </div>
    </main>
  );
}