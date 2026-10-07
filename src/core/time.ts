import type { TimeUnit, DateOptions } from '../types';
import {
  assertFinite,
  assertValidDate,
  calendarStamp,
  timeUnitMilliseconds,
  MILLISECONDS_PER_DAY,
} from './validation';

/**
 * Retorna horario do Epoch
 * @returns {number} Epoch time
 */
export function getEpochTime() {
  return new Date().getTime();
}

/**
 * Converte um valor de epoch em um objeto Date.
 *
 * @param {number} epochTime - O valor de epoch a ser convertido.
 * @returns {Date} Um objeto Date correspondente ao valor de epoch fornecido.
 */
export function epochToDate(epochTime: number): Date {
  return new Date(epochTime);
}

/**
 * Converte um objeto Date em um valor de epoch.
 *
 * @param {Date} date - O objeto Date a ser convertido.
 * @returns {number} O valor de epoch correspondente ao objeto Date fornecido.
 */
export function dateToEpoch(date: Date): number {
  return date.getTime();
}

/**
 * Calcula a diferença de tempo em dias entre dois valores de epoch.
 *
 * @param {number} epoch1 - O primeiro valor de epoch.
 * @param {number} epoch2 - O segundo valor de epoch.
 * @returns {number} A diferença de tempo em dias entre os dois valores de epoch.
 */
export function getDaysDifferenceBetweenEpochs(
  epoch1: number,
  epoch2: number,
): number {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysDifference = Math.abs(epoch1 - epoch2) / millisecondsPerDay;
  return Math.round(daysDifference);
}

/**
 * Calcula a diferença de tempo em milissegundos entre duas datas.
 *
 * @param {Date} date1 - A primeira data.
 * @param {Date} date2 - A segunda data.
 * @returns {number} A diferença de tempo em milissegundos entre as duas datas.
 */
export function getTimeDifference(date1: Date, date2: Date): number {
  return Math.abs(date1.getTime() - date2.getTime());
}

/** Signed elapsed difference: date2 minus date1, without rounding. */
export function difference(
  date1: Date,
  date2: Date,
  unit: TimeUnit = 'millisecond',
): number {
  assertValidDate(date1);
  assertValidDate(date2);
  return (date2.getTime() - date1.getTime()) / timeUnitMilliseconds(unit);
}

/** Signed calendar-day difference, ignoring time of day and DST length. */
export function getCalendarDaysDifference(
  date1: Date,
  date2: Date,
  options: DateOptions = {},
): number {
  return Math.round(
    (calendarStamp(date2, options) - calendarStamp(date1, options)) /
      MILLISECONDS_PER_DAY,
  );
}

export function fromUnix(seconds: number): Date {
  assertFinite(seconds);
  const result = new Date(seconds * 1000);
  assertValidDate(result);
  return result;
}

export function toUnix(date: Date): number {
  assertValidDate(date);
  return Math.floor(date.getTime() / 1000);
}
