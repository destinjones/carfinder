# Architecture

CarFinder is one self-contained HTML page. There is no framework, no bundler and no runtime dependency; the only build
step stitches three source files together and inlines the data.

```
src/head.html    markup + CSS           ─┐
src/script.html  all the JavaScript     ─┼─ node src/build.js ─▶ carfinder.html
data/*.json      vehicles + state tables ─┘                     (dist/carfinder-artifact.html with --artifact)
```

## The page
- **Country tabs** (`ORDER`) switch everything: `CC` (the tab), `C = COUNTRIES[CC]` (its config), `CARS = DATA[CC]`,
  `M = MONEY[CC]` and the assumptions `A`. `switchCountry()` resets the filter state `S`, then `buildChrome()` rebuilds
  the chips, filter options, region picker, glossary, footer and wizard for that country and `render()` draws the cards.
- **Filter state** lives in one object `S` (search, body, fuel, size, class, make, countries, price range, seats,
  drivetrain, efficiency, range, model years, launch flag, preliminary flag, sort). `passes(c)` applies it to a car,
  `sortList()` orders the result, `render()` draws the first page of cards and `renderMore()` appends the next (also
  triggered by an IntersectionObserver up to 150 cards).
- **Cards** (`cardHTML`) show the list price, the dealer band and the on-road range from `bd(c, price)`, the efficiency
  string from `effShort()`, and the market badge. The whole card opens the detail sheet.
- **Detail sheet** (`renderDetail`): tags, note, the trim slider, the window-sticker breakdown (`stickerHTML`), payment
  and fuel panels, the efficiency tiles (`effPanel`), the market explanation. Only the price-dependent parts are
  re-rendered while the slider moves (`updateDetailPrice`).
- **Compare** (`openCompare`): up to four cars in a table; the selection is kept per country in localStorage.
- **Wizard** (`#wGo`): four answers become filter state (`wizardBudgets`, `wizardUse`, `wizardFuels`, `drive`).
- **Persistence**: country, region per country, compare list per country, assumptions per country and the World-tab
  units, all in localStorage under `cf_*`, every read and write wrapped in try/catch.

## The pricing core
Everything between `//<<core` and `//core>>` in `src/script.html` is DOM-free so the tests can run it in Node:
- `normalize(raw, cc)` turns a JSON row into one object shape for every country (`price`, `top`, `fuel`, `fuels`,
  `l100`, `rng`, `kwh`, `hp`, `seats`, `mkt`, `note`, `est`, `isNew`, plus `mpg`/`mpge`/`dest` for the US and
  `kmpl`/`gst` for India).
- `MONEY[cc]` formats money (`money`, short `k`, and `range` with the symbol once), `FX`/`toWorld()` convert for the
  World tab, `BAND[cc]` holds the dealer bands and `MKT_TXT[cc]` their explanations.
- `bd<CC>(c, price, region, M)` returns `{dlo, dhi, lo, hi, lines, head}`: the dealer band, the on-road range and the
  breakdown lines (`cls`: `est` estimated, `info` shown but not added, `bold`). `breakdown()` dispatches by country.
- `fuelCost(c, A, cc)`, `monthlyPay(price, A)`, `effShort(c, cc)` and the unit helpers `usMpg()` / `usMi()`.

## The World tab
`DATA.ALL` pools every country's cars with the vocabulary merged (`Truck` → `Pickup`, `Gas` → `Petrol`, size names
unified) and a `home` reference to the original object. `worldPrices()` precomputes each car's list and on-road range
in the chosen currency; `worldPresets()` rebuilds the price presets and wizard budgets in that currency; `WUNIT`
switches the efficiency unit (L/100 km, mpg, km/L) through `WORLD_UNITS`.

## Adding a country
1. A JSON file on the global 20-field schema ([DATA.md](DATA.md)) and a tax-notes markdown in `docs/tax-notes/`.
2. In `src/script.html`: a `MONEY` formatter, a `BAND` row, `MKT_TXT` texts, `REGIONS` with a default in
   `REGION_DEFAULT`, `EFF_UNIT`, a `bd<CC>()` function and its case in `breakdown()`, a `COUNTRIES` config (labels,
   presets, efficiency filter, assumptions, wizard mappings), the tab in `ORDER`/`CC_NAME`, a `GLOSS` list, an `ABOUT`
   note and the per-country accent colours in `src/head.html`.
3. `data/cars_<cc>.json` in `src/build.js`, the test tables in `test/data.test.mjs`, then `node src/build.js && node --test`.

## Website
`index.html` (showcase and how-to) and `about.html` share the visual language of the author's other projects; they are
static and hand-written. `brand/tools/shots.py` regenerates the screenshots and the social card from the built app.
`.github/workflows/pages.yml` deploys the repository (minus tests and tools) to GitHub Pages on every push to `main`.
