import { db } from '$lib/server/db';
import type { Offer } from '$lib/types.js';

export async function load({ cookies }) {
	const products = await db.products.getAll();

	const offers: Offer[] = [];

	for (const product of products) {
		const productOffers = await db.offers.getByProductCode(product.code);

		offers.push(...productOffers);
	}

	const checked: boolean = JSON.parse(cookies.get('checkout') ?? 'false');

	return { products, offers, checked };
}

export const actions = {
	checkout: async function ({ cookies, request }) {
		console.log('checkout', cookies, request);
	}
};
