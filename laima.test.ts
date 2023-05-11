import 'jest-extended';
import laima from './laima';

describe('laima', () => {
    test('getEpochTime', () => {
        const epochTime = laima.getEpochTime();
        const now = new Date().getTime();
        expect(Math.abs(epochTime - now)).toBeLessThanOrEqual(1000);
    });

    test('getTimeDifference', () => {
        const date1 = new Date('2023-05-10T12:00:00');
        const date2 = new Date('2023-05-11T12:00:00');
        const difference = laima.getTimeDifference(date1, date2);
        expect(difference).toBe(86400000);
    });

    test('formatDateForDB', () => {
        const date = new Date('2023-05-10T12:00:00');
        const formattedDate = laima.formatDateForDB(date);
        expect(formattedDate).toBe('2023-05-10');
    });

    test('parseDateFromDB', () => {
        const dateString = '2023-05-10';
        const parsedDate = laima.parseDateFromDB(dateString);
        expect(parsedDate).toEqual(new Date('2023-05-10T00:00:00'));
    });

    test('addDays', () => {
        const date = new Date('2023-05-10T12:00:00');
        const newDate = laima.addDays(date, 5);
        expect(newDate).toEqual(new Date('2023-05-15T12:00:00'));
    });

    test('subDays', () => {
        const date = new Date('2023-05-10T12:00:00');
        const newDate = laima.subDays(date, 5);
        expect(newDate).toEqual(new Date('2023-05-05T12:00:00'));
    });

    test('format', () => {
        const date = new Date('2023-05-10T12:00:00');
        const formattedDate = laima.format(date, 'YYYY/MM/DD HH:mm:ss');
        expect(formattedDate).toBe('2023/05/10 12:00:00');
    });
});
