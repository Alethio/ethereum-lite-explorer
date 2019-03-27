// tslint:disable:no-string-literal
import { EtherscanContractDataSource } from "app/data/account/details/contract/dataSource/EtherscanContractDataSource";
import { EthstatsContractDataSource } from "app/data/account/details/contract/dataSource/EthstatsContractDataSource";

export function readContractDataSource(dataAlethioComments?: any) {
    let dataSource = dataAlethioComments && dataAlethioComments["contractDataSource"] || "";
    if (dataSource && /^(.*)(etherscan)(.*)$/.test(dataSource)) {
        return new EtherscanContractDataSource();
    }
    return new EthstatsContractDataSource();
}
