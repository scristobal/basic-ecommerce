<script lang="ts">
    import { fly } from 'svelte/transition';
    import type { Offer, Product } from '$lib/types';
    import { getDiscount } from '$lib/core/offers';
    import { cart } from '$lib/store';
    import { formatCurrency } from '$lib/helpers/currency';
    import { enhance } from '$app/forms';

    export let products: Product[];
    export let offers: Offer[];
    export let checkout: number | undefined;

    cart.subscribe(() => (checkout = undefined));

    let checkingout = false;

    $: discounts = offers.map((offer) => {
        const quantity = $cart[offer.productCode] ?? 0;
        const product = products.find((p) => p.code === offer.productCode);

        if (product === undefined) throw new Error(`Product ${offer.productCode} not found`);

        const amount = getDiscount(offer, product, quantity);

        return {
            name: offer.name,
            amount,
            more: Math.max(0, offer.minPurchase - quantity)
        };
    });

    $: totalItems = Object.values($cart).reduce((acc, curr) => acc + curr, 0);
    $: totalCost = products.reduce((acc, curr) => acc + ($cart[curr.code] ?? 0) * curr.price, 0);
</script>

<div class="flex h-full flex-col justify-between" data-testid="cart">
    <!-- Discounts section -->
    <section>
        <h1 class="h-10 w-full border-b border-slate-800 border-opacity-20 text-lg font-extrabold leading-none text-slate-800">Cart</h1>
        <!-- In cart items summary -->
        <h2 class="my-10 flex justify-between">
            <span class="text-sm font-normal leading-none text-slate-800">{totalItems} items</span>
            <span class="text-right text-sm font-normal leading-none text-black">{formatCurrency(totalCost)}</span>
        </h2>
        <!-- List of discounts -->
        {#if discounts.length > 0}
            <div class="border-b border-t border-slate-800 border-opacity-20 py-8">
                <h3 class="mb-6 text-xs font-normal leading-none text-gray-500">DISCOUNTS</h3>
                <div role="list" class="flex flex-col gap-6">
                    {#each discounts as discount}
                        <div role="listitem" class=" flex justify-between" title={`${discount.name}`}>
                            <span class="text-sm font-normal leading-none text-slate-800">{discount.name}</span>
                            {#if discount.amount > 0}
                                <span class="text-right text-sm font-normal leading-none text-black">{formatCurrency(-discount.amount)} </span>
                            {:else}
                                <span class="text-right text-sm font-normal leading-none text-red-600">buy {discount.more} more</span>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </section>
    <!-- Checkout section -->
    <section>
        <!-- total -->
        {#if checkout !== undefined}
            <div in:fly={{ y: '1rem' }} out:fly={{ y: '1rem' }} class="flex items-center justify-between border-t border-slate-800 border-opacity-20 py-4 align-middle">
                <div class="text-xl font-normal leading-none text-slate-800">Total</div>
                <div class="text-right text-xl font-normal leading-normal text-black">{formatCurrency(checkout)}</div>
            </div>
        {/if}
        <!-- checkout -->
        <form
            method="POST"
            action="?/checkout"
            use:enhance={() => {
                checkingout = true;

                return async ({ update }) => {
                    await update();
                    checkingout = false;
                };
            }}
        >
            <input hidden value={JSON.stringify($cart)} name="cart" />
            <!-- {#if checkout === undefined} -->
            <button
                class="h-11 w-full rounded bg-violet-500 text-base font-normal leading-none text-white enabled:hover:bg-violet-700 enabled:hover:drop-shadow disabled:cursor-not-allowed disabled:bg-violet-400"
                disabled={totalItems === 0 || checkout !== undefined || checkingout}
            >
                {#if checkingout}
                    <svg class="mx-auto" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff"
                        ><style>
                            @keyframes spinner {
                                to {
                                    transform: rotate(360deg);
                                }
                            }
                        </style><path
                            d="M12 4a8 8 0 0 1 7.89 6.7 1.53 1.53 0 0 0 1.49 1.3 1.5 1.5 0 0 0 1.48-1.75 11 11 0 0 0-21.72 0A1.5 1.5 0 0 0 2.62 12a1.53 1.53 0 0 0 1.49-1.3A8 8 0 0 1 12 4Z"
                            style="transform-origin:center;animation:spinner .75s infinite linear"
                        /></svg
                    >
                {:else}
                    {checkout === undefined ? 'Checkout' : 'Purchase'}
                {/if}
            </button>
            <!-- {/if} -->
        </form>
    </section>
</div>
