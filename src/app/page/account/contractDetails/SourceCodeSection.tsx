import * as React from "react";
import styled from "app/styled-components";
import { CopyIcon } from "ethstats-ui/lib/icon/CopyIcon";
import { Translation } from "app/Translation";
import { Clipboard } from "app/helpers/Clipboard";
import { FloatingActionBar } from "ethstats-ui/lib/overlay/FloatingActionBar";
import { Button } from "ethstats-ui/lib/control/Button";
import { ExternalLink } from "app/components/ExternalLink";
import { IContractDataSource, SourceType } from "app/data/account/details/contract/dataSource/ContractDataSource";

export interface ISourceCodeSectionProps {
    sourceCode: string;
    sourceCodeElement: React.ReactElement<{}>;
    contractAddress: string;
    dataSource: IContractDataSource;
    clipboard: Clipboard;
    translation: Translation;
}

const Disclaimer = styled.div`
    font-size: 14px;
    text-align: center;
    color: ${props => props.theme.colors.label};
`;

export class SourceCodeSection extends React.Component<ISourceCodeSectionProps> {
    render() {
        let { translation: tr, sourceCodeElement } = this.props;
        let disclaimer: React.ReactNode | null = null;
        if (this.props.dataSource.type !== SourceType.Ethstats) {
            let [, disclaimerPre, disclaimerTextLink, disclaimerPost] =
            tr.get(
                "accountView.contract.dataSource." + SourceType[this.props.dataSource.type] + ".label"
            ).match(/(.*){link}(.*){\/link}(.*)/)!;
            disclaimer = (
                <Disclaimer>
                    {disclaimerPre}
                    <ExternalLink href={this.props.dataSource.getUrl(this.props.contractAddress)}>
                        {disclaimerTextLink}
                    </ExternalLink>
                    {disclaimerPost}
                </Disclaimer>
            );
        }

        return (
            <div>
                {sourceCodeElement}
                { disclaimer ?
                <FloatingActionBar position="top-right">
                    { disclaimer }
                </FloatingActionBar>
                : null }
                <FloatingActionBar>
                    <Button floating Icon={CopyIcon} onClick={this.handleCopyCode}>{
                        tr.get("accountView.contract.sourceCode.copyCode.label")
                    }</Button>
                </FloatingActionBar>
            </div>
        );
    }

    private handleCopyCode = () => {
        this.props.clipboard.copy(this.props.sourceCode);
    }
}
