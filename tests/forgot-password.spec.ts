import { test, expect } from '@playwright/test';

test.describe('Forgot Password Flow', () => {
  test('user can request recovery email and reset password', async ({ page }) => {
    await page.goto('/');

    // Go to Forgot Password from Login
    await page.getByRole('button', { name: 'Forgot Password' }).click();

    // Email step
    await page.getByPlaceholder('Johndoe@gmail.com').fill('test@example.com');
    await page.getByRole('button', { name: 'Send Recovery Email' }).click();

    // Wait for reset step to appear
    await expect(page.getByRole('heading', { name: 'Set New Password' })).toBeVisible();

    // Reset step
    await page.getByLabel('New Password').fill('password123');
    await page.getByLabel('Confirm Password').fill('password123');
    await page.getByRole('button', { name: 'Update Password' }).click();

    // After successful reset user is returned to login
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();

    // Success toast should appear briefly
    await expect(page.getByText('Password updated successfully', { exact: false })).toBeVisible({ timeout: 7000 });
  });
});

