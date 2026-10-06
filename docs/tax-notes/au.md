# Australia (au) — on-road math and market notes, late September 2026

Currency AUD ($). Prices in `data/cars_au.json` are integer dollars, **manufacturer RRP / MSRP "before on-road costs"** (the way Toyota, Mazda, Kia, Hyundai, Tesla, BYD, VW etc. quote them and the way carsguide/Drive/CarExpert list them), for the cheapest and dearest grade of each nameplate, excluding paint and option packs. Brands that only publish national **drive-away** prices (Honda, Peugeot, Mahindra, JAC diesel, KGM Actyon, Fiat, Leapmotor B10, and the promotional drive-away deals from BYD/MG/GWM/Chery) were converted to an RRP estimate = drive-away ÷ 1.06 and flagged `est=1`. Efficiency columns: ADR 81/02 combined L/100 km and CO2 g/km (the figures on the Australian fuel-consumption label; NEDC-based, so real-world use is 15–30 % higher), WLTP electric range where the brand quotes WLTP (NEDC noted in the row), battery kWh nominal. Australian financial year runs 1 July–30 June, so "2026-27" rates apply from 1 July 2026.

## 1. What the RRP already includes

An Australian RRP (also called "list price", "MLP" or "before on-roads") **includes GST (10 %) and, for cars above the threshold, Luxury Car Tax (LCT)**. It excludes everything else: stamp duty, registration, CTP insurance, number plates and the dealer delivery charge. There is no separate import duty line for the buyer (the 5 % tariff, where it applies, is inside the RRP). So:

- `RRP = ex-GST price × 1.10 + LCT` (LCT is embedded, see section 2.4 — do **not** add it again).
- `Drive-away ≈ RRP + dealer delivery + stamp duty + registration (incl. CTP where bundled) + plates (+ NSW greenslip bought separately)`. Rule of thumb used by the industry: **drive-away ≈ RRP × 1.05 to 1.08** for a $30k–$60k car; the percentage is highest in Victoria (luxury tiers) and lowest in Queensland for an EV/hybrid.
- "Drive-away" prices advertised by brands already contain all of the above for the buyer's state (they vary by state by a few hundred dollars; the national figure is usually the NSW or average one).
- Business buyers registered for GST can claim the GST back up to the "car limit" ($69,674 in 2025-26, indexed to about $69,900 for 2026-27, i.e. GST credit capped at ~$6,350) — irrelevant for private buyers.

## 2. From RRP to drive-away

Everything below is levied on the **dutiable value** = price actually paid **including GST, LCT, dealer delivery and any factory/dealer-fitted options and accessories** (but not rego, CTP or extended warranty). Five things vary by state/territory: stamp duty (motor vehicle duty), registration fee, compulsory third-party (CTP) injury insurance, plate fee, and whether EV concessions exist. Dealer delivery and LCT are national.

### 2.1 Stamp duty ("motor vehicle duty" / "vehicle registration duty" / "vehicle licence duty") — exact brackets, 2026-27

All rates are applied to the **whole** dutiable value unless the bracket says "of the excess". Round up to the next $100 or $200 block where the state charges "per $100/$200 or part thereof".

| Region | Rule for a **new passenger car** (private) | Utes / vans (goods-carrying) | EV / hybrid treatment |
|---|---|---|---|
| **NSW** | 3 % of value up to $45,000; above that **$1,350 + 5 % of the amount over $45,000**. Example $60,000 → $1,350 + $750 = $2,100. | Same table | None (EV exemption for cars under $78,000 ended 1 Jan 2024) |
| **VIC** (from 1 July 2026) | "Other passenger car": $0–$80,809 → **$8.40 per $200** (4.2 %); $80,809.01–$100,000 → **$10.40 per $200** (5.2 %); $100,000.01–$150,000 → **$14.00 per $200** (7.0 %); over $150,000 → **$18.00 per $200** (9.0 %). The tier rate applies to the whole value (a $101,000 car pays 7 % on all of it). Thresholds move with the LCT threshold each July. | New non-passenger vehicles (utes, dual-cab utes, vans, 9+ seaters): **$5.40 per $200** (2.7 %) at any value | **"Green passenger car"** (combined CO2 ≤ 120 g/km incl. every EV): **$8.40 per $200 (4.2 %) at any value** — so a $150,000 EV pays 4.2 % instead of 7 %. Primary producers also 4.2 %. |
| **QLD** | By engine: hybrid or electric **$2 per $100** (2 %); 1–4 cylinders (or 2 rotors) **$3 per $100**; 5–6 cylinders **$3.50 per $100**; 7+ cylinders **$4 per $100**. If dutiable value is **over $100,000** the rates become **$4 / $5 / $5.50 / $6 per $100** on the whole value. | Same table (cylinder based) | Hybrids (incl. PHEV) and EVs 2 % (4 % over $100k) |
| **WA** | Value ≤ $25,000: **2.75 %**. $25,000–$50,000: sliding rate **R % = 2.75 + (value − 25,000) ÷ 6,666.66**, applied to the whole value (e.g. $40,000 → 5.0 % = $2,000). Over $50,000: **6.5 %** of the whole value. | Vehicles > 4.5 t GVM or "non-passenger" used for business: flat 3 % | None (the $3,500 ZEV rebate ended 10 May 2025) |
| **SA** | Non-commercial: $60 + **$4 per $100 (or part) over $3,000** (≈ 4 %). Example $50,000 → $60 + $1,880 = $1,940. | Commercial (utes, vans, cab-chassis): $30 + **$3 per $100 over $2,000** (≈ 3 %) | None (EV subsidy and 3-year rego exemption ended 30 June 2025) |
| **TAS** | Value ≤ $35,000: **$3 per $100**; $35,000–$40,000: **$1,050 + $11 per $100 over $35,000**; over $40,000: **$4 per $100** of the whole value. | Commercial ≤ 4.5 t and motorcycles: $3 per $100 (min $20) | None (EV duty waiver ended 2023) |
| **ACT** (rates 1 Sept 2025 – 31 Jan 2027; slightly higher B/C/D rates from 1 Feb 2027) | Based on the car's **combined CO2 g/km** and value. Value < $45,000 / $45,000–$80,000 / over $80,000: **AAA (0 g, EV/FCEV)** $2.50 per $100 / $1,125 + $4.00 per $100 over $45k / $2,525 + $8.00 per $100 over $80k; **AA (1–65 g)** $2.67 / $1,201.50 + $4.41 / $2,745 + $8.00; **A (66–130 g)** $2.84 / $1,278 + $4.81 / $2,961.50 + $8.00; **B (131–175 g)** $3.00 / $1,350 + $5.22 / $3,177 + $8.00; **C (176–220 g)** $3.17 / $1,426.50 + $5.62 / $3,393.50 + $8.00; **D (221+ g)** $4.53 / $2,038.50 + $7.81 / $4,772 + $8.00; unrated vehicles = category C. | Light commercials use the same table | EVs pay the AAA rate (the full ZEV exemption ended 31 Aug 2025) |
| **NT** | **$3 per $100** (3 %) of dutiable value, plus the registration/transfer fee. | Same | Plug-in EVs (BEV and PHEV): duty concession of **up to $1,500** (i.e. free up to $50,000) until **30 June 2027** |

Programmer formulas (value = dutiable value in dollars):

```
NSW: duty = value <= 45000 ? 0.03*value : 1350 + 0.05*(value-45000)
VIC: rate = green(co2<=120 or EV) ? 4.2 : value<=80809 ? 4.2 : value<=100000 ? 5.2 : value<=150000 ? 7.0 : 9.0
     ute/van new: 2.7 ; duty = ceil(value/200)*200*rate/100
QLD: base = (EV or hybrid) ? 2 : cyl<=4 ? 3 : cyl<=6 ? 3.5 : 4 ; rate = value>100000 ? base+2 : base ; duty = ceil(value/100)*rate
WA:  rate = value<=25000 ? 2.75 : value<=50000 ? 2.75+(value-25000)/6666.66 : 6.5 ; duty = value*rate/100
SA:  duty = 60 + 4*ceil((value-3000)/100)            (commercial: 30 + 3*ceil((value-2000)/100))
TAS: duty = value<=35000 ? 3*ceil(value/100) : value<=40000 ? 1050 + 11*ceil((value-35000)/100) : 4*ceil(value/100)
ACT: table above keyed on co2 band and value tier
NT:  duty = 3*ceil(value/100) ; plug-in EV (BEV/PHEV) until 30 Jun 2027: duty = max(0, duty - 1500)
```

### 2.2 Registration (first 12 months), CTP and plates

Registration is paid to the state transport authority; in every state except NSW the CTP/injury premium is collected with it. Figures are for a private, metro, ~1.5–1.8 t four-cylinder car, 12 months, 2026-27 fee schedules:

| Region | Registration fee (incl. levies) | CTP / injury insurance | Plates | Total to budget (excl. duty) |
|---|---|---|---|---|
| **NSW** | $84 admin + motor vehicle tax by tare weight: ≤970 kg $285; 971–1,150 kg $330; 1,151–1,500 kg $401; 1,501–2,500 kg $611; 2,501–2,790 kg $882 (private use). One-off **$100 discount** on private light-vehicle rego between 1 Sep 2026 and 31 Aug 2027. | **Green slip bought separately** from 6 insurers; Sydney metro passenger car **$573–$757** (Jul 2026), regional ~$450–$600. Enter ~$650 metro. | $58 | ≈ $1,150–$1,450 (small car ≈ $1,150; large SUV/ute ≈ $1,450) |
| **VIC** | Registration $352.70 + TAC charge $606.10 (metro high-risk zone) = **$958.80**; outer-metro $897.10; rural $824.60. | Included (TAC) | ~$42 | ≈ $1,000 metro |
| **QLD** | Registration + traffic improvement fee by cylinders: 1–3 cyl or electric $370.35; 4 cyl $452.70; 5–6 cyl $677.55; 7–8 cyl $921.95. | CTP class 1 $411.80–$424.80 (choose Suncorp/Allianz/QBE), paid with rego | ~$35 | ≈ $900 (4-cyl), $820 (EV/hybrid), $1,130 (V6) |
| **WA** | Licence fee **$29.76 per 100 kg of tare** (1,500 kg ≈ $446; 2,200 kg ≈ $655) + recording fee $9.70 | Motor injury insurance class 1A **$520.50** | ~$30 | ≈ $1,000 (car) to $1,200 (large SUV) |
| **SA** | Registration $162 (≤4 cyl and EVs), $331 (5–6 cyl), $477 (7+ cyl) + Lifetime Support levy $152.79 + ESL $32 + admin $12 | CTP metro district $275–$287 + $60 stamp duty on the policy | ~$28 | ≈ $700 (4-cyl) to $1,020 (V8) |
| **TAS** | Registration $90.16 + motor tax by cylinders ($149 ≤3 cyl; $173 4 cyl & EV; $217 5–6; $297 7–8) + road safety levy $31.61 + fire levy $23 | MAIB premium $305 + $20 duty | ~$27 | ≈ $645 (4-cyl) |
| **ACT** | Emissions-based rego (12 months, 1,155–1,505 kg): AAA $394.90; AA $416.10; A $437.70; B $495.00; C/unrated $607.30; D $719.60 (+ road rescue $33.70, lifetime care levy $110.40, motor accident levy $14, road safety $3.30) | Motor accident injury class 1 $396.60 | ~$50 | ≈ $940 (EV) to $1,280 (>220 g/km) |
| **NT** | Engine-based: 4 cyl 1,501–3,000 cc **$849.25 all-in** (incl. MAC compulsory injury premium $552.05 + GST $55.20 + admin $16); 1,001–1,500 cc $792.25 | Included (MAC) | ~$20 | ≈ $870; plug-in EVs pay only the MAC/admin part (~$620) until 30 Jun 2027 |

Comprehensive insurance is optional but universal on financed cars: **$1,200–$2,000 a year** for a $40k–$60k mainstream car with a 35–50-year-old driver, $2,000–$3,500 for a $100k+ car, and Chinese EVs/PHEVs and performance cars sit at the top of their band. Under-25 drivers pay roughly double.

### 2.3 Dealer delivery charge

A dealer-set fee for pre-delivery inspection, detailing, fuel and paperwork. **Typically $1,500–$3,000** (most volume brands $1,995–$2,500; Mercedes/BMW/Audi $3,000–$5,000; Toyota LandCruiser dealers up to $4,000). It is **negotiable** — it is the first thing to ask the dealer to waive or halve, and it disappears entirely in advertised drive-away deals. Not charged (or fixed at $0–$400 "order fee") by direct/agency-model brands: Tesla, Polestar, Honda, Cadillac, Smart, BYD's own stores. Stamp duty is calculated on the price including dealer delivery.

### 2.4 Luxury Car Tax (LCT) — federal, 33 %, embedded in the RRP

Applies to cars (vehicles carrying < 2 t load and < 9 people) whose GST-inclusive price exceeds the threshold; paid by the importer/dealer and passed on inside the RRP.

- **2026-27 thresholds (1 July 2026–30 June 2027):** fuel-efficient vehicles **$91,661**; all other vehicles **$80,809**. (2025-26 and 2024-25: $91,387 / $80,567.) Indexed by CPI each July.
- **Fuel-efficient definition:** combined fuel consumption **not exceeding 3.5 L/100 km** (changed from 7.0 L/100 km on 1 July 2025). In practice only EVs, hydrogen cars, PHEVs and a handful of hybrids (Yaris/Corolla/Prius-type at ≤ 3.5 L/100 km) qualify; a RAV4 hybrid (4.8) or BMW 330e no longer does.
- **Formula:** `LCT = (price_incl_GST − threshold) × 10/11 × 0.33`, i.e. **30 % of every GST-inclusive dollar above the threshold**. Example: an $88,000 non-efficient car → ($88,000 − $80,809) × 10/11 × 0.33 = **$2,157**; a $140,000 diesel SUV → **$17,757**, all already inside the sticker.
- Because the RRP already includes LCT, the only place a buyer meets it "live" is on **options, accessories and dealer delivery** added to a car that is over the threshold: each $1,000 of extras costs $1,300 (33 % × 10/11 of the GST-inclusive amount). Extras bought after delivery avoid it.
- **Exempt:** commercial vehicles whose payload exceeds the passenger-carrying capacity (every dual-cab ute with ~1 t payload — Ranger Raptor, Cannon Alpha, Shark 6, F-150 etc. carry no LCT), vans, 9+ seat buses, motorhomes, cars > 2 years old, and cars for people with disability.
- **Coming change (EU free-trade agreement signed 24 March 2026):** the 5 % import tariff on EU-built cars is to be abolished on entry into force (expected during 2027) and a **third LCT threshold of $120,000 for zero-emission vehicles** is being created (Treasury has indicated it will apply to all EVs, not only European ones; the fine print was still unpublished in Sept 2026, WhichCar reports an expected start of 1 July 2027). Japanese, Korean, Thai, Chinese and US-built cars already enter tariff-free under existing FTAs; EVs and PHEVs priced below the fuel-efficient LCT threshold have been tariff-free since 1 July 2022.

### 2.5 Worked example — Toyota RAV4 GX 2WD hybrid, RRP $45,990 (tare 1,720 kg, 109 g/km, 4-cyl hybrid)

| | NSW (Sydney) | VIC (Melbourne) | QLD | WA | SA | TAS | ACT | NT |
|---|---|---|---|---|---|---|---|---|
| Dealer delivery (assume) | $2,000 | $2,000 | $2,000 | $2,000 | $2,000 | $2,000 | $2,000 | $2,000 |
| Dutiable value | $47,990 | $47,990 | $47,990 | $47,990 | $47,990 | $47,990 | $47,990 | $47,990 |
| Stamp duty | $1,500 | $2,016 (4.2 % green) | $960 (2 %) | $2,975 (6.20 % sliding) | $1,860 | $1,920 (4 %) | $1,422 (band A: $1,278 + 4.81 % of $2,990) | $1,440 |
| Rego + CTP + plates | $84 + $611 + $58 + $650 greenslip = $1,403 | $959 + $42 = $1,001 | $453 + $418 + $35 = $906 | $536 + $521 + $10 + $30 = $1,096 | $162 + $280 + $60 + $185 + $12 + $28 = $727 | $643 + $27 = $670 | $438 + $397 + $161 + $50 = $1,046 | $849 + $20 = $869 |
| **Drive-away** | **$50,893** | **$51,007** | **$49,856** | **$52,061** | **$50,577** | **$50,580** | **$50,458** | **$50,299** |

### 2.6 Regions for the dropdown (suggest 8–10)

NSW — Sydney metro; NSW — regional (cheaper green slip, lower rego); VIC — Melbourne metro; VIC — regional; QLD; WA; SA; TAS; ACT; NT. The eight jurisdictions have genuinely different duty tables; the metro/regional split only changes CTP/TAC by $100–$150.

## 3. EV / hybrid incentives in force, September 2026

Federal:
- **FBT exemption for electric cars on a novated lease / company car** (the "Electric Car Discount"): battery-electric and hydrogen cars first held after 1 July 2022 whose price is **below the fuel-efficient LCT threshold ($91,661)** attract no fringe benefits tax, so lease payments (and charging) come out of pre-tax salary — worth roughly $4,000–$11,000 a year to a 37–45 % taxpayer, and the reason novated leasing drives a third of private EV sales. **PHEVs lost the exemption on 1 April 2025** (leases signed before then keep it until the lease ends). **Announced change from 1 April 2027:** full exemption only for EVs under a new **$75,000 cap**; EVs between $75,000 and the LCT threshold get a 25 % FBT discount instead; existing leases are grandfathered. Home charging can be claimed at 4.2 c/km under ATO guideline PCG 2024/2.
- **Import tariff:** EVs/PHEVs/FCEVs below the fuel-efficient LCT threshold pay no 5 % customs duty (since 1 July 2022; mostly matters for EU-built cars).
- **No federal purchase rebate.** The Cheaper Home Batteries Program (30 % off a home battery, from 1 July 2025) helps EV owners indirectly.
- **No EV road-user charge yet.** Victoria's per-km charge was struck down by the High Court in 2023; a national scheme is being designed with the states but nothing is legislated for 2026-27.

State/territory (what is left):
- **NT:** stamp duty concession up to $1,500 and **free registration component** for new and used plug-in EVs (BEV and PHEV) until **30 June 2027**; home/business charger grants.
- **QLD:** 2 % duty for hybrids/EVs at any engine size (vs 3–4 %), and EVs pay the cheapest 1–3-cylinder rego tier (~$370 vs $453) — structural, no end date. The $3,000/$6,000 ZEV rebate closed 2 Sept 2024.
- **VIC:** green-car duty rate 4.2 % at any price for cars ≤ 120 g/km (saves 1–4.8 points on cars above $80,809); the $100 annual EV rego discount ended 1 Jan 2026.
- **ACT:** lowest duty (AAA $2.50/$100) and rego band for zero-emission cars; **Sustainable Household Scheme** zero-interest loans of $2,000–$15,000 for EVs (price cap tied to the LCT fuel-efficient threshold) and chargers. Full duty exemption ended 31 Aug 2025; the 2-year free rego for new ZEVs ended 30 June 2024.
- **NSW, WA, SA, TAS:** no purchase incentives left (NSW $3,000 rebate and duty exemption ended 1 Jan 2024; WA $3,500 rebate ended 10 May 2025; SA $3,000 subsidy ended 31 Dec 2024 and free rego ended 30 June 2025; TAS waivers ended 2023). NSW still offers cheaper CTP for some EVs via insurer pricing only.
- Charger grants (WA, QLD, TAS, ACT, NT) and solar/battery rebates exist but are not car incentives.

## 4. Dealer discount climate, September 2026

Context: the market is 108,760 sales in August 2026 (+4.9 % YoY) and **EVs outsold petrol for the first time (24.9 % share) after the mid-2026 fuel-price shock** (unleaded up ~85 c/L and diesel up ~$1.09/L since 30 June). Chinese brands hold 40 % of the market; Tesla Model Y is the best-selling vehicle; diesel utes and large SUVs are the soft spot (Ford −40 %, Mitsubishi −43 %, Audi −50 % in August).

| Segment / brand | Typical discount off RRP | Notes |
|---|---|---|
| **Hot (0–2 %)**: Toyota RAV4 (new gen, PHEV waits), Prado, LandCruiser 300/70, GR models; Tesla; Zeekr 7X; Suzuki Jimny; Lexus GX; Defender/Range Rover popular specs; Porsche 911/718; Ferrari/Lamborghini | 0 %, sometimes a paid wait | Tesla and Polestar have fixed prices but change them monthly; Toyota dealers will only trim dealer delivery. |
| **Steady (2–5 %)**: Toyota hybrids other than RAV4, Mazda CX-5/CX-30, Kia Sportage/Sorento/Carnival, Hyundai Tucson/Kona, Subaru Forester, Isuzu D-Max/MU-X, VW Tiguan/Tayron, Skoda, Cupra, Volvo, Lexus NX, BMW/Mercedes volume models | $1,000–$3,000 off, or dealer delivery waived, or a $1,000–$2,000 accessory pack | Ask for the "runout" or "demo" price at the end of each quarter (Sept, Dec, Mar, Jun). |
| **Deals (6–15 %)**: **price-war brands BYD, MG, GWM, Chery, Omoda/Jaecoo, Geely, Leapmotor, Mahindra** (drive-away offers that effectively waive on-roads — Atto 1 $19,990 DA, MG 3 $19,990 DA, Tiggo 4 $22,490 DA, Sealion 7 $54,990 DA, Shark 6 $57,900 DA + $3,000 cashback, Smart #1/#3 −$5,000, Cadillac Lyriq −$32,000, Toyota bZ4X −$10,000); diesel utes and ladder-frame SUVs (Ford $4,000 fuel card on Ranger/Everest, Ranger PHEV drive-away offers, Triton, Navara D23 stock, Cannon, T60, Musso, Pajero Sport, Fortuner run-out); run-out models (Kia Seltos, Renault Koleos, Nissan Patrol Y62, Toyota Supra, VW Touareg/T-Roc, Nissan Leaf, Kia Niro, Mercedes A-Class/GLA/EQ range, BMW i4/iX, Jeep, Peugeot, Mitsubishi ASX/Eclipse Cross, Honda 8-year-warranty offers) | 6–15 %, occasionally 20 %+ on aged EV stock (Mercedes EQ, Cadillac, Fiat 500e, Mach-E, Ora) | Chinese-brand offers usually have an order-by / deliver-by date (BYD: order by 30 Sept, deliver by 31 Oct 2026; Atto 1/Dolphin/Atto 2 DM-i deals to 15 Dec). |

NVES (New Vehicle Efficiency Standard, from 1 Jan 2025, penalties accruing from 1 July 2025 at **$100 per g/km per vehicle** over the fleet target: 117 g/km for passenger cars and 180 g/km for utes/4WDs in 2026, tightening to 92/150 in 2027 and 58/110 by 2029) has so far shown up as **cross-subsidy rather than sticker shock**: brands with EV credits (BYD, Tesla, Kia, Toyota, VW) discount petrol/diesel cars, while Mazda, Nissan, Subaru, Hyundai, Isuzu, Ford and the V8 exotics carry liabilities (Mazda $25 m in the first six months) that they say they will pass on from 2027-28 to the thirstiest models (Patrol, LandCruiser, Ranger V6, Mustang: expect $1,000–$5,000 rises rather than the "$25,000" headline). In Sept 2026 the visible effects are the disappearance of some V8/V6 variants and cheaper hybrids/PHEVs.

## 5. Fuel, electricity, mileage, finance (September 2026)

Fuel is expensive: the Middle East and Black Sea supply shock lifted Brent to US$98–110 and the AUD sits near US$0.62. Use these for calculators (cents per litre, incl. ~52 c/L excise + GST):

| Fuel | Sept 2026 national average | Notes |
|---|---|---|
| Regular unleaded 91 (ULP) | **235 c/L** (AIP national average 227.3 on 20 Sept; NRMA Sydney 237.4 on 28 Sept; Petrolmate monthly 239.9) | Was ~180 in June. Price cycles of ±20 c in Sydney/Melbourne/Brisbane/Adelaide/Perth. |
| E10 | 233 c/L | 1–3 c cheaper than 91, ~3 % more consumption |
| Premium 95 | **253 c/L** | Required by most European cars and many turbo Chinese cars |
| Premium 98 | **262 c/L** | Performance cars |
| Diesel | **280 c/L** (AIP 273.6 on 20 Sept; Sydney 285.1; Petrolmate 288.3) | Diesel is now 45 c/L dearer than unleaded — the reverse of the historical norm; the main driver of ute buyers switching to PHEVs. |
| LPG | 115 c/L | Very few new cars |
| Home electricity | **32 c/kWh usage rate** on a typical single-rate plan after the 1 July 2026 DMO reset (NSW ~33, VIC ~28, SE QLD ~31, SA ~43, WA 32.9, TAS ~30, ACT ~30, NT ~28), plus a $1.10–$1.60 daily supply charge; blended all-in cost ~40 c/kWh. **EV/overnight tariffs 8–15 c/kWh** (Amber, OVO, AGL/Origin EV plans, midnight–6 am); Victoria's mandatory free daytime "solar sharer" window from July 2026 = 0 c/kWh 11 am–2 pm for households that opt in. Public DC fast charging 55–80 c/kWh; AC destination charging 25–45 c/kWh. | An EV at 17 kWh/100 km costs ~$5.40/100 km at home vs ~$14–16 for a 6–7 L/100 km petrol car. |

- **Annual distance:** 12,000–13,000 km for a private passenger car (ABS Survey of Motor Vehicle Use average 12,100 km; utes and regional buyers 15,000–20,000). Use **12,500 km**.
- **Car loan:** RBA cash rate 4.35 % after three rises in Feb/Mar/May 2026. Secured new-car loans from banks/credit unions **6.5–9.9 % p.a.** for prime borrowers (average ~7.7 %), 5.5–6.9 % "green" rates for EVs (CommBank, NRMA, Loans.com.au), dealer finance 8–12 % with balloon options; comparison rates add 0.3–0.8 points for fees. Standard term **5 years** (7 years available). A $45,000 loan at 7.7 % over 5 years = $906/month, total interest ≈ $9,350.
- **Novated lease** (salary packaging) is the dominant way salaried Australians buy EVs because of the FBT exemption; lease rates 7–9 % plus fees, 3–5 year terms with a residual/balloon (ATO minimum residual 28.13 % after 5 years).
- Typical annual running budget for a $45k car: rego+CTP $1,000–$1,400, comprehensive insurance $1,500, servicing $300–$600 (capped-price programs: Toyota $270/yr for 5 years, Kia/Hyundai ~$400–$500, Chinese brands $250–$400, European brands $600–$900 or prepaid packs), tyres, plus fuel.

## 6. Glossary for a first-time Australian buyer

- **RRP / MLP / "before on-road costs" / "plus ORC":** the manufacturer's list price including GST and LCT but excluding stamp duty, rego, CTP, plates and dealer delivery.
- **Drive-away (D/A):** the total you hand over to leave the dealership — RRP plus all on-road costs for your postcode; advertised drive-away deals usually waive dealer delivery.
- **On-road costs (ORC):** the bundle of stamp duty + registration + CTP + plates + dealer delivery, typically 5–8 % of RRP.
- **Stamp duty (motor vehicle duty):** a one-off state tax on the purchase price, 2–9 % depending on the state, price, engine and emissions.
- **Rego (registration):** the annual state fee to keep the car legally on the road; includes CTP everywhere except NSW, where the green slip is bought separately.
- **CTP / green slip / TAC / MAIB / MAC / MII:** compulsory third-party personal-injury insurance (named differently in each state); does not cover damage to cars.
- **Comprehensive insurance:** optional cover for your car and other people's property; lenders require it.
- **LCT (Luxury Car Tax):** 33 % federal tax on the part of a car's price above $80,809 ($91,661 for cars using ≤ 3.5 L/100 km); already inside the RRP; utes are exempt.
- **Dealer delivery:** a dealer fee ($1,500–$3,000) for preparing the car; negotiable.
- **Novated lease:** a three-way salary-packaging lease with your employer; EVs under $91,661 are FBT-exempt, which cuts the real cost by 20–40 %.
- **FBT (fringe benefits tax):** the tax normally charged when an employer provides a car; the EV exemption is the biggest EV incentive in Australia.
- **NVES:** the New Vehicle Efficiency Standard — fleet-average CO2 targets that fine car makers $100 per gram per car over target; it is why hybrids/EVs get cheaper and V8s dearer.
- **ADR 81/02 fuel figure:** the official combined L/100 km on the windscreen label (lab test); real use is 15–30 % higher.
- **ANCAP:** the local five-star crash-safety rating; some fleets and novated providers require 5 stars.
- **Balloon / residual:** the lump sum left at the end of a loan or lease.
- **Run-out:** stock of a model being replaced, sold at a discount; check the build (compliance) date on the plate — a 2025-built car is worth less at trade-in.
- **Cab-chassis vs pick-up (tub):** ute body styles; cab-chassis prices exclude the tray ($1,500–$4,000).

## 7. Sources used

Prices (Sept 2026): carsguide.com.au `…/price/2026` and `/2027` model pages (MSRP, excludes on-roads) for most nameplates; CarExpert, Drive, WhichCar, carsales and brand newsrooms for 2026 launches and changes — e.g. https://www.drive.com.au/news/2026-toyota-hilux-price-and-specs-entry-price-up-6000-with-new-model/ , https://www.carexpert.com.au/car-news/2026-toyota-rav4-price-and-specs , https://www.carexpert.com.au/car-news/2026-toyota-hilux-bev-new-electric-ute-priced-for-australia , https://www.drive.com.au/news/2026-toyota-bz4x-price-and-specs-10000-price-slash-for-updated-model-y-rival/ , https://www.carexpert.com.au/car-news/2026-toyota-corolla-price-and-specs , https://www.carexpert.com.au/car-news/toyota-fortuner-axed-no-replacement-coming , https://www.carexpert.com.au/car-news/2026-ford-ranger-price-and-specs-my26-5-updates-detailed , https://www.carexpert.com.au/car-news/ford-ranger-phev-prices-cut-by-up-to-10000-other-rangers-get-4000-fuel-offer , https://www.drive.com.au/news/2026-ford-ranger-phev-price-updated-ute-adds-features-reshuffles-range/ , https://www.drive.com.au/news/2026-mazda-cx-5-price-and-specs-first-new-model-since-2017-due-in-australia-mid-year/ , https://www.drive.com.au/news/2026-mazda-cx-60-g25-price-new-base-four-cylinder-cuts-rrp-to-new-low/ , https://www.carsguide.com.au/car-news/sharp-price-for-kias-new-hybrid-suv-revealed-2026-kia-seltos-compact-suv-gets-price-in , https://www.carexpert.com.au/car-news/2026-mitsubishi-asx-price-and-specs , https://www.carexpert.com.au/car-news/2026-nissan-navara-price-and-specs , https://www.carexpert.com.au/car-news/2027-nissan-patrol-y63-pricing-confirmed-for-australia , https://www.carexpert.com.au/car-news/2026-subaru-outback-price-and-specs-new-gen-suv-range-includes-rugged-wilderness , https://www.carexpert.com.au/car-news/2026-honda-cr-v-prices-cheaper-hybrids-join-updated-lineup , https://www.drive.com.au/news/2026-honda-zr-v-price-and-specs-expanded-hybrid-line-up-now-undercuts-big-name-rivals/ , https://www.carexpert.com.au/car-news/2026-mg-4-ev-urban-price-and-specs , https://www.drive.com.au/news/2026-mg-s5-ev-price-and-specs-smaller-line-up-more-driving-range-for-flagship-grade/ , https://www.drive.com.au/news/2027-mg-u9-ev-price-and-specs-electric-ute-launches-for-78990/ , https://www.carsguide.com.au/car-news/a-new-car-price-war-is-forming-2026-mg4-mg-hs-super-hybrid-and-mg-zs-hybrid-value-increased , https://www.carexpert.com.au/car-news/2026-byd-atto-1-price-and-specs-australias-cheapest-ev-undercuts-many-ice-rivals , https://www.drive.com.au/news/2027-byd-atto-2-dm-i-price-and-specs-australias-new-cheapest-phev-by-9000/ , https://www.carexpert.com.au/car-news/2026-byd-seal-6-price-and-specs , https://www.racv.com.au/royalauto/transport/electric-vehicles/2026-byd-atto-2-price-specs-release-date.html , https://bydautomotive.com.au/offers , https://www.whichcar.com.au/news/byd-drop-cut-prices-shark-6-sealion-7-atto-2-australia-limited-time , https://www.carexpert.com.au/car-news/byd-fuels-australian-price-war-despite-chinese-government-warning , https://www.carexpert.com.au/car-news/2026-geely-ex2-price-and-specs , https://www.carexpert.com.au/car-news/2026-geely-starray-em-i-phev-suv-priced-for-australia , https://www.carexpert.com.au/car-news/2026-zeekr-7x-price-and-specs , https://www.carexpert.com.au/car-news/2026-xpeng-g6-prices-refreshed-suv-undercuts-tesla-model-y-zeekr-7x-and-byd-sealion-7-in-australia , https://www.carexpert.com.au/car-news/2026-xpeng-x9-prices-futuristic-ev-enters-growing-luxury-people-mover-segment , https://www.chasingcars.com.au/news/new-car-prices/leapmotor-b10-2026-arriving-in-november-set-to-undercut-mg-s5-and-byd-atto-3-rivals-with-38990-pricetag/ , https://www.carexpert.com.au/car-news/deepals-delayed-electric-byd-rival-nears-australian-launch , https://www.carexpert.com.au/car-news/2027-smart-5-price-and-specs-new-tesla-model-y-rival-here-this-year , https://www.carexpert.com.au/car-news/2026-cupra-formentor-updated-suv-range-priced-for-australia , https://www.carsguide.com.au/car-news/2026-cadillac-lyriq-electric-suv-price-cut-by-32000-permanently-to-undercut-bmw-ix-and , https://www.drive.com.au/news/2026-jac-hunter-phev-price-and-specs-australias-most-powerful-new-car-under-50000/ .

Market: https://www.carexpert.com.au/car-news/vfacts-august-2026-evs-outsell-petrol-diesel-and-hybrid-new-vehicles-in-bumper-month , https://www.drive.com.au/news/australian-new-car-sales-in-august-2026-electric-outsells-petrol-for-the-first-time-as-tesla-model-y-tops-charts/ , https://www.abc.net.au/news/2026-02-18/new-vehicle-efficiency-standard-results-mazda-nissan-penalties/106358770 , https://www.drive.com.au/news/nves-new-vehicle-efficiency-standard-explained/ .

Taxes and fees: https://www.ato.gov.au/tax-rates-and-codes/luxury-car-tax-rate-and-thresholds , https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/luxury-car-tax/definitions-luxury-car-tax , https://www.aada.asn.au/bulletin/luxury-car-tax-thresholds-2026-27/ , https://www.mynrma.com.au/open-road/advice-and-how-to/buying-or-selling-a-car/luxury-car-tax , https://www.carexpert.com.au/car-news/tariffs-on-european-cars-scrapped-in-australia-but-luxury-car-tax-lives-on-with-revisions , https://www.whichcar.com.au/news/luxury-car-tax-changes-modest-discounts-significant-upheaval-2027 , https://www.sro.vic.gov.au/about-us/rates-and-statistics/current-rates/motor-vehicle-duty-current-rates , https://www.qld.gov.au/transport/registration/fees/duty/rates , https://www.revenue.act.gov.au/motor-vehicle-duty , https://www.revenuesa.sa.gov.au/stamp-duty-vehicles/rates , https://www.sro.tas.gov.au/motor-vehicle-duty/rates-of-duty , https://treasury.nt.gov.au/dtf/territory-revenue-office/stamp-duty-on-motor-vehicles , https://regowise.com.au/stamp-duty/wa/ , https://www.nsw.gov.au/driving-boating-and-transport/driving-nsw/vehicle-registration/fees-concessions-and-forms/vehicle-registration-fees , https://regowise.com.au/ctp-green-slip/cost/ , https://regowise.com.au/rego/vic/ , https://regowise.com.au/rego/qld/ , https://regowise.com.au/rego/wa/ , https://regowise.com.au/rego/sa/ , https://regowise.com.au/rego/tas/ , https://regowise.com.au/rego/act/ , https://regowise.com.au/rego/nt/ .

Incentives: https://www.novatedleaseaustralia.com.au/electric-cars/ev-incentives , https://www.whichcar.com.au/news/what-ev-incentives-still-available-in-my-state , https://zecar.com/reviews/ev-tax-break-under-review .

Fuel, energy, finance: https://www.abc.net.au/news/2026-09-23/petrol-prices-rising-brent-crude-drops/107184536 , https://www.mynrma.com.au/cars-and-driving/fuel-finder/weekly-report , https://petrolmate.com.au/monthly-fuel-report , https://utilityclub.com.au/electricity/electricity-cost-per-kwh , https://savvy.com.au/car-loans/average-car-loan-interest-rate-in-australia/ , https://www.abs.gov.au/statistics/industry/tourism-and-transport/survey-motor-vehicle-use-australia/latest-release .
