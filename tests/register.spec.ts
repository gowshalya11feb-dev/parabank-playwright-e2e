import { test, expect } from '@playwright/test';

test('new customer can register', async ({ page }) => {
  const username = 'user' + Date.now();

  await page.goto('register.htm');

  await page.locator('[id="customer.firstName"]').fill('Test');
  await page.locator('[id="customer.lastName"]').fill('User');
  await page.locator('[id="customer.address.street"]').fill('123 Main Street');
  await page.locator('[id="customer.address.city"]').fill('Chennai');
  await page.locator('[id="customer.address.state"]').fill('TN');
  await page.locator('[id="customer.address.zipCode"]').fill('600001');
  await page.locator('[id="customer.phoneNumber"]').fill('9999999999');
  await page.locator('[id="customer.ssn"]').fill('123456789');
  await page.locator('[id="customer.username"]').fill(username);
  await page.locator('[id="customer.password"]').fill('Pass1234');
  await page.locator('#repeatedPassword').fill('Pass1234');

  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByRole('heading', { name: 'Welcome ' + username })).toBeVisible();
});