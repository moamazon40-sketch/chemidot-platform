# Staging And Production Runbook

## 1. Purpose

Chemidot is moving from an MVP into a professional B2B chemical marketplace.
This runbook defines how releases and operational actions should be handled
across local, test, staging, and production environments while that foundation
is strengthened.

This runbook protects:

- Customer and supplier account access.
- Marketplace, RFQ, quotation, order, and supplier-facing business data.
- Chemical content and future controlled document evidence.
- Production availability, auditability, and release confidence.

This runbook does not authorize an operation, change the database, define a
new schema, grant access, replace an incident plan, or approve use of any
privileged script. It is operational guidance. Every sensitive action still
requires the approvals, access controls, backups, and audit evidence applicable
to that action.

## 2. Environment Definitions

| Environment | Purpose | Allowed Actions | Prohibited Or Controlled Actions |
| --- | --- | --- | --- |
| Local/development | Individual development and safe experimentation using isolated developer-owned resources | Run the application, develop features, use fixture data, and test work in progress against clearly non-production targets | Never connect demo, cleanup, or development operations to production resources; never commit secrets |
| Test | Automated or disposable validation using isolated test resources | Run tests, create and remove fixture data, and exercise repeatable test setup/teardown on disposable targets | Must not use staging or production credentials/data; results do not substitute for staging release validation |
| Staging | Production-like release rehearsal on resources fully separated from production | Deploy reviewed artifacts, rehearse approved migrations, perform smoke testing, and perform approved/audited staging content preparation where permitted | No demo marketplace seed; no implicit database operations during deployment; no production secrets or customer data unless separately governed |
| Production | Live customer-facing marketplace and system-of-record data | Deploy approved application artifacts, execute separately approved production migrations, and conduct explicitly approved audited operations | No demo seed, cleanup, automatic schema mutation, improvised password reset, or unapproved privileged operation |

Environment separation is mandatory: databases, credentials, storage targets,
and operational authorization must make it clear which environment is being
changed before an operation begins.

## 3. Golden Rules

1. Build and deployment must not run database push, seed, cleanup, password
   reset, admin promotion, or supplier maintenance scripts.
2. A database connection available to an application or deployment is not
   authorization to mutate schema or data.
3. Production database changes require a separate, reviewed migration plan and
   controlled execution; production schema push is not an acceptable release
   mechanism.
4. Production password recovery must use the application's password reset flow
   or an approved, audited incident process.
5. Demo seed is allowed only for isolated local/development or test fixture
   databases. It is not allowed in staging or production.
6. Staging content seed may be allowed only where the existing governed script
   permits it and where content/data-owner approval and audit evidence have
   been recorded.
7. Production privileged scripts require explicit approval, authorized
   operators, scoped credentials, non-sensitive recorded evidence, and all
   operation-specific controls.
8. Secrets, database URLs, password material, and environment file contents
   must never be committed or included in logs, runbooks, tickets, or release
   notes.

## 4. Deployment Workflow

Deployment moves application artifacts through review without silently
changing schema or business data.

### Local Verification

- Confirm the intended branch and review the changed file list.
- Confirm no unintended `.env`, secret, deployment-configuration, schema, or
  migration changes are present.
- Run the appropriate formatting, type-check, build, and test checks for the
  change.
- For user-visible behavior, validate the relevant local flow against
  non-production data.

### Pull Request

- Open a focused pull request describing the behavior or documentation changed,
  checks performed, and any release considerations.
- Identify schema/migration, data mutation, secret, operational script, or
  deployment configuration changes explicitly. They require separate scrutiny
  and must not be hidden in feature work.
- Obtain review from the appropriate technical and operational owner when the
  change affects deployment or protected operations.

### Checks

- Require repository checks to pass before merge.
- Confirm the build path remains application-only and contains no call to
  database push, seed, cleanup, reset, admin, or supplier-maintenance actions.
- Treat failed checks or unexplained file changes as a reason to pause release.

### Preview Deployment

- Use a preview deployment to review UI/API behavior when available.
- A preview build must remain free of schema and privileged data operations.
- Do not use preview execution as approval to touch staging or production data.

### Merge

- Merge only reviewed, passing changes through the approved repository process.
- Record or retain the commit/deployment identity needed to trace the release.
- Database migrations, if any, remain a separately planned operation.

### Production Deployment

- Deploy the approved application artifact through the standard application-only
  deployment path.
- Confirm the targeted application/environment and the approved release commit
  before promoting production.
- Do not attach an ad hoc database change or privileged script invocation to a
  production deployment.

### Post-Deploy Smoke Test

- Run the checklist in Section 9 immediately after deployment.
- Record deployment identity, operator, outcome, and any issue discovered.
- If smoke tests fail materially, use the rollback decision workflow below.

## 5. Migration Workflow

No production migration is authorized by this document. When a schema or
controlled data migration becomes necessary, the safe future workflow is:

1. Create a separate migration branch and pull request scoped to the approved
   database change.
2. Add a reviewed migration file rather than relying on schema push or forced
   synchronization.
3. Document affected tables/data, compatibility with the currently deployed
   application, downtime risk, validation queries or checks, and the proposed
   rollback or forward-fix approach.
4. Rehearse the exact reviewed migration in staging using a restricted
   migration credential and a production-like sequence.
5. Take or confirm the required backup/snapshot before production execution,
   including a known restore procedure and accountable owner.
6. Obtain explicit production approval, including execution window, operator,
   reviewer, backup confirmation, and audit/change reference.
7. Execute the exact approved migration once in production, separately from
   application build or deployment.
8. Validate schema state, data integrity, and affected application workflows.
9. Record the result and use the pre-agreed rollback or forward-fix policy if
   validation fails.

Migration planning must state whether the prior application artifact is
compatible with the new schema. This determines whether application rollback
remains safe after a migration has been executed.

## 6. Rollback Workflow

### App-Only Rollback

Rollback an application deployment without a database change when a newly
released artifact causes a regression and the previous artifact remains
compatible with current data and APIs. Confirm the deployment identity and
perform smoke testing after rollback.

### Forward Fix

Use a reviewed forward fix when database changes or persisted data make an old
application version unsafe, or where reversing a migration would create more
risk than correcting it. A forward fix still requires review, approval,
controlled execution, and validation proportional to its impact.

### What Is Not A Rollback

Schema push or forced synchronization is not a rollback strategy. It does not
provide a reviewed reversal, may make further unintended changes, and may
destroy the evidence required to understand an incident.

### Backup Restore Caution

A production backup restore is a major recovery operation: it may discard
valid transactions created after the snapshot and must not be improvised.
Restore only through an approved incident/recovery decision with verified
scope, accountable operators, communication, and post-restore validation.

## 7. Privileged Operations Workflow

Privileged operations are separate from application deployments and must use
the operation-specific controls in the
[Privileged Script Runbook](./privileged-script-runbook.md). Scripts enforce
some guards, but they do not replace approval, backup, or audit ownership.

| Operation | Operational Rule |
| --- | --- |
| Admin promotion | Manual operation only; authorized administrator, explicit target confirmation, second approval, and audit evidence are required, especially for production |
| Cleanup | Non-production only under the governed cleanup procedure; production cleanup is blocked and must never be used as incident improvisation |
| Seed | Demo marketplace seed is local/development/test fixture use only; staging may receive only permitted content seed with approval/audit; production seed is prohibited |
| Supplier maintenance | Manual data-steward operation only; production requires supplier/content approval, provenance validation, backup confirmation, rollback mapping, and audit evidence |
| Password reset | Use the application reset flow for production; any exceptional incident process must be approved and audited; retained reset tooling is restricted to approved non-production use |

Do not place privileged actions in build commands, deployment platform
configuration, merge hooks, startup behavior, or recurring application jobs.

## 8. Pre-Deploy Checklist

- [ ] The correct branch, commit, and target environment have been confirmed.
- [ ] The changed file list contains no unrelated files.
- [ ] No `.env`, secret material, or environment credential change is included.
- [ ] No schema or migration change is included unless it has its own approved
      migration plan and release procedure.
- [ ] No database push, seed, cleanup, password reset, admin promotion, or
      supplier-maintenance script is wired into build or deployment.
- [ ] Required review and automated checks have passed.
- [ ] Any operational owner approval required for the release is recorded.

## 9. Post-Deploy Smoke Test Checklist

- [ ] Homepage loads successfully.
- [ ] Login works with an approved test/account verification method for the
      target environment.
- [ ] Buyer dashboard loads.
- [ ] Supplier dashboard loads.
- [ ] Admin access works, if admin behavior is applicable to this release and
      an approved admin verification account/process exists.
- [ ] RFQ flow receives a basic sanity check without unintended business data
      mutation.
- [ ] Orders page loads.
- [ ] Browser console and API responses show no obvious new errors.
- [ ] The deployment identity, smoke-test outcome, and any follow-up are
      recorded.

## 10. Emergency Checklist

- [ ] Pause additional deployments, migrations, and manual changes while the
      issue is triaged.
- [ ] Identify the last known-good commit and the current deployment identity.
- [ ] Inspect application/platform logs and relevant monitoring without
      exposing secrets in incident records.
- [ ] Decide whether an app-only rollback is safe or whether a reviewed forward
      fix is required due to schema or data state.
- [ ] Do not run cleanup, reset, seed, admin promotion, or supplier maintenance
      scripts under pressure as an unapproved recovery action.
- [ ] Record incident notes, decisions, operators, approvals, timelines, and
      validation outcomes.

## 11. Next Recommended Tasks

| Suggested Work Item | Purpose |
| --- | --- |
| `ci/release-safety-checks` | Add automated checks to keep schema push and privileged operations out of build/deploy paths |
| `docs/environment-control-inventory` | Record resource ownership, environment separation, authorized roles, backups, and release responsibilities without recording secrets |
| `docs/migration-runbook` | Define detailed migration preparation, execution, verification, and recovery evidence requirements |
| `feature/private-file-storage-foundation` (later) | Design and implement controlled private chemical/commercial document storage only after document access and data-model decisions are approved |

These tasks preserve Chemidot's current direction: retain PostgreSQL and the
existing product foundation, strengthen release and data controls first, and
introduce new infrastructure only through separately approved work.
