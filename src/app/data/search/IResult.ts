import { ResultType } from "app/data/search/ResultType";

export interface IResult {
    type: ResultType;
    /** If result is a block, we need the block number to build the redirect URL */
    blockNumber?: number;
}
