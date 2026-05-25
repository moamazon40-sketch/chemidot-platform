export type OperationEnvironment = "local" | "development" | "test" | "staging" | "production";

type GuardOptions = {
  action: string;
  executionFlag: string;
  allowedEnvironments: readonly OperationEnvironment[];
  confirmation: (environment: OperationEnvironment) => string;
  requireApproval?: boolean;
  requireSecondApproval?: boolean;
  requireAuditReference?: boolean;
  requireBackup?: boolean;
};

export class PrivilegedOperationBlockedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PrivilegedOperationBlockedError";
  }
}

export function blockPrivilegedOperation(message: string): never {
  throw new PrivilegedOperationBlockedError(message);
}

function requiredEnvironmentVariable(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    blockPrivilegedOperation(`Blocked: ${name} is required for this manual operation.`);
  }
  return value;
}

export function requirePrivilegedOperation(options: GuardOptions): OperationEnvironment {
  if (!process.argv.slice(2).includes(options.executionFlag)) {
    blockPrivilegedOperation(`Blocked: ${options.action} requires explicit CLI flag ${options.executionFlag}.`);
  }

  const environment = requiredEnvironmentVariable("OPERATION_ENVIRONMENT").toLowerCase() as OperationEnvironment;
  if (!options.allowedEnvironments.includes(environment)) {
    blockPrivilegedOperation(`Blocked: ${options.action} is not permitted in the selected environment.`);
  }

  if (process.env.OPERATION_CONFIRMATION !== options.confirmation(environment)) {
    blockPrivilegedOperation(`Blocked: explicit confirmation is required for ${options.action}.`);
  }

  if (options.requireApproval) {
    requiredEnvironmentVariable("OPERATION_APPROVAL_REFERENCE");
  }
  if (options.requireSecondApproval) {
    requiredEnvironmentVariable("OPERATION_SECOND_APPROVER_REFERENCE");
  }
  if (options.requireAuditReference) {
    requiredEnvironmentVariable("OPERATION_AUDIT_REFERENCE");
  }
  if (options.requireBackup && process.env.OPERATION_BACKUP_CONFIRMATION !== "BACKUP CONFIRMED") {
    blockPrivilegedOperation(`Blocked: recorded backup confirmation is required for ${options.action}.`);
  }

  return environment;
}

export function printBlockedOperation(error: unknown) {
  if (error instanceof PrivilegedOperationBlockedError) {
    console.error(error.message);
    return;
  }
  console.error("Operation failed; sensitive error details have been suppressed.");
}
