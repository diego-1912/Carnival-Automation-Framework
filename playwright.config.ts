import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './carnival_tests/tests',
  testMatch: '**/*.spec.ts',
  outputDir: 'test-results/',
  timeout: 180000,
  expect: {
    timeout: 60000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 3,
  workers: process.env.CI ? 4 : 4,
  reporter: [
    ['html', { 
      outputFolder: 'playwright-report',
      attachmentsBaseURL: './data/',  
    }],
    ['list'],
  ],
  use: {
    trace: 'on-first-retry',
    actionTimeout: 90000,
    navigationTimeout: 110000,
    locale: 'en-US',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    baseURL: process.env.TEST_BASE_URL || 'https://www.carnival.com/',

    // Screenshot configuration
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'], // Use Firefox devices for Firefox
      },
    },
    {
      name: 'mobile-chrome-samsung',
      use: {
        ...devices['Galaxy S21'],
        browserName: 'chromium', // Mobile Chrome browser on Android
      },
    },
  ],
});
