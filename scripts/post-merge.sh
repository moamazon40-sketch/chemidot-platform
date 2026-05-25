#!/bin/bash
set -e
pnpm install --frozen-lockfile
# Database and privileged content operations require a separately approved manual runbook.
