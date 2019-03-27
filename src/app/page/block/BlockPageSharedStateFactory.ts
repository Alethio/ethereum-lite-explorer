import { BlockPageSharedState } from "app/page/block/BlockPageSharedState";
import { TxsViewMode } from "app/page/block/txsViews/TxsViewMode";
import { HighlightFieldsPartial } from "app/page/block/txHighlight/HighlightFieldsPartial";
import { GridSortingOptions } from "ethstats-ui/lib/control/grid/state/GridSortingOptions";

export class BlockPageSharedStateFactory {
    create() {
        return new BlockPageSharedState(
            new TxsViewMode(),
            new HighlightFieldsPartial(),
            new GridSortingOptions()
        );
    }
}
