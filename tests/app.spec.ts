import { test, expect } from '@playwright/test';

test('Payment Network E2E flows', async ({ page }) => {
  // Simulate mobile view
  await page.setViewportSize({ width: 375, height: 812 });

  await page.goto('http://localhost:3000/');

  // Verify Home State
  await expect(page.getByText('Network')).toBeVisible();
  await expect(page.getByText('Available Balance')).toBeVisible();
  await expect(page.getByText('Pay')).toBeVisible();

  // --- RECEIPTS FLOW ---
  // Click the Receipt icon button (second button in the row after 'Pay')
  await page.locator('button').filter({ has: page.locator('svg.lucide-receipt') }).click();
  await expect(page.getByText('Active Receipts')).toBeVisible();
  await expect(page.getByText('Apple Store')).toBeVisible();

  // Open Receipt Detail
  await page.click('text=Apple Store');
  await expect(page.getByText('Digital Pass')).toBeVisible();
  await expect(page.getByText('Tap to validate payment')).toBeVisible();

  // Simulate NFC Tap Validation (force click since it has continuous animation)
  await page.locator('div').filter({ has: page.locator('svg.lucide-wifi') }).last().click({ force: true });

  // Verify it transitions to Verified
  await expect(page.getByText('Verifying...')).toBeVisible();
  await expect(page.getByText('Verified')).toBeVisible({ timeout: 2000 });
  await expect(page.getByText('Payment confirmed')).toBeVisible();

  // Close back to home (this automatically archives the receipt)
  await page.locator('button').first().click();
  await expect(page.getByText('Available Balance')).toBeVisible({ timeout: 2000 }); // Returned home

  // Open receipts again to verify empty state
  await page.locator('button').filter({ has: page.locator('svg.lucide-receipt') }).click();
  await expect(page.getByText('No active receipts')).toBeVisible();
  // Go back home
  await page.locator('button').first().click();

  // --- PAYMENT FLOW ---
  await page.click('text=Pay');
  await expect(page.getByText('Enter Merchant Number')).toBeVisible();

  // Enter Number
  await page.getByPlaceholder('000 000').fill('123456');
  await page.click('text=Continue');

  // Verify Amount State
  await expect(page.getByText('To Verified Merchant')).toBeVisible();

  // Enter Amount: 4, 5
  await page.click('text=4');
  await page.click('text=5');
  await page.click('text=Review Payment');

  // Verify Review State
  await expect(page.getByText('Confirm Payment')).toBeVisible();
  await expect(page.getByText('Verified Merchant')).toBeVisible();
  await expect(page.getByText('No transaction fees')).toBeVisible();

  // Confirm
  await page.click('text=Confirm Payment');

  // Verify Success
  await expect(page.getByText('Approved')).toBeVisible({ timeout: 2000 });

  // Wait to return to Home
  await expect(page.getByText('Pay')).toBeVisible({ timeout: 4000 });
  await expect(page.getByText('4,205')).toBeVisible(); // 4250 - 45 = 4205

  // --- DEPOSIT FLOW ---
  await page.click('text=Add Balance');

  // Verify Deposit UI
  await expect(page.getByText('Amount to Add')).toBeVisible();

  // Enter amount: '1', '5', '0'
  await page.click('text=1');
  await page.click('text=5');
  await page.click('text=0');
  await page.click('text=Next');

  // Verify Funding Selection
  await expect(page.getByText('Connected Accounts')).toBeVisible();
  await expect(page.getByText('M-Pesa')).toBeVisible();
  await expect(page.getByText('CRDB Bank')).toBeVisible();

  // Select CRDB Bank
  await page.click('text=CRDB Bank');

  // Verify Confirm UI
  await expect(page.getByText('Confirm Top Up')).toBeVisible();
  await expect(page.getByText('Fast payments, no hidden fees')).toBeVisible();

  // Confirm Top Up
  await page.click('text=Confirm Top Up');

  // Verify Success UI
  await expect(page.getByText('Added to Balance')).toBeVisible({ timeout: 2000 });

  // Wait to return to Home
  await expect(page.getByText('Pay')).toBeVisible({ timeout: 4000 });

  // Verify Balance Updated (4205 + 150 = 4355)
  await expect(page.getByText('4,355')).toBeVisible();

});
