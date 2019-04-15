import { BlockDetailsReader } from "./BlockDetailsReader";
import { Web3EthApi } from "app/data/web3/Web3EthApi";
import { IBFTReader } from "app/data/block/details/IBFTReader";
import { AppConfig } from "app/AppConfig";

export class BlockDetailsApi {
    constructor(
        private appConfig: AppConfig,
        private web3EthApi: Web3EthApi,
        private blockDetailsReader: BlockDetailsReader,
        private ibftReader: IBFTReader
    ) {

    }

    async fetch(blockNo: number) {
        let blockData = await this.web3EthApi.getBlock(blockNo);
        if (!blockData) {
            throw new Error(`No data found for block #${blockNo}`);
        }

        let bDetails = this.blockDetailsReader.read(blockData);
        if (this.appConfig.getExtraHeaderType() === "ibft2") {
            bDetails.ibftExtraData = this.ibftReader.read(blockData.extraData);
        }
        return bDetails;
    }
}
