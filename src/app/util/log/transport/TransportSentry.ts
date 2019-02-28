import { ITransport } from "app/util/log/transport/ITransport";
import { LinkedError } from "app/util/LinkedError";

export class TransportSentry implements ITransport {
    // tslint:disable-next-line:import-blacklist
    constructor(private sentry: typeof import("@sentry/browser")) {

    }

    error(message: string | Error, ...otherArgs: any[]) {
        let cause: Error | undefined = otherArgs[0];
        let context: any = otherArgs[1];
        if (!(cause instanceof Error)) {
            context = cause;
            cause = void 0;
        }

        if (typeof message === "string") {
            // Create a wrapper error, so that we can show a message with stacktrace in Sentry
            // and also capture the original error
            message = new LinkedError(message, cause);
        }

        const sentry = this.sentry;
        if (sentry) {
            sentry.withScope(scope => {
                if (context) {
                    scope.setExtra("context", context);
                }
                sentry.captureException(message);
            });
        }
    }

    warn(message: string, context?: any) {
        // Not logging to Sentry
    }

    info(message: string) {
        // Not logging to Sentry
    }
}
