import Laima from '../laima';
import { runExtendedCommand } from './commands';
import { help } from './help';
import { parseDate, parseNumber } from './parsers';

/** Run without exiting the host process; errors go to stderr, data goes to stdout. */
export function runCli(
  args: string[],
  stdout: (value: string) => void,
  stderr: (value: string) => void,
  version: string,
): number {
  const laima = new Laima();
  const [command, ...values] = args;
  try {
    switch (command) {
      case undefined:
      case '--help':
      case '-h':
        if (values.length) throw new Error('Help does not accept arguments');
        stdout(help);
        break;
      case '--version':
      case '-v':
        if (values.length) throw new Error('Version does not accept arguments');
        stdout(version);
        break;
      case 'now':
        if (values.length) throw new Error('Usage: laima now');
        stdout(String(laima.getEpochTime()));
        break;
      case 'epoch':
        if (values.length !== 1) throw new Error('Usage: laima epoch <date>');
        stdout(String(laima.dateToEpoch(parseDate(values[0], laima))));
        break;
      case 'date':
        if (values.length !== 1) throw new Error('Usage: laima date <epoch>');
        stdout(laima.epochToDate(parseNumber(values[0])).toISOString());
        break;
      case 'format': {
        const utc = values[values.length - 1] === '--utc';
        const positional = utc ? values.slice(0, -1) : values;
        if (
          positional.length < 1 ||
          positional.length > 2 ||
          positional.some((value) => value.startsWith('--'))
        ) {
          throw new Error('Usage: laima format <date> [pattern] [--utc]');
        }
        stdout(
          laima.formatDate(parseDate(positional[0], laima), positional[1], {
            utc,
          }),
        );
        break;
      }
      case 'add-days': {
        if (values.length !== 2)
          throw new Error('Usage: laima add-days <date> <days>');
        const days = parseNumber(values[1]);
        if (!Number.isSafeInteger(days))
          throw new RangeError('Days must be a safe integer');
        stdout(laima.addDays(parseDate(values[0], laima), days).toISOString());
        break;
      }
      case 'diff':
        if (values.length !== 2)
          throw new Error('Usage: laima diff <date1> <date2>');
        stdout(
          String(
            laima.getDaysDifference(
              parseDate(values[0], laima),
              parseDate(values[1], laima),
            ),
          ),
        );
        break;
      default:
        if (!runExtendedCommand(command, values, laima, stdout)) {
          throw new Error(`Unknown command: ${command}. Run laima --help`);
        }
    }
    return 0;
  } catch (error) {
    stderr(`laima: ${(error as Error).message}`);
    return 1;
  }
}
