import { BigNumber } from "app/util/BigNumber";

/**
 * Produces scaled percentage values
 */
export function logScale(x: BigNumber, maxValue: BigNumber) {
    // We can loose precision here
    let percent = x.dividedBy(maxValue).multipliedBy(100).toNumber();
    return Math.floor(Math.log10(100 * percent + 1) * 25);
}
