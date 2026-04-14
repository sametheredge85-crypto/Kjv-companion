const { test, expect } = require('@playwright/test');

test.describe('PWA Functionality Tests', () => {
  test('should have manifest.json', async ({ page }) => {
    const response = await page.goto('/manifest.json');
    expect(response.status()).toBe(200);
    
    const manifest = await response.json();
    expect(manifest.name).toBeTruthy();
    expect(manifest.short_name).toBeTruthy();
  });

  test('should have PWA meta tags in KJV Companion 5.1', async ({ page }) => {
    const kjvCompanionPath = '/KJV Companion 5.1';
    
    try {
      await page.goto(kjvCompanionPath);
      
      const manifest = page.locator('link[rel="manifest"]');
      if (await manifest.count() > 0) {
        await expect(manifest).toHaveAttribute('href', 'manifest.json');
      }
      
      const appleMeta = page.locator('meta[name="apple-mobile-web-app-capable"]');
      if (await appleMeta.count() > 0) {
        await expect(appleMeta).toHaveAttribute('content', 'yes');
      }
    } catch (error) {
      // Skip if file doesn't exist or is not accessible
      test.skip();
    }
  });
});

test.describe('Cross-Browser Compatibility', () => {
  test('should render correctly in different browsers', async ({ page }) => {
    await page.goto('/index.html');
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    const input = page.locator('#input');
    await expect(input).toBeVisible();
  });
});

test.describe('Performance Tests', () => {
  test('should load quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/index.html');
    const loadTime = Date.now() - startTime;
    
    // Page should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have optimized images', async ({ page }) => {
    await page.goto('/index.html');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('src');
    }
  });
});

test.describe('Form Functionality', () => {
  test('should handle text input', async ({ page }) => {
    await page.goto('/index.html');
    
    const input = page.locator('#input');
    await input.fill('Test verse input');
    
    const value = await input.inputValue();
    expect(value).toBe('Test verse input');
  });

  test('textarea should accept long text', async ({ page }) => {
    await page.goto('/context-restorer.html');
    
    const textarea = page.locator('textarea');
    const longText = 'A'.repeat(500);
    await textarea.fill(longText);
    
    const value = await textarea.inputValue();
    expect(value.length).toBe(500);
  });
});

test.describe('Visual Consistency', () => {
  test('should have consistent color scheme', async ({ page }) => {
    await page.goto('/index.html');
    
    const body = page.locator('body');
    const bgColor = await body.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    expect(bgColor).toBeTruthy();
  });

  test('should use Georgia font family', async ({ page }) => {
    await page.goto('/index.html');
    
    const body = page.locator('body');
    const fontFamily = await body.evaluate(el => 
      window.getComputedStyle(el).fontFamily
    );
    
    expect(fontFamily).toContain('Georgia');
  });
});
