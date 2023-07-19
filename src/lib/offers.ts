import { Chart } from './chart';
import { Item } from './items';

/**
 * @description
 * Common offer interface
 *  - `name` is the name of the offer as it will be displayed in the store
 *  - `discount` is a function that receives a `Chart` and returns the discounted amount, it does not mutate the `chart`
 *
 */
export interface Offer {
    readonly name: string;
    readonly discount: (c: Chart) => bigint;
}

/**
 * @description
 * An offer that applies a % discount to the total amount of the item in the chart when the quantity is greater than or equal to the minimum quantity.
 * - `name` is the name of the offer as it will be displayed in the store
 * - `item` is the item that will be discounted
 * - `min_quantity` is the minimum quantity of `item` that must be in the chart to apply the discount
 * - `percentage` is the percentage in % of discount to apply
 * @example
 * const offer = new BulkOffer(item, 3, 10);
 * const discount = offer.discount(chart);
 *
 */
export class BulkOffer implements Offer {
    name: string;

    /**
     * @description
     * Creates a new BulkOffer
     * - `item` is the item that will be discounted
     * - `min_quantity` is the minimum quantity of `item` that must be in the chart to apply the discount
     * - `percentage` is the percentage in % of discount to apply
     * @example
     * const offer = new BulkOffer(item, 3, 10);
     * const discount = offer.discount(chart);
     *
     */
    constructor(
        private item: Item,
        private min_quantity: number,
        private percentage: number
    ) {
        this.name = `x${this.min_quantity} ${this.item.name} offer`;
    }

    /**
     * @description
     * Calculates and returns the amount of discount to be applied based on the quantity of the item in the chart.
     * If the quantity of the item in the chart is greater than or equal to the minimum quantity, the discount is applied.
     * Otherwise, no discount is applied.
     * It does not mutate the `chart`.
     *  - `chart` is the chart to calculate the discount from
     * @example
     * const offer = new BulkOffer(item, 3, 10);
     * const discount = offer.discount(chart);
     */
    discount(chart: Chart): bigint {
        const numberOfDiscountedItems = chart.amountOf(this.item);

        if (numberOfDiscountedItems >= this.min_quantity) {
            return (this.item.price * BigInt(numberOfDiscountedItems) * BigInt(this.percentage)) / 100n;
        }

        return 0n;
    }
}

/**
 * @description
 * An offer that applies a discount to the total amount of the item in the chart when the quantity is greater than or equal to the minimum quantity.
 * - `name` is the name of the offer as it will be displayed in the store
 * - `item` is the item that will be discounted
 * - `buy` is the number of items that must be in the chart to apply the discount
 * - `getFree` is the number of items that will be discounted
 * @example
 * const offer = new GetFreeOffer(item, 3, 1);
 * const discount = offer.discount(chart);
 */
export class BuyXGetYFreeOffer implements Offer {
    name: string;

    /**
     * @description
     * Creates a new BuyXGetYFreeOffer
     * - `item` is the item that will be discounted
     * - `buy` is the number of items that must be in the chart to apply the discount
     * - `getFree` is the number of items that will be discounted
     * @example
     * const offer = new GetFreeOffer(item, 3, 1);
     * const discount = offer.discount(chart);
     */
    constructor(
        private item: Item,
        private buy: number,
        private getFree: number
    ) {
        this.name = `${this.buy}x${this.getFree} ${this.item.name} offer`;
    }

    /**
     * @description
     * Calculates and returns the amount of discount to be applied based on the quantity of the item in the chart.
     * If the quantity of the item in the chart is greater than or equal to the minimum quantity, the discount is applied.
     * Otherwise, no discount is applied.
     * It does not mutate the `chart`.
     * - `chart` is the chart to calculate the discount from
     * @example
     * const offer = new GetFreeOffer(item, 3, 1);
     * const discount = offer.discount(chart);
     */
    discount(chart: Chart): bigint {
        const numberOfDiscountedItems = chart.amountOf(this.item);

        if (numberOfDiscountedItems >= this.buy) {
            return this.item.price * BigInt(Math.floor(numberOfDiscountedItems / this.buy) * this.getFree);
        }

        return 0n;
    }
}
