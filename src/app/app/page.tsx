import { Radar } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Disclaimer } from "@/components/legal/Disclaimer";
import { EmptyState } from "@/components/ui/EmptyState";

export default function HomePage() {
  return (
    <>
      <PageHeader
        eyebrow="Today"
        title="Signal Feed"
        description="Fundamental anomalies detected by the NusaSense engine across IDX-listed companies."
      />

      <section aria-labelledby="feed-heading" className="mt-6">
        <h2 id="feed-heading" className="sr-only">
          Signals
        </h2>
        <EmptyState
          icon={Radar}
          title="Waiting for today's scan"
          description="The signal engine publishes fresh anomalies every trading day at 06:00 WIB."
        />
      </section>

      <Disclaimer className="mt-8" />
    </>
  );
}
