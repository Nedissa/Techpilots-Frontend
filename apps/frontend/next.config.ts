import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '194.14.207.94',
        port: '9000',
        pathname: '/static/**',
      },
    ],
  },
};

export default nextConfig;
