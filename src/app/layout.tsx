import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { APP_NAME } from "@/lib/constants";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ServiceWorkerProvider } from "@/components/providers/ServiceWorkerProvider";
import { OfflineBanner } from "@/components/ui/OfflineBanner";
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="bg-canvas text-ink antialiased selection:bg-brand selection:text-canvas">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ServiceWorkerProvider />
          <OfflineBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
