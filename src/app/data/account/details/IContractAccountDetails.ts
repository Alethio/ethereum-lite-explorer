import { IAccountDetails } from "app/data/account/details/IAccountDetails";

export interface IContractAccountDetails extends IAccountDetails {
    contractId: number;
}
