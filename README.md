# dawa-bazar
# MedCompare AI

> An AI-powered medicine price comparison and safety platform that reads your prescription, finds the cheapest genuine option across multiple pharmacies, flags suspicious pricing, and warns you about dangerous drug interactions — all in one dashboard.

---

## The Problem We're Solving

Every day, millions of Indians overpay for medicines simply because pricing is scattered, opaque, and hard to compare.

- Branded drugs can cost **5 to 14 times more** than chemically identical generic alternatives, despite meeting the same quality standards (Indian Pharmacopoeia).
- A 2026 government-commissioned NPPA study found the entire drug pricing ecosystem suffers from **data opacity and inconsistency**, hurting patients with chronic and serious conditions the most.
- **73% of patients** can't even understand what they're being billed for, let alone compare prices across pharmacies.
- Patients rarely know that a much cheaper, equally effective generic substitute exists for their prescribed brand — because no single platform shows this comparison clearly.
- There is currently no tool that combines price comparison, generic substitution, price-anomaly detection, and drug-interaction safety checks in one place.

**MedCompare AI exists to fix this** — by turning a photo of a prescription into a clear, explainable, multi-platform comparison in seconds.

---

## What the Product Actually Does

1. Upload a photo of your prescription (or type a medicine name).
2. The system reads and understands it using OCR + AI.
3. It searches multiple online pharmacies at once and pulls live prices.
4. It shows you all the prices side-by-side in one dashboard.
5. It highlights the cheapest option, suggests cheaper generic alternatives, flags suspiciously overpriced listings, and warns you if your medicines are unsafe to take together.

---

## The Multi-Platform Dashboard

The core of the product is a single dashboard that pulls live data from **5 different online pharmacy platforms** and displays everything in one place, instead of forcing users to open five different apps:

| Platform | Type |
|---|---|
| Tata 1mg | Online pharmacy |
| PharmEasy | Online pharmacy |
| Netmeds | Online pharmacy |
| Truemeds | Generic-focused online pharmacy |
| Apollo 24/7 | Hospital-backed online pharmacy |

Users see a clean comparison table — price, pack size, delivery estimate — from all five platforms at once, with the cheapest option highlighted automatically.

---

## End-to-End Pipeline

```
[1] Prescription Upload / Search
        |
        v
[2] OCR Extraction  ->  reads medicine names, dosage, frequency from the image
        |
        v
[3] LLM Structuring  ->  converts raw OCR text into clean structured data
        |
        v
[4] Fuzzy Matching + Salt Mapping  ->  resolves brand names to canonical drug + active salt
        |
        v
[5] HYBRID Multi-Platform Fetch  ->  pulls live prices from all 5 pharmacies
        |
        v
[6] Unified Schema Normalization  ->  merges 5 different data formats into one clean structure
        |
        v
[7] AI Enrichment Layer:
        - Price Anomaly Detection (vs government NPPA price)  + SHAP explanation
        - Generic Substitute Ranking (by salt match + trust score)
        - Drug Interaction Safety Check (structured lookup + LLM explanation)
        |
        v
[8] Caching (Redis)  ->  serves repeat searches instantly, avoids hammering pharmacy sites
        |
        v
[9] Ranking + Persistence  ->  best options ranked, history stored for price trends
        |
        v
[10] Dashboard  ->  everything displayed together: prices, savings, warnings, explanations
```

---

## Why "Hybrid" Data Fetching

Different pharmacy websites are built differently — some load instantly with plain HTML, others load their prices dynamically through JavaScript. Using one scraping method for all of them is either too slow or simply doesn't work. So the fetch layer intelligently routes each platform to the right tool:

| Platform Type | Tool Used | Why |
|---|---|---|
| Simple, server-rendered pages (1mg, PharmEasy, Netmeds) | Lightweight static scraper (Cheerio / Scrapy) | Fast, low resource cost, sufficient since data is already in the HTML |
| JavaScript-heavy, dynamically loaded pages (Truemeds, Apollo 24/7 sections) | Headless browser (Puppeteer / Playwright) | Necessary to load and read data that only appears after JavaScript runs |

A **caching layer sits in front of all scraping** — before hitting any live website, the system checks Redis first. If a fresh price was fetched recently, it's served instantly from cache instead of re-scraping. This keeps the system fast, reduces load on pharmacy sites, and avoids repeatedly triggering their bot-detection systems.

---

## The AI Layer — Where the Real Novelty Is

This isn't a single AI feature bolted onto a comparison app — it's a connected chain of AI capabilities, where each stage feeds the next:

| Feature | What It Does | Why It Matters |
|---|---|---|
| **OCR Prescription Reading** | Extracts medicine names, dosage, frequency from a photo | Removes manual data entry for the user |
| **LLM Structuring** | Turns messy extracted text into clean structured data | Makes downstream processing reliable |
| **Fuzzy Matching** | Corrects OCR errors, matches brand names to the correct drug | Handles real-world messy handwriting/OCR noise |
| **Generic Substitution Engine** | Finds cheaper alternatives with the same active salt, ranked by trust score | Directly saves users money, not just shows raw prices |
| **Price Anomaly Detection** | Flags listings priced abnormally high vs. government (NPPA) ceiling price | Protects users from being overcharged |
| **SHAP Explainability** | Explains *why* a price was flagged, in plain language | Builds trust — no black-box flags |
| **Drug Interaction Safety Check** | Looks up known interactions between prescribed medicines and explains risk in simple language | Adds a genuine safety layer beyond just cost comparison |

The interaction checker deliberately avoids over-engineering: rather than a heavy vector-database RAG pipeline, it uses a structured interaction lookup table combined with an LLM only for rewriting the result into clear language — keeping the system fast, explainable, and free of hallucination risk, while still being accurately described as a lightweight retrieval-augmented approach.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | Node.js (Express) |
| OCR | Tesseract / Veryfi / custom CNN |
| LLM | OpenAI / open-source LLM for structuring & explanations |
| Fuzzy Matching | RapidFuzz |
| Static Scraping | Axios + Cheerio / Scrapy |
| Dynamic Scraping | Puppeteer, Playwright |
| Anomaly Detection | Isolation Forest (scikit-learn) |
| Explainability | SHAP |
| Cache | Redis |
| Primary Database | PostgreSQL |
| Time-Series Data | TimescaleDB (Postgres extension) |
| Real-Time Updates | WebSocket (Socket.io) |
| Containerization | Docker |

### Databases Used

- **PostgreSQL** — primary relational store: users, medicine catalog, salt mappings, normalized pharmacy data.
- **TimescaleDB** — a Postgres extension (not a separate database) used for historical price trend tracking.
- **Redis** — in-memory cache for recently fetched prices and session data.

No MongoDB or other NoSQL store is used — the data is fundamentally relational, so a relational database fits best.

---

## Known Limitations (Documented Honestly)

- Live scraping can be blocked by anti-bot systems on some platforms; the system falls back gracefully to cached/seed data when this happens rather than failing.
- No pharmacy platform currently offers an official public API, so scraping remains the practical short-term data source; a production version would pursue official data partnerships.
- The MVP focuses on a fixed set of common medicines rather than full catalog coverage, to keep the system reliable and demoable.

---

## Why This Project Matters

MedCompare AI isn't a clone of an existing app — it combines price transparency, AI-driven savings, and medical safety into one system, addressing a real, well-documented financial and health problem faced by everyday patients. It demonstrates full-stack engineering, applied machine learning, explainable AI, and thoughtful system design working together to solve a genuine problem, not just to showcase individual tools.
