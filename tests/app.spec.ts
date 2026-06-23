import { test, expect } from '@playwright/test';

test('Real-Time Mobility E2E flows', async ({ page }) => {
  // Simulate mobile view
  await page.setViewportSize({ width: 375, height: 812 });

  // --- PASSENGER FLOW (Continuous Journey) ---
  await page.goto('http://localhost:3000/');

  // Verify home page UI (Map + Floating Search + Bottom Sheet)
  await expect(page.getByText('Where are you going?')).toBeVisible();
  await expect(page.getByText('Active Near You')).toBeVisible();

  // Click a live trip to focus
  await page.click('text=Ahmed');

  // Verify UI transitioned to ride focus
  await expect(page.getByRole('button', { name: 'Request Seat' })).toBeVisible();

  // Request Seat
  await page.click('text=Request Seat');

  // Wait for Confirmed State (Boarding Pass modal)
  await expect(page.getByText('Request Accepted')).toBeVisible({ timeout: 4000 });
  await expect(page.getByText('Toyota Hiace • T123')).toBeVisible();

  // Close back to Map
  await page.click('text=Close to View Map');
  await expect(page.getByText('Where are you going?')).toBeVisible();

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

  // Verify overlay closes and state transitions to en route
  await expect(page.getByText('Elias requested a seat')).not.toBeVisible();
  await expect(page.getByText('En route to Elias')).toBeVisible();
  await expect(page.getByText('Pickup in 4 mins')).toBeVisible();
});
