#!/bin/bash
# MedCompare AI — Repo Scaffold Script
# Run this once from inside an empty medcompare-ai/ directory (after `git init`).
# Usage: bash scaffold.sh

set -e

echo "Creating MedCompare AI folder structure..."

# ---- Top-level files ----
touch README.md LICENSE .gitignore .env.example docker-compose.yml pnpm-workspace.yaml turbo.json

# ---- docs/ ----
mkdir -p docs/architecture docs/product docs/runbooks
touch docs/architecture/system-overview.md
touch docs/architecture/data-flow-sequence.md
touch docs/architecture/hybrid-scraping-strategy.md
touch docs/architecture/api-contracts.md
touch docs/product/problem-statement.md
touch docs/product/novelty.md
touch docs/product/evaluation-metrics.md
touch docs/runbooks/local-setup.md
touch docs/runbooks/scraper-ops.md

# ---- apps/web/ ----
mkdir -p apps/web/src/pages
mkdir -p apps/web/src/components
mkdir -p apps/web/src/features/search
mkdir -p apps/web/src/features/prescription-upload
mkdir -p apps/web/src/features/comparison-results
mkdir -p apps/web/src/features/anomaly-explanations
mkdir -p apps/web/src/features/interaction-warnings
mkdir -p apps/web/src/features/watchlist-alerts
mkdir -p apps/web/src/services
mkdir -p apps/web/src/styles
touch apps/web/src/features/comparison-results/PlatformCard.tsx
touch apps/web/src/features/comparison-results/PriceTable.tsx
touch apps/web/src/features/comparison-results/CheapestBadge.tsx
touch apps/web/package.json

# ---- backend/ ----
mkdir -p backend/src/routes
mkdir -p backend/src/modules/auth/jwt
mkdir -p backend/src/modules/auth/policies
mkdir -p backend/src/modules/ocr/providers
mkdir -p backend/src/modules/ocr/postprocess
mkdir -p backend/src/modules/structuring/prompts
mkdir -p backend/src/modules/structuring/schemas
mkdir -p backend/src/modules/structuring/guards
mkdir -p backend/src/modules/normalization/fuzzy
mkdir -p backend/src/modules/normalization/salt-mapper
mkdir -p backend/src/modules/fetch/static-scrapers
mkdir -p backend/src/modules/fetch/browser
mkdir -p backend/src/modules/fetch/connectors/onemg
mkdir -p backend/src/modules/fetch/connectors/pharmeasy
mkdir -p backend/src/modules/fetch/connectors/netmeds
mkdir -p backend/src/modules/fetch/connectors/truemeds
mkdir -p backend/src/modules/fetch/connectors/apollo247
mkdir -p backend/src/modules/fetch/output/schema
mkdir -p backend/src/modules/fetch/output/mappers
mkdir -p backend/src/modules/fetch/anti-bot
mkdir -p backend/src/modules/enrichment/anomaly/model
mkdir -p backend/src/modules/enrichment/anomaly/shap
mkdir -p backend/src/modules/enrichment/generic-substitutes
mkdir -p backend/src/modules/enrichment/interactions
mkdir -p backend/src/modules/enrichment/ranking
mkdir -p backend/src/modules/alerts/jobs
mkdir -p backend/src/modules/realtime
mkdir -p backend/src/clients
mkdir -p backend/src/middleware

touch backend/src/routes/compare.routes.ts
touch backend/src/routes/prescription.routes.ts
touch backend/src/routes/interactions.routes.ts
touch backend/src/routes/watchlist.routes.ts
touch backend/src/routes/auth.routes.ts

touch backend/src/modules/ocr/providers/tesseract.provider.ts
touch backend/src/modules/normalization/fuzzy/rapidfuzz.ts
touch backend/src/modules/fetch/platform-router.ts
touch backend/src/modules/fetch/static-scrapers/cheerio-client.ts
touch backend/src/modules/fetch/browser/puppeteer.ts
touch backend/src/modules/fetch/browser/interceptors.ts
touch backend/src/modules/fetch/anti-bot/delay-randomizer.ts
touch backend/src/modules/fetch/anti-bot/header-spoofing.ts
touch backend/src/modules/fetch/anti-bot/stealth-flags.ts
touch backend/src/modules/enrichment/generic-substitutes/salt-match.ts
touch backend/src/modules/enrichment/generic-substitutes/trust-score.ts
touch backend/src/modules/enrichment/generic-substitutes/rank.ts
touch backend/src/modules/enrichment/interactions/lookup.ts
touch backend/src/modules/enrichment/interactions/llm-rewrite.ts
touch backend/src/modules/enrichment/interactions/guardrails.ts
touch backend/src/modules/enrichment/ranking/scoring.ts
touch backend/src/modules/alerts/jobs/check-alerts.ts
touch backend/src/modules/realtime/ws.ts
touch backend/src/clients/cache.ts
touch backend/src/clients/db.ts
touch backend/src/middleware/logger.ts
touch backend/src/index.ts
touch backend/package.json

# ---- packages/ ----
mkdir -p packages/shared-types packages/shared-utils packages/shared-config packages/shared-validators

# ---- data/ ----
mkdir -p data/seeds/nppa data/seeds/salts data/seeds/medicine-aliases data/seeds/pharmacy-platforms
mkdir -p data/fixtures

# ---- ai/ ----
mkdir -p ai/models/anomaly-detection
mkdir -p ai/notebooks
touch ai/notebooks/anomaly-experiments.ipynb
touch ai/notebooks/shap-analysis.ipynb

# ---- db/ ----
mkdir -p db/postgres/migrations
mkdir -p db/timescaledb
mkdir -p db/redis
touch db/postgres/schema.sql
touch db/postgres/seeds.sql
touch db/timescaledb/hypertables.sql
touch db/redis/key-design.md

# ---- infra/ ----
mkdir -p infra/docker infra/nginx
touch infra/docker/backend.Dockerfile
touch infra/docker/scraper.Dockerfile

# ---- scripts/ ----
mkdir -p scripts/dev scripts/data scripts/maintenance
touch scripts/dev/bootstrap.sh
touch scripts/dev/run-local.sh
touch scripts/data/sync-nppa.ts
touch scripts/data/sync-drugbank.ts
touch scripts/maintenance/backfill-prices.ts
chmod +x scripts/dev/bootstrap.sh scripts/dev/run-local.sh

# ---- tests/ ----
mkdir -p tests/e2e tests/integration tests/performance

# ---- .github/workflows/ ----
mkdir -p .github/workflows
touch .github/workflows/ci.yml
touch .github/workflows/deploy.yml

echo "Done. Folder structure created."
echo "Next: paste db/postgres/schema.sql content, fill docker-compose.yml, then run: docker compose up -d"
