import type { Discount, Offer, Product } from '$lib/types';
import { BULK_OFFER, BUYXGETY } from '$lib/constants';

export function getDiscount(offer: Offer, product: Product, quantity: number): Discount {
	switch (offer.type) {
		case BULK_OFFER: {
			const name = `x${offer.minQuantity} ${product.name} offer`;
			const more = Math.max(offer.minQuantity - quantity, 0);
			const amount = quantity >= offer.minQuantity ? (product.price * quantity * offer.percentage) / 100 : 0;
			return { name, amount, more };
		}
		case BUYXGETY: {
			const name = `${offer.buy}x${offer.getFree} ${product.name} offer`;
			const more = Math.max(offer.buy - quantity, 0);

			const amount = quantity >= offer.buy ? product.price * (Math.floor(quantity / offer.buy) * offer.getFree) : 0;

			return { name, amount, more };
		}
		default:
			throw new Error(`Unknown offer type: ${offer}`);
	}
}
