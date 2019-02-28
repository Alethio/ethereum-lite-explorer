import { ICache } from "app/data/cache/ICache";
import { TxDetailsApi } from "app/data/tx/details/TxDetailsApi";
import { ITxDetails } from "app/data/tx/details/ITxDetails";
import { BlockStateStore } from "app/data/block/BlockStateStore";

export class TxDetailsStore {
    constructor(
        private txDetailsCache: ICache<string, ITxDetails>,
        private txDetailsApi: TxDetailsApi,
        private blockStateStore: BlockStateStore
    ) {

    }

    async fetch(txHash: string) {
        if (this.txDetailsCache.has(txHash)) {
            return this.txDetailsCache.get(txHash)!;
        }

        let details = await this.txDetailsApi.fetch(txHash);
        let lastConsolidatedBlock = this.blockStateStore.getLastConsolidated();
        if (lastConsolidatedBlock !== void 0 && details.block.id < lastConsolidatedBlock) {
            this.txDetailsCache.set(txHash, details);
        }
        return details;
    }

    async fetchAll(hashes: ITxDetails[]) {
        return Promise.all(hashes.map(tx => this.fetch(tx.hash)));
    }
}
