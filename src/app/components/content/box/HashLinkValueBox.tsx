import * as React from "react";
import { IValueBoxProps } from "ethstats-ui/lib/layout/content/box/ValueBox";
import { Link, ILinkProps } from "app/components/Link";
import { HashValueBox } from "ethstats-ui/lib/data/box/HashValueBox";
import { IClipboard } from "ethstats-ui/lib/data/IClipboard";

export interface IHashLinkValueBoxProps {
    children: string;
    variant?: IValueBoxProps["variant"];
    colors?: IValueBoxProps["colors"];
    Icon?: IValueBoxProps["Icon"];
    linkTo?: ILinkProps["to"];
    noTooltip?: boolean;
    clipboard?: IClipboard;
}

export class HashLinkValueBox extends React.Component<IHashLinkValueBoxProps> {
    render() {
        let { children, linkTo } = this.props;

        let box = <HashValueBox
            variant={this.props.variant}
            colors={this.props.colors}
            Icon={this.props.Icon}
            clipboard={this.props.clipboard}
            noTooltip={this.props.noTooltip}
        >
            { children }
        </HashValueBox>;

        return linkTo ? <Link to={linkTo}>{box}</Link> : box ;
    }
}
