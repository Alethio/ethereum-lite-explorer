import * as React from "react";
import { ValueBox, IValueBoxProps } from "ethstats-ui/lib/layout/content/box/ValueBox";
import { Link } from "app/components/Link";
import { ITheme } from "app/theme";

interface IBlockNumberBoxProps {
    variant?: IValueBoxProps["variant"];
    noLink?: boolean;
    children: number;
}

export class BlockNumberBox extends React.Component<IBlockNumberBoxProps> {
    render() {
        let { children, variant, noLink } = this.props;

        let box = <ValueBox
            colors={(theme: ITheme) => ({
                background: theme.colors.blockColorCode,
                text: theme.colors.blockBoxText
            })}
            variant={variant}
        >
            #{ children }
        </ValueBox>;

        return !noLink ? <Link to={url => url.getBlock(children)}>{box}</Link> : box;
    }
}
