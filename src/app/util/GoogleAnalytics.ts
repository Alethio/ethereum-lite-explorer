import { ScriptLoader } from "@puzzl/browser/lib/network/ScriptLoader";
import { ILogger } from "app/util/log/ILogger";

declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        dataLayer: any;
    }
}

export class GoogleAnalytics {
    constructor(
        private gaId: string,
        private logger: ILogger
    ) {

    }

    init() {
        // <!-- Global site tag (gtag.js) - Google Analytics -->
        new ScriptLoader(document)
            .load(`https://www.googletagmanager.com/gtag/js?id=${this.gaId}`)
            .catch(e => this.logger.error(e));

        window.dataLayer = window.dataLayer || [];
        //@ts-ignore
        function gtag() { dataLayer.push(arguments); }
        //@ts-ignore
        gtag("js", new Date());

        //@ts-ignore
        gtag("config", this.gaId);
    }
}
