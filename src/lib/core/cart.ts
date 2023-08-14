export interface Product {
	code: string;
}
/**
 * A chart is a collection of products that will be purchased.
 * It keeps track of the quantity of each product.
 */
export class Cart {
	private productQuantities = new Map<string, number>();

	/**
	 * Adds `quantity` of `product` to the chart.
	 * If `product` is already in the chart, it increases its quantity.
	 */
	add(product: Product, quantity = 1): void {
		if (quantity < 1) throw new Error('Quantity must be greater than 0');

		const amount = this.productQuantities.get(product.code) ?? 0;
		this.productQuantities.set(product.code, amount + quantity);
	}

	/**
	 * Removes `quantity` of `product` from the chart.
	 * If `product` is not in the chart or the quantity is greater than the existing quantity, it does nothing.
	 */
	remove(product: Product, quantity = 1): void {
		if (quantity < 1) throw new Error('Quantity must be greater than 0');

		const amount = this.productQuantities.get(product.code) ?? 0;
		if (amount < quantity) throw new Error('Quantity must be less than or equal to the amount in the cart');

		this.productQuantities.set(product.code, amount - quantity);
	}

	/**
	 * Returns the quantity of the specified `product` in the chart.
	 * If the product is not in the chart, it returns 0.
	 */
	amountOf(product: Product): number {
		return this.productQuantities.get(product.code) ?? 0;
	}

	/**
	 * Returns the total number of products in the cart.
	 */
	totalProducts(): number {
		let total = 0;
		this.productQuantities.forEach((value) => {
			total += value;
		});
		return total;
	}

	/**
	 * Returns true if the cart is empty.
	 */
	isEmpty(): boolean {
		return this.totalProducts() === 0;
	}

	toString(): string {
		let str = '';
		this.productQuantities.forEach((value, key) => {
			str += `${key}: ${value}\n`;
		});
		return str;
	}

	fromString(str: string): Cart {
		const cart = new Cart();
		const lines = str.split('\n');
		for (const line of lines) {
			const [code, amount] = line.split(': ');
			if (typeof code !== 'string' || typeof amount !== 'string') throw new Error('Invalid cart string');
			cart.add({ code }, parseInt(amount));
		}
		return cart;
	}
}
