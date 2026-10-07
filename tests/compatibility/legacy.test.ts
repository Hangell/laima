import Laima from '../../src/laima';

const laima = new Laima();
afterEach(() => jest.restoreAllMocks());

describe('legacy compatibility', () => {
  it('gets epoch from the clock and supports omitted or empty format', () => {
    jest.useFakeTimers().setSystemTime(new Date(2024, 0, 2, 3, 4, 5));
    try {
      expect(laima.getEpochTime()).toBe(Date.now());
      expect(laima.format()).toBe('2024-01-02 03:04:05');
      expect(laima.format('')).toBe(laima.format());
      expect(laima.format('YYYY YY MM M DD D HH H hh h mm m ss s')).toBe(
        '2024 24 01 1 02 2 03 3 03 3 04 4 05 5',
      );
      // The legacy formatter only replaces each token once, in declaration order.
      expect(laima.format('YYYY/YYYY')).toBe('2024/24YY');
    } finally {
      jest.useRealTimers();
    }
  });
  it('keeps unpadded and padded legacy formatting branches', () => {
    jest.useFakeTimers().setSystemTime(new Date(2024, 10, 23, 15, 46, 57));
    try {
      expect(laima.format()).toBe('2024-11-23 15:46:57');
      jest.setSystemTime(new Date(2024, 0, 1, 0));
      expect(laima.format('hh h')).toBe('12 12');
    } finally {
      jest.useRealTimers();
    }
  });
  it('keeps absolute differences and rounds half a day upward', () => {
    expect(laima.getDaysDifferenceBetweenEpochs(0, 43200000)).toBe(1);
    expect(laima.getDaysDifferenceBetweenEpochs(43199999, 0)).toBe(0);
    expect(laima.getTimeDifference(new Date(100), new Date(0))).toBe(100);
    expect(laima.getDaysDifference(new Date(NaN), new Date())).toBeNaN();
  });
  it('keeps DB padding and permissive DD-MM-YYYY overflow', () => {
    expect(laima.formatDateForDB(new Date(2024, 0, 2))).toBe('2024-01-02');
    expect(laima.formatDateForDB(new Date(2024, 10, 23))).toBe('2024-11-23');
    expect(laima.parseDateFromDB('31-02-2023')).toEqual(new Date(2023, 2, 3));
    expect(laima.parseDateFromDB('invalid').getTime()).toBeNaN();
  });
  it('preserves calendar overflow, time behavior and input immutability', () => {
    const date = new Date(2023, 0, 31, 15, 30, 20, 123);
    const original = date.getTime();
    expect(laima.addMonths(date, 1)).toEqual(new Date(2023, 2, 3));
    expect(laima.subMonths(date, -1)).toEqual(
      new Date(2023, 2, 3, 15, 30, 20, 123),
    );
    expect(laima.addDays(date, 1)).toEqual(
      new Date(2023, 1, 1, 15, 30, 20, 123),
    );
    expect(laima.subDays(date, -1)).toEqual(laima.addDays(date, 1));
    expect(laima.getStartOfDay(date)).toEqual(new Date(2023, 0, 31));
    expect(laima.getEndOfDay(date)).toEqual(
      new Date(2023, 0, 31, 23, 59, 59, 999),
    );
    expect(date.getTime()).toBe(original);
  });
  it('keeps selected Date references and tie behavior', () => {
    const first = new Date(0);
    const second = new Date(1);
    const tie = new Date(0);
    expect(laima.getMaxDate(first, second)).toBe(second);
    expect(laima.getMaxDate(second, first)).toBe(second);
    expect(laima.getMinDate(first, second)).toBe(first);
    expect(laima.getMinDate(second, first)).toBe(first);
    expect(laima.getMaxDate(first, tie)).toBe(tie);
    expect(laima.getMinDate(first, tie)).toBe(tie);
  });
  it.each([
    [1900, false],
    [2000, true],
    [2024, true],
    [2023, false],
  ])('leap year %s is %s', (year, expected) => {
    expect(laima.isLeapYear(year)).toBe(expected);
  });
  it('preserves method overrides when calculating differences', () => {
    class CustomLaima extends Laima {
      getDaysDifferenceBetweenEpochs(epoch1: number, epoch2: number): number {
        return epoch2 - epoch1;
      }
    }
    expect(new CustomLaima().getDaysDifference(new Date(10), new Date(5))).toBe(
      -5,
    );
  });
  it('does not log from library methods', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    laima.parseDateFromDB('01-01-2024');
    laima.addMonths(new Date(), 1);
    expect(log).not.toHaveBeenCalled();
  });
});
