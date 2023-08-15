import { db } from '$lib/server/mock_db.js';
import { redirect } from '@sveltejs/kit';
import type { Cart } from '$lib/types';
import { BULK_OFFER, BUYXGETY } from '$lib/constants.js';

export async function load({ params, cookies }) {
	const code = params.slug;

	const product = await db.products.getByCode(code);

	if (!product) throw new Error('Product code not found');

	const cart = JSON.parse(cookies.get('cart') ?? '{}') as Cart;

	const quantity = cart[code] ?? 0;

	const offers = await db.offers.getByProductCode(code);
	const discounts = [];

	for (const offer of offers) {
		switch (offer.type) {
			case BULK_OFFER: {
				const name = `x${offer.minQuantity} ${product.name} offer`;
				const amount = quantity >= offer.minQuantity ? (product.price * quantity * offer.percentage) / 100 : 0;

				discounts.push({ name, amount, more: Math.max(offer.minQuantity - quantity, 0) });
				break;
			}
			case BUYXGETY: {
				const name = `${offer.buy}x${offer.getFree} ${product.name} offer`;
				const amount = quantity >= offer.buy ? product.price * (Math.floor(quantity / offer.buy) * offer.getFree) : 0;

				discounts.push({ name, amount, more: Math.max(offer.buy - quantity, 0) });
				break;
			}
		}
	}

	return { product, discounts };
}

export const actions = {
	add: async function ({ cookies, request }) {
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

		throw redirect(302, '/');
	}
};
