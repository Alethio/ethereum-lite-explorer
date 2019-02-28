import { ITxLite } from "app/data/tx/ITxLite";
import { HighlightFields, HighlightFieldKey } from "app/page/block/txHighlight/HighlightFields";

export class HighlightFieldsPartial extends HighlightFields<ITxLite> {
    constructor() {
        super();
        this.fields = [{
            key: HighlightFieldKey.Value,
            getLabel: t => t.get("blockView.content.transactionsHighlight.value.label"),
            getData: tx => tx.value
        }, {
            key: HighlightFieldKey.GasPrice,
            getLabel: t => t.get("general.gasPrice"),
            getData: tx => tx.gasPrice
        }, {
            key: HighlightFieldKey.GasLimit,
            getLabel: t => t.get("general.gasLimit"),
            getData: tx => tx.gasLimit
        }];
        this.setSelectedField(HighlightFieldKey.Value);
    }
}
