import { test, expect } from '@playwright/test';

test('Timebus E2E passenger and driver flows', async ({ page }) => {
  // Simulate mobile view
  await page.setViewportSize({ width: 375, height: 812 });

  // --- PASSENGER FLOW ---
  await page.goto('http://localhost:3000/');

  // Verify home page
  await expect(page.getByText('Where are you going tomorrow?')).toBeVisible();

  // Click on a route (Kariakoo Market -> Masaki Terminal)
  await page.click('text=Kariakoo Market');

  // Verify Route Details
  await expect(page).toHaveURL(/.*\/route\/r1/);
  await expect(page.getByText('Review Route')).toBeVisible();
  await expect(page.getByText('Pickup Instructions')).toBeVisible();

  // Go to confirm page
  await page.click('text=Continue to Book Seat');
  await expect(page).toHaveURL(/.*\/route\/r1\/confirm/);

  // Confirm reservation
  await page.click('text=Confirm Reservation');

  // Wait for success screen
  await page.waitForURL(/.*\/route\/r1\/success/, { timeout: 6000 });
  await expect(page.getByText('Seat Reserved')).toBeVisible();

  // Return Home
  await page.click('text=Back to Home');
  await expect(page).toHaveURL('http://localhost:3000/');

  // --- DRIVER FLOW ---
  // Enter Driver Area
  await page.click('text=Driver Area');
  await expect(page).toHaveURL('http://localhost:3000/driver');

  // Verify dashboard
  await expect(page.getByText('Good evening, John.')).toBeVisible();

  // Navigate to Create Route
  await page.click('text=Publish New Route');
  await expect(page).toHaveURL('http://localhost:3000/driver/create');

  // Fill route form
  await page.locator('input').nth(0).fill('Mbezi Beach'); // Starting Area
  await page.locator('input').nth(1).fill('Posta City Center'); // Destination Area
  await page.locator('input[type="time"]').fill('06:30');
  await page.locator('input[type="number"]').fill('4'); // Seats
  await page.locator('input').nth(4).fill('2000'); // Price
  await page.locator('textarea').fill('Wait near the main Mbezi Beach Daladala stand.');

  // Publish
  await page.getByRole('button', { name: 'Publish Route' }).click();

  // Wait for route presentation success
  await page.waitForURL(/.*\/driver\/route\/dr-new/, { timeout: 6000 });
  await expect(page.getByText('Route Published')).toBeVisible();
  await expect(page.getByText('Mbezi Beach')).toBeVisible();
  await expect(page.getByText('Posta City Center')).toBeVisible();

  // Return to Driver Dashboard
  await page.click('text=Return to Dashboard');
  await expect(page).toHaveURL('http://localhost:3000/driver');
});
