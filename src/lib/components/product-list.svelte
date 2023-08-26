<script lang="ts">
    import type { Product } from '$lib/types';
    import { cart } from '$lib/store';
    import { formatCurrency } from '$lib/helpers/currency';

    export let products: Product[];

    $: rows = products.map((product) => ({
        product,
        quantity: $cart[product.code] ?? 0
    }));
</script>

<!-- Title  -->
<h1 class="h-10 w-full border-b border-slate-800 border-opacity-20 text-lg font-extrabold leading-none text-slate-800">Products</h1>

<section>
    <!-- Table headers -->
    <h2 class="my-8 grid w-full grid-cols-6 text-xs uppercase leading-3 text-gray-400">
        <span class="col-span-3 text-left">Product Details</span>
        <span class="text-center font-normal">Quantity</span>
        <span class="text-center font-normal">Price</span>
        <span class="text-center font-normal">Total</span>
    </h2>
    <!-- Products  -->
    {#each rows as { product, quantity }}
        <div class="mb-8 grid w-full grid-cols-6" data-testid={`${product.code}:listing`}>
            <!-- Product card -->
            <figure class="group pointer-events-none col-span-3 flex items-center align-middle">
                <a href={`/product/${product.code}`}>
                    <img
                        src={product.thumb}
                        width={100}
                        height={100}
                        alt={`A ${product.name} thumbnail image`}
                        class="cover-cover pointer-events-auto h-16 w-16 rounded border transition duration-200 group-hover:scale-105 group-hover:border-violet-500 group-hover:shadow"
                    />
                </a>
                <figcaption class="pointer-events-auto mx-4">
                    <a
                        class="text-lg font-normal capitalize leading-normal text-violet-500 transition duration-200 group-hover:text-violet-700 group-hover:drop-shadow"
                        href={`/product/${product.code}`}
                    >
                        {product.name}
                        <p class="text-xs font-normal leading-none text-gray-400 transition duration-200 group-hover:text-gray-600 group-hover:drop-shadow">
                            Product code {product.code}
                        </p>
                    </a>
                </figcaption>
            </figure>

            <!-- Product cart actions -->
            <form class="flex items-center justify-center">
                <button
                    class="justify-center text-xl font-normal leading-normal text-violet-500 hover:text-violet-700 group-hover:drop-shadow"
                    disabled={quantity === 0}
                    on:click={() => ($cart[product.code] = Math.max(0, quantity - 1))}
                >
                    -
                </button>
                <input class=" col-span-1 mx-2 aspect-square h-8 w-8 rounded border text-center" bind:value={quantity} disabled />
                <button
                    class="text-xl font-normal leading-normal text-violet-500 hover:text-violet-700 group-hover:drop-shadow"
                    on:click={() => ($cart[product.code] = quantity + 1)}
                >
                    +
                </button>
            </form>

            <!-- Product unit price  -->
            <span title={`${product.code} price`} class="grid place-items-center text-center text-base font-normal leading-none text-black">
                {formatCurrency(product.price)}
            </span>

            <!-- Product total price -->
            <span title={`${product.code} total`} class="grid place-items-center text-center text-base font-normal leading-none text-black">
                {formatCurrency(quantity * product.price)}
            </span>
        </div>
    {/each}
</section>
