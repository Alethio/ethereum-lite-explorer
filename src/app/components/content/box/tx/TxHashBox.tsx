import * as React from "react";
import { IValueBoxProps } from "ethstats-ui/lib/layout/content/box/ValueBox";
import { HashLinkValueBox } from "app/components/content/box/HashLinkValueBox";
import { Clipboard } from "app/helpers/Clipboard";
import { ITheme } from "app/theme";

interface ITxHashBoxProps {
    variant?: IValueBoxProps["variant"];
    children: string;
    noLink?: boolean;
    noTooltip?: boolean;
    clipboard?: Clipboard;
}

export const TxHashBox: React.StatelessComponent<ITxHashBoxProps> = ({
    children, variant, noLink, noTooltip, clipboard
}) => (
    <HashLinkValueBox
        colors={(theme: ITheme) => ({
            background: theme.colors.txColorCode,
            text: theme.colors.txBoxText
        })}
        variant={variant}
        linkTo={!noLink ? url => url.getTx(children) : void 0}
        noTooltip={noTooltip}
        clipboard={clipboard}
    >
        { children }
    </HashLinkValueBox>
);
