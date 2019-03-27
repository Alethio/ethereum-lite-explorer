import * as React from "react";
import { Container } from "ethstats-ui/lib/layout/Container";
import { Sidebar } from "ethstats-ui/lib/layout/sidebar/Sidebar";
import { Content } from "ethstats-ui/lib/layout/Content";
import { Logo } from "app/page/uncle/sidebar/Logo";
import { AppConfig } from "app/AppConfig";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { Translation } from "app/Translation";
import { LogoContainer } from "ethstats-ui/lib/layout/sidebar/LogoContainer";
import { UncleDetailsStore } from "app/data/uncle/details/UncleDetailsStore";
import { IUncleDetails } from "app/data/uncle/details/IUncleDetails";
import { LoadingBox } from "app/components/LoadingBox";
import { ErrorBox } from "ethstats-ui/lib/ErrorBox";
import { AsyncData } from "app/data/AsyncData";
import { Clipboard } from "app/helpers/Clipboard";
import { ErrorBoundary } from "ethstats-ui/lib/util/react/ErrorBoundary";
import { ILogger } from "app/util/log/ILogger";
import { NotFoundError } from "app/data/NotFoundError";
import { Task } from "@puzzl/core/lib/async/Task";
import { CancellationToken, OperationCanceledError } from "@puzzl/core/lib/async/cancellation";
import { SidebarPageTitle } from "ethstats-ui/lib/layout/sidebar/SidebarPageTitle";

interface IUnclePageProps {
    blockNr: number;
    uncleIndex: number;
    appConfig: AppConfig;
    translation: Translation;
    uncleDetailsStore: UncleDetailsStore;
    clipboard: Clipboard;
    logger: ILogger;
}

@observer
export class UnclePage extends React.Component<IUnclePageProps, {}> {
    @observable.ref
    private uncleDetails: AsyncData<IUncleDetails>;
    @observable.ref
    private contentComponentBoxed: AsyncData<typeof import("./UncleContent").UncleContent>;
    private dataFetchTask: Task<void> | undefined;

    constructor(props: IUnclePageProps) {
        super(props);

        this.uncleDetails = new AsyncData();
        this.updateSelectedUncle();

        this.contentComponentBoxed = new AsyncData();
        import("./UncleContent").then(({ UncleContent }) => {
            this.contentComponentBoxed.update(UncleContent);
        }).catch(e => {
            this.props.logger.error("Couldn't load uncle content component", e);
            this.contentComponentBoxed.update(void 0);
        });
    }

    componentDidUpdate(prevProps: IUnclePageProps) {
        if (this.props.blockNr !== prevProps.blockNr) {
            window.scrollTo(0, 0);
            this.updateSelectedUncle();
        }
    }

    componentWillUnmount() {
        if (this.dataFetchTask) {
            this.dataFetchTask.cancel();
        }
    }

    private updateSelectedUncle() {
        let { blockNr, uncleIndex } = this.props;

        this.uncleDetails.reset();

        if (this.dataFetchTask) {
            this.dataFetchTask.cancel();
        }
        this.dataFetchTask = new Task(
            async (cancelToken) => this.fetchUncleData(blockNr, uncleIndex, cancelToken)
                .catch(e => {
                    if (!(e instanceof OperationCanceledError)) {
                        throw e;
                    }
                })
        );
        this.dataFetchTask.start()
            .catch(e => this.props.logger.error(e));
    }

    private fetchUncleData(blockNr: number, uncleIndex: number, cancelToken: CancellationToken) {
        return this.props.uncleDetailsStore
            .fetch(blockNr, uncleIndex)
            .catch(e => {
                if (!(e instanceof NotFoundError)) {
                    this.props.logger.error(`Couldn't fetch uncle details (block nr = ${blockNr})
                     (uncleIndex = ${uncleIndex})`, e);
                }
                return void 0;
            })
            .then(uncleDetails => {
                cancelToken.throwIfCancelled();
                this.uncleDetails.update(uncleDetails);
            });
    }

    render() {
        let tr = this.props.translation;

        return (
            <Container>
                <Sidebar sticky>
                    <SidebarPageTitle>{ tr.get("uncleView.sidebar.title") }</SidebarPageTitle>
                    <LogoContainer>
                        <Logo>{tr.get("uncleView.sidebar.logo")}</Logo>
                    </LogoContainer>
                </Sidebar>
                <Content>
                    { this.renderContent() }
                </Content>
            </Container>
        );
    }

    private renderContent() {
        let locale = this.props.appConfig.getLocale();
        let tr = this.props.translation;

        if (this.uncleDetails.isLoading() || this.contentComponentBoxed.isLoading()) {
            return <LoadingBox translation={tr} />;
        }

        let errorBox = <ErrorBox>
            <span dangerouslySetInnerHTML={{__html:
                this.uncleDetails.isLoaded() ?
                tr.get("general.error") :
                tr.get("uncleView.content.noData.text")
            }} />
        </ErrorBox>;

        if (!this.uncleDetails.isLoaded() || !this.contentComponentBoxed.isLoaded()) {
            return errorBox;
        }

        let UncleContent = this.contentComponentBoxed.data;

        return <ErrorBoundary errorEl={errorBox} logger={this.props.logger}>
            <UncleContent
                uncleDetails={this.uncleDetails.data}
                locale={locale}
                translation={tr}
                clipboard={this.props.clipboard}
            />
        </ErrorBoundary>;
    }
}
