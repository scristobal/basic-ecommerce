import { Cart, type Product } from './cart';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Chart', () => {
	let chart: Cart;
	let item: Product;
	let otherItem: Product;

	beforeEach(() => {
		chart = new Cart();
		item = { code: 'test1' };
		otherItem = { code: 'test2' };
	});

	describe('amountOf', () => {
		it('should return the quantity of the item if it is in the chart', () => {
			chart.add(item, 5);
			expect(chart.amountOf(item)).toEqual(5);
		});

		it('should return 0 if the item is not in the chart', () => {
			expect(chart.amountOf(item)).toEqual(0);
		});

		it('should keep track of adding different items', () => {
			chart.add(item, 5);
			chart.add(otherItem, 3);
			expect(chart.amountOf(item)).toEqual(5);
			expect(chart.amountOf(otherItem)).toEqual(3);
		});

		it('should keep track of removing different items', () => {
			chart.add(item, 5);
			chart.add(otherItem, 3);
			chart.remove(item, 2);
			chart.remove(otherItem, 1);
			expect(chart.amountOf(item)).toEqual(3);
			expect(chart.amountOf(otherItem)).toEqual(2);
		});
	});

	describe('add', () => {
		it('should add the item to the chart if it is not present', () => {
			chart.add(item, 5);
			expect(chart.amountOf(item)).toEqual(5);
		});

		it('should increase the quantity of the item if it is already in the chart', () => {
			chart.add(item, 2);
			chart.add(item, 3);
			expect(chart.amountOf(item)).toEqual(5);
		});

		it('should keep track of adding different items', () => {
			chart.add(item, 5);
			chart.add(otherItem, 3);
			expect(chart.amountOf(item)).toEqual(5);
			expect(chart.amountOf(otherItem)).toEqual(3);
		});
	});

	describe('remove', () => {
		it('should decrease the quantity of the item if it is in the chart', () => {
			chart.add(item, 5);
			chart.remove(item, 4);
			expect(chart.amountOf(item)).toEqual(1);
		});

		it('should throw if try to remove more items than available on chart', () => {
			expect(() => chart.remove(item, 2)).toThrowError();
			expect(chart.amountOf(item)).toEqual(0);
		});

		it('should keep track of removing different items', () => {
			chart.add(item, 5);
			chart.add(otherItem, 3);
			chart.remove(item, 2);
			chart.remove(otherItem, 1);
			expect(chart.amountOf(item)).toEqual(3);
			expect(chart.amountOf(otherItem)).toEqual(2);
		});
	});
});
