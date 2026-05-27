# Monitoring Dashboard Checklist

## 1. Purpose

Chemidot is moving from an MVP to a professional B2B chemical marketplace.
This checklist defines what operational dashboards should show, who should
review them, when review should occur, and what non-sensitive evidence should
be recorded.

This checklist protects:

- Frontend and API availability.
- Customer, supplier, and administrator authentication workflows.
- RFQ, quotation, order, and related marketplace transaction health.
- Deployment, release-safety, backup/restore, and incident visibility.
- Future controlled private chemical and commercial document workflows.

This document does not authorize a deployment, migration, schema or data
change, restore, privileged operation, access grant, credential change, or
incident recovery action. Dashboard observations identify issues for review
and triage only; any corrective action requires its applicable approved
procedure, accountable owner, and non-sensitive evidence.

## 2. Dashboard Principles

1. Dashboards, panels, screenshots, exports, alerts, and recorded evidence
   must not expose secrets, credentials, protected configuration values,
   access-enabling information, or sensitive customer or supplier data.
2. Dashboards support detection and triage only. A signal identifies a
   concern to assess; it does not itself authorize an operational action.
3. Dashboard signals do not authorize deployments, database operations,
   migrations, restores, privileged scripts, access changes, or credential
   changes.
4. Dashboard review evidence must be non-sensitive, limited to the minimum
   information needed to show what was reviewed and what follow-up is needed.
5. Production dashboards should emphasize actionable signals that help
   accountable roles identify service, workflow, release, security, or
   recovery concerns.
6. Staging dashboards should support safe release and migration rehearsal
   evidence without being treated as proof of production readiness.

## 3. Dashboard Coverage

| Dashboard Area | Visibility Expectation | Non-Sensitive Control Note |
| --- | --- | --- |
| Frontend availability | Show whether the customer-facing site is available and whether availability is degrading over time. | Record availability outcomes and timing only. |
| API health | Show approved API health status, including the configured `/api/healthz` health-check signal where used. | Do not expose configuration values or service-access details. |
| Database availability signals | Show application-visible connectivity or approved provider health indicators needed for triage. | Never display connection strings, credentials, or raw sensitive query/log output. |
| Authentication/login failures | Show failure trends or availability concerns for login and authentication workflows. | Do not display passwords, tokens, session values, or sensitive account information. |
| RFQ flow health | Show approved non-sensitive failure indicators for RFQ creation, submission, or processing. | Record flow outcome trends without customer/commercial detail. |
| Quotation/order flow health | Show approved non-sensitive failure indicators for quotation and order processing. | Escalate material transaction-integrity concerns through incident response. |
| Admin operations health | Show unexpected access or operational failures relevant to administrator workflows. | A signal does not authorize an administrator or privileged action. |
| Deployment status | Show staging and production deployment outcomes and recent failure status. | Record only non-sensitive deployment identifiers and outcomes. |
| Release safety check status | Show whether required release-safety validation has succeeded or failed for the reviewed release. | Existing pull request evidence may reference `pnpm run release:safety-check`. |
| Backup/restore evidence status | Show whether applicable backup confirmation or restore-test evidence has been reviewed. | Reference evidence status only; never expose backup access information. |
| Incident history | Show active and recent alert/incident references, severity, status, and resolution tracking. | Use non-sensitive incident references only. |
| Future private document storage health | Show upload, retrieval, access, scanning, or availability failures after controlled storage is approved and implemented. | `[future monitoring design pending approved private storage capability]` |

## 4. Dashboard Ownership Table

Populate this table only through approved operational control review. Use
roles and non-sensitive evidence locations only.

| Dashboard Area | Environment | Owner | Reviewer | Review Cadence | Evidence Location | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Frontend availability | `[environment to confirm]` | `[owner to confirm]` | `[reviewer to confirm]` | `[cadence to confirm]` | `[non-sensitive evidence location to confirm]` | `[status to confirm]` |
| API health | `[environment to confirm]` | `[owner to confirm]` | `[reviewer to confirm]` | `[cadence to confirm]` | `[non-sensitive evidence location to confirm]` | `[status to confirm]` |
| Database availability signals | `[environment to confirm]` | `[owner to confirm]` | `[reviewer to confirm]` | `[cadence to confirm]` | `[non-sensitive evidence location to confirm]` | `[status to confirm]` |
| Authentication and core flows | `[environment to confirm]` | `[owner to confirm]` | `[reviewer to confirm]` | `[cadence to confirm]` | `[non-sensitive evidence location to confirm]` | `[status to confirm]` |
| Deployments and release safety | `[environment to confirm]` | `[owner to confirm]` | `[reviewer to confirm]` | `[cadence to confirm]` | `[non-sensitive evidence location to confirm]` | `[status to confirm]` |
| Backup/restore evidence | `[environment to confirm]` | `[owner to confirm]` | `[reviewer to confirm]` | `[cadence to confirm]` | `[non-sensitive evidence location to confirm]` | `[status to confirm]` |
| Alerts and incidents | `[environment to confirm]` | `[owner to confirm]` | `[reviewer to confirm]` | `[cadence to confirm]` | `[non-sensitive evidence location to confirm]` | `[status to confirm]` |
| Future private document storage | `[environment to confirm]` | `[owner to confirm]` | `[reviewer to confirm]` | `[cadence to confirm]` | `[non-sensitive evidence location to confirm]` | `[future work]` |

## 5. Production Dashboard Checklist

Complete this review against the approved production dashboard before relying
on its signals for operational triage. Record non-sensitive outcomes only.

- [ ] Site availability is visible.
- [ ] API health is visible.
- [ ] The latest deployment status is visible.
- [ ] Release safety check status is visible.
- [ ] Error trend visibility is available for triage.
- [ ] Login and authentication failure visibility is available.
- [ ] RFQ, quotation, and order flow failure visibility is available.
- [ ] A database availability signal is visible without connection or access
      details.
- [ ] Incident and alert history is visible.
- [ ] Backup/restore status or its approved evidence reference is visible.
- [ ] No secrets, credentials, protected configuration values, sensitive
      business data, or access-enabling details are visible.

## 6. Staging Dashboard Checklist

Use staging dashboard review for release rehearsal, alert testing, and
approved migration-rehearsal evidence where applicable. Staging visibility
does not authorize production action.

- [ ] Staging application availability is visible.
- [ ] Staging API health is visible.
- [ ] Staging deployment status is visible.
- [ ] Staging release rehearsal indicators and outcomes are visible.
- [ ] Staging migration rehearsal evidence is referenced when a separately
      approved migration rehearsal applies.
- [ ] Staging alert test status is visible.
- [ ] No production data, production secrets, credentials, protected
      configuration values, or access-enabling details are visible.

## 7. Review Cadence

| Review Event | Dashboard Review Requirement | Owner | Timing | Evidence |
| --- | --- | --- | --- | --- |
| After every production deployment | Review availability, API health, deployment outcome, release-safety status, error trend, authentication, and core transaction signals. | `[owner to confirm]` | `[post-deployment timing to confirm]` | `[non-sensitive evidence reference only]` |
| During incident triage | Review signals relevant to suspected impact and capture timestamps, alert or incident references, and non-sensitive observations. | `[incident review owner to confirm]` | `[incident timing to confirm]` | `[non-sensitive incident evidence reference only]` |
| Weekly operational review | Review production trends, unresolved alerts, recent deployment outcomes, dashboard gaps, and open follow-up work. | `[weekly review owner to confirm]` | `[weekly cadence/time to confirm]` | `[non-sensitive evidence reference only]` |
| Before migration rehearsal | Confirm required staging dashboards and evidence references are available before an approved rehearsal begins. | `[rehearsal review owner to confirm]` | `[pre-rehearsal timing to confirm]` | `[non-sensitive evidence reference only]` |
| Before production migration | Confirm production dashboard visibility and applicable backup/status references before any separately approved migration procedure begins. | `[production migration review owner to confirm]` | `[pre-migration timing to confirm]` | `[non-sensitive evidence reference only]` |
| After restore test | Review restore-test status, required validation evidence, resulting dashboard signals, and unresolved gaps. | `[restore review owner to confirm]` | `[post-restore-test timing to confirm]` | `[non-sensitive evidence reference only]` |

## 8. Evidence Rules

Dashboard review records may contain only non-sensitive evidence needed for
operational review, including:

- Review timestamps and timezone.
- Non-sensitive deployment identifiers and deployment outcome status.
- Non-sensitive alert identifiers, incident identifiers, severity, and
  resolution status.
- Non-sensitive screenshots that have been reviewed to ensure protected
  values, access information, and sensitive records are not visible.
- Incident references and approved handoff references.
- Smoke-test outcomes and reviewed workflow-status summaries.
- Reviewer roles, follow-up tasks, and completion status.

Dashboard review records, screenshots, exports, tickets, or incident notes
must not contain:

- Secret values, credentials, or protected configuration values.
- Full database URLs or full connection strings.
- Passwords, password hashes, reset values, tokens, session values, or
  private keys.
- Access-enabling URLs, unapproved routing information, or credential-bearing
  resource details.
- Raw sensitive logs, raw sensitive database output, or screenshots exposing
  sensitive customer, supplier, administrator, or commercial information.

Where detailed sensitive diagnosis is required, use only the separately
approved secure operational process and do not copy protected material into
dashboard evidence.

## 9. Dashboard Gap Register

| Gap | Required Follow-Up | Status |
| --- | --- | --- |
| Monitoring provider not confirmed | Identify the approved monitoring source through operational control review. | `[status to confirm]` |
| Dashboard owner not assigned | Assign accountable dashboard owner and reviewer roles. | `[status to confirm]` |
| Uptime panel not confirmed | Confirm production and staging site-availability visibility. | `[status to confirm]` |
| API health panel not confirmed | Confirm approved API health visibility and evidence handling. | `[status to confirm]` |
| Database signal panel not confirmed | Confirm a non-sensitive database availability indicator. | `[status to confirm]` |
| Auth/RFQ/order panels not confirmed | Confirm actionable non-sensitive core workflow failure visibility. | `[status to confirm]` |
| Alert history panel not confirmed | Confirm alert and incident reference visibility and retention. | `[status to confirm]` |
| Backup/restore panel not confirmed | Confirm backup confirmation and restore-test evidence status visibility. | `[status to confirm]` |
| Future private document panel pending | Define monitoring only after private document storage is approved and implemented. | `[future work]` |

## 10. Dashboard Review Checklist

Copy this checklist into the approved non-sensitive evidence location for each
required dashboard review. Do not include protected values or sensitive
output.

```markdown
# Dashboard Review: [non-sensitive review label]

- Reviewer: [reviewer role to confirm]
- Date/time and timezone: [timestamp and timezone]
- Environment: [staging / production]
- Review trigger: [deployment / incident triage / weekly review / migration
  preparation / restore test / other approved review trigger]

## Dashboard Areas Reviewed

- [ ] Frontend availability
- [ ] API health
- [ ] Database availability signal
- [ ] Authentication/login failures
- [ ] RFQ/quotation/order flow health
- [ ] Admin operations health, if applicable
- [ ] Deployment and release-safety status
- [ ] Backup/restore evidence status, if applicable
- [ ] Alert and incident history
- [ ] Future private document health, if applicable and approved

## Review Record

- Issues found: [non-sensitive issue summary or none observed]
- Evidence reference: [non-sensitive evidence reference only]
- Follow-up actions: [action reference, accountable role, and status]
- Incident handoff required: [yes/no and non-sensitive incident reference if applicable]
- No secrets exposed confirmation: [confirmed / issue identified and escalated]
```

## 11. Handoff To Incident Response

Dashboard review should trigger assessment and handoff under the
[Incident Response Runbook](./incident-response-runbook.md) when evidence
indicates or reasonably suggests:

- A Sev1 or Sev2 production availability, security, or material workflow
  signal.
- Repeated production deployment failures or a deployment failure with
  material customer-facing impact.
- Suspected secret, credential, protected configuration, or access-enabling
  information exposure.
- A suspected unauthorized privileged operation or attempted privileged
  operation.
- A data-integrity concern affecting RFQs, quotations, orders, accounts, or
  other production records.
- A backup, restore, recovery-point, or restore-validation concern.

Dashboard handoff records should include non-sensitive timestamps,
observations, alert/deployment/incident references, affected workflows, and
the accountable review role. Handoff does not authorize a rollback, restore,
migration, database operation, privileged script, access action, or
credential change; those actions remain governed by their approved
procedures.

## 12. Next Recommended Tasks

| Suggested Work Item | Purpose |
| --- | --- |
| `docs/logging-redaction-policy` | Define enforceable redaction, safe diagnostic-output handling, retention, and monitoring/incident evidence expectations. |
| `docs/customer-communication-incident-template` | Establish approved non-sensitive customer and business communication templates for applicable incidents. |
| `ci/migration-file-safety-checks` (later) | Extend automated safeguards to migration artifacts and required safety evidence after migration execution controls are finalized. |
| `docs/company-membership-permission-model` | Define organization roles and permission expectations relevant to authentication, administrative access, and incident review. |

This checklist complements the [Monitoring And Alerting Plan](./monitoring-alerting-plan.md),
the [Backup And Restore Runbook](./backup-restore-runbook.md), and the
[Incident Response Runbook](./incident-response-runbook.md). It preserves
Chemidot's foundation direction: make operational signals actionable and
reviewable while keeping evidence non-sensitive and keeping monitoring
separate from authorization for production or privileged activity.
