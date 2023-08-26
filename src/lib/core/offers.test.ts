import { describe, it, expect } from 'vitest';
import { getDiscount, BULK_OFFER, BUYXGETY } from './offers';

const product = {
    name: 'Test product',
    code: 'test',
    price: 1000,
    image: 'test.jpg',
    thumb: 'test-thumb.jpg',
    description: 'Test product description'
};

describe('Bulk offers', () => {
    const offer = {
        id: 'test',
        name: 'Test offer',
        type: BULK_OFFER,
        productCode: 'test',
        minPurchase: 3,
        percentage: 50
    } as const;

    it('should not apply if the number of items is smaller than required', () => {
        const discount = getDiscount(offer, product, 1);

        expect(discount).toBe(0);
    });

    it('should apply if the number of items is equal to the required', () => {
        const discount = getDiscount(offer, product, 3);
        expect(discount).toBe(1500);
    });

    it('should apply if the number of items is greater than the required', () => {
        const discount = getDiscount(offer, product, 4);
        expect(discount).toBe(2000);
    });

    it('should apply linearly with the number of products', () => {
        expect(getDiscount(offer, product, 2)).toBe(0);
        expect(getDiscount(offer, product, 3)).toBe(1500);
        expect(getDiscount(offer, product, 4)).toBe(2000);
        expect(getDiscount(offer, product, 5)).toBe(2500);
        expect(getDiscount(offer, product, 6)).toBe(3000);
    });
});

describe('Buy X get Y offers', () => {
    const offer = {
        id: 'test',
        name: 'Test offer',
        type: BUYXGETY,
        productCode: 'test',
        minPurchase: 3,
        getFree: 1
    } as const;

    it('should not apply if the number of items is smaller than required', () => {
        const discount = getDiscount(offer, product, 1);

        expect(discount).toBe(0);
    });

    it('should apply if the number of items is equal to the required', () => {
        const discount = getDiscount(offer, product, 3);
        expect(discount).toBe(1000);
    });

    it('should apply if the number of items is greater than the required', () => {
        const discount = getDiscount(offer, product, 4);
        expect(discount).toBe(1000);
    });

    it('should apply as an step function on the number of products', () => {
        expect(getDiscount(offer, product, 2)).toBe(0);
        expect(getDiscount(offer, product, 3)).toBe(1000);
        expect(getDiscount(offer, product, 4)).toBe(1000);
        expect(getDiscount(offer, product, 5)).toBe(1000);
        expect(getDiscount(offer, product, 6)).toBe(2000);
    });
});
