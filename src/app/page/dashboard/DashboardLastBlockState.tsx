import { BlockStateStore } from "app/data/block/BlockStateStore";
import { OperationCanceledError, CancellationToken } from "@puzzl/core/lib/async/cancellation";
import { Task } from "@puzzl/core/lib/async/Task";
import { BlockDetailsStore } from "app/data/block/details/BlockDetailsStore";
import { ILogger } from "app/util/log/ILogger";
import { IReactionDisposer, reaction } from "mobx";
import { AsyncData } from "app/data/AsyncData";
import { IBlockDetails } from "app/data/block/details/IBlockDetails";

export class DashboardLastBlockState {
    lastBlock = new AsyncData<IBlockDetails>();
    private fetchLatestTask: Task<void> | undefined;
    private refreshDisposer: IReactionDisposer | undefined;

    constructor(
        private blockStateStore: BlockStateStore,
        private blockDetailsStore: BlockDetailsStore,
        private logger: ILogger
    ) {

    }

    init() {
        this.createFetchLatestTask(true);
    }

    destroy() {
        if (this.fetchLatestTask) {
            this.fetchLatestTask.cancel();
        }
        this.destroyRefreshOnStateChange();
    }

    private setupRefreshOnStateChange() {
        this.destroyRefreshOnStateChange();

        this.refreshDisposer = reaction(
            () => this.blockStateStore.getLatest(),
            (v) => {
                if (!v) {
                    throw new Error(`Latest block should never mutate to undefined`);
                }
                this.createFetchLatestTask();
            }
        );
    }

    private destroyRefreshOnStateChange() {
        if (this.refreshDisposer) {
            this.refreshDisposer();
            this.refreshDisposer = void 0;
        }
    }

    private createFetchLatestTask(initial = false) {
        if (this.fetchLatestTask) {
            this.fetchLatestTask.cancel();
        }
        this.fetchLatestTask = new Task(
            async (cancelToken) => this.fetchLatestBlocks(cancelToken)
        );
        this.fetchLatestTask
            .start()
            .then(() => {
                if (initial) {
                    this.setupRefreshOnStateChange();
                }
            })
            .catch(e => {
                if (!(e instanceof OperationCanceledError)) {
                    throw e;
                }
            });
    }

    private async fetchLatestBlocks(cancelToken: CancellationToken) {
        let latestBlockNo = this.blockStateStore.getLatest();
        if (!latestBlockNo) {
            throw new Error(`Latest block number should be set by now`);
        }

        await this.blockDetailsStore
            .fetch(latestBlockNo)
            .catch(e => {
                this.logger.error("Couldn't fetch last blocks", e);
                return void 0;
            })
            .then(block => {
                cancelToken.throwIfCancelled();
                if (block) {
                    this.lastBlock.update(block);
                } else {
                    // No updates :(
                    if (!this.lastBlock.isLoaded()) {
                        // Ensure initial error message, but ignore afterwards
                        this.lastBlock.update(void 0);
                    }
                }
            });
    }

}
