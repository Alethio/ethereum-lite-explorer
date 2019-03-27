import { Web3EthApi } from "app/data/web3/Web3EthApi";
import { ILogger } from "app/util/log/ILogger";
import { DashboardStore } from "app/data/dashboard/DashboardStore";

export class NodeStatsWatcher {
    private timeoutId: number | undefined;
    constructor(private api: Web3EthApi, private dashboardStore: DashboardStore,
        private logger: ILogger) {

    }

    watch() {
        this.monitorNodeStats().catch(e => {
            this.logger.error(e);
        });
    }
    private monitorNodeStats = async () => {
        let peerCount = await this.api.getPeerCount();
        this.dashboardStore.setPeerCount(peerCount);
        this.timeoutId = setTimeout(this.monitorNodeStats, 5000);
    }

    stop() {
        if (this.timeoutId !== void 0) {
            clearTimeout(this.timeoutId);
            this.timeoutId = void 0;
        }
    }
}
