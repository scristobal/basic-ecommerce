import { db } from '$lib/server/mock_db';

export async function load() {
	const products = await db.products.getAll();

	const offers = await db.offers.getAll();

	return { products, offers };
}
