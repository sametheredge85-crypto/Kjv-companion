const { test, expect } = require('@playwright/test');

test.describe('Bible Tools Pages E2E Tests', () => {
  const pages = [
    { path: '/bible-questions.html', title: 'Bible Questions' },
    { path: '/context-restorer.html', title: 'Context Restorer' },
    { path: '/first-principles.html', title: 'First Principles' },
    { path: '/first-principles-engine.html', title: 'First Principles Engine' },
  ];

  pages.forEach(({ path: pagePath, title }) => {
    test.describe(title, () => {
      test('should load page successfully', async ({ page }) => {
        await page.goto(pagePath);
        await expect(page).toHaveTitle(new RegExp(title, 'i'));
      });

      test('should display page heading', async ({ page }) => {
        await page.goto(pagePath);
        const heading = page.locator('h1');
        await expect(heading).toBeVisible();
        await expect(heading).toContainText(title);
      });

      test('should have back link to index', async ({ page }) => {
        await page.goto(pagePath);
        const backLink = page.locator('a[href*="index.html"]');
        
        if (await backLink.count() > 0) {
          await expect(backLink.first()).toBeVisible();
        }
      });

      test('should be responsive', async ({ page }) => {
        await page.goto(pagePath);
        
        // Test mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        const heading = page.locator('h1');
        await expect(heading).toBeVisible();
        
        // Test tablet viewport
        await page.setViewportSize({ width: 768, height: 1024 });
        await expect(heading).toBeVisible();
      });
    });
  });
});

test.describe('Interactive Elements Tests', () => {
  test('context-restorer should have textarea', async ({ page }) => {
    await page.goto('/context-restorer.html');
    
    const textarea = page.locator('textarea');
    await expect(textarea).toBeVisible();
    await expect(textarea).toHaveAttribute('placeholder');
  });

  test('bible-questions should have textarea', async ({ page }) => {
    await page.goto('/bible-questions.html');
    
    const textarea = page.locator('textarea');
    await expect(textarea).toBeVisible();
  });

  test('first-principles-engine should have textarea', async ({ page }) => {
    await page.goto('/first-principles-engine.html');
    
    const textarea = page.locator('textarea');
    await expect(textarea).toBeVisible();
  });
});

test.describe('Content Validation', () => {
  test('pages should have instructions', async ({ page }) => {
    await page.goto('/context-restorer.html');
    
    const instructions = page.locator('.instructions, .step');
    await expect(instructions.first()).toBeVisible();
  });

  test('pages should reference KJV', async ({ page }) => {
    await page.goto('/bible-questions.html');
    
    const body = page.locator('body');
    await expect(body).toContainText('KJV');
  });

  test('first-principles should list principles', async ({ page }) => {
    await page.goto('/first-principles.html');
    
    const sections = page.locator('.section');
    const count = await sections.count();
    expect(count).toBeGreaterThan(3);
  });
});
