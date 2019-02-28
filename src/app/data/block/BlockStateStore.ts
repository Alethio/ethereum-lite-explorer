import { observable } from "mobx";

export class BlockStateStore {
    @observable
    private latestBlockNo: number | undefined;

    setLatest(blockNo: number) {
        this.latestBlockNo = blockNo;
    }

    getLatest() {
        return this.latestBlockNo;
    }

    getLastConsolidated() {
        if (!this.latestBlockNo) {
            return void 0;
        }
        return this.latestBlockNo - 15;
    }

    /**
     * Checks if given block is consolidated, or undefined if we don't have this data yet
     */
    isConsolidated(blockId: number) {
        let lastConsolidated = this.getLastConsolidated();
        return lastConsolidated ? blockId <= lastConsolidated : void 0;
    }

    /**
     * Number of confirmations for given block, or undefined if we don't have this data yet
     */
    getConfirmations(blockId: number) {
        if (!this.latestBlockNo) {
            return void 0;
        }
        return this.latestBlockNo - blockId;
    }

    /**
     * Whether a given block is confirmed.
     * Block is considered confirmed if older than the last block by at least N blocks
     */
    isConfirmed(blockId: number) {
        let confirmations = this.getConfirmations(blockId);
        return confirmations !== void 0 && confirmations > 32;
    }
}
