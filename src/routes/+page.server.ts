import { db } from '$lib/server/db';
import type { Cart, Offer } from '$lib/types.js';
import { error } from '@sveltejs/kit';

export async function load({ cookies }) {
	const products = await db.products.getAll();

	const offers: Offer[] = [];

	const cart = JSON.parse(cookies.get('cart') ?? '{}') as Cart;

	for (const code of Object.keys(cart)) {
		const product = await db.products.getByCode(code);

		if (product === undefined) throw error(404, `Product with code ${code} not found`);

		const productOffers = await db.offers.getByProductCode(code);

		offers.push(...productOffers);
	}

	const checked: boolean = JSON.parse(cookies.get('checkout') ?? 'false');

	return { products, offers, cart, checked };
}

export const actions = {
	increase: async function ({ cookies, request }) {
		const data = await request.formData();

		const code = data.get('product-code')?.toString();

		if (code === undefined) throw error(404, 'Product code not found');

		const cart = JSON.parse(cookies.get('cart') ?? '{}');

		cart[code] = (cart[code] ?? 0) + 1;

		cookies.set('cart', JSON.stringify(cart), {
			path: '/',
			maxAge: 60 * 60 * 24 * 30 // 30 days
		});

		cookies.set('checkout', 'false', {
			path: '/',
			maxAge: 60 * 60 * 24 * 30 // 30 days
		});
	},

	decrease: async function ({ cookies, request }) {
		const data = await request.formData();

		const code = data.get('product-code')?.toString();

		if (code === undefined) throw error(404, 'Product code not found');

		const cart = JSON.parse(cookies.get('cart') ?? '{}');

		if ((cart[code] ?? 0) <= 1) delete cart[code];
		else cart[code] -= 1;

		cookies.set('cart', JSON.stringify(cart), {
			path: '/',
			maxAge: 60 * 60 * 24 * 30 // 30 days
		});

		cookies.set('checkout', 'false', {
			path: '/',
			maxAge: 60 * 60 * 24 * 30 // 30 days
		});
	}

	// set: async function({cookies, request}) { },

	// checkout: async function({cookies, request}) { }
};
