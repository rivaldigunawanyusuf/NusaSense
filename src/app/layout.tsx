import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { APP_NAME } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME}: Proactive IDX Market Intelligence`,
    template: `%s · ${APP_NAME}`,
  },
  description:
    "NusaSense detects fundamental stock anomalies on the Indonesia Stock Exchange and pushes noise-free alerts to retail investors. Powered by the Sectors API.",
  applicationName: APP_NAME,
  keywords: [
    "IDX",
    "Indonesia Stock Exchange",
    "fundamental analysis",
    "anomaly detection",
    "market intelligence",
    "Sectors API",
    "IHSG",
  ],
  formatDetection: { telephone: false },
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-canvas"
        >
          Skip to content
        </a>

        <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col sm:border-x sm:border-line">
          <AppHeader />
          <main id="main" className="pb-safe-nav flex-1 px-4 pt-5">
            {children}
          </main>
        </div>

        <BottomNav />
      </body>
    </html>
  );
}
