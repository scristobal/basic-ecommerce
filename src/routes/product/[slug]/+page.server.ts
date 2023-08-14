import { db } from '$lib/server/mock_db.js';

export async function load({ params }) {
	const code = params.slug;

	const product = await db.products.getByCode(code);

	if (!product) throw new Error('Product code not found');

	return product;
}
