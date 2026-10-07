import * as time from './core/time';
import * as arithmetic from './core/arithmetic';
import * as comparison from './core/comparison';
import * as calendar from './core/calendar';
import * as formatting from './core/formatting';
import * as parsing from './core/parsing';
import * as validation from './core/validation';
import * as duration from './core/duration';
import type {
  FormatDateOptions,
  DateOptions,
  DateUnit,
  TimeUnit,
  BoundaryUnit,
  WeekOptions,
  DateComparison,
  DateInterval,
  ISOWeekInfo,
  DurationParts,
  DateInfo,
  ZonedFormatOptions,
} from './types';
export type {
  FormatDateOptions,
  DateOptions,
  DateUnit,
  TimeUnit,
  CalendarUnit,
  BoundaryUnit,
  Weekday,
  WeekOptions,
  DateComparison,
  DateInterval,
  ISOWeekInfo,
  ISOWeekday,
  DurationParts,
  DateInfo,
  ZonedFormatOptions,
} from './types';

/** Public facade: retain existing imports, signatures and legacy behavior. */
export default class laima {
  /**
   * Return the current Unix timestamp in milliseconds.
   *
   * @returns The current epoch time in milliseconds.
   */
  getEpochTime() {
    return time.getEpochTime();
  }

  /**
   * Convert a Unix timestamp in milliseconds to a Date.
   *
   * @param epochTime - The Unix timestamp in milliseconds.
   * @returns A new Date corresponding to the supplied timestamp.
   */
  epochToDate(epochTime: number): Date {
    return time.epochToDate(epochTime);
  }

  /**
   * Convert a Date to a Unix timestamp in milliseconds.
   *
   * @param date - The Date to convert.
   * @returns The timestamp returned by date.getTime().
   */
  dateToEpoch(date: Date): number {
    return time.dateToEpoch(date);
  }

  /**
   * Calculate the absolute difference between two timestamps in rounded 24-hour days.
   *
   * @param epoch1 - The first Unix timestamp in milliseconds.
   * @param epoch2 - The second Unix timestamp in milliseconds.
   * @returns The absolute day difference, rounded with Math.round.
   */
  getDaysDifferenceBetweenEpochs(epoch1: number, epoch2: number): number {
    return time.getDaysDifferenceBetweenEpochs(epoch1, epoch2);
  }

  /**
   * Calculate the absolute difference between two dates in rounded 24-hour days.
   *
   * @param date1 - The first date.
   * @param date2 - The second date.
   * @returns The absolute rounded day difference.
   */
  getDaysDifference(date1: Date, date2: Date): number {
    const epoch1 = date1.getTime();
    const epoch2 = date2.getTime();
    return this.getDaysDifferenceBetweenEpochs(epoch1, epoch2);
  }

  /**
   * Calculate the absolute time difference between two dates.
   *
   * @param date1 - The first date.
   * @param date2 - The second date.
   * @returns The absolute difference in milliseconds.
   */
  getTimeDifference(date1: Date, date2: Date): number {
    return time.getTimeDifference(date1, date2);
  }

  /**
   * Format a date as YYYY-MM-DD in the local timezone.
   *
   * @param date - The date to format.
   * @returns The formatted database date string.
   */
  formatDateForDB(date: Date): string {
    return formatting.formatDateForDB(date);
  }

  /**
   * Parse a legacy DD-MM-YYYY date in the local timezone using native Date normalization.
   *
   * @param dateString - The legacy DD-MM-YYYY date string.
   * @returns A Date with the existing permissive parsing behavior.
   */
  parseDateFromDB(dateString: string): Date {
    return parsing.parseDateFromDB(dateString);
  }

  /**
   * Add local calendar days to a date, preserving its time of day.
   *
   * @param date - The base date; it is not mutated.
   * @param days - The number of days to add; negative values subtract days.
   * @returns A new Date with the calendar days added.
   */
  addDays(date: Date, days: number): Date {
    return arithmetic.addDays(date, days);
  }

  /**
   * Subtract local calendar days from a date, preserving its time of day.
   *
   * @param date - The base date; it is not mutated.
   * @param days - The number of days to subtract; negative values add days.
   * @returns A new Date with the calendar days subtracted.
   */
  subDays(date: Date, days: number): Date {
    return arithmetic.subDays(date, days);
  }

  /**
   * Select the later of two dates.
   *
   * @param date1 - The first date.
   * @param date2 - The second date.
   * @returns The original reference to the later date; ties return date2.
   */
  getMaxDate(date1: Date, date2: Date): Date {
    return comparison.getMaxDate(date1, date2);
  }

  /**
   * Select the earlier of two dates.
   *
   * @param date1 - The first date.
   * @param date2 - The second date.
   * @returns The original reference to the earlier date; ties return date2.
   */
  getMinDate(date1: Date, date2: Date): Date {
    return comparison.getMinDate(date1, date2);
  }

  /**
   * Format the current local date and time using the legacy replacement algorithm.
   *
   * Tokens: YYYY YY MM M DD D HH H hh h mm m ss s.
   * Use formatDate for repeated tokens, literals, UTC and AM/PM.
   *
   * @param formatString - The pattern; defaults to YYYY-MM-DD HH:mm:ss. An empty string also uses the default.
   * @returns The formatted current date and time.
   */
  format(formatString?: string): string {
    return formatting.format(formatString);
  }

  /**
   * Add months using native Date overflow and reset the time to local midnight.
   *
   * @param date - The base date; it is not mutated.
   * @param months - The number of months to add; negative values subtract months.
   * @returns A new Date with the existing month overflow behavior.
   */
  addMonths(date: Date, months: number): Date {
    return arithmetic.addMonths(date, months);
  }

  /**
   * Subtract months using native Date overflow, preserving the time of day.
   *
   * @param date - The base date; it is not mutated.
   * @param months - The number of months to subtract; negative values add months.
   * @returns A new Date with the existing month overflow behavior.
   */
  subMonths(date: Date, months: number): Date {
    return arithmetic.subMonths(date, months);
  }

  /**
   * Format a Date using the environment's locale settings.
   *
   * @param date - The date to format.
   * @returns The string returned by date.toLocaleString().
   */
  formatToLocalString(date: Date): string {
    return formatting.formatToLocalString(date);
  }

  /**
   * Get the start of a date's day in the local timezone.
   *
   * @param date - The original date; it is not mutated.
   * @returns A new Date at local 00:00:00.000.
   */
  getStartOfDay(date: Date): Date {
    return calendar.getStartOfDay(date);
  }

  /**
   * Get the end of a date's day in the local timezone.
   *
   * @param date - The original date; it is not mutated.
   * @returns A new Date at local 23:59:59.999.
   */
  getEndOfDay(date: Date): Date {
    return calendar.getEndOfDay(date);
  }

  /**
   * Check whether a year is a leap year according to the Gregorian calendar.
   *
   * @param year - The year to check.
   * @returns True for a leap year; otherwise false.
   */
  isLeapYear(year: number): boolean {
    return calendar.isLeapYear(year);
  }

  /**
   * Get the number of days in a month using native Date normalization.
   *
   * @param year - The year to use.
   * @param month - The month, with January as 1 and December as 12.
   * @returns The number of days in the specified month.
   */
  getDaysInMonth(year: number, month: number): number {
    return calendar.getDaysInMonth(year, month);
  }

  /**
   * Get the number of days remaining in a date's month, excluding the current day.
   *
   * @param date - The date to use.
   * @returns The total days in the month minus the current day.
   */
  getDaysRemainingInMonth(date: Date): number {
    return calendar.getDaysRemainingInMonth(date);
  }

  /**
   * Format a supplied date with repeated tokens, bracketed literals and optional UTC.
   *
   * @param date - The date to format; it is not mutated.
   * @param formatString - The pattern; defaults to YYYY-MM-DD HH:mm:ss. An empty string stays empty.
   * @param options - Formatting options; local time is used unless utc is true.
   * @returns The formatted date string.
   * @throws {RangeError} If the supplied Date is invalid.
   */
  formatDate(
    date: Date,
    formatString = 'YYYY-MM-DD HH:mm:ss',
    options: FormatDateOptions = {},
  ): string {
    return formatting.formatDate(date, formatString, options);
  }

  /**
   * Parse a strict YYYY-MM-DD date at local midnight, preserving years 0000–0099.
   *
   * @param value - The YYYY-MM-DD date string.
   * @returns A new Date for the supplied calendar date.
   * @throws {RangeError} If the format or calendar date is invalid.
   */
  parseISODate(value: string): Date {
    return parsing.parseISODate(value);
  }

  /**
   * Check whether a value is a native Date with a finite timestamp.
   * Invalid dates and other values return false without throwing.
   *
   * @param value - The value to validate.
   * @returns True for a valid Date, narrowing the value to Date; otherwise false.
   */
  isValidDate(value: unknown): value is Date {
    return validation.isValidDate(value);
  }

  /**
   * Create an independent copy of a valid Date.
   *
   * @param date - The valid Date to copy.
   * @returns A new Date with the same timestamp as the input.
   * @throws {RangeError} If the date is invalid.
   */
  cloneDate(date: Date): Date {
    return validation.cloneDate(date);
  }

  /**
   * Add time or calendar units without mutating the input.
   * Days and weeks follow calendar fields, including daylight-saving transitions.
   * Months and years clamp to the target month's last valid day and preserve time of day.
   * Milliseconds, seconds, minutes and hours use fixed elapsed time.
   *
   * @param date - The valid base date.
   * @param amount - The amount to add; negative values reverse the direction. Calendar units require safe integers; smaller units allow finite fractions.
   * @param unit - The unit: millisecond, second, minute, hour, day, week, month or year.
   * @param options - Calendar settings; local time is the default. Set utc to true to use UTC fields.
   * @returns A new Date with the requested adjustment; zero returns an independent copy.
   * @throws {RangeError} If the date or amount is invalid, a calendar amount is not a safe integer, the unit is unknown, or the result is outside the Date range.
   */
  add(
    date: Date,
    amount: number,
    unit: DateUnit,
    options: DateOptions = {},
  ): Date {
    return arithmetic.add(date, amount, unit, options);
  }

  /**
   * Subtract time or calendar units without mutating the input.
   * Days and weeks follow calendar fields, including daylight-saving transitions.
   * Months and years clamp to the target month's last valid day and preserve time of day.
   * Milliseconds, seconds, minutes and hours use fixed elapsed time.
   *
   * @param date - The valid base date.
   * @param amount - The amount to subtract; negative values reverse the direction. Calendar units require safe integers; smaller units allow finite fractions.
   * @param unit - The unit: millisecond, second, minute, hour, day, week, month or year.
   * @param options - Calendar settings; local time is the default. Set utc to true to use UTC fields.
   * @returns A new Date with the requested adjustment; zero returns an independent copy.
   * @throws {RangeError} If the date or amount is invalid, a calendar amount is not a safe integer, the unit is unknown, or the result is outside the Date range.
   */
  subtract(
    date: Date,
    amount: number,
    unit: DateUnit,
    options: DateOptions = {},
  ): Date {
    return arithmetic.subtract(date, amount, unit, options);
  }

  /**
   * Add elapsed hours without mutating the input.
   * Each unit is exactly 3600000 milliseconds, regardless of daylight-saving transitions.
   *
   * @param date - The valid base date.
   * @param hours - The finite number of hours to add; fractions and negative values are supported.
   * @returns A new Date representing the adjusted instant.
   * @throws {RangeError} If the date is invalid, the amount is not finite, or the result is outside the Date range.
   */
  addHours(date: Date, hours: number): Date {
    return arithmetic.addHours(date, hours);
  }

  /**
   * Add elapsed minutes without mutating the input.
   * Each unit is exactly 60000 milliseconds, regardless of daylight-saving transitions.
   *
   * @param date - The valid base date.
   * @param minutes - The finite number of minutes to add; fractions and negative values are supported.
   * @returns A new Date representing the adjusted instant.
   * @throws {RangeError} If the date is invalid, the amount is not finite, or the result is outside the Date range.
   */
  addMinutes(date: Date, minutes: number): Date {
    return arithmetic.addMinutes(date, minutes);
  }

  /**
   * Add elapsed seconds without mutating the input.
   * Each unit is exactly 1000 milliseconds, regardless of daylight-saving transitions.
   *
   * @param date - The valid base date.
   * @param seconds - The finite number of seconds to add; fractions and negative values are supported.
   * @returns A new Date representing the adjusted instant.
   * @throws {RangeError} If the date is invalid, the amount is not finite, or the result is outside the Date range.
   */
  addSeconds(date: Date, seconds: number): Date {
    return arithmetic.addSeconds(date, seconds);
  }

  /**
   * Add whole calendar months while preserving time of day.
   * If the original day does not exist in the target month, use its last valid day.
   * The input is not mutated.
   *
   * @param date - The valid base date.
   * @param months - The safe integer number of months to add; negative values move backward.
   * @param options - Calendar settings; local time is the default. Set utc to true to use UTC fields.
   * @returns A new Date in the target month; zero returns an independent copy.
   * @throws {RangeError} If the date is invalid, months is not a safe integer, or the calculation exceeds the Date range.
   */
  addMonthsClamped(
    date: Date,
    months: number,
    options: DateOptions = {},
  ): Date {
    return arithmetic.addMonthsClamped(date, months, options);
  }

  /**
   * Add whole calendar years while preserving time of day.
   * February 29 becomes February 28 when the target year is not a leap year.
   * The input is not mutated.
   *
   * @param date - The valid base date.
   * @param years - The safe integer number of years to add; negative values move backward.
   * @param options - Calendar settings; local time is the default. Set utc to true to use UTC fields.
   * @returns A new Date in the target year; zero returns an independent copy.
   * @throws {RangeError} If the date is invalid, years or its equivalent month count is not a safe integer, or the calculation exceeds the Date range.
   */
  addYears(date: Date, years: number, options: DateOptions = {}): Date {
    return arithmetic.addYears(date, years, options);
  }

  /**
   * Add Monday-to-Friday calendar days, excluding the starting day.
   * Weekends are skipped; public holidays are not considered.
   * Preserve time of day without mutating the input.
   *
   * @param date - The valid base date.
   * @param days - The safe integer business-day count; negative values move backward.
   * @param options - Calendar settings; local time is the default. Set utc to true to use UTC fields.
   * @returns A new adjusted Date; zero returns an independent copy, including on weekends.
   * @throws {RangeError} If the date is invalid, days is not a safe integer, or the result exceeds the Date range.
   */
  addBusinessDays(date: Date, days: number, options: DateOptions = {}): Date {
    return arithmetic.addBusinessDays(date, days, options);
  }

  /**
   * Get the start of the calendar or time period containing a date.
   * The input is not mutated.
   *
   * @param date - The valid date within the period.
   * @param unit - The boundary unit: second, minute, hour, day, week, month or year.
   * @param options - Use utc for UTC fields. Weeks start on Monday by default; weekStartsOn accepts 0 (Sunday) through 6 (Saturday) and applies only to weeks.
   * @returns A new Date at the start of the requested period.
   * @throws {RangeError} If the date or unit is invalid, a week boundary has an invalid weekStartsOn, or the calculation exceeds the Date range.
   */
  startOf(date: Date, unit: BoundaryUnit, options: WeekOptions = {}): Date {
    return calendar.startOf(date, unit, options);
  }

  /**
   * Get the last millisecond of the calendar or time period containing a date.
   * Calendar periods account for daylight-saving changes in local time.
   * The input is not mutated.
   *
   * @param date - The valid date within the period.
   * @param unit - The boundary unit: second, minute, hour, day, week, month or year.
   * @param options - Use utc for UTC fields. Weeks start on Monday by default; weekStartsOn accepts 0 (Sunday) through 6 (Saturday) and applies only to weeks.
   * @returns A new Date at the inclusive end of the requested period.
   * @throws {RangeError} If the date or unit is invalid, a week boundary has an invalid weekStartsOn, or the calculation exceeds the Date range.
   */
  endOf(date: Date, unit: BoundaryUnit, options: WeekOptions = {}): Date {
    return calendar.endOf(date, unit, options);
  }

  /**
   * Compare two dates by their timestamps.
   *
   * @param date1 - The first valid date.
   * @param date2 - The second valid date.
   * @returns -1 if date1 is earlier, 1 if date1 is later, or 0 if both represent the same instant.
   * @throws {RangeError} If either date is invalid.
   */
  compareDates(date1: Date, date2: Date): DateComparison {
    return comparison.compareDates(date1, date2);
  }

  /**
   * Check whether the first date is strictly earlier than the second.
   *
   * @param date1 - The first valid date.
   * @param date2 - The second valid date.
   * @returns True if date1 is earlier than date2; equal timestamps return false.
   * @throws {RangeError} If either date is invalid.
   */
  isBefore(date1: Date, date2: Date): boolean {
    return comparison.isBefore(date1, date2);
  }

  /**
   * Check whether the first date is strictly later than the second.
   *
   * @param date1 - The first valid date.
   * @param date2 - The second valid date.
   * @returns True if date1 is later than date2; equal timestamps return false.
   * @throws {RangeError} If either date is invalid.
   */
  isAfter(date1: Date, date2: Date): boolean {
    return comparison.isAfter(date1, date2);
  }

  /**
   * Check whether two dates represent the same instant.
   *
   * @param date1 - The first valid date.
   * @param date2 - The second valid date.
   * @returns True if the timestamps are equal, even when the Date references differ.
   * @throws {RangeError} If either date is invalid.
   */
  isEqual(date1: Date, date2: Date): boolean {
    return comparison.isEqual(date1, date2);
  }

  /**
   * Compare calendar year, month and day, ignoring time of day.
   *
   * @param date1 - The first valid date.
   * @param date2 - The second valid date.
   * @param options - Calendar settings; local time is the default. Set utc to true to use UTC fields.
   * @returns True if both dates fall on the same calendar day in the selected time basis.
   * @throws {RangeError} If either date is invalid or calendar normalization exceeds the Date range.
   */
  isSameDay(date1: Date, date2: Date, options: DateOptions = {}): boolean {
    return comparison.isSameDay(date1, date2, options);
  }

  /**
   * Check whether a date falls within an interval, including both endpoints.
   *
   * @param date - The valid date to check.
   * @param interval - The valid start and end dates; start must be earlier than or equal to end.
   * @returns True if the timestamp lies between start and end, inclusive; otherwise false.
   * @throws {RangeError} If the date or either endpoint is invalid, or start is later than end.
   */
  isWithinInterval(date: Date, interval: DateInterval): boolean {
    return comparison.isWithinInterval(date, interval);
  }

  /**
   * Calculate the signed elapsed difference as date2 minus date1.
   * A day is exactly 24 hours and a week is exactly seven days.
   * The result is not rounded; months and years are not supported.
   *
   * @param date1 - The first valid date.
   * @param date2 - The second valid date.
   * @param unit - The elapsed unit: millisecond (default), second, minute, hour, day or week.
   * @returns The elapsed difference in the requested unit, possibly fractional; positive when date2 is later.
   * @throws {RangeError} If either date is invalid or the unit is unknown.
   */
  difference(date1: Date, date2: Date, unit: TimeUnit = 'millisecond'): number {
    return time.difference(date1, date2, unit);
  }

  /**
   * Calculate the signed calendar-day difference as date2 minus date1.
   * Ignore time of day and daylight-saving changes in day length.
   *
   * @param date1 - The first valid date.
   * @param date2 - The second valid date.
   * @param options - Calendar settings; local time is the default. Set utc to true to use UTC fields.
   * @returns An integer day count; positive when the calendar date of date2 is later.
   * @throws {RangeError} If either date is invalid or calendar normalization exceeds the Date range.
   */
  getCalendarDaysDifference(
    date1: Date,
    date2: Date,
    options: DateOptions = {},
  ): number {
    return time.getCalendarDaysDifference(date1, date2, options);
  }

  /**
   * Get the one-based position of a date within its calendar year.
   *
   * @param date - The valid date to inspect.
   * @param options - Calendar settings; local time is the default. Set utc to true to use UTC fields.
   * @returns The day number from 1 to 365, or 366 in a leap year.
   * @throws {RangeError} If the date is invalid or the calendar calculation exceeds the Date range.
   */
  getDayOfYear(date: Date, options: DateOptions = {}): number {
    return calendar.getDayOfYear(date, options);
  }

  /**
   * Get ISO week metadata for the selected calendar date.
   * ISO weeks start on Monday, and week 1 contains January 4.
   * The ISO week-numbering year can differ from the calendar year.
   *
   * @param date - The valid date to inspect.
   * @param options - Calendar settings; local time is the default. Set utc to true to use UTC fields.
   * @returns The ISO year, week number (1 to 53), and weekday (Monday = 1, Sunday = 7).
   * @throws {RangeError} If the date is invalid or the ISO week calculation exceeds the Date range.
   */
  getISOWeek(date: Date, options: DateOptions = {}): ISOWeekInfo {
    return calendar.getISOWeek(date, options);
  }

  /**
   * Check whether the calendar date falls on Saturday or Sunday.
   *
   * @param date - The valid date to inspect.
   * @param options - Calendar settings; local time is the default. Set utc to true to use UTC fields.
   * @returns True for Saturday or Sunday; otherwise false.
   * @throws {RangeError} If the date is invalid.
   */
  isWeekend(date: Date, options: DateOptions = {}): boolean {
    return calendar.isWeekend(date, options);
  }

  /**
   * Calculate completed calendar years, ignoring time of day.
   * February 29 birthdays use February 28 as their anniversary in non-leap years.
   *
   * @param birthDate - The valid birth date; its calendar date must not be after the reference date.
   * @param referenceDate - The valid date at which to calculate age; defaults to the current date.
   * @param options - Calendar settings; local time is the default. Set utc to true to use UTC fields.
   * @returns The nonnegative number of completed calendar years.
   * @throws {RangeError} If either date is invalid, the birth date is in the future, or the calculation exceeds the Date range.
   */
  getAge(
    birthDate: Date,
    referenceDate: Date = new Date(),
    options: DateOptions = {},
  ): number {
    return calendar.getAge(birthDate, referenceDate, options);
  }

  /**
   * Collect calendar metadata and timestamps for a valid date.
   * Calendar fields follow the selected local or UTC basis; timestamps always describe the same instant.
   *
   * @param date - The valid date to inspect.
   * @param options - Calendar settings; local time is the default. Set utc to true to use UTC fields.
   * @returns A DateInfo object with year, month (1 to 12), day, weekday (Sunday = 0), dayOfYear, daysInMonth, leapYear, weekend, isoWeek, epochMilliseconds and unixSeconds.
   * @throws {RangeError} If the date is invalid or a calendar calculation exceeds the Date range.
   */
  getDateInfo(date: Date, options: DateOptions = {}): DateInfo {
    return calendar.getDateInfo(date, options);
  }

  /**
   * Create a Date from seconds since the Unix epoch (1970-01-01T00:00:00Z).
   * Fractional seconds are converted to milliseconds using native Date truncation.
   *
   * @param seconds - The finite Unix timestamp in seconds; negative values represent instants before 1970.
   * @returns A new Date representing the supplied timestamp.
   * @throws {RangeError} If seconds is not finite or the timestamp exceeds the Date range.
   */
  fromUnix(seconds: number): Date {
    return time.fromUnix(seconds);
  }

  /**
   * Convert a date to whole seconds since the Unix epoch.
   * Round down toward negative infinity, including timestamps before 1970.
   *
   * @param date - The valid date to convert.
   * @returns The Unix timestamp in seconds, calculated as Math.floor(date.getTime() / 1000).
   * @throws {RangeError} If the date is invalid.
   */
  toUnix(date: Date): number {
    return time.toUnix(date);
  }

  /**
   * Split an elapsed duration into absolute components and a separate sign.
   * A day is exactly 24 hours; calendar months and years are not used.
   *
   * @param milliseconds - The safe integer duration in milliseconds; negative and zero values are supported.
   * @returns A DurationParts object with sign (-1, 0 or 1), days, hours (0 to 23), minutes and seconds (0 to 59), and milliseconds (0 to 999).
   * @throws {RangeError} If milliseconds is not a safe integer, including non-finite or fractional values.
   */
  getDurationParts(milliseconds: number): DurationParts {
    return duration.getDurationParts(milliseconds);
  }

  /**
   * Format an instant in a named time zone with Intl.DateTimeFormat.
   * The date is not mutated. Output depends on the runtime's locale and time-zone data.
   * By default, include numeric year, two-digit month, day, hour, minute and second using a 24-hour clock.
   *
   * @param date - The valid instant to format.
   * @param timeZone - The time-zone identifier, such as America/Sao_Paulo or UTC.
   * @param locale - The locale language tag; defaults to en-US.
   * @param options - Intl formatting options excluding timeZone. When supplied, these replace the default formatting options.
   * @returns The localized date/time string in the requested time zone.
   * @throws {RangeError} If the date is invalid, the time zone is empty or unsupported, or Intl rejects the locale or an option value.
   * @throws {TypeError} If Intl rejects an incompatible combination of formatting options.
   */
  formatInTimeZone(
    date: Date,
    timeZone: string,
    locale = 'en-US',
    options?: ZonedFormatOptions,
  ): string {
    return formatting.formatInTimeZone(date, timeZone, locale, options);
  }
}
