import * as React from "react";
import styled from "ethstats-ui/lib/styled-components";
import { Popover } from "ethstats-ui/lib/overlay/Popover";
import { TooltipText } from "ethstats-ui/lib/overlay/tooltip/TooltipText";

const TooltipContent = styled.div`
    padding: 4px 16px;
`;

export const MenuItemRoot = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;

    background-color: ${props => props.theme.colors.sidebarBg};
    border-radius: 50%;
    box-shadow: 0 24px 56px 0 rgba(39, 54, 86, 0.16);
    margin: 12px;
`;

interface IMenuItemProps {
    title?: string;
    onClick?(): void;
}

export class MenuItem extends React.Component<IMenuItemProps> {
    render() {
        let item = (
            <MenuItemRoot title={this.props.title} onClick={this.props.onClick} >
                {this.props.children}
            </MenuItemRoot>
        );
        return this.props.title ? (
            <Popover
                visible={true}
                content={<TooltipContent>
                    <TooltipText>{this.props.title}</TooltipText>
                </TooltipContent>}
                placement="right"
                offset={16}
                nonInteractive
            >{ item }</Popover>
        ) : item;
    }
}
