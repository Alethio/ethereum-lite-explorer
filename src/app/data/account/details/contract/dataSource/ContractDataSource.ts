export enum SourceType {
    Ethstats,
    Etherscan
}

export interface IContractDataSource {
    type: SourceType;
    getUrl(address: string): string;
}
