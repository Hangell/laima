#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { runCli } from './cli/runner';

if (require.main === module) {
  const { version } = JSON.parse(
    readFileSync(join(__dirname, '../package.json'), 'utf8'),
  ) as { version: string };
  process.exitCode = runCli(
    process.argv.slice(2),
    console.log,
    console.error,
    version,
  );
}
