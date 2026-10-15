import { test, expect } from '@playwright/test';

test('ParaBank home page opens', async ({ page }) => {
  await page.goto('index.htm');
  await expect(page).toHaveTitle(/ParaBank/);
  await expect(page.locator('input[name="username"]')).toBeVisible();
});