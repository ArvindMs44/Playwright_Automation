// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 2,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: false,
  },

  projects: 
  [

    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'],
      viewport: { width: 1920, height: 1080 }},
    },

    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'],
      viewport: { width: 1920, height: 1080 }},
    },

    {
      name: 'Webkit',
      use: { ...devices['Desktop Safari'],
      viewport: { width: 1920, height: 1080 }},
    },

    {
       name: 'Edge',
       use: { ...devices['Desktop Edge'],
       viewport: { width: 1920, height: 1080 }},
    },

    {
      name: 'AndroidTab',
      use: { ...devices['Galaxy Tab S4 landscape'] },
    },

    {
      name: 'IphoneTab',
      use: { ...devices['iPad Pro 11 landscape'] },
    },

  ],

});

