import * as React from "react";
import { ValueBox, IValueBoxProps } from "ethstats-ui/lib/layout/content/box/ValueBox";
import { Number } from "ethstats-ui/lib/data/Number";
import { ITheme } from "app/theme";

export interface IUnclesCountBoxProps {
    children: number;
    locale: string;
    variant?: IValueBoxProps["variant"];
}

export class UnclesCountBox extends React.Component<IUnclesCountBoxProps> {
    render() {
        return (
            <ValueBox
                colors={(theme: ITheme) => ({
                    background: theme.colors.unclesBoxBg,
                    text: theme.colors.unclesBoxText,
                    border: theme.colors.unclesBoxBorder
                })}
                variant={this.props.variant}
            >
                <Number locale={this.props.locale} value={this.props.children} />
            </ValueBox>
        );
    }
}
