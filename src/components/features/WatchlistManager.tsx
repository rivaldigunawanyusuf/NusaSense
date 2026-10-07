'use client';

import { useState } from 'react';
import { Plus, X, Star } from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { sanitizeTicker } from '@/lib/utils/security';
import { WATCHLIST_LIMIT } from '@/lib/constants';
import { EmptyState } from '../ui/EmptyState';

export function WatchlistManager() {
  const { watchlist, toggleWatchlist } = useAppStore();
  const [inputValue, setInputValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const clean = sanitizeTicker(inputValue);
    if (!clean) {
      setErrorMsg('Invalid ticker format. Use 1-5 letters (e.g. BBCA).');
      return;
    }

    if (watchlist.includes(clean)) {
      setInputValue('');
      return;
    }

    if (watchlist.length >= WATCHLIST_LIMIT) {
      setErrorMsg(`Watchlist limit reached (${WATCHLIST_LIMIT} max).`);
      return;
    }

    toggleWatchlist(clean);
    setInputValue('');
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleAdd} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add ticker (e.g. BBCA)"
            className="w-full rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand uppercase"
            maxLength={5}
          />
        </div>
        <button
          type="submit"
          disabled={!inputValue.trim() || watchlist.length >= WATCHLIST_LIMIT}
          className="flex shrink-0 items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong disabled:opacity-50"
        >
          <Plus className="size-5" />
        </button>
      </form>

      {errorMsg && <p className="text-xs text-down px-2 -mt-4">{errorMsg}</p>}

      {watchlist.length === 0 ? (
        <EmptyState
          icon={Star}
          title="Your watchlist is empty"
          description={`Add up to ${WATCHLIST_LIMIT} IDX tickers to track them closely and get noise-free alerts.`}
        />
      ) : (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-ink-muted">Tracking ({watchlist.length}/{WATCHLIST_LIMIT})</h3>
          {watchlist.map((ticker) => (
            <div key={ticker} className="flex items-center justify-between rounded-xl border border-line bg-surface p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-field font-bold text-ink border border-line-strong">
                  {ticker}
                </div>
                <span className="font-semibold text-ink">{ticker}</span>
              </div>
              <button
                onClick={() => toggleWatchlist(ticker)}
                className="rounded-full p-2 text-ink-faint hover:bg-down/10 hover:text-down transition-colors"
                aria-label={`Remove ${ticker}`}
              >
                <X className="size-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
