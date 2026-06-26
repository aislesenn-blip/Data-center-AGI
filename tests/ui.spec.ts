import { test, expect } from '@playwright/test';

test('financial ui basic flow', async ({ page }) => {
  await page.goto('/');

  // 1. Home - check for some FOI specific text
  await expect(page.getByText('Available Balance')).toBeVisible();

  // click Send button
  await page.getByText('Send', { exact: true }).click();

  // 2. Handle Search
  await expect(page.getByPlaceholder('Who to? (@handle, name)')).toBeVisible();
  await page.getByText('Jane Doe').first().click();

  // 3. Amount Screen
  await expect(page.getByText('Send Money')).toBeVisible();
  await page.getByRole('button', { name: '1' }).first().click();
  await page.getByRole('button', { name: '0' }).first().click();
  await page.getByRole('button', { name: '00' }).first().click();
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

test('financial ui deposit flow and balance visibility', async ({ page }) => {
  await page.goto('/');

  // Toggle balance visibility
  await expect(page.getByText('••••••••')).toBeVisible();
  await page.locator('button', { has: page.locator('.lucide-eye') }).click();
  await expect(page.getByText('TZS 142,500')).toBeVisible();

  // Click Deposit
  await page.getByText('Deposit').click();

  // Deposit Amount screen
  await expect(page.getByText('Add Funds')).toBeVisible();
  await page.getByRole('button', { name: '5' }).first().click();
  await page.getByRole('button', { name: '00' }).first().click();
  await page.getByRole('button', { name: '00' }).first().click();
  await page.getByText('Continue').click();

  // Confirmation
  await expect(page.getByText('Confirm Deposit').first()).toBeVisible();
  await expect(page.getByText('Visa •••• 4242')).toBeVisible();
  await page.getByText('Confirm Deposit').nth(1).click();

  await page.waitForTimeout(600);

  // Success
  await expect(page.getByText('Deposit Successful')).toBeVisible();
  await page.getByText('Done').click();
});

test('financial ui settings and linked cards', async ({ page }) => {
  await page.goto('/');

  // Navigate to Account
  await page.getByText('Account', { exact: true }).first().click();

  // Go to Settings
  await page.getByText('General Settings').click();
  await expect(page.getByText('Push Notifications')).toBeVisible();

  // Go back
  await page.locator('button').first().click(); // back button

  // Go to Linked Cards
  await page.getByText('Linked Cards & Banks').click();
  await expect(page.getByText('Visa')).toBeVisible();
  await expect(page.getByText('•••• 4242')).toBeVisible();

  // Add new card
  await page.getByText('Add New Card').click();
  await page.getByText('Save Card').click();

  // Verify new card exists
  await expect(page.getByText('Mastercard')).toBeVisible();
  await expect(page.getByText('•••• 8888')).toBeVisible();

  // Remove first card
  await page.locator('.lucide-trash-2').first().click();
});

test('financial ui payout config', async ({ page }) => {
  await page.goto('/');

  // Navigate to Account
  await page.getByText('Account', { exact: true }).first().click();

  // Go to Payout Config
  await page.getByText('Payout Configuration').click();

  // Verify payout screen
  await expect(page.getByText('Payout Methods')).toBeVisible();
  await expect(page.getByText('Main Bank Account')).toBeVisible();
});
