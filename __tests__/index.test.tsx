import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { describe, it, expect } from '@jest/globals';

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home />);

        const heading = screen.getByRole('heading', {
            name: /Homepage/i
        });

        expect(heading).toBeInTheDocument();
    });
});
