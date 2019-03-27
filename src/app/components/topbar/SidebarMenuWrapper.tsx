import * as React from "react";
import styled from "app/styled-components";
import { Translation } from "app/Translation";
import { observer } from "mobx-react";
import { ToolbarIconButton } from "ethstats-ui/lib/layout/toolbar/ToolbarIconButton";
import { TopbarItem } from "ethstats-ui/lib/layout/topbar/TopbarItem";
import { SidebarIcon } from "ethstats-ui/lib/icon/SidebarIcon";
import { SidebarMobileStore } from "app/components/topbar/SidebarMobileStore";
import { Fade } from "ethstats-ui/lib/fx/Fade";
import { Mask } from "ethstats-ui/lib/overlay/Mask";
import { CloseIcon } from "ethstats-ui/lib/icon/CloseIcon";

const Layer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
`;

const LayerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 64px;
    box-sizing: border-box;
`;

export interface ISidebarMenuWrapperProps {
    translation: Translation;
    sidebarMobileStore: SidebarMobileStore;
}

@observer
export class SidebarMenuWrapper extends React.Component<ISidebarMenuWrapperProps> {
    render() {
        return (
            <>
            <TopbarItem>
                { this.props.sidebarMobileStore.instancesCount > 0 && !this.props.sidebarMobileStore.sidebarVisible ?
                <ToolbarIconButton Icon={SidebarIcon} iconSize={30} onClick={this.handleLayerToggle} />
                : null }
            </TopbarItem>
            { this.props.sidebarMobileStore.isSidebarVisible ?
                <Fade duration={.2}>
                    <Mask onClick={this.handleLayerToggle} />
                    <Layer>
                        <LayerContent>
                            <TopbarItem>
                                <ToolbarIconButton onClick={this.handleLayerToggle} Icon={CloseIcon} iconSize={48} />
                            </TopbarItem>
                        </LayerContent>
                    </Layer>
                </Fade>
                : null }
            </>
        );
    }

    private handleLayerToggle = () => {
        this.toggleLayer();
    }

    private toggleLayer() {
        this.props.sidebarMobileStore.sidebarVisible = !this.props.sidebarMobileStore.sidebarVisible;
    }
}
