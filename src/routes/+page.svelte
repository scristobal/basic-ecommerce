<script lang="ts">
	import Products from '$lib/components/Products.svelte';
	import Checkout from '$lib/components/Checkout.svelte';

	export let data;
</script>

<div class="grid h-full grid-cols-10">
	<div class="col-span-7 bg-white px-16 py-12">
		<Products {...data} />
	</div>
	<div class=" col-span-3 bg-zinc-300 px-9 py-12">
		<Checkout {...data} />
	</div>
</div>
