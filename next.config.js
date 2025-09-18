/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  // Permettre l'accès depuis d'autres appareils du réseau local
  experimental: {
    serverComponentsExternalPackages: []
  }
};

module.exports = nextConfig;