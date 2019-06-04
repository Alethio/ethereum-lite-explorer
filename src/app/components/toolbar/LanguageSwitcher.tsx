import * as React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { ToolbarItem } from "@alethio/ui/lib/layout/toolbar/ToolbarItem";
import { Popover } from "@alethio/ui/lib/overlay/Popover";
import { AppConfig } from "app/AppConfig";
import { UserPreferences } from "app/UserPreferences";
import locales from "app/translation/locales.json";
import { contains } from "@puzzl/browser/lib/dom";
import { ToolbarIconButton } from "@alethio/ui/lib/layout/toolbar/ToolbarIconButton";
import { LanguageIcon } from "@alethio/ui/lib/icon/LanguageIcon";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { Translation } from "@alethio/cms";

const Flag = styled.img`
    cursor: pointer;
    width: 24px;
    height: 24px;
`;

const ListItem = styled.div`
    cursor: pointer;
    height: 32px;
    display: flex;
    align-items: center;

    &:hover {
        color: ${props => props.theme.colors.link};
    }

    ${Flag} {
        margin-right: 16px;
    }
`;

interface ILocaleInfo {
    locale: string;
    label: string;
    flag: string;
}

export interface ILanguageSwitcherProps {
    translation: Translation;
    appConfig: AppConfig;
    userPreferences: UserPreferences;
    onLocaleChange?(): void;
}

@observer
export class LanguageSwitcher extends React.Component<ILanguageSwitcherProps> {
    @observable
    private layerVisible = false;
    private layerEl: HTMLElement;
    private targetEl: HTMLElement;

    private localeInfos: ILocaleInfo[];

    constructor(props: ILanguageSwitcherProps) {
        super(props);

        this.localeInfos = this.props.appConfig.getAvailableLocales()
            .map(locale => {
                let data = (locales as any[]).find(d => d.locale === locale);
                return {
                    locale,
                    label: data.label,
                    flag: require("assets/flags/" + data.country + ".svg")
                } as ILocaleInfo;
            });
    }

    render() {
        return (
            <Popover visible={this.layerVisible} placement="right" offset={8} content={this.renderPopover()}>
                <ToolbarItem>
                    <div ref={ref => this.targetEl = ref!}>
                        <ToolbarIconButton Icon={LanguageIcon} onClick={this.handleLayerToggle} />
                    </div>
                </ToolbarItem>
            </Popover>
        );
    }

    private renderPopover() {
        return <div style={{ padding: "8px 16px" }} ref={ref => this.layerEl = ref!}>
            <div>
                { this.localeInfos.map(({locale, label, flag}) => (
                    <ListItem key={locale} onClick={() => this.selectLocale(locale)}>
                        <Flag src={flag} />
                        {label}
                    </ListItem>
                ))}
            </div>
        </div>;
    }

    private selectLocale(locale: string) {
        this.layerVisible = false;
        this.props.userPreferences.setLocale(locale);
        this.props.userPreferences.save();
        if (this.props.onLocaleChange) {
            this.props.onLocaleChange();
        }
    }

    private handleLayerToggle = () => {
        this.toggleLayer();
    }

    private handleDocumentClick = (e: MouseEvent) => {
        if (!contains(this.layerEl, e.target as HTMLElement) &&
            !contains(this.targetEl, e.target as HTMLElement)) {
            this.layerVisible = false;
        }
    }

    private toggleLayer() {
        this.layerVisible = !this.layerVisible;
        if (this.layerVisible) {
            document.addEventListener("click", this.handleDocumentClick);
        } else {
            document.removeEventListener("click", this.handleDocumentClick);
        }
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleDocumentClick);
    }
}
