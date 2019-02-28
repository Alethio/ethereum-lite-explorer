import * as React from "react";
import { observer } from "mobx-react";
import { Translation } from "app/Translation";
import { minMaxLogScale } from "app/helpers/minMaxLogScale";
import { SidebarColumns } from "ethstats-ui/lib/layout/sidebar/SidebarColumns";
import { ITxLite } from "app/data/tx/ITxLite";
import { Logo } from "./Logo";
import { TxItem } from "./TxItem";
import { ThemeContext } from "app/ThemeContext";
import { SidebarMobileStore } from "app/components/topbar/SidebarMobileStore";

export interface ITxSidebarProps {
    translation: Translation;
    txHash: string;
    txs: ITxLite[] | undefined;
    sidebarMobileStore: SidebarMobileStore;
}

@observer
export class TxSidebar extends React.Component<ITxSidebarProps> {
    render() {
        let { translation: tr, txHash, txs } = this.props;
        let bubbleSizes = txs ? minMaxLogScale(txs.map(tx => tx.value)) : [];
        let mobileVisible = this.props.sidebarMobileStore.isSidebarVisible;

        return <ThemeContext.Consumer>{ theme =>
            <SidebarColumns
                pageTitle={tr.get("txView.sidebar.title")}
                Logo={<Logo>{tr.get("txView.sidebar.logo")}</Logo>}
                itemSize={theme.spacing.bubbleWrapperSize}
                mobileVisible={mobileVisible}
            >
                {txs ? txs.map((tx, idx) => (
                    <TxItem
                        key={tx.hash}
                        txHash={tx.hash}
                        size={bubbleSizes[idx]}
                        wrapperSize={theme.spacing.bubbleWrapperSize}
                        active={`0x${txHash.replace(/^0x/, "")}` === tx.hash}
                    />
                )) : undefined}
            </SidebarColumns>
        }</ThemeContext.Consumer>;
    }

    componentDidMount() {
        this.props.sidebarMobileStore.instancesCount++;
    }
    componentWillUnmount() {
        this.props.sidebarMobileStore.instancesCount--;
    }
}
