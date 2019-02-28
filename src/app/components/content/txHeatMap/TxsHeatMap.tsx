import styled from "app/styled-components";
import * as React from "react";
import { ITxLite } from "app/data/tx/ITxLite";
import { TxTooltipContent } from "./TxTooltipContent";
import { Translation } from "app/Translation";
import { minMaxLogScale } from "app/helpers/minMaxLogScale";
import { Clipboard } from "app/helpers/Clipboard";
import { Popover } from "ethstats-ui/lib/overlay/Popover";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { TxsHeatMapItems } from "app/components/content/txHeatMap/TxsHeatMapItems";
import { MultiHover } from "ethstats-ui/lib/util/react/MultiHover";
import { BigNumber } from "app/util/BigNumber";

const TxsHeatMapRoot = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    padding: 2px 0px;
`;

export interface ITxsHeatMapProps {
    /** Non-empty transactions array */
    transactions: ITxLite[];
    translation: Translation;
    locale: string;
    clipboard: Clipboard;
    multiHover?: MultiHover<ITxLite>;
    highlightThreshold: number;
    highlightDataSelector(t: ITxLite): number | BigNumber;
}

@observer
export class TxsHeatMap extends React.Component<ITxsHeatMapProps> {
    private rootEl: HTMLElement;
    @observable.ref
    private hoveredTx: ITxLite | undefined;
    private multiHover: MultiHover<ITxLite>;

    constructor(props: ITxsHeatMapProps) {
        super(props);

        this.setupMultiHover(this.props.multiHover);
    }

    private setupMultiHover(multiHover: MultiHover<ITxLite> | undefined) {
        if (!multiHover) {
            multiHover = new MultiHover({ enterDelay: 400, leaveDelay: 400 });
        }
        this.multiHover = multiHover;
        this.multiHover.onActiveChange.subscribe(this.handleActiveChange);
    }

    private handleActiveChange = (tx: ITxLite | undefined) => this.hoveredTx = tx;

    componentDidUpdate(prevProps: ITxsHeatMapProps) {
        if (this.props.multiHover !== prevProps.multiHover) {
            this.setupMultiHover(this.props.multiHover);
        }
    }

    componentWillUnmount() {
        this.multiHover.onActiveChange.unsubscribe(this.handleActiveChange);
    }

    render() {
        let values = this.props.transactions.map(tx => this.props.highlightDataSelector(tx));
        let bubbleSizes = minMaxLogScale(values);

        return (
            <TxsHeatMapRoot innerRef={ref => this.rootEl = ref}>
                <TxsHeatMapItems
                    transactions={this.props.transactions}
                    bubbleSizes={bubbleSizes}
                    highlightThreshold={this.props.highlightThreshold}
                    onTxMouseEnter={this.handleTxEnter}
                    onTxMouseLeave={this.handleTxLeave}
                />
                <Popover
                    visible={this.hoveredTx !== void 0}
                    placement="bottom-start"
                    offset={8}
                    alignmentOffset={-8}
                    noFlip
                    noArrow
                    referenceElement={() => this.rootEl}
                    content={<div onMouseEnter={this.handleTooltipEnter} onMouseLeave={this.handleTooltipLeave}>
                        <TxTooltipContent
                            tx={this.hoveredTx!}
                            clipboard={this.props.clipboard}
                            translation={this.props.translation} locale={this.props.locale}
                        />
                    </div>}
                >
                    <div />
                </Popover>
            </TxsHeatMapRoot>
        );
    }

    private handleTxEnter = (tx?: ITxLite) => {
        this.multiHover.enter(tx);
    }

    private handleTxLeave = (tx?: ITxLite) => {
        this.multiHover.leave();
    }

    private handleTooltipEnter = () => {
        this.multiHover.enter(this.hoveredTx);
    }

    private handleTooltipLeave = () => {
        this.multiHover.leave();
    }
}
