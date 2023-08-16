import type { BULK_OFFER, BUYXGETY } from '$lib/constants';

export type Product = { name: string; code: string; price: number; image: string; thumb: string; description: string };

export type Cart = { [code: string]: number };

type BaseOffer = { type: string; id: string; name: string; productCode: string; minPurchase: number };

type BulkOffer = { type: typeof BULK_OFFER; percentage: number };

type BuyXGetYOffer = { type: typeof BUYXGETY; getFree: number };

export type Offer = BaseOffer & (BulkOffer | BuyXGetYOffer);
