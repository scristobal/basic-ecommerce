import { describe, it, expect } from 'vitest';

import { formatCurrency } from './currency';

describe('currency', () => {
    it('should format decimals', () => {
        expect(formatCurrency(5)).toBe('0,05 €');
    });

    it('should format currency without decimals', () => {
        expect(formatCurrency(100)).toBe('1,00 €');
    });

    it('should format currency with decimals', () => {
        expect(formatCurrency(105)).toBe('1,05 €');
    });

    it('should format currency with negative value', () => {
        expect(formatCurrency(-100)).toBe('-1,00 €');
    });

    it('should format zero', () => {
        expect(formatCurrency(0)).toBe('0,00 €');
    });
});
