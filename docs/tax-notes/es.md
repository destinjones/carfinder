# Spain (es) — on-road math and market notes, late September 2026

Currency EUR (€). Prices in `data/cars_es.json` are integer euros, **PVP recomendado / precio de tarifa** for the cheapest and dearest version of each nameplate, as published by the brands and reproduced by km77.com (plus Diariomotor / coches.net tariff tables for Toyota, whose own site only shows promo-inclusive prices). PVP already includes **IVA 21 % and the impuesto de matriculación (IEDMT)** and, for almost every brand, transport to the dealer. It does **not** include temporary campaign discounts ("precio promocional", "descuento por financiación", Plan Auto+), which are described in sections 3 and 4. Efficiency: WLTP combined l/100 km (hybrid-mode figure for PHEVs), WLTP CO2 g/km of the entry version (approximate where the tariff page did not print it), WLTP electric range of the longest-range version, nominal battery kWh. Rows with `est=1` have an estimated/unconfirmed price (usually the top of the range, pickups whose tariffs may be ex-IVA, or Toyota tariffs reconstructed from promo + published saving).

## 1. What the quoted PVP already includes

`PVP = base × (1 + 0.21 + t)` where `base` is the ex-tax price (after any dealer discount) and `t` is the IEDMT rate from section 2.1. IVA is charged on the base; the IEDMT is *also* charged on the base (its taxable amount is by law the same as the IVA taxable amount, i.e. the ex-IVA price), so the two taxes are additive, not compounded.

- `base = PVP / (1.21 + t)` → `IVA = 0.21 × base`, `IEDMT = t × base`.
- Example: Kia Sportage 1.6 T-GDi 150 (140 g/km, t = 4.75 %), PVP 31,244 → base 24,846; IVA 5,218; IEDMT 1,180. A 0-emission car at PVP 30,000 → base 24,793; IVA 5,207; IEDMT 0.
- A dealer discount reduces the base, so IVA and IEDMT shrink proportionally (a 10 % discount is worth 10 % of the PVP, not more).
- The Plan Auto+ price caps (€35,000 / €45,000 "antes de impuestos", section 3) and the IRPF deduction test use this `base` **before** any discount and before the mandatory €1,000 dealer discount.
- Options and metallic paint (€500–1,200) add to the base and carry the same taxes.
- Pickups and vans: fleets buy them ex-IVA, so brand tariffs for Ranger/Hilux/D-Max/Musso are often published "sin IVA"; those rows are flagged `est=1` and were converted to IVA-inclusive where the source was ambiguous.
- Toyota, Lexus and a few others advertise a "precio con promoción y aportaciones" that is 10–15 % below tariff; `data/cars_es.json` uses the tariff (what the invoice shows before discounts), so Toyota rows look dearer than the adverts.

## 2. From PVP to on-the-road

### 2.1 Impuesto de matriculación (IEDMT, Ley 38/1992 art. 70) — inside the PVP but needed to back out the base
Rates are set by WLTP combined CO2 and unchanged since the 2021 WLTP re-basing; still in force for 2026:

| Epígrafe | WLTP CO2 g/km | Península + Baleares | Canarias | Ceuta y Melilla |
|---|---|---|---|---|
| 1 | ≤ 120 (all BEV, most HEV/PHEV, small petrols) | 0 % | 0 % | 0 % |
| 2 | 121–159 | 4.75 % | 3.75 % | 0 % |
| 3 | 160–199 | 9.75 % | 8.75 % | 0 % |
| 4 | ≥ 200, or no official CO2 | 14.75 % | 13.75 % | 0 % |

- Taxable base = ex-IVA price actually invoiced (discounts included). Paid on AEAT form 576 before the car can be registered; the dealer's gestoría files it.
- It is a tax ceded to the Comunidades Autónomas, which may raise the rates by up to 15 % (relative). Several regions use that power on the **top epígrafe only** (cars ≥ 200 g/km, plus boats/aircraft): Andalucía, Asturias, Baleares, Cantabria, Cataluña, Comunitat Valenciana and Murcia charge roughly 16 % (Andalucía 16.9 %) instead of 14.75 %. For the dropdown it only matters for ≥ 200 g/km cars (V8 Mustang, Land Cruiser, Ranger, exotics); every region uses the state rates for epígrafes 1–3. Treat the exact regional top rate as "≈16 %, verify" if you encode it.
- Exemptions/reductions (need AEAT recognition before registration): persons with ≥ 33 % disability (full exemption, one car per 4 years), taxis, driving-school and rental cars (exempt), **familia numerosa: 50 % reduction** for cars with ≥ 5 seats bought for the family.
- Buying in Canarias/Ceuta/Melilla to dodge the tax does not work: moving the car to the Península within 4 years of registration triggers the mainland IEDMT.

### 2.2 IVA / IGIC / IPSI (the consumption tax inside the PVP)
- **Península and Baleares: IVA 21 %.** Not recoverable for private buyers.
- **Canarias: IGIC instead of IVA** (that is why brands publish separate Canary price lists ~8–10 % lower). Rates on new cars: **9.5 %** for cars of ≤ 11 CV fiscales, **15 %** for > 11 CV fiscales (the "tipo especial incrementado", 13.5 % until 2019), **0 % for electric vehicles** (the Canary tax agency also applies the 0 % / reduced treatment to hybrids — verify per model with the ATC). Vans 6.5 %. Combined with the lower IEDMT, a 24,846 base car (140 g/km, ≤ 11 CVF) costs 24,846 × (1 + 0.095 + 0.0375) = 28,138 in Canarias versus 31,244 on the mainland. Add ferry/container transport if the car is not stocked locally (€300–1,000).
- **Ceuta y Melilla: no IVA and no IEDMT.** Cars pay the local **IPSI** on import, a few per cent (each city sets its own ordinance; typically 4–10 % on cars) — verify the current BOCCE/BOME table. Brands quote separate "precio Ceuta/Melilla" lists.

### 2.3 One-off registration costs (NOT in the PVP)
| Item | 2026 cost |
|---|---|
| Tasa DGT 1.1 "matriculación / permiso de circulación" | **€99.77** (2026 DGT fee catalogue) |
| Placas de matrícula (two plates) | €20–60 |
| Gestoría (dealer's agent files 576, DGT, IVTM) | €100–300; dealers usually invoice "gastos de matriculación / gestión" of **€250–500** that bundle tasa + placas + gestoría |
| Transport / "gastos de entrega" | Included in most Spanish tariffs; a few brands add €300–900 — check "transporte incluido" |
| First-year IVTM | Prorated by calendar quarters remaining in the year (section 2.4); the gestoría pays it and re-bills it |

Drive-away for a cash buyer ≈ `PVP − discount + 300…600 (tasa + placas + gestoría) + prorated IVTM + insurance`. There is no luxury tax, no plate auction and no dealer "documentation fee" beyond the gestoría line.

### 2.4 IVTM (Impuesto sobre Vehículos de Tracción Mecánica, "impuesto de circulación") — annual, municipal
Charged by the municipality where the owner is registered, on the car's **potencia fiscal (caballos fiscales, CVF)**, not on CO2 or price. CVF comes from the ficha técnica: `CVF = 0.08 × (0.785 × D² × S)^0.6 × N` (D bore and S stroke in cm, N cylinders, four-stroke) — roughly 1.0 three-cylinder ≈ 7.5–8.5 CVF, 1.2–1.3 ≈ 8–9.5, 1.5–1.6 ≈ 10–11.5, 2.0 ≈ 12–14, 2.5 ≈ 15–17, 3.0 ≈ 20+. For EVs `CVF = P_nominal(kW) / 5.152` using the *nominal continuous* power (not peak), so most EVs land at 8–13 CVF (a Model Y RWD is ~11.6). State minimum tariff (Ley de Haciendas Locales art. 95) and what the big cities charge in 2026 (councils may multiply the minimum by up to 2.0):

| Turismos by CVF | State minimum | Madrid | Barcelona | València | Sevilla (≈) |
|---|---|---|---|---|---|
| < 8 | 12.62 | 20.00 | 25.24 | 21.20 | 22.72 |
| 8 – 11.99 | 34.08 | 59.00 | 68.16 | 58.87 | 61.34 |
| 12 – 15.99 | 71.94 | 129.00 | 143.88 | 128.05 | 129.49 |
| 16 – 19.99 | 89.61 | 161.00 | 179.22 | 167.27 | 161.30 |
| ≥ 20 | 112.00 | 224.00 | 224.00 | 219.01 | 201.60 |

Environmental bonuses (up to 75 % allowed by law, each council decides; the owner must usually apply once):
- **Madrid**: 75 % for CERO-label cars (BEV, FCEV, PHEV > 40 km), applied automatically and without time limit; ECO-label hybrids also get 75 % but Madrid's 2026 ordinance re-based bonuses on the DGT label and limits them in time — verify the current duration. Large-fleet CERO/ECO/C get 50 %.
- **Barcelona**: 75 % for CERO (on request, resident and vehicle at the same address); 50 % for ECO petrol hybrids ≤ 120 g/km and for gas (GLP/GNC) cars; 100 % for historic vehicles.
- **València**: 75 % for zero-emission and for hybrid cars, no time limit (apply before 31 December of the previous year); 30 % for 3 years for petrol cars < 95 g/km.
- **Sevilla**: 75 % for electric and hybrid cars during the first 5 years from registration.
- Zaragoza, Málaga, Bilbao, Palma, Las Palmas: 50–75 % for CERO, 0–50 % for ECO — check the ordinance. Example: Tucson HEV (1.6 T, ~11 CVF) pays €59 in Madrid, €14.75 if it were CERO; a Model Y pays ~€32 in Madrid (75 % off €129).
- **Cataluña only: Impost sobre les emissions de CO2 dels vehicles**, an extra annual regional tax on cars registered to Catalan residents, paid Sept–Nov via the ATC: 0 up to 120 g/km, then the car's *whole* CO2 figure times €0.55/g (120–140), €0.65/g (140–160), €0.80/g (160–200) or €1.10/g (> 200), not charged if under €6. Typical bills: 130 g → €71.50, 155 g → €100.75, 210 g → €231. BEV and most HEV/PHEV are below 120 g and pay nothing.

### 2.5 Insurance (first year)
Third-party liability (responsabilidad civil / "terceros") is compulsory. Typical 2026 annual premiums for a 35–55-year-old with a clean record on a new mainstream car: **terceros básico €150–300; terceros ampliado (lunas, robo, incendio) €300–550; todo riesgo con franquicia (€300–600 excess) €500–900; todo riesgo sin franquicia €800–1,500.** EVs and Chinese brands run 10–25 % higher (parts, repair networks); drivers under 26 or with < 2 years' licence pay 1.5–2.5×; premium SUVs > €60k are €1,200–2,500 fully comp. Comparators: Rastreator, Kelisto, Acierto. Use **€400–900** as the "typical first year" band for a mainstream car (ampliado vs todo riesgo con franquicia).

### 2.6 Other running costs worth encoding
- ITV (roadworthiness test): none for the first 4 years, then every 2 years to year 10, then annual; €35–60 (Catalan/Andalusian stations differ).
- Servicing: €150–350/yr mainstream ICE; EVs €80–150/yr.
- Motorway tolls: mostly abolished on state motorways since 2021; remaining Catalan/Basque and radial tolls €0.08–0.15/km.

### 2.7 Regions worth a dropdown
1. **Península (general)** — IVA 21 %, state IEDMT, state-minimum-to-2× IVTM.
2. **Madrid** — same taxes; IVTM 59/129 € bands with 75 % CERO bonus; ZBE covers the whole city (no-label cars banned; B and C still allowed); Plan Mueve Madrid regional aid; free SER street parking for CERO.
3. **Cataluña** — extra annual CO2 tax (2.4); IEDMT ≈ 16 % on ≥ 200 g/km; Barcelona IVTM at the legal maximum; ZBE Rondes de Barcelona (B restricted in pollution episodes, banned in all Catalan ZBEs from 1 Jan 2028); fuel a few cents dearer.
4. **Andalucía** — IEDMT 16.9 % on ≥ 200 g/km; Sevilla/Málaga 75 % CERO IVTM bonuses; cheaper fuel than the north.
5. **Comunidad Valenciana** — IEDMT ≈ 16 % on ≥ 200 g/km; València IVTM 75 % for CERO and ECO indefinitely; Ford Almussafes plant means strong Kuga/Puma fleet deals.
6. **País Vasco** — foral tax system: its own IRPF (the state 15 % EV deduction does **not** apply; the three Diputaciones run their own EV deductions/aids — verify per territory); EVE regional aids closed in 2025; Bilbao IVTM ~60/130 bands.
7. **Galicia** — Plan Renova regional aid €3,000–4,000 with scrappage, open until 30 Sept 2026 and compatible with Auto+; Vigo charges the maximum IVTM (68.16 € for 8–11.99 CVF).
8. **Canarias** — IGIC 9.5 % / 15 % / 0 % EV instead of IVA; IEDMT 3.75 / 8.75 / 13.75 %; fuel ~€0.30/l cheaper; separate brand price lists; no ZBE outside Las Palmas/Santa Cruz plans.
9. **Ceuta y Melilla** — IPSI instead of IVA, IEDMT 0 %, fuel ~€0.40/l cheaper, cars must stay 4 years to keep the advantage.

## 3. EV / hybrid incentives in force (September 2026)

### 3.1 Plan Auto+ (Programa Auto+, replaces MOVES III from 1 Jan 2026)
- MOVES III closed to new purchases on **31 Dec 2025**; the regions are still paying out 2024–25 MOVES III claims.
- Auto+ is **state-run through IDAE** (no regional queues). Budget **€400 M for 2026: €350 M for private individuals (applications opened 4 Aug 2026, 10:00), €50 M for autónomos and companies (second window, opening late Sept/early Oct 2026)**. Deadline **31 Dec 2026 14:00** or when funds run out; ~50 % of the individuals' pot was committed by 19 Sept 2026 and the industry expects exhaustion **around late October 2026** — buyers should apply immediately after registration. Purchases from 1 Jan 2026 are retroactively eligible.
- Eligible: new cars with the **DGT CERO label** (BEV, FCEV, PHEV/EREV with > 40 km) first registered in Spain; **price cap €45,000 before taxes** (M1); no cap for N1 vans; one car per person (10 per company); keep it **24 months**; the dealer must apply a **minimum €1,000 discount before taxes** on top; **no scrappage required**. Second-hand cars first registered after 1 Jan 2025 sold by dealers also qualify.
- Amount = maximum × points, maximum **€4,500 (M1 cars), €5,000 (N1 vans), €1,500 (L6e/L7e), €1,100 (motorcycles)**. Points: technology 50 % (BEV/FCEV) or 25 % (PHEV/EREV) + price 25 % (base ≤ €35,000) or 15 % (€35,001–45,000) or 0 (above) + European content 15 % (assembled in the EU) + 10 % (battery pack assembled in the EU). Examples: EU-built BEV under €35k with EU battery → €4,500; Chinese-built BEV under €35k → €3,375; EU-built BEV €35–45k with EU pack → €4,050; PHEV under €35k built in the EU with EU pack → €3,375; Chinese PHEV €35–45k → €1,800. Hyundai/Kia (Czechia/Slovakia), Renault/Dacia (France/Slovenia; Spring is Chinese-built), VW group (Zwickau/Martorell/Pamplona), Stellantis (Zaragoza/Vigo/Madrid/Poland/Serbia), Ford Craiova/Cologne, Volvo Ghent, Tesla Berlin (Model Y) and, from 2026, BYD Hungary get the EU points; Tesla Model 3, MG, BYD Atto 2/Dolphin Surf (until Hungarian output ramps), Leapmotor B10/C10, Xpeng and Cupra Tavascan do not.
- Payment: the buyer (or the dealer on their behalf) files online; IDAE pays by transfer, target within ~2 months, so in practice it is a **rebate after purchase**, not a point-of-sale discount. Taxable as a capital gain in the next IRPF return.
- Formula for the app: `auto_plus = min(4500, 4500 × (tech + price_pts + eu_pts))` with `base = PVP/(1.21+t)` (t = 0 for CERO cars).

### 3.2 IRPF deduction for buying an electrified car (state, extended to 2026)
- **15 % of the purchase price** (PVP including taxes, **minus any public aid such as Auto+**), **base capped at €20,000 → max €3,000 back** in the 2026 tax return (filed Apr–Jun 2027). Extended by Real Decreto-ley at the last Council of Ministers of Dec 2025 to purchases made **up to 31 Dec 2026** (or a ≥ 25 % deposit paid by then with delivery within 2 years).
- Eligible: new BEV, PHEV, EREV, FCEV cars (also L-category) on the MOVES/Auto+ eligible list (same **€45,000 ex-tax cap**), for private use, first registered in the buyer's name; not for cars used in a business activity. Plus **15 % of a home charging point installation, base up to €4,000 (max €600)**, same deadline.
- Not available in País Vasco and Navarra (foral IRPF) unless their own rules provide it.
- Stack example, Citroën ë-C3 You 200 at PVP 20,516 (Slovak-built, EU battery): Auto+ €4,500 (base 16,955 ≤ 35,000 → full points) + IRPF 15 % × (20,516 − 4,500) = €2,402 → effective ≈ €13,600, which is why Citroën advertises "desde 11,700" once its own campaign discount is added.

### 3.3 Regional top-ups (all compatible with Auto+ within EU state-aid limits)
- **Galicia** Plan Renova o teu vehículo: €3,000–4,000, scrappage compulsory, applications until **30 Sept 2026**.
- **Madrid** Plan Mueve Madrid: from €2,000 (scrappage + purchase), 30 % of funds reserved for ZBE residents, until 31 Dec 2026.
- **Navarra** Plan Tximista Auto 2026: up to €5,500, favours EU-built cars, open until Oct 2026.
- **Cantabria** Renove IV, **País Vasco** EVE, **La Rioja** VER: 2025 calls closed, 2026 calls pending.
- **Company cars**: EV benefit-in-kind valuation reduced 30 %; companies still expense IVA on 50–100 % of an EV.

### 3.4 Etiqueta DGT and ZBE (what the label buys you)
Labels are unchanged for 2026 (the CO2-based reform proposed in the Ley de Movilidad Sostenible was dropped in parliament): **CERO** = BEV, FCEV, PHEV/EREV with ≥ 40 km electric range; **ECO** = non-plug-in hybrids, PHEV < 40 km, 48 V mild hybrids, CNG/LPG (many petrol MHEVs in `data/cars_es.json` are ECO despite 120–140 g/km); **C** = petrol Euro 4/5/6 (from 2006) and diesel Euro 6 (from Sept 2015); **B** = petrol Euro 3 (2000–05), diesel Euro 4/5 (2006–14). Over 150 municipalities above 50,000 inhabitants must run a **ZBE**: Madrid bans no-label cars city-wide (B and C still allowed, Distrito Centro limited to residents/CERO/ECO); Barcelona's Rondes ZBE bans no-label cars, restricts B during pollution episodes in 2026 and **all Catalan ZBEs ban B from 1 Jan 2028** (C to follow); València, Sevilla, Zaragoza, Bilbao, Málaga are phasing similar rules. CERO/ECO cars also get free or discounted regulated street parking (SER/AREA), BUS-VAO lane access, toll discounts and the IVTM bonuses above. For a buyer keeping the car 8–10 years, C-label petrol is the floor; B is a no-go.

## 4. Dealer discount climate (September 2026)
Registrations Jan–Aug 2026: 818,201 (+6.3 %), August 68,544 (+11.8 %); Toyota, VW, Kia, SEAT, Renault, Dacia lead; BYD is now 7th (+111 %), Tesla −79 %. The Ganvam/coches.com Barómetro VN puts the average new-car price at €43,486 (−1.2 % y/y) with **record average promotions of 12–14.5 %**, hybrids the most discounted ICE segment, EVs cut about €3,000 on average and PHEV discounts growing on stagnant demand. Dealer margins are thin, so the money is in brand campaigns, not haggling. Typical off-list totals (brand campaign + financing bonus + dealer contribution, before Auto+):

| `mkt` | Typical discount off PVP | Examples in Spain now |
|---|---|---|
| hot | 0–3 %, list price, some waiting | Dacia Sandero/Duster/Bigster, BYD Atto 2, Clio 6, new T-Roc, RAV4 2026, Cupra Raval/Formentor, Land Cruiser, Ferrari/Lamborghini |
| steady | 4–9 % | VW Tiguan/Polo, SEAT Ibiza/Arona, Kia Sportage/EV3, Skoda Elroq/Kamiq, Hyundai i10, Suzuki, Honda, BMW/Audi/Mercedes ICE, Volvo XC60 |
| deals | 10–20 % (25 % on km-0/stock) | Toyota (fixed promo prices ~12–15 % under tariff), Stellantis (Peugeot/Citroën/Opel/Fiat/Jeep campaigns €2,000–5,000), MG, Nissan, Ford, Renault Captur/Austral, Tesla ("Tesla Bonus" ~€3,600 Jul–Sept 2026), VW ID.3/ID.4, Cupra Born/Tavascan, Ford Explorer/Capri, premium EVs (15 %+), run-outs (Ateca, A-Class, Megane E-Tech, DS 3) |

Mechanics a buyer will meet: **"descuento por financiación"** (€1,000–3,000 extra only if you finance ≥ €8,000–10,000 with the brand bank for ≥ 36–48 months — can be cancelled after 12 months, check the penalty), **"campaña"/"aportación de marca y concesionario"** (published promo price), **"Plan Renove"/"achatarramiento"** brand top-ups of €500–1,500 for trading in a 10+-year-old car, **km 0** and stock cars (already registered, 15–25 % off, no waiting), and the mandatory **€1,000 Auto+ discount** on CERO cars. Waiting times are short (1–3 months) except hot launches (Raval, ID. Polo, Clio hybrid: 4–6 months).

## 5. Fuel, electricity, mileage, finance (September 2026)
- **Gasolina 95: ≈ €1.93/l; diésel (gasóleo A): ≈ €1.93/l** — Boletín Petrolero national averages for the week of 28 Sept 2026, a 2026 high after a September spike (August averages were ~€1.74 and ~€1.88; some aggregators of cheapest stations show €1.83). Gasolina 98 ≈ €2.07/l. **GLP autogas ≈ €1.05/l** (Dacia/Renault/Mitsubishi Eco-G). Canarias ≈ €1.60–1.67, Ceuta ≈ €1.71, Melilla ≈ €1.49 (no hydrocarbons tax / IGIC).
- **Electricity**: regulated PVPC averaged ≈ €0.18–0.19/kWh in Sept 2026 (energy term, hourly from €0.03 in solar midday to €0.34 at 20–22 h); typical all-in home rate on free-market flat tariffs ≈ €0.14–0.16/kWh; dedicated EV night tariffs charge **€0.06–0.08/kWh in the valle (00–08 h)** (Repsol Vehículo Eléctrico 0.061, Naturgy Tarifa Noche 0.074, Octopus/Iberdrola/Endesa similar) — use **€0.15/kWh** as the default home rate and €0.08 for night charging. Public charging: AC €0.30–0.40/kWh, DC fast €0.45–0.65/kWh, Tesla Supercharger ≈ €0.40–0.50.
- **Annual mileage**: 12,000–13,000 km for a private car (DGT/ANFAC: ~12,500 km average in 2025); use **12,500 km**.
- **Financing**: brand/dealer finance **TIN 6.5–8 %, TAE 7–9 %** (opening fee ~3 %, often bundled insurance), 48–84 months, 10–20 % entrada typical (0 % possible), and PCP-style **"cuota final / valor futuro garantizado"** (36–48 months, 30–50 % balloon, 10,000–15,000 km/yr); bank personal loans **TIN 5–6.5 %, TAE 6–7.5 %**, 0.5–1 % fee, up to 100 % financed, 8–10 years max. Rule of thumb: taking the financing discount and repaying after 12 months usually beats a cash price.

## 6. Glossary for a first-time Spanish buyer
- **PVP recomendado / precio de tarifa**: the manufacturer's list price including IVA and impuesto de matriculación, before campaign discounts.
- **Precio promocional / campaña**: the advertised price after brand and dealer discounts, usually conditional on financing or a trade-in.
- **Impuesto de matriculación (IEDMT)**: one-off registration tax of 0/4.75/9.75/14.75 % of the ex-IVA price by WLTP CO2 band (lower in Canarias, zero in Ceuta/Melilla).
- **IVA / IGIC / IPSI**: 21 % consumption tax on the Península and Baleares; Canarias uses IGIC (9.5 % / 15 % / 0 % for EVs); Ceuta and Melilla use the lower IPSI.
- **IVTM / impuesto de circulación**: annual town-hall tax based on caballos fiscales, €20–224 a year, 50–75 % off for CERO/ECO cars in most cities.
- **Caballos fiscales (CVF)**: a taxable-horsepower figure derived from engine displacement (or nominal kW for EVs) that sets the IVTM band, unrelated to real power.
- **Etiqueta DGT (0 / ECO / C / B)**: the environmental sticker that decides ZBE access, parking discounts and tax bonuses; CERO for EVs and long-range PHEVs, ECO for hybrids and gas.
- **ZBE (zona de bajas emisiones)**: the low-emission zone every city over 50,000 people must run; no-label cars are already banned in Madrid and Barcelona, B labels next.
- **Plan Auto+ (ex-MOVES)**: the 2026 state EV/PHEV purchase aid of up to €4,500, paid by IDAE after purchase, with a €45,000 ex-tax price cap and a mandatory €1,000 dealer discount.
- **Deducción IRPF del 15 %**: income-tax credit of 15 % of the price (max base €20,000, so up to €3,000) for an electrified car bought by 31 Dec 2026.
- **Tasa DGT y gestoría**: the €99.77 registration fee plus €100–300 for the agent who files the paperwork; dealers bill them as "gastos de matriculación".
- **Descuento por financiación**: an extra discount granted only if you take the brand's loan for a minimum amount and term.
- **Km 0**: a car already registered by the dealer (0–500 km) sold at a big discount; the buyer is the second owner on paper.
- **Cuota final / valor futuro garantizado**: PCP-style finance with low monthly payments and a large final balloon you can pay, refinance or hand the car back against.
- **Franquicia**: the excess you pay per claim on a "todo riesgo con franquicia" policy, typically €300–600.
- **TIN vs TAE**: nominal interest rate versus the all-in annual rate including fees; always compare TAE.

## 7. Sources used
- km77.com brand and model tariff pages (prices, versions, powertrains), e.g. https://www.km77.com/coches/dacia , https://www.km77.com/coches/toyota , https://www.km77.com/coches/dacia/sandero/2026 , https://www.km77.com/coches/renault/clio/2026 , https://www.km77.com/coches/volkswagen/tiguan/2024 , https://www.km77.com/coches/byd/atto-2/2025 , https://www.km77.com/coches/tesla/model-3/2024 and ~130 further model pages.
- km77 Spain sales data, August 2026: https://www.km77.com/revista/general/datos-de-ventas-de-coches-en-espana-agosto-2026/
- Toyota official tariffs: https://www.diariomotor.com/noticia/toyota-yaris-2026-precios/ , https://www.diariomotor.com/coche/toyota-corolla/ , https://www.diariomotor.com/coche/toyota-c-hr/ , https://www.diariomotor.com/coche/toyota-yaris-cross/ , https://www.diariomotor.com/coche/toyota-rav4/ , https://www.diariomotor.com/coche/toyota-corolla-cross/ , https://www.diariomotor.com/coche/toyota-bz4x/ , https://www.diariomotor.com/coche/toyota-yaris/ , https://www.coches.net/s/toyota/aygo_x_cross/ ; Toyota promo wording: https://www.toyota.es/coches/yaris
- Citroën ë-C3 tariff: https://www.coches.net/s/citroen/ec3/ ; Tesla Spain: https://www.tesla.com/es_es/model3 , https://www.diariomotor.com/noticia/oferta-tesla-model-3-septiembre-2026/ , https://www.ahorrove.es/articulo/tesla-model-3-precio-espana-2026/
- Plan Auto+: https://www.race.es/requisitos-plan-moves , https://www.xataka.com/basics/ayudas-gobierno-para-coche-electrico-2026-que-ofrece-plan-auto-requisitos-como-solicitarlo , https://www.eldiario.es/motor/ecomovilidad/solicitar-ayuda-coches-electricos-plan-auto-documentos-necesarios-enviarlos_1_13414017.html , https://www.coches.net/noticias/programa-auto-plus-ayudas-comprar-coche , https://www.somoselectricos.com/coches-electricos/plan-auto-queda-dinero-gran-velocidad-casi-mitad-ayudas-estan-comprometidas/20260919155448063310.html
- IRPF deduction: https://www.hibridosyelectricos.com/coches/ya-es-oficial-espana-prorroga-en-2026-deduccion-15-en-irpf-por-compra-coches-electricos-instalacion-puntos-carga_84277_102.html
- Regional aids: https://www.race.es/ayudas-compra-vehiculos-electricos
- Impuesto de matriculación: https://www.race.es/impuesto-matriculacion-coche , https://www.ahorrove.es/articulo/impuesto-matriculacion-coche-electrico-espana-2026/
- Canarias IGIC: https://www.motor.es/noticias/comprar-coche-canarias-2024105321.html , https://www.seisenlinea.com/guia-definitiva-comprar-coche-canarias/ , https://guiafiscal.es/iva/igic-canarias-2026/ ; Ceuta/Melilla IPSI: https://guiafiscal.es/iva/ipsi-ceuta-melilla-2026/
- DGT fees: https://sedeclave.dgt.gob.es/WEB_Tasas/jsp/tasas/download/catalogoPrecioTasas.pdf , https://www.race.es/cuanto-cuesta-matricular-coche
- IVTM: https://www.tasasmunicipales.info/impuesto-circulacion/ , https://guiafiscal.es/patrimonio/ivtm/valencia/ , https://lesmevesajudes.barcelona.cat/llistat-dajudes/bonificacions-de-limpost-sobre-vehicles-de-tracci%C3%B3-mec%C3%A0nica-ivtm-a-la-ciutat-de-barcelona/ , https://www.eldiario.es/motor/duenos-coches-electricos-pagar-75-impuesto-circulacion-funciona-territorio-pm_1_12309798.html , https://www.eldiario.es/madrid/somos/cambios-impuesto-vehiculos-madrid-durante-2026-pagar-contaminas-no-potencia_1_12848654.html
- Cataluña CO2 tax: https://www.autohero.com/es/consejos/comprar/normativa/impuesto-co2/ , https://atc.gencat.cat/es/tributs/impost-emissions-vehicles/
- Labels and ZBE: https://www.race.es/nuevas-etiquetas-dgt , https://www.eldiario.es/motor/etiqueta-b-entra-nueva-fase-cambia-2026-ley-movilidad-zbe-madrid-barcelona_1_12946843.html
- Discounts and prices: https://www.motor16.com/noticias/precio-coche-nuevo-2026-baja-promociones/ , https://www.eleconomista.es/motor/noticias/14001250/07/26/baja-el-precio-de-los-coches-los-nuevos-alcanzan-descuentos-historicos-de-hasta-el-145-y-los-hibridos-son-los-grandes-beneficiados.html
- Fuel: https://www.democrata.es/en/economy/price-of-gasoline-today-tuesday-september-29-the-95-rises-to-1934-euros-and-the-diesel-falls-to-1930/ , https://www.deia.eus/economia/2026/09/24/gasolina-diesel-tocan-nuevo-maximo-11579249.html , https://gasolineracerca.es/informes/precios-carburantes-2026-09 , https://www.rmotion.es/noticias/precio-combustible-espana/
- Electricity: https://tarifaluzhora.es/info/precio-kwh , https://tarifaluzhora.es/comparador/tarifas-luz-coches-electricos , https://www.xatakahome.com/iluminacion-y-energia/tarifas-luz-baratas-para-empezar-septiembre-2026-ahorrando-asi-queda-pvpc-respecto-a-mercado-libre
- Insurance and finance: https://www.helloprima.es/seguros-coche/guias/precio-seguro-coche , https://www.kelisto.es/prestamos/mejor-compra/financiar-coche , https://www.motor.es/noticias/financiar-coche-intereses-tin-tae-2026115340.html
