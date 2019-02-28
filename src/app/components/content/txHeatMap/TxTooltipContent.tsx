import * as React from "react";
import { ITxLite } from "app/data/tx/ITxLite";
import { TxHashBox } from "app/components/content/box/tx/TxHashBox";
import { AddressHashBox } from "app/components/content/box/account/AddressHashBox";
import { Label } from "ethstats-ui/lib/data/Label";
import { Translation } from "app/Translation";
import { EthValueBox } from "ethstats-ui/lib/data/box/EthValueBox";
import styled from "app/styled-components";
import { Clipboard } from "app/helpers/Clipboard";

export interface ITxTooltipContentProps {
    tx: ITxLite;
    clipboard: Clipboard;
    translation: Translation;
    locale: string;
}

const TxTooltipContentWrapper = styled.div`
    display: flex;
    padding: 8px 8px 8px 0;

    > * {
        margin-left: 8px;
    }
`;

export class TxTooltipContent extends React.Component<ITxTooltipContentProps> {
    render() {
        let { tx, translation, clipboard } = this.props;
        return (
            <TxTooltipContentWrapper>
                <TxHashBox variant="small" clipboard={clipboard}>{tx.hash}</TxHashBox>
                <Label>{translation.get("general.from")}</Label>
                <AddressHashBox variant="small" clipboard={clipboard}>{tx.from}</AddressHashBox>
                <Label>{translation.get("general.to")}</Label>
                <AddressHashBox variant="small" clipboard={clipboard}>{tx.to}</AddressHashBox>
                <div style={{paddingLeft: 8}}>
                    <Label arrow disabled={tx.value.isZero()}>{translation.get("txTooltip.value.label")}</Label>
                </div>
                <div style={{display: "flex"}}>
                    <EthValueBox variant="smallThin" wei={tx.value} locale={this.props.locale} />
                </div>
            </TxTooltipContentWrapper>
        );
    }
}
