import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Market",
  description: "View market overview and top movers.",
};

export default function MarketPage() {
  return (
    <>
      <PageHeader
        title="Market"
        description="Market overview and general indices."
      />
      <div className="mt-8 flex flex-col items-center justify-center p-8 text-ink-muted text-center rounded-2xl border border-dashed border-line bg-surface/50">
        <p>Market page placeholder.</p>
      </div>
    </>
  );
}
