import { describe, it, expect } from 'vitest';
import { formatIDR, formatPercent, formatMultiple, formatCompactNumber } from '@/lib/utils/format';

describe('Formatting Utilities', () => {
  it('should format IDR correctly', () => {
    expect(formatIDR(1500000)).toMatch(/Rp\s*1\.500\.000/);
    expect(formatIDR(null)).toBe('-');
  });

  it('should format percentages correctly', () => {
    // Intl.NumberFormat in id-ID uses comma for decimal separator
    expect(formatPercent(0.155)).toMatch(/15,5%/);
    expect(formatPercent(null)).toBe('-');
  });

  it('should format multiples correctly', () => {
    expect(formatMultiple(15.2)).toBe('15,2x');
    expect(formatMultiple(null)).toBe('-');
  });

  it('should format compact numbers correctly', () => {
    // 1500000 -> 1,5 jt or similar depending on id-ID locale rules
    const compact = formatCompactNumber(1500000);
    expect(compact).toMatch(/1,5\s*jt/i);
    expect(formatCompactNumber(null)).toBe('-');
  });
});
