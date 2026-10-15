import { test, expect } from '@playwright/test';
import { registerNewUser } from '../utils/helpers';

test('registered customer can log in', async ({ page }) => {
  const { username, password } = await registerNewUser(page);

  await page.getByRole('link', { name: 'Log Out' }).click();

  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
});

test('login fails with wrong password', async ({ page }) => {
  await page.goto('index.htm');

  await page.locator('input[name="username"]').fill('nobody_exists');
  await page.locator('input[name="password"]').fill('wrongpass');
  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page.locator('.error')).toBeVisible();
});