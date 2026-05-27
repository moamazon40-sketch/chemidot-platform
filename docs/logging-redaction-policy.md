# Logging And Redaction Policy

## 1. Purpose

Chemidot is moving from an MVP to a professional B2B chemical marketplace.
This policy defines what may and may not appear in logs, dashboards, pull
requests, issues, incident notes, screenshots, tickets, runbooks, support
communications, and operational evidence.

This policy protects:

- Customer, supplier, and administrator account and access information.
- RFQ, quotation, order, and related marketplace business records.
- Deployment, monitoring, incident, recovery, and privileged-operation
  evidence.
- Future controlled private chemical and commercial document workflows.
- Credentials, protected configuration, and other access-enabling material.

This policy does not authorize access to logs, environments, data, secrets, or
documents. It does not authorize a deployment, migration, restore, database
operation, privileged script, credential rotation, or incident recovery
action. Those actions require their separately approved procedures, assigned
roles, and non-sensitive evidence.

## 2. Logging Principles

1. Logs are operational evidence used to detect issues, support triage,
   verify outcomes, and support accountable review.
2. Logs and all derived evidence must be non-sensitive and limited to what is
   necessary to understand status, impact, and follow-up.
3. Secret, credential, protected configuration, or access-enabling values must
   never be logged, copied, displayed, or retained in operational records.
4. Redact protected or unnecessary detail before sharing, attaching,
   screenshotting, exporting, or pasting evidence.
5. Record the least necessary detail: prefer safe identifiers, statuses,
   counts, workflow labels, and summarized outcomes over raw payloads or
   records.
6. Incident urgency does not permit exposing protected values or bypassing
   redaction expectations.
7. A log or alert observation does not authorize a corrective or privileged
   operation.

## 3. Never Log Or Paste

Do not place any of the following into application logs, platform logs, CI
logs, dashboards, tickets, screenshots, incident records, pull requests,
issues, runbooks, chat, support communications, or operational reports:

- Passwords, temporary passwords, or password hashes.
- Authentication tokens, refresh tokens, bearer values, or session secrets.
- API keys, signing material, private keys, certificates containing protected
  key material, or other credential values.
- `DATABASE_URL` values, other database connection environment-variable
  values, or full connection strings.
- `.env` contents or copied environment-variable values.
- Full session or cookie values.
- Password reset links, reset codes, or account-recovery values.
- Raw payment secrets or protected payment-provider values, if payment
  capability applies.
- Full customer, supplier, or administrator sensitive data when a safe
  reference or summary is sufficient.
- Private document contents, protected document download links, or
  access-enabling document URLs when controlled private storage exists.
- Raw request or response payloads that contain any protected information.

When investigation needs access to protected information, use only an
approved secure procedure and retain non-sensitive outcome evidence here.

## 4. Allowed Non-Sensitive Evidence

Subject to least-necessary-detail review, evidence may include:

- Timestamps and timezone.
- Request or correlation identifiers that do not carry protected values.
- Deployment identifiers.
- Commit hashes.
- Alert identifiers and incident references.
- Status codes and health-check outcomes.
- Sanitized error summaries.
- Workflow names, such as login, RFQ submission, quotation, or order
  processing.
- Environment labels, such as staging or production.
- Non-sensitive counts, rates, or trend summaries.
- Smoke-test outcomes and validation statuses.
- Reviewer roles, approval references, and follow-up action references.

Permitted evidence must still be reviewed before sharing. An otherwise safe
identifier must not be recorded if it embeds protected or access-enabling
information.

## 5. Redaction Examples

The examples below are invented and contain no real credentials, accounts, or
customer records.

| Unsafe Form | Safe Redacted Or Summarized Form |
| --- | --- |
| `Database connection: [connection value omitted]` | `Database connection: [REDACTED]` |
| `Authorization: Bearer [credential value omitted]` | `Authorization: Bearer [REDACTED]` |
| `User email: buyer.contact@example.invalid` | `User email: b***@example.invalid` or `User: [buyer role reference]` |
| `Authentication failed with raw provider/database diagnostic details` | `Authentication workflow failed; sanitized error category: access unavailable; request reference: [non-sensitive request reference]` |
| `Customer record: [full customer payload omitted]` | `Customer reference: [non-sensitive internal reference]; workflow: RFQ submission; outcome: failed` |

Use `[REDACTED]`, role-based placeholders, or approved non-sensitive internal
references in recorded evidence. Do not begin by copying protected values
into a document and attempting to clean them afterward.

## 6. Where This Policy Applies

This policy applies to all Chemidot operational and collaboration surfaces,
including:

- Application logs and audit logs.
- Hosting, platform, database-health, monitoring, and alert logs or events.
- CI validation and workflow logs.
- GitHub pull requests, reviews, issues, and related attachments.
- Incident records, timelines, post-incident reviews, and escalation notes.
- Monitoring dashboards, alert history, and exported dashboard evidence.
- Screenshots, recordings, exports, and copied terminal output.
- Support messages, chat messages, email drafts, and stakeholder updates.
- Runbooks, operational documentation, release notes, and checklists.
- Operational reports, validation records, backup/restore evidence, and
  privileged-operation evidence.

## 7. Incident Evidence Policy

- Incident evidence must remain non-sensitive, including when investigating
  authentication, database availability, suspected privileged activity, or
  future protected document-access concerns.
- Review screenshots before sharing or attaching them. Crop or redact
  protected areas, and do not retain an unreviewed image as incident
  evidence.
- Do not paste raw logs into incident records, tickets, pull requests, or
  communication threads. Use sanitized summaries and approved references.
- Record timestamps, non-sensitive identifiers, observed impact, affected
  workflow names, decisions, validation outcomes, and follow-up actions.
- Suspected exposure of a secret, credential, protected configuration value,
  or access-enabling detail triggers review and escalation under the
  [Incident Response Runbook](./incident-response-runbook.md).
- Any credential rotation or revocation resulting from suspected exposure
  must occur only through the approved security or incident process; record
  the decision and outcome reference, not the protected value.

## 8. Developer And Operator Checklist

### Before Posting Logs

- [ ] Remove or redact credential values, protected configuration values,
      session/cookie values, recovery values, and sensitive records.
- [ ] Replace raw error output with a sanitized summary where raw text may
      contain protected detail.
- [ ] Include only the minimum timestamps, identifiers, workflow labels, and
      outcomes needed for review.

### Before Creating Or Updating A Pull Request Or Issue

- [ ] Confirm that descriptions, comments, logs, attachments, and screenshots
      contain no protected or access-enabling information.
- [ ] Use non-sensitive evidence references instead of copied operational
      output.
- [ ] Escalate suspected exposure through incident response rather than
      attempting informal cleanup only.

### Before Sharing A Screenshot

- [ ] Review every visible panel, browser field, console area, terminal line,
      and notification for protected information.
- [ ] Redact or omit any sensitive detail before attaching the screenshot.
- [ ] Record only a non-sensitive purpose and evidence reference.

### Before Recording Incident Notes

- [ ] Use sanitized observations, timestamps, affected workflow labels, and
      non-sensitive identifiers.
- [ ] Do not paste raw logs or protected configuration.
- [ ] Record incident handoff and approved corrective-action references where
      applicable.

### Before Sending Customer Or Support Communication

- [ ] Include only approved non-sensitive impact and status summaries.
- [ ] Do not include internal log content, protected identifiers, credentials,
      recovery details, or access-enabling information.
- [ ] Obtain the required review or approval where the incident or
      communication procedure requires it.

## 9. Redaction Ownership And Review

Populate responsibilities only through approved control review. Use role
placeholders and non-sensitive evidence locations only.

| Responsibility | Assigned Role | Review Cadence | Evidence Location | Status |
| --- | --- | --- | --- | --- |
| Evidence owner | `[evidence owner role to confirm]` | `[review cadence to confirm]` | `[non-sensitive evidence location to confirm]` | `[status to confirm]` |
| Reviewer | `[reviewer role to confirm]` | `[review cadence to confirm]` | `[non-sensitive evidence location to confirm]` | `[status to confirm]` |
| Security owner | `[security owner role to confirm]` | `[review cadence to confirm]` | `[non-sensitive evidence location to confirm]` | `[status to confirm]` |
| Incident commander | `[incident commander role to confirm]` | `[review cadence to confirm]` | `[non-sensitive incident evidence location to confirm]` | `[status to confirm]` |
| Retention owner | `[retention owner role to confirm]` | `[review cadence to confirm]` | `[non-sensitive retention evidence location to confirm]` | `[status to confirm]` |

## 10. Prohibited Emergency Behavior

An outage, suspected breach, failed deployment, or urgent customer issue does
not remove redaction requirements.

- No panic screenshots containing secrets, protected settings, sensitive
  records, or access-enabling information.
- No raw environment-file content pasted into chat, tickets, incidents, or
  documentation.
- No full database connection information shared in chat or any operational
  evidence.
- No password, token, key, session, or recovery-value sharing.
- No unredacted raw logs pasted into tickets, issues, pull requests, or
  incident notes.
- No private or protected document content or access links shared through
  public or unapproved channels.
- No improvised publication of protected evidence in order to accelerate
  diagnosis or recovery.

## 11. Current Known Gaps

| Gap | Required Follow-Up | Status |
| --- | --- | --- |
| Redaction tooling not yet automated | Define approved detection and prevention controls for protected output in logs and evidence. | `[status to confirm]` |
| Log retention owner not assigned | Assign retention ownership, retention period, access review, and deletion expectations. | `[status to confirm]` |
| Logging provider not confirmed | Confirm approved logging and monitoring sources through control review. | `[status to confirm]` |
| Customer data classification not finalized | Establish data categories and handling rules for customer, supplier, and operational information. | `[status to confirm]` |
| Private document logging rules pending future storage design | Define safe logging, evidence, retention, and access rules after controlled private storage is approved. | `[future work]` |

## 12. Next Recommended Tasks

| Suggested Work Item | Purpose |
| --- | --- |
| `docs/customer-communication-incident-template` | Define approved non-sensitive customer and stakeholder incident communications. |
| `docs/data-classification-policy` | Classify customer, supplier, operational, and future protected-document data for handling and redaction decisions. |
| `docs/company-membership-permission-model` | Define organizational roles and permissions relevant to access logging, administration, and incident review. |
| `ci/log-secret-scanning-checks` (later) | Add automated review for likely protected output patterns once policy and approved tooling are finalized. |
| `feature/private-file-storage-foundation` (later) | Design protected document storage, access, evidence, and logging controls before implementation. |

This policy complements the
[Monitoring And Alerting Plan](./monitoring-alerting-plan.md), the
[Monitoring Dashboard Checklist](./monitoring-dashboard-checklist.md), and
the [Incident Response Runbook](./incident-response-runbook.md). It keeps
operational evidence useful for detection, review, and accountability while
preventing protected information from becoming part of normal collaboration
or operational records.
