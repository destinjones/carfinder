# Mexico (mx) — on-road math and market notes, late September 2026

Currency MXN (pesos, "$"). Prices in `data/cars_mx.json` are integer pesos, the **precio de lista** (also "precio sugerido al público", "MSRP") that the brand publishes for each version, cheapest and dearest version of each nameplate, excluding paint, accessories and dealer add-ons. Efficiency columns: combined consumption in L/100 km converted from the km/L figure on the CONUEE/PROFECO "Ecovehículos" label where one exists (l100 = 100 ÷ km/L; the label is derived from EPA-style lab cycles, so real-world use is 10–25 % worse), CO2 g/km approximated from consumption (Mexico has no CO2-based tax, so this column is informational), EV/PHEV range as the brand publishes it in Mexico (Chinese brands quote NEDC or CLTC, Tesla/Ford/GM quote EPA, Europeans quote WLTP; the cycle is named in each note where it matters).

## 1. What the precio de lista already includes

A Mexican list price **includes 16 % IVA and the federal new-car tax ISAN**. Volkswagen's September 2026 footnote is typical: *"El precio aquí establecido corresponde a operaciones de contado en Moneda Nacional… las cuales incluyen el 16 % de Impuesto al Valor Agregado (IVA) y el Impuesto Sobre Autos Nuevos (ISAN cuando aplique)."* ISAN is legally paid by the manufacturer/dealer and passed through inside the price; SAT rules say it is **not broken out as a separate line on the CFDI invoice** (it is buried in the subtotal, and IVA is charged on the ISAN-inclusive amount). So:

- `list = (P + ISAN(P)) × 1.16`, where **P** is the pre-tax "precio de enajenación" (the ISAN base). To recover P from a list price solve `P + ISAN(P) = list / 1.16` (iterate the bracket, or just use `P ≈ list / 1.16 − ISAN`).
- The list price **excludes**: state registration (alta de placas / tarjeta de circulación), state tenencia where it applies, insurance, the verification hologram, and any dealer "gestoría" (paperwork) fee or forced accessories. There is no delivery/freight charge in Mexico; "precio de lista" is the same nationwide (border-zone IVA of 8 % only applies to some services, not to cars).
- IVA on a car is 16 % everywhere in Mexico. The 8 % border-region IVA does **not** apply to vehicle sales.
- Rule of thumb: **drive-away ≈ list × 1.00–1.01 plus insurance** for anything under $638,000 in CDMX/Edomex (tenencia subsidised, ISAN already inside), and **list × 1.03–1.04 plus insurance** for a $1M+ petrol car in a tenencia state.

## 2. From list price to on-the-road

### 2.1 ISAN — Impuesto Sobre Automóviles Nuevos (federal, inside the list price)

Base = pre-tax price P (with factory options, before discounts, **without IVA**). Tariff for 2026 (SAT Anexo 15, RMF 2026, DOF 28-Dec-2025; amounts are inflation-indexed every January):

| Límite inferior (P) | Límite superior | Cuota fija | % sobre excedente |
|---|---|---|---|
| $0.01 | $383,940.35 | $0.00 | 2 % |
| $383,940.36 | $460,728.35 | $7,678.67 | 5 % |
| $460,728.36 | $537,516.64 | $11,518.25 | 10 % |
| $537,516.65 | $691,092.34 | $19,197.04 | 15 % |
| $691,092.35 | onward | $42,233.35 | 17 % |

- **Reduction for expensive cars:** if P > **$1,060,189.93**, subtract **7 % of (P − 1,060,189.93)** from the tax computed with the table (so the marginal rate above that point is effectively 10 %).
- **Exemptions (Art. 8-II, 2026 amounts):** P ≤ **$356,934.05** → no ISAN at all; P between **$356,934.06 and $452,116.48** → pay **50 %** of the computed ISAN; above → 100 %. In list-price terms: full exemption up to roughly **$414,000** list, the half-rate band up to roughly **$530,000** list.
- **Electric, plug-in and hybrid cars pay no ISAN** (Art. 8-IV: battery-electric vehicles and "eléctricos que además cuenten con motor de combustión interna", i.e. HEVs and PHEVs, plus hydrogen). Brands do not always treat 48 V mild hybrids as exempt; assume mild hybrids (Suzuki Boostergreen, Mazda MHEV, Peugeot 3008 "hybrid") pay ISAN unless the dealer confirms otherwise.
- Trucks: chassis-cab and cargo trucks up to 4,250 kg payload and panel vans with ≤ 3 seats pay a **flat 5 %** (Art. 3-II); double-cab pickups with 5 seats are "automóviles" and use the table.

```
ISAN(P):
  if EV/PHEV/HEV: 0
  if P <= 356934.05: 0
  t = P<=383940.35 ? 0.02*P
    : P<=460728.35 ? 7678.67  + 0.05*(P-383940.35)
    : P<=537516.64 ? 11518.25 + 0.10*(P-460728.35)
    : P<=691092.34 ? 19197.04 + 0.15*(P-537516.64)
    :               42233.35 + 0.17*(P-691092.34)
  if P > 1060189.93: t -= 0.07*(P-1060189.93)
  if P <= 452116.48: t *= 0.5
  return t
```
Worked: P = $500,000 → $11,518.25 + 10 % × 39,271.65 = **$15,445** (3.1 %); P = $1,000,000 → **$94,748** (9.5 %); P = $2,000,000 → 264,748 − 65,787 = **$198,961** (9.9 %). Remember these amounts are **already in the sticker**; the only time a buyer meets ISAN live is on dealer-fitted accessories invoiced with the car.

### 2.2 Tenencia — state ownership tax (the big regional variable)

Mexico abolished the federal tenencia in 2012; each state decides. In 2026 roughly half the states still levy it, almost all with a subsidy for cheaper cars paid on time. Where it exists the formula is the old federal one:

- **New car:** `tenencia = 3 % × valor total`, where **valor total = price without IVA but including ISAN and import duties** (≈ list ÷ 1.16), **prorated by month of purchase** (factor: Jan 1.00, Feb 0.92, Mar 0.83, Apr 0.75, May 0.67, Jun 0.58, Jul 0.50, Aug 0.42, Sep 0.33, Oct 0.25, Nov 0.17, Dec 0.08).
- **Following years:** `3 % × valor total × depreciation factor`: year 1 = 0.850, 2 = 0.725, 3 = 0.600, 4 = 0.500, 5 = 0.400, 6 = 0.300, 7 = 0.225, 8 = 0.150, 9+ = 0.075 (CDMX Código Fiscal art. 161 BIS 13; Edomex uses the same ladder).
- Pay with the annual **refrendo** (plate renewal) in January–March; late payment loses the subsidy and adds ~1.5 %/month surcharges.

State rules for the suggested dropdown (2026):

| Region | Tenencia in 2026 | Subsidy / exemption | Annual refrendo (plate renewal) | First registration (alta de placas, incl. tarjeta de circulación) |
|---|---|---|---|---|
| **Ciudad de México** | Yes, 3 % | **100 % subsidy if the car's value *including IVA* is ≤ $638,000** (raised from $250,000 for 2026) and the refrendo is paid in the window (1 Jan–30 Jun 2026 after an extension; new cars pay at alta). **EVs and hybrids: 0 %.** Above the cap you pay the full 3 % (no taper). | $760 | $972 conventional / **$486 hybrid or electric** (placas + engomado + tarjeta); do it within 30 days of the invoice |
| **Estado de México** | Yes, 3 % | 100 % subsidy if value incl. IVA ≤ $638,000 (= $550,000 pre-IVA) for plates 2021 or newer; 50 % for 2020 plates; window 1 Jan–6 Apr 2026. EVs exempt; hybrids exempt only if CO2 < 100 g/km. | $990 | $1,194 |
| **Jalisco** | No (abolished) | — | ≈ $1,000 (5 % off if paid online Jan–Feb) | ≈ $1,500 (plates + tarjeta); free plate exchange campaign in 2026 |
| **Nuevo León** | No (since 2018) | — | **$4,105.85** (35 UMA) for 2017+ models — the dearest refrendo in the country; EVs pay 17.5 UMA ≈ $2,053 | ≈ $2,500 (plates + tarjeta + first control vehicular) |
| **Guanajuato** | Only on cars whose depreciated pre-IVA value exceeds **$450,000** (per state portal summaries; verify) — EVs/hybrids exempt | Below the threshold nothing but the refrendo | ≈ $940 | $1,473 |
| **Puebla** | Yes (3 %), but **100 % subsidised** if the "control vehicular" is paid by 31 March and you have no photo-fine debts; EVs/hybrids exempt | Miss the window → full tenencia + surcharges | $700 | $1,275 |
| **Querétaro** | Yes | 100 % "estímulo" on cars with depreciated pre-IVA value up to **$800,000** if paid Jan–Mar; above that you pay only on the excess; cars registered during the year keep the benefit to 31 Dec | ≈ $900 (verify on Recaudanet) | ≈ $1,500 |
| **Veracruz** | Yes (3 %), 100 % subsidised if control vehicular paid Jan–Apr | Otherwise full tenencia + surcharges | $1,119.42 ($1,287.34 with the education surtax) | ≈ $1,716 (2026 plate exchange price) |
| **Yucatán** | No | — | ≈ $800 | ≈ $1,500 (mandatory plate exchange finished 30 Jun 2026) |
| **Baja California** | No for ordinary cars (press reports a ≈ $685,000 threshold for "high-value" cars; not confirmed in the 2026 Ley de Ingresos) | — | $1,167.33 ("revalidación"); liability insurance required to renew | ≈ $1,700 |
| **Chihuahua** | No | — | "Revalidación" $2,325–$2,529 for 2021+ models (price rises by month) | ≈ $2,600 (control vehicular + plates + tarjeta) |
| **Otro estado** | Assume none (Aguascalientes, BCS, Campeche, Chiapas, Coahuila, Michoacán, Nayarit, SLP, Sonora, Tamaulipas, Zacatecas do not charge; Colima, Durango, Guerrero, Hidalgo, Morelos, Oaxaca, Quintana Roo, Sinaloa, Tabasco, Tlaxcala charge with subsidies) | — | ≈ $1,000 | ≈ $1,500 |

Programmer formula (CDMX/Edomex):
```
valor = list / 1.16                                   // pre-IVA, ISAN inside
tenencia_year0 = (EV or hybrid) ? 0
               : (list <= 638000 && paidOnTime) ? 0
               : 0.03 * valor * monthFactor[purchaseMonth]
tenencia_yearN = 0.03 * valor * dep[N]  (same exemption test on the depreciated value incl. IVA)
```
Worked: Tiguan R-Line, list $795,790, bought in CDMX in October 2026 → valor $686,026 → full-year tenencia $20,581, 2026 prorated $5,145; 2027: $17,494; 2028: $14,921. A Sealion 7 at $949,800 pays $0 (EV).

### 2.3 Verification, holograms and Hoy No Circula (Megalópolis: CDMX, Edomex, Hidalgo, Morelos, Puebla, Tlaxcala, Querétaro)

- Every petrol/diesel car verifies its emissions **twice a year**; CDMX price for H2 2026 is **$765** per visit (Edomex ≈ $730). 
- **New cars get the "00" hologram**, obtained once at a verificentro within 180 days of the invoice ($765): no further verification and **exempt from Hoy No Circula for 2 years**, then hologram "0" (one verification a year, still exempt from the weekday ban) while the car is under ~8 years old and passes.
- **EVs and hybrids get the "E" (exento) hologram**: no verification, permanently exempt from Hoy No Circula and from the "doble Hoy No Circula" smog-alert bans; also 50 % off CDMX plates ($486). This, plus zero ISAN and zero tenencia, is the real EV/hybrid incentive package in the capital.
- Outside the Megalópolis most states have no verification programme at all (Nuevo León, Jalisco, Guanajuato and Baja California have voluntary or loosely enforced schemes).

### 2.4 Insurance

Not compulsory nationwide except third-party liability on federal highways and in some states (Baja California demands it to renew plates), but any financed car must carry **cobertura amplia** (comprehensive) named to the lender. Typical annual premiums in 2026 (miituo/SI.MX quotes, CDMX, 35–45-year-old driver):

- Limitada (theft + liability): $6,000–$9,600 a year.
- Amplia: **$8,800–$18,000 for a $300k–$500k car**, roughly **2.5–4 % of value**; $20,000–$35,000 (3–4 %) for a $700k–$1M SUV; 4–6 % for the most-stolen models (Versa, NP300/Frontier, Aveo, Hilux, Tsuru-era pickups) and for Chinese brands/EVs where parts are slow; premium brands above $1.5M about 2.5–3 %. Edomex and Puebla quote 10–20 % above CDMX; Guadalajara/Monterrey/Mérida cheaper. Deductibles 5 % (damage) and 10 % (theft) are the norm.
- Budget a **one-year comprehensive premium of 3.5 % of list** as the default in the calculator.

### 2.5 Dealer fees and add-ons

- "Gastos de gestoría" (dealer does the plates for you): $1,500–$6,000, negotiable; you can plate the car yourself for the state fee only.
- Dealers push "seguro de la agencia" (often 10–20 % dearer than online quotes), GAP insurance ($3,000–$8,000), "garantía extendida" and accessory packs (film, alarm, mats: $5,000–$20,000). None is mandatory.
- Financing "comisión por apertura" 1–3 % of the amount financed (some captives 0 %).

### 2.6 Worked examples (CDMX, September 2026)

| | Nissan Versa Advance CVT | Toyota RAV4 XLE HEV | VW Tiguan R-Line | BYD Sealion 7 |
|---|---|---|---|---|
| List (IVA + ISAN inside) | $439,900 | $712,000 | $795,790 | $949,800 |
| of which ISAN already paid | ≈ $3,750 (50 % band) | $0 (hybrid) | ≈ $36,100 | $0 (EV) |
| Alta de placas + tarjeta | $972 | $486 (hybrid rate) | $972 | $486 |
| Holograma 00 / E | $765 | $0 (E) | $765 | $0 (E) |
| Tenencia 2026 (bought Sept, factor 0.33) | $0 (≤ $638k) | $0 (hybrid) | $6,792 | $0 |
| Insurance year 1 (3.5 %; 4 % for the Chinese EV) | $15,397 | $24,920 | $27,853 | $37,992 |
| **Drive-away year 1, CDMX** | **$457,034** | **$737,406** | **$832,172** | **$988,278** |
| Same car in Monterrey (no tenencia, no verification, alta ≈ $2,500) | $457,797 | $739,420 | $826,143 | $990,292 |

### 2.7 Regions for the dropdown (suggest 12)

Ciudad de México · Estado de México · Jalisco · Nuevo León · Guanajuato · Puebla · Querétaro · Veracruz · Yucatán · Baja California · Chihuahua · Otro estado. CDMX and Edomex share the $638,000 cap but differ on hybrids (CDMX exempts all hybrids, Edomex only < 100 g/km) and refrendo ($760 vs $990); Nuevo León is the "no tenencia but $4,106 refrendo" case; Querétaro and Guanajuato show the high-value-only pattern; Veracruz/Puebla the "free if you pay by March" pattern; Chihuahua/BC the north-border high-refrendo, no-tenencia pattern.

## 3. EV / hybrid incentives in force (September 2026)

Federal:
- **ISAN exemption** for BEVs, PHEVs, HEVs and hydrogen cars (worth 2–10 % of the pre-tax price; e.g. ≈ $70,000 on a $900,000 SUV).
- **Import tariff:** since 1 January 2026 cars from countries without a trade agreement (China above all, also India-built cars from some brands) pay **50 % duty** (up from 20 %); the earlier 0 % tariff for Chinese EVs ended in 2024. Brands stocked up in Q4 2025, so the visible price effect was small in H1 2026 and is expected to show in late-2026/2027 model years. Cars built in Mexico, the US/Canada (T-MEC), the EU, Japan, Korea, Brazil/Argentina (ACE-55) and Thailand (no: Thailand has no FTA, but Toyota/Isuzu pickups enter under special programmes) are not affected.
- **ISR/depreciation:** companies may depreciate EVs/PHEVs up to $250,000 (vs $175,000 for ICE) per year; irrelevant to private buyers.
- No federal purchase rebate exists. Home-charger installation has no subsidy; CFE will install a separate meter for a charger on request.

State/city:
- **CDMX:** tenencia 0 % for EVs and hybrids; plates at half price ($486); hologram E (no verification, no Hoy No Circula); some free/discounted parking meters.
- **Edomex:** tenencia exempt for EVs and for hybrids under 100 g/km CO2; hologram E.
- **Puebla, Guanajuato, Querétaro, Hidalgo, Veracruz:** EVs/hybrids exempt from tenencia (where charged) or from the verification programme.
- **Nuevo León:** no exemption; EVs actually pay 17.5 UMA refrendo (≈ $2,053) versus 35 UMA for petrol cars, a half-price concession.
- **Jalisco:** EVs get a free "placa verde" and free plate exchange; no tenencia anyway.
- Public charging: Tesla Superchargers, VEMO, Evergo, BYD and dealer networks charge **$8–12 per kWh** on DC fast chargers; CFE home rates are the ones in section 5.

## 4. Dealer discount climate, September 2026

Context: the market runs at about 1.45–1.5 million units a year (2025 record 1.55 M, 2026 flat to slightly down); Nissan, Chevrolet, VW, Toyota and Kia lead; Chinese brands hold about 20–22 % of sales (BYD, MG, Chirey/Omoda/Jaecoo, GWM, Geely, Changan, JAC) and the 50 % tariff has not yet pushed their prices up because they absorbed it and cut bonos instead of list prices. Financing promos matter more than list discounts in Mexico: the "precio especial con crédito" (Nissan V-Drive $45,000 off, Chirey $30,000–$50,000 "precio especial", MG loyalty bonos $30,000) is how discounting is done.

| Segment | Typical discount off list | Notes |
|---|---|---|
| **Hot (0–2 %)**: Nissan Versa/NP300, Toyota Hilux 2027, RAV4, CX-5 2026, Kia Seltos 2027, Suzuki Jimny, Tesla, Porsche 911/718, Land Rover Defender/Range Rover, G-Class, BYD King | Nothing, or a free accessory pack | Waiting lists on Jimny, RAV4 PHEV, Hilux diesel auto, GR models |
| **Steady (2–5 %)**: most Nissan/Toyota/Honda/Mazda/Kia/Hyundai/VW volume models | $10,000–$30,000 bonos, or subsidised 0–9.9 % financing, or free first service | Ask for the "precio de contado" and the "bono de marca"; end of month and end of quarter matter |
| **Deals (6–15 %)**: **Chinese brands** (Chirey bonos $30k–$50k ≈ 8–15 %, MG, GWM, Geely, JAC, Jetour year-end clearances), slow sellers (Chevrolet Trax/Blazer/Equinox EV, Ford Explorer/Edge, Jeep Compass/Renegade, Dodge, Alfa, Infiniti, Mitsubishi Outlander Sport, sedans generally), EVs from legacy brands (Mercedes EQ, BMW iX, Mach-E, Blazer EV), run-out models (Kia Telluride, VW Amarok, Mazda 2/CX-3, Audi Q8 e-tron, BMW X4, Outback) | 6–15 %, occasionally 20 % on aged 2025 stock | **El Buen Fin** (mid-November) and the December "remate de modelos 2026" are the two big discount windows; "0 % de interés a 12–36 meses" is the usual form |

## 5. Running costs and finance (September 2026)

- **Fuel, national averages 27 Sep 2026 (CNE/PROFECO daily report):** Magna (regular, 87 oct) **$23.69/L**; Premium (91–92 oct) **$28.58/L**; Diesel **$27.01/L**. CDMX $23.81 / $28.80 / $26.97; Edomex $23.65 / $28.16 / $26.75; the north border (Tijuana, Ciudad Juárez) runs $1–2 cheaper because of the IEPS border stimulus. The voluntary "Magna at $24 max" agreement between the government and retailers (Feb 2025) still holds. LPG/CNG conversions are rare on new cars; ignore.
- **Electricity (CFE, 2026 tariffs):** Tarifa 1 (subsidised domestic) basic block **$0.987/kWh**, intermediate **$1.198/kWh**, excess **$3.218/kWh**; a home that charges an EV usually crosses the 250 kWh/month (Tarifa 1; 400 in 1B, 850 in 1C) average and drops into **DAC at ≈ $6.20/kWh** plus a fixed charge. Use **$2.50/kWh** as a blended home figure for an EV that adds ~250 kWh/month, $6.20/kWh for DAC households, $10/kWh for public fast charging.
- **Annual distance:** 15,000 km is the standard assumption (AMIS/AMDA use 15,000–18,000; CDMX commuters run higher).
- **Loans:** banks 12.99–15.5 % annual (BBVA 12.99 % for hybrids/EVs, 14.99 % conventional, 9.99 % with payroll; Banorte 13.49 %, Banco del Bajío 13.8 %, HSBC 13.9 %, Scotiabank 14.5 %, Santander 15.49 %), **CAT 19–26 %**; captive finance arms (NR Finance/CrediNissan, Toyota Financial, GM Financial, VW Financial, Ford Credit, Kia Finance) 16–18 % list rate but with subsidised promos of **0–9.9 %** on selected models and terms (BYD/Denza via Banorte 7.88 %). **Enganche 10–20 %** (5 % minimum at some banks, 20 % for the best rate), **plazos 12–72 months** (60 is the norm), comisión por apertura 1–3 %, comprehensive insurance and life cover mandatory and usually financed into the loan. "Arrendamiento puro" (lease) is common above $700,000 for tax reasons.
- Exchange rate context: about 18.3–18.8 MXN per USD through September 2026.

## 6. Glossary for a first-time buyer

- **Precio de lista / precio sugerido:** the brand's published price for a version; already includes IVA and ISAN; excludes plates, tenencia, insurance.
- **IVA:** 16 % value-added tax, inside every list price.
- **ISAN (Impuesto Sobre Automóviles Nuevos):** federal progressive tax of 2–17 % on the pre-tax price, hidden in the list price; cars under ≈ $414,000 list, all EVs and all hybrids pay none.
- **Tenencia:** annual state ownership tax, 3 % of the pre-IVA value depreciating each year; abolished in half the states and subsidised for cars under $638,000 in CDMX/Edomex.
- **Refrendo:** the yearly plate-renewal fee ($700–$4,100 depending on the state) paid in Jan–Mar; paying it on time is what unlocks the tenencia subsidy.
- **Alta de placas / tarjeta de circulación:** first registration and the registration card; $972 in CDMX, $1,194 in Edomex, done within 30 days.
- **Verificación / holograma 00, 0, 1, 2, E:** the twice-yearly emissions test in the Megalópolis; 00 = new car exempt two years, E = electric/hybrid exempt forever.
- **Hoy No Circula:** the weekday driving ban by plate digit in CDMX/Edomex; holograms 00, 0 and E are exempt.
- **Enganche:** down payment, usually 10–20 %.
- **CAT (Costo Anual Total):** the all-in annualised cost of a loan (interest + fees + insurance), the number to compare, typically 19–26 %.
- **Bono / precio especial:** manufacturer or dealer cash discount, often conditional on financing with the captive lender.
- **Cobertura amplia / limitada:** comprehensive vs theft-and-liability insurance; lenders require amplia.
- **Gestoría:** the dealer's paperwork fee for plating the car; optional and negotiable.
- **Rendimiento (km/L):** fuel economy is quoted in kilometres per litre from the CONUEE Ecovehículos label; 20 km/L = 5.0 L/100 km.
- **Hecho en México / importado:** where the car is built decides the tariff exposure (Chinese-built cars carry the 50 % duty since 2026) and often the warranty logistics.
- **T-MEC:** the USMCA trade agreement; cars built in Mexico/US/Canada cross tariff-free.

## 7. Sources

- SAT, Anexo 15 RMF 2026 (ISAN tariff, reduction threshold, Art. 8 exemption amounts): https://www.sat.gob.mx/minisitio/NormatividadRMFyRGCE/documentos2026/rmf/anexos/Anexo-15-RMF-2026_DOF-2812225.pdf
- Ley Federal del ISAN (structure of Art. 2, 3 and 8): https://www.diputados.gob.mx/LeyesBiblio/pdf/LFISAN.pdf and https://sdv.com.mx/compendio/ley-isan/articulo-2/
- ISAN not itemised on the CFDI / IVA on ISAN-inclusive price: https://idconline.mx/fiscal-contable/2023/05/05/como-se-refleja-el-isan-en-los-cfdi
- VW México price footnote (IVA + ISAN included): https://www.vw.com.mx/es.html
- CDMX tenencia 3 % rule, valor total definition, month factors, depreciation ladder, EV 0 %: https://transparencia.finanzas.cdmx.gob.mx/repositorio/public/upload/repositorio/Tesoreria/123/b/Criterio_9/123_XV_Impuesto_sobre_tenencia_o_%20uso_de_vehiculos_2024.pdf
- CDMX 2026 subsidy cap $638,000, refrendo $760, extension to 30 June: https://www.finanzas.cdmx.gob.mx/comunicacion/noticias/inician-descuentos-en-pago-de-predial-agua-y-tenencia-en-la-cdmx ; https://www.elfinanciero.com.mx/cdmx/2026/04/28/tenencia-cdmx-2026-extienden-3-meses-mas-el-100-de-descuento-hasta-cuando-aplica/ ; https://expansion.mx/empresas/2025/12/04/que-autos-no-pagaran-tenencia-cdmx-2026-nuevo-tope ; https://miituo.com/blog/tenencia-y-refrendo-cdmx/
- Edomex 2026 (cap $638,000 incl. IVA, plates 2021+/2020, refrendo $990, deadline 6 April): https://mvsnoticias.com/nacional/estados/2026/1/22/tenencia-edomex-2026-requisitos-costos-fecha-limite-para-obtener-el-subsidio-del-100-721131.html ; https://www.motorpasion.com.mx/industria/estado-mexico-sube-precio-limite-para-autos-que-pagan-tenencia
- State-by-state tenencia/refrendo (Querétaro, Puebla, Jalisco, Nuevo León, Guanajuato, Chihuahua, Veracruz, Yucatán, Baja California): https://www.tenenciavehicular.com.mx/ and its state pages (/adeudos/queretaro, /puebla, /jalisco, /nuevo-leon, /guanajuato, /chihuahua, /veracruz, /yucatan, /baja-california); https://www.creditea.mx/blog/post/que-carros-pagan-tenencia ; https://www.record.com.mx/historia/tenencia-vehicular-2026-en-mexico-requisitos-para-no-pagar-y-fecha-limite-2026011918304003167
- Alta de placas 2026: https://motormania.com.mx/noticias/destacado/cuanto-cuesta-sacar-placas-nuevas-cdmx-2026-tramite-digital/ ; https://www.informador.mx/economia/costos-y-requisitos-para-dar-de-alta-placas-nuevas-por-estado-20260219-0112.html
- Verificación CDMX 2026 price: https://verificentroscdmx.com/precios-verificacion-cdmx/
- Fuel prices 27 Sep 2026: https://www.tvazteca.com/aztecanoticias/precio-gasolina-hoy-27-septiembre-2026-litro-premium-magna-diesel-a-cuanto-esta-mexico-cdxmx-edomex/ ; https://www.infobae.com/mexico/2026/09/27/precios-de-la-gasolina-hoy-en-mexico-litro-de-magna-premium-y-diesel-este-domingo-27-de-septiembre/
- CFE tariffs 2026: https://www.calcele.com/guias/cfe/tarifas-electricas/
- Car-loan rates 2026: https://compreauto.mx/credito-automotriz-mexico-2026-tasas-bancos-como-elegir ; https://bancario.com.mx/credito-automotriz
- Insurance costs 2026: https://miituo.com/blog/cuanto-cuesta-un-seguro-de-auto/
- 50 % tariff on Chinese cars from Jan 2026: https://expansion.mx/empresas/2026/01/14/autos-chinos-en-mexico-se-encarecen ; https://www.motorpasion.com.mx/industria/aranceles-frenan-a-autos-chinos-mexico-lograron-abaratar-caro-no-tiene-que-ver-poco-que-cuesta-fabricarlos
- Prices: Autocosmos catalog pages (https://www.autocosmos.com.mx/catalogo/vigente/<brand>/<model>), brand sites (nissan.com.mx, kia.com/mx, chirey.mx, byd.com/mx, tesla.com/es_mx), Autocosmos/Motorpasión México/El Universal launch articles cited in the row notes (Kait, Venue 2027, Seltos 2027, King 2027, Yuan Pro DM-i, Haval H7, Hilux 2027, RAV4 2026, Ranger 2027, Jetta 2027).
