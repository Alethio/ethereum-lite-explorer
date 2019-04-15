import { UserPreferences } from "app/UserPreferences";

declare var APP_DEFAULT_LOCALE: string;
declare var APP_AVAILABLE_LOCALES: string;

interface IAppConfigData {
    APP_NETWORK_MONITOR_URL?: string;
    APP_SENTRY_ENABLED?: string;
    APP_SENTRY_APPNAME?: string;
    APP_SENTRY_DSN?: string;
    APP_SENTRY_ENV?: string;
    APP_NODE_URL: string;
    APP_INFURA_PROJECT_ID?: string;
    APP_INFURA_IPFS_URL_MASK?: string;
    APP_ROUTER_HISTORY_MODE?: boolean;
    APP_EXTRA_HEADER_TYPE: string;
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
    getExtraHeaderType() {
        if (this.data.APP_EXTRA_HEADER_TYPE === undefined) {
            return "hexstring"; // default fallback
        }
        return this.data.APP_EXTRA_HEADER_TYPE;
    }

    getInfuraIpfsUrlMask() {
        return this.data.APP_INFURA_IPFS_URL_MASK;
    }

    checkForNetworkMonitorUrl() {
        return this.data.APP_NETWORK_MONITOR_URL !== undefined;
    }

    getNetworkMonitorUrl() {
        return this.data.APP_NETWORK_MONITOR_URL;
    }

    checkForInfuraProjectId() {
        return this.data.APP_INFURA_PROJECT_ID !== undefined;
    }

    getInfuraProjectId() {
        return this.data.APP_INFURA_PROJECT_ID;
    }

    checkForNodeURL() {
        return this.data.APP_NODE_URL !== undefined;
    }

    getNodeUrl() {
        return this.data.APP_NODE_URL;
    }

    createFieldsArray() {
        if (this.checkForInfuraProjectId() && this.data.APP_INFURA_PROJECT_ID !== "") {
            let standardArray = [{
                key: "Mainnet",
                label: "Mainnet",
                value: `https://mainnet.infura.io/v3/${this.getInfuraProjectId()}`
            },
            {
                key: "Kovan",
                label: "Kovan",
                value: `https://kovan.infura.io/v3/${this.getInfuraProjectId()}`
            },
            {
                key: "Rinkeby",
                label: "Rinkeby",
                value: `https://rinkeby.infura.io/v3/${this.getInfuraProjectId()}`
            },
            {
                key: "Ropsten",
                label: "Ropsten",
                value: `https://ropsten.infura.io/v3/${this.getInfuraProjectId()}`
            },
            {
                key: "Görli",
                label: "Görli",
                value: `https://goerli.infura.io/v3/${this.getInfuraProjectId()}`
            }];
            if (this.checkForNodeURL() && this.getNodeUrl().includes("infura")) {
                return standardArray;
            } else if (this.checkForNodeURL()) {
                standardArray.push({
                    key: this.data.APP_NODE_URL,
                    label: this.data.APP_NODE_URL,
                    value: this.data.APP_NODE_URL
                });
                return standardArray;
            } else {
                return standardArray;
            }
        } else {
            if (this.checkForNodeURL()) {
                return [{
                    key: this.data.APP_NODE_URL,
                    label: this.data.APP_NODE_URL,
                    value: this.data.APP_NODE_URL
                }];
            }
        }
        return [{
            key: "",
            label: "",
            value: ""
        }];
    }
}
