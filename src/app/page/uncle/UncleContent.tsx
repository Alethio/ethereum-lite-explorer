import * as React from "react";
import { LayoutRow } from "ethstats-ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "ethstats-ui/lib/layout/content/LayoutRowItem";
import { Label } from "ethstats-ui/lib/data/Label";
import { UncleNumberBox } from "app/components/content/box/uncle/UncleNumberBox";
import { TimeElapsedBox } from "app/components/content/box/TimeElapsedBox";
import { ValueBox } from "ethstats-ui/lib/layout/content/box/ValueBox";
import { UncleHashBox } from "app/components/content/box/uncle/UncleHashBox";
import { BlockNumberBox } from "app/components/content/box/block/BlockNumberBox";
import { BlockNonceBox } from "app/components/content/box/block/BlockNonceBox";
import { AddressHashBox } from "app/components/content/box/account/AddressHashBox";
import { NumberBox } from "ethstats-ui/lib/data/box/NumberBox";
import { DifficultyBox } from "ethstats-ui/lib/data/box/DifficultyBox";
import { DecodedHexData } from "ethstats-ui/lib/data/hex/DecodedHexData";
import { Translation } from "app/Translation";
import { IUncleDetails } from "app/data/uncle/details/IUncleDetails";
import { Clipboard } from "app/helpers/Clipboard";
import { HashValueBox } from "ethstats-ui/lib/data/box/HashValueBox";

export interface IUncleContentProps {
    uncleDetails: IUncleDetails;
    translation: Translation;
    locale: string;
    clipboard: Clipboard;
}

export class UncleContent extends React.PureComponent<IUncleContentProps> {
    render() {
        let { translation: tr, uncleDetails: uncle, clipboard, locale} = this.props;

        return <>
            <LayoutRow minWidth={900}>
                <LayoutRowItem>
                    <Label>{tr.get("uncleView.content.uncleNumber.label")}</Label>
                    <UncleNumberBox>{uncle.id}</UncleNumberBox>
                </LayoutRowItem>
                <LayoutRowItem>
                    {uncle.creationTime ?
                    <>
                    <Label>{tr.get("blockView.content.blockCreationTime.label")}</Label>
                    <TimeElapsedBox timestamp={uncle.creationTime}
                        translation={tr}
                        locale={locale}
                        clipboard={clipboard} />
                    </>
                    : null }
                </LayoutRowItem>
                { uncle.position !== void 0 ?
                <LayoutRowItem>
                    <Label>{tr.get("uncleView.content.position.label")}</Label>
                    <ValueBox>{uncle.position}</ValueBox>
                </LayoutRowItem>
                : null }
            </LayoutRow>
            <LayoutRow minWidth={760}>
                <LayoutRowItem>
                    <Label>{tr.get("general.hash")}</Label>
                    <UncleHashBox clipboard={clipboard} noLink
                         blockNr={uncle.parentId} uncleIndex={0}>{uncle.hash}</UncleHashBox>
                </LayoutRowItem>
                {uncle.parentId ?
                <LayoutRowItem>
                    <Label>{tr.get("uncleView.content.includedBy.label")}</Label>
                    <BlockNumberBox>{uncle.parentId}</BlockNumberBox>
                </LayoutRowItem> : null }
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("general.nonce")}</Label>
                    <BlockNonceBox>{uncle.nonce}</BlockNonceBox>
                </LayoutRowItem>
            </LayoutRow>
            { uncle.sha3uncles ?
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.sha3Uncles.label")}</Label>
                    <HashValueBox clipboard={clipboard}>{uncle.sha3uncles}</HashValueBox>
                </LayoutRowItem>
            </LayoutRow>
            : null }
            { uncle.beneficiaryAddress ?
            <LayoutRow>
                <LayoutRowItem fullRow>
                    <Label>{tr.get("blockView.content.beneficiary.label")}</Label>
                    <AddressHashBox clipboard={clipboard}>{uncle.beneficiaryAddress}</AddressHashBox>
                </LayoutRowItem>
            </LayoutRow>
            : null }
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("general.gasLimit")}</Label>
                    <NumberBox value={uncle.gasLimit} locale={locale} />
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.difficulty.label")}</Label>
                    <DifficultyBox
                        value={uncle.difficulty} locale={locale} />
                </LayoutRowItem>
            </LayoutRow>
            { uncle.extraData ?
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.extraData.label")}</Label>
                    <DecodedHexData data={uncle.extraData} clipboard={clipboard} />
                </LayoutRowItem>
            </LayoutRow>
            : null }
            { uncle.mixHash ?
            <LayoutRow>
                { uncle.mixHash ?
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.mixHash.label")}</Label>
                    <HashValueBox clipboard={clipboard}>{uncle.mixHash}</HashValueBox>
                </LayoutRowItem>
                : [] }
            </LayoutRow>
            : null }
        </>;
    }
}
