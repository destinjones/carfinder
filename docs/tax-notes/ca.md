# Canada (ca) — on-road math and market notes, late September 2026

Currency CAD ($). Prices in `data/cars_ca.json` are integer dollars, the **manufacturer's suggested retail price (MSRP / PDSF) as published on the brand's Canadian site** for the cheapest and dearest trim of each nameplate (options and paint excluded). Canadian MSRPs are quoted **before** freight & PDI, the $100 air-conditioner excise tax, the federal green levy, tire/environmental fees, dealer fees, the federal luxury tax and all sales taxes. They are NOT the "as shown", "starting at (all-in)" or "selling price" figures that Ontario/Quebec/BC/Alberta/Manitoba/Saskatchewan dealers must advertise (those add freight & PDI plus every fee, see 2.1). Where a brand only publishes all-in prices (Genesis, Tesla's "purchase price", some dealer sites) the MSRP was backed out and the row is flagged `est=1`. Efficiency columns: NRCan (Natural Resources Canada) 5-cycle combined L/100 km for the most efficient common variant and NRCan CO2 g/km for the variant behind price_min (gasoline ≈ 23.3 g/km per L/100 km, diesel ≈ 26.6); EV range is the NRCan (EPA-method) rating in km. Model year: 2026 for most rows, 2027 where the brand had already switched by 29 Sept 2026 (Toyota Corolla/Crown/bZ/C-HR/GR86/Prius, Kia EV5/Telluride, Chevrolet Bolt), 2025 leftovers only for discontinued models (Ford Escape, F-150 Lightning, VW ID.4/ID. Buzz, Jaguar F-Pace).

## 1. What the MSRP already includes

Nothing except the car and the manufacturer's margin. Unlike the UK/EU there is no tax inside the sticker, and unlike Australia the luxury tax is added at the till. Two federal levies that manufacturers often print on the window sticker (A/C tax, green levy) are still *outside* the MSRP. So:

```
pre-tax price = MSRP + freight&PDI + $100 A/C tax + green levy (if any) + tire fee + dealer admin fee + regulator fee (ON $22, AB $6.25)
              + options/accessories + federal luxury tax (if pre-tax price > $100,000)
drive-away   = pre-tax price × (1 + GST/HST + PST/QST rate for the province) + registration/plates (+ insurance down payment)
```
Rule of thumb: **drive-away ≈ MSRP × 1.16–1.22** in HST provinces (ON 13 %, Atlantic 14–15 %), **× 1.21–1.24** in Quebec (14.975 %) and BC (12 %+), **× 1.11** in Alberta and the territories (GST only). The freight & PDI charge alone adds 4–8 % to a $30k car.

Business buyers (GST/HST registrants) recover the GST/HST (capped at the $38,000 + tax capital-cost limit for passenger vehicles in 2026) — irrelevant to private buyers. Trade-ins reduce the taxable amount in every province except that in Quebec the QST/GST credit applies too (trade-in value is deducted before tax everywhere; this is worth 5–15 % of the trade-in value).

## 2. From MSRP to drive-away

### 2.1 Freight & PDI ("destination", "transport et préparation") — 2026 figures

A non-negotiable manufacturer charge for shipping and pre-delivery inspection; it is identical at every dealer of a brand and is taxed like the car. Figures verified on brand/dealer sites in Sept 2026 are marked ✓; the rest are the current brand norms.

| Brand | Freight & PDI (CAD) |
|---|---|
| Toyota | $1,930 Corolla/Camry/Prius/GR86 ✓, $2,030 RAV4/Corolla Cross/Highlander/Sienna, $2,130 Tundra/Sequoia/4Runner |
| Lexus | $2,205 (UX/NX/ES/IS) – $2,305 (RX/TX/GX/LX) |
| Honda | $1,930 Civic/Accord/Prelude ✓, $2,000 Prologue ✓, $2,100 HR-V/CR-V ✓, $2,225 Pilot/Passport/Odyssey/Ridgeline |
| Acura | $2,725 (Integra/ADX) – $2,825 (RDX/MDX) |
| Nissan | $1,850 Sentra ✓, $2,030 Kicks/Pathfinder/Frontier ✓, $2,080 Rogue ✓, $2,095 Leaf/Rogue PHEV ✓, $2,200 Armada ✓; Ariya/Murano $2,095–2,395 |
| Infiniti | $2,395 |
| Hyundai | $2,000 Venue/Elantra/Kona/Tucson, $2,100 Santa Fe/Palisade ✓/Ioniq 5, $2,150 Ioniq 9 (Hyundai calls it "delivery & destination", includes a full tank) |
| Kia | $2,050 K4/Seltos/Niro, $2,150 Sportage/EV4, $2,250 Sorento/EV5/EV6, $2,350 Carnival/Telluride/EV9 |
| Genesis | $0 — Genesis publishes all-in prices with freight, PDI and 5 years of service included |
| Mazda | $2,095 Mazda3/CX-30/MX-5, $2,195 CX-5, $2,350 CX-70/CX-90 |
| Subaru | $2,395 Impreza/Crosstrek/BRZ/WRX, $2,495 Forester, $2,595 Outback/Solterra/Trailseeker/Uncharted |
| Mitsubishi | $2,100 RVR/Eclipse Cross, $2,350 Outlander/Outlander PHEV |
| Ford | $2,195 Maverick/Bronco Sport/Mach-E, $2,395 Mustang/Explorer/Ranger/Bronco, $2,595 F-150/Expedition/Super Duty |
| Lincoln | $2,650 Corsair/Nautilus, $2,795 Aviator/Navigator |
| Chevrolet / GMC / Buick | $2,200 Trax/Trailblazer/Envista/Encore GX/Equinox/Terrain, $2,400 Blazer/Traverse/Acadia/Enclave/Equinox EV, $2,600 Silverado/Sierra/Tahoe/Yukon/Colorado/Canyon |
| Cadillac | $2,600 Optiq/XT5/CT5, $2,900 Lyriq/Vistiq/Escalade |
| Jeep / Dodge / Chrysler / Ram | $2,095 Compass/Cherokee, $2,295 Wrangler/Gladiator/Pacifica/Charger, $2,495 Grand Cherokee/Durango/Ram 1500, $2,795 Grand Wagoneer/Ram HD |
| Volkswagen | $2,100 Jetta/Golf, $2,300 Taos/Tiguan, $2,500 Atlas/ID.4/ID. Buzz |
| Audi | $3,050 (A3/Q3) – $3,250 (Q5 and up) |
| BMW / MINI | $2,995 all models |
| Mercedes-Benz | $3,250 (CLA/GLA/GLB/C/GLC) – $3,500 (E/GLE) – $4,000 (S/GLS/G) |
| Volvo / Polestar | $2,850 (EX30/XC40) – $3,000 (XC90/EX90); Polestar $2,500 |
| Porsche | $2,250 (Macan/Cayenne) – $2,500 (911/Taycan/Panamera) |
| Land Rover / Jaguar | $2,300 (Evoque/Discovery Sport) – $2,800 (Range Rover) |
| Alfa Romeo / Maserati / Fiat | $2,295 Tonale/Stelvio/500e; Maserati $3,000 |
| Tesla | $2,500 destination ✓ + $250 non-refundable order fee ✓ (Tesla also lists a "purchase price" that already includes both) |
| Rivian / Lucid | $2,650 / $2,500 (delivery), ordered online |

### 2.2 Federal levies added to every sale

- **Air-conditioner excise tax: $100** on every vehicle with A/C (Excise Tax Act). Shown as a separate line, taxed with GST/HST/PST.
- **Green levy (excise tax on fuel-inefficient vehicles):** based on the NRCan *weighted* rating (55 % city / 45 % highway) of **automobiles** — cars, station wagons, vans and SUVs with < 10 seats. **Pickup trucks, ambulances, hearses and 10+ seat vans are exempt.** Brackets: 13.0–13.99 L/100 km **$1,000**; 14.0–14.99 **$2,000**; 15.0–15.99 **$3,000**; 16.0 and above **$4,000**. Paid by the importer and passed through as "Federal Green Levy" (e.g. Escalade-V, Durango Hellcat, Wrangler 392, AMG G 63, Range Rover V8, Lamborghini Urus). Formula: `levy = w<13 ? 0 : w<14 ? 1000 : w<15 ? 2000 : w<16 ? 3000 : 4000` where w = weighted L/100 km (≈ 0.55 × city + 0.45 × hwy; combined figures in the dataset run about 3–5 % below the weighted number, so treat combined ≥ 12.5 as a warning).
- **Select Luxury Items Tax (federal "luxury tax", since 1 Sept 2022):** on new vehicles (< 10 seats, GVWR ≤ 3,856 kg, so most HD pickups and vans are exempt, as are motorhomes, ambulances, race cars and vehicles previously registered) whose **taxable amount — MSRP + freight + options + accessories + dealer-installed extras, before GST/HST — exceeds $100,000**. Tax = **the lesser of 10 % of the whole taxable amount and 20 % of the amount above $100,000**, i.e. `lux = price<=100000 ? 0 : min(0.10*price, 0.20*(price-100000))`; the 10 % cap only wins above $200,000. GST/HST (and QST/PST) are then charged **on top of** the luxury tax. Example: $130,000 Range Rover Sport → luxury tax $6,000; in Ontario HST 13 % on $136,000 = $17,680; $250,000 Bentley → $25,000 (10 % cap). Budget 2025 (4 Nov 2025) repealed the luxury tax on **aircraft and boats** but **kept it on vehicles**; nothing changed for 2026. Charged by the seller at delivery, not inside the MSRP.
- **Tariffs are inside the MSRP, not a line item.** Since 9 April 2025 Canada applies a **25 % surtax on US-assembled vehicles** (full value if not CUSMA-compliant; on the non-Canadian/Mexican content if CUSMA-compliant). A **remission framework** (renewed 9 April 2026 – 8 April 2027) waives it for automakers that keep Canadian production and investment (Ford, GM, Stellantis, Toyota, Honda; GM's and Stellantis's quotas were cut in Oct 2025 after CAMI and Brampton pauses). Brands **without Canadian plants get no remission** — Tesla, Rivian, Lucid, Subaru, Mazda, Nissan, Hyundai/Kia, VW, BMW, Mercedes, Volvo, Polestar — so they re-sourced (Tesla Model Y from Berlin, Model 3 from Shanghai, Santa Fe from Korea, Outback from Japan, Volvo EX30 from Belgium), dropped models (Subaru Ascent/Wilderness, Mazda CX-50, Lincoln Nautilus Hybrid for a year) or priced the tariff in (Rivian, Tesla Model S/X/Cybertruck, BMW X3/X5/X7, Mercedes GLE/GLS/EQ SUVs, Volvo EX90, Hyundai Ioniq 9, Kia EV9, VW Atlas/ID.4). US-built share of Canadian sales fell from 35.4 % (H1 2025) to 28.4 % (H1 2026); brands with no Canadian plant went from 17.7 % to 4.9 % US-sourced. **Chinese-built EVs:** the 100 % surtax was replaced on 1 March 2026 by the normal **6.1 % MFN duty inside an annual quota of 49,000 vehicles** (24,500 per half-year, first-come); above the quota the 100 % surtax still applies. That is why the Shanghai-built Tesla Model 3 Premium RWD sells for $39,490, Polestar 2 and Lincoln Nautilus are back, and BYD is opening ~20 Canadian stores in late 2026 (no BYD pricing yet as of 29 Sept 2026). Chinese-built vehicles are **not eligible** for the federal EV rebate. On 8 Sept 2026 Canada added 15–50 % surtaxes on $27.6 bn of other US goods (steel, appliances, food); vehicles unchanged. The US side charges 25 % (s.232) on Canadian-built cars and has threatened to double it on 1 Jan 2027 — the reason Canadian-built RAV4/Civic/CR-V/Lexus RX/Pacifica/Charger/Silverado production is being redirected to the domestic market and why DesRosiers expects softer Q4 sales.

### 2.3 Provincial and dealer fees on the bill of sale

| Item | Typical 2026 amount | Notes |
|---|---|---|
| Dealer administration / documentation fee | **$199–$999** (ON median ~$599, BC/AB $499–$895, QC $0–$500, Atlantic $299–$799) | Negotiable in theory; must be *inside* the advertised all-in price in ON (OMVIC), QC (OPC), BC (VSA), AB (AMVIC), MB and SK. Luxury dealers charge up to $1,500. |
| Regulator transaction fee | ON **OMVIC $22** (since 1 Sept 2025); AB **AMVIC levy $6.25**; QC none | Pass-through, non-negotiable. |
| Tire stewardship / environmental fee | **$3–$6 per tire, $15–$30 per car** (ON ~$4.50–$5, QC $4.50, BC $5–6, AB $4, SK $4.25, MB $2.80, NB/NS/PEI $4.50, NL $3) | Some dealers add a $25–$60 "environmental" or "green" charge on top — refuse it in all-in provinces. |
| Nitrogen, etching, anti-theft, "protection packages" | $199–$1,500 | Pure dealer profit; walk away. Not legal to add after the advertised all-in price in ON/QC/BC/AB. |
| New plates / permit (first registration) | see 2.5 | Charged by the registry, collected by the dealer. |

### 2.4 Sales tax by province (rates in force Sept 2026) — applied to the pre-tax price incl. freight, fees and luxury tax

| Region | Tax on a new car from a dealer | Private used sale | EV / hybrid treatment |
|---|---|---|---|
| **Ontario** | **HST 13 %** | 13 % RST on the greater of price and Canadian Red Book value | none |
| **Quebec** | **GST 5 % + QST 9.975 % = 14.975 %** (QST is on the price *without* GST, so simply add) | 9.975 % QST on the greater of price and 95 % of the Guide d'évaluation value (+ GST only from a dealer) | none on the sale; Roulez vert rebate paid after (see 3) |
| **British Columbia** | **GST 5 % + PST by price band (dealer sale): < $55,000 → 7 %; $55,000–55,999.99 → 8 %; $56,000–56,999.99 → 9 %; $57,000–124,999.99 → 10 %; $125,000–149,999.99 → 15 %; $150,000+ → 20 %** (rate applies to the *whole* price, so $57,000 costs $1,710 more PST than $56,999). **Zero-emission vehicles (BEV/PHEV/FCEV): every threshold is $20,000 higher** (7 % < $75,000, 8 % $75–76k, 9 % $76–77k, 10 % $77k–125k, 15 % $125–150k, 20 % $150k+). Bulletin PST 308 rev. Aug 2026. | **12 % PST** flat on a private sale (through ICBC), on the greater of price and Canadian Black Book value, plus the 15 %/20 % luxury tiers above $125k/$150k | the PST exemption on *used* ZEVs ended 30 Apr 2025; new ZEVs only get the raised thresholds |
| **Alberta** | **GST 5 % only** (no PST) | no tax on private sales | none |
| **Saskatchewan** | **GST 5 % + PST 6 % = 11 %** | 6 % PST on the greater of price and Red Book value (exempt if < $5,000 or from a family member) | none |
| **Manitoba** | **GST 5 % + RST 7 % = 12 %** | 7 % RST on the greater of price and Red Book value | none |
| **Nova Scotia** | **HST 14 %** (cut from 15 % on 1 Apr 2025) | 14 % on the greater of price and Red Book value | none (rebate ended Apr 2025) |
| **New Brunswick** | **HST 15 %** | 15 % Provincial Vehicle Tax on the greater of price and Red Book value | none (rebate ended Jul 2025) |
| **Prince Edward Island** | **HST 15 %** | 15 % | provincial rebate (see 3) |
| **Newfoundland & Labrador** | **HST 15 %** | 15 % Retail Sales Tax on the greater of price and Red Book value | rebate ended Mar 2026 |
| **Yukon / NWT / Nunavut** | **GST 5 % only** | none | Yukon/NWT rebates (see 3) |

Programmer formulas (p = pre-tax price incl. freight, fees, luxury tax; zev = BEV/PHEV/FCEV):
```
ON: tax = 0.13*p          QC: tax = 0.05*p + 0.09975*p        AB/YT/NT/NU: tax = 0.05*p
SK: tax = 0.11*p          MB: tax = 0.12*p                     NS: tax = 0.14*p      NB/PE/NL: tax = 0.15*p
BC: t = zev ? 20000 : 0
    pst = p < 55000+t ? 0.07 : p < 56000+t ? 0.08 : p < 57000+t ? 0.09 : p < 125000 ? 0.10 : p < 150000 ? 0.15 : 0.20
    tax = (0.05 + pst) * p
```
Note the BC 15 %/20 % tiers start at $125,000/$150,000 for every vehicle (no ZEV uplift there). Private-sale rules matter only for used cars.

### 2.5 Registration, plates and compulsory insurance (first year)

Every province requires third-party liability (minimum $200,000; $50,000 in Quebec where SAAQ covers injuries) — private insurers in ON, AB, Atlantic Canada and the territories; public insurers in BC (ICBC), SK (SGI), MB (MPI) and, for injuries only, QC (SAAQ). Lenders and lessors demand collision + comprehensive too, so assume a full policy.

| Region | Registration / plate cost (12 months, private car) | Compulsory insurance | Typical full-coverage premium 2026 (35–50-yr-old, clean record, $40–50k car) |
|---|---|---|---|
| **Ontario** | New plates $59 + permit $32 one-time; **annual plate renewal is $0 for passenger cars and light trucks since Mar 2022** (still must be renewed online, free) | private, min $200k liability + accident benefits | **$2,100–2,600** (GTA $2,800–4,000; Ottawa/rest of ON $1,600–2,200). 2025 average premium $2,117, rising ~7 % a year |
| **Quebec** | **SAAQ ~$217** (registration $140 + insurance contribution $72; $165 outside designated regions) **+ public-transit contribution $150 in the Montreal CMM / $30–60 in Quebec City, Gatineau, Sherbrooke, Trois-Rivières, Saguenay** + plates ~$20; **luxury surcharge 1 % of the vehicle's value above $40,000 every year for 7 years** (EVs/PHEVs exempt up to $75,000, fully electric exempt up to $125,000); EVs: extra annual fee of about $125 planned from 2027 | SAAQ injury coverage inside the registration; private policy for property damage/liability | **$750–1,000** (2025 average $1,067 all-in with SAAQ; Montreal $1,100–1,400) — cheapest in Canada |
| **British Columbia** | ICBC registration/licence fee $18 + plates $18 (one-time) + **ICBC Basic Autoplan** (mandatory, sold with the plate) | ICBC Basic $200k liability + Enhanced Care; average basic ≈ $1,400 | **$1,900–2,300** basic + optional (Metro Vancouver $2,200–2,800); ICBC rates frozen through 2026 |
| **Alberta** | **$93** registration + plate (one-time) | private, min $200k | **$1,800–2,300** (2025 average $1,820; Calgary/Edmonton highest); "good driver" rate cap 7.5 % in 2026, Care-First no-fault system starts Jan 2027 |
| **Manitoba** | **$154** registration + **MPI Autopac Basic** (mandatory, ~$1,000–1,300 for a $40k car, includes $500k liability and collision with $750 deductible) | MPI Basic | **$1,300–1,700** basic + extension (2026/27 average projected $1,350) |
| **Saskatchewan** | **SGI registration incl. basic plate insurance ≈ $900–1,400** (rate depends on the car's claims record) | SGI Auto Fund basic $200k liability + $700 deductible | **$1,200–1,600** all-in with SGI package |
| **Nova Scotia** | **$~180 for 2 years** by weight (~$90/yr) | private, min $500k | **$1,300–1,600** (2024 average $1,302) |
| **New Brunswick** | **$~95–115/yr** by weight | private, min $200k | **$1,200–1,500** (2024 average $1,208) |
| **Newfoundland & Labrador** | **$180/yr** flat | private, min $200k | **$1,400–1,700** (2024 average $1,359) |
| **PEI** | **$~100–140/yr** by weight | private, min $200k | **$1,000–1,300** (2024 average $1,018) |
| **Territories** | YT $~80–100/yr, NT $~110/yr, NU $~100/yr | private, min $200k (NT/NU $200k; YT $200k) | **$1,200–1,900** (few insurers) |

Add roughly **$60–150** for the first-year emissions/safety inspection where required (none for new cars in ON, QC, BC, AB; NB/NS/PEI/NL sell new cars with a 2–3-year inspection sticker included).

### 2.6 Worked example — Toyota RAV4 LE AWD hybrid, MSRP $37,500 (freight & PDI $2,030, admin fee $599, tire fee $22)

| | Ontario (Toronto) | Quebec (Montreal) | British Columbia (Vancouver) | Alberta (Calgary) |
|---|---|---|---|---|
| MSRP | $37,500 | $37,500 | $37,500 | $37,500 |
| Freight & PDI + A/C tax + fees | $2,030 + $100 + $22 (OMVIC) + $22 + $599 = $2,773 | $2,030 + $100 + $18 + $599 = $2,747 | $2,030 + $100 + $22 + $599 = $2,751 | $2,030 + $100 + $6.25 + $16 + $599 = $2,751 |
| Pre-tax price | $40,273 | $40,247 | $40,251 | $40,251 |
| Sales tax | HST 13 % = $5,235 | GST $2,012 + QST $4,015 = $6,027 | GST $2,013 + PST 7 % $2,818 = $4,831 | GST 5 % = $2,013 |
| Registration/plates | $91 | $217 + $150 transit + $20 = $387 | $36 (+ ICBC Basic with the policy) | $93 |
| **Drive-away** | **$45,599** | **$46,661** | **$45,118** (+ ICBC ≈ $1,400) | **$42,357** |
| + first-year full insurance | ≈ $2,800 | ≈ $1,000 | ≈ $2,300 | ≈ $2,000 |

### 2.7 Regions for the dropdown (suggest 11)

Ontario (HST 13 %, free plate renewal, private insurance, dearest premiums) · Quebec (14.975 %, SAAQ + luxury 1 % surcharge, cheapest insurance, Roulez vert $2,000) · British Columbia (12 %+ with luxury PST tiers, ICBC public insurance, ZEV thresholds +$20k) · Alberta (GST only, private insurance, no incentives) · Manitoba (12 %, MPI public insurance) · Saskatchewan (11 %, SGI public insurance) · Nova Scotia (HST 14 %) · New Brunswick (HST 15 %) · Newfoundland & Labrador (HST 15 %, dearest fuel) · Prince Edward Island (HST 15 %, $4,000 provincial EV rebate) · Territories (GST 5 %, Yukon/NWT $5,000 EV rebates, highest fuel and insurance costs).

## 3. EV / hybrid incentives in force, September 2026

Federal — **Electric Vehicle Affordability Program (EVAP)**, launched 16 Feb 2026 to replace iZEV (which ran out of money in Jan 2025):
- **$5,000 for a battery-electric or hydrogen vehicle, $2,500 for a plug-in hybrid**, applied at the point of sale by the dealer (or Tesla/Rivian/Polestar online), on purchase or a lease of ≥ 12 months.
- Cap: **final transaction value ≤ $50,000** — MSRP + options + accessories + freight & PDI + dealer/admin fees, *before* taxes and rebates (extended warranties, winter tires, chargers and financing charges are excluded). A $1,300 tow hitch can push a $49,990 Model Y RWD over the line. **Vehicles assembled in Canada have no price cap** (Chrysler Pacifica PHEV and Dodge Charger Daytona from Windsor, Toyota RAV4 Plug-in Hybrid from Woodstock; Canadian-built CR-V/Civic/RX hybrids are not plug-ins, so nothing).
- Origin rule: made in Canada or in a country with a Canadian free-trade agreement — **Chinese-built vehicles are excluded regardless of price** (Shanghai Model 3, Polestar 2, Lincoln Nautilus, future BYD).
- **One rebate per person for the whole five-year program**; amounts step down to $4,000/$2,000 in 2027, $3,000/$1,500 in 2028–29 and $2,000/$1,000 in 2030. Budget of the program is a five-year federal commitment, no first-come funding cliff announced as of Sept 2026.
- Eligible examples under the cap: Kia EV4 (all trims), Kia EV5 Light/Wind FWD, Chevrolet Bolt, Equinox EV LT FWD, Nissan Leaf S+, Hyundai Kona Electric Preferred, Fiat 500e, Toyota C-HR SE and bZ XLE, Mustang Mach-E Select, Volvo EX30, Tesla Model Y RWD (Berlin-built), Subaru Uncharted FWD; PHEVs: Prius Plug-in, Tucson/Sportage/Sorento/Niro PHEV, Outlander PHEV ES, Escape PHEV leftovers, Pacifica PHEV (no cap).
- The federal EV Availability Standard (sales mandate) was **repealed on 5 Feb 2026**; no federal purchase penalty or road-user charge exists.

Provincial/territorial:
- **Quebec — Roulez vert:** 2026 amounts **$2,000 BEV/FCEV, $1,000 PHEV with ≥ 15 kWh battery, $500 PHEV 8–15 kWh, $1,000 used BEV**, MSRP cap $65,000 (base trim), stackable with EVAP; **the program ends 1 Jan 2027** (no rebate for vehicles registered after 31 Dec 2026). Quebec is also introducing an annual EV registration surcharge (~$125) from 2027 and keeps its EV exemption from the 1 % luxury registration fee up to $75,000.
- **British Columbia:** the passenger **CleanBC Go Electric rebate is gone** (paused May 2025, formally scrapped in 2026); only the fleet/commercial program (Class 2b–8, reopened 10 Aug 2026), BC Hydro home-charger rebates ($350) and the ZEV PST thresholds (+$20,000, section 2.4) remain. No PST exemption on new ZEVs.
- **Prince Edward Island:** **$4,000 BEV / $2,000 PHEV** (new or used, Tesla excluded), plus $1,000 for a Level 2 charger; stacks to $9,000 with EVAP.
- **Yukon:** **$5,000 BEV/PHEV** (up to $7,500 for some classes), $1,500 charger rebate; stacks with EVAP. **Northwest Territories:** $5,000 (Arctic Energy Alliance, funding pauses). **Nunavut:** none.
- **Nova Scotia** ($3,000, ended Apr 2025), **New Brunswick** ($5,000, ended Jul 2025), **Newfoundland & Labrador** ($2,500, ended 15 Mar 2026), **Manitoba** ($4,000, ended 31 Mar 2026): **no longer available.**
- **Ontario, Alberta, Saskatchewan:** no purchase rebates; Ontario utilities and Hydro-Québec/BC Hydro offer $350–$1,000 charger rebates. Ontario's Ultra-Low Overnight electricity plan (2.8 ¢/kWh 11 pm–7 am) is the best deal for home charging in the country.
- Employer/fleet: 100 % first-year capital-cost allowance (Class 54/55, $61,000 cap) for business EVs until end-2027 (phasing down).

## 4. Dealer discount climate, September 2026

Context: sales rose for a third straight month in August (168,000, +5.4 % YoY per DesRosiers) but DesRosiers expects September to be down on 2025 because of the escalating tariff war and an affordability squeeze (CPI ~3 % on fuel, Bank of Canada rate held at 2.25 % on 2 Sept). Gasoline is at $1.89/L and diesel a record $2.64/L after seven months of Strait of Hormuz closure, so hybrids and EVs are hot and V8 trucks/SUVs are soft. EVs plus hybrids are ~64 % of Toyota Canada's retail volume; the federal $5,000 rebate has made sub-$50k EVs the fastest-moving stock. Inventory is normal for most brands except Toyota/Lexus hybrids and Canadian-built RAV4.

| Segment / brand | Typical discount off MSRP | What it looks like in Sept 2026 |
|---|---|---|
| **Hot (0–2 %)**: Toyota RAV4 (all), Corolla (2027 inventory tight), Sienna, Grand Highlander, Tacoma, 4Runner, Land Cruiser, Prius; Lexus RX/GX/TX; Honda Prelude, CR-V Hybrid; Ford Maverick hybrid; Kia EV4/EV5, Telluride (2027 launch); Land Rover Defender/Range Rover; Porsche 911; Mercedes G; Tesla (fixed prices, but Model 3/Y were cut $5–10k in May) | 0 %, sometimes a deposit and a 2–6-month wait; dealers only trim the admin fee | Toyota Canada allocates by region; Quebec gets a third of the country's EV/PHEV supply |
| **Steady (2–5 %)**: Honda Civic/HR-V/Accord ($500–1,000 + 1.5–3.8 % rates), Hyundai/Kia gas models (0.99–3.99 % financing, $500–1,500 cash), Mazda3/CX-30/CX-5 ($500–1,000 + 1.99 %), Subaru ($500 + 0.99 %), Chevrolet Trax/Trailblazer/Equinox (0 % 36 mo), Ford Bronco/Bronco Sport/Ranger, BMW/Mercedes/Audi volume models (rate support, $2–5k on EVs), Volvo, Genesis (fixed prices) | $500–2,000 cash or a subsidised rate worth $1,500–3,000 | Quarter-end (end Sept, Dec) and model-year changeover (Sept–Nov) are the moments to push |
| **Deals (6–15 %)**: **Nissan** (Rogue $5,000 or 0 % 60 mo, Rogue PHEV $10,000 + $2,500 EVAP, Sentra $2,750, Kicks 0 %); **Mitsubishi** (Outlander PHEV $4,250 + EVAP); **Stellantis** — Jeep Compass/Grand Cherokee/Wrangler, Ram 1500 (0 % 84 mo), Dodge Durango/Charger, Chrysler Pacifica ($5,000–12,000 typical); **GM trucks and EVs** — Silverado/Sierra 0 % 84 mo, Equinox EV $5,000 cash, Blazer EV 0 % 60 mo, Cadillac Lyriq/Optiq/CT5/XT5 0 % 72–84 mo, Buick Envision 0 % 84 mo, Bolt $4,000 in the spring; **Ford** F-150 2.99 % 72 mo + $2–6k, Explorer, Escape/Lightning leftovers, Mach-E; **VW** everything at 0 % 60 mo + 3 years maintenance (Tiguan, Jetta, Taos, Atlas, ID.4/ID. Buzz leftovers); **Acura** ADX $4,000, RDX $5,000, MDX $3,000; **Toyota bZ $5,000 and C-HR $2,500 cash** on top of EVAP; **Mazda CX-70/CX-90** $1,500 + 0.99 %; Hyundai Ioniq 5/6/9 and Kia EV6/EV9/Niro EV ($3,000–8,000); Fiat 500e $8,000; luxury EV run-outs (Mercedes EQE/EQS $10–20k, Audi Q8 e-tron, BMW i-models, Polestar, Lucid, Rivian, Cadillac Escalade IQ); Jaguar F-Pace, Alfa Romeo, Infiniti QX60, Nissan Murano/Pathfinder, Lincoln Corsair/Aviator | 6–15 %, 20 %+ on aged EV stock; 0 % financing over 72–84 months is the Detroit-3 default | Manufacturer cash is usually "in lieu of" the subsidised rate — do the math both ways. Loyalty/conquest bonuses of $500–1,500 and 0.5–1 % rate cuts are common. |

Chinese-brand price pressure has not arrived yet (BYD stores open late 2026), but the Shanghai-built Tesla Model 3 at $39,490 and the $38,995 Kia EV4 have already forced Chevrolet, Nissan and Hyundai to discount sub-$50k EVs.

## 5. Running costs, September 2026

- **Gasoline (regular 87):** national average **$1.89/L** (29 Sept 2026, down from $1.91 the week before). Cities: Vancouver ~$1.92 (Metro Vancouver 18.5 ¢ TransLink tax; peaked at $1.89 in July), Toronto ~$1.80, Montreal ~$1.86, Calgary ~$1.68 (Alberta $1.68 is the cheapest province), Halifax ~$1.93, St. John's ~$2.20 (NL is dearest), Whitehorse ~$2.11. Premium 91 adds 20–25 ¢/L. The consumer carbon charge was abolished 1 Apr 2025, and the **federal excise tax (10 ¢/L gasoline, 4 ¢/L diesel) has been suspended since 20 Apr 2026, extended to 31 Jan 2027** (half rate Feb–Mar 2027) — budget for +10 ¢ when it returns.
- **Diesel:** **$2.64/L national average (record, 29 Sept 2026)**, ~60 % above pre-war levels; $2.45–2.90 by region. Diesel pickups and SUVs now cost more per km than gasoline hybrids.
- **Home electricity (residential, all-in per kWh):** Quebec **7.4–10.7 ¢** (Hydro-Québec Rate D, cheapest), Manitoba **~10 ¢**, BC **9.6 ¢ (Step 1) / 15.1 ¢ (Step 2)**, Ontario **7.6 ¢ off-peak / 12.2 mid / 18.2 ¢ on-peak, Ultra-Low Overnight 2.8 ¢** (11 pm–7 am), Alberta **12–18 ¢** (regulated/variable + delivery), Saskatchewan **15.8–17.1 ¢**, New Brunswick **13–15 ¢**, NL **12.9 ¢**, PEI **16.6 ¢**, Nova Scotia **17.6 ¢** (dearest). Use ~11 ¢ for Ontario overnight charging and 8 ¢ for Quebec in the calculator. Public Level 2 20–30 ¢/kWh; DC fast 35–55 ¢/kWh (Tesla Supercharger, Electrify Canada, Petro-Canada, FLO, Circuit électrique 45 ¢/kWh).
- **Annual distance:** **15,000 km** is the national average (Statistics Canada/insurance underwriting standard); Alberta/Saskatchewan 18,000–20,000, Quebec/BC urban 12,000–14,000.
- **Financing:** Bank of Canada policy rate **2.25 %**, prime **4.45 %**. Bank auto loans 6.5–7.5 % (national average 6.57 %), dealer/captive standard rates **5.99–8.99 %**, subsidised captive rates **0–3.99 %** on selected models (0 % over 60–84 months at GM, Ram, VW, Nissan, Cadillac; 0.99–2.99 % at Honda, Mazda, Subaru, Kia, Ford), sub-prime 12.9–29.99 %. Terms of **72–84 months** are the norm (average new-car loan ≈ 80 months; 96 months exists); leasing (36–48 months, 16,000–24,000 km/yr) is 25–30 % of retail deals and dominates luxury brands. Typical down payment 10 %; negative equity rolled into the next loan is common.
- **Ownership extras:** winter tires are mandatory in Quebec 1 Dec–15 Mar and on BC mountain highways Oct–Apr ($1,000–2,500 with rims); Quebec plates renew every year with the SAAQ bill; Ontario has no renewal fee but requires renewal every 1–2 years.

## 6. Glossary (Canada)

- **MSRP / PDSF:** manufacturer's suggested retail price — the sticker before freight, fees and taxes; the number used in this dataset.
- **Freight & PDI (transport et préparation):** the manufacturer's fixed delivery and pre-delivery inspection charge ($1,850–4,000), added to every sale and taxed.
- **All-in price / prix tout inclus:** the advertised price ON, QC, BC, AB, MB and SK dealers must show — MSRP + freight + all fees, excluding only sales tax and registration.
- **A/C tax:** the $100 federal excise tax on vehicle air conditioners.
- **Green levy:** federal excise tax of $1,000–4,000 on cars/SUVs/vans rated 13 L/100 km or worse (weighted city/highway); pickups exempt.
- **Luxury tax (Select Luxury Items Tax):** federal tax on vehicles over $100,000 — the lesser of 10 % of the price or 20 % of the amount above $100,000, with GST/HST charged on top.
- **HST / GST / PST / QST / RST:** federal-provincial Harmonized Sales Tax (ON 13 %, NS 14 %, NB/PE/NL 15 %); 5 % federal Goods and Services Tax; provincial sales tax (BC 7–20 %, SK 6 %, MB 7 % RST, QC 9.975 % QST).
- **BC luxury PST:** the higher PST rates (8–20 %) BC charges on passenger vehicles from $55,000 ($75,000 for ZEVs).
- **Counter-tariff / surtax:** Canada's 25 % duty on US-assembled vehicles (April 2025–), remitted for automakers with Canadian plants; and the 6.1 %-in-quota / 100 %-above-quota regime for Chinese-built EVs.
- **EVAP:** the federal Electric Vehicle Affordability Program — $5,000 (BEV) / $2,500 (PHEV) at the dealer for vehicles under $50,000 all-in, one per person, 2026–2030.
- **Roulez vert:** Quebec's EV rebate ($2,000 BEV / $1,000 PHEV in 2026, ends 31 Dec 2026).
- **iZEV:** the old federal $5,000 rebate that ran out in January 2025 (you will still see it on 2025 window stickers).
- **Admin / doc fee:** the dealer's own paperwork charge ($199–999), negotiable and included in all-in prices.
- **OMVIC / AMVIC / VSA / OPC:** the dealer regulators of Ontario, Alberta, BC and Quebec; OMVIC collects $22 per sale.
- **Autopac / SGI Auto Fund / ICBC Autoplan / SAAQ:** the public insurance schemes of Manitoba, Saskatchewan, BC and (injury only) Quebec, bought with the plate.
- **Residual / lease-end value, kilometre allowance:** leasing terms — the buy-back price and the 16,000–24,000 km/yr cap.
- **NRCan rating / EnerGuide label:** Canada's official fuel-consumption and range figures (city/highway/combined L/100 km, Le/100 km and km for EVs), printed on every new car.
- **CUSMA/USMCA-compliant:** a vehicle meeting the North American content rules; only the non-Canadian/Mexican share of its value carries the 25 % counter-tariff.

## 7. Sources

- Toyota Canada newsroom pricing releases (2026 RAV4 5 Jan 2026, RAV4 PHEV Mar 2026, 2026 Camry, 2026 Corolla Sept 2025, 2027 Corolla 18 Aug 2026, 2027 Corolla Hatchback 9 Jul 2026, 2027 Crown 11 Sept 2026, 2027 bZ 18 Aug 2026, 2027 bZ Woodland 20 Aug 2026, 2027 GR86 4 Aug 2026, 2027 Prius/Prius PHEV 16 Jul 2026, 2027 C-HR, 2026 Grand Highlander, 2027 Tundra/Sequoia 31 Jul 2026): https://media.toyota.ca/en/releases.html
- Nissan Canada newsroom (2026 Sentra 20 Nov 2025, Rogue 6 Aug 2025, Rogue PHEV 10 Feb 2026, Pathfinder/Frontier 16 Jan 2026, Armada 12 Aug 2025, Leaf 19 Aug 2025): https://canada.nissannews.com/en-CA/
- Unhaggle brand pages (starting MSRPs, Sept 2026): https://unhaggle.com/Toyota-Canada/ (and Honda, Hyundai, Kia, Nissan, Mazda, Subaru, Ford, Chevrolet, GMC, Buick, Cadillac, Lincoln, Jeep, Ram, Dodge, Chrysler, Volkswagen, Audi, BMW, Mercedes-Benz, Lexus, Acura, Infiniti, Mitsubishi, Volvo, Porsche, MINI pages)
- Le Guide de l'auto / The Car Guide model pages 2026–2027 (MSRP ranges, NRCan consumption): https://www.guideautoweb.com/en/makes/
- AutoTrader.ca research pages (trim MSRPs): https://www.autotrader.ca/research/
- Honda/Hyundai/Toyota dealer all-in pages used to back out freight (Riverview Honda, Upper James Toyota, Capital Hyundai)
- Electric Autonomy / Drive Tesla Canada / MobileSyrup on EVAP (16 Feb 2026 launch): https://electricautonomy.ca/policy-regulations/ev-rebates-incentives-funding/2026-02-23/heres-how-the-electric-vehicle-affordability-program-works/ ; https://driveteslacanada.ca/news/canadas-new-ev-rebate-program-is-live-everything-you-need-to-know/ ; EVAP tracker https://thinkev.ca/blog/evap-program-updates-tracker-canada-2026 ; provincial summary https://thinkev.ca/blog/ev-rebates-by-province-canada-2026
- Quebec Roulez vert amounts: https://www.quebec.ca/en/transports/electric-transportation/financial-assistance-electric-vehicle/new-vehicle/amount-financial-assistance ; Auto123 on the 2026 cut: https://www.auto123.com/en/news/amp/roulez-vert-program-subsidy-reduction/73536/
- BC PST Bulletin 308 (rev. Aug 2026, vehicle rate bands and ZEV thresholds): https://www2.gov.bc.ca/assets/gov/taxes/sales-taxes/publications/pst-308-vehicles.pdf ; BC Go Electric status: https://electric-vehicle-rebates.gov.bc.ca/ and https://www.7gen.com/blog/go-electric-rebates-return-bc-2026/
- SAAQ registration costs and luxury-vehicle surcharge: https://saaq.gouv.qc.ca/en/saaq/rates-fines/vehicle-registration/cost-renewal/passenger-vehicles ; https://saaq.gouv.qc.ca/en/vehicle-registration/additional-registration-fee-luxury-vehicles
- OMVIC transaction fee ($22 from 1 Sept 2025): https://www.omvic.ca/selling/fees/transaction-fees/
- Select Luxury Items Tax (CBSA D18-4-1; Budget 2025 kept it on vehicles): https://www.cbsa-asfc.gc.ca/publications/dm-md/d18/d18-4-1-eng.html ; https://www.autonews.com/retail/anc-2025-federal-budget-luxury-tax-relief-1105/
- Counter-tariffs: Canada Gazette United States Surtax (Motor Vehicles 2025) remission renewal Apr 2026 https://gazette.gc.ca/rp-pr/p2/2026/2026-04-08/html/si-tr13-eng.html ; Cole International summary https://blog.coleintl.com/tradenews/canada-renews-surtax-remission-on-us-origin-vehicle-imports-for-2026-2027 ; Sept 2026 surtax order https://www.ghy.com/trade-compliance/canada-counter-tariffs-us-goods-september-2026/ ; market impact https://gmauthority.com/blog/2026/09/u-s-made-vehicle-sales-drop-in-canada-due-to-tariffs/ and https://fortune.com/2026/09/25/canada-purchase-american-cars-decreasing-tariffs-backfire-us-automakers/
- Chinese EV quota (6.1 % within 49,000 units from 1 Mar 2026): https://electrek.co/2026/01/16/canada-breaks-with-us-slashes-100-tariffs-chinese-evs/ ; https://thinkev.ca/byd-canada-guide ; Tesla Shanghai Model 3 https://electrek.co/2026/05/01/tesla-model-3-rwd-premium-canada-record-low-price-giga-shanghai/ ; Model Y guide https://tslna.com/en/model-y-canada-guide/
- Fuel prices: Finder weekly average (29 Sept 2026) https://www.finder.com/ca/research/canadian-gas-prices ; diesel record https://www.bnnbloomberg.ca/investing/commodities/2026/09/29/now-at-historic-highs-diesel-prices-poised-to-hit-consumers-even-harder/ ; federal excise suspension extension https://www.canada.ca/en/department-finance/news/2026/09/the-government-of-canada-extends-the-federal-fuel-excise-tax-relief-on-gasoline-diesel-and-aviation-fuels-for-canadians.html ; Vancouver https://dailyhive.com/vancouver/vancouver-gas-prices-sept-2026
- Electricity by province: https://thinkev.ca/blog/ev-charging-costs-by-province-canada-2026
- Interest rates: Bank of Canada 2 Sept 2026 https://www.bankofcanada.ca/2026/09/fad-press-release-2026-09-02/ ; car-loan rates https://www.finder.com/ca/car-loans/car-loan-interest-rates ; 0 % offers https://www.finder.com/ca/car-loans/0-car-loans
- Insurance averages: https://wealthnorth.ca/insurance/car-insurance/average-car-insurance-by-province/
- Market and incentives: DesRosiers August 2026 sales https://www.cp24.com/news/canada/2026/09/02/auto-sales-see-third-consecutive-month-of-gains-in-august-desrosiers/ ; Car Help Canada September 2026 deals https://www.carhelpcanada.com/best-new-car-deals-september-2026/ ; Bolt/EV discounts https://emptytank.ca/2026/05/05/2027-chevrolet-bolt-discounted-in-may/
- Model status: Subaru Canada 2026 line-up https://www.guideautoweb.com/en/articles/80795/subaru-canada-clarifies-status-of-missing-2026-models/ ; Nissan Versa/Altima https://motorillustrated.com/the-nissan-altima-is-back-in-the-us-for-2026-but-not-in-canada/171085/ ; Kia K5/Soul axed https://www.guideautoweb.com/en/articles/73459/kia-k5-to-be-axed-in-canada/ ; Kia EV5 pricing https://electricautonomy.ca/automakers/passenger-electric-vehicles/2025-12-02/kia-ev5-canada-price/ ; Bolt pricing https://electricautonomy.ca/automakers/passenger-electric-vehicles/2025-10-16/chevy-bolt-returns-to-canada-pricing-starting-at-39999/ ; ID. Buzz https://thinkev.ca/blog/vw-id-buzz-canada-review-2026 ; VinFast closures https://www.auto123.com/en/news/vinfast-canada-closes-five-dealerships/72827/
