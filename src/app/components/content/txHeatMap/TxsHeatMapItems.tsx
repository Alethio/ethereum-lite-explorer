import * as React from "react";
import { ITxLite } from "app/data/tx/ITxLite";
import { TxsHeatMapItem } from "app/components/content/txHeatMap/TxsHeatMapItem";

export interface ITxsHeatMapItemsProps {
    transactions: ITxLite[];
    bubbleSizes: number[];
    highlightThreshold: number;
    onTxMouseEnter(tx: ITxLite): void;
    onTxMouseLeave(tx: ITxLite): void;
}

export class TxsHeatMapItems extends React.PureComponent<ITxsHeatMapItemsProps> {
    render() {
        let { bubbleSizes, highlightThreshold } = this.props;

        return <>
            {this.props.transactions.map((tx, idx) => (
                <TxsHeatMapItem
                    key={idx}
                    tx={tx}
                    bubbleSize={bubbleSizes[idx]}
                    highlightThreshold={highlightThreshold}
                    onMouseEnter={this.props.onTxMouseEnter}
                    onMouseLeave={this.props.onTxMouseLeave}
                />
            ))}
        </>;
    }
}
