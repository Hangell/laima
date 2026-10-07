import type { ZonedFormatOptions } from '../types';
import { assertValidDate } from './validation';

import type { FormatDateOptions } from '../types';

/**
 * Formata uma data no padrão de banco de dados (YYYY-MM-DD).
 *
 * @param {Date} date - A data a ser formatada.
 * @returns {string} A data formatada no padrão de banco de dados (YYYY-MM-DD).
 */
export function formatDateForDB(date: Date): string {
  const year = date.getFullYear();
  const monthNumber = date.getMonth() + 1;
  const dayNumber = date.getDate();

  const month = monthNumber < 10 ? `0${monthNumber}` : monthNumber.toString();
  const day = dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();

  return `${year}-${month}-${day}`;
}

/**
 * Formata a data/hora atual no fuso local.
 * @param formatString Padrão: YYYY-MM-DD HH:mm:ss.
 * Tokens: YYYY YY MM M DD D HH H hh h mm m ss s.
 * Mantém as substituições legadas; use formatDate para tokens repetidos, literais, UTC e am/pm.
 * @returns Data/hora atual formatada.
 */
export function format(formatString?: string): string {
  const date = new Date();
  const year = date.getFullYear();
  const monthNumber = date.getMonth() + 1;
  const dayNumber = date.getDate();
  const hoursNumber = date.getHours();
  const minutesNumber = date.getMinutes();
  const secondsNumber = date.getSeconds();

  const month = monthNumber < 10 ? `0${monthNumber}` : monthNumber.toString();
  const day = dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();
  const hours = hoursNumber < 10 ? `0${hoursNumber}` : hoursNumber.toString();
  const minutes =
    minutesNumber < 10 ? `0${minutesNumber}` : minutesNumber.toString();
  const seconds =
    secondsNumber < 10 ? `0${secondsNumber}` : secondsNumber.toString();

  const replacements: Record<string, string> = {
    YYYY: year.toString(),
    YY: year.toString().slice(-2),
    MM: month,
    M: monthNumber.toString(),
    DD: day,
    D: dayNumber.toString(),
    HH: hours,
    H: hoursNumber.toString(),
    hh: (hoursNumber % 12 || 12).toString().padStart(2, '0'),
    h: (hoursNumber % 12 || 12).toString(),
    mm: minutes,
    m: minutesNumber.toString(),
    ss: seconds,
    s: secondsNumber.toString(),
  };

  let formattedDate = formatString || 'YYYY-MM-DD HH:mm:ss';

  for (const replacement in replacements) {
    formattedDate = formattedDate.replace(
      replacement,
      replacements[replacement],
    );
  }

  return formattedDate;
}

/**
 * Formata um objeto Date para uma string no formato local.
 *
 * @param {Date} date - O objeto Date a ser formatado.
 * @returns {string} A data formatada no formato local.
 */
export function formatToLocalString(date: Date): string {
  return date.toLocaleString();
}

/** Format a supplied date; repeated tokens, [literal text] and UTC are supported. */
export function formatDate(
  date: Date,
  formatString = 'YYYY-MM-DD HH:mm:ss',
  options: FormatDateOptions = {},
): string {
  if (Number.isNaN(date.getTime())) throw new RangeError('Invalid date');
  const utc = options.utc === true;
  const year = utc ? date.getUTCFullYear() : date.getFullYear();
  const month = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
  const day = utc ? date.getUTCDate() : date.getDate();
  const hour = utc ? date.getUTCHours() : date.getHours();
  const minute = utc ? date.getUTCMinutes() : date.getMinutes();
  const second = utc ? date.getUTCSeconds() : date.getSeconds();
  const pad = (value: number): string => value.toString().padStart(2, '0');
  const tokens: Record<string, string> = {
    YYYY: year.toString(),
    YY: year.toString().slice(-2),
    MM: pad(month),
    M: month.toString(),
    DD: pad(day),
    D: day.toString(),
    HH: pad(hour),
    H: hour.toString(),
    hh: pad(hour % 12 || 12),
    h: (hour % 12 || 12).toString(),
    mm: pad(minute),
    m: minute.toString(),
    ss: pad(second),
    s: second.toString(),
    a: hour < 12 ? 'am' : 'pm',
    A: hour < 12 ? 'AM' : 'PM',
  };
  return formatString.replace(
    /\[[^\]]*\]|YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|a|A/g,
    (token) => (token.startsWith('[') ? token.slice(1, -1) : tokens[token]),
  );
}

/** Format the same instant in a named timezone using the runtime's Intl data. */
export function formatInTimeZone(
  date: Date,
  timeZone: string,
  locale = 'en-US',
  options: ZonedFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  },
): string {
  assertValidDate(date);
  if (typeof timeZone !== 'string' || timeZone.trim() === '')
    throw new RangeError('Expected a timezone');
  return new Intl.DateTimeFormat(locale, { ...options, timeZone }).format(date);
}
