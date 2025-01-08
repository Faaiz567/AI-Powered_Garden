
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
};

export default nextConfig;
