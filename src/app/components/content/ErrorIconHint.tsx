import * as React from "react";
import { IErrorIconProps } from "ethstats-ui/lib/icon/ErrorIcon";
import { Translation } from "app/Translation";
import { ErrorHint } from "ethstats-ui/lib/ErrorHint";

interface IErrorIconHintProps extends IErrorIconProps {
    translation: Translation;
}

export class ErrorIconHint extends React.Component<IErrorIconHintProps> {
    render() {
        let { translation } = this.props;

        return (
            <ErrorHint>{translation.get("general.error")}</ErrorHint>
        );
    }
}
