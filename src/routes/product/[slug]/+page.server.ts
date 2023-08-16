import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const code = params.slug;

	const product = await db.products.getByCode(code);

	if (product === undefined) throw error(404, `Product with code ${code} not found`);

	const offers = await db.offers.getByProductCode(product.code);

	return { product, offers };
}
