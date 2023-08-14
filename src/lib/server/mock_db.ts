/**
 * Mock database
 * This file is used to simulate a database
 */
export const db = {
	products: {
		_data: [
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
		],
		async getAll() {
			return this._data;
		},
		async getByCode(code: string) {
			return this._data.find((product) => product.code === code);
		}
	},
	offers: {
		_data: [
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
		],
		async getAll() {
			return this._data;
		}
	}
};
