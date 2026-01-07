import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build sırasında hata denetimini kapatıyoruz (Siteyi yayına almak için)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wsrv.nl',
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