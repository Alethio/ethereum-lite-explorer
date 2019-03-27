import { observable, computed, action } from "mobx";

const enum ViewModes {
    TableList,
    HeatMapGrid
}

export class TxsViewMode {
    @observable
    private txsViewMode = ViewModes.HeatMapGrid;

    @computed
    public get getTxsViewMode() {
        return this.txsViewMode;
    }

    @action
    private setTxsViewMode(mode: number) {
        this.txsViewMode = mode;
    }

    public setToTableList() {
        this.setTxsViewMode(ViewModes.TableList);
    }

    public setToHeatMapGrid() {
        this.setTxsViewMode(ViewModes.HeatMapGrid);
    }

    @computed get isTableList() {
        return this.txsViewMode === ViewModes.TableList;
    }

    @computed get isHeatMapGrid() {
        return this.txsViewMode === ViewModes.HeatMapGrid;
    }
}
