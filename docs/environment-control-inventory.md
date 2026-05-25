# Environment Control Inventory

## 1. Purpose

Chemidot is moving from an MVP into a professional B2B chemical marketplace.
This inventory establishes a non-sensitive control record for local, test,
staging, and production environments. It gives release and operations owners a
shared place to document separation, access responsibility, approval needs,
backup expectations, and outstanding control work.

This inventory protects:

- Customer, supplier, and administrator account access.
- RFQ, quotation, order, supplier, and other marketplace business records.
- Chemical and commercial document handling as controlled storage capabilities
  are introduced.
- Production availability, deployment discipline, and audit evidence.

This inventory must never include passwords, tokens, credentials, secret
values, full database connection URLs, private keys, `.env` contents, or
material that would enable access to an environment. Record accountable owners
and non-sensitive control references only.

## 2. Environment List

| Environment | Definition |
| --- | --- |
| Local/development | Developer-owned, isolated resources used to implement and safely exercise work in progress. It must never be connected to production data or credentials. |
| Test | Isolated or disposable resources used for repeatable automated/manual validation and fixture lifecycle testing. |
| Staging | A production-like but fully separate environment used to rehearse reviewed releases, approved migrations, and permitted audited content preparation. |
| Production | The live customer-facing environment and source of truth for operational marketplace data. |

Environment names alone are not proof of separation. Resource identity,
credential scope, authorized access, and recorded approvals must make the
target unambiguous before any sensitive operation.

## 3. Environment Control Table

| Environment | Purpose | Data Sensitivity | Allowed Operations | Prohibited Operations | Who May Access | Approval Requirement | Backup Expectation | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Local/development | Build and test changes safely | Fixture or developer-created data only | Application development, local validation, fixture seed/cleanup only on explicitly disposable local targets | Any access to staging/production credentials or data; recording secrets in source/docs | Authorized developers using isolated resources | Normal development review; privileged fixture actions require target confirmation | Disposable data may be recreated; protect any intentionally retained local test material | Never assume local configuration proves the target is safe |
| Test | Repeatable automated/manual verification | Disposable fixture data only | Test setup/teardown and repeatable validation on isolated test resources | Staging/production data or credentials; treating test results as staging release evidence | Authorized engineering/CI roles for test resources | Test process approval appropriate to the suite; no production authorization implied | Reproducible fixtures preferred; no production restore dependency | Keep independent from staging and production |
| Staging | Production-like release and migration rehearsal | Non-production data that may still be sensitive or representative | Reviewed artifact deployment, smoke tests, approved migration rehearsal, approved/audited permitted content preparation | Demo marketplace seed; implicit schema/data changes in build/deploy; use of production secrets without separate governance | Approved engineering, release, or data-owner roles for staging | Recorded approval for migrations, privileged actions, or content preparation | Snapshot/backup before rehearsing risky data/schema operations when recovery matters | Must use resources and credentials separated from production |
| Production | Live service and transactional system of record | Highest sensitivity: live identities, business records, and operational evidence | Approved application-only deployments; separately approved migrations; explicitly approved audited privileged operations where permitted | Demo seed; cleanup; schema push; improvised reset/data operations; unapproved privileged actions | Designated authorized operators under least privilege | PR/check/merge controls for releases; explicit approval and audit evidence for sensitive actions | Backup/snapshot confirmation before approved schema or material data operations | Production access and recovery ownership must be recorded manually |

## 4. Resource Inventory Template

Populate this inventory only through an authorized control-review process.
Use non-sensitive resource identifiers and owner roles, never values that grant
access. If a field is unknown, leave the placeholder and record it as a gap.

| Environment | Application Hosting | API Hosting | Database | Storage | Email Provider | Domain/DNS | Monitoring/Logging | Secrets Or Environment Variable Location | CI/CD Provider |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Local/development | `[resource identifier only; owner to confirm]` | `[resource identifier only; owner to confirm]` | `[non-sensitive instance label only; do not record connection URL]` | `[resource identifier only; owner to confirm]` | `[provider/fixture mode to confirm]` | `[not applicable or owner to confirm]` | `[status/owner to confirm]` | `[location/control owner only; do not record values]` | `[provider/status to confirm]` |
| Test | `[resource identifier only; owner to confirm]` | `[resource identifier only; owner to confirm]` | `[non-sensitive instance label only; do not record connection URL]` | `[resource identifier only; owner to confirm]` | `[provider/fixture mode to confirm]` | `[not applicable or owner to confirm]` | `[status/owner to confirm]` | `[location/control owner only; do not record values]` | `[provider/status to confirm]` |
| Staging | `[resource identifier only; owner to confirm]` | `[resource identifier only; owner to confirm]` | `[non-sensitive instance label only; do not record connection URL]` | `[resource identifier only; owner to confirm]` | `[provider/status to confirm]` | `[non-sensitive domain label; owner to confirm]` | `[status/owner to confirm]` | `[location/control owner only; do not record values]` | `[provider/status to confirm]` |
| Production | `[resource identifier only; owner to confirm]` | `[resource identifier only; owner to confirm]` | `[non-sensitive instance label only; do not record connection URL]` | `[resource identifier only; owner to confirm]` | `[provider/status to confirm]` | `[non-sensitive domain label; owner to confirm]` | `[status/owner to confirm]` | `[location/control owner only; do not record values]` | `[provider/status to confirm]` |

For each populated resource, a later approved resource register should record
the owner role, access-review cadence, backup/recovery owner where applicable,
and non-sensitive evidence location.

## 5. Secret Handling Policy

1. Never commit `.env` files or any file containing credentials or secret
   values.
2. Never paste secrets into documentation, issues, tickets, pull requests,
   chat, screenshots, support messages, or operational evidence.
3. Never expose `DATABASE_URL` or a full database connection string. For
   operation confirmation, use only separately approved non-sensitive host/name
   identifiers.
4. Rotate secrets immediately through the approved incident process if they
   may have been exposed, and record only non-sensitive incident evidence.
5. Keep local/development, test, staging, and production secret values
   separate; one environment must not inherit privileged access to another.
6. Grant access according to least privilege and restrict production secrets to
   authorized operators and runtime services that require them.

This inventory may identify where secrets are governed or who owns access
review, but it must not contain the values themselves.

## 6. Database Control Policy

- The production PostgreSQL database is Chemidot's operational system of
  record for live marketplace transactions and related evidence.
- Build and deployment paths must not run database push, forced schema
  synchronization, seed, or other data-mutation actions.
- Production database changes require a separately reviewed migration plan and
  an approved migration execution procedure; schema push is not a production
  migration mechanism.
- The exact approved migration sequence must be rehearsed in staging before
  production execution.
- A backup or snapshot must be confirmed before any approved production schema
  change or material production data operation.
- Each production database operation must identify validation steps and a
  rollback or forward-fix decision before execution. Schema push is not a
  rollback mechanism.

## 7. Deployment Control Policy

- Builds and deployments must produce or deploy application artifacts only;
  they must not perform schema or privileged business-data operations.
- The `release:safety-check` package command protects build/deploy entrypoints
  and workflow run commands from reintroducing prohibited privileged-operation
  references during pull request validation.
- Preview deployments support review but are not staging: they do not authorize
  staging or production database, content, or access operations.
- Production deployment requires a reviewed pull request, required checks,
  approved merge/release process, confirmation of the intended deployment, and
  post-deploy smoke-test evidence.

## 8. Privileged Operations Control Policy

Privileged actions remain manual controlled operations governed by the
[Privileged Script Runbook](./privileged-script-runbook.md). Neither a
deployment nor this inventory authorizes their use.

| Operation | Control Policy |
| --- | --- |
| Admin promotion | Requires authorized administration, explicit target confirmation, approval, second approval, and audit evidence; production access changes are exceptional controlled actions. |
| Cleanup | Allowed only for governed non-production targets; production cleanup is prohibited and must not be treated as incident recovery. |
| Seed | Demo seed is limited to isolated local/development/test fixture targets; staging permits only governed content preparation where allowed and approved; production seed is prohibited. |
| Supplier maintenance | Manual data-steward operation only; production requires approval, validated content/document provenance, backup confirmation, rollback mapping, and audit evidence. |
| Password reset | Production recovery must use the application reset flow or an approved audited incident process; restricted tooling must not become a deployment or routine production path. |

## 9. Environment Confirmation Checklist

Before a sensitive operation, the operator and required reviewer must confirm:

- [ ] The current branch and approved change or incident scope.
- [ ] The target environment (`local/development`, `test`, `staging`, or
      `production`).
- [ ] The expected database host/name identifier, where relevant, without
      copying or exposing a full connection URL.
- [ ] The approval reference required for the operation.
- [ ] The audit/reference note location for non-sensitive outcome evidence.
- [ ] Backup or snapshot confirmation where schema, material data, identity,
      or supplier/document records may be affected.
- [ ] The rollback or forward-fix plan, including validation after execution.

Stop the operation if any required confirmation is missing, ambiguous, or
points to an unexpected environment.

## 10. Current Known Gaps

- Actual resource owners and authorized operator roles must be filled in
  manually through an approved control-review process.
- Backup owner, backup status, snapshot capability, and restore-validation
  status require confirmation.
- Monitoring/logging ownership, alert coverage, access, and retention status
  require confirmation.
- The staging and production resource list must be completed without recording
  secrets, credentials, or full connection strings.
- Stronger automated environment identity checks and release-time target
  verification are future work.

## 11. Next Recommended Tasks

| Suggested Work Item | Purpose |
| --- | --- |
| `docs/migration-runbook` | Define migration preparation, staging rehearsal, production execution, validation, and rollback/forward-fix evidence requirements. |
| `docs/production-resource-register` | Populate non-sensitive production and staging resource ownership, responsibility, and control status through authorized review. |
| `docs/backup-restore-runbook` | Establish backup ownership, snapshot requirements, restore authorization, validation, and incident-recovery procedures. |
| `feature/private-file-storage-foundation` (later) | Introduce controlled private chemical/commercial document storage only after the document access model, retention, audit, and operational ownership are approved. |

Chemidot should continue to keep PostgreSQL as its transactional foundation,
separate privileged work from deployment, complete operational ownership and
recovery controls, and add infrastructure capabilities only through reviewed,
auditable steps.
