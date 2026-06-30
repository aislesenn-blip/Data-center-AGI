import { test, expect } from '@playwright/test';

test('corporate website basic rendering', async ({ page }) => {
  await page.goto('/');

  // 1. Home - check for Hero title
  await expect(page.getByText('Command attention in the')).toBeVisible();

  // click Explore the Network
  await page.getByText('Explore the Network').click();

  // 2. Verify navigation to Network
  await expect(page.getByText('A network built for')).toBeVisible();
});
