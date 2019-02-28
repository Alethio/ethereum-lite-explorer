import { UserPreferences } from "app/UserPreferences";

declare var APP_DEFAULT_LOCALE: string;
declare var APP_AVAILABLE_LOCALES: string;

interface IAppConfigData {
    APP_NETSTATS_URL?: string;
    APP_SENTRY_ENABLED?: string;
    APP_SENTRY_APPNAME?: string;
    APP_SENTRY_DSN?: string;
    APP_SENTRY_ENV?: string;
    APP_NODE_URL?: string;
    APP_INFURA_PROJECT_ID?: string;
    APP_INFURA_IPFS_URL_MASK?: string;
    APP_ROUTER_HISTORY_MODE?: boolean;
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

    getRouterMode() {
        if (this.data.APP_ROUTER_HISTORY_MODE === undefined) {
            return false;
        }
        return ["true", true, "on", "1", 1].indexOf(this.data.APP_ROUTER_HISTORY_MODE) !== -1;
    }

    getSentryConfig() {
        return {
            dsn: this.data.APP_SENTRY_DSN,
            appName: this.data.APP_SENTRY_APPNAME,
            env: this.data.APP_SENTRY_ENV
        };
    }

    getInfuraIpfsUrlMask() {
        return this.data.APP_INFURA_IPFS_URL_MASK;
    }

    getNetstatsUrl() {
        return this.data.APP_NETSTATS_URL;
    }

    checkForInfuraProjectId() {
        return this.data.APP_INFURA_PROJECT_ID !== undefined;
    }

    checkForNodeURL() {
        return this.data.APP_NODE_URL !== undefined;
    }

    createFieldsArray() {
        if (!this.checkForNodeURL()) {
            return [{
                key: "Mainnet",
                label: "Mainnet",
                value: `https://mainnet.infura.io/`
            },
            {
                key: "Kovan",
                label: "Kovan",
                value: `https://kovan.infura.io/`
            },
            {
                key: "Rinkeby",
                label: "Rinkeby",
                value: `https://rinkeby.infura.io/`
            },
            {
                key: "Ropsten",
                label: "Ropsten",
                value: `https://ropsten.infura.io/`
            },
            {
                key: "Görli",
                label: "Görli",
                value: "https://goerli.prylabs.net/"
            }];
        }
        if (this.checkForInfuraProjectId()) {
            let standardArray = [{
                key: "Mainnet",
                label: "Mainnet",
                value: `https://mainnet.infura.io/v3/${this.data.APP_INFURA_PROJECT_ID}`
            },
            {
                key: "Kovan",
                label: "Kovan",
                value: `https://kovan.infura.io/v3/${this.data.APP_INFURA_PROJECT_ID}`
            },
            {
                key: "Rinkeby",
                label: "Rinkeby",
                value: `https://rinkeby.infura.io/v3/${this.data.APP_INFURA_PROJECT_ID}`
            },
            {
                key: "Ropsten",
                label: "Ropsten",
                value: `https://ropsten.infura.io/v3/${this.data.APP_INFURA_PROJECT_ID}`
            },
            {
                key: "Görli",
                label: "Görli",
                value: "https://goerli.prylabs.net/"
            }];
            if (this.data.APP_NODE_URL !== undefined && this.data.APP_NODE_URL.includes("infura")) {
                return standardArray;
            } else if (this.data.APP_NODE_URL !== undefined) {
                standardArray.push({
                    key: this.data.APP_NODE_URL,
                    label: this.data.APP_NODE_URL,
                    value: this.data.APP_NODE_URL
                });
                return standardArray;
            }
        } else if (this.data.APP_NODE_URL !== undefined) {
            return [{
                key: this.data.APP_NODE_URL,
                label: this.data.APP_NODE_URL,
                value: this.data.APP_NODE_URL
            }];
        }
        return [];
    }
}
