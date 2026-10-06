# Thailand (th) — on-road math and market notes, late September 2026

Currency THB (฿). Prices in `data/cars_th.json` are integer baht, the **brand's published retail price (ราคาขายปลีกแนะนำ / "ราคาป้าย") including 7 % VAT**, for the cheapest and dearest grade of each nameplate, excluding colour surcharges (pearl white / two-tone are typically +฿10,000–30,000) and dealer accessories. Where a brand only advertises a time-limited "early-bird" or "campaign" price (Honda City until 30 Sep 2026, Nissan Kicks until 30 Sep 2026, Changan Nevo Q05, GWM ORA 5) the row uses the brand's own headline figure and the note says so. Efficiency columns: Eco Sticker (car.go.th) combined figures — km/L converted to L/100 km (100 ÷ km/L), CO2 g/km as printed on the sticker (UN R101 lab cycle, so real-world use is 15–25 % worse); where a sticker value was not verifiable the CO2 was estimated from the fuel figure (petrol ≈ 2,300 ÷ km/L, diesel ≈ 2,640 ÷ km/L) — treat it as ±10 g/km. EV range is the figure the brand publishes: **NEDC for almost every Chinese, Japanese and Korean EV, WLTP for Tesla, BMW, Mercedes, Volvo, Audi, Porsche, MINI, Xpeng G6, Zeekr 7X**, CLTC for a few (noted in the row). Thai model years follow the calendar; 2569 = 2026.

## 1. What the retail price already includes

A Thai sticker price is **all-in for taxes**: it already contains import duty (for CBUs), excise tax (ภาษีสรรพสามิต), the interior/municipal tax (ภาษีเพื่อมหาดไทย = 10 % of the excise) and 7 % VAT. There is nothing like a US "destination charge" and no regional purchase tax. What is *not* in the price: DLT registration, first-year annual tax, compulsory insurance (พ.ร.บ.), voluntary insurance, and any dealer "ค่าดำเนินการ" (processing) fee.

How the taxes stack (Excise Act B.E. 2560 — the excise base is the **suggested retail price excluding VAT**, tax-inclusive):

```
P_exVAT = retail / 1.07
excise  = P_exVAT × rate            (rate from the CO2/technology table below)
interior_tax = 0.10 × excise
VAT     = 0.07 × P_exVAT
factory/importer net = P_exVAT × (1 − 1.1 × rate)
```

Worked examples (share of sticker that is tax):

| Car | Retail | Rate | Excise | Interior | VAT | Tax share |
|---|---|---|---|---|---|---|
| Toyota Yaris Ativ Smart 1.2 (≤100 g) | 599,000 | 13 % | 72,776 | 7,278 | 39,187 | 19.9 % |
| Honda Civic e:HEV EL (HEV ≤100 g) | 949,000 | 6 % | 53,215 | 5,321 | 62,084 | 12.7 % |
| Toyota Fortuner 2.4 Leader (PPV >200 g) | 1,239,000 | 25 % | 289,486 | 28,949 | 81,056 | 32.2 % |
| Isuzu D-Max Hi-Lander 4-door (double cab >200 g) | 949,000 | 13 % | 115,299 | 11,530 | 62,084 | 19.9 % |
| BYD Atto 3 Extended (BEV, EV3.5) | 769,900 | 2 % | 14,390 | 1,439 | 50,367 | 8.6 % |
| Lexus RX 350h (CBU Japan, HEV 121–150 g) | 4,870,000 | 14 % | 637,196 | 63,720 | 318,598 | 20.9 % + 80 % duty inside CIF |

For an imported CBU the importer also paid customs duty on the CIF value before all of the above, which is why a Japanese- or European-built car costs 2–2.5× its home price: `landed = CIF × (1 + duty)`, then the retail price must cover landed cost + excise + interior + VAT + margin. Rule of thumb: an EU/UK/Japan CBU carries **~100–130 % of CIF in tax**, a China CBU **~20–35 %**, a Thai-built ICE car **15–35 %**, a Thai-built or EV3.5 BEV **~9 %**.

Programmer formula: `on_road = retail + registration_fees + annual_tax_year1 + compulsory_insurance + voluntary_insurance + dealer_fee` — everything else is national and already inside `retail`.

## 2. From retail to on-the-road (national — no provincial variation)

### 2.1 Excise tax (already in the price; needed only to explain price gaps and for what-if pricing)

New CO2-based structure in force since **1 January 2026** (cabinet resolution 2022, Excise Dept notifications Dec 2025). Rates for 2026–27; the ICE/HEV rows step up by 1–2 points in 2028 and again in 2030.

| Category (engine ≤ 3,000 cc unless stated) | ≤100 g/km | 101–120 | 121–150 | 151–200 | >200 |
|---|---|---|---|---|---|
| ICE passenger car (E10/E20/E85 — the old E85 discount and the 14 %/12 % Eco Car rates were abolished) | **13 %** (14 % 2028, 15 % 2030) | **22 %** (24, 26) | **25 %** (27, 29) | **29 %** (31, 33) | **34 %** (36, 38) |
| ICE > 3,000 cc | 50 % flat | | | | |
| HEV full hybrid (needs ≥2 of 6 ADAS; BOI-promoted HEV projects locked at 6 %/9 % to 2032) | **6 %** (8, 10) | **9 %** (11, 13) | **14 %** (16, 18) | **19 %** (21, 23) | **24 %** (26, 28) |
| HEV > 3,000 cc | 40 % | | | | |
| MHEV mild hybrid with BOI conditions (Thai battery pack, ≥4 of 6 ADAS, ≥฿1 bn investment) | 10 % | 12 % | otherwise ICE table | | |
| PHEV (≥2 ADAS, Thai-made battery from 2026) | **5 %** if electric range ≥ 80 km and tank ≤ 45 L; **10 %** if < 80 km; 15 % non-compliant (20 % from 2030); 30 % if > 3,000 cc | | | | |
| BEV | **2 %** (EV3.5 participants and Thai-built cars meeting ADAS/battery conditions); **10 %** for other imports; 2 % for BEV pickups (was 0 % in 2024–25) | | | | |
| FCEV | 1 % | | | | |

Pickups (≤ 3,250 cc; 50 % above that), by cab type and CO2 — this is why a double-cab pickup is so cheap relative to an SUV:

| Cab | ≤185 g/km | 186–200 | >200 | B20-capable |
|---|---|---|---|---|
| Single cab / no cab (Spark, Champ, Standard Cab) | 3 % | 4 % | 5 % | −1 pt (2/3/4 %) |
| Space cab / extended cab (Smart Cab, Spacecab, Mega Cab, King Cab, Giant Cab, Freestyle) | 4 % | 6 % | 8 % | 3/5/7 % |
| Double cab (4-door) | 8 % | 10 % | 13 % | 6/9/12 % |
| PPV — pickup-based passenger SUV (Fortuner, MU-X, Everest, Pajero Sport, Terra) | 18 % | 20 % | 25 % | 16/18/23 % |
| Double-cab PHEV pickup (Shark 6, Hunter K50) 5 %; BEV pickup 2 % (10 % non-qualified); PPV PHEV 10 % | | | | |

Almost every diesel pickup and PPV emits > 200 g/km, so in practice: single cab 5 %, space cab 8 %, double cab 13 %, PPV 25 %.

**September 2026 status — what changed and what is coming**
- 1 Jan 2026: the table above replaced the 2016 structure. Impact seen in Jan–Apr 2026 price lists: small ICE cars +฿5,000–20,000 (Yaris Ativ, Almera), most HEVs up 2–6 points (Honda froze prices to 6 Apr 2026 and then raised), luxury/super-cars > 3.0 L +฿200,000 to +฿3 m. BEVs fell to 2 % for everyone in EV3.5.
- EV3.5 (2024–2027) still runs: 2 % excise on BEVs ≤ ฿7 m for enrolled brands, plus the purchase subsidy in 3 below. The 40 % import-duty cut for CBU EVs ended 31 Dec 2025, so 2026–27 CBU EVs pay full duty (0 % from China/ASEAN anyway, 80 % from Europe/Japan).
- 10 Sep 2026: the National EV Policy Board approved in principle a **three-tier BEV excise** — lowest for cars built in Thailand with high local content, a middle rate for brands that import while investing in a plant, and about **30 % (Finance Minister: "around 30, maybe 31–32 %") for fully imported BEVs from brands with no Thai production plan**. Cabinet submission was promised "by end-September 2026"; carmakers asked for a grace period. **Not in force as of 29 Sep 2026** — current stickers still reflect 2 %/10 %. Tesla, Zeekr, Xpeng (deciding on a plant), Hyundai, Kia, the German brands' CBU EVs and Mazda 6e are the exposed ones; BYD, MG, GWM, Changan/Deepal, Aion, Neta, Omoda&Jaecoo, Geely, Leapmotor, Chery, Volvo, Mercedes (CLA/GLC EV), BMW (iX1 assembled in Rayong), Honda e:N1 and Toyota Travo-e already build locally.
- Hybrids: no new consumer incentive in 2026. The 2024 cabinet package for HEV/MHEV (6 %/9 % locked to 2032, 10 %/12 % for MHEV) is a manufacturer investment scheme; the proposed 80 % annual-tax cut for HEV/PHEV (see 2.3) is still a draft. Honda, Mitsubishi, Isuzu and Mazda committed ฿50.4 bn for hybrid/EV lines (Sept 2026).

### 2.2 Import duty (inside the price; explains brand pricing)

| Origin | Duty on CBU passenger cars | Who |
|---|---|---|
| Built in Thailand (CKD/local) | 0 % (parts 0–30 %, most under FTAs/BOI) | Toyota, Honda, Isuzu, Mitsubishi, Nissan, Mazda, Ford, MG, BYD, GWM, Changan, Aion, Neta, Omoda&Jaecoo, Geely, Volvo, Mercedes, BMW |
| China (ASEAN–China FTA) | **0 %** | Tesla, MG IM5/IM6, Denza, Zeekr, Xpeng, Leapmotor, Aion Hyptec, Mazda 6e, Kia EV5, MINI Aceman, Lotus Eletre, Chery/Wuling CBUs |
| ASEAN (ATIGA) | **0 %** | Indonesia-built Toyota Yaris Cross/Veloz/Innova Zenix, Hyundai Stargazer/Ioniq 5 N Line, Suzuki XL7, Wuling Air/Binguo, Honda BR-V parts |
| Japan (JTEPA) | 80 % below 3,000 cc, 60 % for > 3,000 cc (JTEPA cut only the big-engine band) | Alphard/Vellfire, GR Yaris/GR86, bZ4X, Jimny, Swift, Subaru, Mazda MX-5, Nissan X-Trail/Serena, Honda Step WGN, Lexus — hence Forester at ฿2.59 m |
| Korea (AKFTA) | no meaningful concession, up to 80 % | Staria, Palisade, Ioniq 5 N, Carnival, Sorento, EV9 |
| EU, UK, USA, others | **80 %** (Thai–EU FTA concluded in principle 2026 but not in force; US reciprocal-tariff framework 2025 — no cut in force) | Porsche, Land Rover, Audi (Hungary/Germany), G-Class, Ferrari, Lamborghini, Bentley, Rolls-Royce, McLaren, Aston Martin, Lotus Emira |
| Australia (TAFTA) | 0 % | none of note |

### 2.3 Registration, plates and annual vehicle tax (Department of Land Transport, ขนส่ง)

Dealers normally do the paperwork and charge a bundled **"ค่าจดทะเบียน + ภาษี + พ.ร.บ."** of ฿3,000–8,000 depending on engine size; the underlying DLT fees are small and national:

- DLT fees for first registration (ป้ายขาว): application ฿5 + registration ฿315 + two plates ฿200 + registration book ฿100 ≈ **฿620** (approximate; some dealers quote ฿2,000–3,000 "ค่าดำเนินการ" on top).
- Red plates (ป้ายแดง) are dealer trade plates you drive on for ≤ 30 days while the car is registered; fine up to ฿10,000 if you overrun, and no night/inter-provincial use without a logbook.
- **Annual vehicle tax (ภาษีรถประจำปี) — first year paid at registration.** Private cars ≤ 7 seats (รย.1) are taxed on engine size, progressive: first 600 cc **฿0.50/cc**, 601–1,800 cc **฿1.50/cc**, above 1,800 cc **฿4.00/cc**.

```
tax_cc = 0.5*min(cc,600) + 1.5*max(0,min(cc,1800)-600) + 4.0*max(0,cc-1800)
1,000 cc → ฿900   1,200 cc → ฿1,200   1,300 cc → ฿1,350   1,500 cc → ฿1,650
1,800 cc → ฿2,100   2,000 cc → ฿2,900   2,400 cc → ฿4,500   2,500 cc → ฿4,900
2,800 cc → ฿6,100   3,000 cc → ฿6,900   3,500 cc → ฿8,900   4,000 cc → ฿10,900
```
  Discount 10 % per year from the 6th year, capped at 50 %. Hybrids pay the same cc-based tax as petrol cars.
- Pickups registered as private trucks (รย.3, green-on-white plate: single/space cab and most double cabs) pay by kerb weight: 1,001–1,250 kg ฿750; 1,251–1,500 ฿900; 1,501–1,750 **฿1,050**; 1,751–2,000 **฿1,350**; 2,001–2,500 ฿1,650; 2,501–3,000 ฿1,950. A double cab registered as a passenger car (รย.1) uses the cc table instead (2.4 L → ฿4,500), which is why most owners keep the truck registration.
- Vans and > 7-seat vehicles (รย.2: Hiace, Commuter, Staria, Carnival 11-seat, Majesty) and **all BEVs** pay a weight table: ≤ 500 kg ฿150; 501–750 ฿300; 751–1,000 ฿450; 1,001–1,250 ฿800; 1,251–1,500 ฿1,000; 1,501–1,750 **฿1,300**; 1,751–2,000 **฿1,600**; 2,001–2,500 **฿1,900**; 2,501–3,000 ฿2,200; 3,001–3,500 ฿2,400.
```
ev_tax(kg) = kg<=500?150 : kg<=750?300 : kg<=1000?450 : kg<=1250?800 : kg<=1500?1000 : kg<=1750?1300 : kg<=2000?1600 : kg<=2500?1900 : kg<=3000?2200 : 2400
```
- **EV annual-tax discount:** the 80 % cut (one year, for EVs registered 9 Nov 2022 – 10 Nov 2025) **has expired**. The DLT drafted two new royal decrees in early 2026 — 80 % off for BEVs, and separately for HEV/PHEV, for cars registered within 3 years of the decree (1 year per car in one draft, 3 years in another) — they were in public consultation/Cabinet review and **not yet published in the Royal Gazette as of Sept 2026**. Encode: EV pays the full weight-table tax (฿1,300–1,900 for a typical 1.6–2.3 t EV); flag "may drop by 80 % if the decree passes".

### 2.4 Compulsory insurance — พ.ร.บ. (Road Victims Protection Act), national fixed prices incl. VAT and stamp

| Vehicle type | Annual premium |
|---|---|
| Private car ≤ 7 seats (sedan, hatch, SUV, EV, PPV registered รย.1) | **฿645.21** |
| Pickup ≤ 3 t registered as private truck (รย.3) | **฿967.28** |
| Van / private vehicle > 7 seats (≤ 15 seats, รย.2) | **฿1,182.35** |
| Same vehicle for commercial hire | ฿1,182–2,500 |

### 2.5 Voluntary insurance (ประกันภัยรถยนต์) — first year

Not compulsory by law but **required by every finance company for the loan term**, and dealers usually give the first year free on financed cars (worth ฿12,000–30,000). Classes: ชั้น 1 (first class, comprehensive own-damage incl. single-vehicle accidents, flood, theft), ชั้น 2+ (own damage only when hitting another vehicle, plus theft/fire), ชั้น 3+ (collision with a vehicle only), ชั้น 3 (third-party only, ฿2,000–4,000). Typical first-class premiums 2026, driver 30+, ordinary garage, with a ฿3,000–5,000 deductible:

| Car | First-class premium | % of price |
|---|---|---|
| Eco car / B-segment (City, Ativ, Almera, Mirage) | ฿12,000–16,000 | 2.2–2.8 % |
| C/D sedan, B/C SUV (Civic, Corolla Cross, HR-V, CX-5) | ฿15,000–22,000 | 1.8–2.2 % |
| Pickups / PPV (Hilux, D-Max, Fortuner, MU-X) | ฿14,000–25,000 | 1.5–2.0 % (garage-repair policies are cheapest) |
| Chinese EVs ≤ ฿800k (Dolphin, Atto 3, MG4, Good Cat) | ฿15,000–26,000 (from ~฿11,500 with max deductible) | 2.5–3.5 % |
| EVs ฿1–2 m (Seal, Sealion 7, Model 3/Y, IM6, e:N1) | ฿22,000–40,000 | 2.0–2.8 % |
| Luxury ICE ฿3–5 m (BMW 5, GLC) | ฿50,000–90,000 | 1.6–2.0 % |
| Super/luxury > ฿8 m | 1.2–1.5 % | |

EV policies since Jan 2024 follow the OIC standard EV wording: named drivers (up to 5 — naming them cuts the premium 10–20 %), battery covered with a depreciation schedule (100 % year 1 down to 50 % by year 5 of battery age), home wall-box covered, and a separate deductible for battery claims. EV premiums run **15–40 % higher than an ICE car of the same price**, mainly because a damaged battery pack (฿400,000–700,000) is replaced, not repaired. Programmer default: `ins = 0.025 × price` for ICE ≤ ฿1.5 m, `0.030 × price` for EVs, `0.018 × price` above ฿3 m, floor ฿12,000.

### 2.6 Dealer fees and the "ของแถม" culture

There is no legal dealer delivery fee. What you see instead: a "ค่าดำเนินการ/ค่าจดทะเบียน" line (฿2,000–8,000, includes the DLT fees, first-year tax and พ.ร.บ.; ask for it to be itemised) and a long list of free extras (ของแถม): 1 year first-class insurance, window film (฿5,000–15,000), floor mats, dash-cam, wall-box for EVs (BYD/Tesla/MG/GWM frequently include a 7 kW charger + basic installation worth ฿20,000–35,000), fuel card, 5-year service packages. Cash discounts are given but often disguised as "ส่วนลดพิเศษ" or "ราคาโปรโมชั่น" rather than a lower list price; Chinese EV brands re-cut list prices every few months instead. Motor Show (late March–early April, Impact) and Motor Expo (late Nov–mid Dec) are when the biggest packages and lowest finance rates appear; in the last week of a month/quarter dealers chase targets.

### 2.7 Worked example — Toyota Yaris Ativ Smart, ฿599,000, 1,197 cc, financed

```
retail (incl. all taxes)                599,000
DLT registration & plates                   620
annual tax year 1 (1,197 cc)              1,196   (0.5×600 + 1.5×597)
พ.ร.บ.                                      645
first-class insurance (often free yr 1)  14,000
dealer processing (typical)               2,500
-------------------------------------------------
drive-away (paying insurance yourself)  617,961   ≈ retail × 1.03
```
Same maths for a BYD Atto 3 Extended ฿769,900 (EV, 1,750 kg): 769,900 + 620 + 1,300 + 645 + 22,000 + 2,500 = **฿796,965** (≈ × 1.035). For a ฿1,239,000 Fortuner 2.4 (2,393 cc): + 620 + 4,472 + 645 + 20,000 + 3,500 = **฿1,268,237** (≈ × 1.024). Rule of thumb **on-road ≈ retail × 1.02–1.04**; if the dealer includes insurance, ≈ × 1.005–1.01.

### 2.8 Regions — nothing to put in a dropdown

Excise, VAT, duty, DLT fees, annual tax and พ.ร.บ. are **national**; Bangkok and every province pay the same. The only regional differences are: (a) pump prices — the quoted prices are Bangkok; provinces add ฿0.30–1.60/L transport surcharge (Chiang Mai/Chiang Rai and the far South cost most, EEC/Chon Buri ≈ Bangkok); (b) insurers price by garage zone, ±5 %; (c) MEA (Bangkok, Nonthaburi, Samut Prakan) vs PEA (rest of country) charge the same tariff schedule. **Recommendation: no region dropdown for Thailand. Instead add "Purchase type: cash / finance"** — cash buyers get ฿10,000–40,000 extra off but rarely the free insurance; financed buyers get subsidised interest (0–2.99 %) and the freebies, but must carry first-class insurance every year of the loan. Optionally a "Registered as" toggle for double-cab pickups (truck รย.3 ≈ ฿1,350/yr vs passenger รย.1 ≈ ฿4,500/yr).

## 3. EV / hybrid incentives in force (September 2026)

- **EV3.5 purchase subsidy (2024–2027, paid to the enrolled brand and already netted in the sticker):** BEV passenger cars priced ≤ ฿2,000,000: **฿50,000** per car in 2026–27 for battery ≥ 50 kWh, **฿25,000** for 10 to < 50 kWh (was 100,000/50,000 in 2024, 75,000/35,000 in 2025). BEV pickups ≤ ฿2 m with ≥ 50 kWh: ฿100,000 (locally built only). Electric motorcycles ≤ ฿150,000: ฿10,000. Cars ฿2–7 m: no cash subsidy but the 2 % excise applies. No buyer-side conditions (no resale lock); the brand must build 2 cars locally for every CBU imported in 2026 and 3-for-1 in 2027, or repay. Enrolled brands include BYD, MG/SAIC, GWM (ORA), Neta, Changan/Deepal, GAC Aion, Geely, Chery (Omoda&Jaecoo), Xpeng, Zeekr, Leapmotor, Wuling, Juneyao and Toyota (Travo-e); **Tesla, Hyundai, Kia, Mazda 6e, the European brands and Honda e:N1 are outside it** and pay 10 % (imports) or the 2 % local rate. Scheme expires **31 Dec 2027**.
- **BEV excise 2 %** (EV3.5 or compliant local build) vs 10 % — see 2.1; the 30 % tier for non-investing importers is approved in principle (10 Sep 2026) but not yet law.
- **Annual tax:** no EV discount in force (expired 10 Nov 2025); 80 % cut for BEV and for HEV/PHEV drafted, pending.
- **PHEV:** 5 % excise if ≥ 80 km electric range (Seal 5/Sealion 5/6, HS, Jaecoo 7, Tiggo 8 CSH, Shark 6, Hunter K50, Geely EM-R, all German PHEVs assembled locally); no cash subsidy.
- **HEV:** 6 % / 9 % excise (Ativ HEV, City/Civic/Accord e:HEV, Corolla Cross, Yaris Cross, Xpander/Xforce HEV, Kicks e-Power, MG3 Hybrid+, Jolion/H6 HEV, ORA 5 HEV); no cash subsidy, no annual-tax cut.
- **Charging:** home-charger installation carries no subsidy; MEA/PEA install a second EV meter on the TOU tariff (see 5). Public DC charging ฿6.5–9.5/kWh.
- Old-car-for-new trade-in scheme (2025–26 proposal): **shelved June 2026**; a ~฿200 bn "clean vehicle" successor fund is announced but has no rules yet.

## 4. Dealer discount climate (Sept 2026)

Market is soft (2026 total market ≈ 600k units, down from 2023; consumer loans tight, ~30–40 % of finance applications rejected) except for EVs (55 % xEV share Jan–Jul 2026, BEV registrations +88 % YoY).

| Segment | Typical off-list (cash equivalent) |
|---|---|
| **hot** (Hilux Travo, Land Cruiser FJ, GR Yaris, Jimny, Alphard/Vellfire, LM, CLA Electric, Bentley/Lamborghini/Ferrari allocations) | 0 %; you get film/mats and a waiting list |
| **steady** Japanese mainstream (Ativ, City, Corolla Cross, HR-V, Fortuner, D-Max, MU-X, Xpander, Almera, CX-5) | 1–3 % cash or ฿15,000–40,000 in freebies + 0.99–2.99 % finance; Motor Show packages worth 4–6 % |
| **steady** European luxury (BMW/Mercedes/Volvo local assembly) | 5–10 % via "campaign price" and free insurance/service; year-end 10–15 % on stock |
| **deals** — run-outs (Hilux Revo, Pajero Sport, Navara, Terra, Swift, Mirage, MG5/VS, Good Cat) | 8–15 % or ฿50,000–150,000 |
| **deals** — Chinese EV price war (BYD, MG, GWM, Neta, Deepal, Aion, Zeekr, Leapmotor, Jaecoo) | list prices already cut 10–25 % since 2024; on top: ฿20,000–100,000 "special price", free wall-box, 0–1.98 % finance; expect the sticker in the row to be beaten by 5–10 % |
| Tesla | fixed price; monthly "referral"/wall-box promos worth ฿20,000–35,000, 1.49 % finance |

## 5. Running-cost inputs (29 September 2026)

**Pump prices, Bangkok, PTT/Bangchak (฿/litre):** Gasohol 95 **39.94**; Gasohol 91 **39.57**; E20 **34.94**; E85 **30.88**; Premium Gasohol 95 47.79; Diesel B7 **41.44**; Diesel B20 36.44; Premium diesel 50.05. Notes: nearly every petrol car in the file runs on E20 (the default "Petrol" price to use is **E20 34.94**); E85 is viable only for cars flagged E85 in the note (Mazda 3, Civic older gens, some MG/Ford) and returns ~20 % worse km/L; diesel B7 is the default for every diesel; B20 is sold at fewer stations and mainly for fleets. The state Oil Fund and excise cuts that capped diesel at ฿33 in 2023–25 have been unwound, hence diesel now above gasohol. Provinces add ฿0.30–1.60/L.

**Electricity:** residential tariff (MEA and PEA identical) for the Sept–Dec 2026 billing cycle averages **฿3.95/kWh incl. Ft (Ft = 16.23 satang) before 7 % VAT**; the 2026 tariff reform bills the first 200 units at ≤ ฿3.00/kWh, so a household that adds 250–350 kWh/month of EV charging pays the top block, ≈ **฿4.2–4.4/kWh incl. VAT**. EV owners can register a second TOU meter: on-peak (Mon–Fri 09:00–22:00) ฿5.7982/kWh, **off-peak (22:00–09:00 weekdays, all day weekends and holidays) ฿2.6369/kWh**, plus Ft and VAT and a ฿24.62/month service charge → **≈ ฿3.0/kWh for overnight charging**. Public DC fast charging: PTT EV Station PluZ, EleX by EGAT, EA Anywhere, Shell Recharge ฿6.5–9.5/kWh (off-peak ~฿5.5). Suggested app default: home ฿4.2/kWh, or ฿3.0 with TOU.

**Annual distance:** Bangkok commuters 12,000–15,000 km; national average for private cars ≈ **15,000–18,000 km**; pickups/upcountry and ride-hailing 20,000–30,000 km. Suggested default 15,000 km (EV owners average ~18,000).

**Financing (hire-purchase, เช่าซื้อ):** quoted as a **flat rate** (ดอกเบี้ยคงที่) on the amount financed; typical **2.29–3.99 % flat p.a.** for new cars from captives/banks (Krungsri Auto, TTB Drive, Kasikorn Leasing, Toyota Leasing, Honda Leasing, BYD/MG captive), promotional **0–1.99 %** with 20–30 % down and 48–60 months, pickups and PPVs commonly **72–84 months** and Toyota/Isuzu captives up to **96 months**; down payment **0–25 %** (ฟรีดาวน์ = 0 % down, at a higher rate and usually only with first-class insurance and a guarantor). Legal cap since 2023 (OCPB): effective rate **≤ 10 % p.a. for new cars**, 15 % used, 23 % motorcycles; contracts must show the effective rate. Conversion: `monthly = principal × (1 + flat × years) / months`; the true (effective) rate ≈ flat × 1.8–1.95 (3 % flat over 60 months ≈ 5.6 % effective; 2 % flat / 84 months ≈ 3.8 %). Balloon/"Smart Choice" schemes (Toyota, Mercedes, BMW) leave 30–40 % as a final payment. Approval usually requires income ≥ 2–2.5× the instalment; rejection rates in 2025–26 are historically high, which is why dealers push higher down payments.

## 6. Glossary for first-time buyers

- **ราคาป้าย / ราคาขายปลีกแนะนำ (list price):** the brand's published retail price; already includes excise, interior tax and VAT — the number in `data/cars_th.json`.
- **ภาษีสรรพสามิต (excise tax):** the big hidden tax, 2–50 % of the pre-VAT price depending on CO2 and technology; set by the Excise Department, paid by the factory or importer.
- **ภาษีเพื่อมหาดไทย (interior/municipal tax):** an automatic 10 % surcharge on the excise amount, also inside the price.
- **CBU / CKD:** completely built-up import (pays duty up to 80 %) versus a car assembled in Thailand from kits (no duty); the note says "CBU" or "Thai-built".
- **Eco Sticker:** the government fuel-economy label (km/L, CO2 g/km, emission standard) every new car must carry; source of the efficiency columns.
- **PPV (pickup passenger vehicle):** 7-seat SUV on a pickup chassis (Fortuner, MU-X, Everest, Pajero Sport, Terra); taxed at 18–25 %, i.e. more than a pickup but less than a normal SUV.
- **EV3.5:** the 2024–27 government EV package — 2 % excise plus a ฿25,000–50,000 subsidy per car, already deducted from the sticker of participating brands.
- **ป้ายแดง (red plate):** temporary dealer plate used for up to 30 days until your white plate arrives; the DLT registers the car in your name.
- **ต่อภาษี / ภาษีรถประจำปี (annual tax):** the yearly road tax sticker from the DLT, ฿900–7,000 by engine size (weight for pickups and EVs), renewable at any DLT office, Drive Thru or online.
- **พ.ร.บ. (por-ror-bor):** compulsory third-party injury insurance, ฿645 for a car, sold with the annual tax — separate from voluntary insurance.
- **ประกันชั้น 1 / 2+ / 3+:** first-class (comprehensive), 2+ and 3+ (collision-with-vehicle only) voluntary insurance; banks require ชั้น 1 while you owe money.
- **ดาวน์ / ฟรีดาวน์ / ผ่อน:** down payment / zero-down deal / instalment; Thai loans are hire-purchase, the finance company owns the car until the last instalment.
- **ดอกเบี้ยคงที่ vs อัตราดอกเบี้ยที่แท้จริง:** flat rate quoted in adverts versus the effective (true) rate, which is about 1.8–1.9 times higher.
- **ของแถม (freebies):** the dealer extras that replace cash discounts — film, insurance, mats, wall-box, accessory vouchers; always ask for their cash value.
- **มอเตอร์โชว์ / มอเตอร์เอ็กซ์โป:** the Bangkok International Motor Show (March–April) and Motor Expo (December) where launch prices and the year's best finance deals appear.

## 7. Sources

- Excise structure 2026: https://autolifethailand.tv/new-vehicle-excise-tax-2569/ ; https://www.thaiautonews.net/thailand-introduce-new-co2-based-auto-tax-structure/ ; https://www.superbikemag.com/excise-tax-thailand-2026-update/ ; https://www.motorexpo.co.th/news/5100 ; https://today.line.me/th/v3/article/Ya5MDVj ; https://mgronline.com/motoring/detail/9690000000389 ; https://thethaiger.com/news/national/thailand-charges-up-new-car-tax-for-ev-shift-by-2026 ; https://www.excise.go.th/cs/groups/public/documents/document/mjaw/mti1/~edisp/webportal16200125738.pdf (2016 baseline) ; https://ratchakitcha.soc.go.th/documents/17219506.pdf (BEV pickup conditions)
- EV3.5: https://www.boi.go.th/un/boi_event_detail?module=news&topic_id=134859&language=th ; https://www.ey.com/en_gl/technical/tax-alerts/thailand---subsidies--duties--excise-tax-incentives-to-encourage ; https://lexbangkok.com/thailand-ev-incentives-2026/ ; https://www.thansettakij.com/motor/661059
- Sept 2026 BEV excise restructuring: https://www.nationthailand.com/news/policy/40070889 ; https://www.thestorythailand.com/en/thailand-ev-tax-restructuring/ ; https://www.kaohooninternational.com/economics/590550 ; https://www.kaohooninternational.com/economics/590895 ; https://www.just-auto.com/news/thailand-30-excise-tax-imported-evs/ ; https://www.posttoday.com/business/748480 ; https://thereporter.asia/2026/09/ev-board-excise-tax-restructure/ ; https://asianews.network/chinese-and-japanese-carmakers-adjust-strategies-as-thailand-targets-new-excise-rules-in-september/
- Annual tax, EV discount, registration: https://nexenthailand.com/ev-car-tax/ ; https://www.motorist.co.th/article/5367/car-tax-renewal-2026-rates-steps-and-how-to-renew-online-to-save-time ; https://www.car250.com/bev-hev-phev-new-2026.html ; https://www.thansettakij.com/economy/660617 ; https://www.thansettakij.com/economy/657576 ; https://www.nationthailand.com/business/automobile/40065519 ; https://www.pptvhd36.com/automotive/news/184670 ; https://www.ttbbank.com/th/fin-tips/detail/new-car-registration-in-thailand ; https://www.gpautoparts.co.th/red-license-plate-thailand-2568/
- Insurance: https://www.amarintv.com/automotive/howto/542780 ; https://www.prakanev.com/th/price-list-2025 ; https://www.silkspan.com/article/insurance/summary-price-ev-car-insurance/
- Fuel and electricity: https://www.pptvhd36.com/wealth/economic/284250 ; https://spacebar.th/business/electricity-ft-395-baht ; https://www.pea.co.th/our-services/tariff/ft-statistics
- Financing: https://www.ttbbank.com/th/fin-tips/detail/interest-rates-new-cars-updated
- Prices (brand sites and portals, Sept 2026): https://www.car250.com/toyota-2026-price-th-fj-08.html ; https://autolifethailand.tv/offcial-price-toyota-yaris-ativ-my2026/ ; https://www.car250.com/new-toyota-yaris-ativ-hev-2026.html ; https://www.9carthai.com/new-toyota-travo-price/ ; https://autolifethailand.tv/official-price-toyota-hilux-travo-e-ev-bev-thailand/ ; https://www.9carthai.com/all-new-toyota-fortuner-price/ ; https://autolifethailand.tv/official-price-toyota-land-cruiser-fj-thailand/ ; https://www.car250.com/toyota-bz4x-my2026-04.html ; https://www.toyota.co.th/model/camry ; https://www.headlightmag.com/official-price-honda-city-big-minorchange-2026/ ; https://www.honda.co.th/city ; https://www.honda.co.th/en/civic ; https://www.honda.co.th/en/crv ; https://www.honda.co.th/en/hrv ; https://www.honda.co.th/en/brv ; https://www.honda.co.th/en/wrv ; https://www.honda.co.th/en/en1 ; https://www.honda.co.th/en/news/honda-remains-price-promotion ; https://www.car250.com/isuzu-d-max-2026.html ; https://www.9carthai.com/all-new-isuzu-mu-x-price/ ; https://www.isuzu-tis.com/ ; https://www.9carthai.com/mitsubishi-price/ ; https://www.9carthai.com/all-new-mitsubishi-xpander-price/ ; https://www.mitsubishi-motors.co.th/th ; https://www.9carthai.com/all-new-nissan-almera-price/ ; https://www.9carthai.com/all-new-nissan-navara-price/ ; https://www.9carthai.com/new-nissan-kicks-price/ ; https://www.nissan.co.th/vehicles/new-vehicles/kicks.html ; https://www.9carthai.com/mazda-price/ ; https://www.9carthai.com/new-mazda-3-price/ ; https://www.mazda.co.th/ ; https://www.9carthai.com/suzuki-price/ ; https://www.suzuki.co.th/ ; https://www.suzuki.co.th/news/articles/news-238 ; https://www.ford.co.th/showroom/ ; https://www.9carthai.com/ford-price/ ; https://www.9carthai.com/byd-price/ ; https://www.9carthai.com/new-byd-atto-1-price/ ; https://www.9carthai.com/new-byd-dolphin-price/ ; https://www.9carthai.com/new-byd-atto-2-price/ ; https://www.9carthai.com/new-byd-seal-6-price/ ; https://www.9carthai.com/new-byd-sealion-5-price/ ; https://www.9carthai.com/new-byd-sealion-6-price/ ; https://www.checkraka.com/car/byd/ ; https://www.checkraka.com/car/denza/ ; https://www.9carthai.com/mg-price/ ; https://www.mgcars.com/th ; https://www.9carthai.com/gwm-price/ ; https://www.gwm.co.th/ ; https://autolifethailand.tv/gwm-ora-5-suv-ev-hev-hybrid-thailand-spec-motor-show-2026/ ; https://www.checkraka.com/car/gwm-haval/ ; https://www.checkraka.com/car/gwm-ora/ ; https://www.checkraka.com/car/gwm-tank/ ; https://www.checkraka.com/car/gwm-poer/ ; https://www.checkraka.com/car/deepal/ ; https://www.checkraka.com/car/changan/ ; https://www.car250.com/nevo-q05-new-2026-28.html ; https://www.checkraka.com/car/neta/ ; https://www.checkraka.com/car/aion/ ; https://www.checkraka.com/car/xpeng/ ; https://www.checkraka.com/car/zeekr/ ; https://www.checkraka.com/car/omoda/ ; https://www.checkraka.com/car/jaecoo/ ; https://www.checkraka.com/car/geely/ ; https://www.checkraka.com/car/leapmotor/ ; https://www.checkraka.com/car/wuling/ ; https://www.checkraka.com/car/chery/ ; https://www.checkraka.com/car/chery/v23/ ; https://www.checkraka.com/car/chery/q/ ; https://www.checkraka.com/car/juneyao/ ; https://www.hyundai.com/th/th/find-a-car ; https://www.kia.com/th/main.html ; https://www.checkraka.com/car/kia/ ; https://www.checkraka.com/car/subaru/ ; https://www.checkraka.com/car/peugeot/ ; https://www.checkraka.com/car/tesla/ ; https://mgronline.com/motoring/detail/9690000002333 ; https://www.tesla.com/th_th/modely ; https://www.checkraka.com/car/bmw/ ; https://www.checkraka.com/car/mercedes-benz/ ; https://today.line.me/th/v3/article/1DMYln9 ; https://www.checkraka.com/car/audi/ ; https://www.checkraka.com/car/volvo/ ; https://www.checkraka.com/car/lexus/ ; https://www.checkraka.com/car/porsche/ ; https://www.checkraka.com/car/land-rover/ ; https://www.checkraka.com/car/mini/ ; https://www.car250.com/2569-2026-th-news-09.html ; https://www.car250.com/wuling-eksion-560-th.html
