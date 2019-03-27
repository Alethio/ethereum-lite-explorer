import { Web3EthApi } from "app/data/web3/Web3EthApi";
import { BlockStateStore } from "app/data/block/BlockStateStore";
import { ILogger } from "app/util/log/ILogger";

export class LastBlockWatcher {
    private timeoutId: number | undefined;
    constructor(private api: Web3EthApi, private store: BlockStateStore,
         private logger: ILogger ) {

    }

    watch() {
        this.monitorLastBlock().catch(e => {
            this.logger.error(e);
        });
    }
    private monitorLastBlock = async () => {
        let latestBlock = await this.api.getLatestBlock();
        this.store.setLatest(latestBlock);
        this.timeoutId = setTimeout(this.monitorLastBlock, 5000);
    }

    stop() {
        if (this.timeoutId !== void 0) {
            clearTimeout(this.timeoutId);
            this.timeoutId = void 0;
        }
    }
}
