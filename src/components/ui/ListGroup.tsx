import type { ReactNode } from "react";

interface ListGroupProps {
  title: string;
  children: ReactNode;
}

/** iOS/CoinGecko-style grouped list used on the Settings page. */
export function ListGroup({ title, children }: ListGroupProps) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
        {title}
      </h2>
      <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
        {children}
      </ul>
    </section>
  );
}

interface ListRowProps {
  label: string;
  description?: string;
  value?: ReactNode;
  leading?: ReactNode;
}

export function ListRow({ label, description, value, leading }: ListRowProps) {
  return (
    <li className="flex min-h-14 items-center gap-3 px-4 py-3">
      {leading ? <div className="shrink-0 text-ink-muted">{leading}</div> : null}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{label}</p>
        {description ? <p className="mt-0.5 text-xs text-ink-faint">{description}</p> : null}
      </div>
      {value ? <div className="num shrink-0 text-sm text-ink-muted">{value}</div> : null}
    </li>
  );
}
