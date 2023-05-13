import 'jest-extended';
import Laima from './laima';

describe('Laima', () => {
    const laima = new Laima();

    it('should correctly convert date to epoch', () => {
        const date = new Date(2023, 5, 13);
        const expectedEpoch = date.getTime();
        expect(laima.dateToEpoch(date)).toEqual(expectedEpoch);
    });

    it('should correctly convert epoch to date', () => {
        const epoch = new Date(2023, 5, 13).getTime();
        const expectedDate = new Date(epoch);
        expect(laima.epochToDate(epoch)).toEqual(expectedDate);
    });

    it('should correctly calculate difference in days between epochs', () => {
        const epoch1 = new Date(2023, 5, 13).getTime();
        const epoch2 = new Date(2023, 5, 20).getTime();
        expect(laima.getDaysDifferenceBetweenEpochs(epoch1, epoch2)).toEqual(7);
    });

    it('should correctly calculate difference in days between dates', () => {
        const date1 = new Date(2023, 5, 13);
        const date2 = new Date(2023, 5, 20);
        expect(laima.getDaysDifference(date1, date2)).toEqual(7);
    });

    it('should correctly format date for DB', () => {
        const date = new Date(2023, 5, 13);
        expect(laima.formatDateForDB(date)).toEqual('2023-06-13');
    });

    it('should correctly parse date from DB', () => {
        const dateString = '13-06-2023';
        const expectedDate = new Date(2023, 5, 13);
        expect(laima.parseDateFromDB(dateString)).toEqual(expectedDate);
    });

    it('should correctly add days to a date', () => {
        const date = new Date(2023, 5, 13);
        const expectedDate = new Date(2023, 5, 20);
        expect(laima.addDays(date, 7)).toEqual(expectedDate);
    });

    it('should correctly subtract days from a date', () => {
        const date = new Date(2023, 5, 20);
        const expectedDate = new Date(2023, 5, 13);
        expect(laima.subDays(date, 7)).toEqual(expectedDate);
    });

    test('getMaxDate should return the latest of two dates', () => {
        const earlierDate = new Date('2023-01-01');
        const laterDate = new Date('2023-01-02');
        expect(laima.getMaxDate(earlierDate, laterDate)).toEqual(laterDate);
    });

    it('getMinDate should return the earliest of two dates', () => {
        const earlierDate = new Date('2023-01-01');
        const laterDate = new Date('2023-01-02');
        expect(laima.getMinDate(earlierDate, laterDate)).toEqual(earlierDate);
    });

    it('format should return the current date and time in a specific format', () => {
        const formattedDate = laima.format('YYYY-MM-DD');
        const currentDate = new Date();
        expect(formattedDate).toEqual(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0'));
    });

    it('addMonths should add a specific number of months to a date', () => {
        const date = new Date(2023, 0, 1);  // Janeiro é 0
        console.log(`Original date: ${date.toString()}, Original date month: ${date.getMonth()}`);
        const newDate = laima.addMonths(date, 1);
        expect(newDate.getMonth()).toEqual(1);  // Janeiro é 0, então Janeiro + 1 mês = Fevereiro (1)
    });

    it('subMonths should subtract a specific number of months from a date', () => {
        const date = new Date(2023, 1, 1);  // Fevereiro é 1
        const newDate = laima.subMonths(date, 1);
        expect(newDate.getMonth()).toEqual(0);  // Fevereiro é 1, então Fevereiro - 1 mês = Janeiro (0)
    });

    it('formatToLocalString should format a Date object to a local string', () => {
        const date = new Date('2023-01-01');
        expect(laima.formatToLocalString(date)).toEqual(date.toLocaleString());
    });

    it('getStartOfDay should return a new Date object representing the start of the day', () => {
        const date = new Date('2023-01-01T15:30:00Z');
        const startOfDay = laima.getStartOfDay(date);
        expect(startOfDay.getHours()).toEqual(0);
        expect(startOfDay.getMinutes()).toEqual(0);
        expect(startOfDay.getSeconds()).toEqual(0);
    });

    it('getEndOfDay should return a new Date object representing the end of the day', () => {
        const date = new Date('2023-01-01T15:30:00Z');
        const endOfDay = laima.getEndOfDay(date);
        expect(endOfDay.getHours()).toEqual(23);
        expect(endOfDay.getMinutes()).toEqual(59);
        expect(endOfDay.getSeconds()).toEqual(59);
    });

    it('isLeapYear should determine whether a year is a leap year', () => {
        expect(laima.isLeapYear(2020)).toEqual(true);  // 2020 is a leap year
        expect(laima.isLeapYear(2021)).toEqual(false);  // 2021 is not a leap year
    });

    it('getDaysInMonth should return the number of days in a month for a specific year', () => {
        expect(laima.getDaysInMonth(2023, 1)).toEqual(31);  // January has 31 days
        expect(laima.getDaysInMonth(2023, 2)).toEqual(28);  // February 2023 has 28 days
        expect(laima.getDaysInMonth(2020, 2)).toEqual(29);  // February 2020 has 29 days because it is a leap year
    });

    it('getDaysRemainingInMonth should return the number of days remaining until the end of the month for a specific date', () => {
        const date = new Date(2023, 0, 1);  // Janeiro é 0
        expect(laima.getDaysRemainingInMonth(date)).toEqual(30);  // Existem 30 dias restantes em Janeiro após o dia 1
    });
});
