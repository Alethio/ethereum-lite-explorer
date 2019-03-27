import * as assert from "assert";
import { roundPercentages } from "./roundPercentages";

describe("helpers/" + roundPercentages.name, () => {
    it("should round percentages so they sum up to 100", () => {
        let items = [{
            percent: 1.2
        }, {
            percent: 20.9
        }, {
            percent: 70.3
        }, {
            percent: 7.6
        }];

        let result = roundPercentages(items);
        assert.equal(result.length, 4);
        assert.strictEqual(result[0].percent, 1);
        assert.strictEqual(result[1].percent, 21);
        assert.strictEqual(result[2].percent, 70);
        assert.strictEqual(result[3].percent, 8);
        assert.strictEqual(result.reduce((acc, i) => acc + i.percent, 0), 100);
        assert.strictEqual(result[0].originalItem, items[0]);
        assert.strictEqual(result[1].originalItem, items[1]);
        assert.strictEqual(result[2].originalItem, items[2]);
        assert.strictEqual(result[3].originalItem, items[3]);
        assert.strictEqual(result[0].originalItem.percent, 1.2);
        assert.strictEqual(result[1].originalItem.percent, 20.9);
        assert.strictEqual(result[2].originalItem.percent, 70.3);
        assert.strictEqual(result[3].originalItem.percent, 7.6);
    });
});
