import { Settings } from 'lucide-react';

interface MaintenanceBannerProps {
  message?: string;
}

export function MaintenanceBanner({ 
  message = 'System is undergoing maintenance or data is temporarily unavailable. Please check back later.' 
}: MaintenanceBannerProps) {
  return (
    <div 
      className="flex items-center gap-3 rounded-xl bg-field p-4 border border-line-strong"
      data-testid="maintenance-banner"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface shadow-sm">
        <Settings className="size-5 text-ink-muted animate-spin-slow" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium text-ink">
        {message}
      </p>
    </div>
  );
}
