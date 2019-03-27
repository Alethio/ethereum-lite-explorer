import { AccountDetailsStore } from "./AccountDetailsStore";
import { AccountDetailsReader } from "./AccountDetailsReader";
import { AccountDetailsApi } from "./AccountDetailsApi";
import { Web3EthApi } from "app/data/web3/Web3EthApi";

export class AccountDetailsStoreFactory {
    constructor(private web3EthApi: Web3EthApi) {

    }

    create() {
        return new AccountDetailsStore(
            new AccountDetailsApi(
                this.web3EthApi,
                new AccountDetailsReader()
            )
        );
    }
}
