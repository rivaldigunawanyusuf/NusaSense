import { test, expect } from '@playwright/test';

test.describe('NusaSense Core User Journey', () => {
  // Clear Zustand storage before each test to simulate a fresh user
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.localStorage.clear());
  });

  test('completes onboarding, views feed, and adds to watchlist', async ({ page }) => {
    await page.goto('/app');

    // 1. Onboarding
    const welcomeHeader = page.locator('text=Welcome to NusaSense');
    await expect(welcomeHeader).toBeVisible();

    // Pick BBCA and TLKM
    await page.click('button:has-text("BBCA")');
    await page.click('button:has-text("TLKM")');
    await page.click('button:has-text("Let\'s Go!")');

    // Modal should close
    await expect(welcomeHeader).not.toBeVisible();

    // 2. Feed
    const feedHeader = page.locator('h1:has-text("Signal Feed")');
    await expect(feedHeader).toBeVisible();
    
    // We expect the mock signals to load eventually
    // Since mock has BBCA and TLKM, we should see BBCA in the feed
    await expect(page.locator('text=BBCA').first()).toBeVisible({ timeout: 10000 });
    
    // Check filter chips
    await page.click('button:has-text("Watchlist")');
    
    // 3. Watchlist Navigation
    await page.click('a[href="/app/watchlist"]');
    await expect(page.locator('h1:has-text("Watchlist")')).toBeVisible();

    // The onboarded tickers should be here
    await expect(page.locator('text=BBCA').first()).toBeVisible();
    await expect(page.locator('text=TLKM').first()).toBeVisible();

    // Add a new ticker manually
    await page.fill('input[placeholder="Add ticker (e.g. BBCA)"]', 'GOTO');
    await page.click('button[type="submit"]');

    // Expect GOTO to appear
    await expect(page.locator('text=GOTO').first()).toBeVisible();

    // 4. Settings Navigation
    await page.click('a[href="/app/settings"]');
    await expect(page.locator('h1:has-text("Settings")')).toBeVisible();

    // Toggle push notifications
    const toggle = page.locator('button[role="switch"], button.relative.inline-flex'); // generic class fallback
    await toggle.click();
    // Verify it turns on (has bg-brand)
    await expect(toggle).toHaveClass(/bg-brand/);
  });
});
