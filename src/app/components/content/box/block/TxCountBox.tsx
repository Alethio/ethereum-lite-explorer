import * as React from "react";
import { ValueBox, IValueBoxProps } from "ethstats-ui/lib/layout/content/box/ValueBox";
import { ITheme } from "app/theme";

interface ITxCountBoxProps {
    variant?: IValueBoxProps["variant"];
}

export const TxCountBox: React.StatelessComponent<ITxCountBoxProps> = ({ children, variant }) => (
    <ValueBox
        colors={(theme: ITheme) => ({
            background: theme.colors.txColorCode,
            text: theme.colors.txBoxText
        })}
        variant={variant}
    >
        { children }
    </ValueBox>
);
