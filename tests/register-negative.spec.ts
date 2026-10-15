import { test, expect } from '@playwright/test';

test('registration fails when all fields are empty', async ({ page }) => {
  await page.goto('register.htm');

  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText('First name is required.')).toBeVisible();
  await expect(page.getByText('Last name is required.')).toBeVisible();
  await expect(page.getByText('Username is required.')).toBeVisible();
  await expect(page.getByText('Password is required.')).toBeVisible();
  await expect(page).toHaveURL(/register.htm/);
});

test('registration fails when passwords do not match', async ({ page }) => {
  await page.goto('register.htm');

  await page.locator('[id="customer.username"]').fill('user' + Date.now());
  await page.locator('[id="customer.password"]').fill('Pass1234');
  await page.locator('#repeatedPassword').fill('Different999');

  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText('Passwords did not match.')).toBeVisible();
  await expect(page).toHaveURL(/register.htm/);
});