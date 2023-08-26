<script lang="ts">
    import type { Offer, Product } from '$lib/types';
    import { cart } from '$lib/store';
    import { goto } from '$app/navigation';
    import { formatCurrency } from '$lib/helpers/currency';

    export let product: Product;
    export let offers: Offer[] = [];

    $: quantity = $cart[product.code] ?? 0;

    $: discounts = offers.map((offer) => {
        return {
            name: offer.name,
            more: Math.max(0, offer.minPurchase - quantity)
        };
    });
</script>

<section class="relative h-full overflow-auto md:grid md:grid-cols-10">
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

    <!-- Large product image -->
    <img src={product.image} width={1200} height={800} alt={product.description} class="col-span-7 h-full w-full object-cover" />

    <!-- Left side column -->
    <div class="col-span-3 flex flex-col justify-between bg-white px-12 py-40">
        <!-- Description -->
        <div>
            <div class="flex flex-row">
                <h2 class="flex h-10 w-full flex-row justify-between">
                    <span class=" text-lg font-extrabold leading-normal text-slate-800">{product.code.toUpperCase()}</span>
                    <span class=" text-lg font-extrabold leading-normal text-slate-800">{formatCurrency(product.price)}</span>
                </h2>
            </div>
            <p class="w-full border-b border-t border-gray-300 pb-14 pt-8 text-justify text-xs font-normal leading-none text-slate-800">{product.description}</p>
            <span class="my-4 text-xs font-normal leading-none text-slate-500">Product code {product.code.toUpperCase()}</span>
        </div>

        <!-- Call to action -->
        <form>
            <!-- Show available offers and status -->
            {#each discounts as discount}
                {#if discount.more ?? 0 > 0}
                    <label for="button" class="my-4 text-sm text-red-600">add {discount.more} more to get a {discount.name}</label>
                {:else}
                    <label for="button" class="my-4 text-sm text-green-600">{discount.name} applied!</label>
                {/if}
            {/each}

            <!-- Add to cart  -->
            <button
                type="button"
                class="h-11 w-full rounded bg-violet-500 text-white"
                on:click={() => {
                    $cart[product.code] = Math.max(0, quantity + 1);
                    goto('/');
                }}
            >
                Add to cart</button
            >
        </form>
    </div>
</section>
