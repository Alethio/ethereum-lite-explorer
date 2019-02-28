import * as React from "react";
import { Translation } from "app/Translation";
import { Grid as GridBase, IGridProps as IGridBaseProps } from "ethstats-ui/lib/control/grid/Grid";

export interface IGridProps<TData> {
    rows: IGridBaseProps<TData>["rows"];
    limitRows?: boolean;
    maxVisibleRows?: number;
    fields: IGridBaseProps<TData>["fields"];
    sortingOptions: IGridBaseProps<TData>["sortingOptions"];
    translation: Translation;
}

export class Grid<TData> extends React.Component<IGridProps<TData>> {
    render() {
        let { translation: tr, ...props} = this.props;

        return <GridBase<TData>
            {...props}
            noDataText={tr.get("general.grid.footer.norowsavailable.label")}
            loadMoreText={tr.get("general.grid.footer.loadMore.label")}
        />;
    }
}
