import type { Metadata } from "next";
import { CalendarClock, Database, Info, Send } from "lucide-react";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

import { PageHeader } from "@/components/layout/PageHeader";
import { Disclaimer } from "@/components/legal/Disclaimer";
import { ListGroup, ListRow } from "@/components/ui/ListGroup";
import { SettingsManager } from "@/components/features/SettingsManager";
import { APP_VERSION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage NusaSense alert delivery, Telegram linking, and legal information.",
};

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <PageHeader
        eyebrow="Preferences"
        title="Profile"
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

      <div className="mt-6 flex justify-center">
        <button
          onClick={async () => {
            const { signOut } = await import("next-auth/react");
            signOut({ callbackUrl: "/login" });
          }}
          className="rounded-lg border border-red-500/50 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
        >
          Sign Out
        </button>
      </div>

      <section aria-labelledby="legal-heading" className="mt-6">
        <h2
          id="legal-heading"
          className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint"
        >
          Legal
        </h2>
        <Disclaimer />
      </section>
    </ProtectedRoute>
  );
}
