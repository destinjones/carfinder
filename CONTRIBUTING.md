# Contributing

Thanks for helping make the numbers better. The most useful contributions are corrections with a source.

## Fix a price, add a model, update a rate
1. Find the row in `data/cars_<cc>.json` (field order in [docs/DATA.md](docs/DATA.md)) or the rule in the country's
   `bd<CC>()` function in `src/script.html`. The research behind each country's rules is in `docs/tax-notes/`; update
   it too when a rate changes.
2. `node src/build.js` to rebuild `carfinder.html`, then `node --test`. Commit the data, the source and the built page
   together (CI checks they match).
3. Open a pull request and put the source of the new number in the description (a brand price list, a government
   rate table, a dealer quote). Bug fixes and corrections are merged quickly; for a new feature, open an issue first.

## Add a country
Follow the adapter pattern in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): a dataset on the 20-field schema, a tax
note, and in `src/script.html` a money formatter, dealer bands, market texts, regions, a breakdown function and a
`COUNTRIES` config. Aim for every nameplate with a dealer network in that country, and be honest with `est = 1` where a
price is approximate.

## Browser checks
`pip install playwright pillow && playwright install chromium`, then `python3 test/browser/audit.py` and
`python3 test/browser/interact.py`. Screenshots for the website are regenerated with `python3 brand/tools/shots.py`.

## Style
Plain JavaScript, no dependencies, one file. Keep the pricing core (between `//<<core` and `//core>>`) free of DOM
access so Node can test it. Escape every string that comes from data with `esc()` before it reaches `innerHTML`.
