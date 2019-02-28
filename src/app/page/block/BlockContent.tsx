import * as React from "react";
import { LayoutRow } from "ethstats-ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "ethstats-ui/lib/layout/content/LayoutRowItem";
import { Label } from "ethstats-ui/lib/data/Label";
import { BlockNumberBox } from "app/components/content/box/block/BlockNumberBox";
import { TimeElapsedBox } from "app/components/content/box/TimeElapsedBox";
import { ConfirmationsBox } from "app/components/content/box/block/ConfirmationsBox";
import { BlockHashBox } from "app/components/content/box/block/BlockHashBox";
import { ParentHashBox } from "app/components/content/box/block/ParentHashBox";
import { BlockNonceBox } from "app/components/content/box/block/BlockNonceBox";
import { BlockSizeBox } from "app/components/content/box/block/BlockSizeBox";
import { Spacer } from "ethstats-ui/lib/layout/Spacer";
import { TxCountBox } from "app/components/content/box/block/TxCountBox";
import { TxHighlightSelector } from "app/page/block/txHighlight/TxHighlightSelector";
import { ViewSelectorBox } from "app/page/block/ViewSelectorBox";
import { TxsViews } from "app/page/block/TxsViews";
import { AddressHashBox } from "app/components/content/box/account/AddressHashBox";
import { NumberBox } from "ethstats-ui/lib/data/box/NumberBox";
import { GasUsedValueBox } from "ethstats-ui/lib/data/box/GasUsedValueBox";
import { DifficultyBox } from "ethstats-ui/lib/data/box/DifficultyBox";
import { DecodedHexData } from "ethstats-ui/lib/data/hex/DecodedHexData";
import { HexData } from "ethstats-ui/lib/data/hex/HexData";
import { Translation } from "app/Translation";
import { IBlockDetails } from "app/data/block/details/IBlockDetails";
import { AppConfig } from "app/AppConfig";
import { HighlightFields } from "app/page/block/txHighlight/HighlightFields";
import { ITxLite } from "app/data/tx/ITxLite";
import { TxsViewMode } from "app/page/block/txsViews/TxsViewMode";
import { Clipboard } from "app/helpers/Clipboard";
import { GridSortingOptions } from "ethstats-ui/lib/control/grid/state/GridSortingOptions";
import { HashValueBox } from "ethstats-ui/lib/data/box/HashValueBox";
import { LayoutSection } from "ethstats-ui/lib/layout/content/LayoutSection";
import { UncleHashBox } from "app/components/content/box/uncle/UncleHashBox";
import { UnclesCountBox } from "app/components/content/box/block/UnclesCountBox";
import { AsyncData } from "app/data/AsyncData";
import { ITxDetails } from "app/data/tx/details/ITxDetails";

export interface IBlockContentProps {
    blockDetails: IBlockDetails;
    blockTxs: AsyncData<ITxDetails[]>;
    blockConfirmed: boolean;
    blockConfirmations: number | undefined;
    translation: Translation;
    appConfig: AppConfig;
    txsHighlightFields: HighlightFields<ITxLite>;
    txsViewMode: TxsViewMode;
    txsGridSortingOptions: GridSortingOptions;
    clipboard: Clipboard;
}

export class BlockContent extends React.PureComponent<IBlockContentProps> {
    render() {
        let { translation: tr, blockDetails: block, blockConfirmations, clipboard } = this.props;
        let locale = this.props.appConfig.getLocale();

        return <>
            <LayoutSection useWrapper>
                <LayoutRow minWidth={900}>
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.blockNumber.label")}</Label>
                        <BlockNumberBox noLink>{block.id}</BlockNumberBox>
                    </LayoutRowItem>
                    <LayoutRowItem>
                        {block.creationTime ?
                        <>
                        <Label>{tr.get("blockView.content.blockCreationTime.label")}</Label>
                        <TimeElapsedBox timestamp={block.creationTime}
                            translation={tr}
                            locale={locale}
                            clipboard={clipboard} />
                        </>
                        : null }
                        { blockConfirmations !== void 0 ?
                        <ConfirmationsBox
                            translation={tr}
                            locale={locale}
                            confirmations={blockConfirmations}
                            isConfirmed={this.props.blockConfirmed}
                        />
                        : null }
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.uncles.label")}</Label>
                        <UnclesCountBox locale={locale}>{block.uncles.length}</UnclesCountBox>
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow minWidth={760}>
                    <LayoutRowItem>
                        <Label>{tr.get("general.hash")}</Label>
                        <BlockHashBox clipboard={clipboard}>{block.hash}</BlockHashBox>
                    </LayoutRowItem>
                    {block.parentHash ?
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.parentHash.label")}</Label>
                        <ParentHashBox
                            linkTo={block.parentId ? url => url.getBlock(block.parentId!) : void 0}
                            clipboard={clipboard}
                        >
                            {block.parentHash}
                        </ParentHashBox>
                    </LayoutRowItem> : null }
                </LayoutRow>
                { block.uncles.length ?
                <LayoutRow>
                    <LayoutRowItem fullRow>
                        <Label>{tr.get("blockView.content.uncles.label")}</Label>
                        {block.uncles.map( (uncleHash, index) => (
                            <UncleHashBox key={uncleHash} clipboard={this.props.clipboard}
                                blockNr={block.id} uncleIndex={index}>
                                {uncleHash}
                            </UncleHashBox>
                        ))}
                    </LayoutRowItem>
                </LayoutRow>
                : null }
                <LayoutRow minWidth={710}>
                { block.nonce ?
                    <LayoutRowItem>
                        <Label>{tr.get("general.nonce")}</Label>
                        <BlockNonceBox>{block.nonce}</BlockNonceBox>
                    </LayoutRowItem>
                        : null }
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.blockSize.label")}</Label>
                        <BlockSizeBox bytes={block.byteSize} locale={locale} translations={{
                            bytes: tr.get("general.bytes")
                        }} />
                    </LayoutRowItem>
                </LayoutRow>
            </LayoutSection>
            <LayoutRow minWidth={610}>
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.transactions.label")}</Label>
                    <TxCountBox>{block.transactions.length}</TxCountBox>
                </LayoutRowItem>
                { block.transactions.length ?
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.transactionsHighlight.label")}</Label>
                    <TxHighlightSelector fields={this.props.txsHighlightFields} translation={tr} />
                    <ViewSelectorBox txsViewMode={this.props.txsViewMode} />
                </LayoutRowItem>
                : null }
            </LayoutRow>
            { block.transactions.length ?
            <>
                <TxsViews
                    txsViewMode={this.props.txsViewMode}
                    transactions={block.transactions}
                    highlightFields={this.props.txsHighlightFields}
                    gridSortingOptions={this.props.txsGridSortingOptions}
                    clipboard={this.props.clipboard}
                    translation={tr}
                    locale={locale}
                />
                <Spacer height="64px" />
            </>
            : null }
            <LayoutSection useWrapper>
                { block.sha3uncles ?
                <LayoutRow minWidth={760}>
                    { block.sha3uncles ?
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.sha3Uncles.label")}</Label>
                        <HashValueBox clipboard={clipboard}>{block.sha3uncles}</HashValueBox>
                    </LayoutRowItem>
                    : null }
                </LayoutRow>
                : null }
                { block.beneficiaryAddress ?
                <LayoutRow>
                    <LayoutRowItem fullRow>
                        <Label>{tr.get("blockView.content.beneficiary.label")}</Label>
                        <AddressHashBox clipboard={clipboard}>{block.beneficiaryAddress}</AddressHashBox>
                    </LayoutRowItem>
                </LayoutRow>
                : null }
                <LayoutRow minWidth={760}>
                    <LayoutRowItem>
                        <Label>{tr.get("general.gasLimit")}</Label>
                        <NumberBox value={block.gasLimit} locale={locale} />
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{tr.get("general.gasUsed")}</Label>
                        <GasUsedValueBox value={block.gasUsed} limit={block.gasLimit} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.difficulty.label")}</Label>
                        <DifficultyBox value={block.difficulty} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.extraData.label")}</Label>
                        <DecodedHexData data={block.extraData} clipboard={clipboard} />
                    </LayoutRowItem>
                </LayoutRow>
                { block.mixHash ?
                <LayoutRow minWidth={760}>
                    { block.mixHash ?
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.mixHash.label")}</Label>
                        <HashValueBox clipboard={clipboard}>{block.mixHash}</HashValueBox>
                    </LayoutRowItem>
                    : [] }
                </LayoutRow>
                : null }
            </LayoutSection>
            <LayoutSection useWrapper>
                <LayoutRow>
                    <LayoutRowItem fullRow autoHeight>
                        <Label>{tr.get("blockView.content.logsBloom.label")}</Label>
                        <HexData data={block.logsBloom} clipboard={clipboard} />
                    </LayoutRowItem>
                </LayoutRow>
            </LayoutSection>
        </>;
    }
}
