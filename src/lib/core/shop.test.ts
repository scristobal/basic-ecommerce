import { Shop, type Product } from './shop';
import { Cart } from './cart';
import { describe, it, expect, beforeEach } from 'vitest';
import { Currency } from './currency';

describe('Shop', () => {
	let shop: Shop;
	let cart: Cart;

	const items: [Product, Product, Product] = [
		{
			code: 'TSHIRT',
			name: 'T-Shirt',
			price: '20 €',
			image: '/TSHIRT.jpg',
			thumb: '/TSHIRT_thumb.png',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales semper elit sit amet interdum. Praesent volutpat sed elit vel consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.'
		},
		{
			code: 'MUG',
			name: 'Coffee Mug',
			price: '7.5 €',
			image: '/MUG.jpg',
			thumb: '/MUG_thumb.png',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales semper elit sit amet interdum. Praesent volutpat sed elit vel consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.'
		},
		{
			code: 'CAP',
			name: 'Cap',
			price: '5 €',
			image: '/CAP.jpg',
			thumb: '/CAP_thumb.png',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales semper elit sit amet interdum. Praesent volutpat sed elit vel consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.'
		}
	];

	const offers = [
		{
			type: 'BulkOffer' as const,
			productCode: 'TSHIRT',
			minQuantity: 3,
			percentage: 25
		},
		{
			type: 'BuyXGetYFreeOffer' as const,
			productCode: 'CAP',
			buy: 3,
			getFree: 1
		}
	];

	beforeEach(() => {
		shop = new Shop(items, offers);
		cart = new Cart();
	});

	describe('checkDiscounts', () => {
		it('should return an empty array if no offers are available', () => {
			const discounts = shop.checkDiscounts(cart);

			expect(discounts).toEqual([
				{ offer: offers[0], amount: new Currency('0 €') },
				{ offer: offers[1], amount: new Currency('0 €') }
			]);
		});

		it('should return no discounts for the example cart: CAP, TSHIRT, MUG. Total: 32.50€', () => {
			cart.add(items[2], 1);
			cart.add(items[0], 1);
			cart.add(items[1], 1);

			const discounts = shop.checkDiscounts(cart);

			expect(discounts).toEqual([
				{ offer: offers[0], amount: new Currency('0 €') },
				{ offer: offers[1], amount: new Currency('0 €') }
			]);
		});

		it('should return the correct discounts for the example cart: CAP, TSHIRT, CAP, CAP, MUG, TSHIRT, TSHIRT. Total: 62.50€', () => {
			cart.add(items[2], 2);
			cart.add(items[0], 3);
			cart.add(items[1], 1);

			const discounts = shop.checkDiscounts(cart);

			expect(discounts).toEqual([
				{ offer: offers[0], amount: new Currency('5 €') },
				{ offer: offers[1], amount: new Currency('15 €') }
			]);
		});
	});

	describe('checkTotals', () => {
		it('should return an empty array if no items are available', () => {
			const totals = shop.checkTotals(cart);

			expect(totals).toEqual([]);
		});

		it('should return the correct totals for the example cart: CAP, TSHIRT, CAP, CAP, MUG, TSHIRT, TSHIRT. Total: 62.50€', () => {
			cart.add(items[2], 2);
			cart.add(items[0], 3);
			cart.add(items[1], 1);

			const totals = shop.checkTotals(cart);

			expect(totals.length).toBe(3);

			expect(totals).toContainEqual({ item: items[2], amount: new Currency('10 €') });

			expect(totals).toContainEqual({ item: items[0], amount: new Currency('60 €') });

			expect(totals).toContainEqual({ item: items[1], amount: new Currency('7.5 €') });
		});
	});

	describe('checkout', () => {
		it('should return the total price on example cart: CAP, TSHIRT, MUG. Total: 32.50€', () => {
			cart.add(items[2], 1);
			cart.add(items[0], 1);
			cart.add(items[1], 1);

			const totalPrice = shop.checkout(cart);

			expect(totalPrice).toEqual(new Currency('32.5 €'));
		});

		it('should return the total price on example cart: CAP, TSHIRT. Total: 25.00€', () => {
			cart.add(items[2], 1);
			cart.add(items[0], 1);

			const totalPrice = shop.checkout(cart);

			expect(totalPrice).toEqual(new Currency('25 €'));
		});

		it('should return the total price on example cart: TSHIRT, TSHIRT, TSHIRT, CAP, TSHIRT. Total: 65.00€', () => {
			cart.add(items[0], 3);
			cart.add(items[2], 1);
			cart.add(items[0], 1);

			const totalPrice = shop.checkout(cart);

			expect(totalPrice).toEqual(new Currency('65 €'));
		});

		it('should return the total price on example cart: CAP, TSHIRT, CAP, CAP, MUG, TSHIRT, TSHIRT. Total: 62.50€', () => {
			cart.add(items[2], 1);
			cart.add(items[0], 1);
			cart.add(items[2], 2);
			cart.add(items[1], 1);
			cart.add(items[0], 2);

			const totalPrice = shop.checkout(cart);

			expect(totalPrice).toEqual(new Currency('62.5 €'));
		});

		it('should apply offer only when min items threshold is reached ', () => {
			cart.add(items[0], 2);

			let totalPrice = shop.checkout(cart);

			expect(totalPrice).toEqual(new Currency('40 €'));

			cart.add(items[0], 1);

			totalPrice = shop.checkout(cart);

			expect(totalPrice).toEqual(new Currency('45 €'));

			cart.remove(items[0], 1);

			totalPrice = shop.checkout(cart);

			expect(totalPrice).toEqual(new Currency('40 €'));
		});

		it('should return the correct total price for the given cart with multiple items', () => {
			cart.add(items[2], 1);
			cart.add(items[0], 1);
			cart.add(items[1], 1);

			let totalPrice = shop.checkout(cart);

			expect(totalPrice).toEqual(new Currency('32.5 €'));

			cart.add(items[2], 1);

			totalPrice = shop.checkout(cart);

			expect(totalPrice).toEqual(new Currency('32.5 €'));

			cart.add(items[0], 1);

			totalPrice = shop.checkout(cart);

			expect(totalPrice).toEqual(new Currency('52.5 €'));
		});
	});
});
