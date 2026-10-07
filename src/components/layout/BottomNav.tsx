"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Settings, Star, type LucideIcon } from "lucide-react";

import { ROUTES } from "@/lib/constants";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: readonly NavItem[] = [
  { href: ROUTES.home, label: "Home", icon: House },
  { href: ROUTES.watchlist, label: "Watchlist", icon: Star },
  { href: ROUTES.settings, label: "Settings", icon: Settings },
];

function isActive(pathname: string, href: string): boolean {
  if (href === ROUTES.home) return pathname === ROUTES.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNav() {
  const pathname = usePathname() ?? ROUTES.home;

  return (
    <nav
      aria-label="Primary"
      className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-line bg-canvas/85 backdrop-blur-xl md:inset-x-auto md:bottom-auto md:left-6 md:top-1/2 md:-translate-y-1/2 md:w-[80px] md:rounded-[40px] md:border md:border-line md:bg-surface/90 md:py-8 md:shadow-xl"
    >
      <ul className="mx-auto flex h-nav max-w-2xl flex-row justify-around md:h-auto md:w-full md:flex-col md:gap-8">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);

          return (
            <li key={href} className="relative group flex items-center justify-center w-full">
              <Link
                href={href}
                id={`nav-${label.toLowerCase()}`}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-12 w-[64px] flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-medium transition-all duration-300 md:h-14 md:w-14 md:text-xs ${
                  active ? "bg-brand/15 text-brand shadow-sm shadow-brand/5" : "text-ink-faint hover:bg-surface-hover hover:text-ink"
                }`}
              >
                <Icon
                  aria-hidden="true"
                  className={`size-[22px] transition-transform duration-200 md:size-6 ${active ? "scale-105" : ""}`}
                  strokeWidth={active ? 2.25 : 1.75}
                  fill={active && label === "Watchlist" ? "currentColor" : "none"}
                />
                <span className="md:hidden">{label}</span>
              </Link>
              
              {/* Desktop Tooltip */}
              <div className="pointer-events-none absolute left-full ml-4 top-1/2 z-[60] hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-canvas opacity-0 transition-opacity group-hover:opacity-100 md:block">
                {label}
                <div className="absolute left-[-4px] top-1/2 -mt-1 border-[5px] border-transparent border-r-ink" />
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
