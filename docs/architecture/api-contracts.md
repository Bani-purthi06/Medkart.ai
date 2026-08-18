# API Contracts

All endpoints below are exposed exclusively through `api-gateway`. No client calls an internal service directly. Unless noted, all endpoints require a valid JWT in the `Authorization: Bearer <token>` header (NFR-8).

## Auth Routes (`auth.routes.ts`)

### `POST /api/v1/auth/register`
No auth required.
```json
// Request
{ "email": "string", "phone": "string", "password": "string" }
// Response 201
{ "userId": "uuid", "email": "string", "token": "jwt" }
```

### `POST /api/v1/auth/login`
No auth required.
```json
// Request
{ "identifier": "email_or_phone", "password": "string" }
// Response 200
{ "token": "jwt", "expiresIn": 3600 }
```

### `GET /api/v1/auth/me`
```json
// Response 200
{ "userId": "uuid", "email": "string", "phone": "string", "createdAt": "iso8601" }
```

## Prescription Routes (`prescription.routes.ts`)

### `POST /api/v1/prescriptions`
Multipart upload.
```json
// Request: multipart/form-data { file: <image> }
// Response 202 (async processing)
{ "prescriptionId": "uuid", "status": "processing" }
```

### `GET /api/v1/prescriptions/:id`
```json
// Response 200
{
  "prescriptionId": "uuid",
  "status": "structured",
  "items": [
    { "rawText": "string", "drug": "string", "dosage": "string", "frequency": "string", "confidence": 0.94 }
  ]
}
```

### `GET /api/v1/prescriptions/:id/status`
Polling endpoint for async OCR/structuring pipeline.
```json
// Response 200
{ "status": "uploaded | ocr_processing | structuring | normalized | failed" }
```

## Compare Routes (`compare.routes.ts`)

### `GET /api/v1/compare?medicine={name}` or `?prescriptionItemId={id}`
```json
// Response 200 (initial snapshot; live updates via WebSocket, see below)
{
  "medicine": "string",
  "canonicalSaltMatch": { "salt": "string", "confidence": 0.97 },
  "results": [
    {
      "platform": "1mg | pharmeasy | netmeds | truemeds | apollo24x7",
      "price": 120.50,
      "mrp": 145.00,
      "discount": 17,
      "deliveryEstimate": "2 days",
      "inStock": true,
      "anomalyFlag": { "isAnomalous": true, "deviationFromNppa": 0.22, "explanation": "string (SHAP-derived)" },
      "rankScore": 0.88
    }
  ],
  "genericSubstitutes": [
    { "name": "string", "saltMatchPct": 100, "trustScore": 0.91, "price": 45.00 }
  ],
  "interactionWarnings": [
    { "pair": ["DrugA", "DrugB"], "severity": "moderate", "explanation": "string (guardrail-checked)" }
  ]
}
```

### `WS /api/v1/compare/stream?medicine={name}`
Server pushes one event per platform as its result becomes available (FR-24).
```json
// Event
{ "event": "platform_result", "platform": "1mg", "data": { "price": 120.50, "anomalyFlag": { } } }
// Final event
{ "event": "complete", "totalPlatforms": 5, "resolved": 5 }
```

## Interaction Routes (`interactions.routes.ts`)

### `POST /api/v1/interactions/check`
```json
// Request
{ "medicines": ["DrugA", "DrugB", "DrugC"] }
// Response 200
{
  "warnings": [
    { "pair": ["DrugA", "DrugB"], "severity": "high | moderate | low", "explanation": "string", "guardrailPassed": true }
  ]
}
```

## Watchlist Routes (`watchlist.routes.ts`)

### `POST /api/v1/watchlist`
```json
// Request
{ "medicine": "string", "targetPrice": 100.00 }
// Response 201
{ "watchlistId": "uuid", "medicine": "string", "targetPrice": 100.00, "status": "active" }
```

### `GET /api/v1/watchlist`
```json
// Response 200
{ "items": [ { "watchlistId": "uuid", "medicine": "string", "targetPrice": 100.00, "currentPrice": 118.00, "status": "active" } ] }
```

### `DELETE /api/v1/watchlist/:id`
```json
// Response 204
```

## Error Format (all endpoints)

```json
{
  "error": {
    "code": "VALIDATION_ERROR | NOT_FOUND | UNAUTHORIZED | UPSTREAM_TIMEOUT | RATE_LIMITED",
    "message": "human-readable string",
    "requestId": "uuid"
  }
}
```

## Versioning

All routes are prefixed `/api/v1/`. Breaking changes will increment the version prefix rather than mutating existing response shapes, so the web app and any future mobile client can upgrade independently.
