Problem Statement
The Gap
Medicine price comparison and drug-safety checking in India currently suffer from two distinct, unaddressed gaps. This was confirmed through a structured review of eight existing Indian price-comparison platforms and four drug-interaction checkers (see docs/product/novelty.md for the full comparison table).

1. Unverified Price Anomalies
Existing Indian price-comparison platforms — MedCompare, MediSaathi, MedScanner, MedikWise, MediBachat, RxJinn, CheapestInIndia, and Medkart's own comparison tool — display prices scraped from pharmacy listings without checking whether a listed price deviates abnormally from the NPPA (National Pharmaceutical Pricing Authority) government ceiling price. None of them explain why a price looks anomalous; they simply display it as one more row in a comparison table. A patient has no way to know whether a price is fair, inflated, or a data error without manually cross-referencing government price-control lists themselves.

2. Disconnected Safety Checking
Drug-interaction checking exists as a mature, separate product category — CheckDrugInteractions, DrugPair, OmniRx, InteractSafe — but every one of these tools operates in the US market, sourced from FDA/NIH data, and none is combined with price comparison. No reviewed Indian price-comparison platform integrates interaction warnings, generic-substitute trust scoring, or an OCR-to-comparison pipeline into a single flow. A patient buying multiple prescribed medicines today has to use one tool to compare prices and, separately, would have no India-specific tool at all to check whether those medicines are safe to take together.

Why This Matters Now
A price-comparison tool is only as trustworthy as its ability to flag manipulated prices. A medicine-purchase workflow is only as safe as its ability to warn against dangerous combinations before the purchase happens, not after. Both gaps compound: a patient who saves money via price comparison but unknowingly buys an unsafe drug combination has been failed by the tool that was supposed to help them. This motivates addressing price integrity and interaction safety as first-class engineering concerns within the same pipeline, rather than as afterthoughts bolted onto a comparison feature.

Who This Affects
Patients managing chronic conditions who purchase multiple prescriptions repeatedly and are most exposed to both overpricing and interaction risk over time.

Price-sensitive households for whom even a 15–20% price deviation from NPPA ceilings represents a meaningful cost, especially for long-term medication.

Caregivers managing prescriptions for elderly or dependent family members, who often coordinate multiple prescriptions from multiple doctors without a unified interaction check.

Scope Boundary
This problem statement is scoped to prescription and OTC medicine price comparison and interaction checking across five major Indian e-pharmacy platforms (1mg, PharmEasy, Netmeds, Truemeds, Apollo 24/7). It explicitly does not attempt to replace professional medical advice, diagnose conditions, or recommend dosage changes — the system flags and explains; a licensed pharmacist or physician remains the decision-maker (see docs/architecture/threat-model.md for the associated safety-guardrail design).