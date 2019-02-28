import * as React from "react";
import { ValueBox } from "ethstats-ui/lib/layout/content/box/ValueBox";
import { ITheme } from "app/theme";

interface IAccountTypeBoxProps {
}

export const AccountTypeBox: React.StatelessComponent<IAccountTypeBoxProps> = ({ children }) => (
    <ValueBox
        colors={(theme: ITheme) => ({
            background: theme.colors.accountTypeBoxBackground,
            text: theme.colors.accountTypeBoxText
        })}
    >
        { children }
    </ValueBox>
);
