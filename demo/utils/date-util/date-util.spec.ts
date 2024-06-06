import { dateUtil } from './date-util';

describe('dateUtil', () => {
  it('returns the current date when the input is "today"', () => {
    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() +
      '-' + String(currentDate.getMonth() + 1).padStart(2, '0') +
      '-' + String(currentDate.getDate()).padStart(2, '0');

    expect(dateUtil('today')).toEqual(formattedDate);
  });

  it('returns undefined when the input is not "today"', () => {
    expect(dateUtil('yesterday')).toEqual("");
  });
});
