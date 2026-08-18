# System Overview

## Purpose

Medkart.ai is a prescription-to-comparison pipeline that lets an Indian patient upload a prescription (or search directly), see live prices across five e-pharmacy platforms, and receive two AI-driven safety signals: a price-anomaly flag benchmarked against the government's NPPA ceiling price, and a drug-interaction warning generated via retrieval-augmented LLM checking. This document describes the system at the architecture level — how requests flow between services, what each service owns, and why the boundaries are drawn where they are.

## High-Level Architecture

The system is a modular monolith organized as independently deployable services under `services/`, fronted by a single public entrypoint (`api-gateway`) and consumed by a React web application (`apps/web`). No client ever calls an internal service directly — every request passes through the gateway, which is the only service exposed outside the internal network.

```
apps/web  →  api-gateway  →  [ auth | ocr | prescription-structuring | normalization
                                | catalog-kb | fetch | normalization-output
                                | ai-enrichment | ranking | cache | persistence
                                | realtime | alerts | observability ]
```

## Service Responsibilities

| Service | Responsibility |
| --- | --- |
| `api-gateway` | Single public entrypoint; JWT issuance/validation pass-through; routes compare, prescription, interaction, watchlist, and auth requests to internal services. |
| `auth-service` | User registration/login, JWT signing, and policy enforcement. |
| `ocr-service` | Extracts raw text from uploaded prescription images using Tesseract, custom CNN, or Veryfi providers. |
| `prescription-structuring-service` | Converts raw OCR text into structured drug, dosage, and frequency fields via an LLM, with checks to guard against malformed output. |
| `normalization-service` | Fuzzy-matches drug names to a canonical catalog and resolves brand names to active salt compositions. |
| `catalog-kb-service` | Maintains the canonical medicine and salt knowledge base, synced from external providers such as Eka Care, MediSaathi, and DataRequisite. |
| `fetch-service` | Retrieves live prices from five pharmacy platforms using a hybrid static-scraper and headless-browser strategy with anti-bot handling. |
| `normalization-output-service` | Maps each platform's differing response shape into a unified price schema. |
| `ai-enrichment-service` | Core novelty layer: price-anomaly detection (Isolation Forest + SHAP), generic-substitute ranking, and RAG-based drug-interaction checking with safety guardrails. |
| `ranking-service` | Scores and orders comparison results by price, discount, delivery estimate, and stock status. |
| `cache-service` | Redis abstraction; serves recently fetched prices before triggering a new live scrape. |
| `persistence-service` | Writes to PostgreSQL and TimescaleDB; owns price history and prescription records. |
| `realtime-service` | Streams comparison results to the client progressively via WebSocket or SSE as each platform responds. |
| `alerts-service` | Manages watchlists and triggers threshold-based price-drop notifications. |
| `observability-service` | Centralizes logs, traces, and metrics across all services. |

## Data Stores

- **PostgreSQL** — relational data: users, prescriptions, prescription items, medicine aliases, salt maps, drug interactions, watchlists.
- **TimescaleDB (Postgres extension)** — time-series price history via hypertables, enabling trend queries without overwriting prior values.
- **Redis** — short-TTL cache for recently fetched platform prices, reducing redundant scraping load.

## Why a Modular Monolith, Not Full Microservices at Launch

Each service under `services/` has its own `package.json` and can be extracted into an independently scaled deployment later, but at the scale of a course/pilot project they run as part of one coordinated deployment (via `docker-compose.yml`) to avoid premature operational overhead. This satisfies NFR-3 (independently scalable service boundaries) without requiring a full distributed-systems deployment on day one.

## Related Documents

- `docs/architecture/data-flow-sequence.md` — step-by-step request/response sequence for the core comparison flow.
- `docs/architecture/api-contracts.md` — REST endpoint contracts exposed by the API gateway.
- `docs/architecture/hybrid-scraping-strategy.md` — platform-by-platform scraping approach and anti-bot handling.
- `docs/product/problem-statement.md`, `docs/product/novelty.md`, `docs/product/evaluation-metrics.md` — product-level framing and success criteria.
