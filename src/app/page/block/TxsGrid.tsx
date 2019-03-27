import * as React from "react";
import { GridSortingOptions } from "ethstats-ui/lib/control/grid/state/GridSortingOptions";
import { Grid } from "app/components/content/grid/Grid";
import { GridFields, IGridField } from "ethstats-ui/lib/control/grid/state/GridFields";
import { Translation } from "app/Translation";
import { ITxLite } from "app/data/tx/ITxLite";
import { TxGridFields } from "app/page/block/txsGrid/TxGridFields";
import styled from "app/styled-components";
import { minMaxLogScale } from "app/helpers/minMaxLogScale";
import { BigNumber } from "app/util/BigNumber";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

const TxsGridRoot = styled.div`
    margin-top: 16px;
`;

export enum ITxGridFieldKeys {
    Type = "type",
    Hash = "hash",
    From = "from",
    To = "to",
    Value = "value",
    Fee = "fee"
}

export interface IHighlightFn {
    (f: ITxLite): boolean;
}

interface ITxGridProps {
    transactions: ITxLite[];
    locale: string;
    translation: Translation;
    gridSortingOptions: GridSortingOptions;
    highlightThreshold: number;
    highlightDataSelector(t: ITxLite): number | BigNumber;
}

@observer
export class TxsGrid extends React.Component<ITxGridProps> {
    @observable.ref
    private gridPartialFields: GridFields<ITxLite>;
    private gridSortingOptions: GridSortingOptions;
    private scaledHighlightValues: Map<ITxLite, number>;

    constructor(props: ITxGridProps) {
        super(props);
        this.gridPartialFields = new TxGridFields(props.translation, props.locale, this.highlight);
        this.gridSortingOptions = this.props.gridSortingOptions;
        this.updateSortingField(props);
    }

    @action
    componentDidUpdate(prevProps: ITxGridProps) {
        if (this.props.translation !== prevProps.translation) {
            this.gridPartialFields = new TxGridFields(this.props.translation, this.props.locale, this.highlight);
        }
    }

    /**
     * If switching between Full and partial tx lite objects, the old sorting field object may have changed
     */
    private updateSortingField(props: ITxGridProps) {
        const oldSortField = this.gridSortingOptions.field;
        if (!oldSortField) {
            return;
        }

        let newField = (this.gridPartialFields.gridFields as IGridField<{}>[])
            .find(f => f.fieldKey === oldSortField.fieldKey);

        // Updates with new field object with the same key or unsets it if none matched
        this.gridSortingOptions.field = newField;
    }

    render() {
        let highlightValues = this.props.transactions.map(tx => this.props.highlightDataSelector(tx));
        this.scaledHighlightValues = this.computeScaledHighlightValues(highlightValues);

        const rows = this.props.transactions.map(tx => {
            return {
                key: tx.hash,
                data: tx
            };
        });
        return (
            <TxsGridRoot>
                <Grid<ITxLite>
                    rows={rows}
                    fields={this.gridPartialFields}
                    sortingOptions={this.gridSortingOptions}
                    translation={this.props.translation}
                />
            </TxsGridRoot>
        );
    }

    private computeScaledHighlightValues(values: (number | BigNumber)[]) {
        // Creates a map of tx data objects to scaled values. We do this because the link between the data item and
        // original array index is lost in rendering
        let scaledHighlightValues = new Map<ITxLite, number>();

        minMaxLogScale(values).forEach((v, i) => {
            scaledHighlightValues.set(this.props.transactions[i], v);
        });

        return scaledHighlightValues;
    }

    private highlight = (data: ITxLite) => {
        let percentLog = this.scaledHighlightValues.get(data);
        if (percentLog === void 0) {
            throw new Error(`Missing scaledHighlightValues for txHash "${data.hash}"`);
        }
        return percentLog > this.props.highlightThreshold;
    }
}
