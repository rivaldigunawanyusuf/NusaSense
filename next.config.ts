import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the PWA is served as plain HTML/CSS/JS by Nginx on the VPS.
  // All data is read client-side from the n8n-generated JSON cache.
  output: "export",
  images: {
    unoptimized: true,
  },
  // Note: `cacheComponents` / `partialPrefetching` are intentionally disabled.
  // They rely on Partial Prerendering, which is not supported with `output: "export"`.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
