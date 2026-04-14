/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const { getByText, getByPlaceholderText } = require('@testing-library/dom');

describe('Index Page Integration Tests', () => {
  beforeEach(() => {
    // Load the index.html file
    const html = fs.readFileSync(
      path.join(__dirname, '../../index.html'),
      'utf8'
    );
    document.body.innerHTML = html;
  });

  describe('Page Structure', () => {
    test('should have main title', () => {
      expect(document.querySelector('h1')).toBeTruthy();
      const title = document.querySelector('h1');
      expect(title.textContent).toContain('Harmony');
    });

    test('should have input field', () => {
      const input = document.getElementById('input');
      expect(input).toBeTruthy();
      expect(input.tagName).toBe('INPUT');
    });

    test('should have output container', () => {
      const output = document.getElementById('output');
      expect(output).toBeTruthy();
    });

    test('should have all required output sections', () => {
      expect(document.getElementById('title')).toBeTruthy();
      expect(document.getElementById('short')).toBeTruthy();
      expect(document.getElementById('context')).toBeTruthy();
      expect(document.getElementById('harmony')).toBeTruthy();
      expect(document.getElementById('application')).toBeTruthy();
    });
  });

  describe('Styling and CSS', () => {
    test('should have embedded styles', () => {
      const styles = document.querySelectorAll('style');
      expect(styles.length).toBeGreaterThan(0);
    });

    test('should use Georgia font family', () => {
      const styles = document.querySelector('style');
      expect(styles.textContent).toContain('Georgia');
    });

    test('should have responsive design elements', () => {
      const styles = document.querySelector('style');
      expect(styles.textContent).toContain('max-width');
    });
  });

  describe('Footer Content', () => {
    test('should have footer', () => {
      const footer = document.querySelector('.footer');
      expect(footer).toBeTruthy();
    });

    test('should have KJV reference in footer', () => {
      const footer = document.querySelector('.footer');
      expect(footer.textContent).toContain('KJV');
    });
  });
});
