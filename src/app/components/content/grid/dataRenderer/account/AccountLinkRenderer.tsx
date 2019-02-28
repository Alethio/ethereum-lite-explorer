import * as React from "react";
import { IGridFieldRenderer } from "ethstats-ui/lib/control/grid/state/IGridFieldRenderer";
import { Hash } from "ethstats-ui/lib/data/Hash";
import { GridLink } from "app/components/content/grid/GridLink";

export class AccountLinkRenderer<T> implements IGridFieldRenderer<T> {
    constructor(
        private gridFieldDataGetter: (f: T) => string
    ) {
    }

    render(f: T) {
        let hash = this.gridFieldDataGetter(f);
        return (
            <GridLink to={url => url.getAccount(hash)} >
                { hash && <Hash>{ hash }</Hash> }
            </GridLink>
        );
    }
}
