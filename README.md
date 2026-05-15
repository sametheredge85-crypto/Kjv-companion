# KJV Harmony Companion

> *"The scripture cannot be broken."* — John 10:35

A free, offline-capable Bible study suite built on the King James Version (1769 Oxford edition).  
Designed for preachers, teachers, and believers who want to study the whole counsel of God.

**Live site:** https://sametheredge85-crypto.github.io/kjv-companion/

---

## About

The KJV Harmony Companion is a Progressive Web App (PWA) for Macedonia Primitive Baptist Church, Section, Alabama. It runs entirely in the browser — no accounts, no ads, no distractions. After the first load, it works completely offline.

All doctrine is anchored in five non-negotiable priorities:

1. **Scripture Harmony** — every passage interpreted in light of the whole counsel of God
2. **God as Primary Actor** — salvation and spiritual life begin with God's sovereign work
3. **Life before Response** — spiritual life from God comes first; faith and obedience follow as fruit
4. **Finished Work of Christ** — everything rests on what the Lord Jesus Christ has already accomplished
5. **Clarity and Edification** — warm, reverent, pastoral language for preaching and teaching

---

## Tools

| Tool | File | Purpose |
|------|------|---------|
| Bible Harmonizer | `harmonizer.html` | Cross-reference verses by word or topic |
| Preacher's Suite | `preacher-suite.html` | Private study dashboard for the preacher |
| Sermon Builder | `sermons/` | Build and save sermon outlines |
| Annex Library | `annex.html` / `annex-index.html` | KJV study notes and doctrinal files |
| Doctrinal Themes Map | `doctrinal-themes-map.html` | Visual map of key doctrinal themes |
| First Principles Engine | `first-principles-engine.html` | Reason from Scripture first principles |
| Bible Questions | `bible-questions.html` | Study questions grounded in the text |
| Context Restorer | `context-restorer.html` | Restore the full context of any passage |
| Audio Library | `audio-library.html` | Sermons and recordings |
| Image & Visual Library | `image-library.html` / `visual-library.html` | Images and visual study aids |
| Notes | `notes.html` | Personal study notes |
| Settings | `settings.html` | App preferences |

All tools are powered by `data/bibleData.js`, which contains the KJV verse data used across the suite.

---

## AI Prompting System (King James Harmony Prompts)

The companion now includes ready-to-run **/goal** templates for Claude Code / Codex Desktop / Grok. These prompts power deep exegesis and doctrinal replies while enforcing strict KJV 1769 harmony rules.

### Core Prompt Files
- **`harmony-rules.md`** – Official checklist & guardrails (attach to every run)
- **`harmony-exegete-prompt.md`** – Full canonical exegete with 4-step protocol and required section headings
- **`harmony-reply-generator.md`** – Personal letter / point-by-point doctrinal reply generator (BLUE INK RESPONSE format)
- **`half_hinges_bible.md`** – Role-play layers (Plain English Pastor + Paul Harvey storyteller)

### How to Use
1. Open any prompt file → copy the entire `/goal` block
2. Paste into Claude Code / Codex Desktop (full-auto mode) or Grok
3. Attach `harmony-rules.md` as the checklist
4. Fill the placeholders (e.g., RECIPIENT & CONTEXT, OPPOSING POSITION)
5. Run → receive polished markdown ready for print or import into the PWA

All prompts are designed for the **King James Harmony Project** and maintain:
- 1769 KJV text only
- Scripture interprets Scripture
- Sovereign grace / life-before-response order
- Warm yet firm pastoral tone

See `CLAUDE.md` for full usage guide.

---

## Getting Started

1. **Visit** https://sametheredge85-crypto.github.io/kjv-companion/
2. **Install** — tap *Add to Home Screen* (iOS/Android) or use the browser install prompt (desktop) for offline access
3. **Open any tool** directly by URL, e.g. `harmonizer.html`, `preacher-suite.html`

No login required. No data leaves your device.

---

## Project Structure

```
kjv-companion/
├── index.html                     # Home / search entry point
├── data/bibleData.js              # KJV verse data (shared across all tools)
├── manifest.json                  # PWA manifest
├── harmonizer.html                # Bible harmonizer
├── preacher-suite.html            # Preacher's private suite
├── annex.html / annex-index.html  # Annex library
├── sermons/                       # Sermon outlines
└── ...                            # Additional study tools (see Tools table above)
```

---

## Contributing

Questions or suggestions? [Open an Issue](https://github.com/sametheredge85-crypto/kjv-companion/issues) on GitHub.

---

*Made with love for Macedonia Primitive Baptist Church, Section, Alabama.*  
*Pastor: Sam Etheredge*
