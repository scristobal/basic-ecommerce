import { BulkOffer, type Product } from './offers';
import { Cart } from './cart';
import { describe, it, expect, beforeEach } from 'vitest';

describe('BulkOffer', () => {
	const item: Product = {
		code: 'ABC',
		name: 'Item ABC',
		price: '100 €'
	};

	let cart: Cart;

	beforeEach(() => {
		cart = new Cart();
	});

	it('should return 0 discount if item is not in the cart', () => {
		const offer = new BulkOffer(item, 3, 10);
		const discount = offer.discount(cart);
		expect(discount).toEqual(new Currency('0 €'));
	});

	it('should return 0 discount if item quantity is less than min_quantity', () => {
		cart.add(item, 2);
		const offer = new BulkOffer(item, 3, 10);
		const discount = offer.discount(cart);
		expect(discount).toEqual(new Currency('0 €'));
	});

	it('should return the correct discount if item quantity is equal to min_quantity', () => {
		cart.add(item, 3);
		const offer = new BulkOffer(item, 3, 10);
		const discount = offer.discount(cart);
		expect(discount).toEqual(new Currency('30 €'));
	});

	it('should return the correct discount if item quantity is greater than min_quantity', () => {
		cart.add(item, 5);
		const offer = new BulkOffer(item, 3, 10);
		const discount = offer.discount(cart);
		expect(discount).toEqual(new Currency('50 €'));
	});
});

import { BuyXGetYFreeOffer } from './offers';
import { Currency } from './currency';

describe('BuyXGetYFreeOffer', () => {
	const item: Product = {
		code: 'ABC',
		name: 'Item ABC',
		price: '100 €'
	};

	let cart: Cart;

	beforeEach(() => {
		cart = new Cart();
	});

	it('should return 0 discount if item is not in the cart', () => {
		const offer = new BuyXGetYFreeOffer(item, 3, 1);
		const discount = offer.discount(cart);
		expect(discount).toEqual(new Currency('0 €'));
	});

	it('should return 0 discount if item quantity is less than x', () => {
		cart.add(item, 2);
		const offer = new BuyXGetYFreeOffer(item, 3, 1);
		const discount = offer.discount(cart);
		expect(discount).toEqual(new Currency('0 €'));
	});

	it('should return the correct discount if item quantity is equal to x', () => {
		cart.add(item, 3);
		const offer = new BuyXGetYFreeOffer(item, 3, 1);
		const discount = offer.discount(cart);
		expect(discount).toEqual(new Currency('100 €'));
	});

	it('should return the correct discount if item quantity is greater than x', () => {
		cart.add(item, 5);
		const offer = new BuyXGetYFreeOffer(item, 3, 1);
		const discount = offer.discount(cart);
		expect(discount).toEqual(new Currency('100 €'));
	});

	it('should return the correct discount if item quantity is a multiple of x', () => {
		cart.add(item, 6);
		const offer = new BuyXGetYFreeOffer(item, 3, 1);
		const discount = offer.discount(cart);
		expect(discount).toEqual(new Currency('200 €'));
	});

	it('should return the correct discount if item quantity is greater than x and y', () => {
		cart.add(item, 7);
		const offer = new BuyXGetYFreeOffer(item, 3, 2);
		const discount = offer.discount(cart);
		expect(discount).toEqual(new Currency('400 €'));
	});

	it('should return the correct discount if item quantity is a multiple of x and greater than x and y', () => {
		cart.add(item, 9);
		const offer = new BuyXGetYFreeOffer(item, 3, 2);
		const discount = offer.discount(cart);
		expect(discount).toEqual(new Currency('600 €'));
	});
});
