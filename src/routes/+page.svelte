<script lang="ts">
    import Products from '$lib/components/product-list.svelte';
    import Cart from '$lib/components/cart-details.svelte';

    export let data;
    export let form;
</script>

<div class="h-full overflow-auto lg:grid lg:grid-cols-10">
    <div class="bg-white px-16 py-12 lg:col-span-7">
        <Products products={data.products} />
    </div>
    <div class="bg-zinc-300 px-9 py-12 lg:col-span-3">
        <Cart products={data.products} offers={data.offers} checkout={form?.checkout} />
    </div>
</div>
