export type Employment = {
  startDate: Date;
  untilDate: Date;
  percentage: number;
  vacationDays: number;
};

export function calculateProRataVacationDays(employment: Employment): number {
  const { startDate, untilDate, percentage, vacationDays } = employment;

  const isFullYear =
      startDate.getFullYear() === untilDate.getFullYear() &&
      startDate.getMonth() === 0 &&
      startDate.getDate() === 1 &&
      untilDate.getMonth() === 11 &&
      untilDate.getDate() === 31;

  if (isFullYear && percentage === 1) {
    return vacationDays;
  }

  const daysWorked = differenceInDaysInclusive(untilDate, startDate);
  const totalDaysInYear = isLeapYear(startDate.getFullYear()) ? 366 : 365;

  const proRata = vacationDays * (daysWorked / totalDaysInYear) * percentage;
  return parseFloat(proRata.toFixed(2));
}

function differenceInDaysInclusive(to: Date, from: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((to.getTime() - from.getTime()) / msPerDay) + 1;
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
