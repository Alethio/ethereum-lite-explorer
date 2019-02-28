import * as React from "react";
import { ThemeContext } from "app/ThemeContext";
import { Bubble } from "ethstats-ui/lib/data/vis/Bubble";
import { Link } from "app/components/Link";
import { Tooltip } from "ethstats-ui/lib/overlay/tooltip/Tooltip";
import { TxHashBox } from "app/components/content/box/tx/TxHashBox";

interface ITxItemProps {
    size: number;
    wrapperSize: number;
    txHash: string;
    active: boolean;
}

export const TxItem: React.StatelessComponent<ITxItemProps> = ({ txHash, size, active }) => {
    return (
        <Tooltip
            placement="right"
            offset={10}
            nonInteractive
            showDelay={0}
            hideDelay={0}
            content={
                <div style={{padding: 8}}>
                    <TxHashBox noLink noTooltip variant="small">{txHash}</TxHashBox>
                </div>
            }
        >
            <Link to={url => url.getTx(txHash)}>
                <ThemeContext.Consumer>
                    {(theme) =>
                        <Bubble
                            size={size}
                            wrapperSize={theme.spacing.bubbleWrapperSize}
                            backgroundColor={active ? theme.colors.txSidebarItemActive : theme.colors.txSidebarItem}
                            borderColor={theme.colors.txSidebarItemActive}
                        />
                    }
                </ThemeContext.Consumer>
            </Link>
        </Tooltip>
    );
};
