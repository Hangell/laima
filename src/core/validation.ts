import type { DateOptions, TimeUnit, Weekday } from '../types';

export const MILLISECONDS_PER_DAY = 86400000;
export const TIME_UNIT_MS: Record<TimeUnit, number> = {
  millisecond: 1,
  second: 1000,
  minute: 60000,
  hour: 3600000,
  day: MILLISECONDS_PER_DAY,
  week: 7 * MILLISECONDS_PER_DAY,
};

export function isValidDate(value: unknown): value is Date {
  try {
    return Number.isFinite(Date.prototype.getTime.call(value));
  } catch {
    return false;
  }
}

export function assertValidDate(value: Date): void {
  if (!isValidDate(value)) throw new RangeError('Invalid date');
}

export function assertFinite(value: number): void {
  if (!Number.isFinite(value)) throw new RangeError('Expected a finite number');
}

export function assertInteger(value: number): void {
  if (!Number.isSafeInteger(value))
    throw new RangeError('Expected a safe integer');
}

export function cloneDate(date: Date): Date {
  assertValidDate(date);
  return new Date(date.getTime());
}

export function timeUnitMilliseconds(unit: TimeUnit): number {
  if (!Object.prototype.hasOwnProperty.call(TIME_UNIT_MS, unit)) {
    throw new RangeError('Unknown time unit');
  }
  return TIME_UNIT_MS[unit];
}

export function calendarFields(date: Date, options: DateOptions = {}) {
  assertValidDate(date);
  const utc = options.utc === true;
  return {
    year: date[utc ? 'getUTCFullYear' : 'getFullYear'](),
    month: date[utc ? 'getUTCMonth' : 'getMonth'](),
    day: date[utc ? 'getUTCDate' : 'getDate'](),
    weekday: date[utc ? 'getUTCDay' : 'getDay']() as Weekday,
  };
}

/** UTC midnight for calendar fields, preserving years 0–99. */
export function calendarDate(year: number, month: number, day: number): Date {
  const date = new Date(0);
  date.setUTCFullYear(year, month, day);
  assertValidDate(date);
  return date;
}

export function calendarStamp(date: Date, options: DateOptions = {}): number {
  const { year, month, day } = calendarFields(date, options);
  return calendarDate(year, month, day).getTime();
}
