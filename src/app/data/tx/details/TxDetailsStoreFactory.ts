import { FifoCache } from "app/data/cache/FifoCache";
import { TxDetailsStore } from "app/data/tx/details/TxDetailsStore";
import { TxDetailsApi } from "app/data/tx/details/TxDetailsApi";
import { ITxDetails } from "app/data/tx/details/ITxDetails";
import { BlockStateStore } from "app/data/block/BlockStateStore";
import { Web3EthApi } from "app/data/web3/Web3EthApi";
import { TxDetailsFullReader } from "app/data/tx/details/ITxDetailsFullReader";

const CACHE_SIZE = 10000;

export class TxDetailsStoreFactory {
    constructor(private blockStateStore: BlockStateStore, private web3EthApi: Web3EthApi) {

    }

    create() {
        return new TxDetailsStore(
            new FifoCache<string, ITxDetails>(CACHE_SIZE),
            new TxDetailsApi(
                this.web3EthApi,
                new TxDetailsFullReader()
            ),
            this.blockStateStore
        );
    }
}
