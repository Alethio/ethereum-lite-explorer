import { BigNumber } from "app/util/BigNumber";

export interface ITxDetails {
    hash: string;
    from: string;
    to: string;
    value: BigNumber;
    nonce: number;
    gasLimit: BigNumber;
    gasPrice: BigNumber;
    payload: string | undefined;
    receipt?: {
        blockHash: string;
        contractAddress?: string;
        cumulativeGasUsed: BigNumber;
        gasUsed: BigNumber;
        logsBloom: string;
        status: boolean;
    };
    block: {
        id: number;
    };
    txIndex: number;
}
