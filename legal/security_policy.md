# CiviSence Security Policy

**Version:** 0.0.0.1  
**Effective Date:** July 8, 2026  
**Last Updated:** July 8, 2026  

---

## 1. Security Overview
CiviSence is built with privacy and data protection at its core. This Security Policy outlines the technical measures, cryptographic protocols, and system controls we enforce to protect your data, secure our API endpoints, and maintain high availability across our Supabase databases, Vercel deployments, and Redis cache clusters.

---

## 2. Authentication and Session Protections

### 2.1 Cryptographic Key Signing
* **Algorithm:** We authorize API requests using JSON Web Tokens (JWT) signed with HMAC-SHA256 signatures using a secure, server-side secret key.
* **Expiration:** Access tokens are short-lived (expiring in 30 minutes) and refresh tokens expire in 30 days, minimizing the exposure window of compromised keys.

### 2.2 User Session Tracking
To defend against session hijacking and token replay attacks, our backend API runs the following checks on every request:
* **Unique Token JTI:** Each token carries a unique token identifier (`token_jti`). This must match an active session entry in our `user_sessions` database table.
* **User-Agent Verification:** If the user-agent profile changes mid-session, the backend flags the request as anomalous and initiates session revocation.
* **IP Logging:** We log session IP addresses to inspect for credential stuffing and multi-region logins.

---

## 3. Database Security Controls

### 3.1 Encryption in Transit and at Rest
* **In-Transit Encryption:** All API-to-database and client-to-API traffic is forced through SSL/TLS tunnels (database URL configured with `?sslmode=require`).
* **At-Rest Encryption:** Databases hosted on Supabase use industry-standard AES-256 encryption.

### 3.2 Mitigation of Common Attack Vectors
* **SQL Injection (SQLi):** We prevent SQL injection vulnerabilities by generating database queries through SQLAlchemy's Object Relational Mapper (ORM). This forces the pre-compilation and parameterization of all user inputs.
* **Database Timeout Limits:** To block resource exhaustion attacks and long-hanging transaction deadlocks, we configure strict limits in our core connection setup:
  * **Connect Timeout:** 5 seconds (fails fast if Supabase is unreachable).
  * **Statement Timeout:** 30 seconds (kills long-running queries).
  * **Lock Timeout:** 10 seconds (prevents lock waits).

---

## 4. API and Infrastructure Defenses

### 4.1 Rate Limiting and Spam Prevention
* **Redis Caching:** We use a centralized Redis cache to manage API rate limit logs. Requests exceeding threshold rates receive an HTTP `429 Too Many Requests` code.
* **Submission Limits:** Users are restricted to a maximum of 3 issue reports per 24 hours to prevent catalog flooding.

### 4.2 File Upload Validation
User media uploads (avatars, photographs, document proofs) are routed through Cloudinary. We enforce:
* Strict MIME-type checks (only specific image and video formats allowed).
* Maximum file size limits.
* Sandboxed file processing to mitigate remote execution exploits.

### 4.3 Error Tracking and Telemetry
We monitor platform performance using Sentry. Sentry filters are configured to strip raw password parameters, credentials, and JWT tokens before shipping stack traces to prevent credential exposure in diagnostic logs.

---

## 5. Security Disclosures
If you discover a security vulnerability within CiviSence, please do not disclose it publicly. Report it directly to our security engineers at [civisence@gmail.com](mailto:civisence@gmail.com) or [civisence@zohomail.in](mailto:civisence@zohomail.in). We will investigate, confirm, and patch valid vulnerabilities within a reasonable timeframe.
