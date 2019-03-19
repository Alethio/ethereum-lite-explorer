// tslint:disable:no-string-literal
import { IAccountDetails } from "./IAccountDetails";
import { BigNumber } from "app/util/BigNumber";

export class AccountDetailsReader {
    read(address: string, balance: BigNumber, code: string) {
        let type = code && code !== "0x" ? "Contract Account" : "External Account";
        let account: IAccountDetails = {
            address,
            type,
            balance: new BigNumber(balance),
            accountCode: code && code !== "0x" ? code : "",
            hasContractAccountCode: Boolean(code)
        };
        return account;
    }
}
