import { expect, test, describe } from 'vitest';
import { isSignalBatch } from '@/lib/api/signals';
import mockData from '../../public/data/signals.json';

describe('isSignalBatch', () => {
  test('validates valid mock payload', () => {
    expect(isSignalBatch(mockData)).toBe(true);
  });

  test('rejects null or undefined', () => {
    expect(isSignalBatch(null)).toBe(false);
    expect(isSignalBatch(undefined)).toBe(false);
  });

  test('rejects payload missing alerts array', () => {
    const invalid = { ...mockData, alerts: undefined };
    expect(isSignalBatch(invalid)).toBe(false);
  });

  test('rejects payload with invalid marketSummary', () => {
    const invalid = { ...mockData, marketSummary: null };
    expect(isSignalBatch(invalid)).toBe(false);
  });

  test('rejects payload with missing cache metadata', () => {
    const invalid = { ...mockData, cache: undefined };
    expect(isSignalBatch(invalid)).toBe(false);
  });

  test('rejects payload where an alert has missing ticker', () => {
    const invalid = { 
      ...mockData, 
      alerts: [{ ...mockData.alerts[0], ticker: undefined }] 
    };
    expect(isSignalBatch(invalid)).toBe(false);
  });
});
