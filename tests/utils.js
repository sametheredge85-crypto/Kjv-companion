/**
 * Test utilities for KJV Companion test suite
 */

/**
 * Load and parse HTML file for testing
 * @param {string} fileName - Name of the HTML file to load
 * @returns {Document} Parsed HTML document
 */
function loadHTMLFile(fileName) {
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(__dirname, '../..', fileName);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  const html = fs.readFileSync(filePath, 'utf8');
  return html;
}

/**
 * Extract JavaScript from HTML script tags
 * @param {string} html - HTML content
 * @returns {string} Extracted JavaScript code
 */
function extractScript(html) {
  const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/i);
  return scriptMatch ? scriptMatch[1] : '';
}

/**
 * Extract CSS from HTML style tags
 * @param {string} html - HTML content
 * @returns {string} Extracted CSS code
 */
function extractStyles(html) {
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
  return styleMatch ? styleMatch[1] : '';
}

/**
 * Mock DOM environment with common elements
 * @param {object} elements - Element IDs and their types
 * @returns {object} Mock document object
 */
function createMockDOM(elements = {}) {
  const mockElements = {};
  
  Object.keys(elements).forEach(id => {
    const type = elements[id];
    mockElements[id] = {
      id,
      type,
      value: '',
      innerText: '',
      style: { display: 'none' },
      getAttribute: jest.fn(),
      setAttribute: jest.fn(),
    };
  });
  
  return {
    getElementById: jest.fn((id) => mockElements[id]),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(() => []),
  };
}

/**
 * Wait for condition to be true
 * @param {Function} condition - Function that returns boolean
 * @param {number} timeout - Maximum time to wait (ms)
 * @returns {Promise<boolean>}
 */
async function waitForCondition(condition, timeout = 5000) {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    if (condition()) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return false;
}

/**
 * Simulate user input event
 * @param {HTMLElement} element - Element to trigger event on
 * @param {string} value - Value to set
 */
function simulateInput(element, value) {
  element.value = value;
  const event = new Event('input', { bubbles: true });
  element.dispatchEvent(event);
}

/**
 * Simulate click event
 * @param {HTMLElement} element - Element to click
 */
function simulateClick(element) {
  const event = new MouseEvent('click', { bubbles: true });
  element.dispatchEvent(event);
}

/**
 * Check if HTML is valid structure
 * @param {string} html - HTML content
 * @returns {boolean}
 */
function isValidHTML(html) {
  return (
    html.includes('<!DOCTYPE html>') &&
    html.includes('<html') &&
    html.includes('<head>') &&
    html.includes('<body>')
  );
}

/**
 * Get all links from HTML
 * @param {string} html - HTML content
 * @returns {Array<string>}
 */
function extractLinks(html) {
  const linkRegex = /href=["']([^"']+)["']/g;
  const links = [];
  let match;
  
  while ((match = linkRegex.exec(html)) !== null) {
    links.push(match[1]);
  }
  
  return links;
}

/**
 * Check if file exists
 * @param {string} filePath - Path to file
 * @returns {boolean}
 */
function fileExists(filePath) {
  const fs = require('fs');
  return fs.existsSync(filePath);
}

module.exports = {
  loadHTMLFile,
  extractScript,
  extractStyles,
  createMockDOM,
  waitForCondition,
  simulateInput,
  simulateClick,
  isValidHTML,
  extractLinks,
  fileExists,
};
