# Tax and market research notes

One note per country, written while the tab was built (late September 2026), with the concrete rates, brackets and
formulas that `src/script.html` encodes in `bd<CC>()`, plus the dealer-discount climate, fuel prices, loan norms,
EV incentives, glossary terms and the sources used. When a rule changes, update the note and the function together.

| Tab | Note | Encoded in |
|---|---|---|
| China | [cn.md](cn.md) | `bdCN`, `REGIONS.CN` |
| United Kingdom | [uk.md](uk.md) | `bdUK`, `ukVed1`, `ECG_MAKES` |
| Australia | [au.md](au.md) | `bdAU`, `auDuty` |
| Mexico | [mx.md](mx.md) | `bdMX`, `mxIsan` |
| Spain | [es.md](es.md) | `bdES`, `esRate` |
| Thailand | [th.md](th.md) | `bdTH`, `thExcise`, `TH_EV_LOCAL` |
| Russia | [ru.md](ru.md) | `bdRU`, `ruTransportTax`, `RU_TAX`, `RU_LOCAL` |
| Brazil | [br.md](br.md) | `bdBR`, `BR_ST`, `BR_CN` |
| Canada | [ca.md](ca.md) | `bdCA`, `caTax`, `CA_PROV`, `CA_FREIGHT` |

The US and India rules are smaller and live in the data files: `data/states_us.json` (sales tax and typical doc fee by
state) and `data/states_in.json` (RTO slabs by state and fuel), applied by `bdUS` and `bdIN`.
