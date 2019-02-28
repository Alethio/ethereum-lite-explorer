import * as React from "react";
import { LayoutRow } from "ethstats-ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "ethstats-ui/lib/layout/content/LayoutRowItem";
import { Label } from "ethstats-ui/lib/data/Label";
import { TxHashBox } from "app/components/content/box/tx/TxHashBox";
import { EthValueBox } from "ethstats-ui/lib/data/box/EthValueBox";
import { BlockNumberBox } from "app/components/content/box/block/BlockNumberBox";
import { ConfirmationsBox } from "app/components/content/box/block/ConfirmationsBox";
import { NumberBox } from "ethstats-ui/lib/data/box/NumberBox";
import { AddressHashBox } from "app/components/content/box/account/AddressHashBox";
import { GweiValueBox } from "ethstats-ui/lib/data/box/GweiValueBox";
import { LayoutSection } from "ethstats-ui/lib/layout/content/LayoutSection";
import { HexData } from "ethstats-ui/lib/data/hex/HexData";
import { Translation } from "app/Translation";
import { ITxDetails } from "app/data/tx/details/ITxDetails";
import { TxStatus } from "app/page/tx/TxStatus";
import { Clipboard } from "app/helpers/Clipboard";
import { ILogger } from "app/util/log/ILogger";
import { GasUsedValueBox } from "ethstats-ui/lib/data/box/GasUsedValueBox";
import { ValueBox } from "ethstats-ui/lib/layout/content/box/ValueBox";
import { ErrorIcon } from "ethstats-ui/lib/icon/ErrorIcon";
import { IBlockDetails } from "app/data/block/details/IBlockDetails";
import { TimeElapsedBox } from "app/components/content/box/TimeElapsedBox";

export interface ITxContentProps {
    txHash: string;
    txDetails: ITxDetails;
    blockDetails: IBlockDetails;
    /** If it's a mined tx, pass the number of confirmations for parent block */
    blockConfirmations: number | undefined;
    blockConfirmed: boolean;
    translation: Translation;
    locale: string;
    clipboard: Clipboard;
    logger: ILogger;
}

export class TxContent extends React.PureComponent<ITxContentProps> {
    render() {
        let { translation: tr, txDetails: tx, locale, blockConfirmations, clipboard, blockDetails: block } = this.props;
        let txPayload = tx ? tx.payload : void 0;

        return <>
            <LayoutSection useWrapper>
                <LayoutRow minWidth={960}>
                    <LayoutRowItem>
                        <Label>{tr.get("general.hash")}</Label>
                        <TxHashBox noLink clipboard={clipboard}>{this.props.txHash}</TxHashBox>
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label arrow disabled={tx.value.isZero()}>{tr.get("txView.content.txValue.label")}</Label>
                        <EthValueBox wei={tx.value} locale={locale} />
                        <TxStatus tx={tx} translation={tr} />
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow minWidth={780}>
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.blockNumber.label")}</Label>
                        <BlockNumberBox>{tx.block.id}</BlockNumberBox>
                    </LayoutRowItem>
                    <LayoutRowItem>
                        {block && block.creationTime ?
                            <>
                                <Label>{tr.get("blockView.content.blockCreationTime.label")}</Label>
                                <TimeElapsedBox timestamp={block.creationTime}
                                    translation={tr}
                                    locale={locale}
                                    clipboard={clipboard} />
                            </>
                            : null}
                        {blockConfirmations !== void 0 ?
                            <ConfirmationsBox
                                translation={tr}
                                locale={locale}
                                confirmations={blockConfirmations}
                                isConfirmed={this.props.blockConfirmed}
                            />
                            : null}
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow minWidth={650}>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.txIndex.label")}</Label>
                        <NumberBox value={tx.txIndex} locale={locale} />
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{tr.get("general.nonce")}</Label>
                        <NumberBox value={tx.nonce} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow minWidth={650}>
                    <LayoutRowItem>
                        <Label>{tr.get("general.from")}</Label>
                        <AddressHashBox clipboard={clipboard}>{tx.from}</AddressHashBox>
                    </LayoutRowItem>
                    { tx.to && <LayoutRowItem>
                        <Label>{tr.get("general.to")}</Label>
                        <AddressHashBox clipboard={clipboard}>{tx.to}</AddressHashBox>
                    </LayoutRowItem> }
                    { tx.receipt && tx.receipt.contractAddress && <LayoutRowItem>
                        <Label>{tr.get("general.creates")}</Label>
                        <AddressHashBox clipboard={clipboard}>{tx.receipt.contractAddress}</AddressHashBox>
                    </LayoutRowItem> }
                </LayoutRow>
            </LayoutSection>
            <LayoutSection useWrapper>
                <LayoutRow minWidth={600}>
                    <LayoutRowItem>
                        <Label>{tr.get("general.gasLimit")}</Label>
                        <NumberBox value={tx.gasLimit} locale={locale} />
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{tr.get("general.gasPrice")}</Label>
                        <GweiValueBox wei={tx.gasPrice} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow>
                {tx.receipt ?
                <LayoutRow minWidth={750}>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.gasUsed.label")}</Label>
                        <GasUsedValueBox value={tx.receipt.gasUsed} limit={tx.gasLimit} locale={locale} />
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.txFee.label")}</Label>
                        <EthValueBox wei={tx.receipt.gasUsed.multipliedBy(tx.gasPrice)} decimals={9} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow> : null }
                {tx.receipt ?
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.cumulativeGasUsed.label")}</Label>
                        <NumberBox value={tx.receipt.cumulativeGasUsed} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow> : null }
            </LayoutSection>
            {tx.receipt && !tx.receipt.status ?
            <LayoutSection>
                    <LayoutRow>
                        <LayoutRowItem>
                            <Label>{tr.get("txView.content.error.label")}</Label>
                            <ValueBox colors="error">{tr.get("txView.content.error.genericValue")}</ValueBox>
                            <ErrorIcon />
                        </LayoutRowItem>
                    </LayoutRow>
            </LayoutSection> : null }
            { txPayload ?
                <LayoutRow>
                    <LayoutRowItem fullRow autoHeight>
                        <Label>{tr.get("txView.content.inputData.label")}</Label>
                        <HexData data={txPayload} clipboard={clipboard} />
                    </LayoutRowItem>
                </LayoutRow>
            : null }
        </>;
    }
}
