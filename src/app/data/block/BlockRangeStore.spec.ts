import * as assert from "assert";
import { BlockRangeStore } from "app/data/block/BlockRangeStore";
import { ICache } from "app/data/cache/ICache";
import * as TypeMoq from "typemoq";
import { IBlockRangeApi } from "app/data/block/IBlockRangeApi";
import { assertThrowsAsync } from "../../../../test/helper";
import { IGenericBlockData } from "app/data/block/IGenericBlockData";
import { BlockStateStore } from "app/data/block/BlockStateStore";

describe("data/" + BlockRangeStore.name, () => {
    function createStore() {
        let cacheMock = TypeMoq.Mock.ofType<ICache<number, IGenericBlockData[]>>();
        let pageSize = 3;
        let rangeApiMock = TypeMoq.Mock.ofType<IBlockRangeApi<IGenericBlockData>>(void 0, TypeMoq.MockBehavior.Strict);
        let blockStateStoreMock = TypeMoq.Mock.ofType(BlockStateStore);
        let blockRangeStore = new BlockRangeStore(cacheMock.object, pageSize, rangeApiMock.object,
                blockStateStoreMock.object);
        return { blockRangeStore, cacheMock, rangeApiMock, pageSize, blockStateStoreMock };
    }
    it("fetch should throw for bad range", async () => {
        let { blockRangeStore } = createStore();

        await assertThrowsAsync(async () => {
            await blockRangeStore.fetch(5, 4);
        }, RangeError);
        await assertThrowsAsync(async () => {
            await blockRangeStore.fetch(5, 5);
        }, RangeError);
    });

    it("fetch should throw for negative start offset", async () => {
        let { blockRangeStore } = createStore();

        await assertThrowsAsync(async () => {
            await blockRangeStore.fetch(-1, 4);
        }, RangeError);
    });

    it("fetch should throw for server data out of requested range", async () => {
        let { blockRangeStore , rangeApiMock} = createStore();
        let mockData = [{id: 0, data: "a"}, {id: 10, data: "b"}];
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData));

        await assertThrowsAsync(async () => {
            await blockRangeStore.fetch(0, 3);
        }, (e) => !!e.toString().match(/Block with id 10 is out of range/));
    });

    it("should fetch single page (1st page - partial)", async () => {
        let { blockRangeStore, pageSize, rangeApiMock } = createStore();
        let mockData = [{id: 0, data: "a"}, {id: 1, data: "b"}, {id: 2, data: "c"}];
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData));

        let data = await blockRangeStore.fetch(1, 2);
        rangeApiMock.verify(x => x.fetch(0, pageSize), TypeMoq.Times.once());
        assert.deepEqual(data, [mockData[1]]);
    });

    it("should fetch single page (1st page - full)", async () => {
        let { blockRangeStore, pageSize, rangeApiMock } = createStore();
        let mockData = [{id: 0, data: "a"}, {id: 1, data: "b"}, {id: 2, data: "c"}];
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData));

        let data = await blockRangeStore.fetch(0, 3);
        rangeApiMock.verify(x => x.fetch(0, pageSize), TypeMoq.Times.once());
        assert.deepEqual(data, mockData);
    });

    it("should fetch single page (nth page)", async () => {
        let { blockRangeStore, pageSize, rangeApiMock } = createStore();
        let mockData = [{id: 0, data: "a"}, {id: 1, data: "b"}, {id: 2, data: "c"}];
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData));

        let data = await blockRangeStore.fetch(3, 5);
        rangeApiMock.verify(x => x.fetch(pageSize, 2 * pageSize), TypeMoq.Times.once());
        assert.deepEqual(data, [mockData[0], mockData[1]]);
    });

    it("should fetch multiple pages (2-page - partial)", async () => {
        let { blockRangeStore, pageSize, rangeApiMock } = createStore();
        let mockData1 = [{id: 0, data: "a"}, {id: 1, data: "b"}, {id: 2, data: "c"}];
        let mockData2 = [{id: 3, data: "d"}, {id: 4, data: "e"}, {id: 5, data: "f"}];
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData1));
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData2));

        let data = await blockRangeStore.fetch(1, 6);
        rangeApiMock.verify(x => x.fetch(0, pageSize), TypeMoq.Times.once());
        rangeApiMock.verify(x => x.fetch(pageSize, 2 * pageSize), TypeMoq.Times.once());
        assert.deepEqual(data, [mockData1[1], mockData1[2], mockData2[0], mockData2[1], mockData2[2]]);
    });

    it("should fetch multiple pages (n-page - full)", async () => {
        let { blockRangeStore, pageSize, rangeApiMock } = createStore();
        let mockData1 = [{id: 0, data: "a"}, {id: 1, data: "b"}, {id: 2, data: "c"}];
        let mockData2 = [{id: 3, data: "d"}, {id: 4, data: "e"}, {id: 5, data: "f"}];
        let mockData3 = [{id: 6, data: "g"}, {id: 7, data: "h"}, {id: 8, data: "i"}];
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData1));
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData2));
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData3));

        let data = await blockRangeStore.fetch(3, 12);
        rangeApiMock.verify(x => x.fetch(pageSize, 2 * pageSize), TypeMoq.Times.once());
        rangeApiMock.verify(x => x.fetch(2 * pageSize, 3 * pageSize), TypeMoq.Times.once());
        rangeApiMock.verify(x => x.fetch(3 * pageSize, 4 * pageSize), TypeMoq.Times.once());
        assert.deepEqual(data, [
            mockData1[0], mockData1[1], mockData1[2],
            mockData2[0], mockData2[1], mockData2[2],
            mockData3[0], mockData3[1], mockData3[2]
        ]);
    });

    it("should fetch multiple pages (n-page - partial)", async () => {
        let { blockRangeStore, pageSize, rangeApiMock } = createStore();
        let mockData1 = [{id: 0, data: "a"}, {id: 1, data: "b"}, {id: 2, data: "c"}];
        let mockData2 = [{id: 3, data: "d"}, {id: 4, data: "e"}, {id: 5, data: "f"}];
        let mockData3 = [{id: 6, data: "g"}, {id: 7, data: "h"}, {id: 8, data: "i"}];
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData1));
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData2));
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData3));

        let data = await blockRangeStore.fetch(4, 11);
        rangeApiMock.verify(x => x.fetch(pageSize, 2 * pageSize), TypeMoq.Times.once());
        rangeApiMock.verify(x => x.fetch(2 * pageSize, 3 * pageSize), TypeMoq.Times.once());
        rangeApiMock.verify(x => x.fetch(3 * pageSize, 4 * pageSize), TypeMoq.Times.once());
        assert.deepEqual(data, [
            mockData1[1], mockData1[2],
            mockData2[0], mockData2[1], mockData2[2],
            mockData3[0], mockData3[1]
        ]);
    });

    it("should fetch from existing cache", async () => {
        let { blockRangeStore, pageSize, rangeApiMock, cacheMock } = createStore();
        let mockData1 = [{id: 0, data: "a"}, {id: 1, data: "b"}, {id: 2, data: "c"}];
        let mockData2 = [{id: 3, data: "d"}, {id: 4, data: "e"}, {id: 5, data: "f"}];
        cacheMock.setup(x => x.has(0)).returns(() => true);
        cacheMock.setup(x => x.get(0)).returns(() => mockData1);
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData2));

        let data = await blockRangeStore.fetch(0, 6);
        assert.deepEqual(data, [
            mockData1[0], mockData1[1], mockData1[2],
            mockData2[0], mockData2[1], mockData2[2]
        ]);

        await blockRangeStore.fetch(1, 3);
        await blockRangeStore.fetch(2, 3);
        rangeApiMock.verify(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()), TypeMoq.Times.once());
        rangeApiMock.verify(x => x.fetch(pageSize, 2 * pageSize), TypeMoq.Times.once());
    });

    it("should not cache partial pages", async () => {
        let { blockRangeStore, pageSize, rangeApiMock} = createStore();
        let mockData = [{id: 4, data: "b"}, {id: 5, data: "c"}];
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData));

        let data = await blockRangeStore.fetch(3, 6);
        assert.deepEqual(data, [undefined, {id: 4, data: "b"}, {id: 5, data: "c"}]);

        await blockRangeStore.fetch(3, 6);
        rangeApiMock.verify(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()), TypeMoq.Times.exactly(2));
        rangeApiMock.verify(x => x.fetch(pageSize, 2 * pageSize), TypeMoq.Times.exactly(2));
    });

    it ("should cache pages with consolidated blocks", async () => {
        let { blockRangeStore, rangeApiMock, cacheMock, blockStateStoreMock } = createStore();
        let mockData = [{id: 3, data: "a"}, {id: 4, data: "b"}, {id: 5, data: "c"}];
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData));
        blockStateStoreMock.setup(x => x.getLastConsolidated()).returns(() => 5);

        let data = await blockRangeStore.fetch(3, 6);
        assert.deepEqual(data, [{id: 3, data: "a"}, {id: 4, data: "b"}, {id: 5, data: "c"}]);

        cacheMock.verify(x => x.set(TypeMoq.It.isValue(1), TypeMoq.It.isValue(mockData)), TypeMoq.Times.once());
    });

    it ("should not cache pages with non-consolidated blocks", async () => {
        let { blockRangeStore, rangeApiMock, cacheMock, blockStateStoreMock } = createStore();
        let mockData = [{id: 3, data: "a"}, {id: 4, data: "b"}, {id: 5, data: "c"}];
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData));
        blockStateStoreMock.setup(x => x.getLastConsolidated()).returns(() => 4);

        let data = await blockRangeStore.fetch(3, 6);
        assert.deepEqual(data, [{id: 3, data: "a"}, {id: 4, data: "b"}, {id: 5, data: "c"}]);

        cacheMock.verify(x => x.set(TypeMoq.It.isAny(), TypeMoq.It.isAny()), TypeMoq.Times.never());
    });

    it("should fetch incomplete page data", async () => {
        let { blockRangeStore, pageSize, rangeApiMock } = createStore();
        let mockData = [{id: 4, data: "a"}, {id: 5, data: "c"}];
        rangeApiMock.setup(x => x.fetch(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
            .returns(() => Promise.resolve(mockData));

        let data = await blockRangeStore.fetch(3, 5);
        rangeApiMock.verify(x => x.fetch(pageSize, 2 * pageSize), TypeMoq.Times.once());
        assert.deepEqual(data, [undefined, {id: 4, data: "a"}]);
    });
});
