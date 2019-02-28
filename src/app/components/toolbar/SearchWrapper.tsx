import * as React from "react";
import { Translation } from "app/Translation";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { SearchLayer } from "app/components/toolbar/search/SearchLayer";
import { Search } from "app/data/search/Search";
import { SearchInlineStore } from "app/data/search/SearchInlineStore";

export interface ISearchWrapperProps {
    translation: Translation;
    search: Search;
    searchInlineStore: SearchInlineStore;
    searchTriggerRender(handleLayerToggle: () => void): React.ReactNode;
}

@observer
export class SearchWrapper extends React.Component<ISearchWrapperProps> {
    @observable
    private layerVisible = false;

    render() {
        let { translation: tr } = this.props;

        return (
            <>
                { this.props.searchTriggerRender(this.handleLayerToggle) }
                <SearchLayer
                    open={this.layerVisible}
                    onRequestClose={this.handleLayerToggle}
                    onRequestOpen={this.handleLayerToggle}
                    translation={tr}
                    search={this.props.search}
                    searchInlineStore={this.props.searchInlineStore}
                />
            </>
        );
    }

    private handleLayerToggle = () => {
        this.toggleLayer();
    }

    private toggleLayer() {
        this.layerVisible = !this.layerVisible;
    }
}
