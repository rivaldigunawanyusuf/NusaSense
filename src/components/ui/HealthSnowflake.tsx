import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { HealthScore } from '@/types/signal';

interface HealthSnowflakeProps {
  score: HealthScore;
  className?: string;
}

export function HealthSnowflake({ score, className = '' }: HealthSnowflakeProps) {
  // Map the health score axes to a format suitable for the radar chart
  const data = [
    { subject: 'Valuation', A: score.axes.valuation, fullMark: 100 },
    { subject: 'Profitability', A: score.axes.profitability, fullMark: 100 },
    { subject: 'Growth', A: score.axes.growth, fullMark: 100 },
    { subject: 'Liquidity', A: score.axes.liquidity, fullMark: 100 },
    { subject: 'Solvency', A: score.axes.solvency, fullMark: 100 },
  ];

  return (
    <div className={`relative ${className}`} style={{ height: '250px', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#334155" /> {/* line color */}
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#94a3b8', fontSize: 11 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Radar
            name="Health"
            dataKey="A"
            stroke="#f97316" /* brand orange */
            fill="#f97316"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
      
      {/* Center Score Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center justify-center mt-2 rounded-full bg-canvas/80 backdrop-blur-sm size-14 border border-line shadow-sm">
          <span className="text-lg font-bold leading-none text-ink">{score.totalScore}</span>
        </div>
      </div>
    </div>
  );
}
