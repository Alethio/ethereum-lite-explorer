import { Web3EthApi } from "app/data/web3/Web3EthApi";
import { TxDetailsFullReader } from "app/data/tx/details/ITxDetailsFullReader";

export class TxDetailsApi {
    constructor(
        private web3EthApi: Web3EthApi,
        private txDetailsFullReader: TxDetailsFullReader
    ) {

    }

    async fetch(txHash: string) {
        let txDataPromise = this.web3EthApi.getTransaction(`0x${txHash.replace(/^0x/, "")}`);
        let txReceiptPromise = this.web3EthApi.getTransactionReceipt(`0x${txHash.replace(/^0x/, "")}`);

        let [txData, txReceipt] = await Promise.all([txDataPromise, txReceiptPromise]);

        if (!txData) {
            throw new Error(`No data found for txHash "${txHash}"`);
        }
        if (!txReceipt) {
            throw new Error(`No receipt found  for txHash "${txHash}"`);
        }

        return this.txDetailsFullReader.read(txData, txReceipt);
    }
}
