import { test, expect } from '@playwright/test';

test.describe('Social Buttons', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/');
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });

  test('should display all three social login buttons', async ({ page }) => {
    // Wait for the social buttons to be visible
    await page.waitForSelector('[aria-label="Sign in with Google"]', { timeout: 10000 });
    
    // Check that all three social buttons are visible
    await expect(page.getByRole('button', { name: 'Sign in with Google' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in with GitHub' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in with Facebook' })).toBeVisible();
  });

  test('should have correct icons and images', async ({ page }) => {
    // Wait for social buttons to be visible
    await page.waitForSelector('[aria-label="Sign in with Google"]', { timeout: 10000 });
    
    // Check Google button has the Google logo image
    const googleButton = page.getByRole('button', { name: 'Sign in with Google' });
    await expect(googleButton.locator('img[alt=""]')).toBeVisible();
    await expect(googleButton.locator('img')).toHaveAttribute('src', 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png');

    // Check GitHub button has the GitHub icon
    const githubButton = page.getByRole('button', { name: 'Sign in with GitHub' });
    await expect(githubButton.locator('svg')).toBeVisible();

    // Check Facebook button has the Facebook icon
    const facebookButton = page.getByRole('button', { name: 'Sign in with Facebook' });
    await expect(facebookButton.locator('svg')).toBeVisible();
  });

  test('should be clickable and trigger social login', async ({ page }) => {
    // Wait for social buttons to be visible
    await page.waitForSelector('[aria-label="Sign in with Google"]', { timeout: 10000 });

    // Click Google button
    await page.getByRole('button', { name: 'Sign in with Google' }).click();
    
    // Wait for page to change to success page
    await page.waitForSelector('text=Successfully logged in with Google!', { timeout: 10000 });
    
    // Check that we're on the success page
    await expect(page.getByText('Successfully logged in with Google!').first()).toBeVisible();
  });

  test('should work on both login and signup pages', async ({ page }) => {
    // Wait for social buttons to be visible on login page
    await page.waitForSelector('[aria-label="Sign in with Google"]', { timeout: 10000 });
    
    // Test on login page (default)
    await expect(page.getByRole('button', { name: 'Sign in with Google' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in with GitHub' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in with Facebook' })).toBeVisible();

    // Navigate to signup page
    await page.getByRole('button', { name: 'Go to sign up page' }).click();
    
    // Wait for social buttons to be visible on signup page
    await page.waitForSelector('[aria-label="Sign in with Google"]', { timeout: 10000 });
    
    // Check that social buttons are still visible on signup page
    await expect(page.getByRole('button', { name: 'Sign in with Google' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in with GitHub' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in with Facebook' })).toBeVisible();
  });

  test('should have proper styling in dark theme', async ({ page }) => {
    // Wait for social buttons to be visible
    await page.waitForSelector('[aria-label="Sign in with Google"]', { timeout: 10000 });
    
    // Check that buttons have dark theme styling (default theme)
    const googleButton = page.getByRole('button', { name: 'Sign in with Google' });
    await expect(googleButton).toHaveClass(/border-gray-700/);
  });

  test('should have proper styling in light theme', async ({ page }) => {
    // Wait for social buttons to be visible
    await page.waitForSelector('[aria-label="Sign in with Google"]', { timeout: 10000 });
    
    // Click theme toggle button to switch to light theme
    await page.getByRole('button', { name: 'Switch to light mode' }).click();
    
    // Wait for theme change to take effect
    await page.waitForTimeout(500);

    // Check that buttons have light theme styling
    const googleButton = page.getByRole('button', { name: 'Sign in with Google' });
    await expect(googleButton).toHaveClass(/border-gray-300/);
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    // Wait for social buttons to be visible
    await page.waitForSelector('[aria-label="Sign in with Google"]', { timeout: 10000 });
    
    // Check aria-labels
    await expect(page.getByRole('button', { name: 'Sign in with Google' })).toHaveAttribute('aria-label', 'Sign in with Google');
    await expect(page.getByRole('button', { name: 'Sign in with GitHub' })).toHaveAttribute('aria-label', 'Sign in with GitHub');
    await expect(page.getByRole('button', { name: 'Sign in with Facebook' })).toHaveAttribute('aria-label', 'Sign in with Facebook');

    // Check that icons have aria-hidden="true"
    const googleButton = page.getByRole('button', { name: 'Sign in with Google' });
    await expect(googleButton.locator('img')).toHaveAttribute('aria-hidden', 'true');
    
    const githubButton = page.getByRole('button', { name: 'Sign in with GitHub' });
    await expect(githubButton.locator('svg')).toHaveAttribute('aria-hidden', 'true');
    
    const facebookButton = page.getByRole('button', { name: 'Sign in with Facebook' });
    await expect(facebookButton.locator('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  test('should handle hover and tap animations', async ({ page }) => {
    // Wait for social buttons to be visible
    await page.waitForSelector('[aria-label="Sign in with Google"]', { timeout: 10000 });
    
    const googleButton = page.getByRole('button', { name: 'Sign in with Google' });
    
    // Test hover effect - button should be visible and interactive
    await googleButton.hover();
    await expect(googleButton).toBeVisible();
    
    // Test that button has hover styles applied (scale effect)
    // Note: We can't easily test the actual scale transformation in Playwright,
    // but we can verify the button is still functional after hover
    
    // Move mouse away to reset hover state
    await page.mouse.move(0, 0);
    
    // Test click functionality - this will trigger tap animation and page change
    await googleButton.click();
    
    // After click, we should be redirected to success page
    await page.waitForSelector('text=Successfully logged in with Google!', { timeout: 5000 });
    await expect(page.getByText('Successfully logged in with Google!').first()).toBeVisible();
  });

  test('should be properly arranged in a grid layout', async ({ page }) => {
    // Wait for social buttons to be visible
    await page.waitForSelector('[aria-label="Sign in with Google"]', { timeout: 10000 });
    
    // Check that the social buttons container has grid layout
    const socialButtonsContainer = page.locator('div.grid.grid-cols-3.gap-3').first();
    await expect(socialButtonsContainer).toHaveClass(/grid/);
    await expect(socialButtonsContainer).toHaveClass(/grid-cols-3/);
  });
});