import { describe, it, expect } from 'vitest';
import { cart } from './store';
import type { Cart } from './types';

describe('cart', () => {
    it('should allow adding items', () => {
        cart.addItemByCode('test');

        let items: Cart = {};

        cart.subscribe((cart) => (items = cart));

        expect(items['test']).toBe(1);
    });

    it('should allow removing items', () => {
        cart.addItemByCode('test');
        cart.addItemByCode('test');
        cart.addItemByCode('test');
        cart.removeItemByCode('test');

        let items: Cart = {};

        cart.subscribe((cart) => (items = cart));

        expect(items['test']).toBe(2);
    });
});
