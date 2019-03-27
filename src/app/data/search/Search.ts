import { BlockStateStore } from "app/data/block/BlockStateStore";
import { isBetween } from "@puzzl/core/lib/math/number";
import { IResult } from "app/data/search/IResult";
import { ResultType } from "app/data/search/ResultType";
import { Web3EthApi } from "app/data/web3/Web3EthApi";
import { BlockType } from "web3/eth/types";

export class Search {
    constructor(
        private web3EthApi: Web3EthApi,
        private blockStateStore: BlockStateStore
    ) {

    }

    async search(query: string) {
        // If it's a block number, return immediately
        if (query.match(/^[0-9]+$/)) {
            let blockNo = parseInt(query, 10);
            let latestBlockNo = this.blockStateStore.getLatest();
            if (!latestBlockNo) {
                throw new Error(`Latest block should be set by now`);
            }
            let result: IResult = {
                type: ResultType.Block,
                blockNumber: blockNo
            };
            return isBetween(blockNo, 0, latestBlockNo) ? result : void 0;
        }

        // If it looks like an account address, return immediately
        let accountMatch = query.match(/^(0x)?([0-9a-f]{40})$/i);
        if (accountMatch) {
            let result: IResult = {
                type: ResultType.Account
            };
            return result;
        }

        // If it looks like a regular tx / block
        let hashMatch = query.match(/^(0x)?([0-9a-f]{64})$/i);
        if (hashMatch) {
            let txResult = await this.web3EthApi.getTransaction(`0x${hashMatch[2].replace(/^0x/, "")}`);

            if (txResult) {
                let result: IResult = {
                    type: ResultType.Tx
                };
                return result;
            } else {
                let blockResult = await
                this.web3EthApi.getBlockByHash(`0x${hashMatch[2].replace(/^0x/, "")}` as BlockType);
                if (blockResult) {
                    let result: IResult = {
                        type: ResultType.Block,
                        blockNumber: blockResult.number
                    };
                    return result;
                }
            }
        }
        // Otherwise, no results
        return void 0;
    }
}
