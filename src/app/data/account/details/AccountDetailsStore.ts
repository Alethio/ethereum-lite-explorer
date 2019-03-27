import { AccountDetailsApi } from "./AccountDetailsApi";

export class AccountDetailsStore {
    constructor(
        // No caching because data might update in real-time
        private accountDetailsApi: AccountDetailsApi
    ) {

    }

    async fetch(accountHash: string) {
        let accountDetails = await this.accountDetailsApi.fetch(accountHash);
        return accountDetails;
    }
}
