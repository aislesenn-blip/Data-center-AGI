import { test, expect } from '@playwright/test';

test('Campus Delivery E2E flows', async ({ page }) => {
  // Simulate mobile view
  await page.setViewportSize({ width: 375, height: 812 });

  await page.goto('http://localhost:3000/');

  // Verify Home State & Core Prompt
  await expect(page.getByText('What do you need?').first()).toBeVisible();

  // Click to open Request flow
  await page.click('text=What do you need?');

  // Verify Request View
  await expect(page.getByPlaceholder('What do you need? (e.g. Charger)')).toBeVisible();

  // Fill out the request form
  await page.getByPlaceholder('What do you need? (e.g. Charger)').fill('Notebook');
  await page.getByPlaceholder('Deliver to (e.g. Library Room 2)').fill('Library Floor 2');

  // Verify the 'Done' button is enabled and click it
  await expect(page.getByRole('button', { name: 'Done' })).toBeEnabled();
  await page.getByRole('button', { name: 'Done' }).click();

  // Verify Confirm Delivery view
  await expect(page.getByText('Choose Delivery')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Confirm Delivery' })).toBeEnabled();
  await page.getByRole('button', { name: 'Confirm Delivery' }).click();

  // Verify 'Finding' state
  await expect(page.getByText('Connecting to courier...')).toBeVisible();

  // Verify it transitions to 'En Route' state automatically after mock searching (timeout ~2500ms)
  await expect(page.getByText('3 min away')).toBeVisible({ timeout: 3500 });
  await expect(page.getByText('Notebook to Library Floor 2')).toBeVisible();

  // Cancel Request to return to Home
  await page.click('text=Cancel Request');
  await expect(page.getByText('What do you need?').first()).toBeVisible();

});
