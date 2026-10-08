"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Activity, Zap, Shield, ChevronRight } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { APP_NAME, ROUTES } from "@/lib/constants";

const Hero3D = dynamic(() => import("@/components/ui/Hero3D").then((mod) => mod.Hero3D), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 h-full w-full flex items-center justify-center" aria-hidden="true">
      <div className="w-full h-full bg-gradient-to-tr from-brand/5 to-up/5 animate-pulse" />
    </div>
  ),
});

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <BrandMark className="size-8" />
            <span className="font-bold tracking-tight text-ink">{APP_NAME}</span>
          </div>
          <nav className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href={ROUTES.home}
              className="group flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-canvas transition-transform hover:scale-105 active:scale-95"
            >
              Launch App
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          {/* Background glow & 3D Object */}
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#e11d48] to-[#f97316] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
          </div>
          
          <Hero3D />

          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 relative z-10 py-12 sm:py-20 flex flex-col items-center justify-center">
            {/* Seamless radial gradient to darken the area behind text without borders (only in dark mode) */}
            <div className="absolute inset-0 -z-10 hidden dark:block bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-canvas via-canvas/60 to-transparent opacity-80 pointer-events-none blur-xl"></div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-ink dark:drop-shadow-[0_4px_12px_rgba(0,0,0,1)] sm:text-6xl">
              Proactive Fundamental <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-sectors-pink to-sectors-orange bg-clip-text text-transparent dark:drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
                Market Intelligence
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-ink-muted dark:drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] font-medium">
              NusaSense streamlines fundamental analysis for the Indonesia Stock Exchange (IDX) by automatically tracking your portfolio and delivering concise, data-driven alerts, minimizing cognitive bias.
            </p>

            <div className="flex justify-center gap-4">
              <Link
                href={ROUTES.home}
                className="group flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-base font-semibold text-canvas transition-all hover:bg-brand-strong shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
              >
                Open Web App
                <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-surface py-20 border-t border-line">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 max-w-2xl">
              <h2 className="text-3xl font-bold text-ink mb-4">
                Institutional-Grade Data. Retail Accessibility.
              </h2>
              <p className="text-ink-muted leading-relaxed">
                NusaSense bridges the gap between institutional algorithms and retail investing by providing clear, fundamental-based tracking without the noise of daily price speculation.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <div className="rounded-2xl border border-line bg-canvas p-8 transition-all hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5 group">
                <div className="mb-4 inline-flex rounded-xl bg-surface p-3 border border-line group-hover:bg-brand/10 group-hover:border-brand/20 transition-colors">
                  <Zap className="size-6 text-brand" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-ink">
                  Automated Event Tracking
                </h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  Set your watchlist and let our automated n8n data pipelines monitor financial reports and metric shifts daily. You receive structured Telegram alerts when meaningful changes occur.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-canvas p-8 transition-all hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5 group">
                <div className="mb-4 inline-flex rounded-xl bg-surface p-3 border border-line group-hover:bg-brand/10 group-hover:border-brand/20 transition-colors">
                  <Activity className="size-6 text-brand" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-ink">
                  Sectors API Integration
                </h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  Powered by the official Sectors API to ensure the fundamental metrics (P/E, PBV, ROE) we track are highly accurate and reflective of current Indonesia Stock Exchange (IDX) filings.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-canvas p-8 transition-all hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5 group">
                <div className="mb-4 inline-flex rounded-xl bg-surface p-3 border border-line group-hover:bg-brand/10 group-hover:border-brand/20 transition-colors">
                  <Shield className="size-6 text-brand" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-ink">
                  Data Privacy First
                </h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  Your portfolio focus is private. Authentication is handled securely via OAuth, and your customized alerts are routed strictly to your verified Telegram ID without third-party exposure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-24 bg-canvas border-t border-line">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-ink mb-6">
                  For Developers & Researchers
                </h2>
                <p className="text-ink-muted mb-6 leading-relaxed">
                  We believe in transparency. NusaSense exposes structured API endpoints allowing researchers to query their customized watchlists and integrate settings programmatically into their own quantitative workflows.
                </p>
                <Link
                  href="/developers"
                  className="inline-flex items-center gap-2 rounded-lg bg-surface border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:bg-surface-hover transition-colors"
                >
                  View Developer API
                  <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="flex-1 w-full bg-surface border border-line rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-sectors-pink"></div>
                <pre className="text-xs text-ink-muted overflow-x-auto">
                  <code>
                    <span className="text-brand">POST</span> /api/user/watchlist{'\n'}
                    Content-Type: application/json{'\n\n'}
                    {'{'}{'\n'}
                    {'  '}"symbol": "BBCA.JK",{'\n'}
                    {'  '}"action": "add"{'\n'}
                    {'}'}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-line bg-canvas py-12 text-center text-sm">
        <div className="mx-auto max-w-3xl flex flex-col items-center px-4 text-ink-faint">
          <BrandMark className="size-8 opacity-50 grayscale" />
          <p className="mb-4 mt-6">
            NusaSense provides data-driven anomaly detection for educational and
            informational purposes only. This is NOT financial advice and NOT a
            recommendation to buy, sell, or hold any security.
          </p>
          <p>
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
