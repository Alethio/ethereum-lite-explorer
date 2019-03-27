import * as React from "react";
import { Translation } from "app/Translation";
import { ITxDetails } from "app/data/tx/details/ITxDetails";

export interface ITxStatusProps {
    tx: ITxDetails;
    translation: Translation;
}

export class TxStatus extends React.Component<ITxStatusProps> {
    render() {
        // let tx = this.props.tx;
        // let translation = this.props.translation;

        return (
            // <TooltipRegular placement="right" content={
            //     (tx.receipt.status ?
            //         translation.get("txView.content.txStatus.ok") :
            //         translation.get("txView.content.txStatus.error"))
            // }>
            //     <ValueBox
            //         colors={tx.receipt.status ? "highlight" : "error"}
            //         Icon={tx.receipt.status ? StatusOkIcon : ErrorIcon}
            //         />
            // </TooltipRegular>
            <div/>
        );
    }
}
