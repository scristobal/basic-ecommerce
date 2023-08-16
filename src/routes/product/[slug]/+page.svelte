<script lang="ts">
	import Detail from '$lib/components/product-detail.svelte';

	export let data;
</script>

<Detail product={data.product} quantity={data.quantity} offers={data.offers} />
