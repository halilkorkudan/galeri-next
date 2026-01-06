import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wsrv.nl', // <-- İZİN VERİLDİ
      },
      {
        protocol: 'https',
        hostname: 'api.golcukfuar.site',
      },
    ],
    qualities: [60, 75],
  },
};

export default nextConfig;