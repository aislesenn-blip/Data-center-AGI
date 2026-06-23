import { test, expect } from '@playwright/test';

test('Real-Time Mobility E2E flows', async ({ page }) => {
  // Simulate mobile view
  await page.setViewportSize({ width: 375, height: 812 });

  // --- PASSENGER DISCOVERY ---
  await page.goto('http://localhost:3000/');

  // Verify home page UI (Map + Floating Search + Bottom Sheet)
  await expect(page.getByPlaceholder('Where are you going?')).toBeVisible();
  await expect(page.getByText('Active Near You')).toBeVisible();

  // Check that Live Trips are rendered in the bottom sheet
  await expect(page.getByText('Heading Your Way').first()).toBeVisible();
  await expect(page.getByText('Mlimani City')).toBeVisible();

  // --- DRIVER FLOW ---
  // Enter Driver Mode
  await page.click('text=Drive');
  await expect(page).toHaveURL('http://localhost:3000/drive');

  // Verify Setup UI
  await expect(page.getByText('Where are you heading?')).toBeVisible();
  await expect(page.getByPlaceholder('Enter destination...')).toBeVisible();

  // Fill destination
  await page.getByPlaceholder('Enter destination...').fill('Oysterbay');

  // Start Trip
  await page.click('text=START TRIP');

  // Wait for Active Trip View
  await page.waitForURL(/.*\/drive\/active\?dest=Oysterbay.*/, { timeout: 3000 });
  await expect(page.getByText('Navigating to')).toBeVisible();
  await expect(page.getByText('Oysterbay').first()).toBeVisible();

  // Verify incoming request overlay appears
  await expect(page.getByText('Elias requested a seat')).toBeVisible();

  // Accept request
  await page.click('text=Accept');

  // Verify overlay closes
  await expect(page.getByText('Elias requested a seat')).not.toBeVisible();
});
