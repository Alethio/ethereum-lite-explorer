import * as React from "react";
import { IMessageBoxProps } from "ethstats-ui/lib/MessageBox";
import { Translation } from "app/Translation";
import { LoadingBox as LoadingBoxBase } from "ethstats-ui/lib/LoadingBox";

export interface ILoadingBoxProps {
    colors?: IMessageBoxProps["colors"];
    translation: Translation;
}

export class LoadingBox extends React.Component<ILoadingBoxProps> {
    render() {
        return (
            <LoadingBoxBase colors={this.props.colors}>
                <span dangerouslySetInnerHTML={{
                    __html: this.props.translation.get("general.loadingText")
                }} />
            </LoadingBoxBase>
        );
    }
}
