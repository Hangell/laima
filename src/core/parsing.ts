/**
 * Converte uma data no formato dd-mm-YYYY para um objeto Date.
 *
 * @param {string} dateString - A data em formato de string (dd-mm-YYYY) a ser convertida.
 * @returns {Date} Um objeto Date correspondente à data fornecida em formato de string.
 */
export function parseDateFromDB(dateString: string): Date {
  const [day, month, year] = dateString.split('-');
  return new Date(Number(year), Number(month) - 1, Number(day));
}

/** Parse YYYY-MM-DD strictly in local time, without changing the legacy DB parser. */
export function parseISODate(value: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new RangeError('Expected a valid YYYY-MM-DD date');
  const [, year, month, day] = match.map(Number);
  const date = new Date(0);
  date.setFullYear(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new RangeError('Expected a valid YYYY-MM-DD date');
  }
  return date;
}
