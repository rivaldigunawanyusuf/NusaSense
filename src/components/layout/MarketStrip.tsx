const STATS = ["IHSG", "Signals today", "Tickers scanned"] as const;

/**
 * Macro market summary strip shown under the sticky header.
 * Phase 1 renders the loading state; Phase 2 wires it to the cached
 * n8n payload (`marketSummary`).
 */
export function MarketStrip() {
  return (
    <div
      className="no-scrollbar flex items-center gap-5 overflow-x-auto border-t border-line/70 px-4 py-2 text-xs"
      aria-busy="true"
      aria-label="Market summary loading"
    >
      {STATS.map((label) => (
        <div key={label} className="flex shrink-0 items-center gap-2">
          <span className="text-ink-faint">{label}</span>
          <span className="skeleton h-3 w-12 rounded" />
        </div>
      ))}
    </div>
  );
}
