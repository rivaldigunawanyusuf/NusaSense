import { SignalAlert } from '@/types/signal';
import { StatusBadge } from './StatusBadge';
import { Star } from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';

interface SignalCardProps {
  signal: SignalAlert;
  onClick?: () => void;
}

export function SignalCard({ signal, onClick }: SignalCardProps) {
  const { watchlist, toggleWatchlist } = useAppStore();
  const isWatchlisted = watchlist.includes(signal.ticker);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card click
    toggleWatchlist(signal.ticker);
  };

  return (
    <div 
      className="group relative flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 transition-all hover:border-brand/50 hover:shadow-sm cursor-pointer"
      onClick={onClick}
      data-testid="anomaly-card"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-field font-bold text-ink border border-line-strong">
            {signal.ticker.substring(0, 4)}
          </div>
          <div>
            <h3 className="font-bold text-ink leading-tight">{signal.ticker}</h3>
            <div className="text-xs text-ink-muted capitalize">{signal.status}</div>
          </div>
        </div>
        
        <button 
          onClick={handleToggle}
          className="p-2 -mr-2 -mt-2 rounded-full text-ink-faint hover:bg-field hover:text-brand transition-colors"
          aria-label={isWatchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          <Star className={`size-5 ${isWatchlisted ? 'fill-brand text-brand' : ''}`} />
        </button>
      </div>

      <div className="mt-1">
        <StatusBadge status={signal.status === 'anomaly' || signal.isAnomaly ? 'anomaly' : 'normal'}>
          {signal.status === 'anomaly' || signal.isAnomaly ? 'Anomaly Detected' : 'Normal'}
        </StatusBadge>
      </div>

      <p className="text-sm text-ink-muted line-clamp-2 mt-1">
        {signal.summary}
      </p>
      
      <div className="mt-2 flex justify-between text-xs text-ink-faint border-t border-line pt-3">
        <span>Score: {signal.healthScore ? signal.healthScore.totalScore : '-'}/100</span>
        {signal.metrics?.bandarmologi_score != null && (
          <span>Bandarmologi: {signal.metrics.bandarmologi_score}</span>
        )}
        {signal.metrics?.technical_rsi != null && (
          <span>RSI: {signal.metrics.technical_rsi}</span>
        )}
        <span>{new Date(signal.detectedAt).toLocaleDateString('en-ID', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
}
