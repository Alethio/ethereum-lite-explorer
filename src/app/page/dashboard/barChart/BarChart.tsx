import * as React from "react";
import styled from "app/styled-components";
import { BarChartItem } from "./BarChartItem";

interface IBarChartStyleProps {
    height: number;
}

interface IBarChartDataItem<TDataItem> {
    key: string | number;
    value?: number;
    data: TDataItem;
}

interface IBarChartProps<TDataItem> extends IBarChartStyleProps {
    data: IBarChartDataItem<TDataItem>[];
    tooltipThunk?(d: IBarChartDataItem<TDataItem>): React.ReactNode;
    linkThunk?(d: IBarChartDataItem<TDataItem>): string;
    activeThunk?(d: IBarChartDataItem<TDataItem>): boolean;
    innerRef?(r: any): void;
}

const BarChartRoot = styled<IBarChartStyleProps, "div">("div")`
    display: flex;
    overflow: hidden;
    height: ${({height}) => height}px;
    align-items: flex-end;
    justify-content: center;
    padding: 16px 8px 20px 8px;
`;

export class BarChart<TDataItem> extends React.Component<IBarChartProps<TDataItem>> {

    private getMaxValue() {
        return this.props.data.reduce((acc, dataItem) => Math.max(acc, !dataItem.value ? 0 : dataItem.value), 0);
    }

    render() {
        let maxValue = this.getMaxValue();
        return (
            <BarChartRoot height={this.props.height} innerRef={(r) => {
                if (this.props.innerRef) { this.props.innerRef(r); }
            }}>
            {
                this.props.data.map((d, i) => <BarChartItem
                    // Make sure each block has a different div, so that tooltips are changed correctly
                    key={d.key}
                    value={d.value ? Math.floor(d.value / maxValue * 100) : 0}
                    maxHeight={this.props.height}
                    link={this.props.linkThunk ? this.props.linkThunk(d) : ""}
                    tooltip={this.props.tooltipThunk ? this.props.tooltipThunk(d) : null}
                    active={this.props.activeThunk ? this.props.activeThunk(d) : false}
                />)
            }
            </BarChartRoot>
        );
    }
}
