import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // All imagery is local (public/images). Modern formats for the optimizer.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
