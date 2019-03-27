import * as React from "react";
import { ITxLite } from "app/data/tx/ITxLite";
import { DomNodeProxy } from "ethstats-ui/lib/util/react/DomNodeProxy";
import { Link } from "app/components/Link";
import { TxBubble } from "app/components/content/txHeatMap/TxBubble";

export interface ITxsHeatMapItemProps {
    tx: ITxLite;
    bubbleSize: number;
    highlightThreshold: number;
    onMouseEnter(tx: ITxLite): void;
    onMouseLeave(tx: ITxLite): void;
}

export class TxsHeatMapItem extends React.PureComponent<ITxsHeatMapItemProps> {
    render() {
        return (
            <DomNodeProxy
                onMount={el => {
                    el.addEventListener("mouseenter", this.handleMouseEnter);
                    el.addEventListener("mouseleave", this.handleMouseLeave);
                }}
                onUnmount={el => {
                    el.removeEventListener("mouseenter", this.handleMouseEnter);
                    el.removeEventListener("mouseleave", this.handleMouseLeave);
                }}
            >
                <Link to={url => url.getTx(this.props.tx.hash)}>
                    <TxBubble size={this.props.bubbleSize} highlightThreshold={this.props.highlightThreshold} />
                </Link>
            </DomNodeProxy>
        );
    }

    private handleMouseEnter = () => {
        this.props.onMouseEnter(this.props.tx);
    }

    private handleMouseLeave = () => {
        this.props.onMouseLeave(this.props.tx);
    }
}
