import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './src',
  outputDir: './test-results',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'line',
  timeout: 60000,
  use: {
    browserName: 'chromium',
    baseURL: 'https://admin.moralis.io',
    trace: 'retain-on-failure',
    viewport: { width: 1920, height: 1080 },
    locale: 'en-GB',
    screenshot: 'only-on-failure',
    navigationTimeout: 5000,
    headless: false,
  },
  expect: {
    timeout: 5000,
  }
});
