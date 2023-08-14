export type Product = {
	name: string;
	code: string;
	price: bigint;
	image: string;
	thumb: string;
	description: string;
};

export type Discount = {
	name: string;
	amount: bigint;
};
