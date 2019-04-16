import { BlockDetailsStore } from "./BlockDetailsStore";
import { FifoCache } from "app/data/cache/FifoCache";
import { IBlockDetails } from "./IBlockDetails";
import { BlockDetailsReader } from "./BlockDetailsReader";
import { BlockDetailsApi } from "./BlockDetailsApi";
import { BlockStateStore } from "app/data/block/BlockStateStore";
import { Web3EthApi } from "app/data/web3/Web3EthApi";
import { TxDetailsReader } from "app/data/tx/details/TxDetailsReader";
import { IBFTReader } from "app/data/block/details/IBFTReader";
import { AppConfig } from "app/AppConfig";

const CACHE_SIZE = 100;

export class BlockDetailsStoreFactory {
    constructor(private web3EthApi: Web3EthApi, private appConfig: AppConfig) {

    }

    create(blockStateStore: BlockStateStore) {
        return new BlockDetailsStore(
            new FifoCache<number, IBlockDetails>(CACHE_SIZE),
            blockStateStore,
            new BlockDetailsApi(
                this.appConfig,
                this.web3EthApi,
                new BlockDetailsReader(
                    new TxDetailsReader()
                ),
                new IBFTReader()
            )
        );
    }
}
