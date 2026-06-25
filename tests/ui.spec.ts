import { test, expect } from '@playwright/test';

test('campus delivery full flow', async ({ page }) => {
  await page.goto('/');

  // 1. Home
  await expect(page.getByText('Smooth deliveries ahead.')).toBeVisible();

  // 2. Click "I Need Something" (Fetch Mode)
  await page.getByText('I Need Something').click();

  // 3. Verify Route Selection Screen (Fetch Mode)
  await expect(page.getByPlaceholder('e.g. Burger, Medicine, Charger...')).toBeVisible();
  await page.getByPlaceholder('e.g. Burger, Medicine, Charger...').fill('1x Burger');

  // 4. Fill Destination
  await page.getByPlaceholder('Destination').fill('Room 101');

  // 5. Continue
  await page.getByRole('button', { name: 'Continue' }).click();

  // 6. Verify Fare Selection
  await expect(page.getByText('Express')).toBeVisible();

  // 7. Test Smart Payment Lock
  await page.getByText('Cash').first().click();
  await expect(page.getByText('Unavailable for custom locations')).toBeVisible();
  await page.getByText('Mobile Money').first().click();

  // 8. Confirm Delivery
  await page.getByRole('button', { name: 'Confirm Delivery' }).click();

  // 9. Verify Finding State
  await expect(page.getByText('Connecting to a Runner')).toBeVisible();

  // 10. Simulate Match
  await page.getByRole('button', { name: 'Cancel Request (Simulate Match)' }).click();

  // 11. Verify En Route
  await expect(page.getByText('John Makata')).toBeVisible();
});

test('campus delivery partners hub', async ({ page }) => {
  await page.goto('/');

  // Open Menu
  await page.locator('button').first().click();

  // Verify Partners Hub
  await expect(page.getByText('Partners')).toBeVisible();
  await expect(page.getByText('UDSM Campus')).toBeVisible();
  await expect(page.getByText('Main Cafeteria')).toBeVisible();

  // Click a partner, expect it to go to Route Selection
  await page.getByText('Main Cafeteria').click();
  await expect(page.getByPlaceholder('e.g. Burger, Medicine, Charger...')).toBeVisible();
});
