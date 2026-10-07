# Changelog

## Unreleased

### Added

- 29 strictly validated, immutable date/time methods covering elapsed/calendar arithmetic, clamped months/years, business days, period boundaries, comparisons, inclusive intervals, signed differences, ISO weeks, day-of-year, age, date metadata, Unix seconds, durations and IANA timezone formatting.
- Public types for units, UTC/week options, weekdays, intervals, ISO week metadata, date information, duration parts and timezone formatting.
- 18 additive CLI commands for the new operations, preserving existing command contracts.
- Regression coverage for DST transitions, leap-day anniversaries, pre-1970 timestamps, years 0000–0099, month clamping, invalid inputs and installed TypeScript consumers.

- Optional `laima` CLI: `now`, `epoch`, `date`, `format`, `add-days`, `diff`, help and version.
- `formatDate(date, pattern?, { utc? })` with repeated tokens, literals and AM/PM.
- Strict local `parseISODate(value)` for `YYYY-MM-DD`.
- Portuguese and English API and contribution documentation.
- Regression tests, coverage thresholds and npm package consumer checks.
- ESLint, Prettier, Husky, lint-staged, Conventional Commits and CodeRabbit configuration.
- Code of Conduct and Security Policy with private reporting instructions and links from the README and contribution guide.
- CI matrix for Node.js 22/24 on Linux, Windows and macOS, including timezone tests.

### Changed

- Public method documentation in `src/laima.ts` standardized in English.
- Main README switched to English, with flag navigation and translations in `pt`, `ru`, `hi`, `zh` and `es`.

- Sources organized under `src/`, with a public facade delegating to focused date modules.
- CLI terminal adapter separated from command handling, help text and argument parsing.
- Unit, compatibility and package integration tests organized under `tests/`; tool configurations under `config/`.
- Build cleans generated output and retains the existing npm entry paths.

### Fixed

- Strict Date validation handles cross-context Dates and rejects prototype-only impostors without throwing.
- Zero calendar additions preserve the exact instant during repeated DST hours.

- Removed debug console output from library methods.
- Build and package contents include TypeScript declarations and CLI executable.
- Source files are no longer ignored by Git.
- Removed the historically tracked generated build from Git; builds regenerate `dist/`.
- Every push to `main` validates and generates an npm package from the repository root, saves the tarball as an artifact, and publishes previously unpublished versions with the `latest` tag.

### Compatibility

- Existing default export, CommonJS entry, method names and return semantics retained.
- `format()` retains its legacy replacement algorithm; use `formatDate()` for repeated tokens.
- DB parser remains permissive `DD-MM-YYYY`; use `parseISODate()` for strict `YYYY-MM-DD`.
- Existing month overflow, time-of-day handling, absolute differences and reference selection are retained.
