import * as React from "react";
import { observer } from "mobx-react";
import { TxsViewMode } from "app/page/block/txsViews/TxsViewMode";
import { TxsHeatMap } from "app/components/content/txHeatMap/TxsHeatMap";
import { ITxLite } from "app/data/tx/ITxLite";
import { LayoutRow } from "ethstats-ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "ethstats-ui/lib/layout/content/LayoutRowItem";
import { TxsGrid } from "./TxsGrid";
import { Translation } from "app/Translation";
import { HighlightFields } from "app/page/block/txHighlight/HighlightFields";
import { Clipboard } from "app/helpers/Clipboard";
import { GridSortingOptions } from "ethstats-ui/lib/control/grid/state/GridSortingOptions";
import { ITxDetails } from "app/data/tx/details/ITxDetails";

export const HIGHLIGHT_THRESHOLD = 80;

interface ITxsViewsProps {
    txsViewMode: TxsViewMode;
    transactions: ITxDetails[];
    highlightFields: HighlightFields<ITxLite>;
    gridSortingOptions: GridSortingOptions;
    translation: Translation;
    clipboard: Clipboard;
    locale: string;
}

@observer
export class TxsViews extends React.Component<ITxsViewsProps> {
    constructor(props: ITxsViewsProps) {
        super(props);
        if (!props.transactions.length) {
            throw new Error(`TxsViews should not render without txs`);
        }
    }
    render() {
        let highlightByField = this.props.highlightFields.getSelectedField();
        if (this.props.txsViewMode.isHeatMapGrid) {
            return (
                <LayoutRow>
                    <LayoutRowItem fullRow autoHeight>
                        <div />
                        <div style={{ maxWidth: 600 }}>
                            <TxsHeatMap
                                transactions={this.props.transactions}
                                locale={this.props.locale}
                                highlightThreshold={HIGHLIGHT_THRESHOLD}
                                highlightDataSelector={highlightByField.getData}
                                translation={this.props.translation}
                                clipboard={this.props.clipboard}
                            />
                        </div>
                    </LayoutRowItem>
                </LayoutRow>
            );
        }
        if (this.props.txsViewMode.isTableList) {
            return (
                <TxsGrid
                    transactions={this.props.transactions}
                    highlightThreshold={HIGHLIGHT_THRESHOLD}
                    highlightDataSelector={highlightByField.getData}
                    gridSortingOptions={this.props.gridSortingOptions}
                    locale={this.props.locale}
                    translation={this.props.translation}
                />
            );
        }
        return null;
    }
}
