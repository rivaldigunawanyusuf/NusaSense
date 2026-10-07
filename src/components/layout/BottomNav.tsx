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
      className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-line bg-canvas/85 backdrop-blur-xl"
    >
      <ul className="mx-auto grid h-nav max-w-2xl grid-cols-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);

          return (
            <li key={href}>
              <Link
                href={href}
                id={`nav-${label.toLowerCase()}`}
                aria-current={active ? "page" : undefined}
                className={`relative flex h-full min-h-11 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors duration-200 ${
                  active ? "text-brand" : "text-ink-faint hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-0 h-0.5 rounded-full bg-brand transition-all duration-300 ${
                    active ? "w-8 opacity-100" : "w-0 opacity-0"
                  }`}
                />
                <Icon
                  aria-hidden="true"
                  className={`size-[22px] transition-transform duration-200 ${active ? "scale-105" : ""}`}
                  strokeWidth={active ? 2.25 : 1.75}
                  fill={active && label === "Watchlist" ? "currentColor" : "none"}
                />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
