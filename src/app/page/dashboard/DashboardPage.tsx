import * as React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Container } from "ethstats-ui/lib/layout/Container";
import { Content } from "ethstats-ui/lib/layout/Content";
import { AsyncData } from "app/data/AsyncData";
import { ILogger } from "app/util/log/ILogger";
import { Translation } from "app/Translation";
import { LoadingBox } from "app/components/LoadingBox";
import { ErrorBox } from "ethstats-ui/lib/ErrorBox";
import { ErrorBoundary } from "ethstats-ui/lib/util/react/ErrorBoundary";
import { BlockValueStore } from "app/data/block/value/BlockValueStore";
import { Clipboard } from "app/helpers/Clipboard";
import { AppConfig } from "app/AppConfig";
import { DashboardLastBlockState } from "app/page/dashboard/DashboardLastBlockState";
import { BlockStateStore } from "app/data/block/BlockStateStore";
import { BlockDetailsStore } from "app/data/block/details/BlockDetailsStore";
import { Search } from "app/data/search/Search";
import { SearchInlineStore } from "app/data/search/SearchInlineStore";
import { NodeFields } from "app/page/dashboard/nodeDropdown/NodeFields";
import { NodeStore } from "app/data/web3/NodeStore";
import { UserPreferences } from "app/UserPreferences";

interface IDashboardPageProps {
    search: Search;
    searchInlineStore: SearchInlineStore;
    blockValueStore: BlockValueStore;
    blockStateStore: BlockStateStore;
    blockDetailsStore: BlockDetailsStore;
    appConfig: AppConfig;
    clipboard: Clipboard;
    translation: Translation;
    logger: ILogger;
    nodeDropdownUrls: NodeFields;
    nodeStore: NodeStore;
    dashboardLastBlockState: DashboardLastBlockState;
    userPreferences: UserPreferences;
    onLoadComplete?(): void;
}

@observer
export class DashboardPage extends React.Component<IDashboardPageProps> {
    @observable.ref
    private contentComponentBoxed: AsyncData<typeof import("./DashboardContent").DashboardContent>;

    constructor(props: IDashboardPageProps) {
        super(props);

        this.props.dashboardLastBlockState.init();

        this.contentComponentBoxed = new AsyncData();
        import("./DashboardContent").then(({ DashboardContent }) => {
            this.contentComponentBoxed.update(DashboardContent);
        }).catch(e => {
            this.props.logger.error("Couldn't load chain content component", e);
            this.contentComponentBoxed.update(void 0);
        }).then(() => {
            if (!this.contentComponentBoxed.isLoaded()) {
                return;
            }
            if (this.props.onLoadComplete) {
                this.props.onLoadComplete();
            }
        }).catch(e => {
            this.props.logger.error("Load handler failed", e);
        });
    }

    componentDidUpdate(prevProps: IDashboardPageProps) {
        if (this.props.blockStateStore !== prevProps.blockStateStore) {
            this.props.dashboardLastBlockState.init();
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    {this.renderContent()}
                </Content>
            </Container>
        );
    }

    private renderContent() {
        let tr = this.props.translation;
        let lastBlock = this.props.dashboardLastBlockState.lastBlock;

        if (lastBlock.isLoading() || this.contentComponentBoxed.isLoading()) {
            return <LoadingBox translation={tr} />;
        }

        let errorBox = <ErrorBox>
            <span dangerouslySetInnerHTML={{__html: tr.get("general.error")}} />
        </ErrorBox>;

        if (!lastBlock.isLoaded() || !this.contentComponentBoxed.isLoaded()) {
            return errorBox;
        }

        let DashboardContent = this.contentComponentBoxed.data;

        return <ErrorBoundary errorEl={errorBox} logger={this.props.logger}>
            <DashboardContent
                search={this.props.search}
                searchInlineStore={this.props.searchInlineStore}
                lastBlock={lastBlock.data}
                appConfig={this.props.appConfig}
                clipboard={this.props.clipboard}
                translation={tr}
                logger={this.props.logger}
                blockValueStore={this.props.blockValueStore}
                blockStateStore={this.props.blockStateStore}
                nodeDropdownItems={this.props.nodeDropdownUrls}
                nodeStore={this.props.nodeStore}
                userPreferences={this.props.userPreferences}
            />
        </ErrorBoundary>;
    }
}
