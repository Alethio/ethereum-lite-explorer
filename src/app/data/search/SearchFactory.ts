import { Search } from "app/data/search/Search";
import { BlockStateStore } from "app/data/block/BlockStateStore";
import { Web3EthApi } from "app/data/web3/Web3EthApi";

export class SearchFactory {
    constructor(private web3EthApi: Web3EthApi) {

    }

    create(blockStateStore: BlockStateStore) {
        return new Search(
            this.web3EthApi,
            blockStateStore
        );
    }
}
