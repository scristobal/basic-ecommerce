import { db } from '$lib/server/db';
import type { Cart, Offer } from '$lib/types.js';
import { getDiscount } from '../lib/core/offers';

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

        const total = await Object.entries(cart).reduce(async (acc, [code, quantity]) => {
            const product = await db.products.getByCode(code);
            return (await acc) + quantity * (product?.price ?? 0);
        }, Promise.resolve(0));

        const discounts = await Object.entries(cart).reduce(async (acc, [code, quantity]) => {
            const product = await db.products.getByCode(code);
            if (product === undefined) return acc;

            const offers = await db.offers.getByProductCode(code);
            const discounts = offers.reduce((acc, offer) => acc + getDiscount(offer, product, quantity), 0);

            return (await acc) + discounts;
        }, Promise.resolve(0));

        return { checkout: total - discounts };
    }
};
