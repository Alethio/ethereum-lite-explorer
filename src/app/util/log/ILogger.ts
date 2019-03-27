export interface ILogger {
    error(message: string, cause: Error, context?: any): void;
    error(message: string | Error, context?: any): void;
    warn(message: string, context?: any): void;
    info(message: string): void;
}
