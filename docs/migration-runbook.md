# Database Migration Runbook

## 1. Purpose

Chemidot is moving from an MVP to a professional B2B chemical marketplace.
This runbook defines the controlled process for future database schema and
data migrations so changes to the transactional foundation are planned,
reviewed, rehearsed, approved, executed, validated, and documented safely.

This runbook protects:

- Production PostgreSQL data, which records live marketplace transactions and
  operational evidence.
- Customer, supplier, and administrator account integrity.
- RFQ, quotation, order, chemical content, and future controlled-document
  workflows.
- Availability, traceability, recovery options, and stakeholder confidence.

This document does not authorize a migration, grant database access, define a
new schema, approve a data change, permit use of a privileged script, or
replace an incident or backup/restore approval process. Each actual operation
requires its own reviewed plan, authorized operators, approvals, backup
confirmation where required, and non-sensitive evidence.

## 2. Migration Principles

1. Production PostgreSQL is Chemidot's transactional system of record.
2. Application build and deployment paths must not execute schema changes,
   data changes, migrations, seeds, cleanup, password resets, admin promotion,
   or supplier-maintenance operations.
3. Schema push or forced schema synchronization is not an acceptable
   production migration method.
4. Migrations must be scoped and reviewed separately from ordinary feature
   work, even when a feature motivates the change.
5. The exact reviewed migration sequence must be rehearsed in staging before
   production execution.
6. A confirmed backup or snapshot is required before a production schema
   change or material production data operation.
7. The migration plan must decide the rollback or forward-fix strategy before
   execution, including whether the preceding application version remains
   compatible after the change.
8. Migration records, approvals, logs, and evidence must never contain
   secrets, connection strings, password material, or `.env` contents.

## 3. Types Of Migration

| Type | Description | Required Focus |
| --- | --- | --- |
| Schema-only migration | Adds or changes tables, columns, constraints, indexes, or relationships without intentionally rewriting business data. | Compatibility with running application versions, locking/downtime risk, and schema validation. |
| Data backfill migration | Populates or transforms existing records to support an approved model or behavior. | Data volume, restartability or idempotence, validation counts, sensitive data handling, and forward-fix strategy. |
| Reference-data migration | Adds or alters approved taxonomy or operational reference values used by the marketplace. | Business/data-owner review, effect on live records and UI behavior, and no demo content. |
| Destructive migration | Drops, deletes, overwrites, narrows, or irreversibly transforms schema or material records. | Exceptional scrutiny, confirmed recovery posture, explicit downtime/data-loss analysis, and two-person approval. |
| Compatibility migration | Introduces transitional structures or data that allow old and new application versions to coexist during staged rollout. | Supported application versions, dual-read/write or transition rules, and later removal plan. |
| Emergency corrective migration | A narrowly scoped database correction required to contain or repair an active production incident. | Incident scope, expedited but recorded approval, backup when possible, reviewed forward fix, and immediate validation. |

A migration plan may classify an operation under more than one type. The
highest-risk controls apply when types overlap.

## 4. Migration Lifecycle

1. **Proposal:** Document the business or operational reason, affected
   entities, sensitivity, migration type, compatibility needs, risks, and
   validation intent before creating a database change.
2. **Branch creation:** Use a dedicated migration branch and pull request for
   an approved migration implementation. Do not conceal migration work within
   an unrelated feature branch.
3. **Migration file creation and review:** Create the explicit, reviewable
   migration artifact and any separately governed data operation required by
   the approved proposal. Review SQL/operations, affected data, locking risk,
   permissions, compatibility, failure behavior, and absence of secrets.
4. **Local verification:** Verify only against an isolated non-production
   target with no production credentials. Confirm expected schema/data result,
   failure handling, and validation checks.
5. **Staging rehearsal:** Apply the exact reviewed migration sequence against
   the confirmed staging target, separately from deployment, then test the
   affected workflows and record timing and outcome.
6. **Approval:** Obtain explicit production approval referencing the reviewed
   commit, staging evidence, execution window, operator, reviewer, validation
   checklist, and rollback or forward-fix decision.
7. **Backup or snapshot confirmation:** Before production schema changes or
   material data operations, record that the required backup/snapshot exists
   and that the recovery owner and procedure are identified.
8. **Production execution:** The designated operator applies the exact
   approved migration once, separately from application build and deployment,
   with the designated reviewer available or following the approved control.
9. **Validation:** Perform schema/data and affected application-flow checks,
   inspect permitted logs without exposing secrets, and stop or invoke the
   approved recovery decision if results are unacceptable.
10. **Post-migration documentation:** Record commit/migration identity,
    approval reference, operators, execution time, validation outcome,
    deviations, incidents, and any required follow-up without sensitive
    values.

## 5. Required Migration Plan Template

Copy and complete this template in the approved change record or migration
pull request before production execution. Values must be non-sensitive.

```markdown
# Migration Plan: [migration title]

## Purpose
[Why this migration is needed and the intended outcome.]

## Classification And Impact
- Migration type: [schema-only / data backfill / reference-data /
  destructive / compatibility / emergency corrective]
- Affected tables/entities: [non-sensitive names only]
- Data sensitivity: [classification and handling requirements]
- Backward compatibility: [compatible application versions and rollout rule]
- Expected downtime or operational impact: [none / expected window and reason]

## Evidence And Approval
- Reviewed branch/commit or migration identity: [reference]
- Staging rehearsal result: [reference, result, timing, and issues]
- Backup/snapshot confirmation: [non-sensitive evidence reference and owner]
- Production approval reference: [change/approval identifier]
- Owner: [responsible role/name]
- Operator: [authorized execution role/name]
- Reviewer: [authorized reviewer/approver role/name]

## Validation Checklist
- [ ] [Schema/data state check]
- [ ] [Affected application-flow check]
- [ ] [Log/monitoring and outcome evidence check]

## Rollback Or Forward-Fix Plan
[Whether application rollback remains safe, when database reversal is unsafe,
the preferred forward-fix path, and the approved restore decision path if
recovery from backup becomes necessary.]
```

## 6. Staging Rehearsal Checklist

- [ ] Confirm the target is the designated staging environment using
      non-sensitive resource identification.
- [ ] Confirm that no production credentials or production database target are
      present in the rehearsal context.
- [ ] Confirm the reviewed branch/commit and apply the exact reviewed migration
      sequence separately from application deployment.
- [ ] Validate the resulting schema and, where relevant, controlled data
      outcomes.
- [ ] Validate affected user flows, including authentication, RFQ, quotation,
      order, and applicable administrative behavior.
- [ ] Record execution duration, warnings, errors, lock/downtime observations,
      and corrective actions without sensitive output.
- [ ] Record the rehearsal outcome and evidence reference in the migration
      plan; repeat rehearsal after any migration change.

Staging success is evidence for production approval; it does not itself
authorize a production migration.

## 7. Production Execution Checklist

- [ ] An approved and complete migration plan exists.
- [ ] The correct reviewed branch, commit, and migration identity are
      confirmed.
- [ ] The intended production target has been confirmed without exposing
      credentials or connection strings.
- [ ] The required backup or snapshot confirmation and recovery owner are
      recorded.
- [ ] The authorized operator and reviewer/approver are identified.
- [ ] A maintenance window, customer communication, or deployment sequencing
      has been approved if downtime or compatibility requires it.
- [ ] The exact reviewed migration is applied once as a separate controlled
      operation.
- [ ] No schema push or forced schema synchronization is run.
- [ ] Results are validated using the approved checklist.
- [ ] Outcome, timing, evidence references, and follow-up are recorded without
      secrets.

## 8. Rollback And Forward-Fix Policy

- **Application rollback is safe only when** the prior application artifact is
  explicitly documented as compatible with the post-migration schema and
  persisted data state. An app-only regression with no database mutation may
  normally use the approved application rollback process.
- **Database rollback is unsafe when** records have been written under the new
  schema, transformed or deleted, downstream actions depend on changed data,
  or reversal can discard valid production transactions or evidence.
- **Schema push is not rollback.** Forced synchronization does not provide a
  reviewed reversal, can introduce additional unintended changes, and weakens
  incident evidence and recovery confidence.
- **A forward fix is preferred when** a production migration has changed
  persisted data or a reversal would be less controlled or more destructive
  than a narrowly reviewed correction.
- **Backup restore is a recovery decision, not a routine undo command.** A
  restore may discard valid transactions since the snapshot and requires
  approved incident scope, accountable operators, communication, known restore
  procedure, and complete post-restore validation.

## 9. Prohibited Actions

- No production schema push or forced schema synchronization.
- No migrations, schema changes, or data changes during application build or
  deployment.
- No seed or demo data insertion in production.
- No cleanup script or broad deletion operation as rollback or incident
  improvisation.
- No undocumented production hotfix database changes.
- No secret values, `.env` contents, full connection strings, passwords,
  tokens, or private keys in migration plans, logs, approvals, or evidence.
- No use of admin-promotion, password-reset, supplier-maintenance, or other
  privileged scripts as an implicit part of a migration.

## 10. Validation Checklist

Complete applicable checks after staging rehearsal and again after production
execution. Use approved test methods that avoid unintended live business-data
mutation.

- [ ] Schema state matches the reviewed migration result.
- [ ] Any approved data transformation or reference-data result is validated
      using non-sensitive evidence.
- [ ] Application health endpoint and basic service availability are healthy.
- [ ] Login works through the approved target-environment verification method.
- [ ] RFQ flow receives an applicable sanity check.
- [ ] Quotation and order flow receive applicable sanity checks.
- [ ] Admin access or admin-dependent behavior is verified if the migration
      affects it and an approved verification method exists.
- [ ] Evidence confirms no seed, cleanup, reset, admin promotion, supplier
      maintenance, or other privileged script ran accidentally.
- [ ] Relevant logs and monitoring are checked without copying or exposing
      secret values.
- [ ] Result, reviewer confirmation, issues, and follow-up actions are recorded.

## 11. Emergency Migration Guidance

An emergency does not make uncontrolled database changes safe.

1. Pause additional deployments, migrations, and manual changes while the
   issue is triaged.
2. Identify the incident scope, affected data/workflows, current application
   and database state, and whether continued writes increase harm.
3. Prefer a narrowly scoped, reviewed forward fix where production data state
   makes reversal hazardous.
4. Obtain the appropriate emergency approval and identify operator and
   reviewer before execution; record the approval reference.
5. Confirm a backup or snapshot first where possible. If incident urgency
   prevents this, record the reason and accountable decision explicitly.
6. Validate immediately after execution and record decision, execution,
   result, remaining risk, and follow-up without secrets.
7. Do not improvise cleanup, password-reset, seed, admin-promotion, or other
   privileged scripts as a migration or recovery measure.

## 12. Current Known Gaps

- The actual production migration operator has not yet been assigned.
- The backup/restore owner and confirmed recovery process have not yet been
  established.
- Automated migration tooling and the controlled production execution
  mechanism have not yet been finalized.
- CI currently prevents dangerous build/deploy references through the release
  safety check, but it does not validate migration files or migration plans.
- Stronger automated environment identity and target verification checks are
  future work.

## 13. Next Recommended Tasks

| Suggested Work Item | Purpose |
| --- | --- |
| `docs/production-resource-register` | Record non-sensitive production/staging resources, owner roles, authorized operators, and control status. |
| `docs/backup-restore-runbook` | Assign backup/restore responsibility and define snapshot, restore-approval, restore-validation, and recovery evidence procedures. |
| `ci/migration-file-safety-checks` (later) | Add review automation for migration files and required migration-plan evidence after the migration tooling approach is approved. |
| `feature/private-file-storage-foundation` (later) | Introduce controlled chemical/commercial document storage only after data, access, retention, and operational controls are approved. |

This runbook preserves the approved foundation direction: retain PostgreSQL as
the transactional foundation, keep migrations separate from deployment and
privileged operations, and make future database changes reviewed, rehearsed,
recoverable, and auditable.
