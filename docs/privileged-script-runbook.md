# Privileged Script Runbook

## Scope

These scripts alter identity access, delete records, create fixture/content
data, or change supplier-facing information. They are manual controlled
operations only. They must not run from application build, deployment, merge,
startup, migration, or scheduled application-runtime paths.

Never supply application production runtime credentials to a demo or cleanup
operation. Do not write database URLs, secrets, passwords, or approval
material to logs or committed files.

## Common Gate

Each governed script requires its exact CLI execution flag before importing
database access and requires:

- `OPERATION_ENVIRONMENT` identifying the target environment.
- `OPERATION_CONFIRMATION` matching the operation-specific text below.
- `OPERATION_APPROVAL_REFERENCE` identifying the approved work item.
- `OPERATION_AUDIT_REFERENCE` identifying where non-sensitive evidence and outcome are recorded.

The reference values must be identifiers only; do not place secrets or full
database connection details in them.

Guard-denial messages identify missing controls without printing operational
values. Once an operation reaches database access, unexpected error details
are suppressed from terminal output and must be reviewed through approved
secure operational channels.

## Operational Matrix

| Operation | Script | Allowed Environments | Required Execution Flag | Required Confirmation | Additional Control |
| --- | --- | --- | --- | --- | --- |
| Admin promotion | `scripts/src/promote-admin-by-email.ts` | `local`, `development`, `test`, `staging`, `production` | `--execute-admin-promotion` | `PROMOTE ADMIN IN <environment>` | Target email must be provided and repeated using the target-confirmation flags; `OPERATION_SECOND_APPROVER_REFERENCE` required. |
| Destructive test-data cleanup | `scripts/src/cleanup-test-data.ts` | `local`, `development`, `test`, `staging` only | `--execute-test-data-cleanup` | `DELETE TEST DATA IN <environment>` | Production is blocked; `OPERATION_SECOND_APPROVER_REFERENCE`, expected database host/name matching, and `OPERATION_BACKUP_CONFIRMATION=BACKUP CONFIRMED` required. |
| Demo marketplace seed | `scripts/src/seed.ts` | `local`, `development`, `test` only | `--execute-demo-seed` | `SEED DEMO DATA IN <environment>` | Production and staging are blocked because this creates fixture identities and transaction content. |
| Project content seed | `scripts/src/seed-projects.ts` | `local`, `development`, `test`, `staging` only | `--execute-project-seed` | `SEED PROJECT CONTENT IN <environment>` | Production is blocked; content owner review is required before staging. |
| Supplier shop seed | `scripts/src/seed-supplier-shop.ts` | `local`, `development`, `test`, `staging` only | `--execute-supplier-shop-seed` | `SEED SUPPLIER SHOP CONTENT IN <environment>` | Production is blocked; document provenance and content owner approval are required before staging; its exported mutation helper rechecks a recognized guarded seed context. |
| Supplier content maintenance | `scripts/src/update-supplier-shop-urls.ts` | `local`, `development`, `test`, `staging`, `production` | `--execute-supplier-content-maintenance` | `UPDATE SUPPLIER CONTENT IN <environment>` | Manual data-steward operation only; backup confirmation is required, and production requires supplier/content approval and recorded rollback mapping. |

## Approval And Evidence

- Admin promotion may be run only by an authorized security/platform
  administrator. A second approver and an audit reference are mandatory,
  including for production.
- Cleanup may be run only against non-production datasets by an authorized
  operator after a snapshot or backup has been confirmed. Production cleanup
  is blocked by the script.
- Demo seeds are for isolated fixture databases only.
- Staging content changes require a content owner or data steward approval and
  a recorded outcome.
- Production supplier maintenance is exceptional manual maintenance, requiring
  validated document sources, supplier or data-owner approval, backup
  confirmation, rollback mapping, and recorded audit evidence.

The scripts require references to these controls; they do not create an
immutable audit record or take a backup themselves.

## Deployment Separation

The root build, Render build, and Vercel build remain application build paths
only. `scripts/post-merge.sh` installs dependencies only; it no longer applies
schema changes or executes content seeds. Privileged operations must be run
separately under this runbook.
