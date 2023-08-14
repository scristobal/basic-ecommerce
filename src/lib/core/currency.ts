/**
 * A currency value in Euros.
 */
export class Currency {
	readonly value: bigint;

	/**
	 * Creates a new Currency,`value` The value of the currency in cents of Euros or as a string with the € symbol.
	 */
	constructor(value: string | bigint | number) {
		switch (typeof value) {
			case 'string': {
				if (!value.includes('€')) throw new Error('Invalid currency format. Must include € symbol. Eg. "0.99 €"');

				value = value.replace('€', '').replace(',', '.').replace(' ', '').trim();

				const [euros = '0', cents = '00'] = value.split('.');

				this.value = BigInt(euros + cents.padEnd(2, '0'));
				break;
			}
			case 'bigint':
			case 'number': {
				this.value = BigInt(value);
			}
		}
	}

	/**
	 * overrides the toString method to return a string with the € symbol.
	 */
	toString(): string {
		const euros = this.value / 100n;
		const cents = this.value % 100n;

		const decimal = `.${cents.toString().padStart(2, '0').replace(/0+$/, '')}`;

		return `${euros}${cents > 0n ? decimal : ''} €`;
	}

	/**
	 * Adds two currency values together.
	 */
	add(other: Currency): Currency {
		return new Currency(this.value + other.value);
	}

	/**
	 * Subtracts two currency values.
	 */
	subtract(other: Currency): Currency {
		return new Currency(this.value - other.value);
	}

	multiply(times: bigint): Currency {
		return new Currency(this.value * times);
	}
}
