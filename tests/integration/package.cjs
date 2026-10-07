const { execFileSync, spawnSync } = require('node:child_process');
const { mkdtempSync, writeFileSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');

const temporary = mkdtempSync(path.join(tmpdir(), 'laima-package-'));
const npmCli = process.env.npm_execpath;
const npm = (args, cwd) =>
  execFileSync(process.execPath, [npmCli, ...args], {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, HUSKY: '0' },
  });
try {
  const packed = JSON.parse(
    npm(
      ['pack', '--json', '--ignore-scripts', '--pack-destination', temporary],
      process.cwd(),
    ),
  )[0];
  const files = packed.files.map((file) => file.path);
  for (const expected of [
    'dist/laima.js',
    'dist/laima.d.ts',
    'dist/cli.js',
    'dist/cli/runner.js',
    'dist/core/time.js',
    'dist/core/duration.js',
    'dist/core/validation.js',
    'dist/cli/commands.js',
    'dist/types.d.ts',
    'README.md',
    'LICENSE',
  ])
    assert(files.includes(expected), `Missing ${expected}`);
  assert(
    !files.some((file) =>
      /(?:\.test\.ts$|^node_modules\/|^coverage\/|^(?:src|tests|config|scripts)\/|^dist\/package.json$)/.test(
        file,
      ),
    ),
  );
  writeFileSync(path.join(temporary, 'package.json'), '{"private":true}');
  npm(
    [
      'install',
      '--no-audit',
      '--no-fund',
      path.join(temporary, packed.filename),
    ],
    temporary,
  );
  const source =
    "const Laima = require('laima').default; const l = new Laima(); if(l.formatDate(new Date('2024-01-02T03:04:05Z'), 'YYYY-MM-DD', {utc:true}) !== '2024-01-02') throw Error('CommonJS failed');";
  execFileSync(process.execPath, ['-e', source], { cwd: temporary });
  const cli = path.join(temporary, 'node_modules/laima/dist/cli.js');
  assert.equal(
    execFileSync(process.execPath, [cli, 'date', '0'], {
      encoding: 'utf8',
    }).trim(),
    '1970-01-01T00:00:00.000Z',
  );
  assert.equal(
    execFileSync(
      process.execPath,
      [cli, 'add', '2024-01-31T12:00:00Z', '1', 'month', '--utc'],
      { encoding: 'utf8' },
    ).trim(),
    '2024-02-29T12:00:00.000Z',
  );
  const invalid = spawnSync(process.execPath, [cli, 'epoch', 'invalid'], {
    encoding: 'utf8',
  });
  assert.equal(invalid.status, 1);
  assert.equal(invalid.stdout, '');
  assert.match(invalid.stderr, /^laima: /);
  assert.equal(
    npm(['exec', '--offline', '--', 'laima', '--version'], temporary).trim(),
    require('../../package.json').version,
  );
  writeFileSync(
    path.join(temporary, 'consumer.ts'),
    `import Laima, { FormatDateOptions, DateOptions, WeekOptions, DateUnit, TimeUnit, BoundaryUnit, CalendarUnit, Weekday, ISOWeekday, DateComparison, DateInterval, ISOWeekInfo, DurationParts, DateInfo, ZonedFormatOptions } from 'laima';
const l = new Laima();
const options: FormatDateOptions = {utc:true};
const calendar: DateOptions = options;
const weekOptions: WeekOptions = {utc:true,weekStartsOn:1};
const unit: DateUnit = 'month'; const fixed: TimeUnit = 'hour';
const boundary: BoundaryUnit = 'week'; const calendarUnit: CalendarUnit = 'year';
const weekday: Weekday = 0; const isoWeekday: ISOWeekday = 7;
const date = l.parseISODate('2024-02-29');
const output: string = l.format(); l.formatDate(date,output,options);
const moved: Date = l.add(date,1,unit,calendar);
l.subtract(moved,1,calendarUnit); l.startOf(date,boundary,weekOptions);
const interval: DateInterval = {start:date,end:moved};
const comparison: DateComparison = l.compareDates(date,moved);
const elapsed: number = l.difference(date,moved,fixed);
const iso: ISOWeekInfo = l.getISOWeek(date); const parts: DurationParts = l.getDurationParts(1500);
const info: DateInfo = l.getDateInfo(date); l.isWithinInterval(date,interval);
const zoned: ZonedFormatOptions = {year:'numeric'}; l.formatInTimeZone(date,'UTC','en-US',zoned);
const candidate: unknown = date; if(l.isValidDate(candidate)) candidate.getTime();
void [weekday,isoWeekday,comparison,elapsed,iso,parts,info];
// @ts-expect-error Unsupported date unit
l.add(date,1,'quarter');
// @ts-expect-error Elapsed units do not include months
l.difference(date,date,'month');
// @ts-expect-error Weekday values are restricted to 0..6
l.startOf(date,'week',{weekStartsOn:7});
// @ts-expect-error ISO weekdays are restricted to 1..7
const invalidISO: ISOWeekday = 0;
// @ts-expect-error The timezone is a separate argument
l.formatInTimeZone(date,'UTC','en-US',{timeZone:'America/Sao_Paulo'});
`,
  );
  execFileSync(
    process.execPath,
    [
      require.resolve('typescript/bin/tsc'),
      '--noEmit',
      '--strict',
      '--skipLibCheck',
      '--target',
      'es2017',
      '--module',
      'commonjs',
      path.join(temporary, 'consumer.ts'),
    ],
    { cwd: temporary, stdio: 'inherit' },
  );
  console.log(
    'Package verified: CommonJS, TypeScript declarations, CLI and npm executable.',
  );
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
