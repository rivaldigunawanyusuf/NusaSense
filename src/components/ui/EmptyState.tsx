import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-[var(--radius-card)] border border-dashed border-line-strong bg-surface/50 px-6 py-10 text-center">
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-2xl bg-brand/20 blur-xl" aria-hidden="true" />
        <div className="relative flex size-14 items-center justify-center rounded-2xl border border-line-strong bg-elevated">
          <Icon className="size-6 text-brand" aria-hidden="true" strokeWidth={1.75} />
        </div>
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-ink-muted">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}
