export class Web3Factory {
    private Web3: typeof import("web3") | void;

    async create(nodeUrl: string) {
        if (!this.Web3) {
            this.Web3 = (await import("web3")).default;
        }

        return new this.Web3(nodeUrl);
    }

    destroy() {
        if (this.Web3) {
            this.Web3 = void 0;
        }
    }
}
