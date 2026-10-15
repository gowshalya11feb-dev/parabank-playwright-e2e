import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 45000,
  expect: { timeout: 15000 },
  retries: 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'https://parabank.parasoft.com/parabank/',
    headless: true,
    screenshot: 'only-on-failure',
  },
});