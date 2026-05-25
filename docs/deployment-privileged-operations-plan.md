# Deployment And Privileged Operations Remediation Plan

## Scope And Evidence

This document began as an architecture and operations plan. This implementation branch changes only automatic build/deployment command wiring as recorded below; it does not change application logic, database schema, migrations, or environment files.

### Implementation Note

On branch `fix/remove-db-push-from-build`, the automatic database mutation entry points identified below are removed from the root build command and the Render build command. On branch `chore/govern-admin-scripts`, identified admin, cleanup, seed, and supplier-content utilities require explicit manual operation gates, and `scripts/post-merge.sh` no longer invokes database push or seed tasks. Migrations and data operations are not part of application build or deployment.

The review covered:

- Root and scripts package commands: `package.json`, `scripts/package.json`
- Deployment configuration: `vercel.json`, `render.yaml`
- Database tooling and migration inventory: `lib/db/package.json`, `lib/db/drizzle.config.ts`, `lib/db/migrations/`
- Build and operational utilities under `scripts/`, including seed, cleanup, supplier maintenance, and admin promotion scripts
- Password reset utilities in the repository
- Existing deployment documentation and the platform foundation audit documents in `docs/`

## 1. Executive Summary

Chemidot should establish operational controls before adding significant new product features. The audit identified build/deployment paths that could mutate a database schema or baseline data automatically, plus administrative utilities capable of changing credentials, privileges, supplier content, demo data, or broad business records. This branch removes the identified automatic build/deploy mutation links; the privileged utilities still require governance.

For a B2B chemical marketplace, these operations affect trust, compliance evidence, customer account security, and investor review readiness. An application deployment should never silently determine whether production data or schema is changed.

### Main Risks Identified In The Audit Baseline

| Risk | Evidence Found | Severity |
| --- | --- | --- |
| Database mutation during Vercel build | Before this branch, `vercel.json` invoked root `pnpm build`, which invoked `scripts/push-db-if-configured.mjs`; when configured, that script ran a forced Drizzle push and inserted base data | Critical, remediated in the automatic build path on this branch |
| Database mutation during Render build | Before this branch, `render.yaml` included `pnpm --filter @workspace/db push` in the build command | Critical, remediated in the automatic build path on this branch |
| Database and demo data mutation after merge | Before the governance branch, `scripts/post-merge.sh` ran database push and seed commands; it now installs dependencies only | Critical, remediated in the post-merge path on this branch |
| Credential reset or disclosure risk | Password utilities include live update scripts and utilities that can log credential or environment information | Critical |
| Uncontrolled privilege elevation | Admin promotion modifies roles and permissions; it is now gated by explicit execution, target confirmation, approvals, and audit-reference requirements | High, controlled manual operation retained |
| Destructive record removal | Cleanup deletes broad sets of user and marketplace records; it is now non-production-only with execution, target, approval, audit, and backup-confirmation gates | Critical, controlled non-production operation retained |
| Production pollution from seed or supplier maintenance scripts | Seed scripts are now production-blocked; supplier maintenance remains manual with approvals, audit-reference, and backup-confirmation gates | High to Critical, controlled manual operations retained |

### Recommended Direction

1. Keep PostgreSQL and the existing application foundation while remediating operational controls.
2. Make all builds and deployments compile/package only; remove schema push and seed execution from automatic deployment paths.
3. Use reviewed, explicit migrations through a separately approved release procedure.
4. Quarantine or govern privileged scripts through environment restrictions, approvals, least-privilege credentials, secure logging, backups, and audit records.
5. Continue the gradual AWS strategy only after the foundation data model and operational controls are approved; private S3 document storage remains the likely first practical AWS step later.

## 2. Current Deployment And Build Behavior

### Vercel Path

`vercel.json` configures the build command as `pnpm build`. Before this remediation, the root `package.json` build command ran:

1. Type checking
2. `node scripts/push-db-if-configured.mjs`
3. API server build
4. Frontend build

When `DATABASE_URL` is available, `scripts/push-db-if-configured.mjs` runs:

- `pnpm --filter @workspace/db run push-force`
- `pnpm --filter @workspace/scripts run ensure-base-data`

This previously meant a Vercel build could apply forced schema synchronization and insert baseline category data. The remediated root build command performs type checking and application builds only; it no longer invokes `scripts/push-db-if-configured.mjs`.

### Render Path

Before this remediation, `render.yaml` defined a build command that installed dependencies, then ran:

- `pnpm --filter @workspace/db push`
- Application builds

The remediated Render build command installs dependencies and builds the applications only; it no longer runs Drizzle push during deployment.

### Package And Operational Commands

| Path | Command Or Trigger | Current Effect | Automatic Deployment Risk | Required Target State |
| --- | --- | --- | --- | --- |
| `package.json` | `pnpm build` | Previously invoked conditional forced database push and base-data insertion; now performs typecheck and application builds only | Remediated on this branch | Keep build compile-only |
| `vercel.json` | `buildCommand: pnpm build` | Uses the remediated root build without a database action | Remediated on this branch | Keep build database-free |
| `render.yaml` | Build command | Previously ran Drizzle push; now performs install and application builds only | Remediated on this branch | Keep build database-free |
| `lib/db/package.json` | `push`, `push-force` | Synchronizes schema directly using Drizzle tooling | Critical if used against production without governance | Manual, restricted workflow only; no forced production push |
| `scripts/push-db-if-configured.mjs` | Retained explicit utility, no longer called from root build | Forced schema push plus baseline data insert when database URL exists | Critical if invoked manually against production | Keep disconnected from deploy/build; govern or retire |
| `scripts/post-merge.sh` | Post-merge workflow | Installs dependencies only; database push and content seed calls removed on this branch | Remediated on this branch | Keep free of database and privileged content operations |

### Database Migration Context

The repository contains Drizzle migration files in `lib/db/migrations/`, while current deployment paths use schema push commands. For production safety, reviewed migration files should become the release mechanism, and schema push should not be part of production builds or deployments.

## 3. Privileged Scripts Inventory

### Deployment And Database Mutation Utilities

| File Path | Purpose And Data Affected | Risk Level | Production Risk | Allowed Runner | Required Safeguards |
| --- | --- | --- | --- | --- | --- |
| `scripts/push-db-if-configured.mjs` | If a database URL exists, runs forced schema push and inserts baseline categories | Critical | A build may mutate schema and business reference data automatically | No production deploy runner; temporary approved local/staging operator only until removed from build | Remove from build path; deny production execution; require migration process for schema; record reference-data changes separately |
| `lib/db/package.json` (`push`, `push-force`) | Exposes direct Drizzle schema synchronization commands | Critical | Schema may be altered without reviewed migration history or controlled release | Database release operator only; `push-force` prohibited for production | Separate migration credentials; approved migration plan; backup; dry-run/staging verification; audit record |
| `scripts/post-merge.sh` | Installs dependencies after merge; previously pushed schema and seeded content | Critical | Historical automatic mutation path could be reintroduced | No privileged operator action from this path | Database push and seed calls removed; keep protected by review and future CI checks |

### Seed And Supplier Maintenance Utilities

| File Path | Purpose And Data Affected | Risk Level | Production Risk | Allowed Runner | Required Safeguards |
| --- | --- | --- | --- | --- | --- |
| `scripts/src/ensure-base-data.ts` | Inserts baseline product categories if absent | Medium | Changes production reference data and taxonomy outside a reviewed release | Approved data steward or release operator only when needed | Remove from build; reviewed reference-data change request; staging verification; idempotency report |
| `scripts/src/seed.ts` | Inserts demo marketplace entities including users, suppliers, products, RFQs, quotations, collective ordering records, and orders | Critical | Pollutes production records and may create demo identities or misleading transaction history | Local/development/test disposable demo database operator only | Production and staging blocked; explicit CLI flag, environment confirmation, approval and audit references required; never run in deployment |
| `scripts/src/seed-projects.ts` | Inserts public-facing project/content records | High | Publishes or changes marketplace content without product/content approval | Local/development/test/staging content operator only | Production blocked; explicit CLI flag, environment confirmation, approval and audit references required; no automatic deployment execution |
| `scripts/src/seed-supplier-shop.ts` | Adds supplier brands, supplier documents, and supplier experts for known supplier records | High | Can alter supplier representation and document references visible to buyers | Local/development/test/staging data steward only | Production blocked; explicit CLI flag, environment confirmation, approval and audit references required; imported helper does not self-execute |
| `scripts/src/update-supplier-shop-urls.ts` | Updates supplier shop assets and document metadata and may insert missing SDS/TDS document entries | High | Can point production customers to incorrect compliance or technical documents | Approved data steward under manual controlled maintenance only | Explicit CLI flag, environment confirmation, approval and audit references, and backup confirmation required; validate document provenance and rollback mapping; suppress database error detail in terminal output |

### Identity, Credential, And Destructive Utilities

| File Path | Purpose And Data Affected | Risk Level | Production Risk | Allowed Runner | Required Safeguards |
| --- | --- | --- | --- | --- | --- |
| `scripts/src/promote-admin-by-email.ts` | Updates a selected user's role to admin and adjusts buyer/seller capabilities | High | Unauthorized privilege escalation or loss of appropriate segregation of duties | Authorized security/platform administrator only | Explicit CLI flag; target must be repeated for confirmation; approval, second-approver, and audit references required; output does not print target identifier or database error detail |
| `scripts/src/cleanup-test-data.ts` | Deletes wide categories of non-admin marketplace, messaging, transaction, supplier, product, project, audit, and user data | Critical | Irreversible production business-record loss or audit evidence loss | Non-production environment operator only | Production blocked; explicit CLI flag; environment/database target checks; approval, second-approver, audit, and backup confirmation required; connection values and database error detail not printed |
| `reset-passwords-secure.js` | Manual password reset utility retained only for approved non-production targets | Critical | Account takeover or uncontrolled credential reset if operational controls are bypassed | Authorized security/platform administrator only for approved non-production support work | Production blocked; explicit CLI execution flag plus environment, database-host, and typed-operation confirmation required; no reset variables in normal deployment configuration; no secret, target-account, or environment-value logging; all-or-nothing transactional updates; prefer token-based application reset flow |
| `reset-passwords-simple.js` | Quarantined legacy password-reset demonstration entrypoint | Critical | Historical path could be mistaken for an operational utility | No operational use; retained only as a fail-closed quarantine stub | Non-operational; does not read environment files or print sensitive values; never run in deployment |
| `reset-passwords-standalone.js` | Quarantined legacy password-reset simulation entrypoint | Critical | Historical path could be mistaken for an operational utility | No operational use; retained only as a fail-closed quarantine stub | Non-operational; does not read environment files or print sensitive values; never run in deployment |
| `lib/db/reset-passwords.js` | Quarantined legacy direct password updater entrypoint | Critical | Historical path could be mistaken for an operational utility | No operational use; retained only as a fail-closed quarantine stub | Embedded credentials and account targets removed; does not connect to a database; never run in deployment |

### Non-Privileged Support Item

| File Path | Purpose | Risk Level | Production Treatment |
| --- | --- | --- | --- |
| `scripts/src/hello.ts` | Basic informational script without a database operation | Low | No privileged control needed beyond normal repository review |

## 4. Production Safety Rules

### Mandatory Rules

1. Build and deployment commands must compile and package application artifacts only. They must not run schema push, migrations, seed, cleanup, password, admin, or supplier-maintenance actions.
2. The presence of `DATABASE_URL` or any deployment environment configuration must never be interpreted as approval to mutate a database.
3. Seed scripts must not run during production builds or deployments. Demo seed utilities must be prohibited from production entirely.
4. Production schema changes must use separately reviewed migration files and a controlled migration runbook. `push-force` must not be used for production.
5. Password reset utilities must never print passwords, password hashes, connection URLs, or environment file contents. Production resets require target validation, secure input, approval, and audit evidence.
6. Admin promotion must require an approved request, explicit target confirmation, a second approver, and an immutable audit entry.
7. Destructive cleanup scripts must be disabled for production by default. Any exceptional production data operation requires an approved recovery or retention procedure, backups, and two-person execution controls.
8. Production maintenance actions must use least-privilege credentials distinct from application runtime credentials and must produce non-sensitive audit evidence.
9. Supplier content and chemical document maintenance must be governed as controlled business-data changes, including source validation and document provenance checks.
10. Environment files and secret values must not be copied into logs, documentation, or support output.

### Actions Requiring Manual Approval

| Action | Local/Dev | Staging | Production |
| --- | --- | --- | --- |
| Application build/deploy with no database operation | Normal workflow | Release approval as appropriate | Release approval as appropriate |
| Database migration | Developer-controlled local database | Approved migration rehearsal and verification | Approved change ticket, backup, designated operator, recorded outcome |
| Baseline reference-data update | Allowed on local fixture data | Data owner review | Separate approved data change, never via build |
| Full demo seed (`scripts/src/seed.ts`) | Allowed only on isolated local/development/test fixture databases | Prohibited | Prohibited |
| Project and supplier-shop content seed | Allowed on isolated fixture databases | Allowed only with explicit execution, content/data-owner approval, and audit reference | Prohibited |
| Supplier document/content maintenance | Local fixture work | Data owner validation | Supplier/data-owner approval and auditable change |
| Admin promotion | Development testing only with fixture identities | Security approval for test access | Two-person approval and audit record |
| Password reset | Fixture accounts only | Authorized test/support procedure | Security-approved, audited reset procedure only |
| Cleanup/destructive deletion | Disposable local dataset only | Explicit target confirmation and snapshot | Prohibited absent separately approved exceptional procedure |

## 5. Recommended Target Workflow

### Local And Development Workflow

- Use a local or isolated development database with no production credentials.
- Allow fixture seed scripts only against clearly marked disposable or developer-owned data stores.
- Run schema changes locally from reviewed migration work in progress, with destructive experiments limited to disposable databases.
- Keep demo content and test account utilities out of any shared production operational path.

### Staging Workflow

- Use a database, credentials, and storage resources separate from production.
- Deploy application artifacts without automatic database changes.
- Apply proposed migrations through the future migration runbook before release approval.
- Validate RFQ, quotation, order, authentication, supplier document, and admin audit behavior after migration.
- Allow test data or supplier content preparation only through explicitly identified staging-only actions.

### Production Workflow

- Build and deploy application artifacts without schema or data mutation.
- Apply approved migrations as a separately scheduled release operation, never as an implicit deployment side effect.
- Limit production privileged operations to designated operators using scoped credentials, approved tickets, and auditable results.
- Require backup or snapshot confirmation before any approved operation that could affect schema, core data, identity access, or document records.

### Future Migration Workflow

1. Define the required schema change in a separate approved migration plan and implementation branch.
2. Generate or author a reviewed Drizzle migration file; do not rely on production schema push.
3. Review backward compatibility, affected data, data backfill needs, downtime risk, and rollback or forward-fix strategy.
4. Take a staging snapshot or backup and execute the migration in staging using a restricted migration credential.
5. Verify application behavior and data integrity in staging.
6. Obtain production approval with a scheduled window, backup confirmation, designated operator, and reviewer.
7. Apply the exact reviewed migration once in production and record execution evidence without secrets.
8. Deploy or promote application artifacts using a database-free build/deploy path.

### Rollback Workflow

- Prefer a forward corrective migration when production data has already changed and reversal would risk additional loss.
- Before a risky migration, define whether the preceding application version remains compatible with the new schema.
- Use backups or snapshots only under an approved recovery procedure with validated restore targets.
- Do not treat schema push or forced synchronization as a rollback mechanism.
- Record incident, decision, operator, reviewer, affected resources, and final validation outcome.

## 6. Remediation Roadmap

### Phase 1: Documentation And Inventory

- Approve this privileged-operations inventory and ownership model.
- Identify production, staging, and development resource owners and authorized operator roles.
- Classify each operational script as retain, refactor, replace, quarantine, or remove in subsequent implementation PRs.

### Phase 2: Stop DB Push During Build And Deploy

- Remove database push and forced synchronization from root build and platform deployment commands.
- Remove baseline data insertion from build/deploy execution.
- Establish a database-free deployment acceptance check for Vercel and Render paths.

### Phase 3: Isolate Privileged Scripts

- Separate demo/fixture scripts from operational maintenance scripts.
- Quarantine unsafe password demonstration and direct reset utilities pending replacement.
- Separate supplier-content maintenance from seeding and require data-owner approval.

### Phase 4: Add Production Guardrails

- Add deny-by-default production checks for retained privileged utilities.
- Require explicit environment targeting, non-sensitive output, scoped credentials, approval metadata, and audit logging.
- Define backup/snapshot requirements and restore validation for high-risk data actions.

### Phase 5: Add CI And Release Checks

- Add CI checks that prevent build/deploy commands from invoking schema push, seed, cleanup, password, or role-maintenance scripts.
- Add release checklist enforcement for migrations and privileged operational evidence.
- Add secret-output prevention review for operational scripts.

### Phase 6: Prepare For AWS And Private S3 Later

- After the foundation domain model and operational controls are approved, design private S3 storage for SDS/MSDS, COA, TDS, and compliance documents.
- Define authorization, retention, audit, encryption, and document provenance controls before migration.
- Defer broader AWS backend migration decisions until application and data-model responsibilities are clearly governed.

## 7. Next Implementation Tasks

Each implementation task should be completed through its own reviewed branch and pull request. These tasks are proposals only; this document does not implement them.

| Priority | Task Name | Suggested Branch | Purpose |
| --- | --- | --- | --- |
| 1 | `fix/remove-db-push-from-build` | `fix/remove-db-push-from-build` | Remove all automatic schema push and base-data mutation from Vercel/Render build and deployment paths; establish separate migration execution |
| 2 | `security/password-reset-scripts-cleanup` | `security/password-reset-scripts-cleanup` | Quarantine unsafe reset utilities, eliminate sensitive logging and embedded credential material, and define an approved password reset procedure |
| 3 | `chore/govern-admin-scripts` | `chore/govern-admin-scripts` | Add approval, confirmation, environment restriction, and audit requirements for admin promotion and other privileged utilities |
| 4 | `docs/staging-production-runbook` | `docs/staging-production-runbook` | Document staged migration, release, backup, rollback, and privileged-operation workflows |
| 5 | `ci/release-safety-checks` | `ci/release-safety-checks` | Prevent future builds/deployments from invoking database or privileged scripts automatically |

## 8. Clear Recommendation

### What Should Be Done First

The first implementation task should be `fix/remove-db-push-from-build`. Automatic schema and data mutation during Vercel or Render deployment is the highest immediate operational risk because it can affect a production database during an ordinary application release.

### What Should Not Be Done Yet

- Do not run schema push or migrations as part of this documentation work.
- Do not rebuild the product from scratch.
- Do not migrate from PostgreSQL to DynamoDB.
- Do not initiate a broad AWS backend migration before the data model and operational controls are approved.
- Do not use current privileged scripts for production until each retained operation has an approved and audited procedure.

### What Should Be Deferred Until After Data Model Work

- Private S3 document-storage implementation should be designed after chemical document ownership, access controls, retention, and audit requirements are approved.
- Broader AWS architecture decisions should wait until the foundation model, migration governance, identity controls, and operational runbooks are in place.

### Strategic Decision Alignment

Chemidot should keep and refactor its current foundation: retain PostgreSQL, do not adopt DynamoDB now, avoid a rebuild, and progress toward AWS gradually. The safest route to an investor-ready platform is to control deployment and privileged operations first, then strengthen the chemical data model and document management capabilities through separately reviewed implementation work.
