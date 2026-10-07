import type { DateOptions, DateUnit } from '../types';
import {
  cloneDate,
  assertFinite,
  assertInteger,
  assertValidDate,
  calendarFields,
  calendarDate,
  timeUnitMilliseconds,
} from './validation';

/**
 * Adiciona um número específico de dias a uma data.
 *
 * @param {Date} date - A data base à qual os dias serão adicionados ou subtraídos.
 * @param {number} days - O número de dias a serem adicionados (positivo) ou subtraídos (negativo) à data base.
 * @returns {Date} Um novo objeto Date com os dias adicionados ou subtraídos.
 */
export function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

/**
 * Subtrai um número específico de dias a uma data.
 *
 * @param {Date} date - A data base à qual os dias serão adicionados ou subtraídos.
 * @param {number} days - O número de dias a serem adicionados (positivo) ou subtraídos (negativo) à data base.
 * @returns {Date} Um novo objeto Date com os dias adicionados ou subtraídos.
 */
export function subDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - days);
  return newDate;
}

/**
 * Adiciona um número específico de meses a uma data.
 *
 * @param {Date} date - A data base à qual os meses serão adicionados.
 * @param {number} months - O número de meses a serem adicionados à data base.
 * @returns {Date} Um novo objeto Date com os meses adicionados.
 */
export function addMonths(date: Date, months: number): Date {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const newDate = new Date(year, month + months, day);
  return newDate;
}

/**
 * Subtrai um número específico de meses de uma data.
 *
 * @param {Date} date - A data base da qual os meses serão subtraídos.
 * @param {number} months - O número de meses a serem subtraídos da data base.
 * @returns {Date} Um novo objeto Date com os meses subtraídos.
 */
export function subMonths(date: Date, months: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() - months);
  return newDate;
}

/** Strict calendar arithmetic keeps inputs immutable and checks overflow. */
export function add(
  date: Date,
  amount: number,
  unit: DateUnit,
  options: DateOptions = {},
): Date {
  const result = cloneDate(date);
  assertFinite(amount);
  const utc = options.utc === true;
  if (unit === 'month' || unit === 'year') {
    assertInteger(amount);
    return addMonthsClamped(
      date,
      unit === 'year' ? amount * 12 : amount,
      options,
    );
  }
  if (unit === 'day' || unit === 'week') {
    assertInteger(amount);
    if (amount === 0) return result;
    const { day } = calendarFields(result, options);
    result[utc ? 'setUTCDate' : 'setDate'](
      day + amount * (unit === 'week' ? 7 : 1),
    );
  } else {
    result.setTime(result.getTime() + amount * timeUnitMilliseconds(unit));
  }
  assertValidDate(result);
  return result;
}

export function subtract(
  date: Date,
  amount: number,
  unit: DateUnit,
  options: DateOptions = {},
): Date {
  assertFinite(amount);
  return add(date, -amount, unit, options);
}

export function addMonthsClamped(
  date: Date,
  months: number,
  options: DateOptions = {},
): Date {
  const result = cloneDate(date);
  assertInteger(months);
  if (months === 0) return result;
  const { year, month, day } = calendarFields(date, options);
  const lastDay = calendarDate(year, month + months + 1, 0);
  const utc = options.utc === true;
  result[utc ? 'setUTCFullYear' : 'setFullYear'](
    lastDay.getUTCFullYear(),
    lastDay.getUTCMonth(),
    Math.min(day, lastDay.getUTCDate()),
  );
  assertValidDate(result);
  return result;
}

export function addYears(
  date: Date,
  years: number,
  options: DateOptions = {},
): Date {
  assertInteger(years);
  return addMonthsClamped(date, years * 12, options);
}

export function addHours(date: Date, hours: number): Date {
  return add(date, hours, 'hour');
}

export function addMinutes(date: Date, minutes: number): Date {
  return add(date, minutes, 'minute');
}

export function addSeconds(date: Date, seconds: number): Date {
  return add(date, seconds, 'second');
}

/** Monday–Friday only; public holidays are not included. */
export function addBusinessDays(
  date: Date,
  days: number,
  options: DateOptions = {},
): Date {
  let result = cloneDate(date);
  assertInteger(days);
  if (days === 0) return result;
  const direction = days < 0 ? -1 : 1;
  let remaining = Math.abs(days);
  const weekend = (value: Date): boolean => {
    const { weekday } = calendarFields(value, options);
    return weekday === 0 || weekday === 6;
  };
  if (weekend(result)) {
    do {
      result = add(result, direction, 'day', options);
    } while (weekend(result));
    remaining--;
  }
  const weeks = Math.floor(remaining / 5);
  result = add(result, weeks * direction, 'week', options);
  remaining %= 5;
  while (remaining > 0) {
    result = add(result, direction, 'day', options);
    if (!weekend(result)) remaining--;
  }
  return result;
}
