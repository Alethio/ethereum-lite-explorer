import { IAccountDetails } from "app/data/account/details/IAccountDetails";
import { IContractAccountDetails } from "app/data/account/details/IContractAccountDetails";

export function isContractAccountDetails(accountDetails: IAccountDetails): accountDetails is IContractAccountDetails {
    return accountDetails.type === "Contract Account";
}
