import * as assert from "assert";
import { FifoCache } from "./FifoCache";

describe("FifoCache", () => {
    it("should cache item", () => {
        let cache = new FifoCache<number, string>(3);
        cache.set(2, "3");
        assert.strictEqual(cache.has(2), true);
        assert.strictEqual(cache.get(2), "3");
    });

    it ("should delete items from the beginning when cache is full", () => {
        let cache = new FifoCache<number, string>(3);
        cache.set(2, "3");
        cache.set(5, "6");
        cache.set(4, "2");
        assert.strictEqual(cache.has(2), true);
        assert.strictEqual(cache.get(2), "3");
        assert.strictEqual(cache.has(5), true);
        assert.strictEqual(cache.has(4), true);
        cache.set(7, "3");
        cache.set(8, "1");
        assert.strictEqual(cache.has(2), false);
        assert.strictEqual(cache.get(2), void 0);
        assert.strictEqual(cache.has(5), false);
        assert.strictEqual(cache.has(4), true);
        assert.strictEqual(cache.has(7), true);
        assert.strictEqual(cache.has(8), true);
    });
});
