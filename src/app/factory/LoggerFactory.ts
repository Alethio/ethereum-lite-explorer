// tslint:disable-next-line:import-blacklist
import * as Sentry from "@sentry/browser";
import { AppConfig } from "app/AppConfig";
import { SentryStackTrim } from "app/util/log/SentryStackTrim";
import { Logger } from "app/util/log/Logger";
import { TransportSentry } from "app/util/log/transport/TransportSentry";
import { TransportConsole } from "app/util/log/transport/TransportConsole";

export class LoggerFactory {
    constructor(private appConfig: AppConfig) {

    }

    create() {
        let appConfig = this.appConfig;
        if (appConfig.isSentryEnabled()) {
            let sentryConfig = appConfig.getSentryConfig();
            Sentry.init({
                dsn: sentryConfig.dsn,
                environment: sentryConfig.env,
                release: sentryConfig.appName + "@" + appConfig.getVersionInfo().commitHash + "-" + sentryConfig.env,
                integrations: integrations => [
                    ...integrations.filter(i => i.name !== "TryCatch"),
                    new Sentry.Integrations.LinkedErrors({
                        // Support errors of type LinkedError
                        key: "cause"
                    }),
                    new SentryStackTrim()
                ]
            });

            Sentry.configureScope(scope => {
                scope.setTag("page_locale", appConfig.getLocale());
            });
        }

        let logger = new Logger();
        if (appConfig.isSentryEnabled()) {
            logger.addTransport(new TransportSentry(Sentry));
        }
        logger.addTransport(new TransportConsole(console));

        return logger;
    }
}
