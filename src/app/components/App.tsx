import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";
import { createPalette } from "@alethio/explorer-ui/lib/theme/createPalette";
import { createTheme } from "@alethio/explorer-ui/lib/theme/createTheme";
import { Link, Cms, Translation } from "@alethio/cms";
import { ExternalLink } from "@alethio/ui/lib/control/ExternalLink";
import { AppConfig } from "app/AppConfig";
import { observer } from "mobx-react";
import { Toolbar } from "@alethio/ui/lib/layout/toolbar/Toolbar";
import { Page } from "@alethio/ui/lib/layout/Page";
import { Container } from "@alethio/ui/lib/layout/Container";
import { AppLogo } from "app/components/toolbar/AppLogo";
import { Filler } from "@alethio/ui/lib/layout/Filler";
import { LoadingBox } from "@alethio/ui/lib/LoadingBox";
import { ToolbarItem } from "@alethio/ui/lib/layout/toolbar/ToolbarItem";
import { ILogger } from "app/util/log/ILogger";
import { TopBar } from "@alethio/ui/lib/layout/topbar/TopBar";
import { TopbarItem } from "@alethio/ui/lib/layout/topbar/TopbarItem";
import { TopMenuWrapper } from "app/components/topbar/TopMenuWrapper";
import { SidebarMenuWrapper } from "app/components/topbar/SidebarMenuWrapper";
import { observable, autorun } from "mobx";
import { TranslationLoader } from "app/TranslationLoader";
import { UserPreferences } from "app/UserPreferences";
import { LanguageSwitcher } from "app/components/toolbar/LanguageSwitcher";
import { ErrorPage } from "app/components/ErrorPage";
import { ErrorBox } from "@alethio/ui/lib/ErrorBox";
import { ToolbarIconButton } from "@alethio/ui/lib/layout/toolbar/ToolbarIconButton";
import { BriefcaseIcon } from "@alethio/ui/lib/icon/BriefcaseIcon";

const ToolbarWrapper = styled.div`
    flex-shrink: 0;
`;

const CookieBannerWrapper = styled.div`
    position: fixed;
    z-index: 1;
    bottom: 0;
    width: 100%;
`;

enum RootSlotType {
    ToolbarTop = "toolbarTop",
    ToolbarBottom = "toolbarBottom",
    Topbar = "topbar",
    CookieBanner = "cookieBanner",
    Root = "root"
}

export interface IAppProps {
    appConfig: AppConfig;
    logger: ILogger;
    userPreferences: UserPreferences;
}

@observer
export class App extends React.Component<IAppProps> {
    private theme: ITheme;
    @observable
    private translation: Translation;

    constructor(props: IAppProps) {
        super(props);

        this.theme = createTheme(createPalette());

        // On locale switch we create another translation reference to avoid changing all PureComponent-s that
        // currently depend on it
        autorun(async () => {
            let locale = this.props.appConfig.getLocale();
            this.translation = new Translation(await new TranslationLoader().load(locale));
        });
    }

    public render() {
        return <Cms<RootSlotType>
            config={this.props.appConfig.getCmsConfig()}
            logger={this.props.logger}
            theme={this.theme}
            locale={this.props.appConfig.getLocale()}
            defaultLocale={this.props.appConfig.getDefaultLocale()}
            renderErrorPage={this.getErrorPage}
            renderErrorPlaceholder={this.getPageErrorPlaceholder}
            renderLoadingPlaceholder={this.getPageLoadingPlaceholder}
        >
            { ({ slots, routes, sidebarMobileStore }) => {
                const translation = this.translation;

                if (!translation) {
                    return null;
                }

                return <Container zIndex={0}>
                    <ToolbarWrapper>
                        <Toolbar zIndex={1}>
                            <ToolbarItem>
                                <Link to="/">
                                    <AppLogo />
                                </Link>
                            </ToolbarItem>
                            { slots && slots[RootSlotType.ToolbarTop] }
                            <Filler />
                            { slots && slots[RootSlotType.ToolbarBottom]}
                            <LanguageSwitcher
                                appConfig={this.props.appConfig}
                                translation={translation}
                                userPreferences={this.props.userPreferences}
                            />
                            <ToolbarItem title={translation.get("toolbar.alethio.label")} >
                                <ExternalLink href="https://company.aleth.io" rel="noopener noreferrer">
                                    <ToolbarIconButton Icon={BriefcaseIcon} />
                                </ExternalLink>
                            </ToolbarItem>
                        </Toolbar>
                    </ToolbarWrapper>
                    <Page>
                        <ToolbarWrapper>
                            <TopBar zIndex={1}>
                                <TopMenuWrapper
                                    translation={translation}
                                    appConfig={this.props.appConfig}
                                    userPreferences={this.props.userPreferences}
                                    slots={slots && slots[RootSlotType.Topbar]}
                                />
                                <Filler />
                                <TopbarItem>
                                    <Link to="/">
                                        <AppLogo />
                                    </Link>
                                </TopbarItem>
                                <Filler />
                                <SidebarMenuWrapper sidebarMobileStore={sidebarMobileStore} />
                            </TopBar>
                        </ToolbarWrapper>
                        { routes }
                    </Page>
                    { slots && slots[RootSlotType.CookieBanner] ?
                    <CookieBannerWrapper>
                        { slots[RootSlotType.CookieBanner] }
                    </CookieBannerWrapper>
                    : null }
                    { slots && slots[RootSlotType.Root] }
                </Container>;
            }}
        </Cms>;
    }

    private getErrorPage = () => {
        if (!this.translation) {
            return null;
        }
        return <ErrorPage translation={this.translation} />;
    }

    private getPageErrorPlaceholder = () => {
        if (!this.translation) {
            return null;
        }
        return <ErrorBox>
            <span dangerouslySetInnerHTML={{ __html: this.translation.get("general.error") }} />
        </ErrorBox>;
    }

    private getPageLoadingPlaceholder = () => {
        if (!this.translation) {
            return null;
        }
        return <LoadingBox>
            <span dangerouslySetInnerHTML={{ __html: this.translation.get("general.loadingText") }} />
        </LoadingBox>;
    }
}
