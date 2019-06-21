import * as React from "react";
import { observer } from "mobx-react";
import { ToolbarIconButton } from "@alethio/ui/lib/layout/toolbar/ToolbarIconButton";
import { TopbarItem } from "@alethio/ui/lib/layout/topbar/TopbarItem";
import { SidebarIcon } from "@alethio/ui/lib/icon/SidebarIcon";
import { Fade } from "@alethio/ui/lib/fx/Fade";
import { Mask } from "@alethio/ui/lib/overlay/Mask";
import { CloseIcon } from "@alethio/ui/lib/icon/CloseIcon";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { ISidebarMobileStore } from "@alethio/cms";

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
    sidebarMobileStore: ISidebarMobileStore;
}

@observer
export class SidebarMenuWrapper extends React.Component<ISidebarMenuWrapperProps> {
    render() {
        return (
            <>
            <TopbarItem>
                { this.props.sidebarMobileStore.instancesCount > 0 && !this.props.sidebarMobileStore.isSidebarOpen ?
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
        this.props.sidebarMobileStore.isSidebarOpen = !this.props.sidebarMobileStore.isSidebarVisible;
    }
}
