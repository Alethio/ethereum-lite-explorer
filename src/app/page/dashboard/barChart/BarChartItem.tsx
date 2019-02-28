import * as React from "react";
import styled from "app/styled-components";
import { Tooltip } from "ethstats-ui/lib/overlay/tooltip/Tooltip";
import { Link } from "app/components/Link";
import { BarChartItemBar } from "./BarChartItemBar";

export const BarChartItemRoot = styled.div`
    cursor: pointer;
`;

interface IHitBoxProps {
    maxHeight: number;
}

const BarChartItemHitBox = styled<IHitBoxProps, "div">("div")`
    height: ${({maxHeight}) => maxHeight}px;
    padding-left: 4px;
    padding-right: 4px;
    display: flex;
    align-items: flex-end;
`;

interface IWrapperProps {
    percent: number;
    maxHeight: number;
}

const BarChartItemBarWrapper = styled<IWrapperProps, "div">("div")`
    width: 8px;
    height: ${props => Math.round(props.percent * props.maxHeight / 100)}px;
    min-height: 8px;
`;

interface IBarChartItemProps {
    value: number;
    maxHeight: number;
    link: string;
    tooltip: React.ReactNode;
    active?: boolean;
}

export class BarChartItem extends React.Component<IBarChartItemProps> {
    private barEl: HTMLElement;

    render() {
        return (
            <BarChartItemRoot>
                <Tooltip
                    placement="top"
                    nonInteractive
                    showDelay={0}
                    hideDelay={0}
                    offset={10}
                    referenceElement={() => this.barEl}
                    content={this.props.tooltip}
                >
                    <Link to={this.props.link}>
                        <BarChartItemHitBox maxHeight={this.props.maxHeight}>
                            <BarChartItemBarWrapper percent={this.props.value} maxHeight={this.props.maxHeight}>
                                <BarChartItemBar active={this.props.active} innerRef={ref => this.barEl = ref!} />
                            </BarChartItemBarWrapper>
                        </BarChartItemHitBox>
                    </Link>
                </Tooltip>
            </BarChartItemRoot>
        );
    }
}
