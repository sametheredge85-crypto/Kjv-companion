const { test, expect } = require('@playwright/test');

test.describe('KJV Companion - Index Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/KJV Harmony/i);
  });

  test('should display main heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should have input field visible', async ({ page }) => {
    const input = page.locator('#input');
    await expect(input).toBeVisible();
  });

  test('should show output when input is provided', async ({ page }) => {
    const input = page.locator('#input');
    const output = page.locator('#output');
    
    // Initially output should be hidden
    await expect(output).not.toBeVisible();
    
    // Enter text
    await input.fill('John 3:16');
    
    // Trigger the harmony function (if there's a button)
    const button = page.locator('button, .btn');
    if (await button.count() > 0) {
      await button.first().click();
      
      // Output should be visible after clicking
      await expect(output).toBeVisible();
    }
  });

  test('should have footer with KJV reference', async ({ page }) => {
    const footer = page.locator('.footer');
    await expect(footer).toContainText('KJV');
  });

  test('should be mobile responsive', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    const input = page.locator('#input');
    await expect(input).toBeVisible();
  });

  test('should have proper page structure', async ({ page }) => {
    // Check for essential elements
    await expect(page.locator('.container, .main, body')).toHaveCount(1);
    await expect(page.locator('.hero, h1')).toHaveCount(1);
  });
});

test.describe('Navigation Tests', () => {
  test('should navigate to different pages', async ({ page }) => {
    await page.goto('/index.html');
    
    // Look for navigation links
    const links = page.locator('a[href$=".html"]');
    const linkCount = await links.count();
    
    if (linkCount > 0) {
      const firstLink = links.first();
      const href = await firstLink.getAttribute('href');
      
      if (href && !href.startsWith('http')) {
        await firstLink.click();
        await page.waitForLoadState('networkidle');
        
        // Should navigate successfully
        expect(page.url()).toContain('.html');
      }
    }
  });
});

test.describe('Accessibility Tests', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/index.html');
    
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
  });

  test('should have lang attribute', async ({ page }) => {
    await page.goto('/index.html');
    
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/index.html');
    
    // Tab through the page
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });
});
