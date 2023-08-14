import type { Cart } from './cart';
import { Currency } from './currency';

export interface Product {
	name: string;
	code: string;
	price: string;
}
/**
 * Common offer interface: `name` is the name of the offer as it will be displayed in the shop and `discount` is a function that computes the
 * discounted amount for a given cart.
 */
export interface Offer {
	readonly name: string;
	readonly discount: (c: Cart) => Currency;
}

/**
 * An offer that applies a % discount to the total amount of the item in the cart when the quantity is greater than or equal to the minimum quantity.
 */
export class BulkOffer implements Offer {
	name: string;

	/**
	 * Creates a new BulkOffer: `item` is the item that will be discounted, `min_quantity` is the minimum quantity of `item` that must be in the cart
	 * to apply the discount and `percentage` is the percentage in % of discount to apply
	 */
	constructor(private product: Product, private minQuantity: number, private percentage: number) {
		this.name = `x${this.minQuantity} ${this.product.name} offer`;
	}

	/**
	 * Calculates and returns the amount of discount to be applied based on the quantity of the item in the cart.
	 * If the quantity of the item in the cart is greater than or equal to the minimum quantity, the discount is applied.
	 * Otherwise, no discount is applied.
	 */
	discount(cart: Cart): Currency {
		const numberOfDiscountedItems = cart.amountOf(this.product);

		if (numberOfDiscountedItems >= this.minQuantity) {
			return new Currency(this.product.price).multiply((BigInt(numberOfDiscountedItems) * BigInt(this.percentage)) / 100n);
		}

		return new Currency(0n);
	}
}

/**
 * An offer that applies a discount to the total amount of the item in the cart when the quantity is greater than or equal to the minimum quantity.
 */
export class BuyXGetYFreeOffer implements Offer {
	name: string;

	/**
	 * Creates a new BuyXGetYFreeOffer: `item` is the item that will be discounted, `buy` is the number of items that must
	 * be in the cart to apply the discount and`getFree` is the number of items that will be discounted
	 */
	constructor(private product: Product, private buy: number, private getFree: number) {
		this.name = `${this.buy}x${this.getFree} ${this.product.name} offer`;
	}

	/**
	 * Calculates and returns the amount of discount to be applied based on the quantity of the item in the cart.
	 * If the quantity of the item in the cart is greater than or equal to the minimum quantity, the discount is applied.
	 * Otherwise, no discount is applied.
	 */
	discount(cart: Cart): Currency {
		const numberOfDiscountedItems = cart.amountOf(this.product);

		if (numberOfDiscountedItems >= this.buy) {
			return new Currency(this.product.price).multiply(BigInt(Math.floor(numberOfDiscountedItems / this.buy) * this.getFree));
		}

		return new Currency(0n);
	}
}
