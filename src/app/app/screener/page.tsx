import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScreenerBuilder } from "@/components/features/ScreenerBuilder";

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
      <ScreenerBuilder />
    </>
  );
}
