export type Product = { name: string; code: string; price: number; image: string; thumb: string; description: string };

export type Discount = { name: string; amount: number; more?: number };

export type Cart = { [code: string]: number };
