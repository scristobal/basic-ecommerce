import type { Cart } from '$lib/types';
import { getDiscount } from '$lib/core/offers';
import { db } from '$lib/server/db';

export async function checkout(cart: Cart) {
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

    return total - discounts;
}
