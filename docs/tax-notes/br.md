# Brazil (br) — on-road math and market notes, late September 2026

Currency BRL ("R$"). Prices in `data/cars_br.json` are integer reais, the **preço público sugerido** (also "preço de tabela") that each brand publishes for the **São Paulo tabela** — cheapest and dearest version of each nameplate, solid paint, no dealer accessories, before the monthly "bônus"/promo prices. Efficiency columns: combined consumption in L/100 km converted from the **gasoline** km/L on the INMETRO/PBEV label (`l100 = 100 ÷ km/L`; where only the city figure was found the combined value was approximated as city × 1.08 for petrol/diesel and city × 0.97 for hybrids). Brazil's label also quotes an **ethanol** figure, always about 30 % worse (every "Petrol" row from a Brazilian plant is flex — see §5 for the 70 % rule). For PHEVs `l100` is the hybrid-mode (charge-sustaining) figure, not the weighted PBEV number. `co2` is the label/approximated gasoline CO2 (2.32 kg per litre, 2.65 for diesel); it is informational — no Brazilian tax uses CO2 except the 83 g/km threshold of the Carro Sustentável IPI rule. EV/PHEV range is the PBEV/INMETRO km when the brand publishes it; notes say when a figure is NEDC/CLTC/WLTP or an estimate.

## 1. What the preço público sugerido already includes

The tabela price is a **retail price with every tax inside it**:

- **IPI** (federal excise) — since 1 Nov 2025 the "IPI Verde" rates of Decreto 12.549/2025 (see §2.1), from 0 % to about 20 %. Charged on the factory/importer price.
- **PIS/COFINS** — vehicle makers pay the "monofásico" 2 % + 9.6 % = **11.6 %** on their sale price (Lei 10.485/2002, with a 30.2 % base reduction for cars sold to dealers, so ≈ 8.1 % effective); dealers pay nothing further. Roughly 6–8 % of the sticker.
- **ICMS** (state VAT, "por dentro") — on new cars São Paulo charges **12 %** (RICMS/SP art. 54, XV; the general SP rate is 18 % but vehicles are on the 12 % list). Most states apply the same 12 % effective load to NCM 87.03 vehicles (MG, PR, SC, RS, BA, PE, CE, GO, DF…); Rio adds its 2 % FECP surcharge on many goods (verify for cars), some northern/north-eastern states charge 17–20 % on vehicles, and Manaus/Amapá free-trade zones are cheaper. ICMS is collected by substituição tributária at the factory (Convênio ICMS 199/2019), so the dealer invoice shows it but the buyer never pays it separately.
- **Frete (delivery)** — brand tabelas are "preço sugerido com frete incluso" for the state of São Paulo. A dealer that adds "frete" or "taxa de entrega" (typically R$ 1,500–4,000) on a car whose price already says *frete incluso* is double charging; the only legitimate delivery add-on is for cars ordered to distant states where the brand's regional tabela is higher.
- **Import duty** for CBUs (35 %, see §3) is inside the importer's price too.

So `list = P × (1 + IPI) × (1 + PIS/COFINS) ÷ (1 − ICMS)` roughly; the total tax share of a Brazilian car is 30–45 % of the sticker (Anfavea/Fenabrave figures: ≈ 33 % on a national 1.0 hatch, 40 %+ on an imported petrol SUV, 45 %+ on a diesel SUV).

**Why the same car costs a different amount in another state:** the brand publishes one SP tabela and a few regional ones. In practice: SP, MG, PR, SC, RS, GO, DF, BA, PE and CE quote the SP price (±0–1 %); Rio de Janeiro often +1–2 %; Amazonas (Manaus) and Amapá −3 to −8 % (Zona Franca ICMS treatment); remote northern states +2–6 % for logistics. The buyer pays the price of the state where the car is invoiced/registered, so the app can apply a `regionFactor` of 1.00 for the dropdown states, 1.015 for RJ and 0.95 for "Outro estado – Manaus/Macapá".

**What the list price does NOT include** (what the buyer adds): emplacamento (registration, plates, licensing), first-year IPVA, insurance, financing costs, and any dealer add-ons.

## 2. From list price to on-the-road

### 2.1 IPI Verde — how the federal excise inside the price is built (Decreto 12.549/2025, in force since 1 Nov 2025, valid to 31 Dec 2026 for the 0 % tier)

Base rate **6.3 %** for passenger cars (NCM 87.03) and **3.9 %** for light commercials/pickups (87.04). Then add/subtract:

| Fuel / propulsion (cars) | pp |
|---|---|
| Ethanol-only | −0.5 |
| Flex (petrol/ethanol) | 0 |
| Petrol-only | **+6.5** |
| Diesel | **+12.0** |
| PHEV flex/ethanol −2.0 · HEV flex −1.5 · MHEV flex −1.0 | |
| PHEV petrol +2.0 · HEV petrol +3.0 · MHEV petrol +4.5 | |
| PHEV diesel +3.0 · HEV diesel +4.0 · MHEV diesel +5.5 | |
| Battery EV | −2.0 |

Power malus (as reported by the trade press; check the decree annex): up to 85 kW (≈115 cv) 0; 85–132 kW (116–180 cv) +0.75; 132–180 kW (181–245 cv) +1.5; above 180 kW +3.0. This is why Onix/Tracker/i20/Creta 1.0 turbos were downrated to 115 cv and the T270/Tiggo 7/8 to 176–180 cv for MY2027. Bonuses: energy efficiency up to −2.0, ESC/AEB/side-impact package −1.0, recyclability up to −2.0; Mover/Rota 2030 efficiency credits can shave 1–2 pp more until Oct 2027. Floor 0 %.

**Carro Sustentável = 0 % IPI** (companion decree signed 10 Jul 2025 under Programa Mover): compact cars built in Brazil (welding, painting, engine and assembly here), < 83 g CO2/km on the PBEV label, > 80 % recyclable, low power. Beneficiaries: Mobi, Argo 1.0, Cronos 1.0, Kwid, C3 1.0, Onix/Onix Plus 1.0, HB20/HB20S 1.0, i20 1.0, Polo Track/Robust, Tera MPI, Basalt 1.0. Valid through Dec 2026 — prices of these cars may rise in 2027 unless it is renewed.

Worked rates (already inside the tabela): 1.0 flex hatch with bonuses 0–2.2 %; 1.0 turbo flex 115 cv ≈ 3.5–4.5 %; 1.3 turbo 176 cv flex ≈ 5–6 %; Corolla Cross Hybrid flex ≈ 2.8 %; imported BEV ≈ 2.5–4.3 %; petrol-only 1.6 turbo 177 cv (Tucson, Creta 2025) ≈ 13–15.8 %; BMW X5 50e petrol PHEV 14.8 %; SW4 2.8 diesel 204 cv ≈ 19.8 %. Diesel pickups start from the 3.9 % base, which is why the diesel malus hits SUVs (SW4, Trailblazer, Commander diesel) harder than the Hilux/S10.

### 2.2 Import duty (Imposto de Importação) — inside CBU prices

- Combustion cars from outside Mercosur/Mexico: **35 %** (the tariff ceiling) on CIF value, before IPI/PIS/COFINS/ICMS pile on top.
- Electrified cars: the GECEX phase-in ended on **1 July 2026 — 35 % for BEV, PHEV and HEV** (BEV went 10 % Jan-24 → 18 % Jul-24 → 25 % Jul-25 → 35 % Jul-26; PHEV 12/20/28/35; HEV 12/25/30/35). The duty-free import quotas (US$ 463 M in total) also expired in July 2026. Trade press expected ≈ 10 % price rises on imported EVs; in practice BYD/GWM/GAC/Chery absorbed most of it (Camaçari, Iracemápolis, Anápolis, Ceará plants) and imported EVs from legacy brands sit on 2025 stock with discounts instead.
- Mercosur (Argentina) and Mexico (ACE-55) cars enter duty-free: Cronos, Titano, Amarok, Frontier, Ranger, Taos, Dakota (Argentina); Versa, Sentra, Jetta, Equinox, ZR-V, Maverick, Bronco Sport, Silverado, Q5, CLA (Mexico). Everything from China, Japan, Korea, Thailand, the US and Europe pays the 35 %.

### 2.3 Emplacamento — first registration, plates, licensing (state, paid once at delivery)

Done through the dealer/despachante within 30 days of the invoice. Components (2026):

- **Taxa de registro/1º emplacamento + CRLV-e** at the state Detran: SP R$ 469.91 (includes the first annual licenciamento); RJ ≈ R$ 293 licenciamento + ≈ R$ 150 first registration; MG ≈ R$ 330; PR ≈ R$ 300; RS ≈ R$ 340; SC ≈ R$ 280; BA ≈ R$ 300; DF ≈ R$ 330; GO ≈ R$ 250; PE ≈ R$ 260; CE ≈ R$ 250 (Detran tables; ±10 %).
- **Placas Mercosul** (pair, stamped by an accredited estampadora): R$ 200–330 depending on the state (SP ≈ R$ 250–300, RJ R$ 140–250, MG ≈ R$ 230).
- **Vistoria** (only some states/models): R$ 100–180.
- **Despachante/dealer paperwork fee**: R$ 300–800 (SP dealers usually bundle "emplacamento" at R$ 1,500–3,000 including plates and IPVA handling; you can do it yourself at the Detran for the government fees only).

Typical all-in (government fees + plates + despachante, excluding IPVA): **SP R$ 1,100–1,700 · RJ R$ 900–1,500 · MG R$ 900–1,400 · PR R$ 800–1,300 · RS R$ 900–1,400 · SC R$ 800–1,200 · BA R$ 800–1,300 · DF R$ 900–1,400 · GO R$ 700–1,200 · PE R$ 700–1,200 · CE R$ 700–1,200 · other states R$ 700–1,500**. Use the mid-point in the calculator; it is < 1.5 % of any car's price.

Personalised plates (SP, RJ, MG, PR…): extra R$ 700–4,000, optional. Annual licenciamento afterwards: SP ≈ R$ 176 (2026), RJ ≈ R$ 293, MG ≈ R$ 150, PR ≈ R$ 120, RS ≈ R$ 150.

### 2.4 IPVA — the annual state ownership tax, prorated in year 1 (the big regional variable)

Base = **invoice value (nota fiscal)** for a new car in year 1, then the FIPE value each following year. Year-1 tax is **prorated by the months (some states: days) left in the calendar year counting the invoice month** and is due within 30 days of the invoice, before the plates are issued. Rates for passenger cars in 2026 and the EV/hybrid rules:

| State (dropdown) | IPVA cars 2026 | EV rule 2026 | Hybrid rule 2026 | Emplacamento (fees+plates+despachante, no IPVA) |
|---|---|---|---|---|
| **São Paulo** | **4 %** (the January single-quota payment earns a 3 % discount on the tax; the rate itself stays 4 %) | 4 % — **no exemption for pure EVs** (a refund of up to R$ 10.8k exists only for EVs under R$ 150k in app-driver/fleet programmes; ignore for retail) | **0 % for flex/ethanol hybrids and hydrogen cars up to R$ 261,154 (2026 cap, was R$ 250k)** — i.e. Corolla Hybrid, Corolla Cross Hybrid, Yaris Cross Hybrid, Haval H6 HEV flex, BYD Atto 2/Song Pro/King DM-i Flex qualify; petrol hybrids (Civic, CR-V, Kona, RAV4) pay 4 %. Exemption runs to 31 Dec 2026, then 1 % (2027), 2 %, 3 %, 4 % by 2030 | R$ 1,100–1,700 |
| **Rio de Janeiro** | 4 % | **0.5 %** | **1.5 %** (any hybrid) | R$ 900–1,500 |
| **Minas Gerais** | 4 % | 4 % (no benefit for imported/other-state EVs) | 0 % only for **flex hybrids built in Minas** (Fiat Pulse/Fastback T200 Hybrid, Argo X hybrid); others 4 % | R$ 900–1,400 |
| **Paraná** | **1.9 %** (cut from 3.5 % in 2026 for all cars) | 0 % (EVs exempt) | 1.9 % | R$ 800–1,300 |
| **Rio Grande do Sul** | 3 % | 0 % (EVs exempt) | 3 % | R$ 900–1,400 |
| **Santa Catarina** | 2 % | 2 % (no incentive) | 2 % | R$ 800–1,200 |
| **Bahia** | 2.5 % | 0 % up to a **R$ 300,000** vehicle value, else 2.5 % | 2.5 % | R$ 800–1,300 |
| **Distrito Federal** | 3.5 % (some 2026 tables show 3 %; verify on the DF Economia site) | 0 % (EVs exempt; hybrids bought at DF dealers also exempt) | 0 %/3.5 % | R$ 900–1,400 |
| **Goiás** | 3.75 % (3 % for lower-power cars; verify) | 3.75 % (exemption bill still pending) | 3.75 % | R$ 700–1,200 |
| **Pernambuco** | 2.4 % | 0 % (EVs exempt) | 2.4 % | R$ 700–1,200 |
| **Ceará** | 3.5 % (2.5–3.5 % by power) | **2 %** reduced rate for EVs | reduced rate for hybrids | R$ 700–1,200 |
| **Outro estado** | 2–3 % typical (ES/AC/TO 2 %, PB/PA 2.5 %, RN/RR/RO/MS/AP 3 %, AM 1.5 %) | many exempt: RN, PB, MA, PI (1 %), SE, AC, TO (to end-2026), AL/AP/MS (year-1 only), PA (≤ R$ 150k) | varies | R$ 700–1,500 |

Programmer formula:
```
rate = stateRate[state]
if EV and evRule[state]=="exempt" (or value cap satisfied): rate = evRate[state]   // SP 4, RJ 0.5, PR/RS/DF/PE/BA<=300k 0, CE 2, MG 4
if Hybrid: rate = hybridRate[state]   // SP 0 if flex hybrid and list<=261154 else 4; RJ 1.5; MG 0 if MG-built flex hybrid else 4
ipva_year1 = list × rate × monthsRemaining/12   // purchase in Sept 2026 → 4/12 (SP counts the invoice month)
ipva_year2 = fipeValue × rate  (FIPE of a 1-year-old car ≈ 85–90 % of list)
```
Worked: Polo Track R$ 96,690 bought in SP in Sept 2026 → 4 % × 4/12 = **R$ 1,289** now, ≈ R$ 3,400 in Jan 2027. BYD Dolphin Mini GS R$ 119,990: SP R$ 1,600 (no EV break) vs Rio R$ 200 (0.5 %) vs Paraná/RS/DF/PE R$ 0. Corolla Cross Hybrid R$ 223,790: SP R$ 0 (flex hybrid ≤ R$ 261k), MG R$ 2,984, RJ R$ 1,119. Payment: single quota (3 % discount in SP if paid in the January window in later years) or 3–5 instalments; many states let you pay by card in 12x with fees.

### 2.5 Seguro obrigatório — none in 2026

DPVAT was extinguished in 2020, the SPVAT that replaced it (LC 207/2024) was **revoked by LC 211 of 2 Jan 2025 before ever being charged**, and no compulsory vehicle insurance exists in 2025–2026 (news items claiming "SPVAT volta em 2026" are wrong). Put **R$ 0**. Victims of accidents up to 2025 still claim the old fund through Caixa.

### 2.6 Insurance (voluntary comprehensive — "seguro auto compreensivo")

Not mandatory, but any financed car must carry it (named to the bank). 2026 quotes (Minuto Seguros/Meu Seguro Mais Barato/Porto data, 35–45-year-old driver, garage at home):

- **National hatch/sedan/compact SUV under R$ 150k: 4–6 % of the FIPE value per year** in São Paulo and Rio (Onix/HB20/Polo/Argo/Strada are among the most stolen, so they price at the top of that band), 3–4 % in Curitiba, Porto Alegre, Belo Horizonte, Brasília, Goiânia, Florianópolis, 3–5 % in Salvador/Recife/Fortaleza.
- **R$ 150–300k SUVs/pickups: 3–5 %** (Hilux, S10, Ranger and Compass at the top; Toyota/Honda hybrids 3–4 %).
- **Chinese EVs/PHEVs: 4–7 %** in SP/RJ — battery is a large share of value, parts still come from China, so BYD Dolphin Mini quotes R$ 4–7k, Song Plus R$ 8–12k, Seal R$ 12–18k; GWM/BYD now sell subsidised "seguro incluso" or fixed-price policies with the car (GAC includes one free year on the Aion UT).
- **Premium (> R$ 400k): 2.5–4 %**; exotics 2–3 % (agreed value).
- Deductibles ("franquia") 5–10 % of the value are standard; "seguro popular" (recycled parts) is 20–30 % cheaper; Porto/Azul/Tokio/Allianz/Bradesco/HDI/Suhai are the main insurers; roughly a third of Brazilian cars are insured at all, so this is optional in the calculator with a default of **5 % of list in SP/RJ and 4 % elsewhere, +1 pp for Chinese EVs**.

### 2.7 Dealer fees and add-ons

- "Emplacamento" package: R$ 1,500–3,500 (negotiable; the government part is ≈ R$ 800–1,000).
- Forced accessories ("kit": película, tapetes, protetor de cárter, alarme): R$ 2,000–8,000 — refuse; Procon considers tying illegal (venda casada).
- Financing: TAC/"tarifa de cadastro" up to R$ 1,000 and **IOF 0.38 % + 0.0082 %/day (≈ 3.4 % a year, capped) on the financed amount**, registration of the lien ("gravame") R$ 150–450 by state, plus "seguro prestamista"/GAP pushed at signing.
- Paint: metallic/pearl R$ 1,500–3,500 over the tabela (Honda R$ 1,900; special colours R$ 2,200).

### 2.8 Worked examples (São Paulo, bought late September 2026, 4 months of IPVA)

| | VW Polo Track 1.0 | Toyota Corolla Cross XRX Hybrid | BYD Dolphin Mini GS | Toyota Hilux SRX |
|---|---|---|---|---|
| Tabela SP (all taxes + frete inside) | R$ 96,690 | R$ 223,790 | R$ 119,990 | R$ 346,890 |
| Typical Sept promo / bonus | −R$ 10,000 (trade-in bonus) | −R$ 0–8,000 | −R$ 10,000 (R$ 109,990) | −R$ 20,000 (varejo) |
| Emplacamento (Detran R$ 470 + plates R$ 280 + despachante R$ 500) | R$ 1,250 | R$ 1,250 | R$ 1,250 | R$ 1,250 |
| IPVA 2026 prorated (4/12) | R$ 1,289 (4 %) | R$ 0 (flex hybrid ≤ R$ 261k) | R$ 1,600 (4 %, SP gives EVs nothing) | R$ 4,625 (4 %) |
| Seguro obrigatório | R$ 0 | R$ 0 | R$ 0 | R$ 0 |
| Insurance year 1 (5 % / 4 % / 6 % / 4 %) | R$ 4,835 | R$ 8,950 | R$ 7,200 | R$ 13,900 |
| **Drive-away year 1 at list, SP** | **R$ 104,064** | **R$ 233,990** | **R$ 130,040** | **R$ 366,665** |
| Same car in Curitiba (PR: IPVA 1.9 %, EV 0 %, emplacamento R$ 1,050, insurance 3.5 % / 4.5 % EV) | R$ 101,736 | R$ 234,090 | R$ 126,440 | R$ 362,278 |
| Same car in Rio (price +1.5 %; IPVA 4 %, EV 0.5 %, hybrid 1.5 %; emplacamento R$ 1,200; insurance 5 % / 4 % / 6 % / 4 %) | R$ 105,556 | R$ 238,569 | R$ 130,500 | R$ 372,072 |

### 2.9 Regions for the dropdown (12)

São Paulo · Rio de Janeiro · Minas Gerais · Paraná · Rio Grande do Sul · Santa Catarina · Bahia · Distrito Federal · Goiás · Pernambuco · Ceará · Outro estado. SP is the reference tabela and the hybrid-flex exemption case; RJ is the "0.5 %/1.5 % electrified" case; MG the "only MG-built hybrids" case; PR the new 1.9 % low-rate state; RS/DF/PE the "EV exempt, normal rate otherwise" pattern; BA the value-capped EV exemption; SC/GO "no incentive"; CE reduced EV rate; "Outro estado" defaults to 3 %/EV exempt and lets the note explain Manaus pricing.

## 3. EV / hybrid incentives in force (September 2026)

Federal — there is **no purchase subsidy, rebate or tax credit for private buyers**. What exists:
- **IPI Verde** bonuses inside the price (BEV −2 pp, flex PHEV −2, flex HEV −1.5, flex MHEV −1) and the **0 % Carro Sustentável tier** for national compacts (none electric yet; the Camaçari Dolphin Mini/Atto 2 are expected to qualify once local content rules are met).
- **Programa Mover** (Lei 14.902/2024): R$ 19 bn of tax credits 2024–2028 for manufacturers that invest in R&D/decarbonisation — the reason BYD, GWM, Chery, GAC, Stellantis and Toyota localised production; indirect for buyers.
- **Import duty**: 35 % on all imported electrified cars since 1 Jul 2026 (quotas over) — a disincentive; locally built EVs/PHEVs (Dolphin Mini, Dolphin, Atto 2, King, Song Pro, Spark EUV, Captiva EV, Haval H6/H6 GT, Tiggo 7/8 PHEV, CS55 PHEV) avoid it.
- **Move Brasil** (MP 1.359, 19 May 2026): BNDES-backed credit (R$ 30 bn) for app drivers and taxi drivers on new flex/hybrid-flex/EV cars up to **R$ 150,000**, 60–72 months, 6-month grace, cheaper rates, plus brand discounts of R$ 10–57k (Fiat, VW, GM, Renault, Hyundai, BYD, GAC, Jeep…) and the existing **IPI + ICMS exemptions for taxi drivers and PcD buyers** (cars up to R$ 200k; e.g. Fastback T200 R$ 119,990 → R$ 99,790, Dolphin Mini GL → R$ 99,990). Retail buyers get none of this.
- **Rota 2030/Mover efficiency credits**: manufacturer-side only.

State/municipal:
- **IPVA**: see §2.4 — full EV exemptions in PR, RS, DF, PE, RN, PB, MA, PI (1 %), SE, AC, TO; 0.5 % RJ; 2 % CE; value-capped BA (≤ R$ 300k), PA (≤ R$ 150k); SP exempts only flex/ethanol hybrids ≤ R$ 261,154 (until 31 Dec 2026, then phased 1–4 % from 2027); MG only MG-built flex hybrids; SC, GO, ES, AM nothing (AM is 1.5 % for everyone).
- **São Paulo city rodízio**: registered EVs and hybrids are exempt from the weekday plate-number ban (municipal law of 2021, apply at the CET); some municipalities (Curitiba, Belo Horizonte, Brasília) offer free or discounted rotativo parking for EVs.
- **ICMS on EVs**: no state reduction beyond the 12 % vehicle rate; a few states (RS, PR, PE) exempt home-charger imports/wallboxes from ICMS.
- **Charging**: public DC networks (Tupinambá, Electra, EZVolt, Zletric, BYD, GWM, Shell Recharge) charge **R$ 2.50–4.50/kWh** (up to R$ 5+ on highways); home AC is the residential tariff in §5. Nothing is subsidised.

## 4. Dealer discount climate, September 2026

Context: the market is booming — 3.72 M autos+light commercials registered Jan–Aug 2026 (+15.3 %), 503.8k in August, on course for 2.7 M in 2026 (Fenabrave forecast +8 %). Unemployment is at a record low 5.3 %, the Selic is falling (13.75 % after the 16 Sep Copom cut), and **Chinese brands hold about 22–23 % of sales** (BYD #2 brand-wise with Dolphin Mini #2 model; five Chinese models in the top 20; Haval H6 in the top 10). The result is a **price war**: average transaction prices fell ≈ 3.5 % 2025→2026, brands cut MY2027 list prices (Kwid −R$ 2k, Kicks −R$ 10k, Kait −R$ 10k, Peugeot 208/2008 −R$ 13–22k, Yaris Cross −R$ 11–22k), Fiat runs a "Setembro Turbinado" with up to R$ 43.5k off, and used cars ≤ 3 years old lost 20 %+ in H1 2026. The tabela is a ceiling, not the price: **ask for the "preço promocional/à vista", the "bônus de fábrica" and the "supervalorização do usado" (trade-in bonus)**, and compare with the CNPJ/PcD tabela to see how much fat there is.

| Segment | Typical off list | Notes |
|---|---|---|
| **Hot (0–3 %)**: Polo/Tera/T-Cross, Onix, HB20, i20, Avenger (launch), Kardian, Corolla/Corolla Cross Hybrid, Yaris Cross Hybrid, RAV4, Hilux at list for individuals, Dolphin Mini GS, Sealion 7, Defender, Porsche, GR models | Free accessories or "taxa zero" with 50–60 % entrada | Waiting lists on Avenger, i20, Hilux automatics, hybrids in SP (IPVA-free), Jimny 5-door |
| **Steady (3–7 %)**: Argo/Cronos, Strada, Tracker/Montana, Creta, Kicks, Renegade, C3/Basalt, Kwid, Song Pro/King, Haval H6, Kardian, HR-V/City (pre-facelift) | R$ 5–12k bônus, 0.99 %/month or "taxa zero" promos, R$ 10k trade-in bonus (Polo Track, BYD) | Month-end and quarter-end matter; October is the run-out month for MY2026 stock |
| **Deals (8–20 %)**: Pulse/Fastback/Toro/Titano (R$ 20–43k), Compass/Commander (R$ 37–49k), Nivus/Taos/Tiguan, Yaris Cross flex, SW4 (R$ 25–46k), Outlander PHEV (R$ 55k), e-Vitara (R$ 50k), Equinox/Blazer EV, Palisade, Ioniq 5, Sentra, ZR-V/CR-V (R$ 43k), Eclipse Cross, Chinese EV importers (Zeekr, GAC, Geely, Ora 03, Yuan Pro/Plus, Seal, Tan/Han 2025 stock), all Mercedes/BMW/Volvo 2025-plate stock | 8–20 % cash, or "taxa zero 36x" with big entrada | CNPJ/rural producer tabelas run 10–25 % under retail; PcD/taxi tabelas 20–30 % under; "feirões" (dealer fairs) in Oct–Dec clear model-year stock |

Financing promos are the usual discount vehicle: "taxa zero" (0 %) in 12–36 months with 50–70 % entrada, or 0.99–1.29 %/month with 30–40 % entrada, all with the price locked at list.

## 5. Running costs and finance (September 2026)

- **Fuel, ANP weekly survey 20–26 Sep 2026 (national averages):** gasolina comum **R$ 6.59/L** (SP state R$ 6.42, SP city R$ 6.29); **etanol hidratado R$ 4.46/L national, R$ 3.86 in SP state (R$ 3.82 SP city), R$ 4.09 Southeast**; **diesel S10 ≈ R$ 7.05/L** (SP city R$ 7.08, Southeast R$ 7.04); gasolina aditivada ≈ R$ 6.75; GNV R$ 5.40/m³ (SP; CNG is a taxi/Rio/aftermarket thing — no new car is factory CNG). **The 70 % rule**: fill with ethanol when its price ≤ 0.70 × gasoline (ethanol has ≈ 30 % less energy; the PBEV label's ethanol km/L is what you will get). At today's SP prices (3.86/6.42 = 0.60) ethanol wins clearly in SP, MG, GO, MT, PR; at the national ratio (0.68) it is marginal; in the North/Northeast gasoline usually wins. For the calculator use the gasoline km/L in `l100` with the gasoline price, or divide the ethanol price by 0.70 to compare.
- **Electricity (home charging):** Enel SP residential tariff since Jul 2026 is **R$ 0.789/kWh before taxes, ≈ R$ 0.95–1.00/kWh with ICMS (12 % up to 200 kWh/month, 18 % above) and PIS/COFINS**; national residential average ≈ R$ 0.83/kWh pre-tax → **use R$ 1.00/kWh** all-in (Rio/Light ≈ R$ 1.05–1.25, MG Cemig ≈ R$ 1.00, PR Copel ≈ R$ 0.95, RS ≈ R$ 1.00, BA/GO ≈ R$ 1.05). **Tarifa Branca** (time-of-use, opt-in) in SP: off-peak 21:30–16:30 **R$ 0.669/kWh** pre-tax (≈ R$ 0.80 with taxes), intermediate R$ 0.985, peak 17:30–20:30 R$ 1.48 — an overnight-charged EV should use the R$ 0.80 figure. Bandeira tarifária adds R$ 1.885–7.877 per 100 kWh in yellow/red months (Sept 2026 was yellow, October green). Public DC: R$ 2.50–4.50/kWh.
- **Annual distance:** **12,900 km** in the first year is the KBB/Detran benchmark (SP/MG/SC ≈ 12–13k, Northeast ≈ 11k, Centre-West/North 15–17k); app drivers 50–70k. Use **13,000 km** default (12–15k range).
- **Loans (CDC):** Central Bank average rate for vehicle credit to individuals **27.7 % a year in Jan 2026 (≈ 2.05 %/month)**, drifting to ≈ 25–27 % a year (1.9–2.0 %/month) by September as the Selic came down from 15 % (held until Jan 2026) to **13.75 %** (16 Sep 2026). Captive banks (Banco Fiat/Stellantis, BV, Santander for BYD/GWM/Renault, Itaú for VW/Toyota/BYD, Bradesco/GM Financial, Toyota Financial, Honda Finance, Hyundai Finance, Mobi/Volvo Car Financial) quote **1.19–1.99 %/month (15–27 % a year) with 20–30 % entrada and 48–60 months**; promotional **0 % or 0.99 %/month with 50–70 % entrada over 12–36 months**; Move Brasil 72 months. Add **IOF ≈ 3.4 %** of the financed amount, TAC up to R$ 1,000, gravame R$ 150–450 and the mandatory comprehensive insurance. CET (total effective cost) is the number to compare — typically 28–35 % a year on a standard 48-month deal, 20–24 % on promo rates. **Consórcio** (savings pool, no interest but 12–20 % admin fee over 60–80 months, car delivered when drawn or bid) and **assinatura/leasing** (Localiza Meoo, Movida, Kinto, VW Sign&Drive; R$ 2,000–4,500/month for a compact including IPVA, insurance and maintenance) are the popular alternatives. Exchange rate ≈ R$ 5.2–5.5 per USD in Sept 2026.

## 6. Glossary for a first-time buyer

- **Preço público sugerido / tabela:** the brand's published retail price for São Paulo, with IPI, PIS/COFINS, ICMS and frete inside; the ceiling you negotiate down from.
- **Bônus de fábrica / preço promocional / à vista:** the manufacturer's monthly cash discount (R$ 5–50k) that the dealer must pass on; usually valid to the end of the month or "enquanto durar o estoque".
- **Venda direta (CNPJ, produtor rural, taxista, PcD, frotista):** direct-sales channels with their own tabela 10–30 % under retail; PcD and taxi buyers also get IPI/ICMS exemptions (cars up to R$ 200k) and cannot resell for 2–4 years.
- **IPI / IPI Verde / Carro Sustentável:** the federal excise built into the price, now 0–20 % by fuel, power, efficiency and recyclability; 0 % for national 1.0 compacts through 2026.
- **ICMS:** state VAT (12 % on cars in SP and most states), also inside the price; the reason prices differ by state.
- **Emplacamento / 1º registro / placa Mercosul / CRLV-e:** first registration at the Detran, the plate pair and the digital registration document — R$ 700–1,700 in fees, R$ 1,500–3,500 if the dealer does it.
- **IPVA:** annual state ownership tax (1.5–4 % of the invoice value, then of the FIPE value), prorated in the purchase year and due before plating; several states exempt EVs and SP exempts flex hybrids.
- **Licenciamento anual:** the yearly Detran renewal (R$ 120–300) that keeps the CRLV valid; paid with the IPVA.
- **Tabela FIPE:** the monthly reference value of every model/year, used for IPVA, insurance and trade-ins; new cars trade 8–15 % below FIPE within months.
- **Despachante:** the paperwork agent who handles plating, transfers and licensing for a fee (R$ 300–800).
- **Flex / etanol / regra dos 70 %:** almost every Brazilian-built petrol car burns any mix of gasoline and hydrated ethanol; ethanol is cheaper per km when it costs less than 70 % of gasoline.
- **PBEV / etiqueta INMETRO:** the official efficiency label (city/road km/L for gasoline and ethanol, kWh/100 km and km range for EVs, A–E rating and CO2).
- **CDC / entrada / CET / IOF / taxa zero:** the standard car loan (crédito direto ao consumidor), the down payment (20–30 %), the total effective cost of the loan (the number to compare), the federal 0.38 % + daily tax on credit, and the 0 %-interest promo that needs a big down payment.
- **Consórcio:** a lottery/bid savings pool that delivers a car without interest but with a 12–20 % admin fee and no fixed delivery date.
- **Supervalorização do usado:** the dealer's inflated trade-in offer (R$ 10–30k over FIPE) used instead of a cash discount.
- **Seguro compreensivo / franquia / seguro popular:** voluntary comprehensive insurance (3–7 % of value a year), its deductible (5–10 %), and the cheaper recycled-parts version.

## 7. Sources

- Sales/market: Fenabrave August 2026 release (https://www.fenabrave.org.br/portalv2/Noticia/17489); September ranking (https://soubrasilia.com/carros-mais-vendidos-setembro-2026-polo-dolphin-mini-fenabrave/); price war (https://www.vrum.com.br/bom-negocio/2026/09/7500191-guerra-de-precos-carros-0km-tem-descontos-de-ate-rs-48-mil-em-setembro.html ; https://www.otempo.com.br/autotempo/2026/9/8/guerra-de-precos-nos-carros-zero-km-faz-seminovos-cairem-ate-21); Fenabrave 2026 forecast (https://www.autodata.com.br/noticias/2026/07/28/fenabrave-revisa-alta-do-mercado-total-para-8-em-2026/130759/)
- IPI Verde / Carro Sustentável: Decreto 12.549/2025 summary (https://www.pwc.com.br/pt/consultoria-tributaria-societaria/thinking-about-taxes/tax-legis/2025/ipi-reducao-de-aliquotas-para-veiculos-decreto-federal-n-12-549-2025.html); rates table (https://autopapo.com.br/noticia/ipi-verde-carros-mais-caros/ ; https://seminovos.localiza.com/blog/posts/ipi-verde-carro-sustentavel); entry into force Nov 2025 and model examples (https://www.autoindustria.com.br/2025/11/28/ipi-verde-passa-a-valer-a-partir-deste-mes-de-novembro/); power thresholds and 2026 downrating (https://www.despachantedok.com.br/blog/noticias/menos-cavalos-nos-carros-novos-o-que-o-ipi-verde-mudou-nos-motores-em-2026-e-o-que-isso-muda-para-voce/); criteria (https://exame.com/economia/ipi-verde-lula-assina-decreto-que-reduz-impostos-para-carros-mais-sustentaveis-veja-os-criterios/)
- Import duty on electrified cars (35 % from July 2026, end of quotas): https://primoauto.com.br/imposto-de-importacao-de-eletricos-chega-a-35-em-julho-de-2026-o-que-muda ; https://mecanicaonline.com.br/2026/04/preco-dos-veiculos-eletricos-vai-disparar-10-com-o-fim-das-cotas-de-importacao/ ; https://www.poder360.com.br/poder-economia/carros-eletricos-importados-tem-aumento-de-imposto-a-partir-desta-3a/
- ICMS by state 2026 and SP 12 % on vehicles: https://treeunfe.com.br/blog/tabela-icms-2026-veja-as-aliquotas-estaduais-atualizadas ; why prices differ by state (https://www.gazetasp.com.br/economia/quer-economizar-veja-onde-carros-novos-sao-mais-baratos/1143447/); tax composition (https://canalve.com.br/saiba-quais-impostos-incidem-sobre-o-preco-de-carros-eletricos/)
- IPVA 2026 rates by state: https://www.cnnbrasil.com.br/auto/ipva-2026-saiba-quais-estados-cobram-os-impostos-mais-caros-e-baratos/ ; https://valorfinal.com.br/tabela-fipe/ipva ; https://www.moneytimes.com.br/ipva-2026-imposto-para-o-mesmo-carro-pode-ser-3-vezes-maior-dependendo-do-estado-do-emplacamento-veja-preco-do-mais-barato-ao-mais-caro-otrp/ ; EV/hybrid rules (https://www.vrum.com.br/aceleradas/2026/07/7471454-ipva-para-carro-eletrico-em-2026-guia-de-isencao-e-descontos-por-estado.html ; https://www.vrum.com.br/noticias/2026/07/7466052-ipva-2026-para-eletricos-a-lista-de-estados-com-isencao-ou-desconto.html ; https://canalve.com.br/ipva-2026-saiba-quais-estados-tem-isencao-carros-eletricos/); SP hybrid exemption and 2026 cap (https://www.cnnbrasil.com.br/auto/veja-quais-carros-hibridos-nao-pagarao-ipva-em-sp-em-2026/ ; https://portal.fazenda.sp.gov.br/Noticias/Paginas/IPVA-2026-Reajuste-do-teto-para-isencao-de-veiculos-movidos-a-hidrogenio-e-hibridos.aspx ; https://eltro.com.br/incentivos-fiscais-para-carros-eletricos-no-brasil-2026/); proportional IPVA (https://autopapo.com.br/noticia/ipva-proporcional-o-que-e-quando-pagar-e-como-calcular/)
- Emplacamento costs: Detran-SP 2026 fees (https://blog.edocumento.com.br/2026/01/custos-e-taxas-do-detran-sp-2026-guia.html); RJ (https://despachantenoriodejaneiro.com/blog/quanto-custa-emplacar-veiculo-no-rj/); national ranges (https://olhardigital.com.br/2026/05/10/curiosidades/quanto-custa-emplacar-um-carro-zero-em-2026/ ; https://custocarro.com/blog/emplacamento-carro-novo-quanto-custa/)
- SPVAT revoked (no compulsory insurance): https://consultadeplaca.net/blog/spvat-dpvat-2026-acabou-explicacao-completa ; https://www.camara.leg.br/noticias/1125348-sancionada-lei-que-impede-volta-do-dpvat-em-2025/ ; https://www.migalhas.com.br/quentes/422306/lula-sanciona-lei-que-impede-retomada-do-dpvat-em-2025
- Insurance: https://riorubiocorretora.com.br/seguro-byd/ ; https://meuseguromaisbarato.com.br/seguro-de-carro/marca/byd
- Move Brasil: https://www.santander.com.br/hotsite/santanderfinanciamentos/blog/move-brasil-taxi-aplicativo.html ; https://fastcompanybrasil.com/money/move-brasil-prazo-financiamento-carros-flex-eletricos-hibridos-etanol/ ; Fiat Move Brasil offers (https://www.media.stellantis.com/br-pt/fiat/press/fiat-divulga-ofertas-especiais-para-a-participacao-do-programa-move-brasil-com-ate-r-57-mil-em-descontos-para-taxistas-e-motoristas-de-aplicativo)
- Fuel prices (ANP week 20–26 Sep 2026): https://www.combustiveis-anp.com.br/preco-da-gasolina ; https://www.combustiveis-anp.com.br/preco-do-etanol ; https://www.combustiveis-anp.com.br/estado/sp/sao-paulo ; Southeast ethanol/diesel (https://www.otempo.com.br/autotempo/2026/9/23/etanol-sobe-2-51-no-sudeste-e-chega-a-r-4-09-em-setembro)
- Electricity: Enel SP 2026 tariff and tarifa branca (https://calculadoraenergia.com.br/tarifa/enel-sp); distributor ranking (https://comparesolar.com.br/ranking-tarifas-energia/)
- Selic and loan rates: https://investalk.bb.com.br/noticias/economia/copom-setembro-2026 ; https://www.autodata.com.br/noticias/2026/02/25/taxa-de-juros-para-veiculos-sobe-para-o-maior-patamar-desde-abril/100159/ ; annual km (https://www.moneytimes.com.br/motoristas-brasileiros-rodam-129-mil-km-no-1o-ano-de-uso-do-veiculo-veja-comparacao-por-estado/)
- Prices: Webmotors 0 km catalogue pages (https://www.webmotors.com.br/<marca>/<modelo>/2027 and /2026) for every brand; brand offer pages (BYD condições https://www.byd.com/br/condicoes ; Geely https://www.geelybrasil.com.br/ofertas ; Carrera Omoda/Jaecoo/GAC listings); launch/price articles cited in the row notes — Fiat Setembro Turbinado (Stellantis media), Onix 2027 (A Gazeta), Onix Plus 2027 and HB20 2027 (Autoo), Creta 2027 (BNews), i20 (Autopapo), T-Cross 2027 (Itatiaia), Tera 2027 (Vrum), Kwid 2027 (O Tempo), Kicks 2027 (Auto Show), Kait 2027 (Vrum/Autos Segredos), Avenger 2027 (Motor Show), Renegade 2027 (Autoo), Compass/Renegade promos (CNN Brasil), Peugeot 208/2008 2027 (Autoo), Corolla Cross 2027 (Itatiaia/car.blog.br), Corolla 2026 (O Tempo, March 2026), Hilux CNPJ tabela (Mundo do Automóvel para PCD, Aug 2026), Yaris Cross promo (idem, Sept 2026), Haval H6 (idem, 29 Sep 2026), Dolphin Mini 2027 (Autoo, 23 Sep 2026), BYD 2026 line (Vrum, 3 Sep 2026), Atto 2 (Canal VE), Sealion 7 (car.blog.br), Tiggo 7/8 PHEV 2027 (Terra), Leapmotor B10 REEV (Stellantis media, 28 Sep 2026), ID.4 2027 (Tribuna PR), Sonic 2027 (Autos Segredos), Ora 5 (Revista Cars), Zeekr 7X (AutoData), Denza (CNN Brasil), JAC restructuring (Mundo do Automóvel para PCD), Mercedes tabela PDF (imprensa.mercedes-benz.com.br).
