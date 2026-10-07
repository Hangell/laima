import Laima from '../../src/laima';

const laima = new Laima();

describe('additive date utilities', () => {
  it('formats every token, repeated tokens and escaped text in UTC', () => {
    const date = new Date('2024-01-02T03:04:05Z');
    expect(
      laima.formatDate(
        date,
        'YYYY YY MM M DD D HH H hh h mm m ss s a A [Date]',
        { utc: true },
      ),
    ).toBe('2024 24 01 1 02 2 03 3 03 3 04 4 05 5 am AM Date');
    expect(laima.formatDate(date, 'YYYY/YYYY')).toBe('2024/2024');
    expect(laima.formatDate(date, '', { utc: true })).toBe('');
  });
  it('supports local default formatting, noon and midnight', () => {
    expect(laima.formatDate(new Date(2024, 10, 23, 15, 46, 57))).toBe(
      '2024-11-23 15:46:57',
    );
    expect(laima.formatDate(new Date(2024, 0, 1, 12), 'hh h a A')).toBe(
      '12 12 pm PM',
    );
    expect(
      laima.formatDate(new Date('2024-01-01T00:00:00Z'), 'hh h', { utc: true }),
    ).toBe('12 12');
    expect(() => laima.formatDate(new Date(NaN))).toThrow(RangeError);
  });
  it.each(['2024-02-29', '0000-01-01', '0099-12-31', '2023-12-31'])(
    'strictly round trips %s',
    (value) => {
      const date = laima.parseISODate(value);
      expect(date.getFullYear()).toBe(Number(value.slice(0, 4)));
      expect(date.getMonth() + 1).toBe(Number(value.slice(5, 7)));
      expect(date.getDate()).toBe(Number(value.slice(8)));
      expect(date.getHours()).toBe(0);
    },
  );
  it.each([
    '2023-02-29',
    '2024-13-01',
    '2024-00-01',
    '2024-01-00',
    '2024-04-31',
    '2024-1-1',
    '01-01-2024',
    'garbage',
    '2024-01-01extra',
  ])('rejects %s', (value) => {
    expect(() => laima.parseISODate(value)).toThrow(RangeError);
  });
  it('adds calendar days across DST without mutating the input', () => {
    const date = new Date(2024, 2, 9, 12);
    const result = laima.addDays(date, 1);
    expect(result.getDate()).toBe(10);
    expect(result.getHours()).toBe(12);
    expect(date.getDate()).toBe(9);
  });
});
