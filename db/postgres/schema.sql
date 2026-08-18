CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS salts (
  id BIGSERIAL PRIMARY KEY,
  salt_name TEXT NOT NULL UNIQUE,
  salt_strength TEXT,
  therapeutic_class TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS medicines (
  id BIGSERIAL PRIMARY KEY,
  medicine_name TEXT NOT NULL UNIQUE,
  brand_name TEXT NOT NULL,
  salt_id BIGINT REFERENCES salts(id) ON DELETE SET NULL,
  dosage_form TEXT,
  strength TEXT,
  manufacturer TEXT,
  is_rx_only BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS substitutes (
  id BIGSERIAL PRIMARY KEY,
  medicine_id BIGINT NOT NULL REFERENCES medicines(id) ON DELETE CASCADE,
  substitute_medicine_id BIGINT NOT NULL REFERENCES medicines(id) ON DELETE CASCADE,
  rationale TEXT,
  trust_score NUMERIC(4,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (medicine_id, substitute_medicine_id)
);

CREATE TABLE IF NOT EXISTS platforms (
  id BIGSERIAL PRIMARY KEY,
  platform_name TEXT NOT NULL UNIQUE,
  platform_slug TEXT NOT NULL UNIQUE,
  base_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prices (
  id BIGSERIAL PRIMARY KEY,
  medicine_id BIGINT NOT NULL REFERENCES medicines(id) ON DELETE CASCADE,
  platform_id BIGINT NOT NULL REFERENCES platforms(id) ON DELETE CASCADE,
  mrp NUMERIC(10,2) NOT NULL,
  selling_price NUMERIC(10,2) NOT NULL,
  pack_size TEXT,
  currency TEXT NOT NULL DEFAULT 'INR',
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  source_url TEXT,
  UNIQUE (medicine_id, platform_id, pack_size)
);

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
