import * as React from "react";
import { IValueBoxProps } from "ethstats-ui/lib/layout/content/box/ValueBox";
import { HashLinkValueBox } from "app/components/content/box/HashLinkValueBox";
import { observer } from "mobx-react";
import { Clipboard } from "app/helpers/Clipboard";
import { ITheme } from "app/theme";

export interface IUncleHashBoxProps {
    blockNr: number;
    uncleIndex: number;
    children: string;
    variant?: IValueBoxProps["variant"];
    noLink?: boolean;
    clipboard: Clipboard;
}

@observer
export class UncleHashBox extends React.Component<IUncleHashBoxProps> {

    render() {
        let { noLink } = this.props;

        return (
            <HashLinkValueBox
                colors={(theme: ITheme) => ({
                    background: theme.colors.unclesBoxBg,
                    text: theme.colors.unclesBoxText
                })}
                variant={this.props.variant}
                linkTo={!noLink ? url => url.getUncle(this.props.blockNr, this.props.uncleIndex) : void 0}
                clipboard={this.props.clipboard}
            >{this.props.children}</HashLinkValueBox>
        );
    }

}
