import { AccountType } from "./AccountType";

const accountTypeMap = new Map<string, AccountType>()
    .set("ExternalAccount", AccountType.External)
    .set("ContractAccount", AccountType.Contract);

export function readAccountType(type: string) {
    if (!accountTypeMap.has(type)) {
        return AccountType.Unknown;
    }
    return accountTypeMap.get(type)!;
}
