<script lang="ts">
	import type { Offer, Product } from '$lib/types';
	import { CURRENCY, LOCALES } from '$lib/constants';
	import { getDiscount } from '$lib/core/offers';
	import { cart, checkout } from '$lib/store';

	export let products: Product[];
	export let offers: Offer[];

	$: discounts = offers.map((offer) => {
		const quantity = $cart[offer.productCode] ?? 0;
		const product = products.find((p) => p.code === offer.productCode);

		if (product === undefined) throw new Error(`Product ${offer.productCode} not found`);

		const amount = getDiscount(offer, product, quantity);

		return {
			name: offer.name,
			amount,
			more: Math.max(0, offer.minPurchase - quantity)
		};
	});

	$: totalItems = Object.values($cart).reduce((acc, curr) => acc + curr, 0);

	$: totalCost = products.reduce((acc, curr) => {
		const quantity = $cart[curr.code] ?? 0;
		return acc + quantity * curr.price;
	}, 0);

	$: totalCheckout = totalCost - discounts.reduce((acc, curr) => acc + curr.amount, 0);
</script>

<div class="flex h-full flex-col justify-between">
	<div>
		<!-- Cart header -->
		<div class="h-10 w-full border-b border-slate-800 border-opacity-20 text-lg font-extrabold leading-none text-slate-800">Cart</div>

		<!-- In cart items summary -->
		<div class="my-10 flex justify-between">
			<div class="text-sm font-normal leading-none text-slate-800">{totalItems} Items</div>
			<div class="text-right text-sm font-normal leading-none text-black">
				{new Intl.NumberFormat(LOCALES, { style: 'currency', currency: CURRENCY }).format(totalCost / 100)}
			</div>
		</div>

		<!-- List of discounts -->
		{#if discounts.length > 0}
			<div class="border-b border-t border-slate-800 border-opacity-20 py-8">
				<div class="mb-6 text-xs font-normal leading-none text-gray-500">DISCOUNTS</div>
				<div class="flex flex-col gap-6">
					{#each discounts as discount}
						<div class=" flex justify-between">
							<div class="text-sm font-normal leading-none text-slate-800">{discount.name}</div>
							{#if discount.amount > 0}
								<span class="text-right text-sm font-normal leading-none text-black"
									>{new Intl.NumberFormat(LOCALES, { style: 'currency', currency: CURRENCY }).format(-discount.amount / 100)}
								</span>
							{:else}
								<span class="text-right text-sm font-normal leading-none text-red-600">buy {discount.more} more</span>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<!-- Flex space -->
	<div>
		<!-- total -->
		{#if $checkout}
			<div class="flex items-center justify-between border-t border-slate-800 border-opacity-20 py-4 align-middle">
				<div class="text-xl font-normal leading-none text-slate-800">Total</div>
				<div class="text-right text-xl font-normal leading-normal text-black">
					{new Intl.NumberFormat(LOCALES, { style: 'currency', currency: CURRENCY }).format(totalCheckout / 100)}
				</div>
			</div>
		{/if}

		<!-- checkout -->
		<button
			class="h-11 w-full rounded bg-violet-500 text-base font-normal leading-none text-white enabled:hover:bg-violet-700 enabled:hover:drop-shadow disabled:cursor-not-allowed disabled:bg-violet-400"
			disabled={totalItems === 0}
			on:click={() => ($checkout = true)}
		>
			Checkout
		</button>
	</div>
</div>
