import { format } from 'date-fns';

/**
 * Returns the current date in 'yyyy-MM-dd' format if the input is 'today'.
 * @param dateType - A string that specifies the type of date to return.
 * @returns The formatted current date if dateType is 'today', otherwise undefined.
 */
export function dateUtil(dateType: string): string {
  if (dateType === "today") {
    return format(new Date(), "yyyy-MM-dd");
  }
  return "";
}
