export const APP_NAME = "NusaSense";
export const APP_VERSION = "0.1.0";
export const APP_TAGLINE = "Proactive fundamental intelligence for IDX retail investors";

export const SCAN_SCHEDULE_LABEL = "Daily scan · 06:00 WIB";

export const ROUTES = {
  landing: "/",
  home: "/app",
  watchlist: "/app/watchlist",
  settings: "/app/settings",
} as const;

/** Maximum number of priority tickers a user may track (per PRD). */
export const WATCHLIST_LIMIT = 5;

/**
 * Legal disclaimer shown on every signal output. Must never be hidden or
 * made dismissible (see PRD.md, Key Constraints).
 */
export const DISCLAIMER_TEXT =
  "NusaSense provides data-driven anomaly detection for educational and informational purposes only. This is NOT financial advice and NOT a recommendation to buy, sell, or hold any security. Always consult a licensed financial advisor before making investment decisions. Past performance does not guarantee future results.";
