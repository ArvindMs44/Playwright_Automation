const { test, expect } = require('@playwright/test');

  test('Test Email Accessibility', async ({ page }) => {
    await page.goto('https://development.circulation.care/login')
    const email = page.locator('#user-email');
    const arialabelattributeValue =  await email.getAttribute('aria-label');
    expect(arialabelattributeValue).toBe('Email');
  });

  test('Test Password Accessibility', async ({ page }) => {
    await page.goto('https://development.circulation.care/login')
    const email = page.locator('#password');
    const arialabelattributeValue =  await email.getAttribute('placeholder');
    expect(arialabelattributeValue).toBe('Password');
  });