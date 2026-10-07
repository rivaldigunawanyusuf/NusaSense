import { ReactNode } from 'react';

interface StatusBadgeProps {
  status: 'anomaly' | 'breakout' | 'normal' | 'error';
  children: ReactNode;
  className?: string;
}

export function StatusBadge({ status, children, className = '' }: StatusBadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider';
  
  const statusStyles = {
    anomaly: 'bg-warn/15 text-warn border border-warn/20',
    breakout: 'bg-up/15 text-up border border-up/20',
    normal: 'bg-surface text-ink-muted border border-line',
    error: 'bg-down/15 text-down border border-down/20',
  };

  return (
    <span className={`${baseStyles} ${statusStyles[status]} ${className}`}>
      {status === 'anomaly' && <span className="size-1.5 rounded-full bg-warn" aria-hidden="true" />}
      {status === 'breakout' && <span className="size-1.5 rounded-full bg-up animate-pulse" aria-hidden="true" />}
      {status === 'error' && <span className="size-1.5 rounded-full bg-down" aria-hidden="true" />}
      {children}
    </span>
  );
}
