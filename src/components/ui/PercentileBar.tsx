interface PercentileBarProps {
  label: string;
  value: number; // 0 to 100
  lowLabel?: string;
  highLabel?: string;
  inverseColors?: boolean; // if true, high value = bad (red), low = good (green)
  className?: string;
}

export function PercentileBar({ 
  label, 
  value, 
  lowLabel = '0%', 
  highLabel = '100%',
  inverseColors = false,
  className = ''
}: PercentileBarProps) {
  const safeValue = Math.max(0, Math.min(100, value));
  
  // Determine color based on percentile
  let colorClass = 'bg-brand';
  if (inverseColors) {
    if (safeValue > 80) colorClass = 'bg-down';
    else if (safeValue < 20) colorClass = 'bg-up';
    else colorClass = 'bg-warn';
  } else {
    if (safeValue > 80) colorClass = 'bg-up';
    else if (safeValue < 20) colorClass = 'bg-down';
    else colorClass = 'bg-brand'; // Mid-range
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex justify-between text-xs text-ink-muted">
        <span className="font-medium text-ink">{label}</span>
        <span className="font-semibold">{safeValue.toFixed(0)}th Rank</span>
      </div>
      
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-line">
        <div 
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
      
      <div className="flex justify-between text-[10px] text-ink-faint">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}
