import Laima from '../laima';
import {
  parseDate,
  parseNumber,
  parseCalendarArguments,
  parseDateUnit,
  parseTimeUnit,
  parseBoundaryUnit,
} from './parsers';

/** Dispatch additive commands; return false if this module does not handle the command. */
export function runExtendedCommand(
  command: string,
  values: string[],
  laima: Laima,
  stdout: (value: string) => void,
): boolean {
  switch (command) {
    case 'add':
    case 'subtract': {
      const { positional: args, options } = parseCalendarArguments(values);
      if (args.length !== 3)
        throw new Error(
          `Usage: laima ${command} <date> <amount> <unit> [--utc]`,
        );
      const date = parseDate(args[0], laima);
      const amount = parseNumber(args[1]);
      const unit = parseDateUnit(args[2]);
      stdout(
        (command === 'add'
          ? laima.add(date, amount, unit, options)
          : laima.subtract(date, amount, unit, options)
        ).toISOString(),
      );
      break;
    }
    case 'start-of':
    case 'end-of': {
      const { positional: args, options } = parseCalendarArguments(
        values,
        true,
      );
      if (args.length !== 2)
        throw new Error(
          `Usage: laima ${command} <date> <unit> [--utc] [--week-start <0-6>]`,
        );
      const date = parseDate(args[0], laima);
      const unit = parseBoundaryUnit(args[1]);
      stdout(
        (command === 'start-of'
          ? laima.startOf(date, unit, options)
          : laima.endOf(date, unit, options)
        ).toISOString(),
      );
      break;
    }
    case 'compare':
      if (values.length !== 2)
        throw new Error('Usage: laima compare <date1> <date2>');
      stdout(
        String(
          laima.compareDates(
            parseDate(values[0], laima),
            parseDate(values[1], laima),
          ),
        ),
      );
      break;
    case 'diff-time':
      if (values.length < 2 || values.length > 3)
        throw new Error('Usage: laima diff-time <date1> <date2> [unit]');
      stdout(
        String(
          laima.difference(
            parseDate(values[0], laima),
            parseDate(values[1], laima),
            parseTimeUnit(values[2] ?? 'millisecond'),
          ),
        ),
      );
      break;
    case 'calendar-diff': {
      const { positional: args, options } = parseCalendarArguments(values);
      if (args.length !== 2)
        throw new Error('Usage: laima calendar-diff <date1> <date2> [--utc]');
      stdout(
        String(
          laima.getCalendarDaysDifference(
            parseDate(args[0], laima),
            parseDate(args[1], laima),
            options,
          ),
        ),
      );
      break;
    }
    case 'business-days': {
      const { positional: args, options } = parseCalendarArguments(values);
      if (args.length !== 2)
        throw new Error('Usage: laima business-days <date> <days> [--utc]');
      stdout(
        laima
          .addBusinessDays(
            parseDate(args[0], laima),
            parseNumber(args[1]),
            options,
          )
          .toISOString(),
      );
      break;
    }
    case 'age': {
      const { positional: args, options } = parseCalendarArguments(values);
      if (args.length < 1 || args.length > 2)
        throw new Error('Usage: laima age <birthDate> [referenceDate] [--utc]');
      stdout(
        String(
          laima.getAge(
            parseDate(args[0], laima),
            args[1] === undefined ? undefined : parseDate(args[1], laima),
            options,
          ),
        ),
      );
      break;
    }
    case 'iso-week':
    case 'day-of-year':
    case 'is-weekend':
    case 'info': {
      const { positional: args, options } = parseCalendarArguments(values);
      if (args.length !== 1)
        throw new Error(`Usage: laima ${command} <date> [--utc]`);
      const date = parseDate(args[0], laima);
      switch (command) {
        case 'iso-week':
          stdout(JSON.stringify(laima.getISOWeek(date, options)));
          break;
        case 'day-of-year':
          stdout(String(laima.getDayOfYear(date, options)));
          break;
        case 'is-weekend':
          stdout(String(laima.isWeekend(date, options)));
          break;
        case 'info':
          stdout(JSON.stringify(laima.getDateInfo(date, options)));
          break;
      }
      break;
    }
    case 'within':
      if (values.length !== 3)
        throw new Error('Usage: laima within <date> <start> <end>');
      stdout(
        String(
          laima.isWithinInterval(parseDate(values[0], laima), {
            start: parseDate(values[1], laima),
            end: parseDate(values[2], laima),
          }),
        ),
      );
      break;
    case 'unix':
      if (values.length !== 1) throw new Error('Usage: laima unix <date>');
      stdout(String(laima.toUnix(parseDate(values[0], laima))));
      break;
    case 'from-unix':
      if (values.length !== 1)
        throw new Error('Usage: laima from-unix <seconds>');
      stdout(laima.fromUnix(parseNumber(values[0])).toISOString());
      break;
    case 'duration':
      if (values.length !== 1)
        throw new Error('Usage: laima duration <milliseconds>');
      stdout(JSON.stringify(laima.getDurationParts(parseNumber(values[0]))));
      break;
    case 'tz':
      if (values.length < 2 || values.length > 3)
        throw new Error('Usage: laima tz <date> <timeZone> [locale]');
      stdout(
        laima.formatInTimeZone(
          parseDate(values[0], laima),
          values[1],
          values[2],
        ),
      );
      break;
    default:
      return false;
  }
  return true;
}
