import * as assert from "assert";
import { BlockStateStore } from "app/data/block/BlockStateStore";

describe("data/" + BlockStateStore.name, () => {
    describe(BlockStateStore.prototype.getLastConsolidated.name, () => {
        it("should return last consolidated block number", () => {
            let store = new BlockStateStore();
            assert.strictEqual(store.getLastConsolidated(), void 0);
            store.setLatest(100);
            assert.strictEqual(store.getLastConsolidated(), 85);
        });
    });

    describe(BlockStateStore.prototype.isConsolidated.name, () => {
        it("should check if given block number represents a consolidated block", () => {
            let store = new BlockStateStore();
            assert.strictEqual(store.isConsolidated(85), void 0);
            store.setLatest(100);
            assert.strictEqual(store.isConsolidated(85), true);
            assert.strictEqual(store.isConsolidated(86), false);
        });
    });

    describe(BlockStateStore.prototype.getConfirmations.name, () => {
        it("should return the number of confirmations for given block number", () => {
            let store = new BlockStateStore();
            assert.strictEqual(store.getConfirmations(85), void 0);
            store.setLatest(100);
            assert.strictEqual(store.getConfirmations(85), 15);
        });
    });

    describe(BlockStateStore.prototype.isConfirmed.name, () => {
        it("should check if given block number represents a confirmed block", () => {
            let store = new BlockStateStore();
            assert.strictEqual(store.isConfirmed(100), false);
            store.setLatest(133);
            assert.strictEqual(store.isConfirmed(100), true);
            assert.strictEqual(store.isConfirmed(101), false);
        });
    });
});
