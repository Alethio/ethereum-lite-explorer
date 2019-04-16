import { BlockStatus } from "app/data/block/BlockStatus";
import { BigNumber } from "app/util/BigNumber";
import { ITxDetails } from "app/data/tx/details/ITxDetails";
import { IIBFTDetails } from "app/data/block/details/IIBFTDetails";

export interface IBlockDetails {
    status: BlockStatus.Mined;
    /** Block number */
    id: number;
    /** Unix timestamp */
    creationTime: number;
    hash: string;
    parentHash: string;
    /** Parent block number (always id - 1) */
    parentId: number;
    nonce?: string;
    byteSize: number;
    sha3uncles: string;
    beneficiaryAddress: string;
    gasUsed: BigNumber;
    gasLimit: BigNumber;
    difficulty: BigNumber;
    extraData: string;
    ibftExtraData?: IIBFTDetails;
    logsBloom: string;
    mixHash: string;
    transactionCount: number;
    transactions: ITxDetails[];
    /** Hashes of uncles */
    uncles: string[];
}
