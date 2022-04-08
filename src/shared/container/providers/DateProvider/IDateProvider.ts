interface IDateProvider {
    compareInHours(start_date: Date, endDate: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
}

export { IDateProvider };
