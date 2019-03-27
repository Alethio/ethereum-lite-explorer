import { FifoCache } from "app/data/cache/FifoCache";
import { UncleDetailsStore } from "./UncleDetailsStore";
import { IUncleDetails } from "./IUncleDetails";
import { UncleDetailsReader } from "app/data/uncle/details/UncleDetailsReader";
import { UncleDetailsApi } from "app/data/uncle/details/UncleDetailsApi";
import { Web3EthApi } from "app/data/web3/Web3EthApi";

const CACHE_SIZE = 5;

export class UncleDetailsStoreFactory {
    constructor(private web3EthApi: Web3EthApi) {

    }
    create() {
        return new UncleDetailsStore(
            new FifoCache<string, IUncleDetails>(CACHE_SIZE),
            new UncleDetailsApi(
                this.web3EthApi,
                new UncleDetailsReader()
            )
        );
    }
}
