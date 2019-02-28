import { IBlockValue } from "app/data/block/value/IBlockValue";
import { BlockType } from "web3/eth/types";

export class Web3EthApi {
    constructor( private web3Eth: import ("web3")) {
    }

    async getBlock(blockNumber: number) {
        return (await this.web3Eth.eth.getBlock(blockNumber, true)) || void 0;
    }

    async getBlockByHash(hash: BlockType) {
        return (await this.web3Eth.eth.getBlock(hash, true)) || void 0;
    }

    async getBlockRangeTransactionCount(rangeStart: number, rangeEnd: number) {
        let resultsPromises: Promise<IBlockValue | undefined>[] = [];
        for (let i = rangeStart; i < rangeEnd; i++) {
            resultsPromises.push(
                this.web3Eth.eth.getBlockTransactionCount(i).then( result => {
                    if (!result) {
                        return void 0;
                    }
                    let blockValue: IBlockValue = {
                        id: i,
                        transactionCount: result
                    };
                    return blockValue;

                }).catch( e => {
                    return void 0;
                }
            ));
        }
        return await Promise.all(resultsPromises).then(results => results.filter(r => r !== void 0));
    }

    async getLatestBlock() {
        return this.web3Eth.eth.getBlockNumber();
    }

    async getTransaction(txHash: string) {
        return (await this.web3Eth.eth.getTransaction(txHash)) || void 0;
    }

    async getTransactionReceipt(txHash: string) {
        return (await this.web3Eth.eth.getTransactionReceipt(txHash)) || void 0;
    }

    async getTxs(hashes: string[]) {
        return await Promise.all(
            hashes.map(hash => this.web3Eth.eth.getTransaction(hash))
        );
    }

    async getTxsReceipts(hashes: string[]) {
        return await Promise.all(
            hashes.map(hash => this.web3Eth.eth.getTransactionReceipt(hash))
        );
    }

    async getAddressBalance(address: string) {
        return (await this.web3Eth.eth.getBalance(address)) || void 0;
    }

    async getAddressCode(address: string) {
        return (await this.web3Eth.eth.getCode(address)) || void 0;
    }

    async getUncle(blockHashOrNumber: string | number, uncleIndex: number) {
        return (await this.web3Eth.eth.getUncle(blockHashOrNumber, uncleIndex));
    }

    async getPeerCount() {
        return (await this.web3Eth.eth.net.getPeerCount());
    }
}
