<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Product } from '$lib/types';

	export let products: Product[];
	export let cart: { [code: string]: number };
</script>

<!--  Section title  -->
<div class="h-10 w-full border-b border-slate-800 border-opacity-20 text-lg font-extrabold leading-none text-slate-800">
	<span>Products</span>
</div>

<!-- Table headers -->
<div class="my-8 grid w-full grid-cols-6 text-xs uppercase leading-3 text-gray-400">
	<div class="col-span-3 text-left">Product Details</div>
	<div class="text-center font-normal">Quantity</div>
	<div class="text-center font-normal">Price</div>
	<div class="text-center font-normal">Total</div>
</div>

<!-- Products  -->
{#each products as product}
	<div class="mb-8 grid w-full grid-cols-6">
		<!-- Product card -->
		<div class="group pointer-events-none col-span-3 flex items-center align-middle">
			<a href={`/product/${product.code}`}>
				<img
					src={product.thumb}
					width={100}
					height={100}
					alt={`A ${product.name} thumbnail image`}
					class="cover-cover pointer-events-auto h-16 w-16 rounded border transition duration-200 group-hover:scale-105 group-hover:border-violet-500 group-hover:shadow"
				/>
			</a>
			<div class="pointer-events-auto mx-4">
				<a
					class="text-lg font-normal capitalize leading-normal text-violet-500 transition duration-200 group-hover:text-violet-700 group-hover:drop-shadow"
					href={`/product/${product.code}`}
				>
					{product.name}
				</a>
				<div class=" text-xs font-normal leading-none text-gray-400 transition duration-200 group-hover:text-gray-600 group-hover:drop-shadow">
					Product code {product.code}
				</div>
			</div>
		</div>

		<!-- Product cart actions -->
		<div class="flex items-center justify-center">
			<form method="POST" action="?/decrease" use:enhance>
				<input type="hidden" name="product-code" value={product.code} />
				<button class="justify-center text-xl font-normal leading-normal text-violet-500 hover:text-violet-700 group-hover:drop-shadow"> - </button>
			</form>
			<div class="col-span-1 mx-2">
				<input class="aspect-square h-8 w-8 rounded border text-center" value={cart[product.code] ?? 0} disabled />
			</div>

			<form method="POST" action="?/increase" use:enhance>
				<input type="hidden" name="product-code" value={product.code} />
				<button class="text-xl font-normal leading-normal text-violet-500 hover:text-violet-700 group-hover:drop-shadow"> + </button>
			</form>
		</div>

		<!-- Product unit price  -->
		<div class="grid place-items-center text-center text-base font-normal leading-none text-black">
			{product.price}
		</div>

		<!-- Product total price -->
		<div class="grid place-items-center text-center text-base font-normal leading-none text-black">
			{BigInt(cart[product.code] ?? 0) * product.price}
		</div>
	</div>
{/each}
