# Annex Library — Content Convention

This folder is the scalable content engine for the **KJV Harmony Companion** system.
All entries are KJV-only, canon-lock protected, and whole-counsel harmonised.

---

## Folder Structure

```
annex/
├── README.md              ← this file
└── entries/
    └── YYYY/
        └── MM/
            └── YYYY-MM-DD_slug.json   ← one JSON file per annex entry
```

**Example path:**  
`annex/entries/2026/04/2026-04-10_sovereign-grace.json`

---

## Entry Format

Each `.json` file follows this schema:

```json
{
  "id": "2026-04-10_sovereign-grace",
  "date": "2026-04-10",
  "title": "Sovereign Grace in Salvation",
  "category": "core",
  "primaryVerse": "John 6:37",
  "verseText": "All that the Father giveth me shall come to me; and him that cometh to me I will in no wise cast out. — John 6:37",
  "harmonies": [
    "John 6:44",
    "Romans 8:30",
    "Ephesians 1:4-5"
  ],
  "context": "Full chapter and canonical context notes go here.",
  "insights": "Gentle insights drawn from the whole counsel of Scripture.",
  "application": "Practical everyday application for prayer, preaching, and walk.",
  "canvaLayout": {
    "top": "Visual / image description",
    "middle": "Scripture (centered)",
    "bottom": "Title + 2-3 Points",
    "footer": "Brother Sam Etheredge · Elder Minister & Pastor · Macedonia Original Primitive Baptist Church · Section, Alabama"
  },
  "tags": ["election", "grace", "assurance"]
}
```

---

## Categories

| Category | Description |
|----------|-------------|
| `core`   | Foundational doctrinal entries — permanent Annex Library |
| `sermon` | Saved harmonies from the Harmony Explorer |
| `weekly` | Weekly teaching additions |
| `daily`  | Daily devotional entries |

---

## Adding New Entries

1. Create a new `.json` file under `annex/entries/YYYY/MM/`  
2. Name the file: `YYYY-MM-DD_short-topic-slug.json`  
3. Follow the schema above  
4. All entries **must** include at least 3 KJV harmony references  
5. Canon-Lock rule: **KJV 1769 wording only** — no paraphrase

---

## Accessing Entries from the App

The companion app can load entries with a simple `fetch`:

```javascript
fetch('/Kjv-companion/annex/entries/2026/04/2026-04-10_sovereign-grace.json')
  .then(r => r.json())
  .then(entry => { /* render entry */ });
```

An optional `annex/index.json` can catalog all entries for bulk loading.

---

## Shared State with KJV Harmonizer

Both the Companion and the Harmonizer write to the `kjvHarmony.*` localStorage namespace:

| Key | Written by | Value |
|-----|-----------|-------|
| `kjvHarmony.lastQuery` | Both apps | Last search term or reference |
| `kjvHarmony.lastResult` | Both apps | JSON: `{ source, query/reference, verse?, timestamp }` |

Since both apps are hosted under the same GitHub Pages origin (`sametheredge85-crypto.github.io`), they share the same `localStorage` domain and can read each other's values directly.
