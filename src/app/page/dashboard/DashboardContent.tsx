import * as React from "react";
import { observer } from "mobx-react";
import { Translation } from "app/Translation";
import { DashboardContentCenter } from "app/page/dashboard/DashboardContentCenter";
import styled from "app/styled-components";
import { BlockListDashboard } from "app/page/dashboard/BlockListDashboard";
import { ILogger } from "app/util/log/ILogger";
import { BlockValueStore } from "app/data/block/value/BlockValueStore";
import { Label } from "ethstats-ui/lib/data/Label";
import { LayoutRowItem } from "ethstats-ui/lib/layout/content/LayoutRowItem";
import { BlockNumberBox } from "app/components/content/box/block/BlockNumberBox";
import { TimeElapsedBox } from "app/components/content/box/TimeElapsedBox";
import { Clipboard } from "app/helpers/Clipboard";
import { AppConfig } from "app/AppConfig";
import { TxCountBox } from "app/components/content/box/block/TxCountBox";
import { UnclesCountBox } from "app/components/content/box/block/UnclesCountBox";
import { IBlockDetails } from "app/data/block/details/IBlockDetails";
import { SearchInline } from "app/components/toolbar/search/SearchInline";
import { Search } from "app/data/search/Search";
import { SearchInlineStore } from "app/data/search/SearchInlineStore";
import { BlockStateStore } from "app/data/block/BlockStateStore";
import { SearchInlineWrapper } from "app/components/toolbar/search/SearchInlineWrapper";
import { NodeSelector } from "app/page/dashboard/nodeDropdown/NodeSelector";
import { NodeFields } from "app/page/dashboard/nodeDropdown/NodeFields";
import { NodeStore } from "app/data/web3/NodeStore";
import { UserPreferences } from "app/UserPreferences";

interface IDashboardContentProps {
    search: Search;
    searchInlineStore: SearchInlineStore;
    lastBlock: IBlockDetails;
    blockValueStore: BlockValueStore;
    blockStateStore: BlockStateStore;
    appConfig: AppConfig;
    translation: Translation;
    clipboard: Clipboard;
    logger: ILogger;
    nodeDropdownItems: NodeFields;
    nodeStore: NodeStore;
    userPreferences: UserPreferences;
}

const Title = styled.h1`
    text-align: center;
	color: #357CFF;
	font-size: 36px;
	letter-spacing: 0.23px;
	line-height: 43px;
    font-weight: 300;
    margin: 14px 0 7px 0;
`;

const SubTitle = styled.h2`
    text-align: center;
	color: #273656;
	font-size: 16px;
	font-weight: 300;
	letter-spacing: 0.2px;
	line-height: 19px;
    margin: 7px 0 14px 0;
`;

const DashboardLabel = styled.div`
    display: flex;
    height: 48px;
    justify-content: center;
    align-items: center;
`;

const GithubLink = styled.a`
	color: #357CFF;
    opacity: 1;
    transition: opacity linear 100ms;
    text-decoration: none;

    &:hover {
        opacity: 0.8;
    }

    &:visited {
        color: #357CFF;
    }
`;

@observer
export class DashboardContent extends React.Component<IDashboardContentProps> {
    render() {
        let { translation: tr, clipboard } = this.props;
        let locale = this.props.appConfig.getLocale();

        return <DashboardContentCenter>
            <Title>{ tr.get("dashboardView.title") }</Title>
            <SubTitle>{tr.get("dashboardView.subTitle")}
                <GithubLink href="https://github.com/Alethio/ethereum-lite-explorer"
                    target="_blank"
                >
                    {tr.get("dashboardView.github")}
                </GithubLink>
            </SubTitle>
            <SearchInlineWrapper>
                <SearchInline
                    translation={tr} search={this.props.search} searchInlineStore={this.props.searchInlineStore}
                />
            </SearchInlineWrapper>
            <DashboardLabel>
                <Label>{ tr.get("dashboardView.lastBlocksChart.title.label") }</Label>
            </DashboardLabel>
            <BlockListDashboard
                blockStateStore={this.props.blockStateStore}
                blockValueStore={this.props.blockValueStore}
                translation={this.props.translation}
                logger={this.props.logger}
            />
            <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                <LayoutRowItem>
                    <NodeSelector nodeStore={this.props.nodeStore} fields={this.props.nodeDropdownItems}
                    userPreferences={this.props.userPreferences}
                    translation={tr} appConfig={this.props.appConfig}/>
                </LayoutRowItem>
                <LayoutRowItem>
                    <Label>{ tr.get("chainView.content.latestBlock.label") }</Label>
                    <BlockNumberBox>{ this.props.lastBlock.id }</BlockNumberBox>
                </LayoutRowItem>
                { this.props.lastBlock.creationTime ?
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.blockCreationTime.label")}</Label>
                    <TimeElapsedBox timestamp={this.props.lastBlock.creationTime}
                        translation={tr}
                        nonclickable
                        locale={locale}
                        clipboard={clipboard} />
                </LayoutRowItem>
                : null }
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.transactions.label")}</Label>
                    <TxCountBox>{ this.props.lastBlock.transactions.length }</TxCountBox>
                </LayoutRowItem>
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.uncles.label")}</Label>
                    <UnclesCountBox locale={locale}>{this.props.lastBlock.uncles.length}</UnclesCountBox>
                </LayoutRowItem>
            </div>
        </DashboardContentCenter>;
    }
}
