import * as React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { ToolbarIconButton } from "@alethio/ui/lib/layout/toolbar/ToolbarIconButton";
import { HamburgerIcon } from "@alethio/ui/lib/icon/HamburgerIcon";
import { TopbarItem } from "@alethio/ui/lib/layout/topbar/TopbarItem";
import { TopMenuLayer } from "app/components/topbar/TopMenuLayer";
import { AppConfig } from "app/AppConfig";
import { UserPreferences } from "app/UserPreferences";
import { Translation } from "@alethio/cms";

export interface ITopMenuWrapperProps {
    translation: Translation;
    appConfig: AppConfig;
    userPreferences: UserPreferences;
    slots?: JSX.Element[];
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
                    translation={tr}
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
