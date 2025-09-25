import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.DEPLOY_ENV === 'DEV' ? undefined : 'standalone',
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
  async redirects() {
    return [
      {
        source: '/blogovi',
        destination: '/blogs',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
