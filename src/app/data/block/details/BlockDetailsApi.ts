import { BlockDetailsReader } from "./BlockDetailsReader";
import { Web3EthApi } from "app/data/web3/Web3EthApi";

export class BlockDetailsApi {
    constructor(
        private web3EthApi: Web3EthApi,
        private blockDetailsReader: BlockDetailsReader
    ) {

    }

    async fetch(blockNo: number) {
        let blockData = await this.web3EthApi.getBlock(blockNo);
        if (!blockData) {
            throw new Error(`No data found for block #${blockNo}`);
        }
        return this.blockDetailsReader.read(blockData);
    }
}
