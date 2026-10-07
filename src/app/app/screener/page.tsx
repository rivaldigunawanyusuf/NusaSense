import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Screener",
  description: "Custom stock screener and rule builder.",
};

export default function ScreenerPage() {
  return (
    <>
      <PageHeader
        title="Screener"
        description="Build custom rules to screen the market."
      />
      <div className="mt-8 flex flex-col items-center justify-center p-8 text-ink-muted text-center rounded-2xl border border-dashed border-line bg-surface/50">
        <p>Screener page placeholder.</p>
      </div>
    </>
  );
}
