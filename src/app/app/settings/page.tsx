import type { Metadata } from "next";
import { CalendarClock, Database, Info, Send } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Disclaimer } from "@/components/legal/Disclaimer";
import { ListGroup, ListRow } from "@/components/ui/ListGroup";
import { SettingsManager } from "@/components/features/SettingsManager";
import { APP_VERSION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage NusaSense alert delivery, Telegram linking, and legal information.",
};

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Preferences"
        title="Settings"
        description="Control how and where NusaSense delivers your signals."
      />

      <SettingsManager />

      <ListGroup title="About">
        <ListRow
          leading={<CalendarClock className="size-5" aria-hidden="true" />}
          label="Scan schedule"
          value="06:00 WIB"
        />
        <ListRow
          leading={<Database className="size-5" aria-hidden="true" />}
          label="Data source"
          value="Sectors API"
        />
        <ListRow
          leading={<Info className="size-5" aria-hidden="true" />}
          label="Version"
          value={`v${APP_VERSION}`}
        />
      </ListGroup>

      <section aria-labelledby="legal-heading" className="mt-6">
        <h2
          id="legal-heading"
          className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint"
        >
          Legal
        </h2>
        <Disclaimer />
      </section>
    </>
  );
}
