// tslint:disable:no-console
import { ITransport } from "app/util/log/transport/ITransport";
import { LinkedError } from "app/util/LinkedError";

export class TransportConsole implements ITransport {
    constructor(private console: Console) {

    }

    error(...args: any[]) {
        this.console.error(...args);
        let linkedError: LinkedError | undefined = args.find(a => a instanceof LinkedError);
        if (linkedError) {
            let cause = linkedError.cause;
            while (cause) {
                this.console.error("Caused by:", cause);
                cause = (cause as LinkedError).cause;
            }
        }

    }

    warn(...args: any[]) {
        this.console.warn(...args);
        let linkedError: LinkedError | undefined = args.find(a => a instanceof LinkedError);
        if (linkedError) {
            let cause = linkedError.cause;
            while (cause) {
                this.console.warn("Caused by:", cause);
                cause = (cause as LinkedError).cause;
            }
        }
    }

    info(message: string) {
        this.console.info(message);
    }
}
