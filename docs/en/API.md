# API reference

[README](../../README.md) · [Português](../pt/API.md)

All methods are instance methods: `const laima = new Laima()`. Epoch values always use milliseconds. Legacy methods use local time and JavaScript normalization, without new validation that changes their contract.

| Method                                                                          | Behavior                                                                                                |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `getEpochTime(): number`                                                        | Current timestamp in milliseconds.                                                                      |
| `epochToDate(epoch: number): Date`                                              | Creates a Date from Unix milliseconds.                                                                  |
| `dateToEpoch(date: Date): number`                                               | Returns date.getTime().                                                                                 |
| `getDaysDifferenceBetweenEpochs(a: number, b: number): number`                  | Absolute difference / 86,400,000, rounded with Math.round.                                              |
| `getDaysDifference(a: Date, b: Date): number`                                   | Same calculation using Date timestamps.                                                                 |
| `getTimeDifference(a: Date, b: Date): number`                                   | Absolute difference in milliseconds.                                                                    |
| `formatDateForDB(date: Date): string`                                           | YYYY-MM-DD in local time.                                                                               |
| `parseDateFromDB(value: string): Date`                                          | Local DD-MM-YYYY; permissive native normalization, including years 0–99.                                |
| `addDays(date: Date, days: number): Date`                                       | New Date; adds local calendar days, preserving time of day.                                             |
| `subDays(date: Date, days: number): Date`                                       | New Date; subtracts local days. Accepts negative values.                                                |
| `addMonths(date: Date, months: number): Date`                                   | New Date; native overflow, returns local midnight.                                                      |
| `subMonths(date: Date, months: number): Date`                                   | New Date; native overflow, preserves time of day.                                                       |
| `getMaxDate(a: Date, b: Date): Date`                                            | Returns the later Date reference; ties return b.                                                        |
| `getMinDate(a: Date, b: Date): Date`                                            | Returns the earlier Date reference; ties return b.                                                      |
| `format(pattern?: string): string`                                              | Formats the current local time; default YYYY-MM-DD HH:mm:ss. Retains legacy replacement semantics.      |
| `formatToLocalString(date: Date): string`                                       | Delegates to date.toLocaleString(); environment dependent.                                              |
| `getStartOfDay(date: Date): Date`                                               | New Date at local 00:00:00.000.                                                                         |
| `getEndOfDay(date: Date): Date`                                                 | New Date at local 23:59:59.999.                                                                         |
| `isLeapYear(year: number): boolean`                                             | Gregorian rule: divisible by 4, except centuries not divisible by 400.                                  |
| `getDaysInMonth(year: number, month: number): number`                           | Month is 1–12; native normalization outside this range is retained.                                     |
| `getDaysRemainingInMonth(date: Date): number`                                   | Days in the month minus current day; excludes the current day.                                          |
| `formatDate(date: Date, pattern?: string, options?: FormatDateOptions): string` | New: supplied date, repeated tokens, literals and optional UTC. Invalid Date throws RangeError.         |
| `parseISODate(value: string): Date`                                             | New: strict YYYY-MM-DD at local midnight; impossible dates throw RangeError. Preserves years 0000–0099. |

## Extended API

New methods validate inputs and throw `RangeError` for invalid dates, non-finite numbers, unknown units or results outside the Date range. `isValidDate` returns a boolean. Date-returning methods create new objects. Legacy methods retain their contracts.

| Method                                                                                                  | Behavior                                                                                                                         |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `isValidDate(value: unknown): value is Date`                                                            | Type guard; false for non-Date values or invalid dates.                                                                          |
| `cloneDate(date: Date): Date`                                                                           | Validated independent copy.                                                                                                      |
| `add(date: Date, amount: number, unit: DateUnit, options?: DateOptions): Date`                          | Calendar arithmetic for day/week/month/year; elapsed arithmetic for smaller units. Month/year additions clamp and preserve time. |
| `subtract(date: Date, amount: number, unit: DateUnit, options?: DateOptions): Date`                     | Same contracts as add, moving backward for positive amounts.                                                                     |
| `addHours(date: Date, hours: number): Date`                                                             | Elapsed hours; fractions and negatives supported.                                                                                |
| `addMinutes(date: Date, minutes: number): Date`                                                         | Elapsed minutes.                                                                                                                 |
| `addSeconds(date: Date, seconds: number): Date`                                                         | Elapsed seconds.                                                                                                                 |
| `addMonthsClamped(date: Date, months: number, options?: DateOptions): Date`                             | Whole months with clamping, preserving time of day.                                                                              |
| `addYears(date: Date, years: number, options?: DateOptions): Date`                                      | Whole years with clamping, including February 29.                                                                                |
| `addBusinessDays(date: Date, days: number, options?: DateOptions): Date`                                | Monday–Friday only, excluding the starting day; no public holidays. Zero clones; negatives move backward.                        |
| `startOf(date: Date, unit: BoundaryUnit, options?: WeekOptions): Date`                                  | Start of a period; weeks default to Monday.                                                                                      |
| `endOf(date: Date, unit: BoundaryUnit, options?: WeekOptions): Date`                                    | Last millisecond of a period.                                                                                                    |
| `compareDates(a: Date, b: Date): DateComparison`                                                        | -1 if a is earlier, 1 if later, 0 if equal.                                                                                      |
| `isBefore(a: Date, b: Date): boolean`                                                                   | Strictly earlier instant.                                                                                                        |
| `isAfter(a: Date, b: Date): boolean`                                                                    | Strictly later instant.                                                                                                          |
| `isEqual(a: Date, b: Date): boolean`                                                                    | Equal timestamps, regardless of reference identity.                                                                              |
| `isSameDay(a: Date, b: Date, options?: DateOptions): boolean`                                           | Equal calendar date, ignoring time.                                                                                              |
| `isWithinInterval(date: Date, interval: DateInterval): boolean`                                         | Inclusive endpoints; reversed intervals throw RangeError.                                                                        |
| `difference(a: Date, b: Date, unit?: TimeUnit): number`                                                 | Signed elapsed b minus a, without rounding; default millisecond. Days are exactly 24 hours.                                      |
| `getCalendarDaysDifference(a: Date, b: Date, options?: DateOptions): number`                            | Signed calendar days b minus a, ignoring time and DST day length.                                                                |
| `getDayOfYear(date: Date, options?: DateOptions): number`                                               | One-based calendar day (1–365/366).                                                                                              |
| `getISOWeek(date: Date, options?: DateOptions): ISOWeekInfo`                                            | ISO week-numbering year, week and weekday; week 1 contains January 4.                                                            |
| `isWeekend(date: Date, options?: DateOptions): boolean`                                                 | Saturday or Sunday.                                                                                                              |
| `getAge(birthDate: Date, referenceDate?: Date, options?: DateOptions): number`                          | Completed calendar years; reference defaults to now. February 29 birthdays use February 28 in non-leap years.                    |
| `getDateInfo(date: Date, options?: DateOptions): DateInfo`                                              | Calendar metadata, ISO week, milliseconds and seconds.                                                                           |
| `fromUnix(seconds: number): Date`                                                                       | Unix seconds to Date; fractions follow native millisecond truncation.                                                            |
| `toUnix(date: Date): number`                                                                            | Unix seconds rounded down, including negative timestamps.                                                                        |
| `getDurationParts(milliseconds: number): DurationParts`                                                 | Safe integer duration split into absolute components and a separate sign.                                                        |
| `formatInTimeZone(date: Date, timeZone: string, locale?: string, options?: ZonedFormatOptions): string` | Intl formatting in an IANA timezone; default locale en-US.                                                                       |

### Types and contracts

All types are reexported from `laima`:

- `DateUnit`: `millisecond`, `second`, `minute`, `hour`, `day`, `week`, `month`, `year`.
- `TimeUnit`: `millisecond`, `second`, `minute`, `hour`, `day`, `week`.
- `CalendarUnit`: `day`, `week`, `month`, `year`.
- `BoundaryUnit`: `second`, `minute`, `hour`, `day`, `week`, `month`, `year`.
- `DateOptions` / `FormatDateOptions`: `{ utc?: boolean }`.
- `WeekOptions`: `{ utc?: boolean, weekStartsOn?: Weekday }`.
- `Weekday`: `0–6`; `ISOWeekday`: `1–7`; `DateComparison`: `-1`, `0`, `1`.
- `DateInterval`: `{ start: Date, end: Date }`.
- `ISOWeekInfo`: `{ year, week, weekday }`.
- `DurationParts`: `{ sign, days, hours, minutes, seconds, milliseconds }`.
- `DateInfo`: `{ year, month, day, weekday, dayOfYear, daysInMonth, leapYear, weekend, isoWeek, epochMilliseconds, unixSeconds }`.
- `ZonedFormatOptions`: `Intl.DateTimeFormatOptions` without `timeZone`.

For `add`/`subtract`, calendar units require safe integers and use local or UTC fields; smaller units accept fractions. For `difference`, days/weeks are fixed 24-hour/seven-day periods without rounding. `getCalendarDaysDifference` ignores time of day and variable DST day lengths. Weeks default to Monday; `weekStartsOn: 0` selects Sunday. `getAge` ignores time of day, rejects future births and uses February 28 for February 29 anniversaries in non-leap years.

`DateInfo.month` is 1–12; `weekday` uses Sunday = 0; `ISOWeekInfo.weekday` uses Monday = 1, Sunday = 7. The ISO year may differ from the calendar year. Durations use exact 24-hour days and do not represent months/years. `formatInTimeZone` requires runtime Intl support and uses its locale/timezone data.

```ts
import Laima, { DateOptions, DateInfo, DurationParts } from 'laima';

const laima = new Laima();
const options: DateOptions = { utc: true };
const date = new Date('2024-01-31T12:00:00Z');
laima.add(date, 1, 'month', options); // 2024-02-29T12:00:00.000Z
laima.startOf(date, 'week', { ...options, weekStartsOn: 1 });
laima.difference(date, laima.addHours(date, 1.5), 'hour'); // 1.5
const info: DateInfo = laima.getDateInfo(date, options);
const duration: DurationParts = laima.getDurationParts(-1500);
laima.formatInTimeZone(date, 'America/Sao_Paulo', 'pt-BR');
```

## Formatting

Legacy tokens: `YYYY YY MM M DD D HH H hh h mm m ss s`. `format` replaces each token once, in order; repeated tokens may produce incomplete results. The `a` token advertised in old comments was never implemented by this method.

`formatDate` replaces all tokens in one pass and adds `a`/`A` (am/pm and AM/PM). Use `[literal text]` to protect text. `{ utc: true }` uses UTC; omitted options use local time. An empty pattern returns an empty string.

```ts
import Laima, { FormatDateOptions } from 'laima';

const laima = new Laima();
const options: FormatDateOptions = { utc: true };
const date = new Date('2024-02-29T15:04:05Z');
laima.formatDate(date, 'YYYY/YYYY [at] hh:mm A', options);
// "2024/2024 at 03:04 PM"
laima.parseISODate('2024-02-29');
```

## CLI

| Command                                 | Output                                                                         |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| `laima now`                             | Current epoch in ms.                                                           |
| `laima epoch <date>`                    | Timestamp in ms.                                                               |
| `laima date <epoch>`                    | UTC ISO timestamp.                                                             |
| `laima format <date> [pattern] [--utc]` | Formatted date; default YYYY-MM-DD HH:mm:ss. --utc must be the final argument. |
| `laima add-days <date> <days>`          | New UTC ISO timestamp; days must be safe integers.                             |
| `laima diff <date1> <date2>`            | Absolute rounded difference in 24-hour days.                                   |
| `laima --help / -h`                     | Help.                                                                          |
| `laima --version / -v`                  | Package version.                                                               |

### Additional commands

| Command                                                     | Output                                                      |
| ----------------------------------------------------------- | ----------------------------------------------------------- |
| `laima add <date> <amount> <unit> [--utc]`                  | Immutable calendar/elapsed arithmetic; month/year clamping. |
| `laima subtract <date> <amount> <unit> [--utc]`             | Subtract units; output ISO UTC.                             |
| `laima start-of <date> <unit> [--utc] [--week-start <0-6>]` | Period start as ISO UTC.                                    |
| `laima end-of <date> <unit> [--utc] [--week-start <0-6>]`   | Period end as ISO UTC.                                      |
| `laima compare <date1> <date2>`                             | -1, 0 or 1 (first date compared with second).               |
| `laima diff-time <date1> <date2> [unit]`                    | Signed elapsed second minus first; default millisecond.     |
| `laima calendar-diff <date1> <date2> [--utc]`               | Signed calendar-day difference.                             |
| `laima business-days <date> <days> [--utc]`                 | Monday–Friday additions; no public holidays.                |
| `laima age <birthDate> [referenceDate] [--utc]`             | Completed calendar years.                                   |
| `laima iso-week <date> [--utc]`                             | JSON ISOWeekInfo.                                           |
| `laima day-of-year <date> [--utc]`                          | Day of year.                                                |
| `laima is-weekend <date> [--utc]`                           | true or false.                                              |
| `laima info <date> [--utc]`                                 | JSON DateInfo.                                              |
| `laima within <date> <start> <end>`                         | Inclusive interval: true or false.                          |
| `laima unix <date>`                                         | Unix seconds.                                               |
| `laima from-unix <seconds>`                                 | ISO UTC timestamp.                                          |
| `laima duration <milliseconds>`                             | JSON DurationParts.                                         |
| `laima tz <date> <timeZone> [locale]`                       | Localized Intl string in the requested zone.                |

Units follow the types above. `diff-time` excludes months/years; boundaries exclude milliseconds. For calendar operations, `--utc` changes the fields used in calculations; date-only inputs are still parsed at local midnight. Use timestamps with `Z` or an offset for deterministic instants. New calendar commands accept `--utc`, and boundaries also accept `--week-start`; duplicate or unknown options are errors.

```sh
laima add 2024-01-31T12:00:00Z 1 month --utc
laima start-of 2024-06-12T12:00:00Z week --utc --week-start 0
laima business-days 2024-06-14T12:00:00Z 1 --utc
laima info 2024-02-29T12:00:00Z --utc
laima duration -1500
laima tz 2024-01-31T12:00:00Z America/Sao_Paulo pt-BR
```

Inputs: `YYYY-MM-DD` (local) or `YYYY-MM-DDTHH:mm:ss[.SSS]Z` / offset `±HH:mm`. Epoch numbers may be negative and always mean milliseconds. Extra arguments, invalid dates and unknown commands return code 1 with stderr. Success returns code 0 with stdout. There is no interactive prompt or file reading.

To develop before publishing: `npm run build` then `node dist/cli.js --help`.
