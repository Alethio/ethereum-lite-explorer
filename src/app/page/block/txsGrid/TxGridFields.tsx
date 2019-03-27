import { Translation } from "app/Translation";
import { GridFields } from "ethstats-ui/lib/control/grid/state/GridFields";
import { ITxGridFieldKeys, IHighlightFn } from "app/page/block/TxsGrid";
import { EthRenderer } from "ethstats-ui/lib/data/gridRenderer/EthRenderer";
import { TxLinkRenderer } from "app/components/content/grid/dataRenderer/tx/TxLinkRenderer";
import { AccountLinkRenderer } from "app/components/content/grid/dataRenderer/account/AccountLinkRenderer";
import { ITxLite } from "app/data/tx/ITxLite";

export class TxGridFields extends GridFields<ITxLite> {
    constructor(t: Translation, locale: string, highlightFn: IHighlightFn) {
        super();
        this.fields = [{
            label: t.get("general.hash"),
            fieldKey: ITxGridFieldKeys.Hash,
            type: "string",
            isSortable: true,
            selected: true,
            alwaysVisible: true,
            getFieldValue: f => f.hash,
            renderer: new TxLinkRenderer(f => f.hash)
        }, {
            label: t.get("general.from"),
            fieldKey: ITxGridFieldKeys.From,
            type: "string",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.from,
            renderer: new AccountLinkRenderer(f => f.from)
        }, {
            label: t.get("general.to"),
            fieldKey: ITxGridFieldKeys.To,
            type: "string",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.to,
            renderer: new AccountLinkRenderer(f => f.to)
        }, {
            label: t.get("general.valueEth"),
            fieldKey: ITxGridFieldKeys.Value,
            type: "number",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.value,
            renderer: new EthRenderer(
                locale,
                f => f.value
            )
        }];
    }
}
