/** Options for operations using either local calendar fields or UTC. */
export interface FormatDateOptions {
  /** Use UTC instead of the local timezone. Defaults to false. */
  utc?: boolean;
}

export type DateOptions = FormatDateOptions;

/** Fixed elapsed-time units; a day is exactly 24 hours. */
export type TimeUnit =
  'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week';
export type CalendarUnit = 'day' | 'week' | 'month' | 'year';
export type DateUnit = TimeUnit | CalendarUnit;
export type BoundaryUnit = Exclude<DateUnit, 'millisecond'>;
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type DateComparison = -1 | 0 | 1;
export type ISOWeekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface WeekOptions extends DateOptions {
  /** First weekday: Sunday = 0, Monday = 1. Defaults to Monday. */
  weekStartsOn?: Weekday;
}

/** Both interval endpoints are inclusive and start must not follow end. */
export interface DateInterval {
  start: Date;
  end: Date;
}

export interface ISOWeekInfo {
  /** ISO week-numbering year, which may differ from the calendar year. */
  year: number;
  week: number;
  /** Monday = 1, Sunday = 7. */
  weekday: ISOWeekday;
}

/** Absolute whole-millisecond components, with the sign stored separately. */
export interface DurationParts {
  sign: DateComparison;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface DateInfo {
  year: number;
  /** January = 1. */
  month: number;
  day: number;
  /** Sunday = 0. */
  weekday: Weekday;
  dayOfYear: number;
  daysInMonth: number;
  leapYear: boolean;
  weekend: boolean;
  isoWeek: ISOWeekInfo;
  epochMilliseconds: number;
  unixSeconds: number;
}

/** The timezone is provided separately and cannot be overridden here. */
export type ZonedFormatOptions = Omit<Intl.DateTimeFormatOptions, 'timeZone'>;
