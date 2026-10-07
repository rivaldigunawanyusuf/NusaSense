'use client';

import { useState, useEffect } from 'react';
import { Radar, Plus, Check } from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { WATCHLIST_LIMIT } from '@/lib/constants';

const SUGGESTED_TICKERS = ['BBCA', 'TLKM', 'BMRI', 'ASII', 'GOTO'];

export function OnboardingModal() {
  const { hasOnboarded, _hasHydrated, watchlist, toggleWatchlist, completeOnboarding } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render if mounted, hydrated, and user hasn't onboarded
  if (!mounted || !_hasHydrated || hasOnboarded) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-canvas/80 p-4 pb-20 backdrop-blur-sm sm:items-center sm:pb-4">
      <div className="w-full max-w-sm rounded-3xl border border-line bg-surface p-6 shadow-xl animate-in slide-in-from-bottom-8 fade-in duration-300">
        <div className="mb-4 inline-flex rounded-full bg-brand/10 p-3">
          <Radar className="size-6 text-brand" />
        </div>
        
        <h2 className="mb-2 text-xl font-bold text-ink">Welcome to NusaSense</h2>
        <p className="mb-6 text-sm text-ink-muted leading-relaxed">
          Select up to {WATCHLIST_LIMIT} tickers to follow. We'll prioritize showing you anomaly alerts for these companies.
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
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
                    ? 'bg-brand text-white' 
                    : 'bg-field text-ink-muted hover:text-ink hover:bg-line disabled:opacity-50'
                }`}
              >
                {isSelected ? <Check className="size-4" /> : <Plus className="size-4" />}
                {ticker}
              </button>
            );
          })}
        </div>

        <button
          onClick={completeOnboarding}
          className="w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-canvas transition-colors hover:bg-ink-muted focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
        >
          {watchlist.length > 0 ? "Let's Go!" : "Skip for now"}
        </button>
      </div>
    </div>
  );
}
