import * as React from "react";
import { BlockListItem } from "./BlockListItem";
import { observer } from "mobx-react";
import { observable, computed, IReactionDisposer, reaction } from "mobx";
import { BlockValueStore } from "app/data/block/value/BlockValueStore";
import { IBlockValue } from "app/data/block/value/IBlockValue";
import { Translation } from "app/Translation";
import { clamp } from "@puzzl/core/lib/math/number";
import styled from "app/styled-components";
import { Task } from "@puzzl/core/lib/async/Task";
import { CancellationToken, OperationCanceledError } from "@puzzl/core/lib/async/cancellation";
import { ILogger } from "app/util/log/ILogger";
import { BlockStateStore } from "app/data/block/BlockStateStore";

const BlockListAsideRoot = styled.div`
    flex: 1 1 auto;
    overflow: hidden;
`;

interface IBlockListAsideProps {
    blockValueStore: BlockValueStore;
    blockStateStore: BlockStateStore;
    selectedBlockNumber: number;
    translation: Translation;
    logger: ILogger;
}

@observer
export class BlockListAside extends React.Component<IBlockListAsideProps> {
    private wrapperElement: HTMLDivElement | null;
    private wrapperElementHeight: number;
    @observable
    private blocksShownCount: number;
    @observable.shallow
    private blockValues: (IBlockValue | undefined)[] = [];
    private latestValueWatch: IReactionDisposer | undefined;
    private dataFetchTask: Task<void> | undefined;

    @computed
    private get blockRangeStart() {
        return clamp(
            this.props.selectedBlockNumber - Math.floor(this.blocksShownCount / 2),
            0,
            (this.props.blockStateStore.getLatest() || Infinity) - (this.blocksShownCount - 1)
        );
    }

    @computed
    private get maxBlockTxCount() {
        return this.blockValues.reduce((acc, value) => Math.max(acc, !value ? 0 : value.transactionCount), 0);
    }

    render() {
        return (
            <BlockListAsideRoot
                innerRef={(r) => {
                    this.wrapperElement = r;
                    if (r) {
                        this.wrapperElementHeight = r.clientHeight;
                    }
                }}
            >
                {this.blockValues.reverse().map((value, idx) => {
                    let blockNumber = this.blockRangeStart + this.blockValues.length - 1 - idx;
                    let percent = value ? Math.floor(value.transactionCount / this.maxBlockTxCount * 100) : 0;

                    return <BlockListItem
                        // Make sure each block has a different div, so that tooltips are changed correctly
                        key={blockNumber}
                        blockNumber={blockNumber}
                        transactionCount={value ? value.transactionCount : void 0}
                        active={blockNumber === this.props.selectedBlockNumber}
                        percent={percent}
                        translation={this.props.translation}
                    />;
                })}
            </BlockListAsideRoot>
        );
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
        this.setupLatestValueWatch();
    }

    componentDidUpdate(prevProps: IBlockListAsideProps) {
        if (this.props.selectedBlockNumber !== prevProps.selectedBlockNumber) {
            this.handleRangeChange();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
        this.destroyLatestValueWatch();
    }

    private setupLatestValueWatch() {
        this.destroyLatestValueWatch();

        this.latestValueWatch = reaction(
            () => this.props.blockStateStore.getLatest(),
            (v) => {
                if (v &&
                    this.props.selectedBlockNumber >= v - this.blocksShownCount
                ) {
                    this.handleRangeChange();
                }
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
            this.wrapperElementHeight = this.wrapperElement.clientHeight;
            const maxNumberOfElements = this.wrapperElementHeight ?
                Math.floor(this.wrapperElementHeight / 16) :
                11;
            this.blocksShownCount = maxNumberOfElements;
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
