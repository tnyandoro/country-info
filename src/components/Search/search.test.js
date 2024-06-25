import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import axios from 'axios';
import Search from './search';

jest.mock('axios');

describe('Search Component', () => {
    it('should fetch and display country details on search', async () => {
        axios.get.mockResolvedValue({
            data: {
                id: 1,
                name: 'Test Country',
                currency: 'Test Currency',
                alpha_2_code: 'TC',
                alpha_3_code: 'TST'
            }
        });

        const { getByText, getByPlaceholderText, getByRole } = render(<Search />);

        const searchInput = getByPlaceholderText('Enter alpha code');
        const searchButton = getByRole('button', { name: 'Search' });

        fireEvent.change(searchInput, { target: { value: 'tc' } });
        fireEvent.click(searchButton);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:3000/api/v1/countries/TC');
            expect(getByText('Test Country')).toBeInTheDocument();
            expect(getByText('Test Currency')).toBeInTheDocument();
        });
    });
});
