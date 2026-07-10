# CiviSence Data Deletion Policy

**Version:** 0.0.0.1  
**Effective Date:** July 8, 2026  
**Last Updated:** July 8, 2026  

---

## 1. Introduction
At CiviSence, we value the control you have over your personal data. This Data Deletion Policy describes how we handle account deletion requests, what data is permanently destroyed, what data is anonymized, and what information must be retained for security, auditing, and platform integrity purposes.

---

## 2. Requesting Account Deletion
Users can initiate account deletion through the following channels:
* **In-App Control:** Go to **Account Settings > Delete Account** and confirm using your account password.
* **Email Request:** Send a deletion request from your registered email address to [civisence@zohomail.in](mailto:civisence@zohomail.in) or [civisence@gmail.com](mailto:civisence@gmail.com).

Once a request is initiated:
* For in-app requests, the deletion process starts immediately.
* For email requests, we will verify your identity within forty-eight (48) hours, after which the deletion workflow begins.

---

## 3. Account Deletion Workflow and Technical Scrambling
When an account deletion request is executed, CiviSence performs the following steps in our database:

```
    User Requests Account Deletion
                  │
                  ▼
    1. PROFILE SCRAMBLING & DELETION
    - Set is_active = False
    - Set email, name, DOB, phone, address to cryptorandom text
    - Physical deletion of verification document files
                  │
                  ▼
    2. SESSION & CREDENTIAL REVOCATION
    - Delete all rows in user_sessions & user_devices
    - Wipe FCM push notification tokens
                  │
                  ▼
    3. UGC ANONYMIZATION
    - Map issues to a generic "Deactivated User" system ID
    - Retain votes & comments under "Anonymous User" tags
```

### 3.1 Profile Scrambling and Deletion
* **Flag Setting:** The user row's `is_active` flag is updated to `False`.
* **Personal Fields Scrambling:** To prevent structural breaks in relational schemas (such as foreign keys), the user's personal identification fields—including `email`, `name`, `phone_number`, `address`, `pincode`, `registration_number`, `gender`, and `date_of_birth`  are overwritten with cryptographically generated random characters.
* **Credentials Erasure:** The `hashed_password` is deleted and replaced with an unmatchable system key.
* **Avatar & Media Deletion:** The user's avatar URL is deleted. The physical avatar file stored on Cloudinary is deleted via API request.

### 3.2 Session and Device Revocation
* All active entries in the `user_sessions` table associated with the user ID are deleted.
* All registered device tokens in the `user_devices` table (FCM push notification tokens) are permanently deleted.

### 3.3 Peer and Identity Verification Documents
* Documents uploaded to request identity verification (e.g., student IDs or resident utility bills) are permanently deleted from Cloudinary storage.

---

## 4. Retained Data (Anonymization and Auditing)
To maintain the integrity of our community feedback loops and security auditing records, certain categories of data are retained in an anonymized format:

### 4.1 Issue Reports and Comments
* **Issue Reports:** Issues submitted by the user are **not** deleted, as doing so would destroy the historical timeline of campus/neighborhood infrastructure improvements. Instead, they are anonymized. The author ID is updated to point to a system-wide "Deactivated User" profile.
* **Comments:** Comments posted under public issues are retained but marked as authored by an "Anonymous User."

### 4.2 Votes and Poll Responses
* Votes (upvotes/downvotes) and responses to public/anonymous polls are retained anonymously to maintain the accuracy of community priority rankings and historical scores.

### 4.3 Direct Messages
* Direct messages sent to other users will be marked as deleted in the sender's dashboard. However, to preserve the inbox integrity of the receiver, the message will remain visible to the recipient for up to ninety (90) days before it is permanently pruned, unless the recipient also deletes the thread.

### 4.4 Administrative Audit Logs
* Actions logged in the `platform_audit_logs` table (e.g., records of an admin promoting the user or setting them to banned) are kept permanently. These logs contain the target user's UUID but do not link to any personal name or email post-deletion.

---

## 5. Database Backups and Purge Windows
* **Live System:** Deletion and scrambling take effect on the live system immediately.
* **Backups:** Supabase PostgreSQL databases maintain rolling automated backups. Deleted user records will remain in historical database backups for up to thirty (30) days before being completely overwritten.
* **Cloud Cache:** Caching parameters associated with active tokens stored in Redis are automatically expired within twenty-four (24) hours of session revocation.
