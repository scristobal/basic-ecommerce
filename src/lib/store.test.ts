import { Store } from './store';
import { Cart } from './cart';
import { BulkOffer, BuyXGetYFreeOffer, Offer } from './offers';
import { Item } from './items';
import { expect } from '@jest/globals';

describe('Store', () => {
    let store: Store;
    let cart: Cart;

    const items: [Item, Item, Item] = [
        { code: 'TSHIRT', name: 'T-Shirt', price: 2000n },
        { code: 'MUG', name: 'Coffee Mug', price: 750n },
        { code: 'CAP', name: 'Cap', price: 500n }
    ];

    const offers: Offer[] = [new BuyXGetYFreeOffer(items[2], 2, 1), new BulkOffer(items[0], 3, 25)];

    beforeEach(() => {
        store = new Store(items, offers);
        cart = new Cart();
    });

    describe('checkDiscounts', () => {
        it('should return an empty array if no offers are available', () => {
            const discounts = store.checkDiscounts(cart);

            expect(discounts).toEqual([
                { offer: offers[0], amount: 0n },
                { offer: offers[1], amount: 0n }
            ]);
        });

        it('should return no discounts for the example cart:  \
            Items: CAP, TSHIRT, MUG \
            Total: 32.50€', () => {
            cart.add(items[2], 1);
            cart.add(items[0], 1);
            cart.add(items[1], 1);

            const discounts = store.checkDiscounts(cart);

            expect(discounts).toEqual([
                { offer: offers[0], amount: 0n },
                { offer: offers[1], amount: 0n }
            ]);
        });

        it('should return the correct discounts for the example cart: \
            Items: CAP, TSHIRT, CAP, CAP, MUG, TSHIRT, TSHIRT \
            Total: 62.50€', () => {
            cart.add(items[2], 2);
            cart.add(items[0], 3);
            cart.add(items[1], 1);

            const discounts = store.checkDiscounts(cart);

            expect(discounts).toEqual([
                { offer: offers[0], amount: 500n },
                { offer: offers[1], amount: 1500n }
            ]);
        });
    });

    describe('checkTotals', () => {
        it('should return an empty array if no items are available', () => {
            const totals = store.checkTotals(cart);

            expect(totals).toEqual([]);
        });

        it('should return the correct totals for the example cart: \
            Items: CAP, TSHIRT, CAP, CAP, MUG, TSHIRT, TSHIRT \
            Total: 62.50€', () => {
            cart.add(items[2], 2);
            cart.add(items[0], 3);
            cart.add(items[1], 1);

            const totals = store.checkTotals(cart);

            expect(totals).toEqual([
                { item: items[2], amount: 1000n },
                { item: items[0], amount: 6000n },
                { item: items[1], amount: 750n }
            ]);
        });
    });

    describe('checkout', () => {
        it('should return the total price on example cart: \
            Items: CAP, TSHIRT, MUG \
            Total: 32.50€', () => {
            cart.add(items[2], 1);
            cart.add(items[0], 1);
            cart.add(items[1], 1);

            const totalPrice = store.checkout(cart);

            expect(totalPrice).toBe(3250n);
        });

        it('should return the total price on example cart: \
            Items: CAP, TSHIRT \
            Total: 25.00€', () => {
            cart.add(items[2], 1);
            cart.add(items[0], 1);

            const totalPrice = store.checkout(cart);

            expect(totalPrice).toBe(2500n);
        });

        it('should return the total price on example cart: \
            Items: TSHIRT, TSHIRT, TSHIRT, CAP, TSHIRT \
            Total: 65.00€', () => {
            cart.add(items[0], 3);
            cart.add(items[2], 1);
            cart.add(items[0], 1);

            const totalPrice = store.checkout(cart);

            expect(totalPrice).toBe(6500n);
        });

        it('should return the total price on example cart: \
            Items: CAP, TSHIRT, CAP, CAP, MUG, TSHIRT, TSHIRT \
            Total: 62.50€', () => {
            cart.add(items[2], 1);
            cart.add(items[0], 1);
            cart.add(items[2], 2);
            cart.add(items[1], 1);
            cart.add(items[0], 2);

            const totalPrice = store.checkout(cart);

            expect(totalPrice).toBe(6250n);
        });

        it('should apply offer only when min items threshold is reached ', () => {
            cart.add(items[0], 2);

            let totalPrice = store.checkout(cart);

            expect(totalPrice).toBe(4000n);

            cart.add(items[0], 1);

            totalPrice = store.checkout(cart);

            expect(totalPrice).toBe(4500n);

            cart.remove(items[0], 1);

            totalPrice = store.checkout(cart);

            expect(totalPrice).toBe(4000n);
        });

        it('should return the correct total price for the given cart with multiple items', () => {
            cart.add(items[2], 1);
            cart.add(items[0], 1);
            cart.add(items[1], 1);

            let totalPrice = store.checkout(cart);

            expect(totalPrice).toBe(3250n);

            cart.add(items[2], 1);

            totalPrice = store.checkout(cart);

            expect(totalPrice).toBe(3250n);

            cart.add(items[0], 1);

            totalPrice = store.checkout(cart);

            expect(totalPrice).toBe(5250n);
        });
    });
});
