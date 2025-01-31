import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    console.log(
      "NEXT_PUBLIC_API_BASE_URL:",
      process.env.NEXT_PUBLIC_API_BASE_URL
    );
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*",
        //destination: process.env.NEXT_PUBLIC_API_BASE_URL + "/:path*",
      },
    ];
  },
};

export default nextConfig;
