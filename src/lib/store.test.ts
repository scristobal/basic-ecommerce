import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { createCart } from './store';
import type { Cart } from './types';
import type { Unsubscriber } from 'svelte/store';

describe('cart', () => {
    let items: Cart = {};
    let cart: ReturnType<typeof createCart>;

    let unsubscribe: Unsubscriber;

    beforeEach(() => {
        cart = createCart();
        unsubscribe = cart.subscribe((cart) => (items = cart));
    });

    afterEach(() => {
        unsubscribe();
        items = {};
    });

    it('should allow adding items', () => {
        expect(items['test']).toBeUndefined();

        cart.addItemByCode('test');

        expect(items['test']).toBe(1);
    });

    it('should allow removing items', () => {
        expect(items['test']).toBeUndefined();

        cart.addItemByCode('test');
        cart.addItemByCode('test');
        cart.removeItemByCode('test');

        expect(items['test']).toBe(1);
    });

    it('should remove items', () => {
        expect(items['test']).toBeUndefined();

        cart.removeItemByCode('test');
        cart.removeItemByCode('test');

        expect(items['test']).toBeUndefined();
    });
});
