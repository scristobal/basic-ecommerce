<script lang="ts">
	import type { Shop } from '$lib/core/shop';
	import { cart, checkout } from '$lib/stores';

	export let shop: Shop;

	$: offers = shop.checkDiscounts($cart);
	$: totalCost = shop.checkTotal($cart);
	$: totalCheckout = shop.checkout($cart);

	$: totalItems = $cart.totalProducts();
</script>

<div class="flex h-full flex-col justify-between">
	<div>
		<!-- Cart header -->
		<div class="h-10 w-full border-b border-slate-800 border-opacity-20 text-lg font-extrabold leading-none text-slate-800">Cart</div>

		<!-- In cart items summary -->
		<div class="my-10 flex justify-between">
			<div class="text-sm font-normal leading-none text-slate-800">{totalItems} Items</div>
			<div class="text-right text-sm font-normal leading-none text-black">
				{totalCost}
			</div>
		</div>

		<!-- List of discounts -->
		<div class="border-b border-t border-slate-800 border-opacity-20 py-8">
			<div class="mb-6 text-xs font-normal leading-none text-gray-500">DISCOUNTS</div>
			<div class="flex flex-col gap-6">
				{#each offers as { offer, amount }}
					<div class=" flex justify-between">
						<div class="text-sm font-normal leading-none text-slate-800">{offer.name}</div>
						<div class="text-right text-sm font-normal leading-none text-black">
							{amount}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<!-- Flex space -->
	<div>
		<!-- total -->
		{#if $checkout}
			<div class="flex items-center justify-between border-t border-slate-800 border-opacity-20 py-4 align-middle">
				<div class="text-xl font-normal leading-none text-slate-800">Total</div>
				<div class="text-right text-xl font-normal leading-normal text-black">
					{totalCheckout}
				</div>
			</div>
		{/if}

		<!-- checkout -->
		<button
			class="h-11 w-full rounded bg-violet-500 text-base font-normal leading-none text-white enabled:hover:bg-violet-700 enabled:hover:drop-shadow disabled:cursor-not-allowed disabled:bg-violet-400"
			disabled={$cart.isEmpty()}
			on:click={() => {
				$checkout = true;
			}}
		>
			Checkout
		</button>
	</div>
</div>
