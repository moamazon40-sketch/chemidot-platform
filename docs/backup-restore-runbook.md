# Backup And Restore Runbook

## 1. Purpose

Chemidot is moving from an MVP to a professional B2B chemical marketplace.
This runbook establishes safe, non-sensitive backup and restore controls for
data and operational evidence that require dependable recovery planning.

This runbook protects:

- Production PostgreSQL data for customer, supplier, administrator, RFQ,
  quotation, order, and related marketplace records.
- Staging data used for controlled release and migration rehearsal.
- Future private chemical and commercial document storage when introduced.
- Recovery accountability, approval evidence, and validation records.

This document does not authorize a backup or restore operation, grant access,
approve a migration or data change, approve a deployment, permit a privileged
script, or provide credentials. Each operation requires its own approved
scope, authorized operator, accountable approval, and non-sensitive evidence.

## 2. Backup Principles

1. Production data is Chemidot's operational system of record for live
   marketplace transactions and related evidence.
2. Backup and restore operations are separate from application build and
   deployment. They must never be attached implicitly to a deploy workflow.
3. Backup restore is an exceptional recovery decision, not a routine rollback
   for application releases or database changes.
4. A backup or snapshot must be confirmed before any approved production
   schema change or material production data operation.
5. A restore can discard valid transactions, updates, or evidence written
   after the selected snapshot or backup point.
6. Evidence must contain only non-sensitive references and outcomes. It must
   not contain secrets, credentials, full resource URLs, or connection
   strings.

## 3. Backup Scope

| Asset Or Evidence Class | Recovery Expectation | Control Notes |
| --- | --- | --- |
| Production database | `[backup/snapshot capability and recovery point expectation to confirm]` | Live transactional system of record; confirmation required before approved schema or material data operations. |
| Staging database | `[backup/snapshot capability and rehearsal expectation to confirm]` | Supports controlled restore testing and migration/release rehearsal on a non-production target. |
| Future private document storage | `[backup, versioning, retention, and recovery policy pending future approval]` | Applies only when controlled private chemical/commercial document storage is introduced. |
| Environment configuration and secrets | `[control owner and approved recovery procedure to confirm; do not record values]` | Document policy, ownership, and access review only; never copy secret values or access-enabling configuration into evidence. |
| Logs and audit evidence | `[retention owner, retention period, and recovery evidence location to confirm]` | Retain non-sensitive approval, incident, restore-validation, and outcome references according to approved policy. |

Only authorized control review may replace placeholders. No backup inventory or
recovery note may record credentials, secret material, full connection
strings, or access-enabling URLs.

## 4. Backup Ownership Table

| Asset / Environment | Backup Owner | Access Owner | Schedule | Retention Expectation | Last Backup Confirmation | Evidence Reference | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Staging database | `[backup owner to confirm]` | `[access owner to confirm]` | `[schedule to confirm]` | `[retention expectation to confirm]` | `[date/outcome to confirm]` | `[non-sensitive evidence reference only]` | `[status to confirm]` |
| Production database | `[backup owner to confirm]` | `[access owner to confirm]` | `[schedule to confirm]` | `[retention expectation to confirm]` | `[date/outcome to confirm]` | `[non-sensitive evidence reference only]` | `[status to confirm]` |
| Future private document storage | `[backup/retention owner to confirm]` | `[access owner to confirm]` | `[schedule pending future storage approval]` | `[retention expectation pending approval]` | `[date/outcome to confirm]` | `[non-sensitive evidence reference only]` | `[future work]` |
| Environment configuration/secrets control record | `[recovery policy owner to confirm]` | `[access owner to confirm]` | `[review cadence to confirm]` | `[control-record retention to confirm]` | `[review date/outcome to confirm]` | `[non-sensitive evidence reference only; no values]` | `[status to confirm]` |
| Logs/audit recovery evidence | `[retention owner to confirm]` | `[access owner to confirm]` | `[retention review cadence to confirm]` | `[retention expectation to confirm]` | `[review date/outcome to confirm]` | `[non-sensitive evidence reference only]` | `[status to confirm]` |

## 5. Backup Before Change Checklist

Complete this checklist before a production schema change or material
production data operation is approved for execution.

- [ ] Is a migration planned or included in the proposed operation?
- [ ] Is a material production data operation planned?
- [ ] Has the required backup or snapshot been confirmed?
- [ ] Has the restore owner been identified for the affected asset?
- [ ] Is the post-change and recovery validation plan ready?
- [ ] Has the approval reference been recorded?
- [ ] Has evidence been checked to ensure that it contains no secrets,
      credentials, full resource URLs, or connection strings?

Stop the operation if any required answer is missing, ambiguous, or not
supported by approved non-sensitive evidence.

## 6. Restore Decision Policy

- **Application rollback is enough when** the problem is limited to an
  application release, no database or material data operation requires
  recovery, and the previous approved application artifact remains compatible
  with current persisted state.
- **A forward fix is preferred when** data or schema has changed and restoring
  or reversing state could lose valid activity, weaken evidence, or introduce
  greater risk than a narrowly reviewed correction.
- **Restore may be considered when** an incident has damaged or lost material
  state, a validated backup candidate exists, alternatives are inadequate, and
  the potential data-loss window is explicitly understood and accepted.
- **Restore approval** requires the assigned restore owner and the applicable
  incident, production, or data-control approver roles once those roles are
  formally confirmed, with an approval reference recorded before execution.
- **Restore must not be improvised** because it can overwrite valid
  transactions, affect customer and supplier activity, complicate audit
  evidence, and require coordinated application and operational validation.

## 7. Restore Workflow

1. Pause deployments, migrations, privileged operations, and manual data
   changes affecting the incident scope.
2. Identify the affected environment, asset, business workflows, incident
   timeline, and whether continued writes increase harm.
3. Identify a candidate snapshot or backup using approved non-sensitive
   references and confirm that it applies to the affected asset.
4. Estimate the data-loss window and affected transactions or evidence between
   the recovery point and the current state.
5. Record the restore decision, approvers, authorized operator, validation
   plan, communications owner, and non-sensitive approval reference.
6. Allow only the authorized operator to execute the approved restore through
   the separately controlled recovery procedure.
7. Validate the restored state using the checklist in Section 8 before normal
   change activity resumes.
8. Record non-sensitive evidence of the candidate selected, timing, approval,
   operator, result, validation outcome, known losses, and follow-up actions.
9. Communicate the outcome and remaining impact through the approved incident
   and stakeholder communication process.

## 8. Restore Validation Checklist

- [ ] Database connectivity is healthy through the approved verification
      method.
- [ ] Schema state matches the expected approved recovery target.
- [ ] Login works through the approved target-environment verification method.
- [ ] The RFQ flow receives an applicable sanity check.
- [ ] Quotation and order flow receive applicable sanity checks.
- [ ] Admin access or admin-dependent behavior is verified when applicable and
      an approved verification process exists.
- [ ] Key records are spot checked against the expected recovery point using
      non-sensitive evidence.
- [ ] Relevant logs and audit evidence are checked without exposing secret or
      access-enabling values.
- [ ] Evidence confirms that no cleanup, seed, password reset, admin
      promotion, supplier-maintenance, schema push, or other privileged script
      ran accidentally.
- [ ] The result, known loss window, issues, reviewer confirmation, and
      required follow-up are recorded.

## 9. Backup Restore Test Plan

| Test Control | Requirement | Status / Evidence |
| --- | --- | --- |
| Staging restore test cadence | `[cadence and restore-test owner to confirm]` | `[last test date, outcome, and non-sensitive evidence reference to confirm]` |
| Production restore test policy | `[policy, allowed method, approval requirements, and schedule to confirm]` | `[status and non-sensitive evidence reference to confirm]` |
| Required evidence | Record tested asset/environment, recovery-point reference, approval, operator, timing, validation results, data-loss assessment, gaps, and outcome without secrets. | `[evidence reference only]` |
| Sign-off | `[backup owner, restore owner, validation owner, and approver roles to confirm]` | `[sign-off status/reference to confirm]` |
| Gaps and corrective actions | Record unsupported recovery scenarios, failed checks, unmet recovery expectations, ownership gaps, and follow-up work. | `[gap register/evidence reference only]` |

Testing must use an authorized procedure and must not introduce unapproved
production data changes or expose protected values in recorded evidence.

## 10. Prohibited Actions

- No cleanup script or broad deletion operation may be treated as a restore.
- No schema push or forced schema synchronization may be treated as recovery
  or rollback.
- No password reset utility may be used as a recovery shortcut.
- No seed or demo data may be inserted into production as recovery activity.
- No undocumented manual database changes may be made during recovery.
- No secret values, credentials, full resource URLs, full connection strings,
  tokens, passwords, private keys, or environment-file contents may appear in
  restore notes or evidence.
- No restore may be performed without documented approval and explicit
  analysis of the potential data-loss window.

## 11. Emergency Recovery Guidance

An emergency does not make uncontrolled recovery actions safe.

1. Do not panic-run scripts or attempt unreviewed database operations.
2. Pause deployments and manual changes while incident scope is established.
3. Preserve non-sensitive evidence, timelines, current-state observations, and
   decision references needed for investigation and recovery.
4. Identify the last known-good state and available backup or snapshot
   candidate through the authorized recovery owner.
5. Decide explicitly whether an application rollback, reviewed forward fix,
   or approved restore best addresses the incident and recorded data-loss
   risk.
6. Record accountable owners, approvals, operator, communications, execution
   outcome, validation result, known impact, and follow-up actions.

## 12. Current Known Gaps

- The backup owner has not yet been assigned.
- The restore owner has not yet been assigned.
- The backup schedule has not yet been confirmed.
- The last restore test has not yet been confirmed.
- The backup policy for future private document storage, including future
  S3-based storage if approved, remains pending.
- Automated backup verification is future work.

## 13. Next Recommended Tasks

| Suggested Work Item | Purpose |
| --- | --- |
| `docs/monitoring-alerting-plan` | Assign monitoring, alerting, retention, escalation, and operational-evidence ownership. |
| `docs/incident-response-runbook` | Define incident classification, command roles, communication, evidence, and approved recovery decision handling. |
| `ci/migration-file-safety-checks` (later) | Extend automated checks to migration artifacts and required safety evidence after migration tooling is finalized. |
| `feature/private-file-storage-foundation` (later) | Design controlled private chemical/commercial document storage with access, retention, audit, and recovery policy before implementation. |

This runbook preserves Chemidot's approved direction: retain PostgreSQL as the
transactional foundation, keep recovery separate from build/deploy and
privileged scripts, and make future restore decisions authorized, validated,
and documented without exposing protected information.
