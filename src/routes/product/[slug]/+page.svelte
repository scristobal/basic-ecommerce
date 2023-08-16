<script lang="ts">
	import Details from '$lib/components/product-details.svelte';

	export let data;
</script>

<Details product={data.product} quantity={data.quantity} offers={data.offers} />
