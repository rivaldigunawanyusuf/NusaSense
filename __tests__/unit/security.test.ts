import { describe, it, expect } from 'vitest';
import { sanitizeTicker } from '@/lib/utils/security';

describe('Ticker Sanitization Pipeline', () => {
  it('should accept valid IDX ticker symbols', () => {
    expect(sanitizeTicker('BBCA')).toBe('BBCA');
    expect(sanitizeTicker('TLKM')).toBe('TLKM');
    expect(sanitizeTicker('A')).toBe('A');
  });

  it('should sanitize ticker input to uppercase', () => {
    expect(sanitizeTicker('bbca')).toBe('BBCA');
    expect(sanitizeTicker(' tlkm ')).toBe('TLKM');
  });

  it('should reject invalid ticker formats and oversized input', () => {
    expect(sanitizeTicker('')).toBeNull();
    expect(sanitizeTicker('BBCAAA')).toBeNull(); // > 5 chars
    expect(sanitizeTicker('BB CA')).toBeNull();
  });

  it('should defend against XSS and injection vectors', () => {
    expect(sanitizeTicker('<script>alert(1)</script>')).toBeNull();
    expect(sanitizeTicker("'; DROP TABLE--")).toBeNull();
    expect(sanitizeTicker('BBCA; rm -rf /')).toBeNull();
    expect(sanitizeTicker('../../etc/passwd')).toBeNull();
    expect(sanitizeTicker('BBCA\u200B')).toBeNull();
  });
});
