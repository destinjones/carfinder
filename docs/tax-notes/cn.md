# China (cn) — on-road math and market notes, September 2026

Currency CNY (yuan, ¥). Prices in `data/cars_cn.json` are integer yuan **manufacturer guide prices (厂商指导价 / MSRP)** as listed on Autohome (car.autohome.com.cn) in late September 2026. Fuel-economy figures are WLTC (l/100 km) and EV ranges are CLTC.

## 1. What the guide price already includes

The 指导价 is a retail price **inclusive of**:
- **VAT 13%** (增值税). Ex-VAT price = guide price / 1.13. Every other tax below is computed on the ex-VAT price.
- **Consumption tax (消费税)**, levied on the manufacturer/importer and embedded in the price, by engine displacement (BEV/FCEV: 0%; PHEV/EREV taxed on the engine's displacement):

| Displacement | rate |
|---|---|
| ≤ 1.0 L | 1% |
| 1.0–1.5 L | 3% |
| 1.5–2.0 L | 5% |
| 2.0–2.5 L | 9% |
| 2.5–3.0 L | 12% |
| 3.0–4.0 L | 25% |
| > 4.0 L | 40% |

- **Import duty 15%** (MFN) for imported cars (Lexus, Porsche, Alphard, Rolls-Royce, most Mercedes/BMW/Audi flagships) — embedded.
- **Super-luxury consumption tax**: an extra **10% at retail** on any passenger car (all powertrains, including BEV since 20 July 2025) whose ex-VAT price is **≥ ¥900,000** (≈ ¥1,017,000 incl. VAT). It is charged on top of the guide price at the dealer for cars over the line (e.g. Cayenne Turbo, S-Class 450, Maextro S800 top trims, Rolls-Royce). Yangwang U8 at ¥1,008,000 (ex-VAT ¥891,900) sits just under it.

Not included: purchase tax, insurance, plate/registration, dealer fees, any city plate cost.

## 2. From guide price to on-the-road (落地价)

### 2.1 Vehicle purchase tax (车辆购置税) — the big one
- Base: taxable price = invoice price ex-VAT = (transaction price) / 1.13. If the dealer discounts, tax follows the invoiced (discounted) price, but not below the tax bureau's minimum for the model.
- **ICE and non-plug-in hybrids: 10%** of ex-VAT price ⇒ **8.85% of the VAT-inclusive price**. Example: Camry ¥179,800 → ex-VAT ¥159,115 → tax **¥15,912**.
- **NEVs (BEV, PHEV/EREV, FCEV) on the MIIT exemption catalogue, 1 Jan 2026 – 31 Dec 2027: tax halved to 5%**, with the reduction **capped at ¥15,000 per car** (Announcement 2023 No. 10; the 2024–2025 full exemption capped at ¥30,000 has ended).
  - `tax = 0.10 × P_exVAT − min(0.05 × P_exVAT, 15000)`; equivalently 5% of ex-VAT price up to ex-VAT ¥300,000 (guide price ¥339,000), then 10% minus ¥15,000 above that.
  - Examples: Seagull ¥69,900 → ¥3,093; Model Y ¥263,500 → ¥11,659; Xiaomi YU7 Max ¥329,900 → ¥14,597; AITO M9 ¥479,800 → ¥42,460 − 15,000 = **¥27,460**; ¥1,000,000 car → ¥73,496.
  - Technical requirements for catalogue entry from 1 Jan 2026 (MIIT/MoF/STA announcement 9 Oct 2025): **PHEV/EREV must have ≥ 100 km CLTC equivalent all-electric range** (was 43 km) and charge-sustaining fuel use below 70%/75% of the limit; BEVs must meet energy-consumption limits. Older models on the catalogue got a transition period; by September 2026 virtually every PHEV on sale has ≥100 km (BYD's 55/70/80 km packs have been replaced by 128–230 km packs). Verify a specific trim is 免税/减税 via the invoice "减免税" flag.
- Paid at the local tax bureau (online via 个税/电子税务局 app) before registration.

### 2.2 Compulsory insurance and vehicle tax (collected together with 交强险)
- **交强险 (compulsory third-party liability)**: private car ≤ 6 seats **¥950/yr**; 6–10 seats **¥1,100/yr**. No-claims discount −10%/−20%/−30% after 1/2/3 claim-free years (in most provinces; some regions allow −50%, i.e. ¥475). Same base for NEVs.
- **车船税 (vehicle & vessel tax)**, annual, set by province within national bands, ICE only:

| Displacement | national band ¥/yr | typical Shanghai/Beijing |
|---|---|---|
| ≤ 1.0 L | 60–360 | 300 |
| 1.0–1.6 L | 300–540 | 420–450 |
| 1.6–2.0 L | 360–660 | 480–600 |
| 2.0–2.5 L | 660–1,200 | 900–1,200 |
| 2.5–3.0 L | 1,200–2,400 | 1,920–2,400 |
| 3.0–4.0 L | 2,400–3,600 | 3,480–3,600 |
| > 4.0 L | 3,600–5,400 | 5,280–5,400 |

  BEV/FCEV and catalogue PHEV/EREV: **exempt**; qualifying non-plug-in hybrids (节能车 list, e.g. Corolla/Camry/Accord hybrids): **half rate**. Guangdong is at the top of the bands, Beijing/Shanghai upper-middle, inland provinces lower.

### 2.3 Commercial insurance (商业险), first year — optional but every financed car needs it
Typical package = 车损险 (own damage) + 三者险 ¥2–3 m (third party) + 座位险. Rough first-year premium:
- ICE: `≈ 1.1% × car price + ¥1,300 (三者 ¥2m) + ¥200 (座位)` → ¥100k car ≈ ¥2,600; ¥200k ≈ ¥3,700; ¥300k ≈ ¥4,800.
- NEV (dedicated NEV clauses since Dec 2021; higher claim rates): `≈ 1.4% × price + ¥1,400 + ¥200` → ¥150k EV ≈ ¥3,700; ¥250k ≈ ¥5,100; ¥350k ≈ ¥6,500. Premium brands (Tesla, Xiaomi, NIO) often quote ¥6,000–9,000.
- Dealers push "full insurance" as a condition of 0%-interest deals; buying independently is allowed.

### 2.4 Registration / plate fees (上牌费)
- Official fees are tiny: number plates ¥100, 行驶证 ¥10, 登记证书 ¥10, temporary plate ¥5 — **≈ ¥125–200** including inspection. Dealer "上牌服务费/代办费" ¥300–1,500 is optional (you can register yourself at the DMV or via the 交管12123 app).
- Other dealer add-ons to watch (all negotiable, none legal to force): 出库费/PDI ¥500–2,000, 金融服务费 ¥1,500–5,000 on loans, 精品/装潢 packs, GPS fees on third-party loans.

### 2.5 City plate cost — the real regional variable (suggested dropdown)
Only a handful of cities restrict registrations. Everywhere else a plate costs the ¥125–200 above.

| City | ICE / non-qualifying cars | NEV rule | Notes |
|---|---|---|---|
| **Shanghai** | Monthly auction (拍牌). **Sept 2026: avg ¥93,778, floor ¥93,700, warning (cap) price ¥92,900, win rate 16.8%** (4,230 plates, 25,210 bidders). Deposit ¥2,000, bid fee ¥100. Non-hukou bidders: 居住证 + 3 years' Shanghai social insurance/income tax. | **BEV and FCEV only: free green plate** (2026 rules, valid to 31 Dec 2026). Conditions: driving licence, no other Shanghai-plated car under your name, ≤ 4 traffic violations/12 points in past year; non-locals need 居住证 and 36 of the last 48 months of social insurance/tax (or points-based 居住证 + 6 consecutive months). **PHEV/EREV get NO free plate since 2023 → they need an auction plate like petrol cars.** | Non-Shanghai plates banned from elevated roads 7–20h weekdays and inner-ring surface roads 7–10/16–19h. |
| **Beijing** | Lottery only (摇号), no auction. 2026 ordinary (ICE) quota **20,000** (two rounds of 10,000; June 2026 round: 2.55 m individual applicants → **≈ 1 in 265**; families ≈ 1 in 55 by points). Plate itself free. | NEV quota **159,000 in 2026** (incl. 80,000 extra), allocated 26 May by points/waitlist: families ≈ 36.5% success, individuals ≈ 6.1% (multi-year waitlist). New 油电切换 rule: an ordinary quota may be used for any powertrain. Both BEV and PHEV need an NEV quota (green plate) — no free PHEV plate. | Non-locals: 5 consecutive years of Beijing social insurance + tax. |
| **Guangzhou** | Lottery (≈ 1–2%) **or** auction: **Aug 2026 individual avg ¥10,344, floor ¥10,000**. | BEV **and PHEV/EREV**: free NEV quota on application (no lottery). Non-plug-in hybrids (节能车) enter a separate high-odds lottery. | Non-locals need Guangzhou social insurance (typically 2 years). |
| **Shenzhen** | Lottery **or** auction: **Sept 2026 (round 9) individual avg ¥11,989, floor ¥11,500**. | BEV and PHEV: direct NEV quota (hukou or 居住证 + social insurance). | Peak-hour restrictions on non-Shenzhen plates. |
| **Hangzhou** | Lottery **or** auction: **June 2026 individual avg ¥1,493** (effectively free). | BEV and PHEV: free NEV plate on application. | |
| **Tianjin** | Lottery **or** auction: **2026 monthly averages ¥10,245–10,585** (July 2026 ¥10,585). | BEV and PHEV: free NEV plate. | |
| **Chengdu** | Free (registration ¥125–200 only). | Free. | Tail-number restriction inside the ring road; NEVs exempt. |
| **Chongqing** | Free. | Free. | |
| **Other cities** | Free (also applies to Wuhan, Nanjing, Xi'an, Suzhou, Zhengzhou, etc.). | Free. | Hainan runs a lottery/auction but is small. |

Encoding suggestion: `plate_cost = {Shanghai: fuel in (Petrol, Diesel, Hybrid, PHEV) ? 93800 : 0; Beijing: 0 but flag "lottery"; Guangzhou: ICE/HEV ? 10300 : 0; Shenzhen: ICE/HEV ? 12000 : 0; Hangzhou: ICE ? 1500 : 0; Tianjin: ICE ? 10500 : 0; else 0} + 150 registration`. Treat non-plug-in hybrids as ICE for plates everywhere; in Guangzhou/Shenzhen/Hangzhou/Tianjin PHEV = NEV (free), in Shanghai PHEV = ICE (auction), in Beijing everything needs a quota.

### 2.6 Worked example (Shanghai, BYD Song Ultra DM-i 205 km, ¥129,900, 1.5 L PHEV)
Guide ¥129,900 → purchase tax 5% × (129,900/1.13) = ¥5,748 → 交强险 ¥950 → 车船税 ¥0 (NEV exempt) → commercial insurance ≈ ¥3,400 → registration ¥150 → **on-road ≈ ¥140,150 before plate**; add a Shanghai auction plate (≈ ¥93,800) because it is a PHEV, or ¥0 in Guangzhou/Chengdu. Minus national trade-in subsidy if eligible (8% = ¥10,392 replacement, or 12% = ¥15,588 scrappage).

## 3. Incentives in force (September 2026)

### 3.1 Purchase-tax reduction — see 2.1 (5%, cap ¥15,000, through 31 Dec 2027).

### 3.2 National trade-in programme 2026 (汽车以旧换新, MOFCOM + 8 ministries, effective 1 Jan 2026, applications for cars invoiced in 2026)
Now a **percentage of the new car's VAT-inclusive invoice price** (2025 was a flat ¥20,000/¥15,000):

| Route | Buying an NEV (on the purchase-tax catalogue) | Buying a petrol car (≤ 2.0 L) |
|---|---|---|
| **报废更新** scrap an old car you own | **12%, max ¥20,000** | **10%, max ¥15,000** |
| **置换更新** sell/transfer an old car you own and buy new | **8%, max ¥15,000** | **6%, max ¥13,000** |

- Scrappage eligibility: petrol car registered on/before **30 June 2013**; diesel or other fuel on/before **30 June 2015**; old NEV registered on/before **31 Dec 2019**. Scrapping an NEV to buy a petrol car earns nothing. Replacement route: any older car registered under your name (transferred after 1 Jan 2026), amounts set by province within the national ceiling.
- One subsidy per person; applied for via the 汽车以旧换新 mini-programme with invoice, scrappage certificate/transfer record; paid to the buyer's bank account after review (weeks).
- Status: running nationally in September 2026 (all provinces have published 2026 rules; Hunan etc. reissued in Feb 2026). Funds are allocated by quarter and some provinces paused for weeks in 2025 when tranches ran out — treat as "usually available, check the local portal".
- Local top-ups announced late Sept 2026 (cannot be stacked with the national scrappage/replacement money): Nanjing 3% up to ¥7,000 (NEV) / 2% up to ¥6,000 (ICE); Qingdao 4% up to ¥12,000 / 3% up to ¥10,000; Gansu ¥2,000–3,000; Qinghai ¥3,000–5,000; many cities run consumption-voucher rounds of ¥1,000–5,000.

### 3.3 Other
- Vehicle & vessel tax exemption for NEVs (2.2), half rate for listed HEVs.
- Free/priority plates for NEVs in restricted cities (2.5) — worth ¥10,000 (Guangzhou) to ¥94,000 (Shanghai, BEV only).
- Manufacturer offers (Sept 2026 "Golden September" push, 30+ brands): Tesla ¥5,000–10,000 cash + 5-year 0% APR; Xiaomi 3-year 0% or ¥6,000 insurance subsidy; Li Auto ¥10,000 off L8/L9; Geely trade-in bonus up to ¥20,000; Voyah up to ¥50,000 trade-in support; BYD 0%-interest and free charger/insurance packs; Leapmotor cash + finance packs.

## 4. Dealer discount climate (September 2026)
Market context: CPCA August 2026 retail 1.541 m units, **−23.6% YoY**; NEV share a record **65.2%**; pure-ICE retail down >40% YoY as petrol prices sit ~¥1.3/L above a year ago and the NEV tax change plus percentage-based subsidies front-loaded demand into 2025. Result: petrol cars are being cleared, NEVs are cheaper on list but discounted less.

| Segment | Typical discount off guide price now |
|---|---|
| `hot` — new NEV launches sold direct or on allocation (Xiaomi SU7/YU7, AITO M7/M8, Li i6, Onvo L90, Xingyuan, Song Ultra, Qin MAX, Sealion 08, bZ3X) | 0–3% (finance/insurance perks only), waiting lists |
| `steady` — mainstream NEVs and Chinese brands (BYD DM-i, Geely Galaxy, Leapmotor, Deepal, Zeekr, NIO via BaaS) | 3–10% cash or trade-in bonus; older stock 10–15% |
| `deals` — JV petrol cars (VW, Toyota, Honda, Nissan, Buick) | 15–30% (Passat/Magotan/Accord routinely 25–35% below list on the road) |
| `deals` — German luxury (BBA, Volvo, Cadillac) | 20–35%; Audi A7L cut ¥155,900 (37%), Volvo XC70 launch-price cut, BMW/Mercedes 5-Series/E-Class 25%+ |
| Tesla, imports (Lexus, Porsche) | Tesla 2–4% via cash; Porsche/Lexus 5–15% |

CPCA's promotion index (weighted average discount) has run around 20–25% for ICE and ~10–12% for NEVs through 2026 (approximate).

## 5. Running-cost inputs (September 2026)
- **Fuel (after the 25 Sept 2026 price adjustment; next window 16 Oct)**: 92# petrol Shanghai **¥8.57/L**, Beijing ¥8.61, Guangdong ¥8.63, Zhejiang ¥8.58, Sichuan ¥8.70, Chongqing ¥8.67, Tianjin ¥8.61 → use **¥8.60/L** nationally; 95# ¥9.09–9.35 (use ¥9.15); 0# diesel ¥8.28–8.36 (use ¥8.30). These are ~¥1.3/L higher than September 2025. Prices are state-set every 10 working days.
- **Home electricity** (residential tiered tariff, tier 1 which covers ~2,700–3,100 kWh/yr): Beijing ¥0.488/kWh (valley ¥0.30), Shanghai ¥0.617 (peak) / ¥0.307 (valley 22:00–06:00), Guangzhou ¥0.61, Shenzhen ¥0.68, Hangzhou ¥0.538 / ¥0.288 valley, Chengdu ¥0.52, Chongqing ¥0.52, Tianjin ¥0.49. Use **¥0.55/kWh** default, ¥0.35 with a night tariff. **Public DC fast charging** ¥1.0–1.8/kWh incl. service fee (use ¥1.30). NEV battery-swap subscriptions (NIO BaaS) ¥728–1,128/month.
- **Typical annual distance**: 12,000–15,000 km private cars (use 13,000); NEV owners ≈ 18,000.
- **Loans**: bank auto loans **2.5–4.5% p.a.** (state banks 2.85–3.8% for good credit; 5-year LPR 3.5%); manufacturer finance commonly **0% for 2–5 years** on NEVs (Tesla 5-yr 0%, Xiaomi 3-yr 0%, BYD/Geely 2–3-yr 0%) or 2–4% otherwise; credit-card instalments 3–5% effective; third-party lenders 6–12%. Typical structure: 20–30% down, **36 months** (60 months increasingly common); ¥1,500–5,000 "financial service fee" is a dealer add-on to refuse. Default assumption: 3.5% APR, 36 months, 30% down.

## 6. Glossary
- **指导价 (zhǐdǎojià)**: manufacturer guide price incl. 13% VAT and consumption tax; the sticker every site quotes.
- **裸车价**: "bare car" price actually paid to the dealer after discount, before tax/insurance/plate.
- **落地价**: on-the-road price = bare car + purchase tax + insurance + plate/registration (+ plate auction in Shanghai).
- **购置税**: vehicle purchase tax, 10% of the ex-VAT price (5% for NEVs in 2026–27, reduction capped at ¥15,000).
- **交强险**: compulsory third-party liability insurance, ¥950/yr for a ≤6-seat private car.
- **商业险**: optional commercial insurance (own damage 车损, third party 三者, occupants 座位).
- **车船税**: annual vehicle tax by engine size, collected with 交强险; NEVs exempt.
- **绿牌 / 蓝牌**: green NEV plate vs blue plate for petrol/diesel/hybrid cars; green plates dodge most city restrictions.
- **拍牌 / 摇号**: plate auction (Shanghai, Guangzhou, Shenzhen, Hangzhou, Tianjin) / plate lottery (Beijing and the auction cities).
- **以旧换新 (报废更新 / 置换更新)**: national trade-in subsidy — scrap-and-buy (12%/10%, cap ¥20k/¥15k) or sell-and-buy (8%/6%, cap ¥15k/¥13k).
- **CLTC**: China's official EV range cycle; optimistic — expect 65–80% in real use, less in winter.
- **DM-i / EM-i / Hi4 / C-DM / DMH**: BYD / Geely / Great Wall / Chery / SAIC plug-in hybrid systems; "亏电油耗" is their fuel use with a flat battery.
- **增程 (EREV)**: range-extender EV (Li Auto, AITO, Leapmotor "增程"): electric drive with a petrol generator; taxed and plated like a PHEV.
- **智驾版 / 激光雷达**: trims with advanced driver-assist / lidar (BYD God's Eye, Huawei ADS, Xpeng XNGP).
- **4S店 vs 直营**: franchised dealer (negotiate) vs manufacturer-run store (fixed price: Tesla, Xiaomi, NIO, Li Auto, AITO).
- **BaaS**: NIO/Onvo battery-as-a-service — buy the car without the battery and rent it monthly.
- **金融服务费 / 出库费**: dealer "finance service" and "release" fees — non-statutory, negotiable.

## 7. Sources
- Autohome brand price pages (guide prices, trims, ranges, power), scraped 29 Sept 2026: https://car.autohome.com.cn/price/brand-75.html (BYD) and equivalents for brands 161, 577, 554, 575, 25, 456, 279, 70, 26, 634, 685, 350, 319, 642, 476, 76, 582, 530, 502, 181, 458, 283, 331, 20, 19, 448, 114, 120, 489, 275, 284, 612, 629, 345, 318, 609, 595, 649, 647, 648, 313, 590, 82, 597, 425, 91, 133, 3, 63, 14, 1, 33, 15, 36, 38, 47, 52, 40
- NEV purchase tax 2026–27 (5%, ¥15,000 cap): https://fgk.chinatax.gov.cn/zcfgk/c102416/c5207352/content.html ; https://www.cpnn.com.cn/news/xny/202509/t20250912_1831426.html ; https://www.yicai.com/news/102819401.html
- 2026–27 NEV technical requirements (PHEV ≥100 km): http://www.news.cn/20251009/6a217fd47d714f62877cf1c87af1101d/c.html ; https://www.miit.gov.cn/jgsj/zbys/gzdt/art/2025/art_24420ee139384a429886a8199cb11424.html
- 2026 trade-in subsidy rules: https://www.mofcom.gov.cn/zcfb/gnmygl/art/2025/art_56cd7e5f1aae46178d6bade99d0a1a7a.html ; https://www.news.cn/politics/20260102/8280c115602841078b65d8f5176b239c/c.html ; https://news.gmw.cn/2026-01/03/content_38514499.htm ; https://www.ndrc.gov.cn/xxgk/zcfb/tz/202512/t20251230_1402851.html
- Local subsidies Sept 2026: https://m.21jingji.com/article/20260925/herald/ae153f36dadd9854b66d6b132859133a.html
- Shanghai plate auction Sept 2026: https://news.qq.com/rain/a/20260919A0677N00 ; warning price: https://news.qq.com/rain/a/20260912A053XS00
- Shanghai 2026 green-plate rules: https://www.shanghai.gov.cn/nw4411/20260101/dc2565e0fce04fd1ad0532de5d3b8aff.html ; https://m.thepaper.cn/newsDetail_forward_32483588 ; https://sh.bendibao.com/zffw/202614/303154.shtm
- Beijing 2026 quotas and lottery: https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202602/t20260215_4518925.html ; https://www.ithome.com/0/955/194.htm ; https://www.chinanews.com.cn/sh/2026/06-25/10647010.shtml ; https://news.qq.com/rain/a/20260626A04VZ400
- Guangzhou Aug 2026 auction: https://www.21jingji.com/article/20260825/herald/db2b9a065254c7c8eb8dbefbd95330ec.html
- Shenzhen Sept 2026 auction: https://www.sohu.com/a/1081934271_355768
- Hangzhou June 2026 auction: https://news.zhaobiao.cn/trade_v_4da0f90b9fa9bde6c3f6b452b9bd876e.html
- Tianjin 2026 auction history: https://news.qq.com/rain/a/20260908A0DFZ200
- Fuel prices: https://www.xiaoxiongyouhao.com/fprice/ (29 Sept 2026) ; https://news.qq.com/rain/a/20260914A03KVM00
- Market/discount climate: https://www.ithome.com/1/000/312.htm (CPCA Aug 2026) ; https://news.qq.com/rain/a/20260910A03RAZ00 ; https://www.36kr.com/p/3982732902349573 ; https://news.qq.com/rain/a/20260908A08VH900
- Loan rates: https://auto.sina.cn/2026-07-09/detail-inihfazc5403902.d.html
- Insurance and vehicle-tax bands, consumption tax and super-luxury tax: standing national rules (交强险 base rates 2020 reform; 车船税法; 消费税 2025 No. 3 announcement lowering the super-luxury threshold to ¥900,000) — figures from prior knowledge, not re-fetched.
