import { UncleDetailsReader } from "app/data/uncle/details/UncleDetailsReader";
import { Web3EthApi } from "app/data/web3/Web3EthApi";

export class UncleDetailsApi {
    constructor(
        private web3EthApi: Web3EthApi,
        private uncleDetailsReader: UncleDetailsReader
    ) {

    }

    async fetch(blockNumber: number, uncleIndex: number) {
        let data = await this.web3EthApi.getUncle(blockNumber, uncleIndex);

        if (!data) {
            throw new Error(`No data about uncle with index ${uncleIndex}
            found for block with number "${blockNumber}"`);
        }
        return this.uncleDetailsReader.read(data, blockNumber, uncleIndex);
    }
}
