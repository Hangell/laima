import { runCli } from '../../src/cli/runner';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const { version } = JSON.parse(
  readFileSync(join(__dirname, '../../package.json'), 'utf8'),
) as { version: string };

function run(...args: string[]) {
  const out: string[] = [];
  const err: string[] = [];
  const status = runCli(
    args,
    (value) => out.push(value),
    (value) => err.push(value),
    version,
  );
  return { status, out: out.join('\n'), err: err.join('\n') };
}

describe('CLI', () => {
  it.each([[], ['--help'], ['-h']])('shows help for %j', (...args) => {
    const result = run(...args);
    expect(result.status).toBe(0);
    expect(result.out).toContain('Usage: laima');
    expect(result.err).toBe('');
  });
  it.each(['--version', '-v'])('shows version for %s', (arg) => {
    expect(run(arg)).toEqual({ status: 0, out: version, err: '' });
  });
  it('gets current epoch', () => {
    const before = Date.now();
    const result = run('now');
    expect(result.status).toBe(0);
    expect(Number(result.out)).toBeGreaterThanOrEqual(before);
  });
  it('converts epoch and timestamp, with local date-only parsing', () => {
    expect(run('date', '0').out).toBe('1970-01-01T00:00:00.000Z');
    expect(run('epoch', '1970-01-01T00:00:00Z').out).toBe('0');
    expect(run('epoch', '2024-01-02').out).toBe(
      String(new Date(2024, 0, 2).getTime()),
    );
    expect(run('epoch', '1970-01-01T01:00:00+01:00').out).toBe('0');
  });
  it('formats locally, in UTC and with the default pattern', () => {
    expect(run('format', '2024-01-02', 'DD/MM/YYYY').out).toBe('02/01/2024');
    expect(run('format', '2024-01-02').out).toBe('2024-01-02 00:00:00');
    expect(
      run('format', '2024-01-02T03:04:05Z', 'YYYY-MM-DD HH:mm:ss', '--utc').out,
    ).toBe('2024-01-02 03:04:05');
  });
  it('adds days and calculates absolute differences', () => {
    expect(run('add-days', '2024-02-28', '1').out).toBe(
      new Date(2024, 1, 29).toISOString(),
    );
    expect(run('add-days', '2024-03-01', '-1').out).toBe(
      new Date(2024, 1, 29).toISOString(),
    );
    expect(run('diff', '2024-01-10', '2024-01-01').out).toBe('9');
  });
  it.each([
    ['unknown'],
    ['--help', 'extra'],
    ['--version', 'extra'],
    ['now', 'extra'],
    ['epoch'],
    ['date'],
    ['format'],
    ['add-days'],
    ['diff'],
    ['epoch', 'invalid'],
    ['epoch', '2023-02-29'],
    ['epoch', '2023-02-29T00:00:00Z'],
    ['epoch', '2024-01-01T99:00:00Z'],
    ['epoch', '2024-01-01T24:00:00Z'],
    ['epoch', '2024-01-01T00:60:00Z'],
    ['epoch', '2024-01-01T00:00:60Z'],
    ['date', 'NaN'],
    ['date', ''],
    ['date', '1e99'],
    ['date', 'Infinity'],
    ['add-days', '2024-01-01', '0.5'],
    ['add-days', '2024-01-01', '1e30'],
    ['format', '2024-01-01', '--unknown'],
    ['format', '2024-01-01', 'a', 'b'],
    ['format', '--utc'],
  ])('rejects %j without writing data', (...args) => {
    const result = run(...args);
    expect(result.status).toBe(1);
    expect(result.out).toBe('');
    expect(result.err).toMatch(/^laima: /);
  });
});

describe('additive CLI commands', () => {
  it.each([
    [
      ['add', '2024-01-31T12:00:00Z', '1', 'month', '--utc'],
      '2024-02-29T12:00:00.000Z',
    ],
    [
      ['subtract', '2024-03-31T12:00:00Z', '1', 'month', '--utc'],
      '2024-02-29T12:00:00.000Z',
    ],
    [
      ['add', '2024-01-01T00:00:00Z', '0.5', 'hour'],
      '2024-01-01T00:30:00.000Z',
    ],
    [
      ['start-of', '2024-06-12T12:34:56Z', 'week', '--utc'],
      '2024-06-10T00:00:00.000Z',
    ],
    [
      [
        'start-of',
        '2024-06-12T12:34:56Z',
        'week',
        '--utc',
        '--week-start',
        '0',
      ],
      '2024-06-09T00:00:00.000Z',
    ],
    [
      ['end-of', '2024-02-10T12:00:00Z', 'month', '--utc'],
      '2024-02-29T23:59:59.999Z',
    ],
    [['compare', '2024-01-01', '2024-01-02'], '-1'],
    [['compare', '2024-01-02', '2024-01-01'], '1'],
    [
      ['diff-time', '2024-01-01T00:00:00Z', '2024-01-01T02:00:00Z', 'hour'],
      '2',
    ],
    [['diff-time', '2024-01-01T00:00:00Z', '2024-01-01T00:00:01Z'], '1000'],
    [
      [
        'calendar-diff',
        '2024-01-02T01:00:00Z',
        '2024-01-01T23:00:00Z',
        '--utc',
      ],
      '-1',
    ],
    [
      ['business-days', '2024-06-14T12:00:00Z', '1', '--utc'],
      '2024-06-17T12:00:00.000Z',
    ],
    [['age', '2000-02-29', '2023-02-28'], '23'],
    [
      ['iso-week', '2021-01-01T12:00:00Z', '--utc'],
      '{"year":2020,"week":53,"weekday":5}',
    ],
    [['day-of-year', '2024-12-31T12:00:00Z', '--utc'], '366'],
    [['is-weekend', '2024-06-15T12:00:00Z', '--utc'], 'true'],
    [['within', '2024-01-01', '2024-01-01', '2024-01-10'], 'true'],
    [['within', '2024-01-11', '2024-01-01', '2024-01-10'], 'false'],
    [['unix', '1970-01-01T00:00:01.250Z'], '1'],
    [['from-unix', '-1'], '1969-12-31T23:59:59.000Z'],
    [
      ['duration', '1500'],
      '{"sign":1,"days":0,"hours":0,"minutes":0,"seconds":1,"milliseconds":500}',
    ],
  ] as [string[], string][])('runs %j', (args, expected) => {
    expect(run(...args)).toEqual({ status: 0, out: expected, err: '' });
  });

  it('outputs typed date information as JSON', () => {
    const result = run('info', '2024-02-29T12:00:00Z', '--utc');
    expect(result.status).toBe(0);
    expect(result.err).toBe('');
    expect(JSON.parse(result.out)).toMatchObject({
      year: 2024,
      month: 2,
      day: 29,
      dayOfYear: 60,
      leapYear: true,
      weekend: false,
      isoWeek: { year: 2024, week: 9, weekday: 4 },
    });
  });

  it('uses the current date for age and explicit timezone locale formatting', () => {
    jest.useFakeTimers().setSystemTime(new Date(2024, 5, 15));
    try {
      expect(run('age', '2000-06-15').out).toBe('24');
    } finally {
      jest.useRealTimers();
    }
    const instant = new Date('2024-01-01T12:00:00Z');
    const expected = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    }).format(instant);
    expect(run('tz', instant.toISOString(), 'UTC')).toEqual({
      status: 0,
      out: expected,
      err: '',
    });
    expect(run('tz', instant.toISOString(), 'UTC', 'en-GB').out).toBe(
      '01/01/2024, 12:00:00',
    );
  });

  it.each([
    ['add'],
    ['subtract'],
    ['start-of'],
    ['end-of'],
    ['compare'],
    ['diff-time'],
    ['calendar-diff'],
    ['business-days'],
    ['age'],
    ['iso-week'],
    ['day-of-year'],
    ['is-weekend'],
    ['info'],
    ['within'],
    ['unix'],
    ['from-unix'],
    ['duration'],
    ['tz'],
    ['add', '2024-01-01', '1', 'quarter'],
    ['diff-time', '2024-01-01', '2024-01-02', 'month'],
    ['start-of', '2024-01-01', 'millisecond'],
    ['add', '2024-01-01', '0.5', 'day'],
    ['add', '2024-01-01', 'NaN', 'hour'],
    ['duration', '1.2'],
    ['from-unix', '1e30'],
    ['within', '2024-01-01', '2024-01-02', '2024-01-01'],
    ['tz', '2024-01-01', 'Bad/Zone'],
    ['add', '2024-01-01', '1', 'day', '--typo'],
    ['add', '2024-01-01', '1', 'day', '--week-start', '1'],
    ['start-of', '2024-01-01', 'week', '--week-start'],
    ['start-of', '2024-01-01', 'week', '--week-start', '7'],
    ['start-of', '2024-01-01', 'week', '--week-start', '0.5'],
    [
      'start-of',
      '2024-01-01',
      'week',
      '--week-start',
      '1',
      '--week-start',
      '0',
    ],
    ['add', '2024-01-01', '1', 'day', '--utc', '--utc'],
    ['epoch', '2024-01-01T00:00:00+99:99'],
  ])('rejects %j with no successful output', (...args) => {
    const result = run(...args);
    expect(result.status).toBe(1);
    expect(result.out).toBe('');
    expect(result.err).toMatch(/^laima: /);
  });
});
