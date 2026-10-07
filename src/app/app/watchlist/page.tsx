import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { WATCHLIST_LIMIT } from "@/lib/constants";
import { WatchlistManager } from "@/components/features/WatchlistManager";

export const metadata: Metadata = {
  title: "Watchlist",
  description: `Track up to ${WATCHLIST_LIMIT} priority IDX tickers and receive anomaly alerts only for the stocks you care about.`,
};

export default function WatchlistPage() {
  return (
    <>
      <PageHeader
        eyebrow="Personal"
        title="Watchlist"
        description={`Track up to ${WATCHLIST_LIMIT} priority tickers. Alerts are pushed only for these stocks.`}
      />

      <section aria-label="Tracked tickers" className="mt-6">
        <WatchlistManager />
      </section>
    </>
  );
}
