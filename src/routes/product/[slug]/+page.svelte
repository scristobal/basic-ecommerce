<script lang="ts">
	import Details from '$lib/components/product-details.svelte';

	export let data;
</script>

<Details product={data.product} offers={data.offers} />
