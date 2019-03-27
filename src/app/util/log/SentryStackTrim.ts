import { addGlobalEventProcessor, getCurrentHub } from "@sentry/core";
import { Integration, SentryEvent, SentryEventHint } from "@sentry/types";
import { Logger } from "app/util/log/Logger";

/**
 * Sentry integration that removes unwanted stack frames from LinkedError wrapper created in TransportSentry.ts
 *
 * We need this because wrapping with a LinkedError inside TransportSentry adds a few extra frames in the stacktrace
 * which are useless and add noise
 */
export class SentryStackTrim implements Integration {
    static id = "SentryStackTrim";
    readonly name: string = SentryStackTrim.id;

    setupOnce(): void {
        addGlobalEventProcessor(async (event: SentryEvent, hint?: SentryEventHint) => {
            const self = getCurrentHub().getIntegration(SentryStackTrim);
            if (self) {
                return self.handler(event, hint);
            }
            return event;
        });
    }

    handler(event: SentryEvent, hint?: SentryEventHint): SentryEvent | null {
        if (!event.exception || !event.exception.values) {
            return event;
        }

        // The custom LinkedError created in the transport class should be the last in the array
        let lastException = event.exception.values[event.exception.values.length - 1];
        if (lastException.type !== "LinkedError") {
            return event;
        }

        let stack = lastException.stacktrace;
        if (!stack) {
            return event;
        }

        let frames = stack.frames;
        if (!frames) {
            return event;
        }

        // Find frame where logger.error was called and remove it and everything after it
        let frameIdx = frames.findIndex(v => v.function === Logger.name + "." + Logger.prototype.error.name);
        if (frameIdx === -1) {
            return event;
        }

        stack!.frames = stack.frames!.slice(0, frameIdx);

        return event;
    }
}
