import type { Metadata } from "next";
import { Star } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { WATCHLIST_LIMIT } from "@/lib/constants";

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
        <EmptyState
          icon={Star}
          title="Your watchlist is empty"
          description={`Add up to ${WATCHLIST_LIMIT} IDX tickers, such as BBCA or TLKM, to start receiving noise-free alerts.`}
        />
      </section>
    </>
  );
}
