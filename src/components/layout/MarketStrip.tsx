"use client";

import { useMarketData } from "@/lib/hooks/useMarketData";

export function MarketStrip() {
  const { marketData, isLoading, isError } = useMarketData();

  if (isLoading) {
    return (
      <div
        className="no-scrollbar flex h-10 items-center gap-5 overflow-x-auto border-t border-line/70 px-4 py-2 text-xs"
        aria-label="Market summary loading"
      >
        <span className="text-ink-faint">Loading market data...</span>
      </div>
    );
  }

  if (isError || !marketData) {
    return (
      <div
        className="no-scrollbar flex h-10 items-center gap-5 overflow-x-auto border-t border-line/70 px-4 py-2 text-xs"
        aria-label="Market summary unavailable"
      >
        <span className="text-ink-faint">Data currently unavailable</span>
      </div>
    );
  }

  const ihsgValue = marketData?.marketSummary?.ihsgValue 
    ? new Intl.NumberFormat('en-US').format(marketData.marketSummary.ihsgValue)
    : "-";

  const STATS = [
    { label: "IHSG", value: ihsgValue, trend: "up" },
    { label: "Signals today", value: marketData?.marketSummary?.totalAnomalies?.toString() || "-" },
    { label: "Tickers scanned", value: marketData?.marketSummary?.totalAnalyzed?.toString() || "-" }
  ];

  return (
    <div
      className="no-scrollbar flex items-center gap-5 overflow-x-auto border-t border-line/70 px-4 py-2 text-xs"
      aria-label="Market summary"
    >
      {STATS.map((stat) => (
        <div key={stat.label} className="flex shrink-0 items-center gap-2">
          <span className="text-ink-faint">{stat.label}</span>
          <span className={`font-semibold ${'trend' in stat && stat.trend === 'up' ? 'text-green-500' : 'text-ink'}`}>
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
