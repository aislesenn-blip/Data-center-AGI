import { test, expect } from '@playwright/test';

test('corporate website basic rendering', async ({ page }) => {
  await page.goto('/');

  // 1. Home - check for Hero title
  // Instead of an exact match, we can use a regex for the main text in the Hero component, as it may be split by a <br>
  await expect(page.getByRole('heading', { name: /Building the future/i })).toBeVisible();

  // On Mobile, the 'Explore the Fleet' link might be in the hamburger menu. Wait, no, it's a CTA on the hero.
  await page.getByRole('link', { name: /Explore the Fleet/i }).first().click();

  // 2. Verify navigation to Network
  await expect(page.getByRole('heading', { name: /A network in constant/i })).toBeVisible();
});
