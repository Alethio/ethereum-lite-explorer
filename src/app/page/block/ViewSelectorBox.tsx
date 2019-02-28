import styled from "app/styled-components";
import * as React from "react";
import { observer } from "mobx-react";
import { ViewSelectorButton } from "./ViewSelectorButton";
import { TxsViewMode } from "app/page/block/txsViews/TxsViewMode";
import { ListViewIcon } from "ethstats-ui/lib/icon/ListViewIcon";
import { GridViewIcon } from "ethstats-ui/lib/icon/GridViewIcon";

const HEIGHT = 28;
const ViewSelectorRoot = styled.div`
    padding: 0 7px;
    display: flex;
    width: ${2 * HEIGHT + 24}px;
    justify-content: space-between;
`;

interface IViewSelectorBoxProps {
    txsViewMode: TxsViewMode;
}

@observer
export class ViewSelectorBox extends React.Component<IViewSelectorBoxProps> {
    private onListClick = () => {
        this.props.txsViewMode.setToTableList();
    }
    private onGridClick = () => {
        this.props.txsViewMode.setToHeatMapGrid();
    }
    render() {
        return (
            <ViewSelectorRoot>
                <ViewSelectorButton active={this.props.txsViewMode.isTableList} onClick={this.onListClick}>
                    <ListViewIcon />
                </ViewSelectorButton>
                <ViewSelectorButton active={this.props.txsViewMode.isHeatMapGrid} onClick={this.onGridClick}>
                    <GridViewIcon />
                </ViewSelectorButton>
            </ViewSelectorRoot>
        );
    }
}
