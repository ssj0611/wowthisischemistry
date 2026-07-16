import type { NextConfig } from "next";

// GitHub Pages project site: https://ssj0611.github.io/wowthisischemistry/
const repo = "wowthisischemistry";
const isGhPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGhPages ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
