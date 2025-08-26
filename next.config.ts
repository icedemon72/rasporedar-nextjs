import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL as string,
        port: "",
        pathname: "/**",
      },  
    ],
    unoptimized: true,
  },
};

export default nextConfig;
