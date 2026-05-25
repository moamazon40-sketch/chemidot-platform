'use strict';

// Quarantined legacy database updater. Kept so old invocations fail closed.
console.error('This legacy password reset database updater is quarantined and cannot be run.');
console.error('Use the approved password reset policy in README-password-reset.md.');
process.exitCode = 1;
