import { Cart } from './cart';
import { Offer } from './offers';
import { Item } from './items';

type Discount = { offer: Offer; amount: bigint };
type Total = { item: Item; amount: bigint };

/**
 * @description
 * A store is a collection of items and offers.
 * It can calculate the total price of a cart.
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
     * Calculates and returns the amount of discount to be applied based on the quantity of the item in the cart.
     * If the quantity of the item in the cart is greater than or equal to the minimum quantity, the discount is applied.
     * Otherwise, no discount is applied.
     * It does not mutate the `cart`.
     * - `cart` is the cart to calculate the discount from
     * @example
     * const offer = new BulkOffer(item, 3, 10);
     * const discount = offer.discount(cart);
     */
    checkDiscounts(cart: Cart): Discount[] {
        return this.offers.map((offer) => ({
            offer,
            amount: offer.discount(cart)
        }));
    }

    /**
     * @description
     * Calculates and returns the total price of each item in the cart.
     * It does not mutate the `cart`.
     * - `cart` is the cart to calculate the total price from
     * @example
     * const totals = store.checkTotals(cart);
     * totals[0].item; // item
     * totals[0].amount; // 100n
     */
    checkTotals(cart: Cart): Total[] {
        return cart.items.map((item) => ({
            item,
            amount: item.price * BigInt(cart.amountOf(item))
        }));
    }

    /**
     * @description
     * Calculates and returns the total price of the cart.
     * It does not mutate the `cart`.
     * - `cart` is the cart to calculate the total price from
     * @example
     * const total_price = store.checkout(cart);
     */
    checkout(cart: Cart): bigint {
        const discount = this.checkDiscounts(cart).reduce((acc, { amount }) => acc + amount, 0n);
        const total = this.checkTotals(cart).reduce((acc, { amount }) => acc + amount, 0n);

        return total - discount;
    }
}
