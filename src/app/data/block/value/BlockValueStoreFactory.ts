import { FifoCache } from "app/data/cache/FifoCache";
import { BlockValueApi } from "app/data/block/value/BlockValueApi";
import { BlockValueReader } from "app/data/block/value/BlockValueReader";
import { IBlockValue } from "app/data/block/value/IBlockValue";
import { BlockValueStore } from "app/data/block/value/BlockValueStore";
import { BlockRangeStore } from "app/data/block/BlockRangeStore";
import { BlockStateStore } from "app/data/block/BlockStateStore";
import { Web3EthApi } from "app/data/web3/Web3EthApi";

/** Number of cached pages */
const CACHE_SIZE = 20;
/** Block value items per page */
const PAGE_SIZE = 15;

export class BlockValueStoreFactory {
    constructor(private web3EthApi: Web3EthApi) {
    }

    create(blockStateStore: BlockStateStore) {
        return new BlockValueStore(
            new BlockRangeStore<IBlockValue>(
                new FifoCache<number, IBlockValue[]>(CACHE_SIZE),
                PAGE_SIZE,
                new BlockValueApi(
                    this.web3EthApi,
                    new BlockValueReader()
                ),
                blockStateStore
            )
        );
    }
}
