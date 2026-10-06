# United Kingdom (uk) — on-road math and market notes, late September 2026

Currency GBP (£). Prices in `data/cars_uk.json` are integer pounds, **manufacturer OTR (on-the-road) prices as published on brand sites and Carwow/What Car?/Auto Express in September 2026**, for the cheapest and dearest trim of each nameplate, **before any Electric Car Grant or manufacturer-funded "grant"/discount is deducted** (the note column says when a grant applies). Efficiency: WLTP combined mpg converted to L/100 km (`l100 = 282.48 / mpg`), WLTP combined CO2 g/km for the entry variant, WLTP electric range in km (`miles × 1.609`) for the longest-range EV/PHEV variant, battery kWh usable/nominal.

## 1. What the OTR price already includes

UK new-car prices are always quoted "OTR" (on the road). OTR = **basic price + VAT 20% + delivery charge (~£700–£1,000, embedded) + number plates (~£25–£40) + first registration fee (£55) + first-year VED** (the CO2-based "showroom tax" in section 2.1). Some brands also throw in a part-filled tank. So for a **cash buyer of a car that is not grant-eligible, drive-away ≈ OTR** plus optional extras (metallic paint is typically £600–£1,000 and is the most common "surprise"). There is no purchase tax, registration tax, luxury tax, plate auction or regional levy on top of OTR.

- `basic price = (OTR − first-year VED − 55) / 1.2` gives the ex-VAT price (needed only for VAT-registered businesses buying vans/pickups, who reclaim the VAT).
- **"List price" (also called P11D value or RRP)** = manufacturer's price including VAT, delivery and factory options, **excluding** the £55 fee and first-year VED. It decides the Expensive Car Supplement (section 2.2), the Electric Car Grant cap (section 3) and company-car tax. For the dataset: `list ≈ OTR − VED_year1 − 55`.
- VAT on cars is not reclaimable by private buyers or most businesses (only 100% business-use cars, taxis, driving-school cars). Vans and pickups with ≥ 1 tonne payload are commercial vehicles: prices are quoted **ex-VAT** in the trade; the pickup rows in `data/cars_uk.json` (Ranger, Hilux, D-Max, Musso) are converted to inc-VAT and flagged `est=1`.

## 2. From OTR to on-the-road and annual running costs

### 2.1 VED (Vehicle Excise Duty, "road tax" / "car tax") — first-year rate, 1 April 2026 to 31 March 2027
Charged once at first registration and **already inside the OTR price**, but a programmer needs it to (a) back out the list price and (b) show buyers why a 170 g/km SUV costs £1,410 more than a 100 g/km hybrid. Bands are by **WLTP combined CO2 g/km** of the exact variant; petrol, diesel (all new cars are RDE2-compliant), hybrid, PHEV and EV all use the same table since April 2025 (the alternative-fuel discount and the zero-emission exemption both ended on 1 April 2025).

| CO2 g/km | First-year VED 2026-27 | (was 2025-26) |
|---|---|---|
| 0 | £10 | £10 |
| 1–50 | £115 | £110 |
| 51–75 | £135 | £130 |
| 76–90 | £280 | £270 |
| 91–100 | £365 | £350 |
| 101–110 | £405 | £390 |
| 111–130 | £455 | £440 |
| 131–150 | £560 | £540 |
| 151–170 | £1,410 | £1,360 |
| 171–190 | £2,270 | £2,190 |
| 191–225 | £3,420 | £3,300 |
| 226–255 | £4,850 | £4,680 |
| over 255 | £5,690 | £5,490 |

The figures quoted in the brief (£10/£110/£130/£270/£350/£390/£440/£540/£1,360/£2,190/£3,300/£4,680/£5,490) are the **2025-26** table; gov.uk, Autotrader and CarAnalytics all confirm the RPI-uprated 2026-27 table above. Non-RDE2 diesels pay one band higher, but no new car on sale is non-RDE2. Examples from the dataset: Toyota Aygo X 87 g/km → £280; Dacia Sandero 119 g/km → £455; Kia Sportage 1.6T 155 g/km → £1,410; BMW X5 30d 197 g/km → £3,420; Ford Mustang V8 262 g/km → £5,690; any EV → £10.

Formula: `ved1 = co2==null ? 10 : co2<=50 ? 115 : co2<=75 ? 135 : co2<=90 ? 280 : co2<=100 ? 365 : co2<=110 ? 405 : co2<=130 ? 455 : co2<=150 ? 560 : co2<=170 ? 1410 : co2<=190 ? 2270 : co2<=225 ? 3420 : co2<=255 ? 4850 : 5690`.

### 2.2 VED from the second year: standard rate + Expensive Car Supplement (ECS)
- **Standard rate: £200 per year** (2026-27; was £195 in 2025-26) for every car, EVs included (EVs registered on/after 1 April 2017 pay it since April 2025). Paying monthly by direct debit adds 5%.
- **Expensive Car Supplement ("luxury car tax"): £440 per year** (2026-27; was £425), payable in **years 2 to 6** (five payments) on cars whose **list price incl. options is over £40,000** — or **over £50,000 for zero-emission cars**. The higher EV threshold was confirmed at £50,000 and applies from 1 April 2026 to zero-emission cars first registered on or after 1 April 2025 (so a 2025-registered £45k EV never pays it). Hybrids, PHEVs and range-extenders use the £40,000 line. It is assessed on the list price *before* the Electric Car Grant, so a £38k EV is safe but a £52k EV with a £3,750 discount is not.
- Years 2–6 annual VED = `200 + (list > (ev ? 50000 : 40000) ? 440 : 0)`. Example: Tesla Model Y Standard (£41,980 list, EV) → £200/yr; Kia EV9 (£66,645) → £640/yr for five years; Volvo XC60 B5 (£49,860) → £640/yr; Skoda Kodiaq 1.5 TSI (£39,045, no options) → £200/yr — but add £700 of options and it tips over £40,000, a classic trap.
- Historic/other: cars over 40 years old are exempt; disabled drivers' exemption exists; there is no CO2 element after year one.

### 2.3 Registration fee, plates, dealer fees
- **DVLA first registration fee: £55** (inside OTR). No annual registration; V5C logbook is free at first registration.
- **Number plates**: a pair costs £25–£40 and is normally included in OTR/delivery; personalised registrations are optional (DVLA from £250, plus £80 assignment fee).
- **Dealer "admin/documentation" fees**: uncommon on new cars (0–£200); "paint/fabric protection" (£300–£600), GAP insurance (£200–£500) and service plans (£15–£40/month) are optional upsells to decline or negotiate.
- **Delivery**: already in OTR; home delivery of an online purchase is usually free.

### 2.4 Insurance (compulsory third-party minimum; nearly everyone buys comprehensive)
- ABI average premium paid Q2 2026: **£566** (all drivers, mostly renewals). For a **new car, first year, comprehensive**, budget: small hatch (Sandero/Picanto/i10, insurance group 5–15) £500–£800; family SUV/hybrid (Sportage/Qashqai, group 15–25) £700–£1,100; EV (Model Y, EV6, group 35–45) £900–£1,500; premium SUV (X5, Range Rover Sport) £1,500–£3,000; Range Rover/high-end EV in London can exceed £4,000. Drivers under 25 pay 2–3× these; drivers with 5+ years' no-claims and a suburban postcode pay the low end. Northern Ireland premiums run £100–£300 higher than the GB average; Scotland and Wales are slightly cheaper than England (London is the dearest region).
- Insurance Premium Tax 12% is inside every quote. Quotes are personal (postcode, age, occupation, NCB), so the app should show a range or let the user type their own quote.
- Suggested default for the calculator: `insurance_year1 = clamp(0.018 × OTR, 500, 4000)`, × 2.5 if driver under 25, × 1.15 for EVs, × 1.25 for Northern Ireland.

### 2.5 MOT and servicing
No MOT test until the car is 3 years old (then £54.85/yr max). Typical first service £180–£350 (petrol), £150–£250 (EV); manufacturer service plans from ~£20/month. Warranties: 3 yr/60,000 mi standard (VW, Ford, BMW, Mercedes), 5 yr (Hyundai, Toyota with service-activated up to 10 yr, Renault, Honda 3+2), 7 yr (Kia, MG, Omoda/Jaecoo, GWM, Chery, SsangYong/KGM), 8 yr/100,000 mi on EV batteries by law of the grant.

### 2.6 Regional differences and the dropdown
**VED, VAT, registration fee, grants, fuel duty and insurance tax are identical in England, Scotland, Wales and Northern Ireland** — there is no regional purchase or registration tax at all. The only real geographic variables are (1) insurance postcode pricing (NI highest, London high, rural Scotland/Wales lowest), (2) **London Congestion Charge £18/day** (EVs lost their full exemption on 25 Dec 2025 and now get a 25% discount if registered for Auto Pay) and **ULEZ £12.50/day** (every new car sold is compliant, so irrelevant to a new-car buyer), and (3) Scottish LEZs in Glasgow/Edinburgh/Aberdeen/Dundee (all new cars compliant). Northern Ireland also registers cars through the DVA rather than DVLA (same fees) and a few models are GB-only (e.g. Honda Super-N).

**Recommendation: do not build a nation dropdown.** Replace it with a **"Buying as" selector** that changes the maths:
1. **Private – cash**: OTR − grant + extras + insurance.
2. **Private – PCP/finance**: adds APR, term, deposit, balloon (section 5).
3. **Company car (BIK)**: the tax the driver pays is `list price (P11D) × BIK% × marginal income-tax rate (20/40/45%)` per year, where the 2026-27 BIK% is **4% for EVs**; for PHEVs 1–50 g/km: 4% (electric range ≥ 130 mi), 7% (70–129 mi), 10% (40–69 mi), 14% (30–39 mi), 16% (< 30 mi); 51–54 g/km 17%, then +1 point per 5 g/km up to 37% (diesel non-RDE2 +4, none on sale). EVs go to 5% in 2027-28, 7% in 2028-29, 9% in 2029-30; PHEVs 1–50 g/km jump to 18% in 2028-29. Example: Tesla Model Y Standard £41,980 × 4% × 40% = **£672/yr**; BMW X3 20 xDrive 168 g/km (37%) £53,620 × 37% × 40% = £7,936/yr. This is why PHEVs and EVs dominate the company-car and salary-sacrifice market.
4. **Salary sacrifice (EV)**: same BIK as 3, lease paid from gross salary — typically saves 30–50% versus a personal lease for a 40% taxpayer.
Optional toggle: "I drive into central London" (+£18/day Congestion Charge, EVs £13.50).

## 3. EV / hybrid incentives in force (September 2026)

### 3.1 Electric Car Grant (ECG) — cars
- Launched 16 July 2025, funded with **£650m, runs to 31 March 2030 or until the money runs out**. Applied by the dealer at the point of sale (private and business buyers, purchase, PCP or lease); the dataset prices are **before** the grant.
- Eligibility: new battery-electric car with **list price under £37,000** (base RRP of the trim, options excluded), ≥ 100-mile WLTP range, 3 yr/60,000-mile vehicle warranty and 8 yr/100,000-mile battery warranty, and the **manufacturer must have a verified Science Based Targets initiative (SBTi) commitment** — which is why Tesla, BYD, MG, Mazda, Chery/Omoda/Jaecoo, Leapmotor, Xpeng, GWM, Geely, Smart, Dacia and Suzuki cars get nothing from the government (several fund their own matching discounts instead: MG £1,500 on MG4/S5, Toyota £1,500 on bZ4X, Suzuki £3,750 on e Vitara, Leapmotor £1,500–£3,750, Dacia £3,750 on Spring).
- Two bands set by manufacturing-emissions score: **Band 1 = £3,750**, **Band 2 = £1,500**.
- **Band 1 (£3,750) as of 22 Sept 2026 (Which?/The Car Expert lists)**: Abarth 500e (hatch and Cabriolet), Alpine A290, BMW iX1 (eDrive20 Sport) and iX2, Citroën ë-C5 Aircross Long Range, Fiat 500e (hatch and Cabriolet), Ford E-Tourneo Courier and Puma Gen-E, Hyundai Kona Electric (all versions after the 2026 price cuts), Kia EV2 (61 kWh) and EV4, MINI Countryman Electric, Nissan Leaf (all), Nissan Micra 52 kWh, Renault 4 E-Tech (all), Renault 5 E-Tech 52 kWh, Renault Scenic E-Tech (all).
- **Band 2 (£1,500)**: Abarth 600e; Alfa Romeo Junior Elettrica; Citroën ë-C3, ë-C3 Aircross, ë-C4/ë-C4 X, ë-C5 Aircross standard range, ë-Berlingo, ë-SpaceTourer; Cupra Born and Raval; DS 3 E-Tense, DS N°4 E-Tense; Fiat 600e; Ford Capri and Explorer (Standard Range); Jeep Avenger Electric and Compass Electric; Kia EV2 (49 kWh), EV3 (sub-£37k trims), PV5 Passenger; Nissan Ariya (Advance 63 FWD), Micra 40 kWh; Peugeot E-208, E-2008, E-308, E-3008 (Allure 73 kWh), E-408, E-Rifter, E-Traveller; Renault 5 E-Tech 40 kWh, Megane E-Tech; Skoda Elroq, Enyaq 60, Epiq; Toyota C-HR+ (entry), Proace City Verso Electric; Vauxhall Astra Electric, Corsa Electric, Frontera Electric, Grandland Electric, Mokka Electric, Combo Life Electric, Vivaro Life Electric; Volkswagen ID.3, ID.4 (Pure), ID.5, ID. Polo (from launch). Only trims with a list price under £37,000 qualify even when the nameplate is listed.
- Rule for the app: `grant = ecg_band==1 ? 3750 : ecg_band==2 ? 1500 : 0` applied only when the chosen trim's list price < 37,000; brand-funded discounts should be treated as ordinary discounts (section 4).

### 3.2 Plug-in Van Grant (PiVG) — vans and pickups
Extended in August 2025 **to 31 March 2027**: **35% of the price up to £2,500 for small vans (< 2.5 t GVW)** and **up to £5,000 for large vans (2.5–4.25 t)**; small trucks £16,000, large trucks £25,000. Electric vans must have < 50 g/km CO2 and ≥ 60 miles zero-emission range. Applies to e.g. Kia PV5 Cargo, Ford E-Transit/E-Transit Custom, Vauxhall Vivaro Electric, Toyota Proace Electric, Maxus; not to passenger MPV versions. Electric vans also pay the light-goods-vehicle VED (£355/yr) not the car rates, and a flat van BIK.

### 3.3 Other
- **Home charger**: the £350 EV chargepoint grant now only covers renters/flat owners and people without off-street parking (cross-pavement solutions); homeowners with driveways get nothing. Chargepoint install typically £800–£1,200.
- **Workplace Charging Scheme**: £350 per socket up to 40 sockets for businesses.
- **No scrappage scheme** nationally (London's ULEZ scrappage closed 2024).
- **Hybrids and PHEVs get no purchase incentive** — only the lower first-year VED and lower BIK. The ZEV mandate (28% of each maker's 2025 sales electric, 33% in 2026, 80% by 2030, hybrids allowed to 2035) is why manufacturers discount EVs so heavily (section 4).

## 4. Dealer discount climate (September 2026)
UK dealers negotiate; broker sites (Carwow, What Car? New Car Buying, Drive the Deal) publish the real transaction price. Carwow's September 2026 sale headlined savings "up to £7,719" and individual deals of 25–29% off (BMW iX1 £9,499 off, Peugeot E-208 £8,300 off, Hyundai Santa Fe PHEV £14,764 off, Ford Kuga £7,415 off, BYD Seal £5,885 off). Rough rules per `mkt` flag:

| mkt | who | typical discount off OTR | finance support |
|---|---|---|---|
| **hot** | Renault 5, Cupra Raval, Kia EV2, BMW iX3, Land Cruiser, Defender, Porsche 911, Ferrari/Lamborghini/RR | **0–2%**, waiting lists 3–12 months | list-price PCP at 6.9–9.9% APR |
| **steady** | Dacia, Toyota, Honda, Skoda, Kia/Hyundai ICE, VW ICE, Volvo, MINI | **4–9%** (What Car? Target Price is usually 5–8% under OTR), plus £500–£1,500 deposit contributions | 0–5.9% APR PCP offers common |
| **deals** | most EVs over £37k, Stellantis (Peugeot/Citroën/Vauxhall/Fiat/Jeep/Alfa), Nissan, Ford, Mazda, MG/BYD/Chinese brands, run-out models (A-Class, Clio, Renegade, XC40), Audi/BMW/Mercedes EVs | **12–25%** (occasionally 30% on pre-registered stock) | 0% APR, free home chargers, 2-year free servicing |

Pre-registered/delivery-mileage cars (< 100 miles, registered by the dealer to hit ZEV-mandate targets, especially at the end of March, June, September and December) are the cheapest way into an EV: expect 15–30% below OTR but the car counts as "used" for finance and the first year of warranty has started. Plate changes on 1 March ("26 plate") and 1 September ("76 plate") are the peak registration months and the best negotiating windows are the fortnights before each quarter end.

## 5. Fuel, electricity, mileage, finance (September 2026)
- **Unleaded (E10) 174.1p/litre, diesel 199.2p/litre** — UK average, RAC Fuel Watch 28 Sept 2026 (diesel at an all-time high because of the Iran/Gulf oil shock; petrol premium/E5 ~187p; LPG autogas ~85p/litre at the ~1,000 sites that stock it). Fuel duty is 52.95p/litre (the 5p cut is still in force but a staged reversal is planned by spring 2027) plus 20% VAT on the whole pump price. Supermarket forecourts are typically 5–8p below the average; motorway services 15–25p above.
- **Home electricity: 26.32p/kWh** (Ofgem price cap, direct debit, 1 Oct–31 Dec 2026; 26.11p in July–Sept 2026; standing charge 54.83p/day). VAT on electricity is suspended from 1 Oct 2026 to 31 Mar 2027. EV off-peak tariffs (Octopus Intelligent Go, E.ON Next Drive, OVO Charge Anytime) charge **~7p/kWh** overnight and are what most home-charging EV owners actually pay; public rapid charging is 70–85p/kWh (20% VAT), lamp-post/slow chargers 40–55p.
- **Typical annual mileage: 7,400 miles ≈ 11,900 km** (DfT National Travel Survey; company cars ~15,000 miles). Fuel cost per year = `11900/100 × l100 × 1.741` (petrol) or `× 1.992` (diesel); EV cost = `11900 × (kwh / range_km × 1.15) × 0.2632` at cap rate (or × 0.07 on an EV tariff). Example: Dacia Sandero 5.3 L/100 km → £1,098/yr petrol; Kia EV3 81.4 kWh / 603 km → 15.5 kWh/100 km → £486/yr at the cap, £129/yr off-peak.
- **Finance**: Bank of England base rate **3.75%** (held 17 Sept 2026). About 80% of private new cars are bought on **PCP**: typical manufacturer-backed representative APR **6.9–9.9%** (independent lenders 9.9–12.9%), **36–48 months**, 10% deposit (often topped by a £500–£3,000 manufacturer deposit contribution), 6,000–10,000 miles/yr allowance (excess ~8–15p/mile), Guaranteed Future Value/balloon 35–55% of OTR. Subsidised **0–4.9% APR** is common on EVs and slow sellers. **PCH (personal contract hire/leasing)** is the cheapest way to run an EV (£250–£450/month for a Kia EV3/Skoda Elroq class car on a 3-year, 8,000-mile deal). **HP** at similar APRs for buyers who want to own. The FCA motor-finance redress scheme (2026) compensates for past hidden commissions but does not change new-car pricing; dealers must now disclose commission.

## 6. Glossary for a first-time UK buyer
- **OTR (on the road)**: the all-in price you drive away for — includes VAT, delivery, plates, £55 registration and first-year VED; the only price a UK buyer should compare.
- **List price / P11D value / RRP**: the manufacturer's price with VAT and options but without the £55 fee and first-year VED; used for the £40k/£50k ECS test, the £37k grant cap and company-car tax.
- **VED ("road tax", "car tax")**: the annual government tax to use the roads — a CO2-based first-year "showroom" charge inside OTR, then £200 a year.
- **Expensive Car Supplement (ECS, "luxury car tax")**: the extra £440 a year in years 2–6 for cars listed over £40,000 (£50,000 for EVs).
- **ECG (Electric Car Grant)**: the £1,500 or £3,750 government discount the dealer takes off an eligible sub-£37,000 EV at the till.
- **BIK (benefit-in-kind)**: the income tax a company-car driver pays on a percentage (4% EV to 37% thirsty petrol) of the P11D value.
- **PCP (personal contract purchase)**: pay a deposit and 3–4 years of monthly payments, then either pay the balloon (GFV) to keep the car, hand it back, or trade in for another.
- **GFV / balloon**: the Guaranteed Future Value at the end of a PCP — what the car is assumed to be worth and what you pay to own it.
- **PCH (personal contract hire)**: a straight lease — you never own the car, hand it back after 2–4 years; usually the cheapest monthly route into an EV.
- **HP (hire purchase)**: a loan secured on the car with no balloon; you own it at the end.
- **Target Price / Carwow price**: the realistic discounted price brokers and What Car? mystery shoppers achieve — usually 5–15% under OTR.
- **Pre-reg / delivery-mileage car**: a brand-new car the dealer has already registered to hit targets; sold with a big discount as "used" with a few miles on it.
- **Plate change (26 / 76 plate)**: new registration letters on 1 March and 1 September; March and September are peak sales months and the run-up is the best time to haggle.
- **WLTP**: the official EU/UK lab test that produces the mpg, CO2 and electric-range figures — real-world EV range is typically 10–25% lower, worse in winter.
- **NCB (no-claims bonus)**: years without an insurance claim; each year cuts your premium, and it is why young or new drivers pay so much more.
- **ULEZ / Congestion Charge**: London daily charges (£12.50 for older dirty cars — all new cars are exempt; £18 for driving into the centre, EVs pay £13.50).

## 7. Sources used
- gov.uk vehicle tax rate tables (first-year rates, £200 standard rate, £440 ECS, £50,000 EV threshold): https://www.gov.uk/vehicle-tax-rate-tables
- Autotrader VED bands from 1 April 2026: https://www.autotrader.co.uk/content/advice/car-tax-bands
- CarAnalytics UK car tax 2026 (ECS £440, EV threshold timing): https://www.caranalytics.co.uk/guides/uk-car-tax-2026/
- Which? Electric Car Grant eligible models (updated 22 Sept 2026): https://www.which.co.uk/reviews/new-and-used-cars/article/electric-car-grant-all-eligible-models-and-other-brand-discounts-a42Mi7y8tDek
- The Car Expert ECG eligibility list (23 July 2026): https://www.thecarexpert.co.uk/electric-car-grant-all-the-evs-with-discounts/
- Plug-in van grant extension to 2027 (Autotrader Vans, Aug 2025) and Fleet News: https://www.autotrader.co.uk/vans/content/plug-in-van-grant-extended-to-at-least-2027 ; https://www.fleetnews.co.uk/news/plug-in-van-and-truck-grant-extended-but-levels-to-be-decided
- RAC Fuel Watch via ITV News, 28 Sept 2026 (unleaded 174.13p, diesel 199.18p): https://www.itv.com/news/2026-09-28/uk-diesel-prices-hit-all-time-high-rac-figures-show ; https://www.rac.co.uk/drive/advice/fuel-watch/
- Ofgem price cap 1 Oct–31 Dec 2026 (26.32p/kWh, VAT suspended): https://www.ofgem.gov.uk/news/changes-energy-price-cap-between-1-october-and-31-december-2026 ; https://www.ofgem.gov.uk/information-consumers/energy-advice-households/energy-price-cap-unit-rates-and-standing-charges
- ABI motor premium tracker Q2 2026 (£566): https://www.abi.org.uk/media-hub/news-post/record-32-billion-paid-out-to-support-motor-insurance-customers-in-q2-2026
- Bank of England base rate Sept 2026 (3.75%): https://kerrandwatson.co.uk/bank-of-england-base-rate-september-2026/
- Carwow September 2026 sale deals and per-model RRP ranges (all model pages under https://www.carwow.co.uk/<make>/<model>): https://www.carwow.co.uk/news/11305/5-best-car-deals-september-sale
- Auto Express (Tesla Model 3/Model Y, Subaru, Nissan Ariya, Renault Clio price cut): https://www.autoexpress.co.uk/tesla/model-y ; https://www.autoexpress.co.uk/tesla/model-3 ; https://www.autoexpress.co.uk/nissan/ariya ; https://www.autoexpress.co.uk/renault/clio/368546/renault-clio-gets-ps1000-price-cut-wait-continues-its-all-new-successor
- Brand sites: Toyota UK (Aygo X, RAV4): https://www.toyota.co.uk/new-cars/rav4 ; Ford UK (Puma Gen-E): https://www.ford.co.uk/cars/puma-gen-e ; Nissan UK (Ariya): https://www.nissan.co.uk/vehicles/new-vehicles/ariya.html ; Honda UK: https://www.honda.co.uk/cars.html ; MG UK: https://www.mg.co.uk/ ; KGM UK: https://www.kgm-motors.co.uk/ ; Subaru UK EV plans: https://subaru.co.uk/new-subaru-electric-models-coming-2026 ; Dacia Spring 2026 pricing (electrive): https://www.electrive.com/2025/12/17/enhanced-dacia-spring-priced-from-12240/
- Xpeng X9 UK pricing (AM Online): https://www.am-online.com/news/xpeng-confirms-uk-launch-date-and-pricing-for-x9-mpv ; Autocar on G9 timing: https://www.autocar.co.uk/car-news/new-cars/xpeng-bring-seven-seat-x9-starship-and-g9-uk-2026
