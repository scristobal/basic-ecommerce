import type { Offer, Product } from '$lib/types';
import { BULK_OFFER, BUYXGETY } from '$lib/constants';

export function getDiscount(offer: Offer, product: Product, quantity: number): number {
	switch (offer.type) {
		case BULK_OFFER: {
			return quantity >= offer.minPurchase ? (product.price * quantity * offer.percentage) / 100 : 0;
		}
		case BUYXGETY: {
			return quantity >= offer.minPurchase ? product.price * (Math.floor(quantity / offer.minPurchase) * offer.getFree) : 0;
		}
	}
}
