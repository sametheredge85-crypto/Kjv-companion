'use strict';

/**
 * Tests for the structure and navigation of HTML pages in the site.
 *
 * Each page is loaded via the jsdom JSDOM constructor (no scripts executed)
 * so we can inspect titles, headings, back links, and internal hrefs without
 * running any inline JavaScript.
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.join(__dirname, '..');

// All HTML files that should be validated.
// Excluded from this list:
//   - Files with spaces in their names (legacy/draft artefacts)
//   - Fragment snippets that are not full HTML documents:
//       audio-file.html  — bare <audio> snippet, no DOCTYPE/head/body
//       image-library.html — bare <img> snippet
//       images.html        — bare <img> snippet
//       script.html        — bare <script> snippet
//   - harmonizer.html — empty placeholder (0-byte file)
const PAGES = [
  'about.html',
  'annex-index.html',
  'annex-loader.html',
  'annex-private.html',
  'annex.html',
  'audio-library.html',
  'bible-questions.html',
  'context-restorer.html',
  'doctrinal-themes-map.html',
  'first-principles-engine.html',
  'first-principles.html',
  'how-to-use.html',
  'index.html',
  'john3-16-new-birth-eternal.html',
  'notes.html',
  'page-flow.html',
  'preacher-suite.html',
  'preaching-assistant.html',
  'qa.html',
  'sermons-half-hinges-of-the-bible.html',
  'settings.html',
  'visual-library.html',
].filter((f) => fs.existsSync(path.join(ROOT, f)));

function load(file) {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  return new JSDOM(html);
}

// ---------------------------------------------------------------------------
// Basic structural requirements
// ---------------------------------------------------------------------------

describe('HTML pages — DOCTYPE', () => {
  test.each(PAGES)('%s starts with <!DOCTYPE html>', (file) => {
    const raw = fs.readFileSync(path.join(ROOT, file), 'utf8');
    expect(raw.toLowerCase().trimStart()).toMatch(/^<!doctype html>/);
  });
});

describe('HTML pages — <title> element', () => {
  test.each(PAGES)('%s has a non-empty <title>', (file) => {
    const dom = load(file);
    const title = dom.window.document.querySelector('title');
    expect(title).not.toBeNull();
    expect(title.textContent.trim().length).toBeGreaterThan(0);
  });
});

describe('HTML pages — <body> element', () => {
  test.each(PAGES)('%s has a <body> element', (file) => {
    const dom = load(file);
    expect(dom.window.document.body).not.toBeNull();
  });
});

describe('HTML pages — charset meta tag', () => {
  test.each(PAGES)('%s declares UTF-8 charset', (file) => {
    const raw = fs.readFileSync(path.join(ROOT, file), 'utf8');
    expect(raw.toLowerCase()).toMatch(/charset=["']?utf-8["']?/);
  });
});

describe('HTML pages — viewport meta tag', () => {
  test.each(PAGES)('%s has a viewport meta tag', (file) => {
    const dom = load(file);
    const viewport = dom.window.document.querySelector('meta[name="viewport"]');
    expect(viewport).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Back links
// ---------------------------------------------------------------------------

describe('HTML pages — back links resolve to existing files', () => {
  PAGES.forEach((file) => {
    const dom = load(file);
    const backLinks = Array.from(
      dom.window.document.querySelectorAll('a.back[href]')
    );

    backLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        test(`${file}: back link "${href}" points to an existing file`, () => {
          expect(fs.existsSync(path.join(ROOT, href))).toBe(true);
        });
      }
    });
  });
});

// ---------------------------------------------------------------------------
// index.html specifics
// ---------------------------------------------------------------------------

describe('index.html — structure', () => {
  let doc;

  beforeAll(() => {
    doc = load('index.html').window.document;
  });

  test('has a search input with id="searchInput"', () => {
    expect(doc.getElementById('searchInput')).not.toBeNull();
  });

  test('search input is of type "text"', () => {
    const input = doc.getElementById('searchInput');
    // default input type is "text"; accept both explicit and implicit
    const type = input.getAttribute('type') || 'text';
    expect(type).toBe('text');
  });

  test('has an output container with id="output"', () => {
    expect(doc.getElementById('output')).not.toBeNull();
  });

  test('has a Search button', () => {
    const button = doc.querySelector('button');
    expect(button).not.toBeNull();
  });

  test('heading includes "KJV Harmony Companion"', () => {
    const h1 = doc.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain('KJV Harmony Companion');
  });
});

// ---------------------------------------------------------------------------
// settings.html specifics
// ---------------------------------------------------------------------------

describe('settings.html — navigation', () => {
  let doc;

  beforeAll(() => {
    doc = load('settings.html').window.document;
  });

  test('links to about.html', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('about.html');
  });

  test('has a back link to index.html', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('index.html');
  });
});

// ---------------------------------------------------------------------------
// preacher-suite.html specifics
// ---------------------------------------------------------------------------

describe('preacher-suite.html — navigation links', () => {
  let doc;

  beforeAll(() => {
    doc = load('preacher-suite.html').window.document;
  });

  test('links to preaching-assistant.html', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('preaching-assistant.html');
  });

  test('links to first-principles-engine.html', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('first-principles-engine.html');
  });

  test('links to doctrinal-themes-map.html', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('doctrinal-themes-map.html');
  });

  test('links to qa.html', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('qa.html');
  });

  test('links to harmonizer.html', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('harmonizer.html');
  });

  test('links to audio-library.html', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('audio-library.html');
  });
});

// ---------------------------------------------------------------------------
// doctrinal-themes-map.html specifics
// ---------------------------------------------------------------------------

describe('doctrinal-themes-map.html — content', () => {
  let doc;

  beforeAll(() => {
    doc = load('doctrinal-themes-map.html').window.document;
  });

  test('has at least 5 .theme-block sections', () => {
    const blocks = doc.querySelectorAll('.theme-block');
    expect(blocks.length).toBeGreaterThanOrEqual(5);
  });

  test('links to first-principles-engine.html', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('first-principles-engine.html');
  });

  test('links to context-restorer.html', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('context-restorer.html');
  });
});

// ---------------------------------------------------------------------------
// context-restorer.html specifics
// ---------------------------------------------------------------------------

describe('context-restorer.html — content', () => {
  let doc;

  beforeAll(() => {
    doc = load('context-restorer.html').window.document;
  });

  test('contains a textarea for pasting verses', () => {
    expect(doc.querySelector('textarea')).not.toBeNull();
  });

  test('links to harmonizer.html', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('harmonizer.html');
  });

  test('links to qa.html', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('qa.html');
  });
});

// ---------------------------------------------------------------------------
// john3-16-new-birth-eternal.html specifics
// ---------------------------------------------------------------------------

describe('john3-16-new-birth-eternal.html — content', () => {
  let doc;

  beforeAll(() => {
    doc = load('john3-16-new-birth-eternal.html').window.document;
  });

  test('heading mentions John 3:16', () => {
    const h1 = doc.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain('John 3:16');
  });

  test('has a Harmony section', () => {
    const headings = Array.from(doc.querySelectorAll('h2')).map((h) =>
      h.textContent.trim()
    );
    expect(headings).toContain('Harmony');
  });

  test('has a Context section', () => {
    const headings = Array.from(doc.querySelectorAll('h2')).map((h) =>
      h.textContent.trim()
    );
    expect(headings).toContain('Context');
  });

  test('lists at least 5 harmony verses', () => {
    // All harmony verses are in <li> elements inside the page
    const items = doc.querySelectorAll('li');
    expect(items.length).toBeGreaterThanOrEqual(5);
  });
});

// ---------------------------------------------------------------------------
// first-principles-engine.html specifics
// ---------------------------------------------------------------------------

describe('first-principles-engine.html — content', () => {
  let doc;

  beforeAll(() => {
    doc = load('first-principles-engine.html').window.document;
  });

  test('has a textarea for pasting verses', () => {
    expect(doc.querySelector('textarea')).not.toBeNull();
  });

  test('has at least 7 numbered step sections', () => {
    const steps = doc.querySelectorAll('.step');
    expect(steps.length).toBeGreaterThanOrEqual(7);
  });
});

// ---------------------------------------------------------------------------
// annex-index.html specifics
// ---------------------------------------------------------------------------

describe('annex-index.html — content', () => {
  let doc;

  beforeAll(() => {
    doc = load('annex-index.html').window.document;
  });

  test('heading is "Annex Library"', () => {
    const h1 = doc.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent.trim()).toBe('Annex Library');
  });

  test('links to john3-16-new-birth-eternal.html', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('john3-16-new-birth-eternal.html');
  });

  test('links back to annex.html', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('annex.html');
  });
});

// ---------------------------------------------------------------------------
// bible-questions.html specifics
// ---------------------------------------------------------------------------

describe('bible-questions.html — content', () => {
  let doc;

  beforeAll(() => {
    doc = load('bible-questions.html').window.document;
  });

  test('has a textarea for typing questions', () => {
    expect(doc.querySelector('textarea')).not.toBeNull();
  });

  test('links to harmonizer.html', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('harmonizer.html');
  });
});
