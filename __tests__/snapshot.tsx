import { render } from '@testing-library/react';
import Home from '../src/app/page';
import { it, expect } from '@jest/globals';

it('renders homepage unchanged', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
});
