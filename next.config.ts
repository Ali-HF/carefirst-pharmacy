import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/carefirst-pharmacy",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
