import { Item } from './items';

type ItemQuantity = { item: Item; quantity: number };

/**
 * @description
 * A chart is a collection of items that will be purchased.
 * It keeps track of the quantity of each item.
 * @example
 * const chart = new Chart();
 * chart.add(item, 5);
 * chart.remove(item, 2);
 * chart.amountOf(item); // 3
 * chart.amountOf(otherItem); // 0
 *
 */
export class Chart {
    private itemQuantities: ItemQuantity[] = [];

    /**
     * @description
     * Adds `quantity` of `item` to the chart.
     * If `item` is already in the chart, it increases its quantity.
     * @example
     * const chart = new Chart();
     * chart.add(item, 5);
     * chart.add(item, 2);
     * chart.amountOf(item); // 7
     * chart.amountOf(otherItem); // 0
     */
    add(item: Item, quantity: number): void {
        const inChartItem = this.itemQuantities.find((i) => i.item.code === item.code);

        if (inChartItem) {
            inChartItem.quantity += quantity;
        } else {
            this.itemQuantities.push({ item, quantity });
        }
    }

    /**
     * @description
     * Removes `quantity` of `item` from the chart.
     * If `item` is not in the chart or the quantity is greater than the existing quantity, it does nothing.
     * @example
     * const chart = new Chart();
     * chart.add(item, 5);
     * chart.remove(item, 2);
     * chart.amountOf(item); // 3
     * chart.amountOf(otherItem); // 0
     */
    remove(item: Item, quantity: number): void {
        const inChartItem = this.itemQuantities.find((i) => i.item.code === item.code);

        if (inChartItem) {
            inChartItem.quantity -= quantity;
        } else {
            this.itemQuantities.push({ item, quantity });
        }
    }

    /**
     * @description
     * Returns the quantity of the specified `item` in the chart.
     * If the item is not in the chart, it returns 0.
     * @example
     * const chart = new Chart();
     * chart.add(item, 5);
     * chart.remove(item, 2);
     * chart.amountOf(item); // 3
     * chart.amountOf(otherItem); // 0
     */
    amountOf(item: Item): number {
        return this.itemQuantities.find((i) => i.item.code === item.code)?.quantity ?? 0;
    }

    /**
     * @description
     * Returns the list of items in the chart.
     * @example
     * const chart = new Chart();
     * chart.add(item, 5);
     * chart.remove(item, 2);
     * chart.listItems(); // [{ item: item, quantity: 3 }]
     */
    get items(): Item[] {
        return this.itemQuantities.map((i) => i.item);
    }
}
