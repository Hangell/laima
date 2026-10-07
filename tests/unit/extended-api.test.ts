import { runInNewContext } from 'node:vm';
import Laima, {
  BoundaryUnit,
  DateUnit,
  TimeUnit,
  Weekday,
} from '../../src/laima';

const laima = new Laima();
const utc = { utc: true };
const date = (value: string) => new Date(`${value}T12:34:56.789Z`);

it('checks Date values and clones without sharing references', () => {
  for (const value of [null, undefined, '', 0, {}, new Date(NaN)])
    expect(laima.isValidDate(value)).toBe(false);
  const source = date('2024-01-31');
  expect(laima.isValidDate(source)).toBe(true);
  expect(laima.cloneDate(source)).toEqual(source);
  expect(laima.cloneDate(source)).not.toBe(source);
});

it('validates native Date slots across contexts without trusting prototypes', () => {
  const foreign = runInNewContext('new Date(0)') as Date;
  expect(laima.isValidDate(foreign)).toBe(true);
  expect(laima.cloneDate(foreign).getTime()).toBe(0);
  expect(laima.isValidDate(Object.create(Date.prototype))).toBe(false);
  expect(laima.isValidDate({ [Symbol.toStringTag]: 'Date' })).toBe(false);
});

it('adds elapsed time with fractions, negatives and no mutation', () => {
  const source = date('2024-01-31');
  const stamp = source.getTime();
  expect(laima.addHours(source, 1.5).getTime()).toBe(stamp + 5400000);
  expect(laima.addMinutes(source, -2).getTime()).toBe(stamp - 120000);
  expect(laima.addSeconds(source, 0.25).getTime()).toBe(stamp + 250);
  expect(laima.add(source, 2, 'millisecond').getTime()).toBe(stamp + 2);
  expect(laima.subtract(source, 1, 'hour').getTime()).toBe(stamp - 3600000);
  expect(laima.add(source, 0, 'day')).not.toBe(source);
  expect(source.getTime()).toBe(stamp);
});

it('clamps month/year arithmetic and preserves UTC time and historical years', () => {
  const source = date('2024-01-31');
  expect(laima.addMonthsClamped(source, 1, utc).toISOString()).toBe(
    '2024-02-29T12:34:56.789Z',
  );
  expect(laima.add(source, 1, 'month', utc)).toEqual(
    laima.addMonthsClamped(source, 1, utc),
  );
  expect(laima.addYears(date('2024-02-29'), 1, utc).toISOString()).toBe(
    '2025-02-28T12:34:56.789Z',
  );
  expect(laima.add(date('2024-02-29'), 1, 'year', utc)).toEqual(
    laima.addYears(date('2024-02-29'), 1, utc),
  );
  expect(
    laima.subtract(date('2024-03-31'), 1, 'month', utc).toISOString(),
  ).toBe('2024-02-29T12:34:56.789Z');
  expect(laima.addMonthsClamped(date('0099-12-31'), 1, utc).toISOString()).toBe(
    '0100-01-31T12:34:56.789Z',
  );
  expect(laima.addYears(date('0000-02-29'), 1, utc).toISOString()).toBe(
    '0001-02-28T12:34:56.789Z',
  );
  expect(source).toEqual(date('2024-01-31'));
});

it('clones zero calendar additions without changing the instant', () => {
  const source = date('2024-01-31');
  for (const unit of ['day', 'week', 'month', 'year'] as DateUnit[]) {
    const result = laima.add(source, 0, unit);
    expect(result.getTime()).toBe(source.getTime());
    expect(result).not.toBe(source);
  }
  expect(laima.addMonthsClamped(source, 0)).toEqual(source);
  expect(laima.addYears(source, 0, utc)).toEqual(source);
});

it('supports local calendar arithmetic and time of day', () => {
  const source = new Date(2024, 0, 31, 12, 34, 56, 789);
  expect(laima.addMonthsClamped(source, 1)).toEqual(
    new Date(2024, 1, 29, 12, 34, 56, 789),
  );
  expect(laima.addYears(source, -1)).toEqual(
    new Date(2023, 0, 31, 12, 34, 56, 789),
  );
  expect(laima.add(source, 1, 'day')).toEqual(
    new Date(2024, 1, 1, 12, 34, 56, 789),
  );
  expect(laima.add(source, 1, 'week')).toEqual(
    new Date(2024, 1, 7, 12, 34, 56, 789),
  );
  expect(laima.add(source, 1, 'day', utc).getUTCDate()).toBe(1);
});

it.each([
  ['second', '2024-06-12T12:34:56.000Z', '2024-06-12T12:34:56.999Z'],
  ['minute', '2024-06-12T12:34:00.000Z', '2024-06-12T12:34:59.999Z'],
  ['hour', '2024-06-12T12:00:00.000Z', '2024-06-12T12:59:59.999Z'],
  ['day', '2024-06-12T00:00:00.000Z', '2024-06-12T23:59:59.999Z'],
  ['week', '2024-06-10T00:00:00.000Z', '2024-06-16T23:59:59.999Z'],
  ['month', '2024-06-01T00:00:00.000Z', '2024-06-30T23:59:59.999Z'],
  ['year', '2024-01-01T00:00:00.000Z', '2024-12-31T23:59:59.999Z'],
])('computes UTC %s boundaries', (unit, first, last) => {
  const source = date('2024-06-12');
  expect(laima.startOf(source, unit as BoundaryUnit, utc).toISOString()).toBe(
    first,
  );
  expect(laima.endOf(source, unit as BoundaryUnit, utc).toISOString()).toBe(
    last,
  );
  expect(source).toEqual(date('2024-06-12'));
});

it.each([
  'second',
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'year',
] as BoundaryUnit[])(
  'computes local %s boundaries containing the input',
  (unit) => {
    const source = new Date(2024, 5, 12, 12, 34, 56, 789);
    const start = laima.startOf(source, unit);
    const end = laima.endOf(source, unit);
    expect(start.getTime()).toBeLessThanOrEqual(source.getTime());
    expect(end.getTime()).toBeGreaterThanOrEqual(source.getTime());
    expect(start.getMilliseconds()).toBe(0);
    expect(end.getMilliseconds()).toBe(999);
  },
);

it('supports configurable week starts, default UTC options and year 0 boundaries', () => {
  expect(
    laima
      .startOf(date('2024-06-12'), 'week', { utc: true, weekStartsOn: 0 })
      .toISOString(),
  ).toBe('2024-06-09T00:00:00.000Z');
  expect(
    laima
      .endOf(date('2024-06-12'), 'week', { utc: true, weekStartsOn: 6 })
      .toISOString(),
  ).toBe('2024-06-14T23:59:59.999Z');
  expect(
    laima.startOf(new Date(2024, 5, 12, 12), 'week', { weekStartsOn: 0 }),
  ).toEqual(new Date(2024, 5, 9));
  expect(laima.startOf(date('0000-06-12'), 'year', utc).getUTCFullYear()).toBe(
    0,
  );
});

it('compares instants with strict predicates and inclusive intervals', () => {
  const earlier = new Date(0);
  const later = new Date(1);
  const same = new Date(0);
  expect(laima.compareDates(earlier, later)).toBe(-1);
  expect(laima.compareDates(later, earlier)).toBe(1);
  expect(laima.compareDates(earlier, same)).toBe(0);
  expect(laima.isBefore(earlier, later)).toBe(true);
  expect(laima.isBefore(later, earlier)).toBe(false);
  expect(laima.isAfter(later, earlier)).toBe(true);
  expect(laima.isAfter(earlier, later)).toBe(false);
  expect(laima.isEqual(earlier, same)).toBe(true);
  expect(laima.isEqual(earlier, later)).toBe(false);
  const interval = { start: earlier, end: later };
  expect(laima.isWithinInterval(earlier, interval)).toBe(true);
  expect(laima.isWithinInterval(later, interval)).toBe(true);
  expect(laima.isWithinInterval(new Date(-1), interval)).toBe(false);
  expect(laima.isWithinInterval(new Date(2), interval)).toBe(false);
  expect(
    laima.isSameDay(new Date(2024, 0, 1, 0), new Date(2024, 0, 1, 23)),
  ).toBe(true);
  expect(laima.isSameDay(date('2024-01-01'), date('2024-01-02'), utc)).toBe(
    false,
  );
});

it('distinguishes signed elapsed duration from signed calendar days', () => {
  const first = new Date('2024-01-01T23:00:00Z');
  const second = new Date('2024-01-02T01:00:00Z');
  expect(laima.difference(first, second)).toBe(7200000);
  const values: [TimeUnit, number][] = [
    ['millisecond', 7200000],
    ['second', 7200],
    ['minute', 120],
    ['hour', 2],
    ['day', 2 / 24],
    ['week', 2 / 168],
  ];
  for (const [unit, expected] of values)
    expect(laima.difference(first, second, unit)).toBe(expected);
  expect(laima.difference(second, first, 'hour')).toBe(-2);
  expect(laima.getCalendarDaysDifference(first, second, utc)).toBe(1);
  expect(laima.getCalendarDaysDifference(second, first, utc)).toBe(-1);
  expect(
    laima.getCalendarDaysDifference(
      new Date(2024, 0, 1, 23),
      new Date(2024, 0, 2, 1),
    ),
  ).toBe(1);
});

it.each([
  ['2021-01-01', 2020, 53, 5],
  ['2021-01-03', 2020, 53, 7],
  ['2021-01-04', 2021, 1, 1],
  ['2018-12-31', 2019, 1, 1],
  ['2024-02-29', 2024, 9, 4],
])('gets ISO week metadata for %s', (value, year, week, weekday) => {
  expect(laima.getISOWeek(date(value), utc)).toEqual({ year, week, weekday });
  expect(laima.getISOWeek(laima.parseISODate(value))).toEqual({
    year,
    week,
    weekday,
  });
});

it('gets calendar metadata, including leap days and years below 100', () => {
  expect(laima.getDayOfYear(date('2024-01-01'), utc)).toBe(1);
  expect(laima.getDayOfYear(date('2024-12-31'), utc)).toBe(366);
  expect(laima.getDayOfYear(new Date(2023, 11, 31))).toBe(365);
  expect(laima.isWeekend(date('2024-06-15'), utc)).toBe(true);
  expect(laima.isWeekend(date('2024-06-16'), utc)).toBe(true);
  expect(laima.isWeekend(new Date(2024, 5, 17))).toBe(false);
  const source = date('0000-02-29');
  const info = laima.getDateInfo(source, utc);
  expect(info).toMatchObject({
    year: 0,
    month: 2,
    day: 29,
    dayOfYear: 60,
    daysInMonth: 29,
    leapYear: true,
    epochMilliseconds: source.getTime(),
    unixSeconds: Math.floor(source.getTime() / 1000),
  });
  expect(laima.getDateInfo(new Date(2024, 5, 15))).toMatchObject({
    weekday: 6,
    weekend: true,
    leapYear: true,
  });
});

it.each([
  ['2024-06-14', 1, '2024-06-17'],
  ['2024-06-14', 5, '2024-06-21'],
  ['2024-06-15', 1, '2024-06-17'],
  ['2024-06-16', 5, '2024-06-21'],
  ['2024-06-15', -1, '2024-06-14'],
  ['2024-06-16', -6, '2024-06-07'],
  ['2024-06-17', -1, '2024-06-14'],
  ['2024-06-14', 0, '2024-06-14'],
])('adds business days from %s by %s', (source, amount, expected) => {
  expect(laima.addBusinessDays(date(source), amount, utc)).toEqual(
    date(expected),
  );
  expect(laima.addBusinessDays(laima.parseISODate(source), amount)).toEqual(
    laima.parseISODate(expected),
  );
});

it('handles large business-day counts by whole weeks', () => {
  expect(laima.addBusinessDays(date('2024-01-01'), 1000000, utc)).toEqual(
    laima.add(date('2024-01-01'), 200000, 'week', utc),
  );
});

it('calculates completed years on calendar anniversaries', () => {
  expect(laima.getAge(date('2000-06-15'), date('2024-06-14'), utc)).toBe(23);
  expect(laima.getAge(date('2000-06-15'), date('2024-06-15'), utc)).toBe(24);
  expect(laima.getAge(date('2000-02-29'), date('2023-02-28'), utc)).toBe(23);
  expect(laima.getAge(date('2000-02-29'), date('2024-02-28'), utc)).toBe(23);
  expect(
    laima.getAge(new Date(2000, 5, 15, 23), new Date(2024, 5, 15, 0)),
  ).toBe(24);
  jest.useFakeTimers().setSystemTime(new Date(2024, 5, 15));
  try {
    expect(laima.getAge(new Date(2000, 5, 15))).toBe(24);
  } finally {
    jest.useRealTimers();
  }
});

it('converts seconds and splits signed whole-millisecond durations', () => {
  expect(laima.fromUnix(0)).toEqual(new Date(0));
  expect(laima.fromUnix(1.25)).toEqual(new Date(1250));
  expect(laima.fromUnix(-1)).toEqual(new Date(-1000));
  expect(laima.toUnix(new Date(-1))).toBe(-1);
  expect(laima.toUnix(new Date(1250))).toBe(1);
  expect(laima.getDurationParts(90061001)).toEqual({
    sign: 1,
    days: 1,
    hours: 1,
    minutes: 1,
    seconds: 1,
    milliseconds: 1,
  });
  expect(laima.getDurationParts(-1500)).toEqual({
    sign: -1,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 1,
    milliseconds: 500,
  });
  expect(laima.getDurationParts(0)).toEqual({
    sign: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
});

it('formats the same instant in explicit IANA timezones and locales', () => {
  const instant = new Date('2024-01-01T02:00:00Z');
  expect(
    laima.formatInTimeZone(instant, 'America/Sao_Paulo', 'en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  ).toBe('31/12/2023, 23:00');
  expect(laima.formatInTimeZone(instant, 'UTC')).toBe(
    new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    }).format(instant),
  );
  expect(instant.toISOString()).toBe('2024-01-01T02:00:00.000Z');
});

it('rejects invalid dates consistently in strict operations', () => {
  const invalid = new Date(NaN);
  const valid = new Date(0);
  const operations = [
    () => laima.cloneDate(invalid),
    () => laima.add(invalid, 1, 'day'),
    () => laima.compareDates(valid, invalid),
    () => laima.isSameDay(valid, invalid),
    () => laima.isWithinInterval(valid, { start: invalid, end: valid }),
    () => laima.difference(invalid, valid),
    () => laima.getDateInfo(invalid),
    () => laima.toUnix(invalid),
    () => laima.formatInTimeZone(invalid, 'UTC'),
    () => laima.startOf(invalid, 'day'),
  ];
  for (const operation of operations) expect(operation).toThrow(RangeError);
});

it('rejects unsafe amounts, invalid units, options, zones and overflow', () => {
  const source = date('2024-01-31');
  const operations = [
    () => laima.add(source, NaN, 'day'),
    () => laima.subtract(source, Infinity, 'hour'),
    () => laima.add(source, 0.5, 'day'),
    () => laima.add(source, 0.5, 'year'),
    () => laima.addMonthsClamped(source, 0.5),
    () => laima.addYears(source, 0.5),
    () => laima.add(source, 1, 'quarter' as DateUnit),
    () => laima.difference(source, source, 'month' as TimeUnit),
    () => laima.startOf(source, 'millisecond' as BoundaryUnit),
    () => laima.startOf(source, 'week', { weekStartsOn: 7 as Weekday }),
    () => laima.startOf(source, 'week', { weekStartsOn: -1 as Weekday }),
    () => laima.startOf(source, 'week', { weekStartsOn: 0.5 as Weekday }),
    () => laima.add(source, 1e20, 'hour'),
    () => laima.addMonthsClamped(source, Number.MAX_SAFE_INTEGER),
    () => laima.addYears(source, Number.MAX_SAFE_INTEGER),
    () => laima.addBusinessDays(source, 0.5),
    () => laima.fromUnix(Infinity),
    () => laima.fromUnix(1e20),
    () => laima.getDurationParts(0.5),
    () => laima.getDurationParts(Number.MAX_SAFE_INTEGER + 1),
    () => laima.getAge(date('2025-01-01'), date('2024-01-01')),
    () =>
      laima.isWithinInterval(source, {
        start: date('2025-01-01'),
        end: date('2024-01-01'),
      }),
    () => laima.formatInTimeZone(source, ''),
    () => laima.formatInTimeZone(source, 'Invalid/Zone'),
    () => laima.formatInTimeZone(source, 'UTC', 'invalid_locale'),
  ];
  for (const operation of operations) expect(operation).toThrow(RangeError);
});

it('keeps calendar days and hour boundaries correct across New York DST', () => {
  // Run in a separate timezone process so the host timezone cannot hide regressions.
  const { spawnSync } =
    jest.requireActual<typeof import('node:child_process')>(
      'node:child_process',
    );
  const result = spawnSync(
    process.execPath,
    [
      '-e',
      `
    const ts=require('typescript');
    require.extensions['.ts']=(module,file)=>module._compile(ts.transpileModule(require('fs').readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2017}}).outputText,file);
    const L=require('./src/laima.ts').default; const l=new L(); const assert=require('node:assert/strict');
    const before=new Date(2024,2,9,12); const after=l.add(before,1,'day');
    assert.equal(l.difference(before,after,'hour'),23); assert.equal(l.getCalendarDaysDifference(before,after),1); assert.equal(after.getHours(),12);
    assert.equal(l.endOf(new Date(2024,2,10,12),'day').getTime()-l.startOf(new Date(2024,2,10,12),'day').getTime()+1,23*3600000);
    const fold=new Date('2024-11-03T01:30:00-05:00'); for(const unit of ['day','week','month','year']) assert.equal(l.add(fold,0,unit).getTime(),fold.getTime()); assert.equal(l.startOf(fold,'hour').toISOString(),'2024-11-03T06:00:00.000Z'); assert.equal(l.endOf(fold,'hour').toISOString(),'2024-11-03T06:59:59.999Z');
  `,
    ],
    {
      cwd: process.cwd(),
      env: { ...process.env, TZ: 'America/New_York' },
      encoding: 'utf8',
    },
  );
  expect(result.stderr).toBe('');
  expect(result.status).toBe(0);
});
