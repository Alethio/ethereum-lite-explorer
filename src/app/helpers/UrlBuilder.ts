export class UrlBuilder {
    getBlock(blockNumber: number) {
        return `/block/${blockNumber}`;
    }

    getTx(txHash: string) {
        return `/tx/0x${txHash.replace(/^0x/, "")}`;
    }

    getCm(txHash: string, txValidationIndex: number) {
        return `/tx/0x${txHash.replace(/^0x/, "")}/cm/${txValidationIndex}`;
    }

    getAccount(accountAddr: string) {
        return `/account/0x${accountAddr.replace(/^0x/, "")}`;
    }

    getUncle(blockNr: number, uncleIndex: number) {
        return `/block/${blockNr}/uncle/${uncleIndex}`;
    }

    getRoot() {
        return "/";
    }

    getPrivacyPolicy() {
        return "/privacy-policy";
    }
}
