import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zerolifestyle.co',
        port: '',
        pathname: '/**', // Allows all paths from this domain
      },{
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**', // Allows all paths from this domain
      }
    ],
  },
};

export default nextConfig;
