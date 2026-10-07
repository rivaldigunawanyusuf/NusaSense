import { ReactNode } from 'react';

interface MetricRowProps {
  label: string;
  value: string | ReactNode;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function MetricRow({ label, value, subtext, trend = 'neutral', className = '' }: MetricRowProps) {
  const trendColor = {
    up: 'text-up',
    down: 'text-down',
    neutral: 'text-ink',
  }[trend];

  return (
    <div className={`flex items-center justify-between py-2 border-b border-line last:border-0 ${className}`}>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-ink-muted">{label}</span>
        {subtext && <span className="text-xs text-ink-faint">{subtext}</span>}
      </div>
      <div className={`text-sm font-semibold ${trendColor}`}>
        {value}
      </div>
    </div>
  );
}
