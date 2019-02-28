import { IContractDataSource, SourceType } from "./ContractDataSource";

export class EthstatsContractDataSource implements IContractDataSource {
    type = SourceType.Ethstats;

    getUrl(address: string) {
        return "";
    }
}
