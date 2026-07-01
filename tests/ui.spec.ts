import { test, expect } from '@playwright/test';

test('corporate website basic rendering', async ({ page }) => {
  await page.goto('/');

  // 1. Home - check for Hero title
  await expect(page.getByText('for Africa\'s active space.')).toBeVisible();

  // Open mobile menu to navigate (since it's Mobile Chrome test)
  await page.getByRole('button', { name: 'Toggle menu' }).click();

  // click Network
  await page.locator('div.md\\:hidden').getByText('Network', { exact: true }).click();

  // 2. Verify navigation to Network
  await expect(page.getByText('A mobility network built for')).toBeVisible();
});
