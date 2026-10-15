import { test, expect } from '@playwright/test';
import { registerNewUser } from '../utils/helpers';

test('customer can open a new savings account', async ({ page }) => {
  await registerNewUser(page);

  await page.getByRole('link', { name: 'Open New Account' }).click();

  await page.locator('#type').selectOption('SAVINGS');

  await page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });

  await page.getByRole('button', { name: 'Open New Account' }).click();

  await expect(page.getByRole('heading', { name: 'Account Opened!' })).toBeVisible();
  await expect(page.locator('#newAccountId')).toBeVisible();
});