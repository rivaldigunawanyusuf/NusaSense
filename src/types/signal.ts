export interface SignalMetrics {
  currentPE: number | null;
  historicalAvgPE: number | null;
  currentPBV: number | null;
  historicalAvgPBV: number | null;
  dividendYield: number | null;
  historicalAvgDividendYield: number | null;
  revenueGrowthYoY: number | null;
  netProfitGrowthYoY: number | null;
}

export interface SignalDeviation {
  triggerMetric: string;
  deviationFactor: number;
  direction: 'above' | 'below';
}

export interface HealthScore {
  totalScore: number;
  axes: {
    valuation: number;
    profitability: number;
    growth: number;
    liquidity: number;
    solvency: number;
  };
}

export interface SignalAlert {
  ticker: string;
  status: 'anomaly' | 'normal' | 'watchlist';
  summary: string;
  metrics: SignalMetrics;
  deviation: SignalDeviation;
  sparklineData: number[];
  detectedAt: string;
  disclaimer: string;
  healthScore?: HealthScore;
  isAnomaly?: boolean;
}

export interface MarketSummary {
  ihsgValue: number;
  ihsgChangePercent: number;
  totalAnomalies: number;
  totalAnalyzed: number;
  lastUpdated: string;
}

export interface SignalCacheMetadata {
  fromCache: boolean;
  cachedAt: string;
  expiresAt: string;
}

export interface SignalBatch {
  alerts: SignalAlert[];
  marketSummary: MarketSummary;
  cache: SignalCacheMetadata;
}
