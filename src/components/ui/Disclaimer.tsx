import { AlertTriangle } from 'lucide-react';

interface DisclaimerProps {
  className?: string;
}

export function Disclaimer({ className = '' }: DisclaimerProps) {
  return (
    <div className={`rounded-xl border border-warn/20 bg-warn/10 p-4 ${className}`}>
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warn" aria-hidden="true" />
        <div className="text-sm text-ink-muted leading-relaxed">
          <p className="font-semibold text-warn mb-1">Important Disclaimer</p>
          <p>
            NusaSense provides data-driven anomaly detection for educational and
            informational purposes only. This is <strong>NOT</strong> financial advice and 
            <strong>NOT</strong> a recommendation to buy, sell, or hold any security. 
            Always consult a licensed financial advisor before making investment decisions. 
            Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </div>
  );
}
