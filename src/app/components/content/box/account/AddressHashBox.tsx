import * as React from "react";
import { HashLinkValueBox } from "app/components/content/box/HashLinkValueBox";
import { IValueBoxProps } from "ethstats-ui/lib/layout/content/box/ValueBox";
import { Clipboard } from "app/helpers/Clipboard";
import { ITheme } from "app/theme";

interface IAddressHashBoxProps {
    variant?: IValueBoxProps["variant"];
    children: string;
    Icon?: IValueBoxProps["Icon"];
    noLink?: boolean;
    clipboard: Clipboard;
}

export const AddressHashBox: React.StatelessComponent<IAddressHashBoxProps> = ({
    children, variant, Icon, noLink, clipboard
}) => (
    <HashLinkValueBox
        colors={(theme: ITheme) => ({
            background: theme.colors.addressHashBoxBg,
            text: theme.colors.valueBox.primary.text
        })}
        variant={variant}
        Icon={Icon}
        linkTo={!noLink ? url => url.getAccount(children) : void 0}
        clipboard={clipboard}
    >
        { children }
    </HashLinkValueBox>
);
