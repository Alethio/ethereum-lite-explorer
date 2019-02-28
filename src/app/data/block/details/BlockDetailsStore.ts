import { ICache } from "app/data/cache/ICache";
import { IBlockDetails } from "./IBlockDetails";
import { BlockStateStore } from "app/data/block/BlockStateStore";
import { BlockDetailsApi } from "app/data/block/details/BlockDetailsApi";

export class BlockDetailsStore {
    constructor(
        private blockDetailsCache: ICache<number, IBlockDetails>,
        private blockStateStore: BlockStateStore,
        private blockDetailsApi: BlockDetailsApi
    ) {

    }

    async fetch(blockId: number) {
        if (this.blockDetailsCache.has(blockId)) {
            return this.blockDetailsCache.get(blockId)!;
        }

        let lastConsolidated = this.blockStateStore.getLastConsolidated();
        let blockDetails = await this.blockDetailsApi.fetch(blockId);
        if (!lastConsolidated || lastConsolidated >= blockId) {
            this.blockDetailsCache.set(blockId, blockDetails);
        }

        return blockDetails;
    }
}
