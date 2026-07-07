# CiviSence Cookie Policy

**Version:** 0.0.0.1  
**Effective Date:** July 8, 2026  
**Last Updated:** July 8, 2026  

---

## 1. Introduction
This Cookie Policy describes how CiviSence uses cookies, web storage, local cache, and similar tracking technologies on our website, web dashboards, and related services. CiviSence is built to minimize invasive web tracking. We do not use third-party advertising cookies or tracking pixels. We use only necessary cookies and local storage tokens required to run secure login sessions and save your user settings.

---

## 2. What are Cookies and Web Storage?
* **Cookies:** Small text files placed on your device by a website server. They can be "session cookies" (which expire when you close your web browser) or "persistent cookies" (which remain on your device for a set period).
* **Local and Session Storage:** Web storage APIs built into your browser that allow websites to store data key-values locally. These function similarly to cookies but have larger storage limits and do not transmit data headers automatically on every API request.

---

## 3. How CiviSence Uses Cookies and Storage
We classify the storage elements used by our web portal into the following categories:

| Storage Type | Technology | Purpose & Duration |
| :--- | :--- | :--- |
| **Authentication & Security** | JWT Storage (Cookie/Local Storage) | Stores your cryptographically signed JWT token to keep you logged in. Valid for the session duration or up to 30 days. |
| **Session Identification** | `token_jti` tracking | Corresponds to active rows in `user_sessions` to prevent token replay attacks and session hijacking. Expired upon logout. |
| **User Preferences** | Local Storage (`theme`, `active_organization_id`) | Saves your preferences, such as selected Dark/Light mode and active Organization context. Persistent until browser cache is cleared. |
| **Edge Routing & CDN** | Host Cookies (Vercel / Firebase Hosting) | Essential cookies used by our CDN providers to route request traffic to the nearest edge location. Expired upon session close. |

---

## 4. Analytical Tracking and Events
We do not load Google Analytics, Facebook pixels, or other cross-site advertising trackers on our web portals. Instead:
* **Internal User Events:** We record behavioral metrics internally inside the `user_events` table (e.g. tracking issue views or search metrics). This is linked to your account ID for performance analytics but is never shared with third-party advertising companies.

---

## 5. Controlling Cookies and Storage
Most web browsers are configured to accept cookies by default. You can adjust your browser settings to:
* Block or delete all cookies.
* Block third-party cookies specifically.
* Prompt you before a website places a cookie.
* Clear all local storage when you close the browser.

To adjust these settings, consult your browser's documentation (e.g. Chrome settings > Privacy and Security > Cookies).

*Note: Since our cookies are strictly necessary to authorize logins and match active session structures, disabling or blocking them will prevent you from accessing the CiviSence platform.*

---

## 6. Updates to This Policy
We may revise this Cookie Policy occasionally to align with updates in browser privacy controls or changes in our CDN configurations. Any revisions will update the version number and last updated parameters.
