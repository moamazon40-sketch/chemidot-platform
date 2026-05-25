# Monitoring And Alerting Plan

## 1. Purpose

Chemidot is moving from an MVP to a professional B2B chemical marketplace.
This plan establishes non-sensitive monitoring, alerting, logging, ownership,
escalation, and operational-evidence expectations for environments and
customer-facing workflows.

This plan protects:

- Frontend and API availability.
- Customer, supplier, and administrator authentication and access workflows.
- RFQ, quotation, order, and related marketplace transaction health.
- Deployment and release-safety visibility.
- Database availability signals and future controlled document-access signals.
- Non-sensitive operational evidence needed for release review and incident
  handling.

This document does not authorize a deployment, migration, schema or data
change, restore, privileged operation, access grant, secret-management change,
or incident action. Any corrective or sensitive operation requires its own
approved procedure, accountable operator, authorization, and non-sensitive
evidence.

## 2. Monitoring Principles

1. Monitoring and alert evidence must not expose secrets, credentials, full
   connection strings, access-enabling configuration, or sensitive customer or
   supplier information.
2. Production alerts must be actionable: they must identify an observable
   service or control concern that an accountable role can triage.
3. Staging monitoring and alerts should support release rehearsal, migration
   rehearsal where separately authorized, and post-deployment smoke-test
   evidence without implying production readiness automatically.
4. Logs are operational evidence, but logged and retained evidence must be
   non-sensitive and appropriately redacted.
5. Monitoring is separate from privileged operations. An alert does not
   authorize a database change, schema operation, reset, role change, cleanup,
   seed, supplier maintenance action, restore, or deployment.

## 3. Monitoring Scope

| Monitoring Area | Monitoring Expectation | Control Note |
| --- | --- | --- |
| Frontend availability | Detect whether the customer-facing site is reachable and serving expected responses. | `[monitoring method and owner to confirm]` |
| Backend/API health | Detect service health and API unavailability; the currently identified configured platform health-check path is `/api/healthz`. | `[external check setup and evidence location to confirm]` |
| Database availability | Identify application-visible connectivity failures or approved platform health indicators. | Do not record credentials, connection strings, or sensitive database output. |
| Authentication/login issues | Track login failure trends, authentication unavailability, and unusual access failure patterns. | Evidence must not expose password, token, or account-secret material. |
| RFQ/quotation/order flow health | Detect elevated failures in core marketplace workflows and material transaction interruptions. | Define non-sensitive flow indicators through approved operational review. |
| Admin access/operations health | Monitor unexpected admin-access failures and suspicious privileged-operation signals. | Monitoring does not authorize privileged action execution. |
| Deployment status | Record failed or unhealthy staging and production deployment outcomes. | Deployment remains application-only and separately approved. |
| CI/release safety checks | Surface failure of repository safety checks that protect release entrypoints. | Current pull request safety command is `pnpm run release:safety-check`. |
| Future private document storage | Monitor controlled document upload, access, scan, and retrieval failures when the capability is approved and implemented. | `[future monitoring design pending storage approval]` |
| Logs/audit evidence retention | Retain non-sensitive alert, incident, deployment, and validation evidence according to approved policy. | `[retention owner and period to confirm]` |

## 4. Environment Monitoring Table

| Environment | What To Monitor | Alert Owner | Escalation Owner | Evidence Location | Status |
| --- | --- | --- | --- | --- | --- |
| Local/development | `[local availability/error signals and validation evidence to confirm]` | `[owner to confirm]` | `[escalation owner to confirm]` | `[non-sensitive evidence location to confirm]` | `[status to confirm]` |
| Test | `[automated/manual test health and failure evidence to confirm]` | `[owner to confirm]` | `[escalation owner to confirm]` | `[non-sensitive evidence location to confirm]` | `[status to confirm]` |
| Staging | `[availability, API, release rehearsal, authentication, and workflow indicators to confirm]` | `[owner to confirm]` | `[escalation owner to confirm]` | `[non-sensitive evidence location to confirm]` | `[status to confirm]` |
| Production | `[uptime, API, database availability, authentication, core workflow, deployment, and security indicators to confirm]` | `[owner to confirm]` | `[escalation owner to confirm]` | `[non-sensitive evidence location to confirm]` | `[status to confirm]` |

## 5. Production Alert Categories

| Alert Category | Observable Concern | Required Triage Focus |
| --- | --- | --- |
| Site unavailable | Customer-facing site is unreachable or repeatedly returns unhealthy responses. | Confirm scope, duration, customer impact, and incident handoff need. |
| API unavailable | Health checking or approved API monitoring indicates the backend is unavailable or materially failing. | Confirm endpoint/service impact and affected workflows. |
| Login failure spike | Authentication failures exceed an approved baseline or users cannot authenticate. | Determine service degradation versus suspicious access activity without exposing account data. |
| RFQ/order flow failures | RFQ, quotation, order submission, or related workflow failures materially increase. | Identify affected workflow step, transaction impact, and evidence reference. |
| Payment/order issues if applicable | Approved payment or order-processing indicators show failure or inconsistent completion when such monitoring exists. | Assess customer/commercial impact and data-integrity concern. |
| Admin access failures | Authorized administrative access or admin-dependent operational checks fail unexpectedly. | Determine availability or access-control impact without initiating a privileged operation. |
| Database connectivity issues | Application-visible database connectivity failures or approved health indicators show interruption. | Assess service and data-integrity impact through approved non-sensitive evidence. |
| Deployment failure | Staging or production deployment is unsuccessful or creates unhealthy application behavior. | Confirm deployment identity, environment, and required rollback or incident decision path. |
| Release safety check failure | Pull request release-safety validation fails. | Treat as a release-blocking control issue until reviewed and resolved. |
| Suspicious privileged operation attempt | Monitoring or audit evidence signals an unauthorized or unexpected privileged-action attempt. | Escalate as a potential security/control incident; do not execute counter-operations ad hoc. |
| Future document access failures | Controlled private document access, retrieval, or protection checks fail once implemented. | Assess access and compliance impact under the future approved storage policy. |

## 6. Alert Severity Levels

| Severity | Definition | Response Expectation | Owner | Examples |
| --- | --- | --- | --- | --- |
| Sev1 - Critical | Production outage, suspected security exposure, or material data-integrity risk. | `[critical response expectation and acknowledgment time to confirm]` | `[primary incident/alert owner role to confirm]` | Production site/API unavailable; suspected secret exposure; suspected unauthorized privileged action; material transaction integrity concern. |
| Sev2 - Major | Major service degradation or interruption to important production workflows. | `[major response expectation and acknowledgment time to confirm]` | `[primary alert owner role to confirm]` | Login unavailable for many users; sustained RFQ/order failure; repeated production deployment failure without confirmed data risk. |
| Sev3 - Limited | Limited production or staging issue with constrained impact or an available workaround. | `[limited response expectation and review time to confirm]` | `[engineering/operations owner role to confirm]` | Isolated workflow errors; staging rehearsal monitoring failures; non-critical admin health issue. |
| Sev4 - Informational | Non-urgent signal for review, trend tracking, or release evidence. | `[informational review expectation to confirm]` | `[monitoring owner role to confirm]` | Informational deployment notice; resolved alert history item; trend requiring scheduled review. |

## 7. Alert Routing And Ownership

Populate roles and routing only through approved operational control review.
Do not record personal telephone numbers, personal email addresses, access
details, or unapproved alert-channel information in this document.

| Responsibility | Assigned Role | Routing / Evidence Status |
| --- | --- | --- |
| Primary alert owner | `[primary alert owner role to confirm]` | `[approved routing and evidence status to confirm]` |
| Backup alert owner | `[backup alert owner role to confirm]` | `[approved routing and evidence status to confirm]` |
| Engineering owner | `[engineering owner role to confirm]` | `[approved routing and evidence status to confirm]` |
| Operations owner | `[operations owner role to confirm]` | `[approved routing and evidence status to confirm]` |
| Business/customer communication owner | `[business communication owner role to confirm]` | `[approved routing and evidence status to confirm]` |

## 8. Logging Policy

- No secret values may appear in application logs, platform logs, monitoring
  events, alert payloads, dashboards, tickets, screenshots, or incident
  evidence.
- Do not record full database URLs or full connection strings.
- Do not record passwords, tokens, private keys, credential material, session
  values, reset values, or sensitive environment configuration.
- Redact sensitive values before logs or evidence are stored, routed, copied,
  or attached to an operational record.
- Logs may include timestamps, request IDs, deployment IDs, alert IDs,
  severity, approved non-sensitive incident references, HTTP status summaries,
  and non-sensitive error summaries.
- Incident evidence must remain non-sensitive even when an investigation
  involves authentication, database connectivity, document access, or
  suspected privileged-operation activity.
- Where detailed sensitive diagnosis is required, it must be handled only
  through separately approved secure operational procedures and must not be
  copied into this plan.

## 9. Dashboard And Evidence Expectations

| Visibility Area | Dashboard / Evidence Expectation | Owner / Retention Status |
| --- | --- | --- |
| Production uptime status | Show availability trend and active/recent outage signals for the production frontend. | `[owner, provider, and retention to confirm]` |
| API status | Show API health signal status, including approved health-check outcomes. | `[owner, provider, and retention to confirm]` |
| Deployment status | Record staging and production deployment outcomes and related non-sensitive identifiers. | `[owner and evidence location to confirm]` |
| Error trends | Provide non-sensitive error-rate or failure trend visibility sufficient for triage. | `[owner, threshold, and retention to confirm]` |
| Authentication failures | Track approved login/authentication failure indicators without exposing sensitive user data. | `[owner, threshold, and retention to confirm]` |
| RFQ/order failures | Track approved indicators for failures in critical marketplace transaction flows. | `[owner, threshold, and retention to confirm]` |
| Alert history | Retain alert severity, timing, outcome, and non-sensitive handoff references. | `[owner, channel, and retention to confirm]` |
| Incident notes | Retain non-sensitive incident decisions, timelines, validation outcomes, and follow-up references. | `[incident evidence location and retention to confirm]` |

## 10. Incident Handoff Trigger

Monitoring becomes incident-response work when an observation indicates or
reasonably suggests:

- A production outage or material customer-facing unavailability.
- A risk to transaction or data integrity.
- Repeated failed production deployments or a failed deployment with material
  customer impact.
- Suspected exposure of secrets or access-enabling information.
- Suspected unauthorized privileged action or attempted privileged operation.
- A backup, restore, or recovery concern that could affect service or data
  confidence.

The future `docs/incident-response-runbook.md` should define incident roles,
classification, communications, decision records, escalation timing, and
approved recovery handling. Until that document is established, monitoring
alerts identify concerns for accountable review only; they do not authorize
deployment, migration, database, restore, access, or privileged-script actions.

## 11. Monitoring Gap Register

| Gap | Required Confirmation / Follow-Up | Status |
| --- | --- | --- |
| Actual monitoring provider not confirmed | Identify the approved provider or platform monitoring source through control review. | `[status to confirm]` |
| Alert channels not confirmed | Approve routing channels and access ownership without recording sensitive details here. | `[status to confirm]` |
| Owners not assigned | Assign alert, escalation, engineering, operations, communication, incident, and retention roles. | `[status to confirm]` |
| Uptime checks not confirmed | Confirm external or platform uptime monitoring for staging and production. | `[status to confirm]` |
| API health checks not confirmed | Confirm monitoring use and evidence retention for the identified API health-check path. | `[status to confirm]` |
| Database alerting not confirmed | Confirm approved application-visible or provider health monitoring without exposing access information. | `[status to confirm]` |
| Log retention not confirmed | Define non-sensitive retention, access review, and deletion expectations. | `[status to confirm]` |
| Future private storage monitoring pending | Define document-access monitoring only after private storage scope and controls are approved. | `[future work]` |

## 12. Next Recommended Tasks

| Suggested Work Item | Purpose |
| --- | --- |
| `docs/incident-response-runbook` | Define incident classification, operational roles, communication, escalation, evidence, and recovery-decision handling. |
| `docs/monitoring-dashboard-checklist` | Define dashboard contents, verification cadence, ownership assignment, and non-sensitive evidence checks. |
| `docs/logging-redaction-policy` | Establish enforceable redaction, retention, review, and incident-evidence handling expectations. |
| `ci/migration-file-safety-checks` (later) | Extend safety checks to controlled migration artifacts and related evidence once the migration workflow is finalized. |
| `feature/private-file-storage-foundation` (later) | Design controlled private document storage and its access, audit, retention, and monitoring requirements before implementation. |

This plan preserves Chemidot's approved foundation direction: retain
PostgreSQL as the transactional system of record, keep monitoring and
operational evidence non-sensitive, and keep alerts separate from deployment,
migration, restore, and privileged-operation authorization.
