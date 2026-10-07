import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface SparklineProps {
  data: number[];
  trend: 'up' | 'down' | 'neutral';
  height?: number;
  className?: string;
}

export function Sparkline({ data, trend, height = 40, className = '' }: SparklineProps) {
  const chartData = data.map((val, i) => ({ index: i, value: val }));
  
  const color = {
    up: '#22c55e', // var(--color-up)
    down: '#f87171', // var(--color-down)
    neutral: '#94a3b8', // var(--color-ink-faint)
  }[trend];

  const min = Math.min(...data);
  const max = Math.max(...data);
  const padding = (max - min) * 0.1 || 1;

  return (
    <div className={className} style={{ height, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={[min - padding, max + padding]} hide />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2} 
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
