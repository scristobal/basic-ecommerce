import { BulkOffer } from './offers';
import { Chart } from './chart';
import { Item } from './items';
import { expect } from '@jest/globals';

describe('BulkOffer', () => {
    const item: Item = {
        code: 'ABC',
        name: 'Item ABC',
        price: 100n
    };

    let chart: Chart;

    beforeEach(() => {
        chart = new Chart();
    });

    it('should return 0 discount if item is not in the chart', () => {
        const offer = new BulkOffer(item, 3, 10);
        const discount = offer.discount(chart);
        expect(discount).toBe(0n);
    });

    it('should return 0 discount if item quantity is less than min_quantity', () => {
        chart.add(item, 2);
        const offer = new BulkOffer(item, 3, 10);
        const discount = offer.discount(chart);
        expect(discount).toBe(0n);
    });

    it('should return the correct discount if item quantity is equal to min_quantity', () => {
        chart.add(item, 3);
        const offer = new BulkOffer(item, 3, 10);
        const discount = offer.discount(chart);
        expect(discount).toBe(30n);
    });

    it('should return the correct discount if item quantity is greater than min_quantity', () => {
        chart.add(item, 5);
        const offer = new BulkOffer(item, 3, 10);
        const discount = offer.discount(chart);
        expect(discount).toBe(50n);
    });
});

import { BuyXGetYFreeOffer } from './offers';

describe('BuyXGetYFreeOffer', () => {
    const item: Item = {
        code: 'ABC',
        name: 'Item ABC',
        price: 100n
    };

    let chart: Chart;

    beforeEach(() => {
        chart = new Chart();
    });

    it('should return 0 discount if item is not in the chart', () => {
        const offer = new BuyXGetYFreeOffer(item, 3, 1);
        const discount = offer.discount(chart);
        expect(discount).toBe(0n);
    });

    it('should return 0 discount if item quantity is less than x', () => {
        chart.add(item, 2);
        const offer = new BuyXGetYFreeOffer(item, 3, 1);
        const discount = offer.discount(chart);
        expect(discount).toBe(0n);
    });

    it('should return the correct discount if item quantity is equal to x', () => {
        chart.add(item, 3);
        const offer = new BuyXGetYFreeOffer(item, 3, 1);
        const discount = offer.discount(chart);
        expect(discount).toBe(100n);
    });

    it('should return the correct discount if item quantity is greater than x', () => {
        chart.add(item, 5);
        const offer = new BuyXGetYFreeOffer(item, 3, 1);
        const discount = offer.discount(chart);
        expect(discount).toBe(100n);
    });

    it('should return the correct discount if item quantity is a multiple of x', () => {
        chart.add(item, 6);
        const offer = new BuyXGetYFreeOffer(item, 3, 1);
        const discount = offer.discount(chart);
        expect(discount).toBe(200n);
    });

    it('should return the correct discount if item quantity is greater than x and y', () => {
        chart.add(item, 7);
        const offer = new BuyXGetYFreeOffer(item, 3, 2);
        const discount = offer.discount(chart);
        expect(discount).toBe(400n);
    });

    it('should return the correct discount if item quantity is a multiple of x and greater than x and y', () => {
        chart.add(item, 9);
        const offer = new BuyXGetYFreeOffer(item, 3, 2);
        const discount = offer.discount(chart);
        expect(discount).toBe(600n);
    });
});
