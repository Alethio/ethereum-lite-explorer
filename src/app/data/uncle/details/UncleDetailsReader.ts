import { IUncleDetails } from "app/data/uncle/details/IUncleDetails";
import { BigNumber } from "app/util/BigNumber";

// tslint:disable:no-string-literal

export class UncleDetailsReader {
    read(data: any, blockNr: number, uncleIndex: number) {
        let uncleNumber = Number(data["number"]);
        let uncle: IUncleDetails = {
            id: uncleNumber,
            position: uncleIndex,
            creationTime: Number(data["timestamp"]),
            hash: data["hash"],
            parentId: blockNr,
            nonce: data["nonce"],
            sha3uncles: data["sha3Uncles"],
            beneficiaryAddress: data["miner"],
            gasLimit: new BigNumber(data["gasLimit"]),
            difficulty: new BigNumber(data["difficulty"]),
            extraData: String(data["extraData"]),
            mixHash: String(data["mixHash"])
        };

        return uncle;
    }
}
