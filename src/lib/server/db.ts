import type { Offer, Product } from '$lib/types';
import { BULK_OFFER, BUYXGETY } from '$lib/constants';

const DELAY_MS = 100;
/**
 * Mock database
 * This file is used to simulate a database
 */
export const db = {
	products: {
		_data: [
			{
				code: 'TSHIRT',
				name: 't-shirt',
				price: 2000,
				image: '/TSHIRT.jpg',
				thumb: '/TSHIRT_thumb.png',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales semper elit sit amet interdum. Praesent volutpat sed elit vel consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.'
			},
			{
				code: 'MUG',
				name: 'coffee mug',
				price: 750,
				image: '/MUG.jpg',
				thumb: '/MUG_thumb.png',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales semper elit sit amet interdum. Praesent volutpat sed elit vel consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.'
			},
			{
				code: 'CAP',
				name: 'cap',
				price: 500,
				image: '/CAP.jpg',
				thumb: '/CAP_thumb.png',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales semper elit sit amet interdum. Praesent volutpat sed elit vel consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.'
			}
		] as Product[],
		async getAll(): Promise<Product[]> {
			await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
			return this._data;
		},
		async getByCode(code: string): Promise<Product | undefined> {
			await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

			return this._data.find((product) => product.code === code);
		}
	},
	offers: {
		_data: [
			{
				type: BULK_OFFER,
				id: 'CFO_BULK_1',
				name: `x3 t-shirt offer`,
				productCode: 'TSHIRT',
				minPurchase: 3,
				percentage: 25
			},
			{
				type: BUYXGETY,
				id: 'SALES_BUYXGETY_1',
				name: '3x1 cap offer',
				productCode: 'CAP',
				minPurchase: 3,
				getFree: 1
			}
		] as Offer[],
		async getByProductCode(productCode: string): Promise<Offer[]> {
			await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

			return this._data.filter((offer) => offer.productCode === productCode);
		}
	}
};
