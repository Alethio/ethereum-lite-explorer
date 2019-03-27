import { TxsViewMode } from "app/page/block/txsViews/TxsViewMode";
import { HighlightFields } from "app/page/block/txHighlight/HighlightFields";
import { ITxLite } from "app/data/tx/ITxLite";
import { GridSortingOptions } from "ethstats-ui/lib/control/grid/state/GridSortingOptions";

export class BlockPageSharedState {
    constructor(
        public txsViewMode: TxsViewMode,
        public txsHighlightFields: HighlightFields<ITxLite>,
        public txsGridSortingOptions: GridSortingOptions
    ) {

    }
}
