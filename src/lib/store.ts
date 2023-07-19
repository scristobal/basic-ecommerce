import { Chart } from './chart';
import { Offer } from './offers';
import { Item } from './items';

type Discount = { offer: Offer; amount: bigint };
type Total = { item: Item; amount: bigint };

/**
 * @description
 * A store is a collection of items and offers.
 * It can calculate the total price of a chart.
 */
export class Store {
    /**
     * @description
     * Creates a new Store
     * - `items` is the list of items that the store will sell
     * - `offers` is the list of offers that the store will apply
     */
    constructor(
        public items: Item[] = [],
        public offers: Offer[] = []
    ) {}

    /**
     * @description
     * Calculates and returns the amount of discount to be applied based on the quantity of the item in the chart.
     * If the quantity of the item in the chart is greater than or equal to the minimum quantity, the discount is applied.
     * Otherwise, no discount is applied.
     * It does not mutate the `chart`.
     * - `chart` is the chart to calculate the discount from
     * @example
     * const offer = new BulkOffer(item, 3, 10);
     * const discount = offer.discount(chart);
     */
    checkDiscounts(chart: Chart): Discount[] {
        return this.offers.map((offer) => ({
            offer,
            amount: offer.discount(chart)
        }));
    }

    /**
     * @description
     * Calculates and returns the total price of each item in the chart.
     * It does not mutate the `chart`.
     * - `chart` is the chart to calculate the total price from
     * @example
     * const totals = store.checkTotals(chart);
     * totals[0].item; // item
     * totals[0].amount; // 100n
     */
    checkTotals(chart: Chart): Total[] {
        return chart.items.map((item) => ({
            item,
            amount: item.price * BigInt(chart.amountOf(item))
        }));
    }

    /**
     * @description
     * Calculates and returns the total price of the chart.
     * It does not mutate the `chart`.
     * - `chart` is the chart to calculate the total price from
     * @example
     * const total_price = store.checkout(chart);
     */
    checkout(chart: Chart): bigint {
        const discount = this.checkDiscounts(chart).reduce((acc, { amount }) => acc + amount, 0n);
        const total = this.checkTotals(chart).reduce((acc, { amount }) => acc + amount, 0n);

        return total - discount;
    }
}
