export function sanitizeTicker(input: string): string | null {
  if (typeof input !== 'string') return null;

  // Step 1: Trim whitespace
  const trimmed = input.trim();

  // Step 2: Reject empty input
  if (!trimmed) return null;

  // Step 3: Uppercase conversion
  const uppercased = trimmed.toUpperCase();

  // Step 4: Whitelist validation (alphanumeric only, 1-5 chars)
  const TICKER_REGEX = /^[A-Z]{1,5}$/;
  if (!TICKER_REGEX.test(uppercased)) return null;

  // Step 5: Additional XSS prevention (belt-and-suspenders)
  const sanitized = uppercased.replace(/[<>"'&;(){}[\]\\\/]/g, '');

  return sanitized || null;
}
