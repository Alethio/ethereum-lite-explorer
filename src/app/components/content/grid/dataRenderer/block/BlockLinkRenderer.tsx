import * as React from "react";
import { IGridFieldRenderer } from "ethstats-ui/lib/control/grid/state/IGridFieldRenderer";
import { Number } from "ethstats-ui/lib/data/Number";
import { GridLink } from "app/components/content/grid/GridLink";

export class BlockLinkRenderer<T> implements IGridFieldRenderer<T> {
    constructor(
        private locale: string,
        private gridFieldDataGetter: (f: T) => number
    ) {
    }

    render(f: T) {
        let blockNumber = this.gridFieldDataGetter(f);
        return (
            <GridLink to={url => url.getBlock(blockNumber)}>
                <Number locale={this.locale} value={blockNumber} />
            </GridLink>
        );
    }
}
