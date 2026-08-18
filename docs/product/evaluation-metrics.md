# Evaluation Metrics

## Purpose

This document defines how success is measured for Medkart.ai's two core problems — price-anomaly detection and drug-interaction safety checking — plus supporting pipeline metrics. Every metric below is attributable to a specific service and comparable against a defined baseline, so results are falsifiable rather than asserted.

## Primary Metric: Price-Anomaly Detection F1 Score

**What:** F1 score of the proposed Isolation Forest anomaly detector (`ai-enrichment-service/anomaly/`), measured on a labelled dataset of medicine listings (normal, mildly overpriced, severely overpriced relative to NPPA ceiling prices).

**Baseline:** A rule-based detector using a fixed percentage-deviation threshold from the NPPA ceiling price.

**Target:** The proposed detector should exceed the rule-based baseline's F1 score. Specific numeric targets will be set once baseline results are available from the initial labelled dataset — no target is asserted without baseline evidence first.

**Attribution:** Computed by comparing detector predictions against ground-truth labels on a held-out split of the labelled dataset, not on training data.

## Secondary Metrics

### Price-Anomaly Detection
- **Precision** — of listings flagged anomalous, what fraction are true anomalies (vs. false alarms that would erode patient trust in the flag).
- **Recall** — of true anomalies in the held-out set, what fraction are caught.
- **False-positive rate** — critical to track separately from precision, since a high false-positive rate makes the feature unusable even with decent precision.
- **End-to-end enrichment latency** — time from unified price schema input to anomaly flag + SHAP explanation output.

### Drug-Interaction Checking
- **Precision/recall of flagged interactions** against a curated reference set of known interaction pairs, compared against a keyword-match baseline (i.e., simple string matching against a static interaction table, without RAG or LLM generation).
- **Guardrail pass rate** — percentage of LLM-generated interaction explanations that pass the safety-guardrail layer without requiring modification or suppression (NFR-9). A low pass rate signals the underlying generation step needs tightening, not just the guardrail.

### OCR & Normalization
- **OCR field-level accuracy** — character/field accuracy on a held-out set of prescription images, split by handwritten vs. printed prescriptions (these are expected to differ substantially).
- **Normalization match-confidence distribution** — tracks what fraction of normalization attempts fall above/below the auto-match confidence threshold (NFR-13), surfacing how often low-confidence matches require logging/review.

### Comparison Performance
- **Cached response time** — target under 2 seconds (NFR-1).
- **Full live comparison time** — target under 15 seconds across all 5 platforms, with partial results streamed as they arrive rather than the full 15 seconds being a blocking wait (NFR-2).
- **Platform coverage rate** — fraction of comparison requests that successfully return data from all five platforms vs. falling back to cached/seed data for one or more.

## Pilot Validation Plan

- **Participants:** approximately 40–60 students and staff who regularly purchase prescription medicine, recruited from the department/batch.
- **Duration:** 2–3 weeks, covering repeated prescription uploads and comparison queries across all five platforms.
- **Tracked during pilot:** anomaly-flag rate, interaction-flag rate, OCR correction rate (how often a user manually corrects OCR output before submitting), and repeat usage (a proxy for perceived usefulness).
- **Not tracked during pilot (deferred):** long-term health outcomes or actual purchase-decision changes — the pilot measures system correctness and usability, not downstream medical impact, which is out of scope for a course-level evaluation.

## Reporting Format

Each iteration's evaluation results should report: metric value, baseline value, delta, and sample size (n listings / n interaction pairs / n pilot participants), so that improvements are traceable across iterations rather than reported as a single final number with no trend.
