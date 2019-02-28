import * as React from "react";
import { HashLinkValueBox } from "app/components/content/box/HashLinkValueBox";
import { Clipboard } from "app/helpers/Clipboard";
import { ITheme } from "app/theme";

interface IBlockHashBoxProps {
    children: string;
    linkTo?: string;
    clipboard: Clipboard;
}

export class BlockHashBox extends React.Component<IBlockHashBoxProps> {
    render() {
        let { children, linkTo, clipboard } = this.props;
        return (
            <HashLinkValueBox
                colors={(theme: ITheme) => ({
                    background: theme.colors.blockColorCode,
                    text: theme.colors.blockBoxText
                })}
                linkTo={linkTo}
                clipboard={clipboard}
            >
                { children }
            </HashLinkValueBox>
        );
    }
}
