import * as React from "react";
import { Label } from "ethstats-ui/lib/data/Label";
import { LayoutRow } from "ethstats-ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "ethstats-ui/lib/layout/content/LayoutRowItem";
import { AddressHashBox } from "app/components/content/box/account/AddressHashBox";
import { ContentTop } from "app/page/account/ContentTop";
import { ContentBottom } from "app/page/account/ContentBottom";
import { IdenticonWrapper } from "./identicon/IdenticonWrapper";
import { AccountTypeBox } from "app/components/content/box/account/AccountTypeBox";
import { IAccountDetails } from "app/data/account/details/IAccountDetails";
import { IdenticonProxy } from "app/data/account/identicon/IdenticonProxy";
import { AppConfig } from "app/AppConfig";
import { Translation } from "app/Translation";
import { QrCodeBox } from "app/page/account/qrCode/QrCodeBox";
import { ContractDetails } from "app/page/account/ContractDetails";
import { isContractAccountDetails } from "app/data/account/details/isContractAccountDetails";
import { Content } from "app/page/account/Content";
import { Clipboard } from "app/helpers/Clipboard";
import { ILogger } from "app/util/log/ILogger";
import { IThreeBoxData } from "app/page/account/AccountPage";
import { ValueBox } from "ethstats-ui/lib/layout/content/box/ValueBox";
import { weiToEth } from "app/util/wei";
import { ResponsiveContainer, MinimumWidth } from "ethstats-ui/lib/layout/responsive/ResponsiveContainer";

export interface IAccountContentProps {
    appConfig: AppConfig;
    translation: Translation;
    accountHash: string;
    accountDetails: IAccountDetails;
    identicon: IdenticonProxy;
    threeBoxData: IThreeBoxData | undefined;
    clipboard: Clipboard;
    logger: ILogger;
}

export class AccountContent extends React.PureComponent<IAccountContentProps> {

    render() {
        let locale = this.props.appConfig.getLocale();
        let tr = this.props.translation;
        let account = this.props.accountDetails;
        let { clipboard } = this.props;

        return (
            <Content>
                <ContentTop>
                    <IdenticonWrapper
                        identicon={this.props.identicon}
                        threeBoxData={this.props.threeBoxData}
                        appConfig={this.props.appConfig}
                        translation={tr}
                    />
                    <div style={{flex: "1 1 auto"}}>
                        <LayoutRow minWidth={660}>
                            <LayoutRowItem>
                                <Label>{tr.get("accountView.content.accountHash.label")}</Label>
                                <AddressHashBox noLink clipboard={clipboard}>
                                    {this.props.accountHash}
                                </AddressHashBox>
                            </LayoutRowItem>
                            <LayoutRowItem>
                                <Label>{tr.get("accountView.content.accountType.label")}</Label>
                                <AccountTypeBox>
                                    {account.type === "Contract Account" ? tr.get("accountView.type.Contract") :
                                        tr.get("accountView.type.External")}
                                </AccountTypeBox>
                                <QrCodeBox value={"0x" + this.props.accountHash} logger={this.props.logger} />
                            </LayoutRowItem>
                        </LayoutRow>
                        <LayoutRow>
                            <LayoutRowItem>
                                <Label>{tr.get("accountView.content.balance.label")}</Label>
                                <ValueBox>{`${weiToEth(account.balance)}`} ETH</ValueBox>
                            </LayoutRowItem>
                        </LayoutRow>
                    </div>
                </ContentTop>
                <ContentBottom>
                    { isContractAccountDetails(account) ?
                    <ResponsiveContainer behavior="hide" forScreenWidth={{lowerThan: MinimumWidth.ForFullView}}>
                        <ContractDetails
                            accountDetails={account}
                            clipboard={this.props.clipboard}
                            translation={tr}
                            locale={locale}
                            logger={this.props.logger}
                        />
                    </ResponsiveContainer>
                    : null }
                </ContentBottom>
            </Content>
        );
    }
}
