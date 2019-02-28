import * as React from "react";
import { Bubble } from "ethstats-ui/lib/data/vis/Bubble";
import { ThemeContext } from "app/ThemeContext";

interface ITxBubbleProps {
    size: number;
    highlightThreshold: number;
}

export const TxBubble: React.StatelessComponent<ITxBubbleProps> = ({ size, highlightThreshold }) => (
    <ThemeContext.Consumer>
        {(theme) =>
            <Bubble
                size={size}
                wrapperSize={theme.spacing.bubbleWrapperSize}
                highlightThreshold={highlightThreshold}
                backgroundColor={theme.colors.txColorCode} />
        }
    </ThemeContext.Consumer>
);
