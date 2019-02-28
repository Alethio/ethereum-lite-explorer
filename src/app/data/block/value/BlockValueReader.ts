// tslint:disable:no-string-literal
import { IBlockValue } from "app/data/block/value/IBlockValue";

export class BlockValueReader {
    read(data: any) {
        if (typeof data !== "object") {
            throw new Error(`Expected an object but got "${typeof data}"`);
        }
        let blockValue: IBlockValue = {
            id: data["id"],
            transactionCount: Number(data["transactionCount"])
        };

        return blockValue;
    }
}
