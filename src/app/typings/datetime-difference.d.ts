declare module "datetime-difference" {
    function datetimeDifference(date1: Date, date2: Date): datetimeDifference.DatetimeDifferenceObject;

    namespace datetimeDifference {
        export interface DatetimeDifferenceObject {
            years: number;
            months: number;
            days: number;
            hours: number;
            minutes: number;
            seconds: number;
            milliseconds: number;
        }
    }

    export = datetimeDifference;
}
