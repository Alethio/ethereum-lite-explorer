import * as React from "react";
import { ValueBox } from "ethstats-ui/lib/layout/content/box/ValueBox";
import { ITheme } from "app/theme";
import { withTheme } from "app/styled-components";
import { Translation } from "app/Translation";
import { StatusSomeConfirmedIcon } from "ethstats-ui/lib/icon/StatusSomeConfirmedIcon";
import { StatusNotConfirmedIcon } from "ethstats-ui/lib/icon/StatusNotConfirmedIcon";
import { StatusConfirmedIcon } from "ethstats-ui/lib/icon/StatusConfirmedIcon";

interface IConfirmationsBoxProps {
    theme: ITheme;
    translation: Translation;
    locale: string | undefined;
    confirmations: number;
    isConfirmed: boolean;
}

const $ConfirmationsBox: React.StatelessComponent<IConfirmationsBoxProps> = ({
    translation, confirmations, isConfirmed
}) => {
    let tooltipText = isConfirmed ?
        translation.get("blockView.content.blockConfirmations.confirmed") :
        translation.get("blockView.content.blockConfirmations.text", {"%d": confirmations});

    return <ValueBox colors={isConfirmed ? "highlight" : "warn"}
        iconPlacement="left"
        Icon={isConfirmed ?
            StatusConfirmedIcon :
            confirmations ? StatusSomeConfirmedIcon : StatusNotConfirmedIcon}
    >
        { tooltipText }
    </ValueBox>;
};

export const ConfirmationsBox = withTheme($ConfirmationsBox);
