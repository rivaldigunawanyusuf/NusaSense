'use client';

import { useEffect, useState } from "react";
import { Radar } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { EmptyState } from "@/components/ui/EmptyState";
import { SignalCard } from "@/components/ui/SignalCard";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { fetchSignals } from "@/lib/api/signals";
import { useAppStore } from "@/lib/store/useAppStore";
import { SignalBatch } from "@/types/signal";

type FilterType = 'All' | 'Anomalies' | 'Watchlist';

export default function HomePage() {
  const [data, setData] = useState<SignalBatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('All');
  const watchlist = useAppStore((state) => state.watchlist);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchSignals();
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to load signals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredAlerts = data?.alerts.filter((alert) => {
    if (filter === 'Anomalies') return alert.status === 'anomaly';
    if (filter === 'Watchlist') return watchlist.includes(alert.ticker);
    return true; // 'All'
  }) || [];

  return (
    <>
      <PageHeader
        eyebrow="Today"
        title="Signal Feed"
        description="Fundamental anomalies detected by the NusaSense engine across IDX-listed companies."
      />

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide" data-testid="filter-chips">
        {(['All', 'Anomalies', 'Watchlist'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-ink text-canvas'
                : 'bg-surface text-ink-muted border border-line hover:bg-field hover:text-ink'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <section aria-labelledby="feed-heading" className="mt-4 min-h-[300px]">
        <h2 id="feed-heading" className="sr-only">Signals</h2>
        
        {loading && (
          <div className="flex flex-col gap-4 mt-2">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {error && !loading && (
          <ErrorState 
            message={error} 
            onRetry={loadData} 
            className="mt-2"
          />
        )}

        {!loading && !error && filteredAlerts.length === 0 && (
          <div className="mt-2">
            <EmptyState
              icon={Radar}
              title="No signals found"
              description={
                filter === 'Watchlist' 
                  ? "None of your watchlisted tickers have anomalies today." 
                  : "The signal engine publishes fresh anomalies every trading day at 06:00 WIB."
              }
            />
          </div>
        )}

        {!loading && !error && filteredAlerts.length > 0 && (
          <div className="flex flex-col gap-4 mt-2">
            {filteredAlerts.map((alert, idx) => (
              <SignalCard key={`${alert.ticker}-${idx}`} signal={alert} />
            ))}
          </div>
        )}
      </section>

      <Disclaimer className="mt-8 mb-4" />
    </>
  );
}
