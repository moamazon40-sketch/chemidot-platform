# Password Reset Safety Policy

## Production Policy

Repository password reset scripts are not approved for production use. Production
password resets must use the application's token-based reset flow or an approved
security incident/support procedure with audit logging and independent approval.

Password reset utilities must never be invoked from build, deploy, migration,
seed, or cleanup operations.
Password-reset-only variables, including `RESET_PASSWORD` and `USER_EMAILS`,
must not be provisioned in normal application deployment configuration.

## Utility Status

| File | Status | Purpose |
| --- | --- | --- |
| `reset-passwords-secure.js` | Retained, manual non-production use only | Performs a controlled password reset only after explicit safeguards pass. |
| `reset-passwords-simple.js` | Quarantined, non-operational | Legacy demonstration entrypoint that now exits without reading configuration. |
| `reset-passwords-standalone.js` | Quarantined, non-operational | Legacy simulation entrypoint that now exits without reading configuration. |
| `lib/db/reset-passwords.js` | Quarantined, non-operational | Legacy direct updater that now exits without connecting to a database. |

## Retained Utility Safeguards

`reset-passwords-secure.js` is only for an authorized operator working on an
approved non-production target. It fails before creating a database connection
unless all of these checks pass:

- The script is invoked directly with the exact `--execute-password-reset` CLI flag.
- `PASSWORD_RESET_ENVIRONMENT` is exactly `local`, `development`, `test`, or `staging`.
- `PASSWORD_RESET_TARGET_HOST` exactly matches the hostname in `DATABASE_URL`.
- `PASSWORD_RESET_CONFIRMATION` exactly matches `RESET PASSWORDS IN <environment> ON <host>`.
- `RESET_PASSWORD` contains at least 12 characters.
- `USER_EMAILS` contains one or more valid target email addresses.

Production values such as `production` or `prod` are not permitted by this
utility. No repository script provides a production override.

The operational inputs `DATABASE_URL`, `RESET_PASSWORD`, and `USER_EMAILS`
must be injected through the approved operator-controlled secret delivery
method. Do not put password-reset material in committed files, command
examples, terminal transcripts, or deployment configuration.

When all approvals and configuration are already in place, the manual
entrypoint is:

```bash
node reset-passwords-secure.js --execute-password-reset
```

Without the exact CLI flag, the utility fails closed before it validates
operational configuration or creates a database connection. Importing the
module does not start a reset operation. The retained utility does not read
`.env` files and does not print database URLs, passwords, password hashes,
full environment values, requested account addresses, declared environment
values, database error details, or user IDs. Updates run in a transaction,
roll back if any requested account is missing, and output only non-sensitive
counts.

## Quarantined Utilities

The quarantined files remain in place to prevent accidental reliance on old
paths while failing closed. They do not read `.env` files, hash credentials,
connect to a database, or perform password resets. Do not repurpose them for
operations; a future removal can happen only after references and operational
procedures have been reviewed.
