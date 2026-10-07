# Architecture

[README](../../README.md) · [Português](../pt/ARCHITECTURE.md)

Laima uses a public facade and modules grouped by responsibility. This enables small internal changes while preserving imports, methods and behaviors already used by npm consumers.

## Library

`src/laima.ts` implements the facade: the exported class retains its instance methods and delegates operations to `src/core/`. The historical class name is preserved. `getDaysDifference` still calls `this.getDaysDifferenceBetweenEpochs`, respecting subclass overrides.

| File                     | Responsibility                                             |
| ------------------------ | ---------------------------------------------------------- |
| `src/core/time.ts`       | Epoch, conversions and duration differences                |
| `src/core/arithmetic.ts` | Adding and subtracting days and months                     |
| `src/core/comparison.ts` | Selecting the later and earlier date                       |
| `src/core/calendar.ts`   | Day boundaries, months and leap years                      |
| `src/core/formatting.ts` | Legacy, DB, local and token formatting                     |
| `src/core/parsing.ts`    | Legacy DB parsing and strict ISO parsing                   |
| `src/core/duration.ts`   | Signed elapsed duration components                         |
| `src/core/validation.ts` | Strict shared validation, units and calendar field helpers |
| `src/types.ts`           | Shared types reexported by the facade                      |

Modules do not depend on the CLI or filesystem. The current-time operation reads the environment clock; other operations take their data as arguments. Preserve legacy normalization and timezone semantics. Internal modules do not constitute a new supported public API.

## CLI

`src/cli.ts` is the terminal adapter: it reads the package version, receives `process.argv`, connects stdout/stderr and sets the exit code. The library does not import this adapter.

`src/cli/runner.ts` processes commands using the facade. Arguments, output callbacks and version are supplied as parameters, allowing tests without terminating the process or reading files. `commands.ts` dispatches the additive commands; `parsers.ts` validates dates, units and calendar flags; `help.ts` contains help text. The dispatcher retains an explicit `switch` for the small command set.

Flow: **terminal → adapter → runner → facade → date module**.

## Tests and tooling

- `tests/unit/`: library, new utility and CLI behavior.
- `tests/compatibility/`: legacy normalization, Date identity, rounding, formatting and overrides.
- `tests/integration/package.cjs`: packs and installs a temporary consumer, checking imports, declarations and the actual executable.
- `config/`: Jest, commitlint and test TypeScript configuration.
- `scripts/`: build cleanup and hook preparation.

Unit coverage measures the facade, modules and runner. The `src/cli.ts` adapter is validated by executing the installed package; `src/types.ts` is checked by the compiler and TypeScript consumer.

## Build and npm compatibility

`tsconfig.json` uses `src/` as its root and generates the corresponding structure in `dist/`. Cleaning before compilation avoids stale modules in the tarball. npm includes the `dist/` tree, containing JavaScript and declarations for all required modules.

Preserved entry points: `main: dist/laima.js`, `types: dist/laima.d.ts`, executable `dist/cli.js`, TypeScript default import and `require('laima').default`. Keep Node dependencies out of library modules; only the CLI should access the terminal and files.

## Where to make changes

For an operation change, find its module in `src/core/` and preserve the facade signature. For a new API, implement the operation, expose a facade method, and update types, tests and both language documents. For command changes, use the runner or parsers and preserve stdout/stderr/exit-code contracts. Validate with `npm run check`.
