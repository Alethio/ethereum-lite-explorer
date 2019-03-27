import * as React from "react";
import { Container } from "ethstats-ui/lib/layout/Container";
import { Sidebar } from "ethstats-ui/lib/layout/sidebar/Sidebar";
import { Content } from "ethstats-ui/lib/layout/Content";
import { Logo } from "./sidebar/Logo";
import { Spacer } from "ethstats-ui/lib/layout/Spacer";
import { BlockListAside } from "./sidebar/BlockListAside";
import { TxsViewMode } from "app/page/block/txsViews/TxsViewMode";
import { AppConfig } from "app/AppConfig";
import { IBlockDetails } from "app/data/block/details/IBlockDetails";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { BlockDetailsStore } from "app/data/block/details/BlockDetailsStore";
import { BlockValueStore } from "app/data/block/value/BlockValueStore";
import { Translation } from "app/Translation";
import { HighlightFields } from "app/page/block/txHighlight/HighlightFields";
import { BlockStateStore } from "app/data/block/BlockStateStore";
import { LogoContainer } from "ethstats-ui/lib/layout/sidebar/LogoContainer";
import { ITxLite } from "app/data/tx/ITxLite";
import { ErrorBox } from "ethstats-ui/lib/ErrorBox";
import { LoadingBox } from "app/components/LoadingBox";
import { AsyncData } from "app/data/AsyncData";
import { Task } from "@puzzl/core/lib/async/Task";
import { CancellationToken, OperationCanceledError } from "@puzzl/core/lib/async/cancellation";
import { Clipboard } from "app/helpers/Clipboard";
import { BlockPageSharedState } from "app/page/block/BlockPageSharedState";
import { ErrorBoundary } from "ethstats-ui/lib/util/react/ErrorBoundary";
import { ILogger } from "app/util/log/ILogger";
import { NotFoundError } from "app/data/NotFoundError";
import { SidebarPageTitle } from "ethstats-ui/lib/layout/sidebar/SidebarPageTitle";
import { ITxDetails } from "app/data/tx/details/ITxDetails";
import { TxDetailsStore } from "app/data/tx/details/TxDetailsStore";
import { SidebarMobileStore } from "app/components/topbar/SidebarMobileStore";
import { DomNodeProxy } from "ethstats-ui/lib/util/react/DomNodeProxy";

interface IBlockPageProps {
    blockNumber: number;
    appConfig: AppConfig;
    translation: Translation;
    blockStateStore: BlockStateStore;
    blockDetailsStore: BlockDetailsStore;
    blockValueStore: BlockValueStore;
    txDetailsStore: TxDetailsStore;
    clipboard: Clipboard;
    blockPageSharedState: BlockPageSharedState;
    sidebarMobileStore: SidebarMobileStore;
    logger: ILogger;
    onLoadComplete?(): void;
}

@observer
export class BlockPage extends React.Component<IBlockPageProps, {}> {
    private blockTxs: AsyncData<ITxDetails[]>;
    private blockDetails: AsyncData<IBlockDetails>;
    @observable.ref
    private contentComponentBoxed: AsyncData<typeof import("./BlockContent").BlockContent>;

    private txsViewMode: TxsViewMode;
    private txsHighlightFields: HighlightFields<ITxLite>;
    private dataFetchTask: Task<void> | undefined;

    constructor(props: IBlockPageProps) {
        super(props);
        this.txsViewMode = this.props.blockPageSharedState.txsViewMode;
        this.txsHighlightFields = this.props.blockPageSharedState.txsHighlightFields;

        this.blockDetails = new AsyncData();
        this.blockTxs = new AsyncData();
        this.updateSelectedBlock();

        this.contentComponentBoxed = new AsyncData();
        import("./BlockContent").then(({ BlockContent }) => {
            this.contentComponentBoxed.update(BlockContent);
        }).catch(e => {
            this.props.logger.error("Couldn't load block content component", e);
            this.contentComponentBoxed.update(void 0);
        });
    }

    componentDidUpdate(prevProps: IBlockPageProps) {
        if (this.props.blockNumber !== prevProps.blockNumber) {
            window.scrollTo(0, 0);
            this.props.sidebarMobileStore.sidebarVisible = false;
            this.updateSelectedBlock();
        }
    }

    componentWillUnmount() {
        if (this.dataFetchTask) {
            this.dataFetchTask.cancel();
        }
    }

    @action
    private updateSelectedBlock() {
        let { blockNumber } = this.props;
        this.blockDetails.reset();
        this.blockTxs.reset();

        if (this.dataFetchTask) {
            this.dataFetchTask.cancel();
        }
        this.dataFetchTask = new Task(
            async (cancelToken) => this.fetchBlockData(blockNumber, cancelToken)
                .catch(e => {
                    if (!(e instanceof OperationCanceledError)) {
                        throw e;
                    }
                })
                .then(() => {
                    if (this.props.onLoadComplete) {
                        try {
                            this.props.onLoadComplete();
                        } catch (e) {
                            this.props.logger.error("Load handler failed", e);
                        }
                    }
                })
        );
        this.dataFetchTask.start()
            .catch(e => this.props.logger.error(e));
    }

    private fetchBlockData(blockNumber: number, cancelToken: CancellationToken) {
        let blockDetailsPromise = this.props.blockDetailsStore
            .fetch(blockNumber)
            .catch(e => {
                if (!(e instanceof NotFoundError)) {
                    this.props.logger.error(`Couldn't fetch block details (block id = ${blockNumber})`, e);
                }
                return void 0;
            })
            .then(blockDetails => {
                cancelToken.throwIfCancelled();
                this.blockDetails.update(blockDetails);
                return blockDetails;
            });
        return blockDetailsPromise;
    }

    render() {
        let tr = this.props.translation;

        return (
            <Container>
                <DomNodeProxy onMount={(ref) => {
                    this.props.sidebarMobileStore.instancesCount++;
                }} onUnmount={() => {
                    this.props.sidebarMobileStore.instancesCount--;
                }} >
                    <Sidebar sticky mobileVisible={this.props.sidebarMobileStore.isSidebarVisible}>
                        <SidebarPageTitle>{ tr.get("blockView.sidebar.title") }</SidebarPageTitle>
                        <LogoContainer>
                            <Logo>{tr.get("blockView.sidebar.logo")}</Logo>
                        </LogoContainer>
                        <Spacer height="48px" />
                        <BlockListAside
                            blockValueStore={this.props.blockValueStore}
                            blockStateStore={this.props.blockStateStore}
                            selectedBlockNumber={this.props.blockNumber}
                            translation={tr}
                            logger={this.props.logger}
                        />
                    </Sidebar>
                </DomNodeProxy>
                <Content>
                    {this.renderContent()}
                </Content>
            </Container>
        );
    }

    private renderContent() {
        let tr = this.props.translation;

        if (this.blockDetails.isLoading() || this.contentComponentBoxed.isLoading()) {
            return <LoadingBox translation={tr} />;
        }

        let errorBox = <ErrorBox>
            <span dangerouslySetInnerHTML={{__html:
                this.blockDetails.isLoaded() ?
                    tr.get("general.error") :
                    tr.get("blockView.content.noData.text")
            }} />
        </ErrorBox>;

        if (!this.blockDetails.isLoaded() || !this.contentComponentBoxed.isLoaded()) {
            return errorBox;
        }

        let block = this.blockDetails.data;
        let blockConfirmations = this.props.blockStateStore.getConfirmations(block.id);
        let blockConfirmed = this.props.blockStateStore.isConfirmed(block.id);

        let BlockContent = this.contentComponentBoxed.data;

        return <ErrorBoundary errorEl={errorBox} logger={this.props.logger}>
            <BlockContent
                blockDetails={block}
                blockTxs={this.blockTxs}
                blockConfirmations={blockConfirmations}
                blockConfirmed={blockConfirmed}
                translation={tr}
                appConfig={this.props.appConfig}
                txsViewMode={this.txsViewMode}
                txsHighlightFields={this.txsHighlightFields}
                txsGridSortingOptions={this.props.blockPageSharedState.txsGridSortingOptions}
                clipboard={this.props.clipboard}
            />
        </ErrorBoundary>;
    }
}
