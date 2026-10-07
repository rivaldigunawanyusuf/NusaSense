import { ShieldAlert } from "lucide-react";

import { DISCLAIMER_TEXT } from "@/lib/constants";

interface DisclaimerProps {
  className?: string;
  compact?: boolean;
}

/**
 * Mandatory legal disclaimer. Intentionally has no close/dismiss control
 * (PRD.md: "must include legal disclaimers on all outputs").
 */
export function Disclaimer({ className = "", compact = false }: DisclaimerProps) {
  if (compact) {
    return (
      <p className={`flex items-start gap-1.5 text-[11px] leading-snug text-ink-faint ${className}`}>
        <ShieldAlert className="mt-px size-3.5 shrink-0 text-warn" aria-hidden="true" />
        <span>Not financial advice. For informational purposes only.</span>
      </p>
    );
  }

  return (
    <aside
      role="note"
      aria-label="Legal disclaimer"
      className={`flex gap-3 rounded-[var(--radius-card)] border border-warn/25 bg-warn/[0.06] p-4 ${className}`}
    >
      <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warn" aria-hidden="true" />
      <p className="text-xs leading-relaxed text-ink-muted">{DISCLAIMER_TEXT}</p>
    </aside>
  );
}
