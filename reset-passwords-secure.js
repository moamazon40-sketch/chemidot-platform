'use strict';

// MANUAL NON-PRODUCTION OPERATION ONLY. Never invoke from build or deployment.
const EXECUTION_FLAG = '--execute-password-reset';
const ALLOWED_ENVIRONMENTS = new Set(['local', 'development', 'test', 'staging']);
const REQUIRED_CONFIGURATION = [
  'DATABASE_URL',
  'RESET_PASSWORD',
  'USER_EMAILS',
  'PASSWORD_RESET_ENVIRONMENT',
  'PASSWORD_RESET_TARGET_HOST',
  'PASSWORD_RESET_CONFIRMATION',
];

function getConfiguration() {
  const missing = REQUIRED_CONFIGURATION.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`missing required configuration: ${missing.join(', ')}`);
  }

  const environment = process.env.PASSWORD_RESET_ENVIRONMENT.trim().toLowerCase();
  if (!ALLOWED_ENVIRONMENTS.has(environment)) {
    throw new Error('this utility is blocked outside approved non-production environments');
  }

  let databaseUrl;
  try {
    databaseUrl = new URL(process.env.DATABASE_URL);
  } catch {
    throw new Error('DATABASE_URL is invalid');
  }

  if (!['postgres:', 'postgresql:'].includes(databaseUrl.protocol)) {
    throw new Error('DATABASE_URL must use a PostgreSQL protocol');
  }

  const targetHost = process.env.PASSWORD_RESET_TARGET_HOST.trim().toLowerCase();
  if (!targetHost || targetHost !== databaseUrl.hostname.toLowerCase()) {
    throw new Error('the confirmed target host does not match the configured database host');
  }

  const expectedConfirmation = `RESET PASSWORDS IN ${environment} ON ${targetHost}`;
  if (process.env.PASSWORD_RESET_CONFIRMATION !== expectedConfirmation) {
    throw new Error('explicit password reset confirmation is required');
  }

  const password = process.env.RESET_PASSWORD;
  if (password.length < 12) {
    throw new Error('RESET_PASSWORD must contain at least 12 characters');
  }

  const users = [...new Set(process.env.USER_EMAILS.split(',').map((email) => email.trim()).filter(Boolean))];
  if (users.length === 0 || users.some((email) => !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))) {
    throw new Error('USER_EMAILS must contain valid email addresses');
  }

  return {
    connectionString: process.env.DATABASE_URL,
    databaseUrl,
    environment,
    password,
    users,
  };
}

async function resetPasswords() {
  let configuration;
  try {
    configuration = getConfiguration();
  } catch (error) {
    console.error(`Password reset blocked: ${error.message}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Authorized non-production password reset starting for ${configuration.users.length} account(s).`);

  const { Pool } = require('pg');
  const bcrypt = require('bcryptjs');
  const isLocalConnection = ['localhost', '127.0.0.1', '::1'].includes(
    configuration.databaseUrl.hostname.toLowerCase(),
  );
  const pool = new Pool({
    connectionString: configuration.connectionString,
    ssl: isLocalConnection ? false : { rejectUnauthorized: true },
  });

  let client;
  try {
    client = await pool.connect();
    const hashedPassword = await bcrypt.hash(configuration.password, 12);
    let updatedCount = 0;

    await client.query('BEGIN');
    for (const email of configuration.users) {
      const result = await client.query(
        'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE email = $2',
        [hashedPassword, email],
      );
      updatedCount += result.rowCount;
    }
    if (updatedCount !== configuration.users.length) {
      await client.query('ROLLBACK');
      console.warn('Password reset not performed because one or more requested accounts were not found.');
      process.exitCode = 1;
      return;
    }

    await client.query('COMMIT');
    console.log(`Password reset completed for ${updatedCount} account(s).`);
  } catch {
    if (client) {
      try {
        await client.query('ROLLBACK');
      } catch {
        // Do not print database errors because they may include sensitive context.
      }
    }
    console.error('Password reset failed; database error details have been suppressed.');
    process.exitCode = 1;
  } finally {
    if (client) {
      client.release();
    }
    await pool.end();
  }
}

async function main() {
  if (!process.argv.slice(2).includes(EXECUTION_FLAG)) {
    console.error(`Password reset blocked: manual execution requires the ${EXECUTION_FLAG} flag.`);
    process.exitCode = 1;
    return;
  }

  await resetPasswords();
}

if (require.main === module) {
  main().catch(() => {
    console.error('Password reset terminated unexpectedly; details have been suppressed.');
    process.exitCode = 1;
  });
}
