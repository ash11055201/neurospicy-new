import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Netlify Forms
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
  // Ensure static generation works properly
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
