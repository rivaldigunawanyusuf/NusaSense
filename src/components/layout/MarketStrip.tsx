const STATS = [
  { label: "IHSG", value: "7,130.45", trend: "up" },
  { label: "Signals today", value: "12" },
  { label: "Tickers scanned", value: "854" }
] as const;

/**
 * Macro market summary strip shown under the sticky header.
 * Currently displaying high-fidelity mockup data.
 * Phase 7 will wire it to the cached n8n payload (`marketSummary`).
 */
export function MarketStrip() {
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
