import * as React from "react";
import ReactDOM from "react-dom";
import styled from "app/styled-components";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Translation } from "app/Translation";
import { Fade } from "ethstats-ui/lib/fx/Fade";
import { Mask } from "ethstats-ui/lib/overlay/Mask";
import { CloseIcon } from "ethstats-ui/lib/icon/CloseIcon";
import { ToolbarIconButton } from "ethstats-ui/lib/layout/toolbar/ToolbarIconButton";
import { SearchInline } from "app/components/toolbar/search/SearchInline";
import { TopbarItem } from "ethstats-ui/lib/layout/topbar/TopbarItem";
import { Feedback } from "app/components/toolbar/Feedback";
import { ExternalLink } from "app/components/ExternalLink";
import { AlethioIconButton } from "ethstats-ui/lib/layout/toolbar/AlethioIconButton";
import { Search } from "app/data/search/Search";
import { SearchInlineStore } from "app/data/search/SearchInlineStore";
import { SearchIcon } from "ethstats-ui/lib/icon/SearchIcon";
import { MenuItem } from "app/components/topbar/MenuItem";
import { LanguageSwitcher } from "app/components/toolbar/LanguageSwitcher";
import { AppConfig } from "app/AppConfig";
import { UserPreferences } from "app/UserPreferences";
import { SearchInlineWrapper } from "app/components/toolbar/search/SearchInlineWrapper";

const Layer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 64px;
    box-sizing: border-box;
`;

export interface ITomMenuLayerProps {
    open: boolean;
    translation: Translation;
    search: Search;
    searchInlineStore: SearchInlineStore;
    appConfig: AppConfig;
    userPreferences: UserPreferences;
    onRequestOpen(): void;
    onRequestClose(): void;
}

@observer
export class TopMenuLayer extends React.Component<ITomMenuLayerProps> {
    @observable
    searchOpen = false;

    render() {
        let { open, translation: tr } = this.props;

        return ( open ?
        ReactDOM.createPortal(<Fade duration={.2}>
            <Mask onClick={this.handleRootClick} />
            <Layer>
                <TopbarItem>
                    <ToolbarIconButton onClick={this.onClose} Icon={CloseIcon} iconSize={48} />
                </TopbarItem>
                { this.searchOpen ? <div>
                    <SearchInlineWrapper>
                        <SearchInline
                            translation={tr} search={this.props.search}
                            searchInlineStore={this.props.searchInlineStore}
                            onRequestClose={this.onClose}
                        />
                    </SearchInlineWrapper>
                </div> : <Content>
                    <MenuItem title={this.props.translation.get("toolbar.search.label")}>
                        <ToolbarIconButton
                            Icon={SearchIcon}
                            onClick={() => {
                                this.searchOpen = true;
                            }}
                        />
                    </MenuItem>
                    <MenuItem title={tr.get("toolbar.feedback.label")} onClick={this.onClose} >
                        <Feedback translation={tr} />
                    </MenuItem>
                    <MenuItem title={tr.get("toolbar.alethio.label")} onClick={this.onClose} >
                        <ExternalLink href="https://aleth.io" rel="noopener noreferrer">
                            <AlethioIconButton />
                        </ExternalLink>
                    </MenuItem>
                    <MenuItem title={tr.get("toolbar.localization.label")} >
                        <LanguageSwitcher
                            appConfig={this.props.appConfig}
                            translation={tr}
                            userPreferences={this.props.userPreferences}
                            onLocaleChange={this.onClose}
                        />
                    </MenuItem>
                </Content> }
            </Layer>
        </Fade>, document.body)
        : null );
    }

    private handleRootClick = (e: React.MouseEvent<{}>) => {
        if (e.target === e.currentTarget) {
            this.onClose();
        }
    }

    private onClose = () => {
        this.searchOpen = false;
        this.props.onRequestClose();
    }

}
