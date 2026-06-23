import { test, expect } from '@playwright/test';

test('Global Payment Network E2E flows', async ({ page }) => {
  // Simulate mobile view
  await page.setViewportSize({ width: 375, height: 812 });

  // --- USER FLOW ---
  await page.goto('http://localhost:3000/');

  // Verify home page UI (Network Balance & Quick Pay)
  await expect(page.getByText('Network Balance')).toBeVisible();
  await expect(page.getByText('450,000')).toBeVisible();

  // Initiate payment
  await page.click('text=Pay / Authorize');
  await expect(page).toHaveURL('http://localhost:3000/pay');

  // Verify Payment UI
  await expect(page.getByText('Authorize Spend')).toBeVisible();
  await expect(page.getByText('Shoppers Cafe')).toBeVisible();

  // Fill amount and confirm
  await page.locator('input[type="tel"]').fill('25000');
  await page.click('text=Confirm Payment');

  // Wait for Confirmed State
  await page.waitForURL('http://localhost:3000/pay/confirm', { timeout: 3000 });
  await expect(page.getByText('Authorized')).toBeVisible();
  await expect(page.getByText('Shoppers Cafe')).toBeVisible();

  // Return to Network
  await page.click('text=Return to Network');
  await expect(page).toHaveURL('http://localhost:3000/');

  // --- MERCHANT FLOW ---
  // Go to Merchant Dashboard
  await page.goto('http://localhost:3000/merchant');

  // Verify Merchant UI
  await expect(page.getByText("Today's Volume")).toBeVisible();
  await expect(page.getByText('Shoppers Cafe').first()).toBeVisible();

  // Switch to Accept Mode
  await page.click('text=Accept');
  await expect(page).toHaveURL('http://localhost:3000/merchant/accept');

  // Verify Acceptance UI
  await expect(page.getByText('Ready to Accept')).toBeVisible();
});
