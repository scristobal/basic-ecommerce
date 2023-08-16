import { db } from '$lib/server/mock_db';
import type { Cart, Discount } from '$lib/types.js';
import { getDiscount } from '$lib/core/offers.js';

export async function load({ cookies }) {
	const products = await db.products.getAll();

	const discounts: Discount[] = [];

	const cart = JSON.parse(cookies.get('cart') ?? '{}') as Cart;

	for (const [code, quantity] of Object.entries(cart)) {
		const product = await db.products.getByCode(code);

		if (product === undefined) throw new Error(`Product with code ${code} not found`);

		const offers = await db.offers.getByProductCode(code);

		for (const offer of offers) {
			discounts.push(getDiscount(offer, product, quantity));
		}
	}

	const checked: boolean = JSON.parse(cookies.get('checkout') ?? 'false');

	return { products, discounts, cart, checked };
}

export const actions = {
	increase: async function ({ cookies, request }) {
		const data = await request.formData();

		const code = data.get('product-code')?.toString();

		if (code === undefined) throw new Error('Product code not found');

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

		if (code === undefined) throw new Error('Product code not found');

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
