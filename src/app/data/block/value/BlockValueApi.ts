
import { BlockValueReader } from "app/data/block/value/BlockValueReader";
import { IBlockRangeApi } from "app/data/block/IBlockRangeApi";
import { IBlockValue } from "app/data/block/value/IBlockValue";
import { Web3EthApi } from "app/data/web3/Web3EthApi";

export class BlockValueApi implements IBlockRangeApi<IBlockValue> {
    constructor(
        private web3EthApi: Web3EthApi,
        private blockValueReader: BlockValueReader
    ) {

    }

    /** Fetch data in range [start, end) */
    async fetch(rangeStart: number, rangeEnd: number) {
        let data = await this.web3EthApi.getBlockRangeTransactionCount(rangeStart, rangeEnd);

        return (data || [])
            .map(raw => this.blockValueReader.read(raw))
            // We shouldn't really need to sort these, but we do it just in case the API doesn't
            .sort((a, b) => a.id - b.id);
    }
}
