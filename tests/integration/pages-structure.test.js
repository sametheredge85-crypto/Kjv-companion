/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('HTML Pages Structure Tests', () => {
  const htmlFiles = [
    'bible-questions.html',
    'context-restorer.html',
    'first-principles.html',
    'first-principles-engine.html',
    'about.html'
  ];

  htmlFiles.forEach(fileName => {
    describe(`${fileName}`, () => {
      let document;

      beforeEach(() => {
        const filePath = path.join(__dirname, '../../', fileName);
        if (fs.existsSync(filePath)) {
          const html = fs.readFileSync(filePath, 'utf8');
          const parser = new DOMParser();
          document = parser.parseFromString(html, 'text/html');
        }
      });

      test('should have valid HTML structure', () => {
        expect(document).toBeTruthy();
        expect(document.querySelector('html')).toBeTruthy();
        expect(document.querySelector('head')).toBeTruthy();
        expect(document.querySelector('body')).toBeTruthy();
      });

      test('should have title', () => {
        const title = document.querySelector('title');
        expect(title).toBeTruthy();
        expect(title.textContent.length).toBeGreaterThan(0);
      });

      test('should have charset meta tag', () => {
        const charset = document.querySelector('meta[charset]');
        expect(charset).toBeTruthy();
        expect(charset.getAttribute('charset')).toBe('UTF-8');
      });

      test('should have viewport meta tag', () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        expect(viewport).toBeTruthy();
      });

      test('should have at least one heading', () => {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        expect(headings.length).toBeGreaterThan(0);
      });

      test('should have embedded styles', () => {
        const styles = document.querySelectorAll('style');
        expect(styles.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Navigation Links', () => {
    test('pages should link back to index', () => {
      const pagesWithBackLinks = [
        'bible-questions.html',
        'context-restorer.html',
        'first-principles.html'
      ];

      pagesWithBackLinks.forEach(fileName => {
        const filePath = path.join(__dirname, '../../', fileName);
        if (fs.existsSync(filePath)) {
          const html = fs.readFileSync(filePath, 'utf8');
          expect(html).toContain('index.html');
        }
      });
    });
  });

  describe('Accessibility Features', () => {
    htmlFiles.forEach(fileName => {
      test(`${fileName} should have lang attribute`, () => {
        const filePath = path.join(__dirname, '../../', fileName);
        if (fs.existsSync(filePath)) {
          const html = fs.readFileSync(filePath, 'utf8');
          expect(html).toContain('lang="en"');
        }
      });
    });
  });
});
