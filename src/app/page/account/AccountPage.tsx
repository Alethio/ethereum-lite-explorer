import * as React from "react";
import { observable } from "mobx";
import { AppConfig } from "app/AppConfig";
import { observer } from "mobx-react";
import { Translation } from "app/Translation";
import { IdenticonGenerator } from "app/data/account/identicon/IdenticonGenerator";
import { IdenticonProxy } from "app/data/account/identicon/IdenticonProxy";
import { AccountDetailsStore } from "app/data/account/details/AccountDetailsStore";
import { IAccountDetails } from "app/data/account/details/IAccountDetails";
import { BlockStateStore } from "app/data/block/BlockStateStore";
import { Task } from "@puzzl/core/lib/async/Task";
import { CancellationToken, OperationCanceledError } from "@puzzl/core/lib/async/cancellation";
import { AsyncData } from "app/data/AsyncData";
import { LoadingBox } from "app/components/LoadingBox";
import { ErrorBox } from "ethstats-ui/lib/ErrorBox";
import { Clipboard } from "app/helpers/Clipboard";
import { NotFoundError } from "app/data/NotFoundError";
import { ErrorBoundary } from "ethstats-ui/lib/util/react/ErrorBoundary";
import { ILogger } from "app/util/log/ILogger";
import { BigNumber } from "app/util/BigNumber";

export interface ITxCounts {
    in: number;
    out: number;
    pending: number;
}

export interface IThreeBoxData {
    profile: import("3box").IThreeBoxProfile;
    accounts?: import("3box").IThreeBoxAccounts;
}

interface IAccountPageProps {
    accountHash: string;
    identiconGenerator: IdenticonGenerator;
    appConfig: AppConfig;
    translation: Translation;
    blockStateStore: BlockStateStore;
    accountDetailsStore: AccountDetailsStore;
    web3: import("web3");
    clipboard: Clipboard;
    logger: ILogger;
    onLoadComplete?(): void;
}

@observer
export class AccountPage extends React.Component<IAccountPageProps, {}> {
    private accountDetails: AsyncData<IAccountDetails>;
    @observable
    private threeBoxData: IThreeBoxData | undefined;

    @observable.ref
    private identicon: IdenticonProxy;
    @observable.ref
    private contentComponentBoxed: AsyncData<typeof import("./AccountContent").AccountContent>;

    private dataFetchTask: Task<void> | undefined;

    constructor(props: IAccountPageProps) {
        super(props);

        this.accountDetails = new AsyncData();
        this.updateSelectedAccount();

        this.contentComponentBoxed = new AsyncData();
        import("./AccountContent").then(({ AccountContent }) => {
            this.contentComponentBoxed.update(AccountContent);
        }).catch(e => {
            this.props.logger.error("Couldn't load account content component", e);
            this.contentComponentBoxed.update(void 0);
        });
    }

    componentDidUpdate(prevProps: IAccountPageProps) {
        if (this.props.accountHash !== prevProps.accountHash) {
            this.updateSelectedAccount();
        }
    }

    componentWillUnmount() {
        if (this.dataFetchTask) {
            this.dataFetchTask.cancel();
        }
    }

    private updateSelectedAccount() {
        this.accountDetails.reset();
        this.threeBoxData = void 0;

        let accountHash = this.props.accountHash;

        if (this.dataFetchTask) {
            this.dataFetchTask.cancel();
        }
        this.dataFetchTask = new Task(
            async (cancelToken) => this.fetchAccountData(accountHash, cancelToken)
                .catch(e => {
                    if (!(e instanceof OperationCanceledError)) {
                        throw e;
                    }
                })
        );
        this.dataFetchTask.start()
            .catch(e => this.props.logger.error(e));
    }

    private async fetchAccountData(accountHash: string, cancelToken: CancellationToken) {
        if (accountHash.length !== 40) {
            // Invalid account address
            this.accountDetails.update(void 0);
            return;
        }

        this.identicon = this.props.identiconGenerator.get(accountHash);

        let detailsPromise = this.props.accountDetailsStore
            .fetch(accountHash)
            .catch(async e => {
                // Check for cancelation because we cause side-effects in this block (setting freshAccount)
                cancelToken.throwIfCancelled();
                if (!(e instanceof NotFoundError)) {
                    this.props.logger.error(`Couldn't fetch account details`, e);
                    // Not found means it's a fresh account so we'll handle it below, otherwise error
                    return void 0;
                }
                this.props.logger.warn("Account details not found. Probably a fresh account" , e);

                let isValidAddress = this.props.web3.utils.isAddress(accountHash);
                if (!isValidAddress) {
                    return void 0;
                }

                // No data from server and valid hash means it's a fresh account
                let freshAccount: IAccountDetails = {
                    address: accountHash,
                    type: "Unnown",
                    balance: new BigNumber(0),
                    hasContractAccountCode: false,
                    accountCode: ""
                };
                return freshAccount;
            });

        let renderDetailsPromise = detailsPromise.then(accountDetails => {
            cancelToken.throwIfCancelled();
            this.accountDetails.update(accountDetails);
        });

        let loadPromise = Promise.all([renderDetailsPromise]).then(() => {
            try {
                if (this.props.onLoadComplete) {
                    this.props.onLoadComplete();
                }
            } catch (e) {
                this.props.logger.error("Load handler failed", e);
            }
        });

        return loadPromise;
    }

    render() {
        let tr = this.props.translation;
        let accountDetails = this.accountDetails;

        if (accountDetails.isLoading() || this.contentComponentBoxed.isLoading()) {
                return (
                    <LoadingBox translation={tr} colors="secondary" />
                );
            }

        let errorBox = <ErrorBox colors="secondary">
            <span dangerouslySetInnerHTML={{__html:
                accountDetails.isLoaded() ?
                    tr.get("general.error") :
                    tr.get("accountView.content.noData.text")
            }} />
        </ErrorBox>;

        if (!accountDetails.isLoaded() || !this.contentComponentBoxed.isLoaded()) {
            return errorBox;
        }

        let ContentComponent = this.contentComponentBoxed.data;

        return <ErrorBoundary errorEl={errorBox} logger={this.props.logger}>
            <ContentComponent
                appConfig={this.props.appConfig}
                accountDetails={accountDetails.data}
                accountHash={this.props.accountHash}
                identicon={this.identicon}
                threeBoxData={this.threeBoxData}
                translation={tr}
                clipboard={this.props.clipboard}
                logger={this.props.logger}
            />
        </ErrorBoundary>;
    }
}
