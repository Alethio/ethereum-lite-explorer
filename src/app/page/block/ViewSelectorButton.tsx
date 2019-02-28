import styled from "app/styled-components";
import * as React from "react";

const HEIGHT = 28;
interface IViewSelectorButtonProps {
    active?: boolean;
    className?: string;
    onClick?(): void;
}
const $ViewSelectorButton: React.StatelessComponent<IViewSelectorButtonProps> = ({ children, className, onClick }) => (
    <div className={className} onClick={onClick}>{children}</div>
);
export const ViewSelectorButton = styled($ViewSelectorButton)`
    height: ${HEIGHT}px;
    width: ${HEIGHT}px;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
    padding: 1px;
    border: 1px solid ${({active, theme}) => active ? theme.colors.txViewSelector : "transparent"};
    color: ${({active, theme}) => active ? theme.colors.txViewSelectorActive : theme.colors.txViewSelector};
    &:hover {
        border: 1px solid ${({theme}) => theme.colors.txViewSelector};
        color: ${({theme}) => theme.colors.txViewSelectorActive};
    }
`;
