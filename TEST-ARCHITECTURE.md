# KJV Companion Test Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     KJV Companion Codebase                      │
│                   (HTML, CSS, JavaScript)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Tests
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Test Infrastructure                        │
├─────────────────────────────────────────────────────────────────┤
│  • Jest 29.7.0 (Unit & Integration)                            │
│  • Playwright 1.40.0 (E2E)                                      │
│  • Testing Library (DOM utilities)                              │
│  • JSDOM (Browser environment simulation)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
            ▼                 ▼                 ▼
┌───────────────────┐ ┌──────────────┐ ┌──────────────┐
│   Unit Tests      │ │ Integration  │ │  E2E Tests   │
│   (15+ tests)     │ │  Tests       │ │  (25+ tests) │
│                   │ │  (18+ tests) │ │              │
├───────────────────┤ ├──────────────┤ ├──────────────┤
│ • Input          │ │ • Page       │ │ • User       │
│   validation     │ │   structure  │ │   workflows  │
│ • Verse          │ │ • Navigation │ │ • Cross-     │
│   detection      │ │ • CSS        │ │   browser    │
│ • DOM updates    │ │ • Links      │ │ • Mobile     │
│ • Edge cases     │ │ • A11y       │ │ • PWA        │
│ • Logic tests    │ │ • HTML       │ │ • Perf       │
└───────────────────┘ └──────────────┘ └──────────────┘
            │                 │                 │
            └─────────────────┼─────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Coverage Analysis                          │
├─────────────────────────────────────────────────────────────────┤
│  Target: 70% coverage (branches, functions, lines, statements) │
│  • HTML report: coverage/lcov-report/index.html                │
│  • LCOV file: coverage/lcov.info                               │
│  • Terminal summary: npm run test:coverage                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         CI/CD Pipeline                          │
│                    (.github/workflows/)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────┐         │
│  │ Unit Tests  │  │ Integration │  │   E2E Tests    │         │
│  │   (Jest)    │  │    Tests    │  │  (Playwright)  │         │
│  └──────┬──────┘  └──────┬──────┘  └────────┬───────┘         │
│         │                │                   │                  │
│         └────────────────┼───────────────────┘                  │
│                          │                                      │
│                          ▼                                      │
│              ┌───────────────────────┐                         │
│              │   Coverage Report     │                         │
│              │   • Codecov upload    │                         │
│              │   • PR comments       │                         │
│              │   • Badge generation  │                         │
│              └───────────────────────┘                         │
│                          │                                      │
│                          ▼                                      │
│              ┌───────────────────────┐                         │
│              │   Quality Checks      │                         │
│              │   • HTML validation   │                         │
│              │   • Link checking     │                         │
│              └───────────────────────┘                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Test Results & Artifacts                     │
├─────────────────────────────────────────────────────────────────┤
│  • Unit test results (coverage/)                               │
│  • Integration test results (coverage/)                         │
│  • Playwright report (playwright-report/)                       │
│  • Test logs (GitHub Actions)                                  │
│  • Coverage badges (badges/)                                    │
└─────────────────────────────────────────────────────────────────┘
```

## Test File Organization

```
tests/
├── setup.js                           # Global test configuration
├── utils.js                           # Reusable test helpers
│
├── unit/                              # Unit tests (15+ tests)
│   └── harmony-function.test.js       # Tests for runHarmony()
│       ├── Input Validation (3)
│       ├── Verse Detection (3)
│       ├── Content Generation (4)
│       ├── Context-Specific (2)
│       └── Edge Cases (3)
│
├── integration/                       # Integration tests (18+ tests)
│   ├── index-page.test.js            # Index page tests
│   │   ├── Page Structure (4)
│   │   ├── Styling and CSS (3)
│   │   └── Footer Content (2)
│   │
│   └── pages-structure.test.js       # Multi-page tests
│       ├── HTML Structure (6/page)
│       ├── Navigation Links (1)
│       └── Accessibility (1/page)
│
└── e2e/                               # E2E tests (25+ tests)
    ├── index.spec.js                  # Index page E2E
    │   ├── Page Load (7)
    │   ├── Navigation (1)
    │   └── Accessibility (3)
    │
    ├── pages.spec.js                  # Multi-page E2E
    │   ├── Bible Tools (16)
    │   ├── Interactive (3)
    │   └── Content (3)
    │
    └── pwa-functionality.spec.js      # PWA & advanced
        ├── PWA Features (2)
        ├── Cross-Browser (1)
        ├── Performance (2)
        ├── Forms (2)
        └── Visual (2)
```

## Browser Test Matrix

```
┌──────────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│   Test Type  │ Chrome  │ Firefox │ Safari  │ Mobile  │ Mobile  │
│              │ Desktop │ Desktop │ Desktop │ Chrome  │ Safari  │
├──────────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Unit Tests   │    ✅   │    ✅   │    ✅   │    ✅   │    ✅   │
│ Integration  │    ✅   │    ✅   │    ✅   │    ✅   │    ✅   │
│ E2E Tests    │    ✅   │    ✅   │    ✅   │    ✅   │    ✅   │
│ Performance  │    ✅   │    ✅   │    ✅   │    ✅   │    ✅   │
│ Accessibility│    ✅   │    ✅   │    ✅   │    ✅   │    ✅   │
└──────────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
```

## Coverage Flow

```
┌─────────────┐
│  Run Tests  │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Collect Data   │
│  • Line hits    │
│  • Branch hits  │
│  • Function use │
└────────┬────────┘
         │
         ▼
┌──────────────────┐
│ Generate Report  │
│  • HTML visual   │
│  • LCOV data     │
│  • JSON summary  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Check Threshold │
│  ≥70% required   │
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌──────┐  ┌──────┐
│ Pass │  │ Fail │
│  ✅  │  │  ❌  │
└──────┘  └──────┘
```

## CI/CD Workflow

```
┌──────────────────────────────────────────────┐
│          GitHub Push/PR Trigger              │
└───────────────────┬──────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
    ▼               ▼               ▼
┌────────┐    ┌────────┐    ┌──────────┐
│  Unit  │    │ Integ  │    │   E2E    │
│  Job   │    │  Job   │    │   Job    │
└───┬────┘    └───┬────┘    └────┬─────┘
    │             │              │
    └─────────────┼──────────────┘
                  │
                  ▼
         ┌────────────────┐
         │    Coverage    │
         │   Report Job   │
         └────────┬───────┘
                  │
                  ▼
         ┌────────────────┐
         │    Quality     │
         │   Check Job    │
         └────────┬───────┘
                  │
                  ▼
         ┌────────────────┐
         │   Artifacts    │
         │   • Reports    │
         │   • Logs       │
         │   • Badges     │
         └────────────────┘
```

## Test Execution Timeline

```
0s ─────────┬──────────────────────────────────────────────
            │
            ├─ Setup test environment (npm install)
5s ─────────┤
            │
            ├─ Run unit tests (fast)
10s ────────┤
            │
            ├─ Run integration tests (medium)
20s ────────┤
            │
            ├─ Install browsers (Playwright)
40s ────────┤
            │
            ├─ Run E2E tests (slower)
120s ───────┤
            │
            ├─ Generate coverage reports
125s ───────┤
            │
            ├─ Run quality checks
130s ───────┤
            │
            └─ Upload artifacts & complete
135s ───────┘
```

## Documentation Hierarchy

```
├── README.md                          (Quick overview)
│   └─ Points to detailed docs
│
├── TESTING.md                         (Complete guide)
│   ├─ How to run tests
│   ├─ How to write tests
│   ├─ Best practices
│   └─ Troubleshooting
│
├── TEST-COVERAGE-REPORT.md           (Analysis)
│   ├─ What was analyzed
│   ├─ Gaps identified
│   ├─ Coverage added
│   └─ Recommendations
│
└── TEST-SUMMARY.md                    (Quick reference)
    ├─ Stats at a glance
    ├─ File structure
    ├─ Command reference
    └─ Next steps
```

---

**Created**: 2026-04-13  
**Last Updated**: 2026-04-13  
**Version**: 1.0.0
