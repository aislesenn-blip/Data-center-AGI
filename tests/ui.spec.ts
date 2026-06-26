import { test, expect } from '@playwright/test';

test('financial ui basic flow', async ({ page }) => {
  await page.goto('/');

  // 1. Home - check for some FOI specific text
  await expect(page.getByText('Available Balance')).toBeVisible();

  // click Send button
  await page.getByText('Send').click();

  // 2. Handle Search
  await expect(page.getByPlaceholder('Who to? (@handle, name)')).toBeVisible();
  await page.getByText('Jane Doe').first().click();

  // 3. Amount Screen
  await expect(page.getByText('Send Money')).toBeVisible();
  await page.getByPlaceholder('0').fill('1000');
  await page.getByText('Continue').click();

  // 4. Confirmation
  await expect(page.getByText('Confirm Payment')).toBeVisible();
  await page.getByText('Send Instantly').click();

  // wait a bit for settimeout
  await page.waitForTimeout(600);

  // 5. Success
  await expect(page.getByText('Sent Successfully')).toBeVisible();
  await page.getByText('Done').click();

  // back to home
  await expect(page.getByText('Available Balance')).toBeVisible();
});
