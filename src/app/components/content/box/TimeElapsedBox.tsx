import {
    TimeElapsedBox as TimeElapsedBoxBase,
    ITimeElapsedBoxProps as ITimeElapsedBoxPropsBase } from "ethstats-ui/lib/data/box/TimeElapsedBox";
import { Translation } from "app/Translation";
import React from "react";
import { getRelativeTimeTranslations } from "app/helpers/getRelativeTimeTranslations";

export interface ITimeElapsedBoxProps
    extends Pick<ITimeElapsedBoxPropsBase, Exclude<keyof ITimeElapsedBoxPropsBase, "translations">> {
    translation: Translation;
}

export class TimeElapsedBox extends React.Component<ITimeElapsedBoxProps> {
    render() {
        return <TimeElapsedBoxBase {...this.props}
            translations={getRelativeTimeTranslations(this.props.translation)} />;
    }
}
