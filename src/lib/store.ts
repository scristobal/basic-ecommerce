import { writable, type Writable } from 'svelte/store';
import type { Cart } from '$lib/types';
import { browser } from '$app/environment';

export function createCart() {
    let cart: Writable<Cart>;

    if (browser && window?.localStorage !== undefined) {
        const storedCart = JSON.parse(window.localStorage.getItem('cart') ?? '{}') as Cart;

        cart = writable(storedCart);
        cart.subscribe((cart) => localStorage.setItem('cart', JSON.stringify(cart)));
    } else cart = writable({} as Cart);

    return {
        subscribe: cart.subscribe,
        addItemByCode(code: string) {
            cart.update((cart) => {
                if (cart[code]) cart[code]++;
                else cart[code] = 1;
                return cart;
            });
        },
        removeItemByCode(code: string) {
            cart.update((cart) => {
                if (cart[code] && (cart[code] ?? 0) > 1) cart[code]--;
                else delete cart[code];
                return cart;
            });
        }
    };
}

export const cart = createCart();
