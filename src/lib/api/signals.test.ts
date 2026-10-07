import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse, delay } from 'msw';
import { fetchSignals, ApiError } from './signals';
import { SignalBatch } from '@/types/signal';

const mockSignals: SignalBatch = {
  alerts: [],
  marketSummary: { ihsgValue: 7000, ihsgChangePercent: 0, totalAnomalies: 0, totalAnalyzed: 100, lastUpdated: new Date().toISOString() },
  cache: { fromCache: false, cachedAt: new Date().toISOString(), expiresAt: new Date().toISOString() }
};

const server = setupServer(
  http.get('*/data/signals.json', async () => {
    return HttpResponse.json(mockSignals);
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('fetchSignals integration tests', () => {
  it('returns valid signal batch on success', async () => {
    // Override the process.env.NEXT_PUBLIC_SIGNALS_URL just for tests
    process.env.NEXT_PUBLIC_SIGNALS_URL = 'http://localhost:3000/data/signals.json';
    
    const data = await fetchSignals();
    expect(data).toEqual(mockSignals);
  });

  it('throws TIMEOUT error on slow network', async () => {
    server.use(
      http.get('*/data/signals.json', async () => {
        await delay(3000); // Exceeds our 1000ms test timeout
        return HttpResponse.json(mockSignals);
      })
    );

    // Using a very short timeout for the test to ensure it triggers
    await expect(fetchSignals(500)).rejects.toThrowError(ApiError);
    await expect(fetchSignals(500)).rejects.toThrow(/timed out/i);
  });

  it('throws SERVER_ERROR on 500 status', async () => {
    server.use(
      http.get('*/data/signals.json', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(fetchSignals()).rejects.toThrowError(ApiError);
    await expect(fetchSignals()).rejects.toThrow(/Server error: 500/i);
  });
});
