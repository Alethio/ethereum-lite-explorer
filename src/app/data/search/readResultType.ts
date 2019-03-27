import { ResultType } from "app/data/search/ResultType";

let typeMap = new Map<string, ResultType>()
    .set("block", ResultType.Block)
    .set("uncle", ResultType.Uncle)
    .set("tx", ResultType.Tx);

export const readResultType = (type: string) => {
    if (!typeMap.has(type)) {
        throw new Error(`Unknown result type "${type}"`);
    }
    return typeMap.get(type)!;
};
