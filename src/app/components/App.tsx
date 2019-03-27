import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import styled, { ThemeProvider as StyledThemeProvider } from "app/styled-components";
import { ITheme, createTheme } from "app/theme";
import { BlockPage } from "app/page/block/BlockPage";
import { Translation } from "app/Translation";
import { AppConfig } from "app/AppConfig";
import { BlockDetailsStore } from "app/data/block/details/BlockDetailsStore";
import { BlockValueStore } from "app/data/block/value/BlockValueStore";
import { ThemeContext } from "app/ThemeContext";
import { TxPage } from "app/page/tx/TxPage";
import { TxDetailsStore } from "app/data/tx/details/TxDetailsStore";
import { BlockStateStore } from "app/data/block/BlockStateStore";
import { AccountPage } from "app/page/account/AccountPage";
import { ErrorPage } from "app/page/error/ErrorPage";
import { IdenticonGenerator } from "app/data/account/identicon/IdenticonGenerator";
import { AccountDetailsStore } from "app/data/account/details/AccountDetailsStore";
import { observer } from "mobx-react";
import { UnclePage } from "app/page/uncle/UnclePage";
import { UncleDetailsStore } from "app/data/uncle/details/UncleDetailsStore";
import { Clipboard } from "app/helpers/Clipboard";
import { Toolbar } from "ethstats-ui/lib/layout/toolbar/Toolbar";
import { Page } from "ethstats-ui/lib/layout/Page";
import { Container } from "ethstats-ui/lib/layout/Container";
import { SearchWrapper } from "app/components/toolbar/SearchWrapper";
import { AppLogo } from "app/components/toolbar/AppLogo";
import { Search } from "app/data/search/Search";
import { BlockPageSharedState } from "app/page/block/BlockPageSharedState";
import { Link } from "app/components/Link";
import { Filler } from "ethstats-ui/lib/layout/Filler";
import { Feedback } from "app/components/toolbar/Feedback";
import { ToolbarItem } from "ethstats-ui/lib/layout/toolbar/ToolbarItem";
import { ToolbarIconButton } from "ethstats-ui/lib/layout/toolbar/ToolbarIconButton";
import { NetStatsIcon } from "ethstats-ui/lib/icon/NetStatsIcon";
import { AlethioIconButton } from "ethstats-ui/lib/layout/toolbar/AlethioIconButton";
import { ILogger } from "app/util/log/ILogger";
import { DashboardPage } from "app/page/dashboard/DashboardPage";
import { SearchInlineStore } from "app/data/search/SearchInlineStore";
import { ExternalLink } from "app/components/ExternalLink";
import { ResponsiveContainer, MinimumWidth } from "ethstats-ui/lib/layout/responsive/ResponsiveContainer";
import { TopBar } from "ethstats-ui/lib/layout/topbar/TopBar";
import { TopbarItem } from "ethstats-ui/lib/layout/topbar/TopbarItem";
import { TopMenuWrapper } from "app/components/topbar/TopMenuWrapper";
import { SearchIcon } from "ethstats-ui/lib/icon/SearchIcon";
import { SidebarMenuWrapper } from "app/components/topbar/SidebarMenuWrapper";
import { SidebarMobileStore } from "app/components/topbar/SidebarMobileStore";
import { observable, reaction, runInAction } from "mobx";
import { TranslationLoader } from "app/TranslationLoader";
import { UserPreferences } from "app/UserPreferences";
import { LanguageSwitcher } from "app/components/toolbar/LanguageSwitcher";
import { NodeFields } from "app/page/dashboard/nodeDropdown/NodeFields";
import { NodeStore } from "app/data/web3/NodeStore";
import { DashboardLastBlockState } from "app/page/dashboard/DashboardLastBlockState";
import { Router } from "app/components/Router";

const ToolbarWrapper = styled.div`
    flex-shrink: 0;
`;
const BetaSign = styled.div`
    font-size: 10px;
    text-transform: uppercase;
    color: ${({theme}) => theme.colors.toolbarBetaSign};
    text-align: center;
`;

export interface IAppProps {
    translation: Translation;
    appConfig: AppConfig;
    logger: ILogger;
    blockStateStore: BlockStateStore;
    blockDetailsStore: BlockDetailsStore;
    blockValueStore: BlockValueStore;
    txDetailsStore: TxDetailsStore;
    uncleDetailsStore: UncleDetailsStore;
    identiconGenerator: IdenticonGenerator;
    accountDetailsStore: AccountDetailsStore;
    clipboard: Clipboard;
    search: Search;
    blockPageSharedState: BlockPageSharedState;
    web3: import("web3");
    userPreferences: UserPreferences;
    nodeDropdownUrls: NodeFields;
    nodeStore: NodeStore;
    dashboardLastBlockState: DashboardLastBlockState;
}

@observer
export class App extends React.Component<IAppProps> {
    private theme: ITheme;
    @observable
    private translation: Translation;
    private searchInlineStore: SearchInlineStore;
    private sidebarMobileStore: SidebarMobileStore;

    constructor(props: IAppProps) {
        super(props);

        this.theme = createTheme();
        this.translation = this.props.translation;
        /** HACK: this is a hack. See SearchInlineStore.ts for more details */
        this.searchInlineStore = new SearchInlineStore();
        this.sidebarMobileStore = new SidebarMobileStore();

        // On locale switch we create another translation reference to avoid changing all PureComponent-s that
        // currently depend on it
        reaction(() => this.props.appConfig.getLocale(), async (locale) => {
            let translationJson = await (new TranslationLoader()).load(locale);
            runInAction(() => {
                this.translation = new Translation(translationJson);
            });
        });
    }

    public render() {
        // Not using this.* inside route render callbacks because it won't react to mobx observable changes
        let translation = this.translation;
        let routerHistoryMode = this.props.appConfig.getRouterMode();

        return (
            <ThemeContext.Provider value={this.theme}>
                <StyledThemeProvider theme={this.theme}>
                    <Router historyMode={routerHistoryMode}>
                        <Switch>
                            <Route path="/" render={({location}) =>
                                <Container zIndex={0}>
                                    <ToolbarWrapper>
                                        <Toolbar zIndex={1}>
                                            { this.renderToolbarItems(translation) }
                                        </Toolbar>
                                    </ToolbarWrapper>
                                    <Page>
                                        <ToolbarWrapper>
                                            <TopBar zIndex={1}>
                                                { this.renderTopbarItems(translation) }
                                            </TopBar>
                                        </ToolbarWrapper>
                                        { this.renderSwitch(translation) }
                                    </Page>
                                </Container>
                            } />
                        </Switch>
                    </Router>
                </StyledThemeProvider>
            </ThemeContext.Provider>
        );
    }

    private renderToolbarItems(translation: Translation) {
        return <>
            <ToolbarItem>
                <Link to={url => url.getRoot()}>
                    <AppLogo />
                    <BetaSign>Beta</BetaSign>
                </Link>
            </ToolbarItem>
            <SearchWrapper
                translation={translation}
                search={this.props.search}
                searchInlineStore={this.searchInlineStore}
                searchTriggerRender={(handleLayerToggle) =>
                    <ToolbarItem title={this.props.translation.get("toolbar.search.label")} >
                        <ToolbarIconButton
                            Icon={SearchIcon}
                            onClick={handleLayerToggle}
                        />
                    </ToolbarItem>
                }
            />
            <ResponsiveContainer behavior="hide" forScreenWidth={{lowerThan: MinimumWidth.ForFullView}}>
                { this.props.appConfig.checkForNetworkMonitorUrl() &&
                    <ToolbarItem title={translation.get("toolbar.netstats.label")}>
                        <ExternalLink href={this.props.appConfig.getNetworkMonitorUrl()} rel="noopener noreferrer">
                            <ToolbarIconButton Icon={NetStatsIcon} />
                        </ExternalLink>
                    </ToolbarItem>
                }
            </ResponsiveContainer>
            <Filler />
            <ToolbarItem title={translation.get("toolbar.feedback.label")} >
                <Feedback translation={this.props.translation} />
            </ToolbarItem>
            <LanguageSwitcher
                appConfig={this.props.appConfig}
                translation={translation}
                userPreferences={this.props.userPreferences}
            />
            <ToolbarItem title={translation.get("toolbar.alethio.label")} >
                <ExternalLink href="https://aleth.io" rel="noopener noreferrer">
                    <AlethioIconButton />
                </ExternalLink>
            </ToolbarItem>
        </>;
    }

    private renderTopbarItems(translation: Translation) {
        return <>
            <TopMenuWrapper
                translation={translation}
                search={this.props.search}
                searchInlineStore={this.searchInlineStore}
                appConfig={this.props.appConfig}
                userPreferences={this.props.userPreferences}
            />
            <Filler />
            <TopbarItem>
                <Link to={url => url.getRoot()}>
                    <AppLogo />
                    <BetaSign>Beta</BetaSign>
                </Link>
            </TopbarItem>
            <Filler />
            <SidebarMenuWrapper
                translation={translation}
                sidebarMobileStore={this.sidebarMobileStore}
            />
        </>;
    }

    private renderSwitch(translation: Translation) {
        return <Switch>
            <Route exact path="/" render={() => (
                <DashboardPage
                    search={this.props.search}
                    searchInlineStore={this.searchInlineStore}
                    blockStateStore={this.props.blockStateStore}
                    blockDetailsStore={this.props.blockDetailsStore}
                    blockValueStore={this.props.blockValueStore}
                    clipboard={this.props.clipboard}
                    appConfig={this.props.appConfig}
                    translation={translation}
                    logger={this.props.logger}
                    nodeDropdownUrls={this.props.nodeDropdownUrls}
                    nodeStore={this.props.nodeStore}
                    dashboardLastBlockState={this.props.dashboardLastBlockState}
                    userPreferences={this.props.userPreferences}
                />
            )} />
            <Route path="/block/latest" component={observer(() => {
                let latestBlockNo = this.props.blockStateStore.getLatest();
                if (!latestBlockNo) {
                    return <ErrorPage translation={translation} />;
                }
                return this.renderBlockPage(latestBlockNo, translation);
            })} />
            <Route path="/block/:blockId(\d+)/uncle/:uncleIndex(\d+)" render={({ match }) => (
                <UnclePage
                    blockNr={match.params.blockId}
                    uncleIndex={match.params.uncleIndex}
                    appConfig={this.props.appConfig}
                    translation={translation}
                    uncleDetailsStore={this.props.uncleDetailsStore}
                    clipboard={this.props.clipboard}
                    logger={this.props.logger}
                />
            )} />
            <Route path="/block/:blockId(\d+)" render={({ match }) => (
                this.renderBlockPage(parseInt(match.params.blockId, 10), translation)
            )} />
            <Route path="/tx/(0x)?:txHash([a-zA-Z0-9]+)" render={({ match }) => (
                !match.params[0] ? // no 0x
                <Redirect to={`/tx/0x${match.params.txHash}`} /> :
                <TxPage
                    txHash={ match.params.txHash }
                    appConfig={this.props.appConfig}
                    translation={translation}
                    blockStateStore={this.props.blockStateStore}
                    blockDetailsStore={this.props.blockDetailsStore}
                    txDetailsStore={this.props.txDetailsStore}
                    clipboard={this.props.clipboard}
                    sidebarMobileStore={this.sidebarMobileStore}
                    logger={this.props.logger}
                />
            )} />
            <Route exact path="/address/:accountHash" render={({ match }) => (
                <Redirect to={`/account/0x${match.params.accountHash.replace(/^0x/, "")}`} />
            )} />
            <Route path="/account/(0x)?:accountHash([a-zA-Z0-9]+)" render={({ match }) => (
                !match.params[0] ? // no 0x
                <Redirect to={`/account/0x${match.params.accountHash}`} /> :
                <AccountPage
                    identiconGenerator={this.props.identiconGenerator}
                    accountHash={ (match.params.accountHash as string).toLowerCase() }
                    appConfig={this.props.appConfig}
                    translation={translation}
                    blockStateStore={this.props.blockStateStore}
                    accountDetailsStore={this.props.accountDetailsStore}
                    web3={this.props.web3}
                    clipboard={this.props.clipboard}
                    logger={this.props.logger}
                />
            )} />
            <Route render={() => <ErrorPage translation={translation} />} />
        </Switch>;
    }

    private renderBlockPage(blockNo: number, translation: Translation) {
        return <BlockPage
            blockNumber={blockNo}
            appConfig={this.props.appConfig}
            translation={translation}
            blockStateStore={this.props.blockStateStore}
            blockDetailsStore={this.props.blockDetailsStore}
            blockValueStore={this.props.blockValueStore}
            txDetailsStore={this.props.txDetailsStore}
            clipboard={this.props.clipboard}
            blockPageSharedState={this.props.blockPageSharedState}
            sidebarMobileStore={this.sidebarMobileStore}
            logger={this.props.logger}
        />;
    }
}
