import { BlockRangeStore } from "app/data/block/BlockRangeStore";
import { IBlockValue } from "app/data/block/value/IBlockValue";

export class BlockValueStore {
    constructor(
        private blockValueApiStore: BlockRangeStore<IBlockValue>
    ) {

    }
    /** Fetch data in range [start, end) */
    async fetch(start: number, end: number) {
        //TODO: Add some cache | cash
        return await this.blockValueApiStore.fetch(start, end);
    }
}
