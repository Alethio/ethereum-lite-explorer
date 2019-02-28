import * as React from "react";
import { Container } from "ethstats-ui/lib/layout/Container";
import { Content } from "ethstats-ui/lib/layout/Content";
import { AppConfig } from "app/AppConfig";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { BlockDetailsStore } from "app/data/block/details/BlockDetailsStore";
import { Translation } from "app/Translation";
import { TxDetailsStore } from "app/data/tx/details/TxDetailsStore";
import { BlockStateStore } from "app/data/block/BlockStateStore";
import { ITxLite } from "app/data/tx/ITxLite";
import { TxSidebar } from "app/page/tx/sidebar/TxSidebar";
import { ITxDetails } from "app/data/tx/details/ITxDetails";
import { Task } from "@puzzl/core/lib/async/Task";
import { OperationCanceledError, CancellationToken } from "@puzzl/core/lib/async/cancellation";
import { LoadingBox } from "app/components/LoadingBox";
import { ErrorBox } from "ethstats-ui/lib/ErrorBox";
import { AsyncData } from "app/data/AsyncData";
import { Clipboard } from "app/helpers/Clipboard";
import { ErrorBoundary } from "ethstats-ui/lib/util/react/ErrorBoundary";
import { ILogger } from "app/util/log/ILogger";
import { NotFoundError } from "app/data/NotFoundError";
import { IBlockDetails } from "app/data/block/details/IBlockDetails";
import { SidebarMobileStore } from "app/components/topbar/SidebarMobileStore";

interface ITxPageProps {
    txHash: string;
    appConfig: AppConfig;
    translation: Translation;
    blockStateStore: BlockStateStore;
    blockDetailsStore: BlockDetailsStore;
    txDetailsStore: TxDetailsStore;
    clipboard: Clipboard;
    sidebarMobileStore: SidebarMobileStore;
    logger: ILogger;
    onLoadComplete?(): void;
}

@observer
export class TxPage extends React.Component<ITxPageProps, {}> {
    @observable.ref
    private txDetails: AsyncData<ITxDetails>;
    @observable.ref
    private contentComponentBoxed: AsyncData<typeof import("./TxContent").TxContent>;
    @observable.ref
    private siblingTxs: ITxLite[] | undefined;
    private includedInBlock: IBlockDetails;
    private dataFetchTask: Task<void> | undefined;

    constructor(props: ITxPageProps) {
        super(props);

        this.txDetails = new AsyncData();
        this.updateSelectedTx();

        this.contentComponentBoxed = new AsyncData();
        import("./TxContent").then(({ TxContent }) => {
            this.contentComponentBoxed.update(TxContent);
        }).catch(e => {
            this.props.logger.error("Couldn't load TX content component", e);
            this.contentComponentBoxed.update(void 0);
        });
    }

    componentWillUnmount() {
        if (this.dataFetchTask) {
            this.dataFetchTask.cancel();
        }
    }

    componentDidUpdate(prevProps: ITxPageProps) {
        if (this.props.txHash !== prevProps.txHash) {
            window.scrollTo(0, 0);
            this.props.sidebarMobileStore.sidebarVisible = false;
            this.updateSelectedTx();
        }
    }

    private updateSelectedTx() {
        let txHash = this.props.txHash;

        this.resetTxData();

        if (this.dataFetchTask) {
            this.dataFetchTask.cancel();
        }
        this.dataFetchTask = new Task(async (cancelToken) => {
            try {
                await this.fetchTxData(txHash, cancelToken);
                if (this.props.onLoadComplete) {
                    try {
                        this.props.onLoadComplete();
                    } catch (e) {
                        this.props.logger.error("Load handler failed", e);
                    }
                }
            } catch (e) {
                if (!(e instanceof OperationCanceledError)) {
                    throw e;
                }
            }
        });
        this.dataFetchTask.start()
            .catch(e => this.props.logger.error(e));
    }

    @action
    private resetTxData() {
        this.txDetails.reset();
    }

    /**
     * Fetch various data about the current tx. If the tx changes due to page navigation during the
     * execution of this function, we need to react and stop the execution
     *
     * Errors that occur during data fetching are handled by render branches that work with blank/neutral values.
     * We only log the errors and let the UI handle the missing data
     *
     * We don't care when all the tasks inside this function finish because it has no output and only
     * produces side-effects (rendering)
     *
     * See flow diagram: $PROJECT_ROOT/doc/diagram/Tx Data-Flow Diagram.png
     */
    private fetchTxData(txHash: string, cancelToken: CancellationToken) {
        let detailsPromise = this.props.txDetailsStore
            .fetch(txHash)
            .catch(e => {
                if (!(e instanceof NotFoundError)) {
                    this.props.logger.error(`Couldn't fetch tx details (tx hash = ${txHash})`, e);
                }
                return void 0;
            });

        // Render details when data is received
        let renderDetailsPromise = detailsPromise.then(txDetails => {
            cancelToken.throwIfCancelled();
            this.txDetails.update(txDetails);
        });

        // Get sibling TXs for sidebar
        let renderSidebarPromise = detailsPromise.then(txDetails => {
            cancelToken.throwIfCancelled();
            if (!txDetails) {
                this.props.logger.warn(`Aborted fetch of sibling txs due to missing tx details`);
            }

            if (!txDetails) {
                // Nothing to show in sidebar. We don't have data for pending txs
                this.siblingTxs = [];
                return;
            }

            return this.props.blockDetailsStore
                .fetch(txDetails.block.id)
                .then(blockDetails => {
                    cancelToken.throwIfCancelled();
                    this.includedInBlock = blockDetails;
                    this.siblingTxs = blockDetails.transactions;
                });
        }).catch(e => {
            if (!(e instanceof OperationCanceledError)) {
                this.props.logger.error(`Failed retrieving sibling tx details for sidebar`, e);
                this.siblingTxs = [];
            }
        });

        let pricesPromise = detailsPromise.then((txDetails) => {
            cancelToken.throwIfCancelled();
            if (!txDetails) {
                this.props.logger.warn(`Aborted fetch of prices due to missing tx details`);
                return;
            }
        }).catch(e => {
            if (!(e instanceof OperationCanceledError)) {
                this.props.logger.error(`Couldn't fetch prices`, e);
            }
        });

        return Promise.all([renderDetailsPromise, renderSidebarPromise, pricesPromise]);
    }

    render() {
        let tr = this.props.translation;

        return (
            <Container>
                <TxSidebar
                    txHash={this.props.txHash}
                    txs={this.siblingTxs}
                    translation={tr}
                    sidebarMobileStore={this.props.sidebarMobileStore}
                />
                <Content>
                    { this.renderContent() }
                </Content>
            </Container>
        );
    }

    private renderContent() {
        let locale = this.props.appConfig.getLocale();
        let tr = this.props.translation;

        if (this.txDetails.isLoading() || this.contentComponentBoxed.isLoading()) {
            return <LoadingBox translation={tr} />;
        }

        let errorBox = <ErrorBox>
            <span dangerouslySetInnerHTML={{__html:
                this.txDetails.isLoaded() ?
                    tr.get("general.error") :
                    tr.get("txView.content.noData.text")
            }} />
        </ErrorBox>;

        if (!this.txDetails.isLoaded() || !this.contentComponentBoxed.isLoaded()) {
            return errorBox;
        }

        let tx = this.txDetails.data;
        let blockConfirmations = this.props.blockStateStore.getConfirmations(tx.block.id);
        let blockConfirmed = this.props.blockStateStore.isConfirmed(tx.block.id);

        let TxContent = this.contentComponentBoxed.data;

        return <ErrorBoundary errorEl={errorBox} logger={this.props.logger}>
            <TxContent
                txDetails={tx}
                txHash={this.props.txHash}
                blockDetails={this.includedInBlock}
                blockConfirmations={blockConfirmations}
                blockConfirmed={blockConfirmed}
                translation={tr}
                locale={locale}
                clipboard={this.props.clipboard}
                logger={this.props.logger}
            />
        </ErrorBoundary>;
    }
}
