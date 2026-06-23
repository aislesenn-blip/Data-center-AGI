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

  // Verify balance is visible
  await expect(page.getByText('4,250')).toBeVisible();

  // --- DEPOSIT FLOW ---
  await page.click('text=Add Balance');

  // Verify Deposit UI
  await expect(page.getByText('Amount to Add')).toBeVisible();

  // Enter amount: '1', '5', '0'
  await page.click('text=1');
  await page.click('text=5');
  await page.click('text=0');

  await expect(page.getByText('150')).toBeVisible();

  // Click Next
  await page.click('text=Next');

  // Verify Confirm UI
  await expect(page.getByText('Confirm Top Up')).toBeVisible();
  await expect(page.getByText('Linked Card')).toBeVisible();

  // Confirm Top Up
  await page.click('text=Confirm Top Up');

  // Verify Success UI
  await expect(page.getByText('Added to Balance')).toBeVisible({ timeout: 2000 });

  // Wait to return to Home
  await expect(page.getByText('Tap to Pay')).toBeVisible({ timeout: 4000 });

  // Verify Balance Updated (4250 + 150 = 4400)
  await expect(page.getByText('4,400')).toBeVisible();

  // Navigate to History
  await page.locator('button').filter({ hasText: /^$/ }).first().click(); // Click the history button
  await expect(page.getByText('Activity')).toBeVisible();
  await expect(page.getByText('Apple Store')).toBeVisible();
});
