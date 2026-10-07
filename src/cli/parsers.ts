import type {
  DateUnit,
  TimeUnit,
  BoundaryUnit,
  WeekOptions,
  Weekday,
} from '../types';
import Laima from '../laima';

export function parseDate(value: string, laima: Laima): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return laima.parseISODate(value);
  const match =
    /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.exec(
      value,
    );
  if (!match)
    throw new RangeError('Use YYYY-MM-DD or an ISO timestamp with timezone');
  const calendar = new Date(`${match[1]}T00:00:00Z`);
  if (
    Number.isNaN(calendar.getTime()) ||
    calendar.toISOString().slice(0, 10) !== match[1]
  ) {
    throw new RangeError('Invalid calendar date');
  }
  if (Number(match[2]) > 23 || Number(match[3]) > 59 || Number(match[4]) > 59)
    throw new RangeError('Invalid time');
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new RangeError('Invalid date');
  return date;
}

export function parseNumber(value: string): number {
  if (value.trim() === '' || !Number.isFinite(Number(value)))
    throw new RangeError('Expected a finite number');
  return Number(value);
}

export function parseDateUnit(value: string): DateUnit {
  const units: DateUnit[] = [
    'millisecond',
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
  ];
  if (!units.includes(value as DateUnit))
    throw new RangeError('Unknown date unit');
  return value as DateUnit;
}

export function parseTimeUnit(value: string): TimeUnit {
  const unit = parseDateUnit(value);
  if (unit === 'month' || unit === 'year')
    throw new RangeError('Elapsed differences do not use months or years');
  return unit;
}

export function parseBoundaryUnit(value: string): BoundaryUnit {
  const unit = parseDateUnit(value);
  if (unit === 'millisecond')
    throw new RangeError('Boundary unit cannot be millisecond');
  return unit;
}

export function parseCalendarArguments(
  values: string[],
  allowWeekStart = false,
) {
  const positional: string[] = [];
  const options: WeekOptions = {};
  for (let index = 0; index < values.length; index++) {
    const value = values[index];
    if (value === '--utc') {
      if (options.utc) throw new RangeError('Duplicate --utc');
      options.utc = true;
    } else if (value === '--week-start' && allowWeekStart) {
      if (options.weekStartsOn !== undefined)
        throw new RangeError('Duplicate --week-start');
      const first = parseNumber(values[++index] ?? '');
      if (!Number.isInteger(first) || first < 0 || first > 6)
        throw new RangeError('Week start must be an integer between 0 and 6');
      options.weekStartsOn = first as Weekday;
    } else if (value.startsWith('--'))
      throw new RangeError(`Unknown option: ${value}`);
    else positional.push(value);
  }
  return { positional, options };
}
