'use client';

import { useState, useMemo } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { Play, Download, Check, Loader2, ChevronDown, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import imageLoader from '../lib/imageLoader';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export interface MediaFile {
  k: string;
  u: string;
  t: string;
  f: string;
  s: number;
}

interface GalleryViewerProps {
  files: MediaFile[];
  apiUrl: string;
}

export default function GalleryViewer({ files, apiUrl }: GalleryViewerProps) {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [isZipping, setIsZipping] = useState(false);
  const [collapsedFolders, setCollapsedFolders] = useState<Set<string>>(new Set());

  // Gruplama
  const groupedFiles = useMemo(() => {
    const groups: Record<string, MediaFile[]> = {};
    files.forEach(file => {
      const parts = file.k.split('/');
      const folderName = parts.length > 2 ? parts[1] : 'Genel';
      if (!groups[folderName]) groups[folderName] = [];
      groups[folderName].push(file);
    });
    return groups;
  }, [files]);

  // Klasör Aç/Kapa
  const toggleFolder = (folderName: string) => {
    const newCollapsed = new Set(collapsedFolders);
    if (newCollapsed.has(folderName)) {
      newCollapsed.delete(folderName);
    } else {
      newCollapsed.add(folderName);
    }
    setCollapsedFolders(newCollapsed);
  };

  const toggleSelection = (key: string) => {
    const newSelection = new Set(selectedKeys);
    if (newSelection.has(key)) newSelection.delete(key);
    else newSelection.add(key);
    setSelectedKeys(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedKeys.size === files.length) setSelectedKeys(new Set());
    else setSelectedKeys(new Set(files.map(f => f.k)));
  };

  const downloadSelected = async () => {
    if (selectedKeys.size === 0) return;
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder("Koleksiyon");
      const selectedFilesList = files.filter(f => selectedKeys.has(f.k));

      await Promise.all(selectedFilesList.map(async (file) => {
        const encodedKey = encodeURIComponent(file.k);
        const response = await fetch(`${apiUrl}/api/download?key=${encodedKey}`);
        folder?.file(file.f, await response.blob());
      }));

      saveAs(await zip.generateAsync({ type: "blob" }), "secilenler.zip");
    } catch (e) {
      alert("Hata oluştu.");
    } finally {
      setIsZipping(false);
    }
  };

// ... Kodun üst kısımları aynı kalsın ...

  return (
    <div className="relative min-h-[50vh] pb-32">
      
      <Gallery withCaption>
        <div className="space-y-8">
          {/* groupIndex parametresini ekledik: Hangi klasördeyiz? */}
          {Object.entries(groupedFiles).map(([folderName, groupFiles], groupIndex) => {
            const isCollapsed = collapsedFolders.has(folderName);
            
            return (
              <div key={folderName} className="bg-white rounded-2xl p-4 shadow-sm border border-zinc-100">
                
                <button 
                  onClick={() => toggleFolder(folderName)}
                  className="w-full flex items-center justify-between mb-2 group select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-black group-hover:text-white`}>
                       {isCollapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
                    </div>
                    <h2 className="text-2xl font-serif text-zinc-900 text-left">
                      {folderName}
                    </h2>
                    <span className="text-xs font-sans text-zinc-400 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100">
                      {groupFiles.length}
                    </span>
                  </div>
                  
                  {isCollapsed && (
                    <span className="text-xs text-zinc-400 font-sans hidden sm:block">
                      Genişletmek için tıklayın
                    </span>
                  )}
                </button>

                {!isCollapsed && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    {/* index parametresini ekledik: Kaçıncı fotoğraftayız? */}
                    {groupFiles.map((file, index) => {
                      const isVideo = file.t === 'video';
                      const encodedKey = encodeURIComponent(file.k);
                      const sourceUrl = `${apiUrl}/api/preview?key=${encodedKey}`;
                      const isSelected = selectedKeys.has(file.k);

                      // LCP OPTİMİZASYONU BURADA:
                      // Eğer ilk klasördeysek (groupIndex === 0) VE ilk 6 fotoğrafsa (index < 6)
                      // Bunları "priority" (eager) yap.
                      const isPriority = groupIndex === 0 && index < 6;

                      return (
                        <div key={file.k} className="relative group cursor-pointer">
                            
                            <div 
                              className={`relative aspect-[3/4] overflow-hidden bg-zinc-100 rounded-lg transition-all duration-300 
                                ${isSelected ? 'ring-2 ring-black ring-offset-2' : 'hover:shadow-lg'}`}
                            >
                               <div 
                                    onClick={(e) => { e.stopPropagation(); toggleSelection(file.k); }}
                                    className={`absolute top-2 right-2 z-30 p-2 rounded-full border shadow-sm transition-all duration-200
                                      ${isSelected 
                                        ? 'bg-black border-black text-white scale-110' 
                                        : 'bg-white/60 border-white/40 text-transparent hover:bg-white hover:border-white hover:text-zinc-300'
                                      }`}
                                >
                                    <Check size={14} strokeWidth={4} />
                                </div>

                               <Item
                                    original={sourceUrl}
                                    thumbnail={sourceUrl}
                                    width="1600"
                                    height="1200"
                                    content={isVideo ? (
                                        <div className="w-full h-full flex items-center justify-center bg-black">
                                        <video controls className="max-h-full max-w-full"><source src={sourceUrl} type="video/mp4" /></video>
                                        </div>
                                    ) : undefined}
                                >
                                    {({ ref, open }) => (
                                    <div 
                                        ref={ref} 
                                        onClick={open}
                                        className="w-full h-full relative" 
                                    >
                                        {isVideo ? (
                                            <div className="flex flex-col items-center justify-center w-full h-full bg-zinc-900 text-white">
                                                <Play size={32} strokeWidth={1} className="opacity-80" />
                                            </div>
                                        ) : (
                                            <Image
                                                loader={imageLoader}
                                                src={sourceUrl}
                                                alt={file.f}
                                                fill
                                                sizes="(max-width: 768px) 50vw, 20vw"
                                                className={`object-cover transition-transform duration-700 ease-in-out ${isSelected ? 'opacity-80' : 'group-hover:scale-105'}`}
                                                quality={60}
                                                // İŞTE ÇÖZÜM:
                                                priority={isPriority} 
                                            />
                                        )}
                                    </div>
                                    )}
                                </Item>

                                {isSelected && (
                                    <div className="absolute inset-0 bg-zinc-900/10 pointer-events-none z-10" />
                                )}
                            </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Gallery>

      {/* ALT KONTROL BAR (Aynı Kalacak) */}
      <div className={`fixed bottom-8 left-0 right-0 z-50 flex justify-center transition-transform duration-500 ${selectedKeys.size > 0 ? 'translate-y-0' : 'translate-y-32'}`}>
        <div className="bg-zinc-900 text-white pl-6 pr-2 py-2 rounded-full shadow-2xl flex items-center gap-6 mx-4 max-w-md w-full justify-between ring-1 ring-white/10 backdrop-blur-md">
          <div className="flex items-center gap-4">
             <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 font-sans tracking-wider uppercase font-bold">Seçilen</span>
                <span className="font-serif text-xl leading-none">{selectedKeys.size}</span>
             </div>
             <div className="h-8 w-[1px] bg-zinc-700"></div>
             <button 
                onClick={toggleSelectAll}
                className="text-xs font-medium text-zinc-300 hover:text-white transition-colors underline decoration-zinc-700 underline-offset-4"
             >
                Tümünü Al
             </button>
          </div>
          <button
            onClick={downloadSelected}
            disabled={isZipping}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-bold hover:bg-zinc-200 active:scale-95 transition-all shadow-lg"
          >
            {isZipping ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
            {isZipping ? '...' : 'İndir'}
          </button>
        </div>
      </div>
    </div>
  );

}