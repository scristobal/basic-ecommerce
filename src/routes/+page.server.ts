import { db } from '$lib/server/mock_db';
import type { Cart, Discount } from '$lib/types.js';

export async function load({ cookies }) {
	const products = await db.products.getAll();

	const discounts: Discount[] = [];

	const cart = JSON.parse(cookies.get('cart') ?? '{}') as Cart;

	for (const [code, quantity] of Object.entries(cart)) {
		const product = await db.products.getByCode(code);

		if (product === undefined) continue;

		const offer = await db.offers.getByProductCode(code);

		if (offer === undefined) continue;

		switch (offer.type) {
			case 'BulkOffer': {
				const name = `x${offer.minQuantity} ${product.name} offer`;
				const amount = quantity >= offer.minQuantity ? (product.price * quantity * offer.percentage) / 100 : 0;

				discounts.push({ name, amount });
				continue;
			}
			case 'BuyXGetYFreeOffer': {
				const name = `${offer.buy}x${offer.getFree} ${product.name} offer`;
				const amount = quantity >= offer.buy ? product.price * (Math.floor(quantity / offer.buy) * offer.getFree) : 0;

				discounts.push({ name, amount });
				continue;
			}
		}
	}

	const checkout: boolean = JSON.parse(cookies.get('checkout') ?? 'false');

	return { products, discounts, cart, checkout };
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

		if (cart[code] <= 1) delete cart[code];
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
