import { BigNumber } from "app/util/BigNumber";

export interface IAccountDetails {
    address: string;
    type: string;
    balance: BigNumber;
    accountCode: string;
    hasContractAccountCode: boolean;
}
