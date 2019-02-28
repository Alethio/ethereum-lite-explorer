import { BigNumber } from "./BigNumber";

export function weiToEth(wei: BigNumber) {
    return wei.shiftedBy(-18);
}

export function ethToWei(eth: BigNumber) {
    return eth.shiftedBy(18);
}

export function weiToGwei(wei: BigNumber) {
    return wei.shiftedBy(-9);
}
