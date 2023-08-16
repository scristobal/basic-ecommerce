<script lang="ts">
	import Products from '$lib/components/product-list.svelte';
	import Checkout from '$lib/components/checkout.svelte';

	export let data;
</script>

<div class="grid h-full grid-cols-10">
	<div class="col-span-7 bg-white px-16 py-12">
		<Products products={data.products} cart={data.cart} />
	</div>
	<div class=" col-span-3 bg-zinc-300 px-9 py-12">
		<Checkout products={data.products} cart={data.cart} offers={data.offers} checked={data.checked} />
	</div>
</div>
