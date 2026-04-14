# Testing Guide for KJV Companion

## Overview

This document provides comprehensive information about the test suite for the KJV Companion project. The test coverage includes unit tests, integration tests, and end-to-end (E2E) tests to ensure the reliability and quality of the application.

## Test Structure

```
tests/
├── unit/                    # Unit tests for individual functions
│   └── harmony-function.test.js
├── integration/             # Integration tests for HTML pages
│   ├── index-page.test.js
│   └── pages-structure.test.js
├── e2e/                     # End-to-end tests with Playwright
│   ├── index.spec.js
│   ├── pages.spec.js
│   └── pwa-functionality.spec.js
└── setup.js                 # Test configuration and setup
```

## Prerequisites

Before running tests, ensure you have:

- Node.js (v18 or higher)
- npm (comes with Node.js)

## Installation

Install all test dependencies:

```bash
npm install
```

For Playwright E2E tests, install browsers:

```bash
npx playwright install
```

## Running Tests

### All Tests

Run the complete test suite:

```bash
npm test
```

### Unit Tests Only

Run unit tests in watch mode for development:

```bash
npm run test:watch
```

### Integration Tests Only

Run integration tests:

```bash
npm test tests/integration
```

### E2E Tests

Run Playwright end-to-end tests:

```bash
npm run test:e2e
```

Run E2E tests with UI (interactive mode):

```bash
npm run test:e2e:ui
```

### Test Coverage

Generate and view test coverage report:

```bash
npm run test:coverage
```

The coverage report will be generated in the `coverage/` directory. Open `coverage/lcov-report/index.html` in a browser to view detailed coverage.

## Test Categories

### 1. Unit Tests

Unit tests focus on individual JavaScript functions in isolation.

**What's Tested:**
- `runHarmony()` function behavior
- Input validation
- Verse detection logic
- DOM manipulation
- Content generation
- Edge cases and error handling

**Example:**
```javascript
test('should detect verse format', () => {
  const input = document.getElementById('input');
  input.value = 'John 3:16';
  runHarmony();
  expect(title.innerText).toContain('John 3:16');
});
```

### 2. Integration Tests

Integration tests verify that HTML pages are properly structured and components work together.

**What's Tested:**
- Page structure and layout
- HTML validity
- CSS styling presence
- Navigation links
- Accessibility features
- Form elements
- Footer content

**Example:**
```javascript
test('should have all required output sections', () => {
  expect(document.getElementById('title')).toBeTruthy();
  expect(document.getElementById('short')).toBeTruthy();
  expect(document.getElementById('context')).toBeTruthy();
});
```

### 3. E2E Tests (Playwright)

End-to-end tests simulate real user interactions across multiple browsers.

**What's Tested:**
- Complete user workflows
- Cross-browser compatibility
- Mobile responsiveness
- PWA functionality
- Performance
- Accessibility
- Visual consistency
- Form submissions

**Example:**
```javascript
test('should load the homepage successfully', async ({ page }) => {
  await page.goto('/index.html');
  await expect(page).toHaveTitle(/KJV Harmony/i);
});
```

## Coverage Goals

The project aims for the following coverage thresholds:

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

These thresholds are enforced in `jest.config.js`.

## Continuous Integration

Tests run automatically on:
- Push to `main`, `develop`, or `copilot/**` branches
- Pull requests to `main` or `develop`
- Manual workflow dispatch

The CI pipeline includes:
1. Unit tests
2. Integration tests
3. E2E tests (Playwright)
4. Coverage reporting
5. Code quality checks

## Writing New Tests

### Adding a Unit Test

1. Create a new test file in `tests/unit/`
2. Follow the naming convention: `*.test.js`
3. Use Jest's `describe` and `test` blocks
4. Mock DOM elements as needed

Example:
```javascript
describe('New Feature Tests', () => {
  test('should do something', () => {
    // Your test code
    expect(result).toBe(expected);
  });
});
```

### Adding an Integration Test

1. Create a new test file in `tests/integration/`
2. Load the HTML file using `fs.readFileSync()`
3. Test the structure and behavior

### Adding an E2E Test

1. Create a new spec file in `tests/e2e/`
2. Follow the naming convention: `*.spec.js`
3. Use Playwright's `test` and `expect` APIs
4. Test real user interactions

Example:
```javascript
test('should navigate successfully', async ({ page }) => {
  await page.goto('/index.html');
  await page.click('a[href="about.html"]');
  await expect(page).toHaveURL(/about.html/);
});
```

## Best Practices

1. **Keep tests focused**: Each test should verify one specific behavior
2. **Use descriptive names**: Test names should clearly state what they're testing
3. **Avoid test interdependencies**: Tests should be able to run in any order
4. **Clean up after tests**: Use `beforeEach` and `afterEach` hooks
5. **Mock external dependencies**: Don't rely on external services
6. **Test edge cases**: Include tests for error conditions and boundary values

## Debugging Tests

### Debug Jest Tests

Run tests with Node debugger:

```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Debug Playwright Tests

Run Playwright in debug mode:

```bash
npx playwright test --debug
```

View Playwright trace:

```bash
npx playwright show-trace trace.zip
```

## Common Issues

### Issue: Tests fail with "Cannot find module"
**Solution**: Run `npm install` to ensure all dependencies are installed

### Issue: Playwright browsers not found
**Solution**: Run `npx playwright install --with-deps`

### Issue: Tests pass locally but fail in CI
**Solution**: Check browser compatibility and ensure consistent Node.js version

## Coverage Reports

After running `npm run test:coverage`, you can view:

- **Terminal output**: Summary of coverage
- **HTML report**: `coverage/lcov-report/index.html`
- **LCOV file**: `coverage/lcov.info` (for CI tools)

## Contributing

When contributing code:

1. Write tests for new features
2. Ensure all tests pass: `npm test`
3. Maintain or improve coverage: `npm run test:coverage`
4. Run E2E tests: `npm run test:e2e`

## Test Areas Covered

### ✅ Currently Tested

- [x] Input validation (empty, whitespace, valid content)
- [x] Verse detection (formats, multiple verses)
- [x] DOM manipulation and updates
- [x] Content generation (short answer, context, harmony, application)
- [x] HTML page structure (all major pages)
- [x] Navigation links
- [x] Accessibility features (lang, headings, ARIA)
- [x] Responsive design (mobile, tablet, desktop)
- [x] Cross-browser compatibility
- [x] PWA features
- [x] Form functionality

### 📋 Areas for Future Testing

- [ ] Service Worker offline functionality
- [ ] Local storage persistence
- [ ] Audio/video player functionality (if applicable)
- [ ] Bible verse API integration (if applicable)
- [ ] Complex user workflows (multi-step processes)
- [ ] Performance benchmarks
- [ ] Security testing (XSS, CSRF)

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [Web Accessibility Testing](https://www.w3.org/WAI/test-evaluate/)

## Support

For issues or questions about testing:
1. Check this documentation
2. Review existing tests for examples
3. Open an issue on GitHub
4. Contact the development team

---

**Last Updated**: 2026-04-13
**Test Framework Version**: Jest 29.7.0, Playwright 1.40.0
