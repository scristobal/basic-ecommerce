import { Store } from './store';
import { Chart } from './chart';
import { BulkOffer, BuyXGetYFreeOffer, Offer } from './offers';
import { Item } from './items';
import { expect } from '@jest/globals';

describe('Store', () => {
    let store: Store;
    let chart: Chart;

    const items: [Item, Item, Item] = [
        { code: 'TSHIRT', name: 'T-Shirt', price: 2000n },
        { code: 'MUG', name: 'Coffee Mug', price: 750n },
        { code: 'CAP', name: 'Cap', price: 500n }
    ];

    const offers: Offer[] = [new BuyXGetYFreeOffer(items[2], 2, 1), new BulkOffer(items[0], 3, 25)];

    beforeEach(() => {
        store = new Store(items, offers);
        chart = new Chart();
    });

    describe('checkDiscounts', () => {
        it('should return an empty array if no offers are available', () => {
            const discounts = store.checkDiscounts(chart);

            expect(discounts).toEqual([
                { offer: offers[0], amount: 0n },
                { offer: offers[1], amount: 0n }
            ]);
        });

        it('should return no discounts for the example chart:  \
            Items: CAP, TSHIRT, MUG \
            Total: 32.50€', () => {
            chart.add(items[2], 1);
            chart.add(items[0], 1);
            chart.add(items[1], 1);

            const discounts = store.checkDiscounts(chart);

            expect(discounts).toEqual([
                { offer: offers[0], amount: 0n },
                { offer: offers[1], amount: 0n }
            ]);
        });

        it('should return the correct discounts for the example chart: \
            Items: CAP, TSHIRT, CAP, CAP, MUG, TSHIRT, TSHIRT \
            Total: 62.50€', () => {
            chart.add(items[2], 2);
            chart.add(items[0], 3);
            chart.add(items[1], 1);

            const discounts = store.checkDiscounts(chart);

            expect(discounts).toEqual([
                { offer: offers[0], amount: 500n },
                { offer: offers[1], amount: 1500n }
            ]);
        });
    });

    describe('checkTotals', () => {
        it('should return an empty array if no items are available', () => {
            const totals = store.checkTotals(chart);

            expect(totals).toEqual([]);
        });

        it('should return the correct totals for the example chart: \
            Items: CAP, TSHIRT, CAP, CAP, MUG, TSHIRT, TSHIRT \
            Total: 62.50€', () => {
            chart.add(items[2], 2);
            chart.add(items[0], 3);
            chart.add(items[1], 1);

            const totals = store.checkTotals(chart);

            expect(totals).toEqual([
                { item: items[2], amount: 1000n },
                { item: items[0], amount: 6000n },
                { item: items[1], amount: 750n }
            ]);
        });
    });

    describe('checkout', () => {
        it('should return the total price on example chart: \
            Items: CAP, TSHIRT, MUG \
            Total: 32.50€', () => {
            chart.add(items[2], 1);
            chart.add(items[0], 1);
            chart.add(items[1], 1);

            const totalPrice = store.checkout(chart);

            expect(totalPrice).toBe(3250n);
        });

        it('should return the total price on example chart: \
            Items: CAP, TSHIRT \
            Total: 25.00€', () => {
            chart.add(items[2], 1);
            chart.add(items[0], 1);

            const totalPrice = store.checkout(chart);

            expect(totalPrice).toBe(2500n);
        });

        it('should return the total price on example chart: \
            Items: TSHIRT, TSHIRT, TSHIRT, CAP, TSHIRT \
            Total: 65.00€', () => {
            chart.add(items[0], 3);
            chart.add(items[2], 1);
            chart.add(items[0], 1);

            const totalPrice = store.checkout(chart);

            expect(totalPrice).toBe(6500n);
        });

        it('should return the total price on example chart: \
            Items: CAP, TSHIRT, CAP, CAP, MUG, TSHIRT, TSHIRT \
            Total: 62.50€', () => {
            chart.add(items[2], 1);
            chart.add(items[0], 1);
            chart.add(items[2], 2);
            chart.add(items[1], 1);
            chart.add(items[0], 2);

            const totalPrice = store.checkout(chart);

            expect(totalPrice).toBe(6250n);
        });

        it('should apply offer only when min items threshold is reached ', () => {
            chart.add(items[0], 2);

            let totalPrice = store.checkout(chart);

            expect(totalPrice).toBe(4000n);

            chart.add(items[0], 1);

            totalPrice = store.checkout(chart);

            expect(totalPrice).toBe(4500n);

            chart.remove(items[0], 1);

            totalPrice = store.checkout(chart);

            expect(totalPrice).toBe(4000n);
        });

        it('should return the correct total price for the given chart with multiple items', () => {
            chart.add(items[2], 1);
            chart.add(items[0], 1);
            chart.add(items[1], 1);

            let totalPrice = store.checkout(chart);

            expect(totalPrice).toBe(3250n);

            chart.add(items[2], 1);

            totalPrice = store.checkout(chart);

            expect(totalPrice).toBe(3250n);

            chart.add(items[0], 1);

            totalPrice = store.checkout(chart);

            expect(totalPrice).toBe(5250n);
        });
    });
});
