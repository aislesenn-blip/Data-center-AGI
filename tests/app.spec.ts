import { test, expect } from '@playwright/test';

test('Payment Network E2E flows', async ({ page }) => {
  // Simulate mobile view
  await page.setViewportSize({ width: 375, height: 812 });

  await page.goto('http://localhost:3000/');

  // Verify Home State
  await expect(page.getByText('Network')).toBeVisible();
  await expect(page.getByText('Tap to Pay')).toBeVisible();
  await expect(page.getByText('Available Balance')).toBeVisible();

  // Navigate to Scan
  await page.click('text=Tap to Pay');
  await expect(page.getByText('Hold near terminal or scan QR')).toBeVisible();

  // Wait for Confirm State
  await expect(page.getByText('Confirm Payment')).toBeVisible({ timeout: 2500 });
  await expect(page.getByText('Whole Foods Market')).toBeVisible();

  // Confirm Payment
  await page.click('text=Confirm Payment');

  // Wait for Success State
  await expect(page.getByText('Approved')).toBeVisible({ timeout: 2000 });

  // Wait to return to Home
  await expect(page.getByText('Tap to Pay')).toBeVisible({ timeout: 4000 });

  // Navigate to History
  await page.locator('button').filter({ hasText: /^$/ }).first().click(); // Click the history button
  await expect(page.getByText('Activity')).toBeVisible();
  await expect(page.getByText('Apple Store')).toBeVisible();

});
