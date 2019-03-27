// tslint:disable:no-string-literal
import { readResultType } from "app/data/search/readResultType";
import { IResult } from "app/data/search/IResult";

export class ResultReader {
    read(data: any) {
        let result: IResult = {
            type: readResultType(data["entity"]),
            blockNumber: data["data"] ? Number(data["data"]["number"]) : void 0
        };

        return result;
    }
}
