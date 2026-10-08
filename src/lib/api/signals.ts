import { SignalBatch } from '@/types/signal';

export class ApiError extends Error {
  constructor(public type: 'UNAUTHORIZED' | 'SERVER_ERROR' | 'TIMEOUT' | 'INVALID_SHAPE' | 'OFFLINE', message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Basic runtime shape guard for SignalBatch
 */
export function isSignalBatch(data: any): data is SignalBatch {
  if (!data || typeof data !== 'object') return false;
  if (!Array.isArray(data.alerts)) return false;
  
  if (!data.marketSummary || typeof data.marketSummary !== 'object') return false;
  if (typeof data.marketSummary.ihsgValue !== 'number') return false;
  
  if (!data.cache || typeof data.cache !== 'object') return false;
  
  // Checking at least one alert to ensure shape
  if (data.alerts.length > 0) {
    const first = data.alerts[0];
    if (typeof first.ticker !== 'string') return false;
    if (!['anomaly', 'normal', 'watchlist'].includes(first.status)) return false;
    if (typeof first.summary !== 'string') return false;
    if (!first.metrics || typeof first.metrics !== 'object') return false;
  }
  
  return true;
}

export async function fetchSignals(timeoutMs = 5000): Promise<SignalBatch> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    throw new ApiError('OFFLINE', 'No internet connection');
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  
  const url = process.env.NEXT_PUBLIC_SIGNALS_URL || '/api/signals';

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      cache: 'no-store', // Always fetch fresh to allow SW/backend caching strategies to work
    });
    
    clearTimeout(id);

    if (res.status === 401 || res.status === 403) {
      throw new ApiError('UNAUTHORIZED', 'Access denied');
    }
    
    if (!res.ok) {
      throw new ApiError('SERVER_ERROR', `Server error: ${res.status}`);
    }

    const data = await res.json();
    
    if (!isSignalBatch(data)) {
      throw new ApiError('INVALID_SHAPE', 'Invalid response format received from server');
    }

    return data;
  } catch (error: any) {
    clearTimeout(id);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error.name === 'AbortError') {
      throw new ApiError('TIMEOUT', 'Request timed out');
    }
    
    if (error.message === 'Failed to fetch') {
      throw new ApiError('OFFLINE', 'Network error or server unreachable');
    }
    
    throw new ApiError('SERVER_ERROR', error.message || 'Unknown error occurred');
  }
}
