import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
  action?: ReactNode;
}

/** Page title block. Renders the single `<h1>` of each page. */
export function PageHeader({ title, eyebrow, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-2xl font-bold leading-tight tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
