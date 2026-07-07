# CiviSence Content Moderation Policy

**Version:** 0.0.0.1  
**Effective Date:** July 8, 2026  
**Last Updated:** July 8, 2026  

---

## 1. Introduction
At CiviSence, we strive to build a platform that allows campus and neighborhood communities to aggregate demand, highlight civic issues, and coordinate resolutions effectively. To maintain a safe, clean, and collaborative environment, we enforce this Content Moderation Policy. This document explains how we review, moderate, and manage user-generated content—including issue reports (posts), comments, images, videos, and document uploads.

---

## 2. Moderation Scope
This policy applies to all forms of content submitted to the Platform:
* **Issue Reports:** Titles, text descriptions, custom location details, building designations, and category tags.
* **Comments:** Discussion text, queries, and replies posted under public issue records.
* **Media Uploads:** User profile pictures (avatars), photographs documenting issue states, videos showing operational faults, resolution photos/videos, and verification document proofs.
* **Private Messages:** Text transmitted directly between two users.

---

## 3. Moderation Workflow and Systems
CiviSence employs a three-tier moderation model combining automated detection systems, user-driven reporting, and manual review by administrators.

```
                  ┌──────────────────────────────┐
                  │   User Uploads Content       │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │  1. AUTOMATED CHECKS         │
                  │  - Fuzzy duplicate matching  │
                  │  - Submission rate limits    │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │  2. REACTIVE REPORTING       │
                  │  - Peer flagging / Reports   │
                  │  - Statuses set to "Review"  │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │  3. ADMINISTRATIVE ACTION    │
                  │  - Delete, edit, or spam tag │
                  │  - Action logged in Audit Log│
                  └──────────────────────────────┘
```

### 3.1 Automated Normalization and Filters
To prevent database clutter and spam farms, CiviSence uses pre-processing algorithms:
* **Fuzzy Duplicate Detection:** When an issue is reported, our system strips punctuation and whitespace to create a normalized `search_name`. It runs a similarity matching check against database records within the same geographic coordinates or buildings. If a close match is found, the system registers the submission as an upvote rather than creating a duplicate post.
* **Rate Limits:** We restrict users to a maximum of three (3) issue reports per 24-hour window. This is monitored via Redis cache and celery limits.
* **Keyword Filters:** Automatically highlights reports containing known slurs, profanity, or threatening text for immediate administrator inspection.

### 3.2 Reactive Moderation (User Flagging)
Users can report inappropriate content, spam, or guidelines violations using in-app flagging buttons. Once an issue or comment is flagged:
* The report is entered into the administrative review queue.
* The system evaluates the number of unique reports against the post. High-frequency flags may temporarily hide the content from the public organization feed pending inspection.

### 3.3 Manual Administrative Review
Administrators and designated official moderators of an Organization review flagged content. They have authorization to:
* **Change Statuses:** Reclassify an issue's status to `SPAM` or `CLOSED`.
* **Remove Content:** Permanently delete comments, media files, or issue descriptions that violate our guidelines.
* **Edit Metadata:** Correct incorrect category tags or update spelling/building locations to aid resolution, while keeping the core report description unchanged.

---

## 4. Prohibited Content Standards
Content is subject to immediate moderation and deletion if it violates any of the following standards:

### 4.1 Spam and Commercial Content
* Repetitive posts, advertisements, marketing links, or affiliate codes.
* Duplicate issue reports generated to manipulate community priority metrics.

### 4.2 Harassment and Abuse
* Defamatory statements, personal insults, doxxing (posting telephone numbers, emails, room numbers), or hostile comments directed at maintenance staff, officials, students, or neighbors.

### 4.3 Explicit or Violent Media
* Nudity, graphic violence, self-harm media, or content designed to offend or shock.

### 4.4 Copyrighted Material
* Photos, videos, or documents uploaded without authorization from the copyright holder.

---

## 5. Enforcement and Penalty Scale
Administrators execute penalties based on the severity and frequency of violations:

1. **Content Removal:** Deleting the specific comment, media file, or issue record.
2. **Issue Status: SPAM:** Reclassifying an issue as `SPAM`. This removes the post from the public organization feed and locks it from further upvotes.
3. **Temporary Account Suspension:** Restricting the user from submitting new reports, comments, or votes for a designated duration (e.g., 7 days).
4. **Permanent Account Ban:** Setting `is_banned = True` in the database, terminating active user sessions, and invalidating FCM notification tokens. The user is permanently blocked from using the platform.

---

## 6. Audit Trails
For governance and legal accountability, all moderator decisions—including bans, suspensions, and content deletions—are permanently logged in the `platform_audit_logs` database table. This audit entry records:
* The administrator's unique ID.
* The action type (e.g., `SUSPEND_USER`, `DELETE_COMMENT`).
* The target account ID.
* The IP address and a JSON description of the infraction.

---

## 7. Appeals Process
If you believe your content was moderated or your account was restricted in error, you may file an appeal:
1. Send an email to [civisence@gmail.com](mailto:civisence@gmail.com) or [civisence@zohomail.in](mailto:civisence@zohomail.in) with the subject line "Moderation Appeal - [Your Name/Email]".
2. Include your registered account email, the details of the deleted content or restriction, and a clear explanation of why the decision should be reversed.
3. Appeals are reviewed by platform executives within five (5) business days, and all final decisions will be notified via email.
