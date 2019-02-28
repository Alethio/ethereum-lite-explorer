import * as React from "react";
import { observer } from "mobx-react";
import { CancellationToken, OperationCanceledError } from "@puzzl/core/lib/async/cancellation";
import { ILogger } from "app/util/log/ILogger";
import { Translation } from "app/Translation";
import { IReactionDisposer, reaction, computed, observable } from "mobx";
import { Task } from "@puzzl/core/lib/async/Task";
import { BlockValueStore } from "app/data/block/value/BlockValueStore";
import { IBlockValue } from "app/data/block/value/IBlockValue";
import { BarChart } from "app/page/dashboard/barChart/BarChart";
import { BlockNumberBox } from "app/components/content/box/block/BlockNumberBox";
import { TxCountBox } from "app/components/content/box/block/TxCountBox";
import { UrlBuilder } from "app/helpers/UrlBuilder";
import { BlockStateStore } from "app/data/block/BlockStateStore";

const MAX_BLOCKS_SHOWN_COUNT = 50;

interface IBlockListDashboardProps {
    blockValueStore: BlockValueStore;
    blockStateStore: BlockStateStore;
    translation: Translation;
    logger: ILogger;
}

/**
 * TODO: Deduplication: This file is almost identical with AvgTimeInPoolChart.tsx
 * If posible, export and share logic between those two and BlockListAside.tsx
 */
@observer
export class BlockListDashboard extends React.Component<IBlockListDashboardProps> {
    private wrapperElement: HTMLDivElement | null;
    private wrapperElementWidth: number;
    @observable
    private blocksShownCount: number;
    @observable.shallow
    private blockValues: (IBlockValue | undefined)[] = [];
    private latestValueWatch: IReactionDisposer | undefined;
    private dataFetchTask: Task<void> | undefined;
    private urlBuilder: UrlBuilder;

    @computed
    private get blockRangeStart() {
        return (this.props.blockStateStore.getLatest() || Infinity) - (this.blocksShownCount - 1);
    }

    render() {
        return (
            <BarChart
                innerRef={(r) => {
                    this.wrapperElement = r;
                    if (r) {
                        this.wrapperElementWidth = r.clientWidth;
                    }
                }}
                height={80}
                data={this.blockValues.map((data, idx) => {
                    let blockNumber = this.blockRangeStart + idx;
                    return {
                        key: blockNumber,
                        value: data ? data.transactionCount : void 0,
                        data
                    };
                })}
                tooltipThunk={(d) => <div style={{padding: 8, display: "flex"}}>
                    <BlockNumberBox variant="small" noLink>{d.key as number}</BlockNumberBox>
                    { d.value !== void 0 ?
                    <TxCountBox variant="small">
                        {this.props.translation.get("blockView.content.blockSummary.txs.label")
                            .replace(/%d/, "" + d.value)}
                    </TxCountBox>
                    : null }
                </div>}
                linkThunk={(d) => this.urlBuilder.getBlock(d.key as number)}
            />
        );
    }

    componentDidMount() {
        this.urlBuilder = new UrlBuilder();
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
        this.setupLatestValueWatch();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
        this.destroyLatestValueWatch();
    }

    private setupLatestValueWatch() {
        this.destroyLatestValueWatch();

        this.latestValueWatch = reaction(
            () => this.props.blockStateStore.getLatest(),
            () => {
                this.handleRangeChange();
            }
        );
    }

    private destroyLatestValueWatch() {
        if (this.latestValueWatch) {
            this.latestValueWatch();
            this.latestValueWatch = void 0;
        }
    }

    private handleResize = () => {
        if (this.wrapperElement) {
            this.wrapperElementWidth = this.wrapperElement.clientWidth;
            let computedStyle = getComputedStyle(this.wrapperElement);
            let lateralSpacing = parseInt(computedStyle.getPropertyValue("padding-left"), 10) +
                parseInt(computedStyle.getPropertyValue("padding-right"), 10);
            const maxNumberOfElements = this.wrapperElementWidth ?
                Math.floor((this.wrapperElementWidth - lateralSpacing) / 16) :
                12;
            this.blocksShownCount = Math.min(maxNumberOfElements, MAX_BLOCKS_SHOWN_COUNT);
        }

        this.handleRangeChange();
    }

    private handleRangeChange() {
        if (this.dataFetchTask) {
            this.dataFetchTask.cancel();
        }
        this.dataFetchTask = new Task((cancelToken) => this.fetchData(cancelToken)
            .catch(e => {
                if (!(e instanceof OperationCanceledError)) {
                    throw e;
                }
            }));
        this.dataFetchTask.start()
            .catch(e => this.props.logger.error(e));
    }

    private async fetchData(cancelToken: CancellationToken) {
        let blockRangeEnd = this.blockRangeStart + this.blocksShownCount;

        let blockValues = await this.props.blockValueStore
            .fetch(this.blockRangeStart, blockRangeEnd);

        /**
         * If we received a cancellation request, we don't need to cancel the http request,
         * we just return and don't update the data for rending.
         */
        if (cancelToken.isCancelled()) {
            return;
        }

        this.blockValues = blockValues;
    }
}
