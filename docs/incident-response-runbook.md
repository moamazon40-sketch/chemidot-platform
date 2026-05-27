# Incident Response Runbook

## 1. Purpose

Chemidot is moving from an MVP to a professional B2B chemical marketplace.
This runbook defines a practical, non-sensitive process for responding when
monitoring, users, administrators, deployments, or controlled operations
indicate a staging or production incident.

This runbook protects:

- Customer, supplier, and administrator access.
- Frontend and API availability.
- RFQ, quotation, order, and related marketplace workflow integrity.
- Production transactional data and operational evidence.
- Deployment, migration, backup/restore, and privileged-operation controls.
- Future controlled chemical and commercial document access.

This runbook does not authorize a deployment, rollback, database change,
migration, restore, privileged operation, access grant, credential change, or
customer communication. Any action with production impact requires its own
approved scope, accountable owner, applicable runbook, and non-sensitive
evidence.

## 2. Incident Principles

1. Pause before acting: stabilize understanding of the environment, affected
   services, and likely impact before taking recovery action.
2. Preserve evidence: keep timestamps, identifiers, observations, decisions,
   and outcomes needed to explain and review the incident.
3. Do not expose secrets or access-enabling information in logs, screenshots,
   chat, tickets, documents, or incident records.
4. Do not run privileged scripts under pressure or as an improvised response
   to an alert.
5. Separate investigation from recovery action: diagnosing an issue does not
   authorize changing production state.
6. Production actions require approval under the applicable release,
   migration, recovery, security, or privileged-operation procedure.
7. Document decisions, responsible roles, approvals, validation outcomes, and
   follow-up using non-sensitive references only.

## 3. Incident Severity Levels

| Severity | Definition | Examples | Response Expectation | Owner |
| --- | --- | --- | --- | --- |
| Sev1 - Critical | Production outage, suspected security incident, or material data-integrity risk. | Production site or API unavailable; suspected secret exposure; suspected unauthorized privileged action; material transaction-integrity concern. | `[critical acknowledgment, escalation, and update expectation to confirm]` | `[incident commander/critical incident owner role to confirm]` |
| Sev2 - Major | Major production degradation or sustained failure of an important customer/business workflow. | Significant login failure spike; sustained RFQ/order flow failure; repeated failed production deployments without confirmed data loss. | `[major acknowledgment, escalation, and update expectation to confirm]` | `[incident owner role to confirm]` |
| Sev3 - Limited | Limited service issue with constrained impact, workaround, or staging-only release concern. | Isolated workflow failure; non-critical admin issue; staging deployment or rehearsal concern. | `[limited response and review expectation to confirm]` | `[engineering/operations owner role to confirm]` |
| Sev4 - Informational | Non-urgent event requiring tracking, review, or scheduled follow-up. | Resolved alert record; informational deployment signal; non-urgent monitoring trend. | `[informational review expectation to confirm]` | `[monitoring/evidence owner role to confirm]` |

## 4. Incident Triggers

| Trigger | Incident Concern |
| --- | --- |
| Production outage | Customer-facing availability is materially interrupted. |
| API unavailable | Approved service health indicators or application behavior show backend failure. |
| Login failure spike | Users cannot authenticate as expected or access failures indicate a possible security or availability issue. |
| RFQ/order flow failure | Core quotation, RFQ, order, or related marketplace workflows are failing or producing inconsistent outcomes. |
| Database connectivity concern | Application-visible or approved platform indicators suggest loss of transactional-service availability. |
| Failed production deployment | A release does not complete successfully or introduces unhealthy production behavior. |
| Suspected secret exposure | Protected access material may have been displayed, transmitted, stored, or disclosed improperly. |
| Suspected unauthorized privileged operation | An unapproved or unexpected privileged action has been attempted or performed. |
| Backup/restore concern | Recovery capability, backup integrity, restore outcome, or recovery-point risk may affect operational confidence. |
| Future private document access concern | Controlled document access, confidentiality, retrieval, or audit behavior may be compromised after that capability exists. |

## 5. Roles And Responsibilities

Assign roles through the approved operational process. Record role assignments
and non-sensitive incident references only; do not place personal contact
details or access information in this runbook.

| Role | Responsibility | Assignment |
| --- | --- | --- |
| Incident commander | Owns severity, coordination, decision tracking, handoffs, and closure. | `[incident commander role to confirm]` |
| Technical owner | Investigates service behavior, scope, technical options, and validation results. | `[technical owner role to confirm]` |
| Operations owner | Coordinates operational controls, environment confirmation, deployment status, and approved execution paths. | `[operations owner role to confirm]` |
| Communications owner | Coordinates approved business and customer-impact communication. | `[communications owner role to confirm]` |
| Evidence recorder | Records timeline, observations, decisions, approvals, validation, and follow-up without sensitive material. | `[evidence recorder role to confirm]` |
| Approver | Authorizes production-impacting response actions where the applicable procedure requires approval. | `[approver role to confirm]` |
| Backup/restore owner if needed | Provides approved backup/restore decision support and recovery evidence when recovery is considered. | `[backup/restore owner role to confirm]` |
| Security owner if needed | Coordinates suspected exposure, unauthorized action, or other security-focused escalation. | `[security owner role to confirm]` |

## 6. First 15 Minutes Checklist

- [ ] Stop or pause new risky changes affecting the suspected scope, including
      additional deployments, migrations, restores, and manual production
      operations, where authorized to do so.
- [ ] Identify the alert, report, deployment outcome, administrative
      observation, or operational source that triggered triage.
- [ ] Identify whether the affected environment is staging or production using
      approved non-sensitive identification.
- [ ] Identify the most recent relevant deployment and commit reference using
      non-sensitive identifiers.
- [ ] Check approved service status indicators and permitted logs without
      copying sensitive values or raw sensitive log dumps.
- [ ] Classify the preliminary severity level and record the reasoning.
- [ ] Assign the incident commander, technical owner, operations owner,
      communications owner, and evidence recorder roles as needed.
- [ ] Determine immediate customer or business impact and whether approved
      communication is required.
- [ ] Begin a timeline with detection time, observations, assigned roles,
      decisions, and evidence references.

## 7. Investigation Workflow

1. Confirm scope: identify affected environment, services, user workflows,
   approximate start time, customer/business impact, and whether the issue is
   active or historical.
2. Check deployment history: identify recent deployment and commit references,
   deployment outcomes, and whether symptoms began after a release.
3. Check application/API health: inspect approved availability and health
   indicators, including the identified API health-check route where
   applicable.
4. Check authentication/login: determine whether sign-in failure or unusual
   access failure is part of the incident without recording sensitive user or
   authentication data.
5. Check RFQ, quotation, order, and applicable administrative workflows using
   approved non-mutating or controlled validation methods.
6. Check database availability signals exposed through approved service or
   platform monitoring; do not copy connection details or sensitive database
   output.
7. Check release safety evidence where the issue concerns a deployment or
   release-control failure.
8. Collect non-sensitive evidence: timestamps, incident/alert references,
   deployment or commit identifiers, HTTP/status summaries, affected
   workflows, owner roles, decisions, and validation results.
9. Avoid copying secret material, sensitive configuration, full log dumps,
   protected user information, or access-enabling details into the incident
   record.

## 8. Decision Workflow

| Decision | When It Applies | Governing Procedure |
| --- | --- | --- |
| No action / false alarm | Investigation confirms no active issue and no required corrective follow-up. | Record the finding and evidence in the incident record or alert history. |
| Monitor only | Limited or transient condition is understood and does not warrant a production change. | Follow the [Monitoring And Alerting Plan](./monitoring-alerting-plan.md) and record observation criteria. |
| Application rollback | A defective application release caused the issue and the prior artifact is compatible with current persisted state. | Follow the rollback controls in the [Staging And Production Runbook](./staging-production-runbook.md). |
| Reviewed forward fix | Correcting application behavior or persisted state is safer than reversal, particularly after data or schema changes. | Use the applicable reviewed release process and, for database change, the [Database Migration Runbook](./migration-runbook.md). |
| Restore consideration | Material state may be damaged or lost and a validated recovery point may be necessary. | Follow the approval, data-loss analysis, and validation requirements in the [Backup And Restore Runbook](./backup-restore-runbook.md). |
| Emergency migration consideration | A narrow database correction may be required to contain or repair the incident. | Follow emergency migration guidance in the [Database Migration Runbook](./migration-runbook.md); incident urgency is not permission for uncontrolled edits. |
| Production privileged operation consideration | A separately justified controlled administrative or supplier-data action may be necessary. | Follow the [Privileged Script Runbook](./privileged-script-runbook.md) and required approval/evidence controls; never infer authorization from the incident alone. |

## 9. Recovery Rules

- Application rollback is appropriate only when the previous application
  artifact is compatible with the current data and schema state.
- A reviewed forward fix is preferred when data or schema has changed and
  reversal could discard valid activity, weaken evidence, or introduce greater
  risk.
- Restore is exceptional. It requires documented approval, accountable
  operators, explicit data-loss-window analysis, communication planning where
  required, and post-restore validation.
- Schema push or forced synchronization is not recovery or rollback.
- Cleanup or broad deletion is not recovery.
- Password reset is not a generic recovery shortcut; any production account
  recovery must use an approved, audited process.
- Seed or demo data is not production recovery activity.

## 10. Communication And Evidence Rules

- Record an incident timeline with detection, escalation, observations,
  decisions, execution milestones where approved, validation, and closure.
- Record decisions and their accountable owner/approver roles.
- Record affected systems and business workflows using non-sensitive
  descriptions.
- Record validation results, remaining risk, customer/business impact, and
  follow-up actions.
- Do not include secrets, credentials, access-enabling details, or sensitive
  configuration in messages, notes, logs, screenshots, documents, or tickets.
- Do not include full database connection information.
- Do not paste passwords, tokens, or private keys into incident materials.
- Use non-sensitive references only for alerts, deployments, commits,
  approvals, backups, communications, and evidence locations.

## 11. Post-Incident Review

For an incident requiring investigation or response work, complete a review
using non-sensitive evidence and placeholders until ownership is assigned.

| Review Item | Required Record |
| --- | --- |
| Summary | `[plain-language non-sensitive incident summary]` |
| Root cause if known | `[confirmed root cause or investigation status]` |
| Customer/business impact | `[impact summary, duration, and affected workflow description]` |
| What worked | `[effective detection, response, controls, or communication]` |
| What failed | `[missed signal, control gap, process failure, or technical issue]` |
| Follow-up tasks | `[task reference and intended outcome]` |
| Owner and due date | `[owner role to confirm]` / `[due date to confirm]` |
| Monitoring/runbook/CI changes | `[required update, no change required, or decision pending]` |

## 12. Prohibited Emergency Actions

- No panic-running cleanup scripts or broad deletion operations.
- No schema push or forced schema synchronization.
- No seed or demo data insertion in production.
- No password reset operation as a broad fix for a service incident.
- No admin promotion without the separately required approval, confirmation,
  and evidence controls.
- No undocumented production database edits.
- No sharing secret material or access-enabling information in chat,
  documentation, tickets, screenshots, or evidence.
- No restore without documented approval, data-loss analysis, accountable
  operators, and required validation.

## 13. Incident Record Template

Copy this template into the approved non-sensitive incident evidence location.
Do not include secret material, access-enabling information, sensitive
configuration, or raw sensitive output.

```markdown
# Incident: [incident title]

## Classification
- Severity: [Sev1 / Sev2 / Sev3 / Sev4]
- Start time: [timestamp and timezone]
- Detected by: [monitoring/user/admin/deployment/operation reference]
- Environment: [staging / production]
- Affected services/workflows: [non-sensitive description]

## Roles
- Incident commander: [role placeholder]
- Technical owner: [role placeholder]
- Operations owner: [role placeholder]
- Communications owner: [role placeholder]
- Evidence recorder: [role placeholder]
- Approver, if required: [role placeholder]
- Backup/restore owner, if required: [role placeholder]
- Security owner, if required: [role placeholder]

## Timeline
| Time | Observation / Action / Decision | Owner Role | Evidence Reference |
| --- | --- | --- | --- |
| [timestamp] | [non-sensitive entry] | [role] | [non-sensitive reference] |

## Decisions
| Decision | Reason | Approver / Owner Role | Reference |
| --- | --- | --- | --- |
| [decision] | [non-sensitive rationale] | [role] | [non-sensitive reference] |

## Recovery Action
- Selected response: [none / monitor / app rollback / reviewed forward fix /
  restore consideration / emergency migration consideration /
  controlled privileged-operation consideration]
- Governing runbook: [document reference]
- Approved execution reference, if applicable: [non-sensitive reference only]

## Validation
- Validation performed: [checks completed]
- Result: [outcome]
- Remaining risk: [known issue or none confirmed]

## Communication
- Customer/business impact: [non-sensitive summary]
- Communication decision: [required / not required / pending approval]
- Communication reference: [non-sensitive reference only]

## Follow-Up Actions
| Action | Owner Role | Due Date | Status |
| --- | --- | --- | --- |
| [follow-up] | [role placeholder] | [date placeholder] | [status placeholder] |

## Evidence References
- [alert, deployment, commit, approval, validation, or review reference only]

No secrets, credentials, access-enabling details, or sensitive values may be
recorded in this incident record.
```

## 14. Current Known Gaps

- Actual incident owner roles have not yet been assigned.
- Alert routing has not yet been confirmed.
- An approved incident communication channel has not yet been confirmed.
- The monitoring provider has not yet been confirmed.
- The customer communication process has not yet been confirmed.
- Security incident escalation ownership and procedure have not been
  finalized.
- Future private document incident handling remains pending the approved
  document-storage and access-control design.

## 15. Next Recommended Tasks

| Suggested Work Item | Purpose |
| --- | --- |
| `docs/monitoring-dashboard-checklist` | Define dashboards, verification cadence, ownership, and evidence review for incident detection and triage. |
| `docs/logging-redaction-policy` | Define redaction, sensitive-output handling, retention, and safe incident-evidence practices. |
| `docs/customer-communication-incident-template` | Establish approved customer/business communication templates and approval expectations. |
| `ci/migration-file-safety-checks` (later) | Extend automated review of migration artifacts and safety evidence once migration execution is finalized. |
| `docs/company-membership-permission-model` | Define professional organization roles and authorization expectations relevant to access incidents. |

This runbook preserves Chemidot's foundation controls: investigate carefully,
record non-sensitive evidence, keep production response actions approved and
separate from monitoring, and do not improvise database or privileged
operations during an incident.
