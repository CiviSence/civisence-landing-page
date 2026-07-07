# CiviSence Acceptable Use Policy

**Version:** 0.0.0.1  
**Effective Date:** July 8, 2026  
**Last Updated:** July 8, 2026  

---

## 1. Purpose
The CiviSence Acceptable Use Policy (AUP) outlines the rules governing the proper use of our Services, APIs, web portals, and mobile applications. This policy is designed to protect our infrastructure, databases, and users from abuse, security threats, performance degradation, and malicious actors.

---

## 2. Infrastructure Security and System Integrity
You must not engage in any activity that compromises the security, stability, or accessibility of CiviSence's API or databases. Specifically, you agree not to:
* **Perform Automated Scanning:** Probe, scan, or test the vulnerability of our API endpoints, Redis cache layers, or Supabase databases without explicit, prior written authorization from our core developers.
* **Bypass Authentication:** Attempt to bypass JWT validation, forge signatures, manipulate session states, or access another user's authorization tokens.
* **Inject Malicious Payloads:** Submit reports, comments, or document uploads containing SQL injections, XSS payloads, viruses, Trojans, worms, or other destructive scripts.
* **Deny Service (DoS):** Flood our API endpoints with traffic to exceed query thresholds, exhaust resources, or cause system downtime.

---

## 3. Account and Identity Integrity
To maintain a verified and reliable community catalog, you agree to:
* **Use Single Accounts:** You shall not create multiple fictitious accounts to upvote issues or manipulate poll results.
* **Prevent Credential Sharing:** Do not share your password or active session tokens with others. You are responsible for all actions logged under your user ID.
* **No Referral Abuse:** You must not create fake user chains or "referral farms" to manipulate user reputation statistics or bypass verification rules. The database logs `referred_by_user_id` to detect and flag such coordinate abuse.

---

## 4. API and Scraping Restrictions
* **No Unauthorized Crawling:** You must not scrape, crawl, harvest, or index the platform's issue registry, organization directories, comments, or user profiles using automated software (bots, crawlers, or scrapers) without our written consent.
* **Rate Limits Compliance:** You must respect the API rate limits configured in our Redis cache layers. Bypassing or attempting to disable rate limits via proxy rotations or script setups is a direct violation of this policy.

---

## 5. Violation Enforcement
If we discover a violation of this Acceptable Use Policy, we may immediately take one or more of the following actions without notice or liability:
* Rotate session authorization keys and expire all active tokens.
* Block or throttle the offending IP address or IP ranges.
* Set the target user account to banned (`is_banned = True`) and log the event in our platform audit tracks.
* Report system breaches, cyber attacks, or identity fraud to the relevant university/school authorities, local municipal officers, or law enforcement agencies.
