import { ILogger } from "app/util/log/ILogger";
import { ITransport } from "app/util/log/transport/ITransport";

export class Logger implements ILogger {
    private transports: ITransport[] = [];

    addTransport(...transports: ITransport[]) {
        this.transports.push(...transports);
    }

    error(message: string | Error, ...otherArgs: any[]) {
        this.transports.forEach(t => {
            try {
                t.error(message, ...otherArgs);
            } catch (e) {
                // Nothing we can do about it
            }
        });
    }

    warn(message: string, context?: any) {
        this.transports.forEach(t => {
            try {
                if (context !== void 0) {
                    t.warn(message, context);
                } else {
                    t.warn(message);
                }
            } catch (e) {
                // Nothing we can do about it
            }
        });
    }

    info(message: string) {
        this.transports.forEach(t => {
            try {
                t.info(message);
            } catch (e) {
                // Nothing we can do about it
            }
        });
    }
}
