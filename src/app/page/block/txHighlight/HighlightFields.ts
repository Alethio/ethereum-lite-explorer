import { observable, action } from "mobx";
import { BigNumber } from "app/util/BigNumber";
import { Translation } from "app/Translation";

export enum HighlightFieldKey {
    Value = "value",
    ContractMessageCount = "cmcount",
    GasUsed = "gasused",
    GasPrice = "gasprice",
    GasLimit = "gaslimit",
    ContractCreationCount = "ccreationcount"
}

export interface IHighlightField<TTxData> {
    key: HighlightFieldKey;
    getLabel(t: Translation): string;
    getData(t: TTxData): number | BigNumber;
}

export class HighlightFields<TTxData> {
    protected fields: IHighlightField<TTxData>[];

    @observable
    protected selectedField: IHighlightField<TTxData>;

    getFields() {
        return this.fields;
    }

    getSelectedField() {
        return this.selectedField;
    }

    @action setSelectedField(key: string) {
        const field = this.fields.find((f: IHighlightField<TTxData>) => {
            return key === f.key;
        });
        if (field) {
            this.selectedField = field;
        }
    }
}
