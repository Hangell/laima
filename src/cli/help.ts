export const help = `Laima — date utilities
Usage: laima <command> [arguments]

  now                              Current epoch time in milliseconds
  epoch <date>                     Convert a date to epoch milliseconds
  date <epoch>                     Convert epoch milliseconds to an ISO timestamp
  format <date> [pattern] [--utc]   Format a date (local timezone by default)
  add-days <date> <days>            Add calendar days; output an ISO timestamp
  diff <date1> <date2>              Absolute rounded difference in 24-hour days
  add <date> <amount> <unit>        Add units; months/years clamp [--utc]
  subtract <date> <amount> <unit>   Subtract units [--utc]
  start-of <date> <unit>           Period start [--utc] [--week-start <0-6>]
  end-of <date> <unit>             Period end [--utc] [--week-start <0-6>]
  compare <date1> <date2>          -1 (earlier), 0 (equal), 1 (later)
  diff-time <date1> <date2> [unit]  Signed elapsed difference (date2 - date1)
  calendar-diff <date1> <date2>    Signed calendar-day difference [--utc]
  business-days <date> <days>      Add Monday–Friday days [--utc]; no holidays
  age <birthDate> [referenceDate]  Completed calendar years [--utc]
  iso-week <date>                 ISO week metadata as JSON [--utc]
  day-of-year <date>              One-based day of year [--utc]
  is-weekend <date>               Saturday/Sunday check [--utc]
  info <date>                     Date metadata as JSON [--utc]
  within <date> <start> <end>      Inclusive interval check
  unix <date>                     Unix seconds (rounded down)
  from-unix <seconds>             Unix seconds to an ISO timestamp
  duration <milliseconds>         Signed duration components as JSON
  tz <date> <timeZone> [locale]    Format in an IANA timezone using Intl
  --help, -h                       Show help
  --version, -v                    Show version

Dates: YYYY-MM-DD (local midnight) or ISO timestamp with Z / ±HH:mm.
Units: millisecond, second, minute, hour, day, week, month, year.
Calendar units require integer amounts; smaller units accept fractions.
--utc changes calendar operations, not how date-only inputs are parsed.
Patterns: YYYY YY MM M DD D HH H hh h mm m ss s a A; [text] for literals.
Example: laima format 2026-10-06T12:00:00Z "DD/MM/YYYY HH:mm" --utc`;
