import * as React from "react";
import { Spacer } from "ethstats-ui/lib/layout/Spacer";
import {
    AccordionHorizontal, IAccordionHorizontalProps
} from "ethstats-ui/lib/control/accordion/AccordionHorizontal";
import { NotAvailableBox } from "app/components/content/box/NotAvailableBox";
import { Translation } from "app/Translation";
import { Expander } from "ethstats-ui/lib/control/expander/Expander";
import { IAccordionItemConfig } from "ethstats-ui/lib/control/accordion/IAccordionItemConfig";
import styled from "app/styled-components";
import { AccordionContentFrame } from "ethstats-ui/lib/control/accordion/AccordionContentFrame";
import { SourceCodeAsyncRenderer } from "app/page/account/contractDetails/SourceCodeAsyncRenderer";
import { CreationCodeSection } from "app/page/account/contractDetails/CreationCodeSection";
import { evmLanguage } from "app/page/account/contractDetails/evmLanguage";
import { PADDING_LEFT, ContentLeftPadded } from "app/page/account/ContentLeftPadded";
import { ScrollIntoView } from "ethstats-ui/lib/util/react/ScrollIntoView";
import { AccordionItemContentStatus } from "ethstats-ui/lib/control/accordion/AccordionItemContentStatus";
import { IContractAccountDetails } from "app/data/account/details/IContractAccountDetails";
import { ErrorBox } from "ethstats-ui/lib/ErrorBox";
import { LoadingBox } from "app/components/LoadingBox";
import { evmDisasm } from "app/page/account/contractDetails/evmDisasm";
import { Clipboard } from "app/helpers/Clipboard";
import { ILogger } from "app/util/log/ILogger";

const CONTENT_ANIM_SECONDS = .2;
const ACCORDION_CONTENT_HEIGHT = 500;

const ExpanderWrapper = styled.div`
    &:first-child {
        margin-left: 0;
    }
    margin-left: 8px;
`;

const AccordionFrameWrapper = styled.div`
    margin-bottom: -${({theme}) => theme.spacing.contentBottom}px;
`;

interface IContractAccordionItemConfig extends IAccordionItemConfig {
    label: string;
    disabled?: boolean;
}

export interface IContractDetailsProps {
    accountDetails: IContractAccountDetails;
    clipboard: Clipboard;
    translation: Translation;
    locale: string;
    logger: ILogger;
}

export class ContractDetails extends React.PureComponent<IContractDetailsProps> {
    render() {
        let { translation: tr } = this.props;
        let items = this.buildItems(tr);

        return (
            <ContentLeftPadded>
                <Spacer height="48px" />
                <AccordionHorizontal
                    label={tr.get("accountView.contract.info.label")}
                    noDataContent={<NotAvailableBox translation={tr} />}
                    items={items}
                    renderExpander={this.renderExpander}
                    renderContent={this.renderContent}
                    loadingText={`${tr.get("general.loading")}...`}
                    contentAnimSeconds={CONTENT_ANIM_SECONDS}
                    errorText={tr.get("general.error")}
                    onContentError={(e, item) => {
                        this.props.logger.error(`Couldn't load content for contract details tab #${item.index}`, e);
                    }}
                />
            </ContentLeftPadded>
        );
    }

    private renderExpander: IAccordionHorizontalProps<IContractAccordionItemConfig>["renderExpander"] =
    ({config, isOpen, onClick}) => {
        return <ExpanderWrapper><Expander
            label={config.label}
            disabled={config.disabled}
            open={isOpen}
            locale={this.props.locale}
            onClick={onClick}
        /></ExpanderWrapper>;
    }

    private renderContent: IAccordionHorizontalProps<IContractAccordionItemConfig>["renderContent"] =
    ({content, status, arrowPosition}) => {

        return <AccordionFrameWrapper style={{marginLeft: -PADDING_LEFT}}>
            <AccordionContentFrame arrowPosition={arrowPosition ? arrowPosition + PADDING_LEFT : void 0}>
                {/* key ensure component remounts/scrolls into view whenever status changes*/}
                {/* HACK: Seems waiting for height animation to finish is not enough so we add a bit extra */}
                <ScrollIntoView delay={CONTENT_ANIM_SECONDS + .1} key={status}>
                    <div style={{ minHeight: ACCORDION_CONTENT_HEIGHT }}>
                        { status === AccordionItemContentStatus.Loaded ?
                            content :
                            status === AccordionItemContentStatus.Error ?
                                <ErrorBox colors="secondary">
                                    {this.props.translation.get("accountView.contract.noData.text")}
                                </ErrorBox> :
                                <LoadingBox colors="secondary" translation={this.props.translation} />
                        }
                    </div>
                </ScrollIntoView>
            </AccordionContentFrame>
        </AccordionFrameWrapper>;
    }

    private buildItems(tr: Translation) {
        let accountDetails = this.props.accountDetails;
        let sourceCodeAsyncRenderer = new SourceCodeAsyncRenderer(ACCORDION_CONTENT_HEIGHT);

        let items: IContractAccordionItemConfig[] = [
            {
                label: tr.get("accountView.contract.accountCode.label"),
                disabled: !accountDetails.hasContractAccountCode,
                content: async () => {
                    let [accountCode, monaco] = await Promise.all([
                        accountDetails.accountCode,
                        await import("monaco-editor/esm/vs/editor/editor.api"),
                        await sourceCodeAsyncRenderer.load()
                    ]);

                    // Setup syntax highlighting for op codes view
                    monaco.languages.register({ id: "evm"});
                    monaco.languages.setMonarchTokensProvider("evm", evmLanguage);
                    let byteCodeEl = sourceCodeAsyncRenderer.render(
                        accountCode,
                        "",
                        { wordWrap: "on", lineNumbers: "off" }
                    );

                    let opCode = evmDisasm(accountCode);
                    let opCodeEl = sourceCodeAsyncRenderer.render(opCode, "evm");

                    return <CreationCodeSection
                        opCode={opCode}
                        opCodeElement={opCodeEl}
                        byteCode={accountCode}
                        byteCodeElement={byteCodeEl}
                        clipboard={this.props.clipboard}
                        translation={tr}
                    />;
                }
            }
        ];
        return items;
    }
}
