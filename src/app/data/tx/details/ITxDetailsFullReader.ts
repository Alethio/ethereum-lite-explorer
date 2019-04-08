// tslint:disable:no-string-literal
import { ITxDetails } from "app/data/tx/details/ITxDetails";
import { BigNumber } from "app/util/BigNumber";

export class TxDetailsFullReader {
    read(data: any, receipt: any) {
        let tx: ITxDetails = {
            hash: data["hash"],
            from: data["from"],
            to: data["to"] || void 0,
            value: new BigNumber(data["value"]),
            nonce: Number(data["nonce"]),
            gasLimit: new BigNumber(data["gas"]),
            gasPrice: new BigNumber(data["gasPrice"]),
            payload: data["input"] || void 0,
            receipt: {
                blockHash: receipt["blockHash"],
                contractAddress: receipt["contractAddress"] || void 0,
                cumulativeGasUsed: new BigNumber(receipt["cumulativeGasUsed"]),
                gasUsed: new BigNumber(receipt["gasUsed"]),
                logsBloom: receipt["logsBloom"],
                status: receipt["status"] || true
            },
            block: {
                id: Number(data["blockNumber"])
            },
            txIndex: Number(data["transactionIndex"])
        };
        return tx;
    }
}
