import type { Cart } from './cart';
import { BulkOffer, BuyXGetYFreeOffer, type Offer } from './offers';
import { Currency } from './currency';

type Discount = { offer: Offer; amount: Currency };
type Total = { product: Product; amount: Currency };

type OfferData =
	| {
			type: 'BulkOffer';
			productCode: string;
			minQuantity: number;
			percentage: number;
	  }
	| {
			type: 'BuyXGetYFreeOffer';
			productCode: string;
			buy: number;
			getFree: number;
	  };

export interface Product {
	name: string;
	code: string;
	price: string;
	image: string;
	thumb: string;
	description: string;
}

/**
 * A shop is a collection of items and offers.
 */
export class Shop {
	public products: Product[] = [];
	public offers: Offer[] = [];

	constructor(products: Product[] = [], offers: OfferData[] = []) {
		this.offers = offers.map((offer) => {
			const product = products.find((product) => product.code === offer.productCode);

			if (product === undefined) throw new Error('Wrong discount product code');

			switch (offer.type) {
				case 'BulkOffer': {
					return new BulkOffer(product, offer.minQuantity, offer.percentage);
				}
				case 'BuyXGetYFreeOffer': {
					return new BuyXGetYFreeOffer(product, offer.buy, offer.getFree);
				}
				default:
					throw new Error('Wrong discount type');
			}
		});

		this.products = products;
	}

	/**
	 * Calculates the amount of discount to be applied based on the quantity of the item in the cart.
	 * If the quantity of the item in the cart is greater than or equal to the minimum quantity, the discount is applied.
	 * Otherwise, no discount is applied.
	 */
	checkDiscounts(cart: Cart): Discount[] {
		return this.offers.map((offer) => ({
			offer,
			amount: offer.discount(cart)
		}));
	}

	/**
	 * Calculates the total amount of discount to be applied to the cart.
	 */
	checkDiscount(cart: Cart): Currency {
		return this.checkDiscounts(cart).reduce((acc, { amount }) => acc.add(amount), new Currency(0n));
	}

	/**
	 * Calculates  the total price of each item in the cart.
	 */
	checkTotals(cart: Cart): Total[] {
		return (
			this.products
				// .filter((product) => cart.amountOf(product) > 0)
				.map((product) => ({
					product,
					amount: new Currency(product.price).multiply(BigInt(cart.amountOf(product)))
				}))
		);
	}

	/**
	 * Calculates the total price of the cart without discounts.
	 */
	checkTotal(cart: Cart): Currency {
		const totals = this.checkTotals(cart);
		return totals.reduce((acc, { amount }) => acc.add(amount), new Currency(0n));
	}

	/**
	 * Calculates the total price of the cart including discounts.
	 */
	checkout(cart: Cart): Currency {
		const discount = this.checkDiscount(cart);
		const total = this.checkTotal(cart);

		return total.subtract(discount);
	}
}
