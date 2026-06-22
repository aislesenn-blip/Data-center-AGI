import { test, expect } from '@playwright/test';

test('onboarding and dashboard flow', async ({ page }) => {
  // Simulate mobile view
  await page.setViewportSize({ width: 375, height: 812 });

  // 1. Welcome Page
  await page.goto('http://localhost:3000/');
  await expect(page.getByText('Secure their future.')).toBeVisible();
  await page.click('text=Create Parent Account');

  // 2. Account Page
  await expect(page).toHaveURL('http://localhost:3000/onboarding/account');
  await page.fill('input[placeholder="Enter your legal name"]', 'Jane Doe');
  await page.fill('input[placeholder="e.g. 0712 345 678"]', '0712345678');
  await page.click('text=Continue Securely');

  // 3. Verify Page
  await expect(page).toHaveURL('http://localhost:3000/onboarding/verify');
  // PIN entry is a hidden input
  await page.locator('input[type="tel"]').fill('1234');

  // Wait for the simulated delay
  await page.waitForURL('http://localhost:3000/onboarding/child/details', { timeout: 3000 });

  // 4. Child Details Page
  await page.fill('input[placeholder="Enter child\'s name"]', 'Elias');
  await page.fill('input[type="date"]', '2015-05-15');
  await page.click('text=Generate Digital Card');

  // 5. Generating Page -> Success Page (Simulated delay)
  await page.waitForURL(/.*\/onboarding\/success\?name=Elias/, { timeout: 6000 });
  await expect(page.getByText('Future Secured')).toBeVisible();
  await page.click('text=Enter Dashboard');

  // 6. Dashboard Page
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await expect(page.getByText('Digital Cards')).toBeVisible();

  // Check bottom nav
  await expect(page.locator('nav').getByText('Home')).toBeVisible();
});
