import * as React from "react";
import { HashLinkValueBox, IHashLinkValueBoxProps } from "app/components/content/box/HashLinkValueBox";
import { Clipboard } from "app/helpers/Clipboard";
import { ITheme } from "app/theme";

interface IParentHashBoxProps {
    linkTo?: IHashLinkValueBoxProps["linkTo"];
    children: string;
    clipboard: Clipboard;
}

export const ParentHashBox: React.StatelessComponent<IParentHashBoxProps> = ({ children, linkTo, clipboard }) => (
    <HashLinkValueBox
        colors={(theme: ITheme) => ({
            background: theme.colors.parentHashBoxBg,
            text: theme.colors.parentHashBoxText
        })}
        linkTo={linkTo}
        clipboard={clipboard}
    >
        { children }
    </HashLinkValueBox>
);
