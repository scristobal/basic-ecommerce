import { writable } from 'svelte/store';
import { Cart } from '$lib/core/cart';

export const cart = writable(new Cart());
export const checkout = writable(false);
