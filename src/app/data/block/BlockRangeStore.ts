import { IGenericBlockData } from "app/data/block/IGenericBlockData";
import { ICache } from "app/data/cache/ICache";
import { IBlockRangeApi } from "app/data/block/IBlockRangeApi";
import { BlockStateStore } from "app/data/block/BlockStateStore";

/**
 * Block data store for ranges of blocks with caching and pagination
 *
 * Data stored can be of any type.
 * Range offset meaning is provided by the block range server API, but is normally a block number.
 */
export class BlockRangeStore<TBlockData extends IGenericBlockData> {
    constructor(
        private blockPageCache: ICache<number, TBlockData[]>,
        private blockPageSize: number,
        private blockRangeApi: IBlockRangeApi<TBlockData>,
        private blockStateStore: BlockStateStore
    ) {

    }

    /** Fetch data in range [start, end) */
    async fetch(start: number, end: number) {
        if (end <= start) {
            throw new RangeError(`Range end must be greater than range start`);
        }
        if (start < 0) {
            throw new RangeError(`Negative start offset`);
        }

        let startPage = Math.floor(start / this.blockPageSize);
        let endPage = Math.floor((end - 1) / this.blockPageSize);
        let numPages = endPage - startPage + 1;

        let rangeData: (TBlockData | undefined)[] = [];

        /*
         * Fetch blocks depending on how many pages they span
         *
         * Page #      | |         Page i         |       Page i + 1       |       Page i + 2        |
         *             | +----+-------+-----------+----+----+----+----+----+----+---------+-----+----+
         * Bk #        | | .. | start | start + 1 | .. | .. | .. | .. | .. | .. | end - 1 | end | .. |
         *             | +----+-------+-----------+----+----+----+----+----+----+---------+-----+----+
         * Idx in page |          ^ (start % pageSize)                               ^ ((end - 1) % pageSize)
         */
        for (let i = 0; i < numPages; ++i) {
            let pageData = await this.fetchPage(startPage + i);
            let startIndex = i ? 0 : start % this.blockPageSize;
            let endIndex = i === numPages - 1 || numPages === 1 ?
                (end - 1) % this.blockPageSize + 1 :
                this.blockPageSize;
            rangeData.push(...pageData.slice(startIndex, endIndex));
        }

        return rangeData;
    }

    private async fetchPage(pageNumber: number) {
        if (this.blockPageCache.has(pageNumber)) {
            return this.blockPageCache.get(pageNumber)!;
        }

        let rangeStart = pageNumber * this.blockPageSize;
        let rangeEnd = (pageNumber + 1) * this.blockPageSize;

        let pageData = await this.blockRangeApi.fetch(rangeStart, rangeEnd);

        // If we don't have missing items, we just return the unaltered data
        if (pageData.length === this.blockPageSize) {
            // Cache if the range contains only consolidated blocks
            let lastConsolidated = this.blockStateStore.getLastConsolidated();
            if (lastConsolidated && rangeEnd <= lastConsolidated + 1) {
                this.blockPageCache.set(pageNumber, pageData);
            }
            return pageData;
        }

        // If we got less items than the page size, let's add blanks so that we have correct indexes
        let filledPageData: (TBlockData | undefined)[] = new Array(this.blockPageSize);
        pageData.forEach(blockData => {
            if (blockData.id >= rangeEnd || blockData.id < rangeStart) {
                throw new Error(`Block with id ${blockData.id} is out of range [${rangeStart},${rangeEnd})`);
            }
            filledPageData[blockData.id - rangeStart] = blockData;
        });
        return filledPageData;
    }
}
