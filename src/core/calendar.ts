import type {
  BoundaryUnit,
  DateOptions,
  WeekOptions,
  ISOWeekInfo,
  ISOWeekday,
  DateInfo,
} from '../types';
import {
  cloneDate,
  assertInteger,
  assertValidDate,
  calendarFields,
  calendarDate,
  calendarStamp,
  MILLISECONDS_PER_DAY,
} from './validation';
import { add, addYears } from './arithmetic';
import { toUnix } from './time';

/**
 * Retorna um novo objeto Date representando o início do dia (meia-noite) da data fornecida.
 *
 * @param {Date} date - A data original.
 * @returns {Date} Um novo objeto Date representando a meia-noite do dia da data fornecida.
 */
export function getStartOfDay(date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

/**
 * Retorna um novo objeto Date representando o final do dia (23:59:59.999) da data fornecida.
 *
 * @param {Date} date - A data original.
 * @returns {Date} Um novo objeto Date representando o final do dia da data fornecida.
 */
export function getEndOfDay(date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
}

/**
 * Determina se um ano é bissexto ou não.
 *
 * @param {number} year - O ano a ser verificado.
 * @returns {boolean} Retorna 'true' se o ano for bissexto e 'false' caso contrário.
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Retorna o número de dias em um mês para um ano específico.
 *
 * @param {number} year - O ano a ser considerado.
 * @param {number} month - O mês a ser considerado (1 para Janeiro, 2 para Fevereiro, etc).
 * @returns {number} O número de dias no mês especificado para o ano fornecido.
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * Retorna o número de dias restantes até o final do mês para uma data específica.
 *
 * @param {Date} date - A data a ser considerada.
 * @returns {number} O número de dias restantes até o final do mês.
 */
export function getDaysRemainingInMonth(date: Date): number {
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return endOfMonth.getDate() - date.getDate();
}

export function startOf(
  date: Date,
  unit: BoundaryUnit,
  options: WeekOptions = {},
): Date {
  const result = cloneDate(date);
  const utc = options.utc === true;
  const { year, day, weekday } = calendarFields(date, options);
  if (unit === 'second')
    result.setTime(result.getTime() - result.getMilliseconds());
  else if (unit === 'minute') {
    result.setTime(
      result.getTime() -
        result[utc ? 'getUTCSeconds' : 'getSeconds']() * 1000 -
        result.getMilliseconds(),
    );
  } else if (unit === 'hour') {
    result.setTime(
      result.getTime() -
        result[utc ? 'getUTCMinutes' : 'getMinutes']() * 60000 -
        result[utc ? 'getUTCSeconds' : 'getSeconds']() * 1000 -
        result.getMilliseconds(),
    );
  } else {
    result[utc ? 'setUTCHours' : 'setHours'](0, 0, 0, 0);
    if (unit === 'week') {
      const firstDay = options.weekStartsOn ?? 1;
      assertInteger(firstDay);
      if (firstDay < 0 || firstDay > 6)
        throw new RangeError('weekStartsOn must be between 0 and 6');
      result[utc ? 'setUTCDate' : 'setDate'](
        day - ((weekday - firstDay + 7) % 7),
      );
    } else if (unit === 'month') result[utc ? 'setUTCDate' : 'setDate'](1);
    else if (unit === 'year')
      result[utc ? 'setUTCFullYear' : 'setFullYear'](year, 0, 1);
    else if (unit !== 'day') throw new RangeError('Unknown boundary unit');
  }
  assertValidDate(result);
  return result;
}

export function endOf(
  date: Date,
  unit: BoundaryUnit,
  options: WeekOptions = {},
): Date {
  const first = startOf(date, unit, options);
  const next = add(first, 1, unit, options);
  const result = new Date(next.getTime() - 1);
  assertValidDate(result);
  return result;
}

export function getDayOfYear(date: Date, options: DateOptions = {}): number {
  const { year } = calendarFields(date, options);
  return (
    Math.round(
      (calendarStamp(date, options) - calendarDate(year, 0, 1).getTime()) /
        MILLISECONDS_PER_DAY,
    ) + 1
  );
}

export function getISOWeek(date: Date, options: DateOptions = {}): ISOWeekInfo {
  const thursday = new Date(calendarStamp(date, options));
  const weekday = (thursday.getUTCDay() || 7) as ISOWeekday;
  thursday.setUTCDate(thursday.getUTCDate() + 4 - weekday);
  assertValidDate(thursday);
  const year = thursday.getUTCFullYear();
  const first = calendarDate(year, 0, 1);
  const week = Math.ceil(
    ((thursday.getTime() - first.getTime()) / MILLISECONDS_PER_DAY + 1) / 7,
  );
  return { year, week, weekday };
}

export function isWeekend(date: Date, options: DateOptions = {}): boolean {
  const { weekday } = calendarFields(date, options);
  return weekday === 0 || weekday === 6;
}

/** February 29 anniversaries fall on February 28 in non-leap years. */
export function getAge(
  birthDate: Date,
  referenceDate = new Date(),
  options: DateOptions = {},
): number {
  const birth = calendarFields(birthDate, options);
  const reference = calendarFields(referenceDate, options);
  const referenceStamp = calendarStamp(referenceDate, options);
  if (calendarStamp(birthDate, options) > referenceStamp)
    throw new RangeError('Birth date is in the future');
  const years = reference.year - birth.year;
  const anniversary = addYears(birthDate, years, options);
  return years - (calendarStamp(anniversary, options) > referenceStamp ? 1 : 0);
}

export function getDateInfo(date: Date, options: DateOptions = {}): DateInfo {
  const { year, month, day, weekday } = calendarFields(date, options);
  return {
    year,
    month: month + 1,
    day,
    weekday,
    dayOfYear: getDayOfYear(date, options),
    daysInMonth: calendarDate(year, month + 1, 0).getUTCDate(),
    leapYear: isLeapYear(year),
    weekend: isWeekend(date, options),
    isoWeek: getISOWeek(date, options),
    epochMilliseconds: date.getTime(),
    unixSeconds: toUnix(date),
  };
}
