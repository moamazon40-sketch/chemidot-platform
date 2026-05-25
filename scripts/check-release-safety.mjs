import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

const forbiddenReferences = [
  { name: "database push", pattern: /(?:\bdb|\/db)\s+(?:run\s+)?push\b/i },
  { name: "push-force", pattern: /\bpush-force\b/i },
  { name: "drizzle push", pattern: /\bdrizzle(?:-kit)?\s+push\b/i },
  { name: "seed", pattern: /\bseed(?:[:\w-]*)?\b/i },
  { name: "cleanup", pattern: /\bcleanup(?:[:\w-]*)?\b/i },
  { name: "password reset", pattern: /\breset-passwords?(?:[:.\w-]*)?\b/i },
  { name: "admin promotion", pattern: /\bpromote-admin(?:[:.\w-]*)?\b|\badmin(?::|\s+)promot(?:e|ion)\b/i },
  { name: "supplier maintenance", pattern: /\bsupplier(?:\s+|-+)maintenance\b/i },
  { name: "supplier URL maintenance", pattern: /\bupdate(?:[:\s-]+)supplier(?:[:\s-]+)shop(?:[:\s-]+)urls\b/i },
  { name: "base data mutation", pattern: /\bensure(?:[:\s-]+)base(?:[:\s-]+)data\b/i },
  { name: "conditional database push", pattern: /\bpush(?:[:\s-]+)db(?:[:\s-]+)if(?:[:\s-]+)configured\b/i },
];

function readText(path) {
  return readFileSync(join(repositoryRoot, path), "utf8");
}

function readJson(path) {
  return JSON.parse(readText(path));
}

function getRenderBuildCommands() {
  const lines = readText("render.yaml").split(/\r?\n/);
  const commands = [];

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^(\s*)buildCommand:\s*(.*)$/);
    if (!match) continue;

    const indent = match[1].length;
    const value = match[2].trim();
    if (value !== "|" && value !== ">") {
      commands.push(value);
      continue;
    }

    const continuation = [];
    while (index + 1 < lines.length) {
      const nextLine = lines[index + 1];
      const nextIndent = nextLine.match(/^\s*/)[0].length;
      if (nextLine.trim() && nextIndent <= indent) break;
      continuation.push(nextLine.trim());
      index += 1;
    }
    commands.push(continuation.join(" "));
  }

  return commands;
}

function getShellCommands(path) {
  return readText(path)
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.trim().startsWith("#"))
    .join("\n");
}

function getWorkflowRunCommands(path) {
  const lines = readText(path).split(/\r?\n/);
  const commands = [];

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^(\s*)-?\s*run:\s*(.*)$/);
    if (!match) continue;

    const indent = match[1].length;
    const value = match[2].trim();
    if (value !== "|" && value !== ">") {
      commands.push(value);
      continue;
    }

    const continuation = [];
    while (index + 1 < lines.length) {
      const nextLine = lines[index + 1];
      const nextIndent = nextLine.match(/^\s*/)[0].length;
      if (nextLine.trim() && nextIndent <= indent) break;
      continuation.push(nextLine.trim());
      index += 1;
    }
    commands.push(continuation.join(" "));
  }

  return commands;
}

const packageJson = readJson("package.json");
const vercelJson = readJson("vercel.json");
const entrypoints = [
  { source: "package.json scripts.build", content: packageJson.scripts?.build ?? "" },
  { source: "vercel.json buildCommand", content: vercelJson.buildCommand ?? "" },
  ...getRenderBuildCommands().map((content) => ({ source: "render.yaml buildCommand", content })),
  { source: "scripts/post-merge.sh", content: getShellCommands("scripts/post-merge.sh") },
];

const workflowsDirectory = join(repositoryRoot, ".github", "workflows");
if (existsSync(workflowsDirectory)) {
  for (const filename of readdirSync(workflowsDirectory).filter((name) => /\.ya?ml$/i.test(name))) {
    const path = join(".github", "workflows", filename);
    for (const content of getWorkflowRunCommands(path)) {
      entrypoints.push({ source: relative(repositoryRoot, join(repositoryRoot, path)) + " run command", content });
    }
  }
}

const violations = [];
for (const entrypoint of entrypoints) {
  for (const forbidden of forbiddenReferences) {
    if (forbidden.pattern.test(entrypoint.content)) {
      violations.push(`${entrypoint.source}: references forbidden ${forbidden.name} operation`);
    }
  }
}

if (violations.length > 0) {
  console.error("Release safety check failed. Build/deploy entrypoints must not invoke privileged operations:");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exitCode = 1;
} else {
  console.log(`Release safety check passed: inspected ${entrypoints.length} build/deploy command entries.`);
}
