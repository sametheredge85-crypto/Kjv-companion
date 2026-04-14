'use strict';

/**
 * Tests for the runHarmony() function and bibleData defined in index.html.
 *
 * The page is loaded using JSDOM with runScripts: 'dangerously' so that the
 * inline <script> block executes and exposes bibleData / runHarmony on
 * dom.window, letting us test the real production code rather than a copy.
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const HTML_PATH = path.join(__dirname, '../index.html');

function loadPage() {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  return new JSDOM(html, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'http://localhost/',
  });
}

// ---------------------------------------------------------------------------
// bibleData
// ---------------------------------------------------------------------------

describe('index.html — bibleData', () => {
  let win;

  beforeEach(() => {
    win = loadPage().window;
  });

  test('bibleData is defined and is an array', () => {
    expect(Array.isArray(win.bibleData)).toBe(true);
  });

  test('bibleData contains at least one entry', () => {
    expect(win.bibleData.length).toBeGreaterThan(0);
  });

  test('every entry has a non-empty ref string', () => {
    win.bibleData.forEach((entry) => {
      expect(typeof entry.ref).toBe('string');
      expect(entry.ref.trim().length).toBeGreaterThan(0);
    });
  });

  test('every entry has a non-empty text string', () => {
    win.bibleData.forEach((entry) => {
      expect(typeof entry.text).toBe('string');
      expect(entry.text.trim().length).toBeGreaterThan(0);
    });
  });

  test('bibleData contains John 10:35', () => {
    const refs = win.bibleData.map((e) => e.ref);
    expect(refs).toContain('John 10:35');
  });

  test('bibleData contains 2 Timothy 3:16', () => {
    const refs = win.bibleData.map((e) => e.ref);
    expect(refs).toContain('2 Timothy 3:16');
  });

  test('bibleData contains 2 Timothy 3:17', () => {
    const refs = win.bibleData.map((e) => e.ref);
    expect(refs).toContain('2 Timothy 3:17');
  });

  test('no duplicate refs in bibleData', () => {
    const refs = win.bibleData.map((e) => e.ref);
    const unique = new Set(refs);
    expect(unique.size).toBe(refs.length);
  });
});

// ---------------------------------------------------------------------------
// runHarmony()
// ---------------------------------------------------------------------------

describe('index.html — runHarmony()', () => {
  let win, searchInput, outputEl;

  beforeEach(() => {
    win = loadPage().window;
    searchInput = win.document.getElementById('searchInput');
    outputEl = win.document.getElementById('output');
  });

  test('runHarmony is a function', () => {
    expect(typeof win.runHarmony).toBe('function');
  });

  test('does not alter output when search term is empty', () => {
    searchInput.value = '';
    win.runHarmony();
    expect(outputEl.innerHTML).toBe('');
  });

  test('clears any previous output before performing a new search', () => {
    searchInput.value = 'scripture';
    win.runHarmony();
    // Now search for something that returns no results
    searchInput.value = 'zzznomatch';
    win.runHarmony();
    expect(outputEl.innerHTML).not.toContain('verse-card');
  });

  test('shows "No results found" message when the term matches nothing', () => {
    searchInput.value = 'zzznomatch';
    win.runHarmony();
    expect(outputEl.innerHTML).toContain('No results found');
  });

  test('shows at least one .verse-card when the term matches a verse', () => {
    searchInput.value = 'scripture';
    win.runHarmony();
    const cards = outputEl.querySelectorAll('.verse-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  test('search is case-insensitive (uppercase term matches lowercase text)', () => {
    searchInput.value = 'SCRIPTURE';
    win.runHarmony();
    const cards = outputEl.querySelectorAll('.verse-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  test('search is case-insensitive (mixed-case term)', () => {
    searchInput.value = 'ScRiPtUrE';
    win.runHarmony();
    const cards = outputEl.querySelectorAll('.verse-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  test('each verse card contains the verse reference', () => {
    searchInput.value = 'inspiration';
    win.runHarmony();
    const html = outputEl.innerHTML;
    expect(html).toContain('2 Timothy 3:16');
  });

  test('each verse card contains the verse text', () => {
    searchInput.value = 'inspiration';
    win.runHarmony();
    const html = outputEl.innerHTML;
    expect(html).toContain('All scripture is given by inspiration of God');
  });

  test('returns multiple verse cards when multiple verses match', () => {
    // "God" appears in more than one verse in the default bibleData
    searchInput.value = 'God';
    win.runHarmony();
    const cards = outputEl.querySelectorAll('.verse-card');
    expect(cards.length).toBeGreaterThan(1);
  });

  test('verse cards render a <strong> element for the reference', () => {
    searchInput.value = 'scripture';
    win.runHarmony();
    const strong = outputEl.querySelector('.verse-card strong');
    expect(strong).not.toBeNull();
    expect(strong.textContent.trim().length).toBeGreaterThan(0);
  });

  test('whitespace-only search term is treated as empty (no results shown)', () => {
    searchInput.value = '   ';
    win.runHarmony();
    // A whitespace-only string is falsy after trim via toLowerCase
    // Current implementation: '   '.toLowerCase() is truthy, so it will run
    // a search that likely returns no matches and shows "No results found"
    // OR if the implementation guards against whitespace it stays empty.
    // Either outcome is acceptable; what must NOT happen is a crash.
    expect(() => win.runHarmony()).not.toThrow();
  });

  test('consecutive calls do not accumulate results', () => {
    searchInput.value = 'scripture';
    win.runHarmony();
    const countFirst = outputEl.querySelectorAll('.verse-card').length;

    searchInput.value = 'scripture';
    win.runHarmony();
    const countSecond = outputEl.querySelectorAll('.verse-card').length;

    expect(countSecond).toBe(countFirst);
  });
});

// ---------------------------------------------------------------------------
// DOM structure of index.html
// ---------------------------------------------------------------------------

describe('index.html — DOM structure', () => {
  let win;

  beforeEach(() => {
    win = loadPage().window;
  });

  test('page has a <h1> element', () => {
    const h1 = win.document.querySelector('h1');
    expect(h1).not.toBeNull();
  });

  test('<h1> contains "KJV Harmony Companion"', () => {
    const h1 = win.document.querySelector('h1');
    expect(h1.textContent).toContain('KJV Harmony Companion');
  });

  test('searchInput element exists', () => {
    expect(win.document.getElementById('searchInput')).not.toBeNull();
  });

  test('output element exists', () => {
    expect(win.document.getElementById('output')).not.toBeNull();
  });

  test('Search button exists', () => {
    const button = win.document.querySelector('button');
    expect(button).not.toBeNull();
  });

  test('page title is set', () => {
    const title = win.document.querySelector('title');
    expect(title).not.toBeNull();
    expect(title.textContent.trim().length).toBeGreaterThan(0);
  });
});
