import { logScale } from "app/helpers/logScale";
import { BigNumber } from "app/util/BigNumber";

/**
 * Takes an array of values and scales the items between the array min and max values to a percentage, logarithmically
 * e.g. Transforms interval (min, max) to (0, 100)
 *
 * Logarithmic scale is especially useful for transaction values that differ by an order of magnitude
 *
 * @param values
 * @param defaultSize If all values are the same, fill the result with this default
 */
export function minMaxLogScale(values: (number | BigNumber)[], defaultSize = 50) {
    if (!values.length) {
        return [];
    }

    let min = BigNumber.minimum(...values);
    let max = BigNumber.maximum(...values);

    let maxSize = max.minus(min);

    if (maxSize.isZero()) {
        // All values are equal, just fill with default size
        return values.map(v => defaultSize);
    }

    /*
     * Array values between [min, max]:
     * |---|----------------------|
     * 0  min                    max
     *     |----------------------|      ( x1 = x0 - min )
     *     0                  max - min
     *     |----------------------|      ( x2 = log(x1 * 100 / max) )
     *     0                     100
     */
    return values
        // translate(-min)
        .map(v => new BigNumber(v).minus(min))
        // scale to maxSize and apply log scale
        .map(v => logScale(v, maxSize));
}
