import { writable, type Writable } from 'svelte/store';
import type { Cart } from '$lib/types';
import { browser } from '$app/environment';

export let cart: Writable<Cart>;

if (browser && window?.localStorage !== undefined) {
    const storedCart = JSON.parse(window.localStorage.getItem('cart') ?? '{}') as Cart;

    cart = writable(storedCart);
    cart.subscribe((cart) => localStorage.setItem('cart', JSON.stringify(cart)));
} else cart = writable({} as Cart);

export const checkout = writable(false);

cart.subscribe(() => checkout.set(false));
