import type { BULK_OFFER, BUYXGETY } from '$lib/constants';

export type Product = { name: string; code: string; price: number; image: string; thumb: string; description: string };

export type Discount = { name: string; amount: number; more?: number };

export type Cart = { [code: string]: number };

export type Offer =
	| { type: typeof BULK_OFFER; productCode: string; minQuantity: number; percentage: number }
	| { type: typeof BUYXGETY; productCode: string; buy: number; getFree: number };
