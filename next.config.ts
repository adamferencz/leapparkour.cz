import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "leapparkour.cz",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
