interface IDateProvider {
    compareInHours(start_date: Date, endDate: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
    compareInDays(start_date: Date, endDate: Date): number;
    addDays(days: number): Date;
    addHours(hours: number): Date;
}

export { IDateProvider };
