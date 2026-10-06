# Russia (ru) — on-road math and market notes, late September 2026

Currency RUB (₽). Prices in `data/cars_ru.json` are integer rubles: the **manufacturer's maximum recommended retail price** (максимальная рекомендованная розничная цена, РРЦ; GWM/Chery brands call it МЦП, «максимальная цена перепродажи») as published in the official importer's or plant's price list, **VAT included, BEFORE any promotional "выгода" (direct discount, trade-in bonus, credit bonus)**. Where a brand website only headlines the price *after* benefits (Tank, Jetour, Omoda, Changan, Moskvich, JAC, Belgee promo pages), the row uses the underlying РРЦ from the price-list PDF or trim table and the note says how big the benefit is. Fuel economy is the manufacturer's combined figure in L/100 km (Russian OTTS specs use the NEDC-style «смешанный цикл»); CO₂ is approximated from it (×23.2 petrol, ×26.5 diesel) because Russia has no CO₂-based tax; EV/PHEV range is NEDC or CLTC as published.

Market context you should encode: ~64 % of new cars are Russian-assembled (Lada, Tenet, Haval-Tula, Moskvich, Solaris/Xcite/Jeland at AGR St Petersburg, UAZ/Sollers, Belgee from Belarus). Western, Japanese and Korean brands have **no official importer** since 2022 — they exist only as parallel imports (Toyota, Mazda, BMW, Kia…) and are deliberately excluded. Average new-car price August 2026: **3.47 M ₽** (Autostat).

## 1. What the РРЦ already includes

| Item | Rate / how it is embedded |
|---|---|
| **VAT (НДС) 20 %** | Included in every РРЦ. Ex-VAT = price / 1.2. |
| **Import duty** (imported cars only: Geely, Changan, Jetour, Jaecoo/Omoda imports, Chery, Hongqi, GAC, Li Auto, Voyah…) | EAEU common tariff **15 %** of customs value for new passenger cars (higher specific minimums for engines > 3.0 L), paid by the importer and passed into РРЦ. Belarus-built Belgee is duty-free inside the EAEU. |
| **Excise (акциз)** by engine power, paid by importer or plant, 2026 rates (Tax Code art. 193, Law 425-ФЗ of 28.11.2025) | ≤ 90 hp: 0; **90–150 hp: 64 ₽/hp**; 150–200 hp: 613 ₽/hp; 200–300 hp: 1,004 ₽/hp; 300–400 hp: 1,711 ₽/hp; 400–500 hp: ≈1,770 ₽/hp; > 500 hp: 1,829 ₽/hp. Example: 249 hp → ≈ 250 k ₽ embedded. |
| **Utilisation fee (утилизационный сбор, «утильсбор»)** | Paid to the state by whoever imports or produces the car (Decree 1291). Base rate 20,000 ₽ × coefficient. **Locally assembled cars**: the plant pays it but gets it back through "industrial subsidies" if the model scores enough localisation points (СПИК), so for Lada/UAZ/GAZ/Moskvich/Haval-Tula/Tenet/Solaris it is effectively neutral. **Imported cars pay the full commercial rate**, which is why an imported Chinese crossover costs 0.8–2.5 M ₽ more than in China. The fee is embedded in the РРЦ; the buyer never pays it separately. |

### 1.1 Utilisation-fee history and 2026 grid (why imported prices jumped)
- 1 Aug 2023: commercial rates ×2–3 (1–2 L new car: 300,600 ₽; 2–3 L: 844,800 ₽). Personal-use import by individuals kept the token 3,400 ₽ (new) / 5,200 ₽ (over 3 years) rate.
- 1 Oct 2024: +70–85 % (1–2 L: 556,200 ₽; 2–3 L: 1,562,800 ₽; 3–3.5 L: 1,794,600 ₽; > 3.5 L: 2,285,200 ₽), with an approved schedule of **+10–20 % every 1 January until 2030**.
- 1 Jan 2025: 1–2 L ≈ 667,400 ₽; 2–3 L ≈ 1,875,000 ₽; 3–3.5 L ≈ 2,153,400 ₽; > 3.5 L ≈ 2,742,200 ₽.
- **1 Dec 2025: the grid became displacement × power.** The 3,400/5,200 ₽ personal rate now applies only to cars **≤ 160 hp** (and ≤ 3.0 L) imported by an individual for own use, one car a year, no resale for 12 months. Anything stronger pays the commercial rate even for a private importer — this killed cheap "grey" imports of 2.0 T crossovers.
- **1 Jan 2026 (current)**, commercial rate for a NEW car (examples from the official table): 1.0–2.0 L ≤ 160 hp ≈ 0.75 M ₽ (est., indexed from 667,400); **1.0–2.0 L, 160–190 hp: 900,000 ₽**; 1.0–2.0 L up to 220 hp: 952,800 ₽; 2.0–3.0 L 160–190 hp: 2,306,800 ₽; 2.0–3.0 L up to 250 hp: 2,402,400 ₽; top classes: 3,448,800 ₽. EV / series-hybrid grid is by motor power: e.g. 80–100 hp class 991,200 ₽; personal-use EV ≤ 80 hp (58.8 kW): 3,400 ₽. Lenta.ru's worked example: the fee added ≈ 840,000 ₽ to a Geely Monjaro.
- **1 Jan 2027: next step, +10 %** (1–2 L 160–190 hp → 990,000 ₽). Importers are expected to raise РРЦ 5–10 % in Q1 2027; dealers use this to push Q4 2026 sales.
- 1 Apr 2026: paperwork tightening for personal-use imports (proof of use, ЭПТС checks), no rate change.

Nothing else is hidden in the price: there is **no purchase tax, no registration tax, no CO₂ tax, no luxury purchase tax** in Russia.

## 2. From РРЦ to drive-away (formula the app should implement)

```
price_paid   = RRP − promo_benefits (direct + trade-in + credit, see §4) + dealer_addons («допы», §2.5)
drive_away   = price_paid + registration_fee (4,500) + OSAGO_year1 + (KASKO_year1 if financed or chosen)
year1_total  = drive_away + transport_tax (billed next year, §2.4)
```

### 2.1 Registration at ГИБДД (state duty, госпошлина — Tax Code art. 333.33, rates since 1 Sep 2024, same in every region)
| Item | ₽ |
|---|---|
| Issue of number plates (ГРЗ) | **3,000** |
| Registration certificate (СТС) | **1,500** |
| Changes in a paper ПТС / new paper ПТС | 525 / 1,200 — **not needed** for a new car: all new cars come with an electronic ЭПТС |
| **Typical total for a new car** | **4,500 ₽** (no Gosuslugi discount since 2023) |
Dealer "registration service" (оформление в ГИБДД) costs 5–15 k ₽ extra and is optional — you can register yourself via Gosuslugi in ~1 hour. A 10-day grace period applies after purchase.

### 2.2 ОСАГО — compulsory third-party liability (annual)
- Formula: `premium = TB × KT × KBM × KVS × KO × KM × KS`. Base tariff (ТБ) corridor for private cars (category B), Bank of Russia, expanded Dec 2025: **1,399–8,665 ₽**; most insurers quote a ТБ of 4,000–6,500 for a mainstream Chinese SUV.
- Power coefficient (КМ): ≤ 50 hp 0.6; 50–70: 1.0; 70–100: 1.1; 100–120: 1.2; 120–150: 1.4; **> 150 hp: 1.6**.
- Age/experience (КВС): 2.27 (18–21, no experience) … 1.0 (30–35, 5 yrs) … 0.83 (60+, 14+ yrs). No-claims bonus (КБМ): a first-time policyholder starts at **1.17**, drops ≈ 0.05 per clean year to 0.46.
- Territorial coefficient (КТ) used in the dropdown regions (2026 values, city of registration of the owner): Moscow **1.8**; Moscow Oblast large cities (Khimki, Balashikha, Podolsk…) 1.63, small towns 1.3; St Petersburg **1.64**; Kazan 1.7; Krasnodar 1.6; Yekaterinburg 1.64; Novosibirsk 1.56; Ufa 1.64; Chelyabinsk 1.88; Samara 1.44; rural/other ≈ 1.0–1.3.
- What people actually pay (RSA data): **national average annual policy Jan–Jul 2026: 7,698 ₽** (+5.9 % y/y); average for Chinese cars in July 2026 **8,310 ₽** (Changan Uni-V 11,700 ₽, Great Wall Hover 6,175 ₽). Rough app defaults: Moscow, 35-year-old with 5+ clean years, 150 hp → 9,000–12,000 ₽; same driver in Samara/Krasnodar → 6,500–8,500 ₽; a 22-year-old novice in Moscow → 25,000–35,000 ₽. EVs pay the same formula (КМ from motor power).

### 2.3 КАСКО — comprehensive (optional, but banks require it on most subsidised loans)
- Chinese brands are priced higher than Lada because of parts prices and theft rates. Typical first-year premium as % of car value: **Lada/UAZ 3–5 %**, mainstream Chinese crossover **4–7 % without deductible, 2.5–4 % with a 30–50 k ₽ deductible** (Major Auto's Haval Jolion example: 65,700 ₽/yr with 30 k deductible on a ≈2.6 M car), premium/EV (Tank 500, Li Auto, Voyah, Avatr) 6–10 %. Captive "mini-KASKO" (total loss + theft) sold with 0.01 % loans costs 1.5–2.5 %.
- Suggested app default: `KASKO = price × 0.045` for Mainstream ICE, `× 0.035` for Lada/UAZ/GAZ, `× 0.07` for Luxury/EV/PHEV.

### 2.4 Transport tax (транспортный налог) — annual, per horsepower, set by region
- Base: `tax = hp × regional_rate(hp bracket) × (months owned / 12)`; assessed for the calendar year, **payable by 1 December of the following year**. The **whole** engine power is taxed at the bracket rate (not marginal). Hybrids/EREVs are taxed on total system power as written in the ЭПТС (e.g. Evolute i-Space "taxable 159 hp"); some regions exempt BEVs (Moscow through 2029, St Petersburg, Moscow Oblast, Tatarstan partially).
- **Luxury coefficient (повышающий коэффициент) = 3** for cars on the Minpromtorg list priced **≥ 10 M ₽** (10–15 M: cars up to 10 years old; > 15 M: up to 20 years old). Since 2022 the old 1.1 coefficient for 3–10 M cars is gone. In this dataset it hits Tank 700, Hongqi Guoya, Aurus, Li Auto L7 Ultra/L9, top Wey 80 — e.g. Tank 700 517 hp in Moscow: 517 × 150 × 3 = 232,650 ₽/yr.
- Federal law only sets the base (2.5 / 3.5 / 5 / 7.5 / 15 ₽ per hp) which regions may multiply up to ×10 — hence the ceiling of **150 ₽/hp for > 250 hp** almost everywhere.

**2026 rates for the dropdown regions (₽ per hp, passenger cars owned by individuals):**

| Region | ≤ 100 hp | 100–125 | 125–150 | 150–175 | 175–200 | 200–225 | 225–250 | > 250 | Notes |
|---|---|---|---|---|---|---|---|---|---|
| **Moscow** (Law 33, amended Nov 2025, phased rise to 2031) | 14 | 31 | 35 | 50 | 50 | 75 | 75 | 150 | BEVs exempt to 31.12.2029; ≤ 70 hp exempt; 100–125 goes 34 (2027) → 35 (2028); ≤ 100 → 25 by 2031 |
| **Moscow Oblast** (amended 20.11.2025) | 14 | 35 | 35 | 50 | 50 | 75 | 75 | 150 | ≤ 100 hp climbs to 25 by 2032; BEVs exempt |
| **St Petersburg** | 24 | 35 | 35 | 50 | 50 | 75 | 75 | 150 | BEVs exempt; large families exempt (one car ≤ 150 hp) |
| **Tatarstan (Kazan)** | 10 | 35 | 35 | 50 | 50 | 75 | 75 | 150 | 25 ₽ for ≤ 100 hp if owned by a company |
| **Krasnodar Krai** | 12 | 25 | 25 | 50 | 50 | 75 | 75 | 150 | |
| **Sverdlovsk (Yekaterinburg)** | **0** | 9.4 | 9.4 | 32.7 | 32.7 | 49.6 | 49.6 | 99.2 | cheapest big region; ≤ 100 hp free |
| **Novosibirsk** (cars ≤ 5 yrs old; rates raised 2026) | 12 | 18 | 18 | 30 | 30 | 60 | 60 | 150 | halves for 5–10-year-old cars — verify current law |
| **Bashkortostan (Ufa)** | 25 | 35 | 35 | 50 | 50 | 75 | 75 | 150 | |
| **Chelyabinsk** (raised from 2026) | 10 | 27 | 27 | 50 | 50 | 75 | 75 | 150 | was 5.16 / 13.4 in 2025 |
| **Samara** | 16 | 24 | 33 | 43 | 43 | 75 | 75 | 150 | brackets 100–120 / 120–150 |
| **Other regions (default)** | 12 | 30 | 30 | 45 | 45 | 70 | 70 | 150 | median of the remaining 75 regions |

Examples: Lada Granta 90 hp in Moscow 1,260 ₽; Haval Jolion 150 hp in Moscow 5,250 ₽, in Yekaterinburg 1,410 ₽; Tank 300 218 hp in St Petersburg 16,350 ₽; Geely Monjaro 238 hp in Moscow 17,850 ₽; Li Auto L9 449 hp in Moscow 67,350 ₽ (×3 = 202,050 ₽ if the trim is on the 10 M list).

### 2.5 Dealer add-ons («допы», навязанное дополнительное оборудование)
- Illegal to make compulsory (Consumer Protection Law art. 16, tightened 2023), but in practice a dealer only releases a car at the advertised "with benefits" price if you take a package: anti-corrosion, floor mats, film, alarm, "warranty extension", ГЛОНАСС/telematics subscription. Typical: **Lada 30–100 k ₽; mainstream Chinese crossover 100–300 k ₽; hot models (Tenet T7/T4L, Tank 300, Haval Jolion in 2025) up to 500 k ₽**; premium Chinese 200–600 k ₽. In September 2026 the stock overhang has made allotments negotiable; ordering to the plant (Lada, Haval, Tenet) avoids most of them.
- Also budget 20–40 k ₽ for winter tyres if not bundled (legally required Dec–Feb).

### 2.6 Worked example — Haval Jolion Комфорт 1.5T MT 2WD, 143 hp, Moscow, private buyer with a trade-in
РРЦ 2,099,000 − 200,000 GWM trade-in bonus = 1,899,000 → + допы 100,000 → 1,999,000 → + госпошлина 4,500 + ОСАГО ≈ 9,100 + КАСКО (bank-required, deductible) ≈ 65,000 → **drive-away ≈ 2,078,000 ₽**; transport tax next year 143 × 35 = 5,005 ₽. Cash buyer without trade-in and without КАСКО: 2,099,000 + 4,500 + 9,100 = 2,112,600 ₽ (dealers usually still give 100–150 k "direct" discount when asked).

## 3. Incentives in force (September 2026)

### 3.1 Льготное автокредитование (state-subsidised car loans, Minpromtorg programme, budget-limited, 2026 rules)
- **20 % of the car price (25 % for residents of the Far Eastern Federal District)** is paid by the state as a discount on the loan principal. Eligible cars: **ICE cars with РРЦ ≤ 2,000,000 ₽** that score ≥ 2,500 localisation points and are on the Minpromtorg list — in practice **all Lada (Granta, Vesta cheaper trims, Iskra, Largus, Niva Legend, Niva Travel), all UAZ (Patriot/Pickup/Hunter/SGR), GAZ light vehicles up to 3.5 t (Sobol/Gazelle NN combi)** and Moskvich 3 (its site advertises the 20 % subsidy). **Haval (Tula) and Tenet (Kaluga) do not yet have enough localisation points and are NOT eligible**; Solaris, Belgee and all imports are out; most Tenet/Moskvich trims also exceed the 2 M cap. Eligible buyers: medical workers, teachers/educators, participants of the "special military operation" and their relatives, people with disabilities (incl. hand-control cars such as Moskvich 3 РУ), families with children (the "Семейный автомобиль" sub-programme for families with 2+ children gives 10 % outside the Far East). Loan ≥ 12 months through participating banks (VTB, Sber, Alfa, Sovcombank, T-Bank…); the car cannot be resold within the first year without repaying the subsidy. Funds run out periodically (typically each autumn) and are topped up.
- **Electric cars and sequential (range-extender) hybrids assembled in Russia: 35 % of the price, capped at 925,000 ₽**, no price cap, any buyer, on credit only. The 2026 list names Moskvich 3e, Amberauto A5, the Evolute line-up (i-Joy, i-Space, i-Sky, i-Jet, i-Van), Voyah (Free, Dream, Passion) and Lada e-Largus; the dealer sites of Deepal (S07/G318/S09) and Esteo/Exlantix (ET, ET8) also headline the 925 k discount because those models were added on certification — check the current Minpromtorg list. Imported EVs (Geely EX5, GAC Aion V, Avatr, Hongqi E-HS9, Li Auto) are **not** eligible.
- There is no scrappage scheme in 2026; the old "утилизация/трейд-ин" state bonuses ended in 2024.

### 3.2 Other EV perks
- Transport-tax exemption for BEVs in Moscow (to 2029), St Petersburg, Moscow Oblast and ~20 other regions; free parking in Moscow city parking zones; some toll roads (ЦКАД) free for EVs; no Moscow-specific plate quotas or congestion charges exist.
- Personal-use import of an EV ≤ 80 hp motor pays the token 3,400 ₽ utilisation fee; stronger EVs pay commercial rates — this is why grey Zeekr/Xiaomi imports became rare in 2026 and are excluded here.

## 4. Discount climate, September 2026

- Mechanics: Russian brands quote a РРЦ and then advertise three stackable "выгоды": **прямая скидка** (direct, for anyone), **скидка по трейд-ин** (you hand in any car, sometimes only a Lada/GWM-family car for the bigger bonus), **скидка по кредиту** (only if you finance through the captive bank, often at a 0.01–9.9 % headline rate whose cost is baked into the price). Chinese importers add a "marketplace" or "loyalty" bonus. The dealer sites show the price **after all three**; only a minority of buyers actually gets all three.
- Typical size of the stack in Sept 2026: Lada 150–450 k ₽ (Granta 270 k, Vesta up to 430 k, Niva Travel 450 k, Aura 750 k); Haval/Tank 200–400 k trade-in bonus (Tank 400/500/700: 450–900 k); Geely 400 k; Omoda/Jaecoo 250–350 k; Jetour 75–250 k; Changan 200 k–1.18 M (Uni-K), Xcite 750 k–1.25 M; JAC 350–500 k; Li Auto 388–770 k; Moskvich 3 450–560 k.
- Percent off РРЦ to use in the app: **hot** (Tenet T7/T4L/T9, Jeland J6, Belgee X50/X70, Lada Iskra to order, Aurus): 0–3 %; **steady** (Haval Jolion/H3/F7, Tank 300, Solaris, UAZ, Sollers, Jaecoo): 5–10 %; **deals** (everything imported from China, Lada Granta/Vesta stock, Moskvich, Xcite, Changan, GAC, Hongqi, Exeed, Wey, Li Auto): 12–25 %, up to 30–35 % on 2024–2025 model-year stock.
- Why: dealer stocks equal 2–3 months of sales (ROAD/Podshchekoldin, June 2026), the key rate is 14 % so unsold cars cost dealers ~1 %/month in floor-plan interest, Chinese importers have ~30 % gross margin to give away, the ruble strengthened to 72–75 per USD in H1 2026 making imports cheaper, and the utilisation fee rises again on 1 Jan 2027 so importers are clearing 2026 stock. August 2026 sales fell 6.5 % y/y (first drop in 7 months) which sharpened autumn promos.

## 5. Running costs and finance (September 2026)

| Item | Value |
|---|---|
| Petrol АИ-92 | national average **69.98 ₽/L**, Moscow 66.19 ₽/L (29 Sep 2026) |
| Petrol АИ-95 | national **74.55 ₽/L**, Moscow 72.94 ₽/L (АИ-100: 102.77 ₽/L in Moscow) |
| Diesel (ДТ) | national **81.25 ₽/L**, Moscow 79.96 ₽/L |
| LPG (пропан) | ≈ 30–34 ₽/L (est.); CNG (метан) ≈ 24–30 ₽/m³ (est.) — Lada Vesta/Largus CNG bi-fuel |
| Household electricity | Moscow single-rate **8.00 ₽/kWh** (7.28 in homes with electric stoves), night rate 4.15 ₽; regions 4–7 ₽/kWh; public DC fast charging 20–35 ₽/kWh |
| Annual distance | ~17,000 km (use 17,000; Moscow commuters 15–20 k) |
| Bank of Russia key rate | **14.00 %** (held on 11 Sep 2026) |
| Market car-loan APR | average **23.6 %** (Q2 2026, full cost of credit ПСК 25.3 %); new-car loans with maker subsidy ≈ 10 %; used cars ≈ 19 % |
| Captive/subsidised offers | 0.01 %–9.9 % headline for 1–3 years, usually only with КАСКО and the "credit discount" priced in; state programme adds the 20–35 % principal discount |
| Typical term / down payment | 5–7 years (up to 8); 10–30 % down (0 % possible on Lada/Haval promos); ~60 % of new cars are financed, record lending in August 2026 |
| Servicing | Chinese crossover 45–60 k ₽/yr at the dealer (warranty 3–7 yrs), Lada 15–25 k ₽/yr |

## 6. Regions worth a dropdown (population + tax/OSAGO difference)
Moscow · Moscow Oblast · St Petersburg · Tatarstan (Kazan) · Krasnodar Krai · Sverdlovsk Oblast (Yekaterinburg) · Novosibirsk Oblast · Bashkortostan (Ufa) · Chelyabinsk Oblast · Samara Oblast · Other regions. Each needs: transport-tax bracket table (§2.4), ОСАГО КТ (§2.2), fuel adjustment (Moscow −5 % vs national average; Far East/Siberia +3–8 %), and BEV transport-tax exemption flag (Moscow, MO, SPb, Tatarstan: yes; others: no).

## 7. Glossary (first-time buyer)
- **РРЦ / МЦП** — рекомендованная розничная цена / максимальная цена перепродажи: the maker's list price incl. VAT; every discount is quoted from it.
- **Выгода / прямая скидка** — "benefit": the direct discount the maker or dealer gives to anyone.
- **Скидка по трейд-ин** — extra discount only if you trade in a car (any make, or sometimes only the same group's brand).
- **Скидка по кредиту** — extra discount only if you take the captive bank's loan; the 0.01 % rate is paid for inside the price.
- **Допы (дополнительное оборудование)** — dealer-installed extras the salesman insists on (mats, film, alarm) that push the real price above the advertised one.
- **Утильсбор** — the utilisation (recycling) fee every importer pays per car; a hidden 0.8–2.5 M ₽ inside imported-car prices, rising every January.
- **Льготное автокредитование / госпрограмма** — state car-loan programme paying 20–25 % (35 % for EVs) of the price for eligible buyers of Russian-built cars.
- **ОСАГО** — compulsory third-party insurance you must hold before registering; cheap but mandatory.
- **КАСКО** — optional comprehensive insurance for your own car; banks require it on financed cars.
- **Транспортный налог** — annual regional tax per horsepower, billed the following year via Gosuslugi/ФНС.
- **Госпошлина / ГИБДД / СТС / ЭПТС** — the 4,500 ₽ state duty for registration at the traffic police, the plastic registration card, and the electronic vehicle passport.
- **КБМ** — your no-claims bonus class in ОСАГО (1.17 for a new driver, 0.46 after ~10 clean years).
- **Повышающий коэффициент («налог на роскошь»)** — ×3 transport-tax multiplier for cars on the ≥ 10 M ₽ list.
- **Параллельный импорт** — grey import of brands without an official importer (Toyota, BMW, Zeekr…): no factory warranty, full commercial утильсбор, so excluded here.
- **Локализация / СПИК / баллы** — localisation points a Russian-assembled model needs for utilisation-fee refunds and state-loan eligibility.

## 8. Sources (accessed 27–29 Sep 2026)
- Market data: https://www.autonews.ru/news/6a9a9c329a794738eac2382c (Autostat August 2026 sales, average price), https://avtonovostidnya.ru/samye/420810-lada-granta-haval-jolion-jeland (top-10 models/brands Aug 2026), https://www.kommersant.ru/doc/8761163 (discounts, stock), https://www.vbr.ru/novosti/avto/2026/09/15/kak-kupit-avto-deshevle-osenyu/
- Lada: https://www.ixbt.com/news/2026/01/12/ceny-poehali-vverh-avtovaz-perepisal-prajsy-pochti-na-vsju-linejku-lada-i-prodolzhil-dejstvie-skidok.html, https://www.autonews.ru/news/695370a79a7947f6e6491c26, https://www.avtogermes.ru/sale/lada/ (trim tables with РРЦ), https://www.drom.ru/catalog/lada/vesta/, https://favorit-motors.ru/articles/novinki-avtoproma/lada-iskra-tseny-i-komplektatsii-novoy-modeli-avtovaza/, https://www.ixbt.com/news/2026/09/21/437266-ot-156-mln-rublei-s-gospodderzkoi-avtovaz-raskryl-ceny-i-komplektacii-lada-e-largus.html, https://www.sravni.ru/novost/2026/1/29/v-prodazhu-postupila-lada-aura-2026-goda/
- Haval / GWM / Tank / Wey: https://haval.ru/models/, https://haval.ru/purchase/catalogues/ (official МЦП PDFs for Jolion, M6, F7, F7x, Dargo, H3, H5, H7, H9, Poer), https://tank.ru/models/, https://tank.ru/customers/choise/pricelists/ (Tank 300/400/500/700 PDFs), https://www.ixbt.com/news/2026/01/07/great-wall-wey-07-80.html, https://www.major-auto.ru/models/wey/, https://www.ixbt.com/news/2025/10/22/3-3-104-1-2-great-wall-kingkong-poer-2026.html
- Chery group: https://www.chery.ru/, https://www.ixbt.com/news/2026/01/04/chery-chery-tiggo-4-pro.html, https://www.tks.ru/autonews/2026/03/10/0004/krossover-chery-tiggo-4-pokinul-rossijskij-ryinok/, https://avtonovostidnya.ru/avtorynok/421197-tenet-t7-t4l, https://www.ixbt.com/news/2026/01/20/tenet-t4-t7-t8-2026.html, https://autoreview.ru/news/krossover-tenet-t9-start-prodazh-i-ceny, https://www.autonews.ru/news/6aba2a559a7947f261ce6e98 (Tenet A8), https://files.omoda.ru/priceC5new.pdf, https://files.omoda.ru/priceC7.pdf, https://avtonovostidnya.ru/avtorynok/421356-jaecoo, https://exeed.ru/, https://exeed.ru/cars/rx/, https://exeed.major-auto.ru/models/vx/, https://www.autonews.ru/news/6a72fe8c9a79476957fb3aa9 (Exlantix ET8), https://www.ixbt.com/news/2026/02/16/jetour-2026-dashing-x70-plus-t1-t2.html, https://avtonovostidnya.ru/avtorynok/417155-jetour-dashing-x70-plus, https://jetour-ru.com/models/x90plus, https://www.autonews.ru/news/69cce0509a79477b53c5c90a (Soueast)
- Geely / Belgee: https://www.geely-motors.com/ and model pages, https://avtonovostidnya.ru/avtorynok/420918-geely, https://autoreview.ru/news/belgee-x50-ceny-i-osnaschenie, https://www.ixbt.com/news/2026/09/24/438023-vsego-22-mln-rublei-za-populiarnyi-krossover-s-klassiceskim-avtomatom-obieiavlena-stoimost-biudzetnogo-belgee-x50.html, https://www.autonews.ru/news/698441fb9a7947808ded6664 (Belgee X70), https://belgee.ru/blog/belgee-x50-x70-and-s50-comparison/
- Changan / Deepal / Avatr: https://changanauto.ru/model and model pages, https://uni-motors.ru/model/uni-k etc., https://deepal-motors.ru/s07, https://deepal-motors.ru/g318, https://deepal-motors.ru/s09, https://avatr-motors.ru/avatr-11
- Moskvich / AGR brands: https://moskvich.ru/models and prices-versions pages, https://autoreview.ru/news/krossovery-moskvich-m70-i-m90-ob-yavleny-ceny, https://autoreview.ru/news/jeland-j6-stal-pervencem-otechestvennogo-brenda-izvestny-ceny, https://avtonovostidnya.ru/avtorynok/404970-solaris, https://www.avtogermes.ru/sale/xcite/x-cross-7/, https://www.avtogermes.ru/articles/xcite-x-cross-8-obzor-semimestnogo-krossovera/
- UAZ / GAZ / Sollers: https://uaz.ru/, https://www.uaz.ru/cars/patriot-mkpp, https://autoreview.ru/news/sobol-nn-4x4-ceny-i-ekspedicionnaya-versiya, https://www.avtogaz.ru/models/sobol-nn/, https://avtonovostidnya.ru/avtorynok/421464-sollers
- Others: https://jaccar.ru/, https://avtonovostidnya.ru/avtorynok/406213-jac, https://www.ixbt.com/news/2026/02/01/livan-s6-pro-livan-x6-pro-200.html, https://www.autonews.ru/news/6a68bf319a79479efe69913e (Bestune), https://hongqi.ru/models, https://gac.ru/, https://avtoruss.ru/gac.html, https://www.drom.ru/catalog/dongfeng/, https://www.major-auto.ru/models/voyah/, https://www.ixbt.com/news/2026/01/07/li-auto-8-l6-l7-l9.html, https://avtonovostidnya.ru/avtorynok/405241-rox, https://www.major-auto.ru/models/nordcross/001/, https://avtonovostidnya.ru/avtorynok/405463-baic, https://www.evolute.ru/, https://www.autonews.ru/news/6968c5319a7947891aa9aaa2 (Evolute i-Space), https://favorit-motors.ru/news/actual/ochen-dorogo-stala-izvestna-tsena-novogo-aurus-senat/
- Taxes/fees: https://5koleso.ru/articles/novosti/kakie-novye-mashiny-mozhno-kupit-so-skidkoj-ot-gosudarstva-aktualnyj-perechen-modelej-na-2026-god/ (2026 state-loan model list), https://content.renins.ru/osago/utilizatsionnyy-sbor-na-avtomobili-v-2026-godu/, https://ucsol.ru/information/utilizatsionnyj-sbor, https://lenta.ru/articles/2026/01/27/utilsbor-2026/, https://ucsol.ru/novosti/aktsizy-na-mototsikly-avtomobili-i-benzin-v-2026-godu (excise 2026), https://www.autonews.ru/news/69df5f499a7947b649fa5cbd (госпошлина), https://nalog-nalog.ru/transportnyj_nalog/transportnyj-nalog-v-moskve-v-2026-godu/, https://www.kommersant.ru/doc/7298681 (Moscow tax phase-in), https://www.kommersant.ru/doc/8213854 (Moscow Oblast), https://finance.mail.ru/article/v-ryade-regionov-vyros-transportnyy-nalog-skolko-teper-pridetsya-platit-68820156/, https://assistentus.ru/transportnyj-nalog/16-tatarstan/, https://www.tbank.ru/insurance/blog/transport/ (luxury coefficient), https://finuslugi.ru/navigator/kredity/stat_avtokredit-po-gosprogramme-2026-spisok-avtomobilej-i-kak-poluchit-skidku-do-35, https://www.vtb.ru/personal/avtokredity/gosprogramma-subsidirovaniya-avtokreditov-2026/
- Insurance: https://www.ingos.ru/company/blog/2026/kak-rasschitat-stoimost-osago-v-2026-godu, https://avtocod.ru/koehfficienty-osago-po-regionam-i-v-moskve-rasshifrovka-i-tablicy, https://finance.mail.ru/article/srednyaya-premiya-po-godovym-polisam-osago-v-rossii-vyrosla-69225942/ (RSA average 7,698 ₽), https://www.zr.ru/content/news/985105-pochemu-tseny-na-osago-dlya-kitaj/, https://www.major-auto.ru/blog/191/ (Jolion ownership costs, KASKO)
- Fuel, power, loans: https://www.petrolplus.ru/fuelindex/, https://www.mentoday.ru/life/news/29-09-2026/sotyi-perevalil-za-sotnyu-i-rvetsya-dalshe-chto-proishodit-s-benzinom-v-moskve-i-regionah-29-sentyabrya/, https://t-j.ru/msk-electroprices/, https://www.cbr.ru/press/keypr/, https://www.zr.ru/content/articles/986116-avtokredit-sentyabr-2026/
