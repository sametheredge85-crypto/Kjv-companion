'use strict';

/**
 * Tests for manifest.json — validates that the PWA manifest is well-formed
 * and contains all required fields needed for a valid web app manifest.
 */

const fs = require('fs');
const path = require('path');

const MANIFEST_PATH = path.join(__dirname, '../manifest.json');

describe('manifest.json', () => {
  let raw, manifest;

  beforeAll(() => {
    raw = fs.readFileSync(MANIFEST_PATH, 'utf8');
    manifest = JSON.parse(raw);
  });

  // ---------------------------------------------------------------------------
  // File validity
  // ---------------------------------------------------------------------------

  test('file exists', () => {
    expect(fs.existsSync(MANIFEST_PATH)).toBe(true);
  });

  test('is valid JSON', () => {
    expect(() => JSON.parse(raw)).not.toThrow();
  });

  test('parsed value is a plain object', () => {
    expect(manifest !== null && typeof manifest === 'object' && !Array.isArray(manifest)).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // Required fields (per W3C Web App Manifest spec)
  // ---------------------------------------------------------------------------

  test('has a "name" field', () => {
    expect(typeof manifest.name).toBe('string');
    expect(manifest.name.trim().length).toBeGreaterThan(0);
  });

  test('has a "short_name" field', () => {
    expect(typeof manifest.short_name).toBe('string');
    expect(manifest.short_name.trim().length).toBeGreaterThan(0);
  });

  test('short_name is no longer than 15 characters (home-screen label)', () => {
    // Common guidance: keep short_name reasonably short to avoid truncation on home screens
    expect(manifest.short_name.length).toBeLessThanOrEqual(15);
  });

  test('has a "start_url" field', () => {
    expect(manifest.start_url).toBeDefined();
    expect(typeof manifest.start_url).toBe('string');
    expect(manifest.start_url.trim().length).toBeGreaterThan(0);
  });

  test('has a "display" field with a valid value', () => {
    const validValues = ['fullscreen', 'standalone', 'minimal-ui', 'browser'];
    expect(validValues).toContain(manifest.display);
  });

  test('display is "standalone" (required for Add-to-Home-Screen prompt)', () => {
    expect(manifest.display).toBe('standalone');
  });

  // ---------------------------------------------------------------------------
  // Icons
  // ---------------------------------------------------------------------------

  test('has an "icons" array', () => {
    expect(Array.isArray(manifest.icons)).toBe(true);
  });

  test('icons array is not empty', () => {
    expect(manifest.icons.length).toBeGreaterThan(0);
  });

  test('every icon has a "src" property', () => {
    manifest.icons.forEach((icon) => {
      expect(typeof icon.src).toBe('string');
      expect(icon.src.trim().length).toBeGreaterThan(0);
    });
  });

  test('every icon has a "sizes" property', () => {
    manifest.icons.forEach((icon) => {
      expect(typeof icon.sizes).toBe('string');
      expect(icon.sizes.trim().length).toBeGreaterThan(0);
    });
  });

  test('every icon has a "type" property', () => {
    manifest.icons.forEach((icon) => {
      expect(typeof icon.type).toBe('string');
      expect(icon.type.trim().length).toBeGreaterThan(0);
    });
  });

  test('includes at least one icon sized 192x192 or larger', () => {
    const large = manifest.icons.filter((icon) => {
      const sizes = icon.sizes.split(' ');
      return sizes.some((s) => {
        const [w, h] = s.split('x').map(Number);
        return w >= 192 && h >= 192;
      });
    });
    expect(large.length).toBeGreaterThan(0);
  });

  // ---------------------------------------------------------------------------
  // Optional but expected fields
  // ---------------------------------------------------------------------------

  test('has a "description" field', () => {
    expect(typeof manifest.description).toBe('string');
    expect(manifest.description.trim().length).toBeGreaterThan(0);
  });

  test('has a "background_color" field in hex format', () => {
    expect(typeof manifest.background_color).toBe('string');
    expect(manifest.background_color).toMatch(/^#[0-9a-fA-F]{3,8}$/);
  });

  test('has a "theme_color" field in hex format', () => {
    expect(typeof manifest.theme_color).toBe('string');
    expect(manifest.theme_color).toMatch(/^#[0-9a-fA-F]{3,8}$/);
  });
});
