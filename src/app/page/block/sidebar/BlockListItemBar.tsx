import * as React from "react";
import styled, { css } from "app/styled-components";
import { BlockListItemRoot } from "app/page/block/sidebar/BlockListItem";

interface IBlockListItemBarProps {
    active?: boolean;
    disabled?: boolean;
    innerRef?(instance: HTMLDivElement): void;
}

const BlockListItemBarRoot = styled<IBlockListItemBarProps, "div">("div")`
    height: 8px;
    box-sizing: border-box;
    border: 2px solid ${props => (
        props.active ?
        props.theme.colors.blockColorCode :
        props.theme.colors.blockListItem
    )};
    background-color: ${props => (
        props.active ?
        props.theme.colors.blockColorCode :
        props.theme.colors.blockListItem
    )};

    ${props => !props.disabled && !props.active ? css`
    ${BlockListItemRoot}:hover & {
        border: 2px solid ${props.theme.colors.blockColorCode};
        background-color: transparent;
    }
    ` : ``}
    ${props => props.disabled ? css`
    opacity: .5;
    ` : ``}
`;

export const BlockListItemBar: React.StatelessComponent<IBlockListItemBarProps> = (props) => (
    <BlockListItemBarRoot {...props}></BlockListItemBarRoot>
);
