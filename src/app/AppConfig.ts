import { UserPreferences } from "app/UserPreferences";
import { IConfigData } from "@alethio/cms";

declare var APP_DEFAULT_LOCALE: string;
declare var APP_AVAILABLE_LOCALES: string;

interface IAppConfigData {
    APP_SENTRY_ENABLED?: string;
    APP_SENTRY_APPNAME?: string;
    APP_SENTRY_DSN?: string;
    APP_SENTRY_ENV?: string;
    GOOGLE_ANALYTICS_ID?: string;
    HOTJAR_ID?: string;

    pluginsUrl: string;
    plugins: any;
    pages: any;
    rootModules: any;
}

declare var GIT_VERSION: string;
declare var GIT_COMMITHASH: string;
declare var GIT_BRANCH: string;

export class AppConfig {
    private data: IAppConfigData;
    constructor(private userPreferences: UserPreferences) {

    }
    fromJson(data: IAppConfigData) {
        this.data = data;
    }

    /**
     * Returns locale string in language-region format (e.g. en-US)
     */
    getLocale() {
        return this.userPreferences.getLocale() || APP_DEFAULT_LOCALE;
    }

    getDefaultLocale() {
        return APP_DEFAULT_LOCALE;
    }

    /**
     * Available locales are listed from the translation folder at build time and passed in webpack config
     */
    getAvailableLocales(): string[] {
        return APP_AVAILABLE_LOCALES.split(",");
    }

    /**
     * Git version information (version, commit hash and branch name)
     */
    getVersionInfo() {
        return {
            version: GIT_VERSION,
            commitHash: GIT_COMMITHASH,
            branch: GIT_BRANCH
        };
    }

    isSentryEnabled() {
        if (this.data.APP_SENTRY_ENABLED === undefined) {
            return false;
        }
        return ["true", true, "on", "1", 1].indexOf(this.data.APP_SENTRY_ENABLED) !== -1;
    }

    getSentryConfig() {
        return {
            dsn: this.data.APP_SENTRY_DSN,
            appName: this.data.APP_SENTRY_APPNAME,
            env: this.data.APP_SENTRY_ENV
        };
    }

    getGoogleAnalyticsId() {
        return this.data.GOOGLE_ANALYTICS_ID;
    }

    getHotjarId() {
        return this.data.HOTJAR_ID;
    }

    getCmsConfig(): IConfigData {
        let basePath = (__webpack_public_path__).replace(/\/$/, "");
        return {
            basePath,
            pluginsBaseUrl: !this.data.pluginsUrl.match(/^https?:\/\/|\//) ?
                basePath + "/" + this.data.pluginsUrl :
                this.data.pluginsUrl,
            plugins: this.data.plugins,
            pages: this.data.pages,
            rootModules: this.data.rootModules
        };
    }
}
