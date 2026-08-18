# Medkart.ai — Functional & Non-Functional Requirements

**Project:** Medkart.ai — AI-powered medicine price comparison and safety platform
**Scope:** Prescription-to-comparison pipeline across 5 Indian e-pharmacy platforms (1mg, PharmEasy, Netmeds, Truemeds, Apollo 24/7), with AI-driven price anomaly detection, generic substitution, and drug interaction safety checks.

---

## 1. Functional Requirements (FR)

### 1.1 User & Authentication
- **FR-1:** The system shall allow a user to register and log in using email/phone and password. *(Service: `auth-service`)*
- **FR-2:** The system shall issue and validate JWT tokens for all authenticated API requests. *(Service: `api-gateway`, `auth-service`)*
- **FR-3:** The system shall allow a user to view and update their profile information. *(Table: `users`)*

### 1.2 Prescription Input & OCR
- **FR-4:** The system shall allow a user to upload a photograph of a prescription. *(Service: `ocr-service`; Table: `prescriptions`)*
- **FR-5:** The system shall extract medicine names, dosage, and frequency from the uploaded image using OCR. *(Service: `ocr-service`)*
- **FR-6:** The system shall allow a user to search for a medicine by name directly, bypassing OCR. *(Feature: `apps/web/features/search`)*
- **FR-7:** The system shall use an LLM to convert raw OCR text into structured drug, dosage, and frequency fields. *(Service: `prescription-structuring-service`; Table: `prescription_items`)*

### 1.3 Medicine Normalization
- **FR-8:** The system shall fuzzy-match extracted/typed drug names against a canonical medicine catalog to correct OCR and spelling errors. *(Service: `normalization-service`; Table: `medicine_aliases`)*
- **FR-9:** The system shall resolve a brand-name medicine to its active salt composition. *(Table: `medicine_salt_map`, `salts`)*
- **FR-10:** The system shall log every normalization decision with a match score and method for auditability. *(Table: `normalization_logs`)*

### 1.4 Multi-Platform Price Fetching (Hybrid)
- **FR-11:** The system shall fetch live prices for a matched medicine from all 5 pharmacy platforms. *(Service: `fetch-service`)*
- **FR-12:** The system shall route each platform to either a lightweight static scraper (Cheerio/Scrapy) or a headless browser (Playwright), based on whether the platform's pricing loads via server-rendered HTML or client-side JavaScript. *(Service: `fetch-service/scheduler/platform-router`)*
- **FR-13:** The system shall apply anti-bot measures (randomized delays, header spoofing, stealth flags) during scraping. *(Service: `fetch-service/anti-bot`)*
- **FR-14:** The system shall check Redis for a recently cached price before triggering a live scrape. *(Service: `cache-service`)*
- **FR-15:** The system shall fall back to cached or seed data if a live scrape fails or is blocked, rather than failing the request. *(Service: `fetch-service`, `cache-service`)*
- **FR-16:** The system shall normalize the 5 platforms' differing response formats into one unified price schema. *(Service: `normalization-output-service`)*

### 1.5 AI Enrichment
- **FR-17:** The system shall flag a platform's price as anomalous if it deviates significantly from the government NPPA ceiling price, using an Isolation Forest model. *(Service: `ai-enrichment-service/anomaly`; Table: `price_anomalies`, `nppa_price_ceiling`)*
- **FR-18:** The system shall generate a plain-language SHAP-based explanation for every flagged price anomaly. *(Service: `ai-enrichment-service/anomaly/shap`)*
- **FR-19:** The system shall recommend cheaper generic substitutes for a branded medicine, ranked by salt match percentage and trust score. *(Service: `ai-enrichment-service/generic-substitutes`; Table: `generic_substitutes`)*
- **FR-20:** The system shall check a user's prescribed medicines against a known drug-interaction table and generate a human-readable warning via LLM if a risky combination is found. *(Service: `ai-enrichment-service/interaction-rag`; Table: `drug_interactions`, `interaction_warnings`)*
- **FR-21:** The system shall pass all LLM-generated interaction explanations through a safety guardrail before displaying them to the user. *(Service: `interaction-rag/safety-guardrails`)*

### 1.6 Ranking & Comparison
- **FR-22:** The system shall rank all platform results for a medicine using a weighted score of price, discount, delivery estimate, and stock status. *(Service: `ranking-service`; Table: `ranking_snapshots`)*
- **FR-23:** The system shall display all 5 platforms' prices side by side in a single comparison table, with the cheapest option highlighted. *(Feature: `apps/web/features/comparison-results`)*

### 1.7 Real-Time Delivery
- **FR-24:** The system shall push comparison results to the dashboard progressively as each platform's data becomes available, via WebSocket/SSE, rather than waiting for all 5 platforms to respond. *(Service: `realtime-service`)*

### 1.8 Price History & Persistence
- **FR-25:** The system shall persist every fetched price as a timestamped record for historical trend tracking. *(Service: `persistence-service`; Table: `platform_prices`, TimescaleDB hypertable)*
- **FR-26:** The system shall retain a user's prescription history and its matched/normalized results. *(Table: `prescriptions`, `prescription_items`)*

### 1.9 Watchlist & Alerts
- **FR-27:** The system shall allow a user to add a medicine to a watchlist with a target price. *(Service: `alerts-service`; Table: `watchlists`)*
- **FR-28:** The system shall notify a user when a watched medicine's price drops to or below their target price. *(Service: `alerts-service`; Table: `alert_events`)*

---

## 2. Non-Functional Requirements (NFR)

### 2.1 Performance
- **NFR-1:** Cached comparison results shall be served to the user in under 2 seconds.
- **NFR-2:** Live comparison results across all 5 platforms shall complete within a bounded time window (target: under 15 seconds), with partial results streamed as they arrive rather than blocking on the slowest platform.

### 2.2 Scalability
- **NFR-3:** The system shall be built as a modular monolith with clearly separated service boundaries (14 service folders under `services/`), so that any individual service (e.g. `fetch-service`, `ai-enrichment-service`) can be extracted and scaled independently as load grows.
- **NFR-4:** The fetch layer shall support horizontal scaling to handle concurrent scraping across multiple users and medicines without a proportional increase in response time.

### 2.3 Reliability & Availability
- **NFR-5:** The system shall degrade gracefully — if a pharmacy platform blocks scraping or is unreachable, the system shall serve cached/seed data for that platform instead of failing the entire comparison request.
- **NFR-6:** The system shall minimize scraping-related bans through anti-bot resilience techniques (delay randomization, header spoofing) rather than relying on retries alone.

### 2.4 Security
- **NFR-7:** User passwords shall never be stored in plaintext; only hashed values shall be persisted.
- **NFR-8:** All API endpoints (except auth) shall require a valid JWT.
- **NFR-9:** LLM-generated content (interaction warnings, price explanations) shall pass through a guardrail layer to prevent hallucinated or unsafe medical claims from reaching the user.
- **NFR-10:** Prescription images and personal user data shall be handled with access controls limiting exposure to only the services that need them (OCR, structuring, persistence).

### 2.5 Maintainability
- **NFR-11:** Common types, validators, utilities, and configuration shall be centralized in shared packages (`packages/shared-types`, `shared-utils`, `shared-config`, `shared-validators`) to avoid duplication across services.
- **NFR-12:** Each service shall be independently buildable, testable, and deployable (own `package.json`, own Dockerfile where applicable).

### 2.6 Data Accuracy & Integrity
- **NFR-13:** Medicine normalization shall only auto-match a name to a canonical medicine above a defined confidence threshold; low-confidence matches shall be logged for review rather than silently accepted.
- **NFR-14:** Price time-series data shall be stored in TimescaleDB hypertables to preserve accurate, queryable price history rather than overwriting the latest value.

### 2.7 Usability
- **NFR-15:** All 5 platforms' data shall be viewable from a single dashboard, eliminating the need to check 5 separate apps.
- **NFR-16:** Every AI-driven flag or recommendation (price anomaly, generic substitute, interaction warning) shall be accompanied by a plain-language explanation — no unexplained "black-box" flags.

### 2.8 Portability & Deployability
- **NFR-17:** All services shall be containerized with Docker and deployable via the provided `docker-compose.yml` for local development.
- **NFR-18:** The system shall include Kubernetes manifests (`infra/k8s/base`, `overlays`) to support deployment across different environments.

### 2.9 Observability & Testability
- **NFR-19:** The system shall centrally collect logs, traces, and metrics across all services via `observability-service` to support debugging and monitoring in production.
- **NFR-20:** The system shall maintain automated test coverage across end-to-end, integration, contract, performance, and security test suites (`tests/`).

---

*Each requirement above is traceable to a specific service, database table, or feature folder in the Medkart.ai repository for direct mapping during implementation and review.*
