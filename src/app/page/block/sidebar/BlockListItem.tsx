import * as React from "react";
import styled from "app/styled-components";
import { BlockListItemBar } from "./BlockListItemBar";
import { Tooltip } from "ethstats-ui/lib/overlay/tooltip/Tooltip";
import { BlockNumberBox } from "app/components/content/box/block/BlockNumberBox";
import { TxCountBox } from "app/components/content/box/block/TxCountBox";
import { Link } from "app/components/Link";
import { Translation } from "app/Translation";

interface IWrapperProps {
    percent: number;
}

export const BlockListItemRoot = styled.div`
    cursor: pointer;
`;

const BlockListItemHitBox = styled.div`
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 81px;
    padding-right: 83px;

    ${BlockListItemRoot}:first-child & {
        padding-top: 0;
    }
    ${BlockListItemRoot}:last-child & {
        padding-bottom: 0;
    }
`;

const BlockListItemBarWrapper = styled<IWrapperProps, "div">("div")`
    width: ${props => props.percent}%;
    min-width: 8px;
`;

interface IBlockListItemProps {
    blockNumber: number;
    transactionCount: number | undefined;
    percent: number;
    active?: boolean;
    translation: Translation;
}

export class BlockListItem extends React.PureComponent<IBlockListItemProps> {
    private barEl: HTMLElement;

    render() {
        let { blockNumber, transactionCount, percent, translation: tr } = this.props;

        return (
            <BlockListItemRoot>
                <Tooltip
                    placement="right"
                    nonInteractive
                    showDelay={0}
                    hideDelay={0}
                    offset={10}
                    referenceElement={() => this.barEl}
                    content={
                        <div style={{padding: 8, display: "flex"}}>
                            <BlockNumberBox variant="small" noLink>{blockNumber}</BlockNumberBox>
                            { transactionCount !== void 0 ?
                            <TxCountBox variant="small">
                                {tr.get("blockView.content.blockSummary.txs.label")
                                    .replace(/%d/, "" + transactionCount)}
                            </TxCountBox>
                            : null }
                        </div>
                    }
                >
                    <Link to={url => url.getBlock(blockNumber)}>
                        <BlockListItemHitBox>
                            <BlockListItemBarWrapper percent={percent}>
                                <BlockListItemBar active={this.props.active} innerRef={ref => this.barEl = ref!} />
                            </BlockListItemBarWrapper>
                        </BlockListItemHitBox>
                    </Link>
                </Tooltip>
            </BlockListItemRoot>
        );
    }
}
