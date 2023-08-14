<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Product } from '$lib/types';

	export let product: Product;
</script>

<div class="grid h-full grid-cols-10">
	<!-- Large product image -->
	<div class="col-span-7">
		<img src={product.image} width={1200} height={800} alt={product.description} class="h-full w-full object-cover" />
	</div>

	<!-- Close button -->
	<a href={'/'} class="absolute right-8 top-8 h-4 w-4">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L8 6.58579L13.2929 1.29289C13.6834 0.902369 14.3166 0.902369 14.7071 1.29289C15.0976 1.68342 15.0976 2.31658 14.7071 2.70711L9.41421 8L14.7071 13.2929C15.0976 13.6834 15.0976 14.3166 14.7071 14.7071C14.3166 15.0976 13.6834 15.0976 13.2929 14.7071L8 9.41421L2.70711 14.7071C2.31658 15.0976 1.68342 15.0976 1.29289 14.7071C0.902369 14.3166 0.902369 13.6834 1.29289 13.2929L6.58579 8L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z"
				fill="#8383AD"
			/>
		</svg>
	</a>

	<!-- Product description -->
	<div class="col-span-3 flex flex-col justify-between bg-white px-12 py-40">
		<div>
			<div class="flex flex-row">
				<div class="flex h-10 w-full flex-row justify-between">
					<div class=" text-lg font-extrabold leading-normal text-slate-800">
						{product.code.toUpperCase()}
					</div>
					<div class=" text-lg font-extrabold leading-normal text-slate-800">
						{product.price}
					</div>
				</div>
			</div>
			<div class="w-full border-b border-t border-gray-300 pb-14 pt-8 text-justify text-xs font-normal leading-none text-slate-800">
				{product.description}
			</div>
			<div class="my-4 text-xs font-normal leading-none text-slate-500">
				Product code {product.code.toUpperCase()}
			</div>
		</div>

		<form method="POST" action="?/add" use:enhance>
			<input type="hidden" name="product-code" value={product.code} />
			<button class="h-11 w-full rounded bg-violet-500 text-white"> Add to cart</button>
		</form>
	</div>
</div>
