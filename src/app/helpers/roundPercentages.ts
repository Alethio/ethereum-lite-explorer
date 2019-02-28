interface IItem {
    percent: number;
}

interface IItemResult<T extends IItem> {
    originalItem: T;
    percent: number;
}

/**
 * Takes an array of items with floating point percentages (they must add up to 100 or less)
 * and rounds them up so they result in integer percentages that still add up to 100
 *
 * See https://revs.runtime-revolution.com/getting-100-with-rounded-percentages-273ffa70252b
 */
export function roundPercentages<T extends IItem>(items: T[]) {
    let newItems: IItemResult<T>[] = items.map(item => ({
        originalItem: item,
        percent: Math.floor(item.percent)
    }));

    let flooredTotal = newItems.reduce((acc, i) => acc + i.percent, 0);
    let remainder = 100 - flooredTotal;

    // Sort by fractional parts desc
    // We clone the array, but not the items. This way we don't alter the return order, just the percentages
    let sortedNewItems = [...newItems]
        .sort((a, b) => (b.originalItem.percent - b.percent) - (a.originalItem.percent - a.percent));

    // Distribute remainder, adding 1 to each item in order, until remainder is 0
    sortedNewItems.some(item => {
        if (remainder-- <= 0) {
            return true;
        }

        item.percent += 1;
        return false;
    });

    return newItems;
}
