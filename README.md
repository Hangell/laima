# 🕰️ Laima

[![npm version](https://badge.fury.io/js/laima.svg)](https://www.npmjs.com/package/laima)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**🇺🇸 English** · [🇧🇷 Português](docs/pt/README.md) · [🇷🇺 Русский](docs/ru/README.md) · [🇮🇳 हिन्दी](docs/hi/README.md) · [🇨🇳 中文](docs/zh/README.md) · [🇪🇸 Español](docs/es/README.md)

A TypeScript/JavaScript library for converting, comparing, manipulating and formatting dates, with no runtime dependencies. The optional CLI ships in the same npm package.

> These additions are under development (see [CHANGELOG](CHANGELOG.md)) and will become available on npm after the next publication. The version has not been changed during this preparation.

## Installation and usage

```sh
npm install laima
```

```ts
import Laima from 'laima';

const laima = new Laima();
const date = laima.parseISODate('2024-02-29');
console.log(laima.formatDate(date, 'DD/MM/YYYY')); // 29/02/2024
console.log(laima.addDays(date, 1)); // a new Date; date is unchanged
```

```js
const Laima = require('laima').default;
const laima = new Laima();
console.log(laima.format());
```

[Complete API reference](docs/en/API.md) · [API reference in Portuguese](docs/pt/API.md)

## Date and time utilities

The typed API now includes calendar and elapsed arithmetic, clamped months/years, period boundaries, signed differences, inclusive intervals, ISO weeks, calendar metadata, ages, Monday–Friday business days, Unix seconds, duration components and IANA timezone formatting. New methods validate inputs and keep dates immutable. See the [extended API and type contracts](docs/en/API.md#extended-api).

```ts
const date = new Date('2024-01-31T12:00:00Z');
laima.add(date, 1, 'month', { utc: true }); // 2024-02-29T12:00:00.000Z
laima.getISOWeek(date, { utc: true });
laima.getDurationParts(-1500);
```

## Optional terminal usage

Install Node.js and npm. CI checks Node.js 22 and 24 on Linux, macOS and Windows.

```sh
npx laima --help
npx laima format 2024-02-29T12:00:00Z "DD/MM/YYYY HH:mm" --utc
npx laima add-days 2024-02-28 1
npx laima diff 2024-01-01 2024-01-10
npx laima date 0
```

To run `laima` directly:

```sh
npm install --global laima
laima --help
```

Date-only inputs use local midnight. Timestamps must include `Z` or an offset (`±HH:mm`). Formatting uses local time unless `--utc` is supplied. `date` and `add-days` emit UTC ISO timestamps. Errors go to stderr with exit code 1; successful output goes to stdout with exit code 0. See the [CLI reference](docs/en/API.md#cli).

## Compatibility

Existing imports and methods remain available. Day differences are absolute, rounded 24-hour periods; they cannot tell whether a deadline has expired. Calendar operations use local time and may cross daylight-saving transitions.

- `format(pattern?)` retains its legacy algorithm. Use `formatDate(date, pattern?, options?)` for repeated tokens, bracketed literals and UTC.
- `parseDateFromDB` still reads permissive `DD-MM-YYYY`, while `formatDateForDB` outputs `YYYY-MM-DD`. Use `parseISODate` to strictly read the latter.
- Native month overflow is preserved: January 31 plus one month can land in March. `addMonths` resets the time to midnight; `subMonths` preserves it.
- Debug logging has been removed. Legacy invalid-date behavior remains; new strict methods throw `RangeError`.

## Organization

```text
src/
  laima.ts           # public API facade
  types.ts           # shared types
  core/              # date operations grouped by responsibility
  cli.ts             # executable entry point
  cli/               # commands, parsing and help
tests/
  unit/              # module and CLI behavior
  compatibility/     # legacy contracts and quirks
  integration/       # npm package installation and usage
config/              # Jest, commitlint and test TypeScript
scripts/             # build cleanup and development hooks
docs/                # documentation by language
dist/                # generated build output
```

See the [architecture guide](docs/en/ARCHITECTURE.md) for responsibilities and where changes belong.

## Development and contributions

Use Node.js 22 or 24 and npm:

```sh
npm ci
npm run check
```

`check` runs lint, Prettier, type checks, coverage tests and package consumer validation. See [CONTRIBUTING](CONTRIBUTING.md) for hooks, Conventional Commits, timezone tests, translations and releases.

Participation follows the [Code of Conduct](CODE_OF_CONDUCT.md). Report vulnerabilities privately as described in the [Security Policy](SECURITY.md).

[CodeRabbit configuration](.coderabbit.yaml) requires a maintainer to install/authorize CodeRabbit on the GitHub repository. Configuration alone does not activate the service; see its [official documentation](https://docs.coderabbit.ai/reference/configuration).

## Name, author and license

Laima is inspired by the Baltic goddess of fate and time. Created by [Rodrigo Rangel](https://github.com/Hangell) · [hangell.org](https://hangell.org). [MIT license](LICENSE).

Support: PIX `rodrigo@hangell.org` · Crypto/NFT `0xEd4d1be72F807Faa358C966a8eF63367c200130F`.
