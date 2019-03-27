// tslint:disable:no-string-literal
import { ITxDetails } from "app/data/tx/details/ITxDetails";
import { BigNumber } from "app/util/BigNumber";

export class TxDetailsReader {
    read(data: any) {
        let tx: ITxDetails = {
            hash: data["hash"],
            from: data["from"],
            to: data["to"] ? data["to"] : "",
            value: new BigNumber(data["value"]),
            nonce: Number(data["nonce"]),
            gasLimit: new BigNumber(data["gas"]),
            gasPrice: new BigNumber(data["gasPrice"]),
            payload: data["input"] || void 0,
            block: {
                id: Number(data["blockNumber"])
            },
            txIndex: Number(data["transactionIndex"])
        };

        return tx;
    }
}
