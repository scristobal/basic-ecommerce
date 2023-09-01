import { describe, it, expect, beforeAll } from 'vitest';
import { cart } from './store';
import type { Cart } from './types';

describe('cart', () => {
    let items: Cart = {};

    beforeAll(() => {
        cart.subscribe((cart) => (items = cart));
    });

    it('should allow adding items', () => {
        cart.addItemByCode('test');

        expect(items['test']).toBe(1);
    });

    it('should allow removing items', () => {
        cart.addItemByCode('test');
        cart.removeItemByCode('test');

        expect(items['test']).toBe(1);
    });

    it('should remove items', () => {
        cart.removeItemByCode('test');

        expect(items['test']).toBeUndefined();
    });
});
