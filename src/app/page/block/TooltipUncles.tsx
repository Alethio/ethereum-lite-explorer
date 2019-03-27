import * as React from "react";
import { Tooltip, ITooltipProps } from "ethstats-ui/lib/overlay/tooltip/Tooltip";
import styled from "app/styled-components";

const TooltipContent = styled.div`
    padding: 4px 8px;
`;

export class TooltipUncles extends React.Component<ITooltipProps> {
    static defaultProps = {
        offset: 8
    };

    render() {
        let { content, children, ...other } = this.props;
        return (
            <Tooltip {...other} content={
                <TooltipContent>{content}</TooltipContent>
            }>{children}</Tooltip>
        );
    }
}
