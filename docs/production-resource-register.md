# Production And Staging Resource Register

## 1. Purpose

Chemidot is moving from an MVP to a professional B2B chemical marketplace.
This register provides a controlled, non-sensitive record of staging and
production resource ownership, access responsibility, recovery ownership,
monitoring accountability, and release responsibility.

This register protects:

- Live and rehearsal environments from ambiguous ownership or accidental use.
- Customer, supplier, administrator, RFQ, quotation, and order records.
- Future controlled chemical and commercial document handling.
- Release, migration, incident-response, and recovery accountability.

This register must never include secrets, credentials, database connection
configuration, access-enabling URLs, password material, tokens, private keys,
environment-file contents, or screenshots that expose sensitive values.

## 2. Non-Sensitive Documentation Rules

1. Record only roles, approved non-sensitive resource labels, status, dates,
   and non-sensitive evidence references.
2. Never record secret values or any value that can grant access.
3. Never record a database URL variable, database credential, or full
   connection string.
4. Never record tokens, passwords, private keys, signing material, or reset
   values.
5. Never attach screenshots, terminal output, logs, or exports that expose
   secrets or environment settings.
6. Use placeholders until information is confirmed through an approved
   control-review process, such as `[owner to confirm]`,
   `[resource label only]`, `[status to confirm]`, and
   `[do not record secret values]`.
7. Identify where secret settings are governed only by non-sensitive platform
   or owner labels; never copy the values into this document.

## 3. Resource Ownership Register

Populate this master register only through authorized review. Resource labels
must be non-sensitive identifiers and must not include access paths or
credential material.

| Environment | Resource Category | Resource Label | Owner Role | Access Owner | Backup Owner If Applicable | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Staging | Application hosting | `[resource label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[not applicable or owner to confirm]` | `[status to confirm]` |
| Staging | API hosting | `[resource label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[not applicable or owner to confirm]` | `[status to confirm]` |
| Staging | Database | `[resource label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[backup owner to confirm]` | `[status to confirm]` |
| Staging | Storage | `[resource label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[backup/retention owner to confirm]` | `[status to confirm]` |
| Staging | Email provider | `[provider label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[not applicable or owner to confirm]` | `[status to confirm]` |
| Staging | Domain/DNS | `[domain label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[not applicable]` | `[status to confirm]` |
| Staging | Monitoring/logging | `[resource label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[retention owner to confirm]` | `[status to confirm]` |
| Staging | Secrets/environment variable location | `[control location only; do not record secret values]` | `[owner to confirm]` | `[access owner to confirm]` | `[not applicable]` | `[status to confirm]` |
| Staging | CI/CD provider | `[provider label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[not applicable]` | `[status to confirm]` |
| Production | Application hosting | `[resource label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[not applicable or owner to confirm]` | `[status to confirm]` |
| Production | API hosting | `[resource label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[not applicable or owner to confirm]` | `[status to confirm]` |
| Production | Database | `[resource label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[backup owner to confirm]` | `[status to confirm]` |
| Production | Storage | `[resource label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[backup/retention owner to confirm]` | `[status to confirm]` |
| Production | Email provider | `[provider label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[not applicable or owner to confirm]` | `[status to confirm]` |
| Production | Domain/DNS | `[domain label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[not applicable]` | `[status to confirm]` |
| Production | Monitoring/logging | `[resource label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[retention owner to confirm]` | `[status to confirm]` |
| Production | Secrets/environment variable location | `[control location only; do not record secret values]` | `[owner to confirm]` | `[access owner to confirm]` | `[not applicable]` | `[status to confirm]` |
| Production | CI/CD provider | `[provider label only]` | `[owner to confirm]` | `[access owner to confirm]` | `[not applicable]` | `[status to confirm]` |

## 4. Staging Resource Register

Staging must be separated from production and used for reviewed release and
migration rehearsal only under the applicable runbooks.

| Resource | Non-Sensitive Label | Owner Role | Status | Notes |
| --- | --- | --- | --- | --- |
| Frontend hosting | `[resource label only]` | `[owner to confirm]` | `[status to confirm]` | `[staging purpose/separation note only]` |
| Backend/API hosting | `[resource label only]` | `[owner to confirm]` | `[status to confirm]` | `[staging purpose/separation note only]` |
| Staging database | `[resource label only; no connection details]` | `[owner to confirm]` | `[status to confirm]` | `[backup/rehearsal status to confirm]` |
| Staging storage | `[resource label only]` | `[owner to confirm]` | `[status to confirm]` | `[data class/retention status to confirm]` |
| Staging domain | `[domain label only]` | `[owner to confirm]` | `[status to confirm]` | `[non-sensitive routing note only]` |
| Staging environment variables/secrets location | `[control location only; do not record secret values]` | `[owner to confirm]` | `[status to confirm]` | `[access review reference only]` |
| Staging monitoring/logging | `[resource label only]` | `[owner to confirm]` | `[status to confirm]` | `[retention/alert status to confirm]` |
| Staging CI/CD | `[provider label only]` | `[owner to confirm]` | `[status to confirm]` | `[release control reference only]` |

## 5. Production Resource Register

Production is the live service environment; production PostgreSQL remains the
transactional system of record. Production changes require the approved
release, migration, privileged-operation, and recovery controls that apply.

| Resource | Non-Sensitive Label | Owner Role | Status | Notes |
| --- | --- | --- | --- | --- |
| Frontend hosting | `[resource label only]` | `[owner to confirm]` | `[status to confirm]` | `[production control reference only]` |
| Backend/API hosting | `[resource label only]` | `[owner to confirm]` | `[status to confirm]` | `[production control reference only]` |
| Production database | `[resource label only; no connection details]` | `[owner to confirm]` | `[status to confirm]` | `[backup/migration-control status to confirm]` |
| Production storage | `[resource label only]` | `[owner to confirm]` | `[status to confirm]` | `[data class/retention status to confirm]` |
| Production domain | `[domain label only]` | `[owner to confirm]` | `[status to confirm]` | `[non-sensitive routing note only]` |
| Production environment variables/secrets location | `[control location only; do not record secret values]` | `[owner to confirm]` | `[status to confirm]` | `[access review reference only]` |
| Production monitoring/logging | `[resource label only]` | `[owner to confirm]` | `[status to confirm]` | `[retention/alert status to confirm]` |
| Production CI/CD | `[provider label only]` | `[owner to confirm]` | `[status to confirm]` | `[release control reference only]` |

## 6. Access Control Record

Use roles rather than personal usernames unless a separately approved control
record requires named assignment. Keep approval and review evidence
non-sensitive.

| Access Area | Authorized Role(s) | Access Owner | Approval/Evidence Reference | Review Cadence | Status |
| --- | --- | --- | --- | --- | --- |
| Production deployment settings | `[authorized role to confirm]` | `[access owner to confirm]` | `[approval/evidence reference only]` | `[cadence to confirm]` | `[status to confirm]` |
| Production database | `[authorized operator role to confirm]` | `[access owner to confirm]` | `[approval/evidence reference only]` | `[cadence to confirm]` | `[status to confirm]` |
| Staging database | `[authorized operator role to confirm]` | `[access owner to confirm]` | `[approval/evidence reference only]` | `[cadence to confirm]` | `[status to confirm]` |
| Secrets/environment variable settings | `[authorized role to confirm]` | `[access owner to confirm]` | `[approval/evidence reference only; no values]` | `[cadence to confirm]` | `[status to confirm]` |
| Privileged script execution | `[authorized operation-specific role to confirm]` | `[access owner to confirm]` | `[approval/audit reference only]` | `[cadence to confirm]` | `[status to confirm]` |

| Review Activity | Responsible Role | Cadence | Last Review | Next Review | Evidence Reference |
| --- | --- | --- | --- | --- | --- |
| Production access review | `[owner to confirm]` | `[cadence to confirm]` | `[date to confirm]` | `[date to confirm]` | `[non-sensitive reference only]` |
| Staging access review | `[owner to confirm]` | `[cadence to confirm]` | `[date to confirm]` | `[date to confirm]` | `[non-sensitive reference only]` |
| Privileged-operation access review | `[owner to confirm]` | `[cadence to confirm]` | `[date to confirm]` | `[date to confirm]` | `[non-sensitive reference only]` |

## 7. Backup And Recovery Ownership

This section records accountability only. Backup locations, restore
credentials, and access-enabling resource details must not be entered here.

| Environment/Asset | Database Backup Owner | Backup Schedule | Snapshot Capability Status | Restore Owner | Last Restore Test | Evidence Reference | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Staging database | `[backup owner to confirm]` | `[schedule to confirm]` | `[status to confirm]` | `[restore owner to confirm]` | `[date/outcome to confirm]` | `[non-sensitive reference only]` | `[status to confirm]` |
| Production database | `[backup owner to confirm]` | `[schedule to confirm]` | `[status to confirm]` | `[restore owner to confirm]` | `[date/outcome to confirm]` | `[non-sensitive reference only]` | `[status to confirm]` |

Before a production schema change or material production data operation, the
applicable runbook requires confirmation of a backup or snapshot and the
approved recovery decision path.

## 8. Monitoring And Alert Ownership

| Environment | Logging Owner | Alert Owner | Alert Channels | Uptime Monitoring Status | Error Monitoring Status | Incident Owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Staging | `[owner to confirm]` | `[owner to confirm]` | `[approved channel label only]` | `[status to confirm]` | `[status to confirm]` | `[owner to confirm]` | `[status to confirm]` |
| Production | `[owner to confirm]` | `[owner to confirm]` | `[approved channel label only]` | `[status to confirm]` | `[status to confirm]` | `[owner to confirm]` | `[status to confirm]` |

Logging and alert evidence may contain timestamps, incident references, and
outcomes, but must not copy credentials, sensitive environment settings, or
unredacted output into this register.

## 9. Production Release Responsibility

| Responsibility | Assigned Role | Required Evidence | Status |
| --- | --- | --- | --- |
| Approves production release | `[release approver role to confirm]` | `[approval reference only]` | `[status to confirm]` |
| Merges approved pull requests | `[repository maintainer role to confirm]` | `[review/merge reference only]` | `[status to confirm]` |
| Confirms production deployment target and artifact | `[release operator role to confirm]` | `[deployment identity reference only]` | `[status to confirm]` |
| Performs post-deployment smoke test | `[validation owner role to confirm]` | `[smoke-test outcome reference only]` | `[status to confirm]` |
| Records incident/release notes | `[operations record owner to confirm]` | `[non-sensitive note reference only]` | `[status to confirm]` |

Production deployments remain application-only operations. Database migrations
and privileged scripts use their own approved procedures and must not be
attached implicitly to a deployment.

## 10. Resource Change Process

1. Propose an addition or update using a non-sensitive resource label,
   environment, responsible role, access owner, recovery implications, status,
   and evidence-reference location.
2. Obtain review from the applicable platform/release owner and, for
   production resources, the designated production control owner before the
   entry is treated as confirmed.
3. Record only allowed evidence: approval identifiers, review dates, role
   ownership, provider/category labels, non-sensitive resource labels,
   recovery-test outcomes, and links or references that do not grant access.
4. Do not record prohibited evidence: credentials, environment values,
   connection strings, access-enabling URLs, tokens, password/reset material,
   private keys, sensitive logs, or screenshots revealing settings.
5. Require a new review when a resource owner, access owner, backup/restore
   owner, hosting/provider category, environment separation control, or
   monitoring status changes.
6. Rotate affected secrets through the approved security/incident process when
   exposure is suspected, access should be revoked, credential ownership
   changes, or an applicable security policy requires rotation. Record only
   the non-sensitive decision and outcome reference.

## 11. Current Known Gaps

- Resource owners, access owners, authorized operator roles, and review
  cadence must be filled in manually through approved control review.
- Backup ownership, schedule, snapshot capability, restore ownership, and
  restore-test status remain to be confirmed.
- Monitoring, logging, alerting, and incident-response ownership/status remain
  to be confirmed.
- Production and staging non-sensitive resource labels remain to be confirmed.
- AWS/private S3 document-storage resources are not treated as created or
  approved by this register; they remain future work unless separately
  approved.
- Stronger automated environment identity and release-time target checks are
  future work.

## 12. Next Recommended Tasks

| Suggested Work Item | Purpose |
| --- | --- |
| `docs/backup-restore-runbook` | Define backup ownership, snapshot expectations, restore authorization, testing, and recovery evidence. |
| `docs/monitoring-alerting-plan` | Assign monitoring, alert, incident, retention, and escalation ownership. |
| `ci/migration-file-safety-checks` (later) | Extend automated controls to reviewed migration artifacts and plan evidence after migration tooling is finalized. |
| `feature/private-file-storage-foundation` (later) | Design and introduce private controlled document storage only after access, retention, ownership, and operational controls are approved. |

This register records accountable ownership and control status without
recording credentials. It supports Chemidot's approved direction to retain
PostgreSQL, separate database and privileged operations from deployment, and
introduce new infrastructure only through reviewed, auditable work.
