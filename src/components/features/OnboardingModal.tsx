'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Radar, Activity, Filter, Star, Send, Plus, Check, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { WATCHLIST_LIMIT } from '@/lib/constants';

const SUGGESTED_TICKERS = ['BBCA', 'TLKM', 'BMRI', 'ASII', 'GOTO'];

const TOUR_STEPS = [
  {
    title: "Welcome to NusaSense",
    desc: "Your AI-powered proactive IDX market intelligence. Let's take a quick 1-minute tour!",
    path: "/app",
    icon: Radar
  },
  {
    title: "Live Market Anomalies",
    desc: "Our engine scans the entire IDX to find heavily undervalued or oversold stocks, delivered as real-time signal cards.",
    path: "/app",
    icon: Activity
  },
  {
    title: "Market Overview",
    desc: "Monitor live IHSG data and track daily market movements directly from your dashboard.",
    path: "/app/market",
    icon: Activity
  },
  {
    title: "Build Custom Rules",
    desc: "Create custom valuation formulas instantly. e.g., 'pe_ttm < 15 and pb_mrq < 1.5'.",
    path: "/app/screener",
    icon: Filter
  },
  {
    title: "Noise-Free Watchlist",
    desc: `Select up to ${WATCHLIST_LIMIT} priority tickers. We'll strictly monitor these for you.`,
    path: "/app/watchlist",
    icon: Star,
    showTickers: true
  },
  {
    title: "Telegram Alerts",
    desc: "Get anomaly alerts straight to your phone every morning at 06:00 WIB. Never miss a golden setup again.",
    path: "/app/profile",
    icon: Send
  }
];

export function OnboardingModal() {
  const router = useRouter();
  const pathname = usePathname();
  const { hasOnboarded, _hasHydrated, watchlist, toggleWatchlist, completeOnboarding } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync route if tour is active
  useEffect(() => {
    if (mounted && _hasHydrated && !hasOnboarded) {
      const targetPath = TOUR_STEPS[step].path;
      if (pathname !== targetPath) {
        router.push(targetPath);
      }
    }
  }, [step, mounted, _hasHydrated, hasOnboarded, pathname, router]);

  if (!mounted || !_hasHydrated || hasOnboarded) return null;

  const currentStep = TOUR_STEPS[step];
  const Icon = currentStep.icon;
  const isLastStep = step === TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      completeOnboarding();
      router.push('/app'); // Go back home after tour
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-canvas/60 p-4 pb-24 backdrop-blur-md sm:items-center sm:pb-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-sm rounded-3xl border border-line-strong bg-surface p-6 shadow-2xl animate-in slide-in-from-bottom-8 fade-in duration-500">
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex rounded-full bg-brand/10 p-3">
            <Icon className="size-6 text-brand" />
          </div>
          <span className="text-xs font-bold text-brand tracking-widest uppercase">
            Tour {step + 1}/{TOUR_STEPS.length}
          </span>
        </div>
        
        <h2 className="mb-2 text-xl font-bold text-ink">{currentStep.title}</h2>
        <p className="mb-6 text-sm text-ink-muted leading-relaxed">
          {currentStep.desc}
        </p>

        {currentStep.showTickers && (
          <div className="mb-6 flex flex-wrap gap-2 animate-in fade-in zoom-in duration-300">
            {SUGGESTED_TICKERS.map((ticker) => {
              const isSelected = watchlist.includes(ticker);
              const isAtLimit = watchlist.length >= WATCHLIST_LIMIT && !isSelected;

              return (
                <button
                  key={ticker}
                  onClick={() => toggleWatchlist(ticker)}
                  disabled={isAtLimit}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    isSelected 
                      ? 'bg-brand text-white shadow-md shadow-brand/20' 
                      : 'bg-field text-ink-muted hover:text-ink hover:bg-line disabled:opacity-50'
                  }`}
                >
                  {isSelected ? <Check className="size-4" /> : <Plus className="size-4" />}
                  {ticker}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => {
              completeOnboarding();
              router.push('/app');
            }}
            className="flex-1 rounded-full bg-field py-3.5 text-sm font-semibold text-ink-muted transition-colors hover:bg-line hover:text-ink"
          >
            Skip Tour
          </button>
          <button
            onClick={handleNext}
            className="flex flex-[2] items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-semibold text-canvas transition-colors hover:bg-ink-muted shadow-lg shadow-ink/20"
          >
            {isLastStep ? "Finish Tour" : "Next"}
            {!isLastStep && <ArrowRight className="size-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
