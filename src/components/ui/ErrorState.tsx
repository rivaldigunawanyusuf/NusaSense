import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ 
  title = 'Something went wrong', 
  message = 'Unable to load data. Please try again later.', 
  onRetry,
  className = ''
}: ErrorStateProps) {
  return (
    <div 
      className={`flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-line bg-surface ${className}`}
      data-testid="error-state"
    >
      <div className="mb-4 inline-flex rounded-full bg-down/10 p-3">
        <AlertCircle className="size-6 text-down" aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-ink">{title}</h3>
      <p className="mb-6 text-sm text-ink-muted max-w-sm">{message}</p>
      
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-4 py-2 text-sm font-semibold text-ink hover:bg-field transition-colors"
        >
          <RefreshCw className="size-4" />
          Retry
        </button>
      )}
    </div>
  );
}
