# MedCompare AI (Medkart.ai) — Easy-to-Read DFD

This document explains the three Data Flow Diagrams (Level 0, Level 1, and Level 2) that were drawn for **MedCompare AI**, the engine behind [Medkart.ai](https://github.com/Bani-purthi06/Medkart.ai). It walks through what each diagram shows and how data actually moves through the system, from a user's prescription photo to a ranked, explained price comparison.

Project repo: [github.com/Bani-purthi06/Medkart.ai](https://github.com/Bani-purthi06/Medkart.ai)

---

## 1. What each diagram covers

| Diagram | File | Shows |
| --- | --- | --- |
| Level 0 — Context Diagram | `dfd-level0.drawio` | The whole system as **one process** talking to the outside world |
| Level 1 DFD | `level1_dfd.drawio` | Process `0.0` broken into **9 processes** and **3 data stores** |
| Level 2 DFD | `level2_dfd.drawio` | Process `7.0 AI Enrichment Layer` broken into **5 sub-processes** |

Reading order: Level 0 → Level 1 → Level 2. Each level zooms into one bubble from the level above without losing any of the information from that bubble.

---

## 2. Symbols

| Element | Shape | Example |
| --- | --- | --- |
| External entity | Rectangle | `E1 Patient / User` |
| Process | Rounded / ellipse bubble | `2.0 OCR Extraction` |
| Data store | Cylinder | `D2 Redis Cache` |
| Data flow | Labelled arrow | `Prescription image` |

---

## 3. Context Diagram — Level 0

### Diagram

```
flowchart LR
    U["E1 Patient / User"]
    PHARM["E2 Pharmacy Platforms\n(1mg, PharmEasy, Netmeds,\nTruemeds, Apollo 24/7)"]
    NPPA["E3 NPPA Price Database\n(Govt. reference prices)"]
    AI["E4 LLM / OCR AI Service\n(OpenAI, Veryfi, etc.)"]
    SYS(["0.0 MedCompare AI"])

    U -->|"Prescription photo / medicine search"| SYS
    SYS -->|"Price comparison, savings & warnings"| U

    SYS -->|"Price fetch request"| PHARM
    PHARM -->|"Live multi-pharmacy price data"| SYS

    SYS -->|"NPPA price lookup"| NPPA
    NPPA -->|"NPPA reference price"| SYS

    SYS -->|"OCR / structuring / explanation request"| AI
    AI -->|"Structured data / plain-language explanations"| SYS
```

### How to read it

The **Patient / User (E1)** is the only human actor. They send in a prescription photo or a plain-text medicine search, and MedCompare AI sends back a price comparison along with savings estimates and safety warnings.

Everything else is a machine-to-machine dependency the system relies on to do its job:

- **E2 Pharmacy Platforms** — the system asks live pharmacy sites/apps (1mg, PharmEasy, Netmeds, Truemeds, Apollo 24/7) for current prices.
- **E3 NPPA Price Database** — the system checks the government's reference price for a drug, which is what price anomalies are measured against.
- **E4 LLM / OCR AI Service** — the system offloads two AI-heavy jobs here: reading text off a prescription image (OCR) and turning technical output into structured data or plain-language explanations.

No database is shown at this level — all internal processing (matching, caching, ranking, safety checks) is hidden inside the single `0.0 MedCompare AI` bubble. That internal detail is exactly what Level 1 opens up.

---

## 4. Level 1 DFD — Decomposition of Process 0.0

The single `0.0` bubble is broken into nine processes that form a **pipeline**: a prescription goes in one end, and a ranked, explained dashboard comes out the other.

### Processes

| Process | Responsibility |
| --- | --- |
| 1.0 Prescription Upload / Search | Accepts a prescription photo or a typed medicine search from the user |
| 2.0 OCR Extraction | Sends the prescription image to the AI service and gets raw extracted text back |
| 3.0 LLM Structuring | Turns raw OCR text into a structured, machine-readable medicine list |
| 4.0 Fuzzy Matching + Salt Mapping | Matches brand names to their canonical drug/salt using the catalog |
| 5.0 Hybrid Multi-Platform Fetch | Checks the cache first, then scrapes/queries pharmacy platforms for live prices |
| 6.0 Unified Schema Normalization | Converts every pharmacy's raw price format into one common schema |
| 7.0 AI Enrichment Layer | Adds anomaly detection, explainability, generic ranking, and safety checks (see Level 2) |
| 8.0 Caching & Persistence | Writes the enriched result to cache and price history |
| 9.0 Ranking + Dashboard | Builds the final ranked dashboard and returns it to the user |

### Data stores

| Store | Contents |
| --- | --- |
| D1 Medicine Catalog / Salt Mapping (PostgreSQL) | Canonical drug names and their active salts, used for brand-to-generic matching |
| D2 Redis Cache | Short-lived cached price lookups so repeated searches don't re-scrape platforms |
| D3 Price History (TimescaleDB) | Time-series record of prices, used for trend and history tracking |

### Diagram

```
flowchart LR
    U["E1 User"]
    PHARM["E2 Pharmacy Platforms"]
    NPPA["E3 NPPA Price DB"]
    AI["E4 LLM / OCR AI Service"]

    P1(["1.0 Prescription Upload / Search"])
    P2(["2.0 OCR Extraction"])
    P3(["3.0 LLM Structuring"])
    P4(["4.0 Fuzzy Matching + Salt Mapping"])
    P5(["5.0 Hybrid Multi-Platform Fetch"])
    P6(["6.0 Unified Schema Normalization"])
    P7(["7.0 AI Enrichment Layer"])
    P8(["8.0 Caching & Persistence"])
    P9(["9.0 Ranking + Dashboard"])

    D1[("D1 Medicine Catalog / Salt Mapping")]
    D2[("D2 Redis Cache")]
    D3[("D3 Price History")]

    U -->|"Prescription photo / medicine search"| P1
    P1 -->|"Prescription image"| P2

    P2 -->|"OCR request"| AI
    AI -->|"Raw extracted text"| P2
    P2 -->|"Raw OCR text"| P3

    P3 -->|"Structuring request"| AI
    AI -->|"Structured JSON"| P3
    P3 -->|"Structured medicine list"| P4

    P4 <-->|"Brand name lookup / canonical drug + salt"| D1
    P4 -->|"Canonical drug list"| P5

    P5 -->|"Scrape / API request"| PHARM
    PHARM -->|"Raw price data"| P5
    P5 <-->|"Check cache / cached price if fresh"| D2
    P5 -->|"Raw multi-platform price data"| P6

    P6 -->|"Normalized price records"| P7

    P7 <-->|"NPPA price lookup / reference price"| NPPA
    P7 -->|"Explanation / ranking request"| AI
    AI -->|"SHAP / interaction explanation text"| P7
    P7 -->|"Enriched price + safety data"| P8

    P8 -->|"Store cache"| D2
    P8 -->|"Store price history"| D3
    P8 -->|"Persisted ranked data"| P9

    P9 -->|"Dashboard: prices, savings, warnings"| U
```

### Read the Level 1 diagram in nine sentences

1. Process 1.0 takes in the user's prescription photo or text search.
2. Process 2.0 sends the image to the AI service and gets raw text back (OCR).
3. Process 3.0 asks the same AI service to turn that raw text into a clean, structured medicine list.
4. Process 4.0 matches each brand name to its canonical drug and salt using D1.
5. Process 5.0 checks D2 (cache) first, and only calls the live pharmacy platforms when the cache is stale or missing.
6. Process 6.0 normalizes every platform's price format into one shared schema.
7. Process 7.0 is where the real intelligence lives — anomaly detection, explainability, generic-substitute ranking, and drug interaction checks (fully expanded in Level 2).
8. Process 8.0 persists the enriched result to D2 (cache) and D3 (price history).
9. Process 9.0 assembles everything into the final ranked dashboard and sends it back to the user.

---

## 5. Level 2 DFD — Decomposition of 7.0 AI Enrichment Layer

Process `7.0` is the heart of MedCompare AI's intelligence layer. It takes normalized price data from `6.0` and prescribed-medicine data, and produces one combined "enriched" result for `8.0` to persist — made up of four parallel checks that get merged at the end.

### Sub-processes

| ID | Sub-process | Job |
| --- | --- | --- |
| 7.1 | Price Anomaly Detection (Isolation Forest) | Flags suspiciously high/low prices by comparing against the NPPA reference price |
| 7.2 | SHAP Explainability | Turns the anomaly score into a plain-language explanation of *why* a price was flagged |
| 7.3 | Generic Substitute Ranking Engine | Ranks cheaper generic alternatives using trust scores and salt mapping |
| 7.4 | Drug Interaction Safety Check | Checks the prescribed medicine list against known interaction pairs and asks the AI service to rewrite the risk in plain language |
| 7.5 | Combine Enriched Results | Merges the outputs of 7.2, 7.3, and 7.4 into one payload |

### Data stores used

| Store | Contents |
| --- | --- |
| D1 Salt Mapping / Trust Score (PostgreSQL) | Same catalog store from Level 1, also holding a trust score used to rank generic substitutes |
| D4 Drug Interaction Lookup Table | Known pairs of drugs that interact unsafely together |

### Diagram

```
flowchart LR
    UP(["6.0 Unified Schema Normalization (upstream)"])
    DOWN(["8.0 Caching & Persistence (downstream)"])
    NPPA["E3 NPPA Price DB"]
    AI["E4 LLM / OCR AI Service"]

    A(["7.1 Price Anomaly Detection\n(Isolation Forest)"])
    B(["7.2 SHAP Explainability"])
    C(["7.3 Generic Substitute\nRanking Engine"])
    D(["7.4 Drug Interaction\nSafety Check"])
    E(["7.5 Combine Enriched Results"])

    D1[("D1 Salt Mapping / Trust Score")]
    D4[("D4 Drug Interaction Lookup Table")]

    UP -->|"Normalized price records"| A
    UP -->|"Normalized price + salt data"| C
    UP -->|"Prescribed medicine list"| D

    A <-->|"NPPA price lookup / reference price"| NPPA
    A -->|"Anomaly flag + raw score"| B

    C <-->|"Trust score / salt lookup / ranked candidates"| D1

    D <-->|"Interaction lookup / known pairs"| D4
    D -->|"Rewrite request"| AI
    AI -->|"Plain-language risk explanation"| D

    B -->|"Flag + plain-language explanation"| E
    C -->|"Ranked generic substitutes"| E
    D -->|"Interaction warnings"| E

    E -->|"Enriched price + safety data"| DOWN
```

### Easy explanation

Three independent checks run off the same upstream data from `6.0`:

- **7.1 → 7.2**: a price is scored for anomaly using an Isolation Forest model against the NPPA reference price, and that raw score is turned into a human-readable explanation by SHAP.
- **7.3**: generics are ranked separately, using the trust score and salt mapping stored in D1.
- **7.4**: the prescribed medicines are checked against D4 for known unsafe combinations, and any hit is rewritten into plain language by the LLM/OCR AI service.

All three outcomes — the explained anomaly flag, the ranked substitutes, and the interaction warnings — converge into **7.5 Combine Enriched Results**, which is the single payload handed off to `8.0 Caching & Persistence`.

---

## 6. Short summary (one paragraph)

"MedCompare AI takes a prescription photo or search term from the user, extracts and structures the medicine names using OCR and an LLM, maps each brand to its canonical drug and salt, then fetches live prices from pharmacy platforms — checking a Redis cache first. Those raw prices are normalized into one schema and passed to the AI Enrichment Layer, which in parallel flags price anomalies, explains them, ranks cheaper generic substitutes, and checks for unsafe drug interactions. The combined, enriched result is cached and stored in price history, then ranked and returned to the user as a dashboard of prices, savings, and safety warnings."

---

## 7. Diagram files

| File | Level |
| --- | --- |
| `dfd-level0.drawio` | Level 0 — Context Diagram |
| `level1_dfd.drawio` | Level 1 — Decomposition of `0.0` |
| `level2_dfd.drawio` | Level 2 — Decomposition of `7.0 AI Enrichment Layer` |

Open these in [draw.io / diagrams.net](https://app.diagrams.net) to view or edit the original diagrams that this document explains.
