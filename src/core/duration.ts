import type { DurationParts } from '../types';
import { assertInteger, MILLISECONDS_PER_DAY } from './validation';

export function getDurationParts(milliseconds: number): DurationParts {
  assertInteger(milliseconds);
  let remaining = Math.abs(milliseconds);
  const take = (unit: number): number => {
    const value = Math.floor(remaining / unit);
    remaining %= unit;
    return value;
  };
  return {
    sign: milliseconds < 0 ? -1 : milliseconds > 0 ? 1 : 0,
    days: take(MILLISECONDS_PER_DAY),
    hours: take(3600000),
    minutes: take(60000),
    seconds: take(1000),
    milliseconds: remaining,
  };
}
