import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the PWA is served as plain HTML/CSS/JS by Nginx on the VPS.
  // All data is read client-side from the n8n-generated JSON cache.
  // Removed output: "export" to enable SSR, API routes and DB connection
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
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.sectors.app https://t.me;" }
        ],
      },
    ];
  },
};

export default nextConfig;
