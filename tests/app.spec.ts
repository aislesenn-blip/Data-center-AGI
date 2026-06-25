import { test, expect } from '@playwright/test';

test('Campus Delivery E2E flows', async ({ page }) => {
  // Simulate mobile view
  await page.setViewportSize({ width: 375, height: 812 });

  await page.goto('http://localhost:3000/');

  // Verify Home State & Core Prompt
  await expect(page.getByText('Need something?')).toBeVisible();
  await expect(page.getByText('What can we bring you?')).toBeVisible();

  // Click to open Request flow
  await page.click('text=What can we bring you?');

  // Verify Request View
  await expect(page.getByText('Request Delivery')).toBeVisible();
  await expect(page.getByPlaceholder('e.g., Charger, Water, Notes...')).toBeVisible();

  // Fill out the request form
  await page.getByPlaceholder('e.g., Charger, Water, Notes...').fill('Notebook');
  await page.getByPlaceholder('Building, Library, Seat...').fill('Library Floor 2');

  // Verify the 'Confirm Request' button is enabled and click it
  await expect(page.getByText('Confirm Request')).toBeEnabled();
  await page.click('text=Confirm Request');

  // Verify 'Searching' state
  await expect(page.getByText('Finding a courier')).toBeVisible();

  // Verify it transitions to 'En Route' state automatically after mock searching (timeout ~2500ms)
  await expect(page.getByText('Delivery in Progress')).toBeVisible({ timeout: 3500 });
  await expect(page.getByText('Arriving in 3 min')).toBeVisible();
  await expect(page.getByText('Notebook • Library Floor 2')).toBeVisible();

  // Cancel Request to return to Home
  await page.click('text=Cancel Request');
  await expect(page.getByText('Need something?')).toBeVisible();

});
