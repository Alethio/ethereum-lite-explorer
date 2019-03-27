import * as React from "react";
import { Translation } from "app/Translation";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { ToolbarIconButton } from "ethstats-ui/lib/layout/toolbar/ToolbarIconButton";
import { HamburgerIcon } from "ethstats-ui/lib/icon/HamburgerIcon";
import { TopbarItem } from "ethstats-ui/lib/layout/topbar/TopbarItem";
import { TopMenuLayer } from "app/components/topbar/TopMenuLayer";
import { Search } from "app/data/search/Search";
import { SearchInlineStore } from "app/data/search/SearchInlineStore";
import { AppConfig } from "app/AppConfig";
import { UserPreferences } from "app/UserPreferences";

export interface ITopMenuWrapperProps {
    translation: Translation;
    search: Search;
    searchInlineStore: SearchInlineStore;
    appConfig: AppConfig;
    userPreferences: UserPreferences;
}

@observer
export class TopMenuWrapper extends React.Component<ITopMenuWrapperProps> {
    @observable
    private layerVisible = false;

    render() {
        let { translation: tr } = this.props;

        return (
            <>
                <TopbarItem>
                    { !this.layerVisible ?
                    <ToolbarIconButton Icon={HamburgerIcon} iconSize={30} onClick={this.handleLayerToggle} />
                    : null }
                </TopbarItem>
                <TopMenuLayer
                    open={this.layerVisible}
                    onRequestClose={this.handleLayerToggle}
                    onRequestOpen={this.handleLayerToggle}
                    translation={tr}
                    search={this.props.search}
                    searchInlineStore={this.props.searchInlineStore}
                    appConfig={this.props.appConfig}
                    userPreferences={this.props.userPreferences}
                />
            </>
        );
    }

    private handleLayerToggle = () => {
        this.toggleLayer();
    }

    private toggleLayer() {
        this.layerVisible = !this.layerVisible;
        document.body.style.overflowY = this.layerVisible ? "hidden" : "auto";
    }
}
