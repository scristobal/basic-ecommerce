import { db } from '$lib/server/db';
import type { Cart, Offer } from '$lib/types.js';
import { checkout } from '$lib/core/checkout';

export async function load() {
    const products = await db.products.getAll();

    const offers: Offer[] = [];

    for (const product of products) {
        const productOffers = await db.offers.getByProductCode(product.code);

        offers.push(...productOffers);
    }

    return { products, offers };
}

export const actions = {
    checkout: async function ({ request }) {
        const data = await request.formData();

        const cart = JSON.parse(data.get('cart')?.toString() || '{}') as Cart;

        const total = await checkout(cart);

        return { checkout: total };
    }
};
