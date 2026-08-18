The Gap, Stated Plainly
No product in either table occupies more than two of the five capability columns. Medkart.ai occupies all five:

Price comparison across Indian e-pharmacy platforms.

OCR-based prescription upload feeding directly into comparison.

Generic-substitute ranking with a trust score based on salt-match percentage.

Price-anomaly detection benchmarked against NPPA ceiling prices, with SHAP-based plain-language explanations — not just a flag, but a reason.

RAG-based drug-interaction checking scoped to India, with a safety-guardrail layer preventing hallucinated medical claims from reaching the patient.

Why the Combination Is the Point
Applied engineering novelty rarely means inventing a feature nobody has built. It means combining existing feature categories in a way nobody has combined them, for a market nobody has served that combination in. MediSaathi comes closest with OCR-to-comparison, but stops short of anomaly detection or interaction checking. OmniRx comes closest on the interaction side by bundling price comparison with interaction checking, but is scoped to the US market and does not benchmark against a regulatory ceiling price the way NPPA-based detection does for India.

Evidence This Gap Is Real, Not Assumed
This table is the output of a direct competitive review (see conversation history and docs/product/problem-statement.md), not an unsubstantiated novelty claim. Reviewers evaluating this proposal can independently verify each row against the cited platforms' public feature sets.

Implication for Development Priority
Because the AI-enrichment layer (services/ai-enrichment-service/) is where all five differentiating capabilities live, it should be treated as the highest-priority component to de-risk early, ahead of expanding platform coverage or polishing the UI. A working comparison table across two platforms with a working anomaly detector is a stronger proof of novelty than five platforms with no anomaly detection.