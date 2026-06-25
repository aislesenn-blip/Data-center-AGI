import { test, expect } from '@playwright/test';

test('Campus Delivery Map-First Flow', async ({ page }) => {
  // Simulate mobile view
  await page.setViewportSize({ width: 375, height: 812 });

  await page.goto('http://localhost:3000/');

  // Verify Idle State & Map-First Prompt
  await expect(page.getByText('Need something?')).toBeVisible();
  await expect(page.getByText('Where to?')).toBeVisible();

  // Open expanded search sheet
  await page.click('text=Where to?');

  // Verify Search View
  await expect(page.getByText('Request Delivery')).toBeVisible();
  await expect(page.getByPlaceholder('What do you need?')).toBeVisible();

  // Test suggestions flow
  await expect(page.getByText('Phone Charger')).toBeVisible();
  await page.click('text=Phone Charger');

  // Verify Review State
  await expect(page.getByText('Phone Charger')).toBeVisible();
  await expect(page.getByText('Library Floor 2')).toBeVisible();
  await expect(page.getByText('Confirm Delivery')).toBeVisible();

  // Confirm Request
  await page.click('text=Confirm Delivery');

  // Verify Searching State
  await expect(page.getByText('Connecting...')).toBeVisible();
  await expect(page.getByText('Finding the nearest courier.')).toBeVisible();

  // Verify tracking transition
  await expect(page.getByText('James is arriving')).toBeVisible({ timeout: 4000 });
  await expect(page.getByText('Arriving in 3 min')).toBeVisible();

  // Cancel Request to return to Home
  await page.click('text=Cancel');
  await expect(page.getByText('Need something?')).toBeVisible();

});
