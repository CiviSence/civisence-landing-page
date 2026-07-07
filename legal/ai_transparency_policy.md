# CiviSence AI Transparency Policy

**Version:** 0.0.0.1  
**Effective Date:** July 8, 2026  
**Last Updated:** July 8, 2026  

---

## 1. Purpose
CiviSence is built to help local communities catalog and prioritize civic demands. To improve the user experience, optimize indexing speed, and prevent duplication, we employ algorithms, machine learning models, and automation tools. This AI Transparency Policy explains where algorithmic systems are used, how they process your reports, and our commitments to human oversight.

---

## 2. Where Algorithmic Systems Are Used
Our backend API integrates algorithms in the following core operations:

### 2.1 Fuzzy Search and Organization Matching
* **Description:** When you suggest an organization name or location during registration or onboarding, the system strips punctuation and whitespace to form a simplified `search_name` (e.g. "RV College" becomes "rvcollege").
* **Algorithm:** On PostgreSQL (Supabase), we run similarity checks using a Trigram Index (`gin_trgm_ops`).
* **Purpose:** To map your registration to an existing organization workspace rather than creating duplicate databases.

### 2.2 Priority and Aggregate Score Forecasting
* **Description:** The system aggregates user votes (upvotes and downvotes) to compute an issue priority score.
* **Algorithm:** Pre-computed aggregation runs nightly to reconcile total user activities and project trending issues on the organization dashboard.

### 2.3 Community Sentiment Indexes
* **Description:** We compute daily active snapshot metrics showing the average community sentiment within a specific organization workspace (`avg_sentiment` in `activity_snapshots`).
* **Algorithm:** Natural Language Processing (NLP) models analyze comment blocks and issue descriptions to produce a numeric sentiment score (from -1.0 to +1.0).
* **Purpose:** To help campus or municipal administrators gauge general community satisfaction and identify areas of critical concern.

---

## 3. Human-in-the-Loop Moderation Policy
* **No Automated Deletions:** Although automated algorithms scan issue reports for known spam indicators or duplicate profiles, they do not have authority to permanently delete user accounts or block posts.
* **Review Queue:** Flagged issues are placed into the administrative review queue. A human administrator must manually inspect the report and decide whether to mark it as `SPAM` or enforce account restrictions.
* **Error Correction:** If an algorithm mismatched your report to a duplicate entry, administrators have full access controls to reassign, rename, or split the record manually.

---

## 4. Consent and Opt-out
By submitting issues, descriptions, and comments to CiviSence, you consent to our parsing of the text metadata for duplicate matching, categorization, and sentiment indexing. Because these algorithms run as necessary core processes to keep feeds organized and spam-free, you cannot opt out of text parsing while using the Services.
