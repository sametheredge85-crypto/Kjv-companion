/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('runHarmony Function Tests', () => {
  let document;

  beforeEach(() => {
    // Set up DOM structure needed for the function
    document = global.document;
    document.body.innerHTML = `
      <input id="input" value="" />
      <div id="output" style="display: none;">
        <div id="title"></div>
        <div id="short"></div>
        <div id="context"></div>
        <div id="harmony"></div>
        <div id="application"></div>
      </div>
    `;

    // Load and execute the function
    const scriptContent = fs.readFileSync(
      path.join(__dirname, '../../script.html'),
      'utf8'
    );
    
    // Extract just the function code
    const functionMatch = scriptContent.match(/function runHarmony\(\) \{[\s\S]*?\n\}/);
    if (functionMatch) {
      eval(functionMatch[0]);
      global.runHarmony = runHarmony;
    }
  });

  describe('Input Validation', () => {
    test('should not display output when input is empty', () => {
      const input = document.getElementById('input');
      const output = document.getElementById('output');
      
      input.value = '';
      global.runHarmony();
      
      expect(output.style.display).toBe('none');
    });

    test('should not display output when input is only whitespace', () => {
      const input = document.getElementById('input');
      const output = document.getElementById('output');
      
      input.value = '   ';
      global.runHarmony();
      
      expect(output.style.display).toBe('none');
    });

    test('should display output when input has valid content', () => {
      const input = document.getElementById('input');
      const output = document.getElementById('output');
      
      input.value = 'John 3:16';
      global.runHarmony();
      
      expect(output.style.display).toBe('block');
    });
  });

  describe('Verse Detection', () => {
    test('should detect verse format (book chapter:verse)', () => {
      const input = document.getElementById('input');
      const title = document.getElementById('title');
      
      input.value = 'John 3:16';
      global.runHarmony();
      
      expect(title.innerText).toContain('John 3:16');
      expect(title.innerText).toContain('KJV Harmony —');
    });

    test('should handle non-verse input', () => {
      const input = document.getElementById('input');
      const title = document.getElementById('title');
      
      input.value = 'What is salvation?';
      global.runHarmony();
      
      expect(title.innerText).toBe('KJV Harmony Inquiry');
    });

    test('should detect verse with multiple verses', () => {
      const input = document.getElementById('input');
      const title = document.getElementById('title');
      
      input.value = 'Romans 8:28-30';
      global.runHarmony();
      
      expect(title.innerText).toContain('Romans 8:28-30');
    });
  });

  describe('Content Generation', () => {
    test('should generate short answer', () => {
      const input = document.getElementById('input');
      const short = document.getElementById('short');
      
      input.value = 'John 3:16';
      global.runHarmony();
      
      expect(short.innerText).toBeTruthy();
      expect(short.innerText.length).toBeGreaterThan(0);
    });

    test('should generate context explanation', () => {
      const input = document.getElementById('input');
      const context = document.getElementById('context');
      
      input.value = 'John 3:16';
      global.runHarmony();
      
      expect(context.innerText).toBeTruthy();
      expect(context.innerText).toContain('counsel of God');
    });

    test('should include doctrinal anchors in harmony section', () => {
      const input = document.getElementById('input');
      const harmony = document.getElementById('harmony');
      
      input.value = 'John 3:16';
      global.runHarmony();
      
      expect(harmony.innerText).toContain('God is the acting subject');
      expect(harmony.innerText).toContain('Scripture interprets Scripture');
    });

    test('should generate application text', () => {
      const input = document.getElementById('input');
      const application = document.getElementById('application');
      
      input.value = 'John 3:16';
      global.runHarmony();
      
      expect(application.innerText).toBeTruthy();
      expect(application.innerText).toContain('Seek');
    });
  });

  describe('Context-Specific Behavior', () => {
    test('should provide verse-specific context for verse input', () => {
      const input = document.getElementById('input');
      const context = document.getElementById('context');
      
      input.value = 'Romans 3:23';
      global.runHarmony();
      
      expect(context.innerText).toContain('verse');
      expect(context.innerText).toContain('setting');
    });

    test('should provide question-specific context for non-verse input', () => {
      const input = document.getElementById('input');
      const context = document.getElementById('context');
      
      input.value = 'What is predestination?';
      global.runHarmony();
      
      expect(context.innerText).toContain('question');
      expect(context.innerText).toContain('whole counsel');
    });
  });

  describe('Edge Cases', () => {
    test('should handle special characters in input', () => {
      const input = document.getElementById('input');
      
      input.value = 'John 3:16 - <test> & "quoted"';
      
      expect(() => global.runHarmony()).not.toThrow();
    });

    test('should handle very long input', () => {
      const input = document.getElementById('input');
      
      input.value = 'A'.repeat(1000);
      
      expect(() => global.runHarmony()).not.toThrow();
    });

    test('should handle numeric-only input', () => {
      const input = document.getElementById('input');
      const title = document.getElementById('title');
      
      input.value = '12345';
      global.runHarmony();
      
      expect(title.innerText).toBeTruthy();
    });
  });
});
