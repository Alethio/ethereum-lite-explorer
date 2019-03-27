import * as React from "react";
import styled, { css } from "app/styled-components";
import { BarChartItemRoot } from "./BarChartItem";

interface IBarChartItemBarProps {
    active?: boolean;
    disabled?: boolean;
    innerRef?(instance: HTMLDivElement): void;
}

/**
 * TODO: pass color scheme using props
 */
const BarChartItemBarRoot = styled<IBarChartItemBarProps, "div">("div")`
    height: 100%;
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
    ${BarChartItemRoot}:hover & {
        border: 2px solid ${props.theme.colors.blockColorCode};
        background-color: transparent;
    }
    ` : ``}
    ${props => props.disabled ? css`
    opacity: .5;
    ` : ``}
`;

export const BarChartItemBar: React.StatelessComponent<IBarChartItemBarProps> = (props) => (
    <BarChartItemBarRoot {...props}></BarChartItemBarRoot>
);
