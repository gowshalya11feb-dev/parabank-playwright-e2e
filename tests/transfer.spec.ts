import { test, expect } from '@playwright/test';
import { registerNewUser } from '../utils/helpers';

test('customer can transfer funds between own accounts', async ({ page }) => {
  await registerNewUser(page);

  // Part 1: open a second account so we have two accounts
  await page.getByRole('link', { name: 'Open New Account' }).click();
  await page.locator('#type').selectOption('SAVINGS');
  await page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });
  await page.getByRole('button', { name: 'Open New Account' }).click();
  await expect(page.getByRole('heading', { name: 'Account Opened!' })).toBeVisible();

  // Part 2: transfer $50 from the first account to the second
  await page.getByRole('link', { name: 'Transfer Funds' }).click();
  await page.locator('#toAccountId option').nth(1).waitFor({ state: 'attached' });

  await page.locator('#amount').fill('50');
  await page.locator('#toAccountId').selectOption({ index: 1 });
  await page.getByRole('button', { name: 'Transfer' }).click();

  // Part 3: check the result
  await expect(page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
  await expect(page.getByText('$50.00 has been transferred')).toBeVisible();
});