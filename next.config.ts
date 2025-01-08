import { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enabling React Strict Mode
  reactStrictMode: true,

  // Configuring SWC for optimized performance
  swcMinify: true,

  // Ignoring TypeScript and ESLint errors during builds
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Image configuration
  images: {
    domains: ["your-image-domain.com"], // Add domains if using external images
    unoptimized: true, // Set to true if you need to disable image optimization
  },
};

export default nextConfig;
