import {
  blockPrivilegedOperation,
  printBlockedOperation,
  requirePrivilegedOperation,
} from "./privileged-operation-guard.js";

type UserRow = {
  role: string;
  can_buy: boolean;
  can_sell: boolean;
};

function requireEmailArg() {
  const raw = process.argv.find((arg) => arg.startsWith("--target-email="))?.slice("--target-email=".length).trim().toLowerCase();
  if (!raw) {
    blockPrivilegedOperation("Blocked: manual admin promotion requires --target-email=<email>.");
  }
  if (process.argv.find((arg) => arg.startsWith("--confirm-target-email="))?.slice("--confirm-target-email=".length).trim().toLowerCase() !== raw) {
    blockPrivilegedOperation("Blocked: explicit target email confirmation is required.");
  }
  return raw;
}

function printUser(label: string, row: UserRow | undefined) {
  if (!row) {
    console.log(`${label}: not found`);
    return;
  }

  console.log(`${label}: role=${row.role}, canBuy=${row.can_buy}, canSell=${row.can_sell}`);
}

async function promoteUser(email: string) {
  const { pool } = await import("@workspace/db");
  const client = await pool.connect();
  try {
    const before = await client.query<UserRow>(
      `select role, can_buy, can_sell
       from users
       where lower(email) = $1
       limit 1`,
      [email],
    );

    if ((before.rowCount ?? 0) === 0) {
      return { before: undefined, after: undefined };
    }

    const after = await client.query<UserRow>(
      `update users
       set role = 'admin',
           can_buy = false,
           can_sell = false,
           updated_at = now()
       where lower(email) = $1
       returning role, can_buy, can_sell`,
      [email],
    );

    return {
      before: before.rows[0],
      after: after.rows[0],
    };
  } finally {
    client.release();
    await pool.end();
  }
}

async function main() {
  requirePrivilegedOperation({
    action: "admin promotion",
    executionFlag: "--execute-admin-promotion",
    allowedEnvironments: ["local", "development", "test", "staging", "production"],
    confirmation: (environment) => `PROMOTE ADMIN IN ${environment}`,
    requireApproval: true,
    requireSecondApproval: true,
    requireAuditReference: true,
  });
  const email = requireEmailArg();
  const result = await promoteUser(email);

  if (!result.before) {
    console.error("No matching user was found for the approved target.");
    process.exit(2);
  }

  printUser("Before", result.before);
  printUser("After", result.after);
}

main()
  .catch((err) => {
    console.error("Admin promotion failed.");
    printBlockedOperation(err);
    process.exit(1);
  });
