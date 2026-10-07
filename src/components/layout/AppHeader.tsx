import Link from "next/link";

import { BrandMark } from "@/components/ui/BrandMark";
import { MarketStrip } from "@/components/layout/MarketStrip";
import { ROUTES, SCAN_SCHEDULE_LABEL } from "@/lib/constants";

export function AppHeader() {
  return (
    <header className="app-header sticky top-0 z-40">
      <div className="app-header__inner border-b border-transparent bg-canvas/85 backdrop-blur-xl transition-[border-color,box-shadow] duration-300">
        <div className="flex h-14 items-center justify-between gap-3 px-4">
          <Link
            href={ROUTES.home}
            className="flex items-center gap-2 rounded-lg"
            aria-label="NusaSense home"
          >
            <BrandMark className="size-8" />
            <span className="text-[17px] font-semibold tracking-tight">
              Nusa<span className="text-brand">Sense</span>
            </span>
          </Link>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-muted">
            <span className="relative flex size-1.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
            </span>
            {SCAN_SCHEDULE_LABEL}
          </span>
        </div>

        <MarketStrip />
      </div>
    </header>
  );
}
