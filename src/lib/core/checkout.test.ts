import { describe, it, expect } from 'vitest';
import { checkout } from './checkout';

describe('Checkout examples', () => {
    it('Items: CAP, TSHIRT, MUG Total: 32.50€', async () => {
        const cart = {
            CAP: 1,
            TSHIRT: 1,
            MUG: 1
        };

        const total = await checkout(cart);

        expect(total).toBe(3250);
    });

    it('Items: CAP, TSHIRT Total: 25.00€', async () => {
        const cart = {
            CAP: 1,
            TSHIRT: 1
        };

        const total = await checkout(cart);

        expect(total).toBe(2500);
    });

    it('Items: TSHIRT, TSHIRT, TSHIRT, CAP, TSHIRT Total: 65.00€', async () => {
        const cart = {
            CAP: 1,
            TSHIRT: 4
        };

        const total = await checkout(cart);

        expect(total).toBe(6500);
    });

    it('Items: CAP, TSHIRT, CAP, CAP, MUG, TSHIRT, TSHIRT Total: 62.50€', async () => {
        const cart = {
            CAP: 3,
            TSHIRT: 3,
            MUG: 1
        };

        const total = await checkout(cart);

        expect(total).toBe(6250);
    });
});
