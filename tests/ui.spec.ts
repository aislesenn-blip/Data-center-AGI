import { test, expect } from '@playwright/test';

test('campus delivery full flow', async ({ page }) => {
  await page.goto('/');

  // Verify Home Screen
  await expect(page.getByText('Smooth deliveries ahead.')).toBeVisible();

  // Tap search CTA
  await page.getByText('Need something?').click();

  // Verify Route Selection Screen
  await expect(page.getByPlaceholder('Dropoff location')).toBeVisible();

  // Type Moshi
  await page.getByPlaceholder('Dropoff location').fill('Moshi');

  // Suggestion matching Should highlight
  await expect(page.locator('span.text-\\[\\#1D965C\\]').first()).toBeVisible();

  // Select a suggestion
  await page.getByText('Moshi Urban').first().click();

  // Verify Fare Selection Screen
  await expect(page.getByRole('button', { name: 'Select Standard' })).toBeVisible();
  await expect(page.getByText('TZS 11,000')).toBeVisible();

  // Test Vehicle Selection Interactivity
  await page.getByText('Motorbike').first().click();
  await expect(page.getByRole('button', { name: 'Select Motorbike' })).toBeVisible();
});

test('campus delivery menu interaction', async ({ page }) => {
  await page.goto('/');

  // Open the hamburger menu
  await page.locator('button').filter({ has: page.locator('svg.lucide-menu') }).click();

  // Verify menu content
  await expect(page.getByText('Jane Doe')).toBeVisible();
  await expect(page.getByText('Delivery History')).toBeVisible();

  // Close the menu
  await page.locator('button').filter({ has: page.locator('svg.lucide-x') }).last().click();

  // Verify menu closed (Jane Doe text should be hidden)
  await expect(page.getByText('Jane Doe')).toBeHidden();
});
