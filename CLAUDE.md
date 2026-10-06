# CarFinder 2026

One self-contained HTML page (`carfinder.html`) built from `src/head.html` + `src/script.html` + `data/*.json` by
`node src/build.js`; `index.html` and `about.html` are the website. No framework, no dependencies.

Read first: `docs/ARCHITECTURE.md` (page structure, pricing core, World tab, adding a country) · `docs/DATA.md` (row
schemas, price basis per country, how on-road is estimated) · `docs/tax-notes/<cc>.md` only for the country you touch.

## Rules
- After any edit to `src/` or `data/`: `node src/build.js && node --test`. CI fails if `carfinder.html` is stale.
- The pricing core between `//<<core` and `//core>>` in `src/script.html` stays DOM-free (the tests run it in Node).
- Escape data strings with `esc()` before `innerHTML`. Money through `MONEY[cc]`; never format currency by hand.
- Every non-US efficiency figure carries its US-unit twin (`usMpg`, `usMi`); keep that when adding fields.
- Phone-first: 44 px controls, 16 px inputs, no horizontal overflow at 360 px. Run `python3 test/browser/audit.py`
  after CSS changes; `python3 test/browser/interact.py` after behaviour changes.
- Publish only when the user asks: never push or deploy on your own.

## Running
`python3 -m http.server` in the repo root, then http://localhost:8000/carfinder.html (fonts are self-hosted, so the
page also works from a file:// URL). Console handles: `S` (filter state), `CARS`, `DATA`, `CC`, `switchCountry('IN')`.
