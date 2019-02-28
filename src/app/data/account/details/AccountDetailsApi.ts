import { AccountDetailsReader } from "./AccountDetailsReader";
import { Web3EthApi } from "app/data/web3/Web3EthApi";

export class AccountDetailsApi {
    constructor(
        private web3EthApi: Web3EthApi,
        private accountDetailsReader: AccountDetailsReader
    ) {

    }

    async fetch(accountAddress: string) {
        let accountBalancePromise = this.web3EthApi.getAddressBalance(`0x${accountAddress.replace(/^0x/, "")}`);
        let accountCodePromise = this.web3EthApi.getAddressCode(`0x${accountAddress.replace(/^0x/, "")}`);

        let [accountBalance, accountCode] = await Promise.all([accountBalancePromise, accountCodePromise]);

        if (!accountBalance) {
            throw new Error(`No balance found for address "${accountBalance}"`);
        }
        if (!accountCode) {
            throw new Error(`No contract code found  for address "${accountBalance}"`);
        }
        return this.accountDetailsReader.read(accountAddress.replace(/^0x/, ""), accountBalance, accountCode);
    }
}
