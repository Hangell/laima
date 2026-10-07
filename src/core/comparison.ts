import type { DateComparison, DateOptions, DateInterval } from '../types';
import { assertValidDate, calendarStamp } from './validation';

/**
 * Retorna a maior (mais recente) de duas datas.
 *
 * @param {Date} date1 - A primeira data.
 * @param {Date} date2 - A segunda data.
 * @returns {Date} A maior (mais recente) das duas datas fornecidas.
 */
export function getMaxDate(date1: Date, date2: Date): Date {
  return date1 > date2 ? date1 : date2;
}

/**
 * Retorna a menor (mais antiga) de duas datas.
 *
 * @param {Date} date1 - A primeira data.
 * @param {Date} date2 - A segunda data.
 * @returns {Date} A menor (mais antiga) das duas datas fornecidas.
 */
export function getMinDate(date1: Date, date2: Date): Date {
  return date1 < date2 ? date1 : date2;
}

export function compareDates(date1: Date, date2: Date): DateComparison {
  assertValidDate(date1);
  assertValidDate(date2);
  const difference = date1.getTime() - date2.getTime();
  return difference < 0 ? -1 : difference > 0 ? 1 : 0;
}

export function isBefore(date1: Date, date2: Date): boolean {
  return compareDates(date1, date2) === -1;
}
export function isAfter(date1: Date, date2: Date): boolean {
  return compareDates(date1, date2) === 1;
}
export function isEqual(date1: Date, date2: Date): boolean {
  return compareDates(date1, date2) === 0;
}

export function isSameDay(
  date1: Date,
  date2: Date,
  options: DateOptions = {},
): boolean {
  return calendarStamp(date1, options) === calendarStamp(date2, options);
}

export function isWithinInterval(date: Date, interval: DateInterval): boolean {
  assertValidDate(date);
  assertValidDate(interval.start);
  assertValidDate(interval.end);
  if (interval.start.getTime() > interval.end.getTime())
    throw new RangeError('Interval start must not follow end');
  return (
    date.getTime() >= interval.start.getTime() &&
    date.getTime() <= interval.end.getTime()
  );
}
