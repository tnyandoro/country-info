import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; 
import axios from 'axios';
import Countries from './Countries';

jest.mock('axios'); 

describe('Countries Component', () => {
    beforeEach(() => {
        axios.get.mockReset(); 
    });

    it('should render component with initial state', async () => {
        axios.get.mockResolvedValueOnce({
            data: [
                { id: 1, name: 'Country 1', currency: 'Currency 1', alpha_2_code: 'C1', alpha_3_code: 'C1' },
                { id: 2, name: 'Country 2', currency: 'Currency 2', alpha_2_code: 'C2', alpha_3_code: 'C2' }
            ]
        });

        const { getByText, getByRole } = render(<Countries />);

        expect(getByText('Countries Table')).toBeInTheDocument();

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:3000/api/v1/countries/');
            expect(getByText('Country 1')).toBeInTheDocument();
            expect(getByText('Country 2')).toBeInTheDocument();
        });
    });

    it('should handle delete action correctly', async () => {
        axios.get.mockResolvedValueOnce({
            data: [
                { id: 1, name: 'Country 1', currency: 'Currency 1', alpha_2_code: 'C1', alpha_3_code: 'C1' }
            ]
        });

        axios.delete.mockResolvedValueOnce({ status: 200 });

        const { getByText } = render(<Countries />);

        await waitFor(() => {
            expect(getByText('Country 1')).toBeInTheDocument();

            fireEvent.click(getByText('Delete'));

            expect(axios.delete).toHaveBeenCalledTimes(1);
            expect(axios.delete).toHaveBeenCalledWith('http://127.0.0.1:3000/api/v1/countries/1');

            expect(getByText('No countries to show')).toBeInTheDocument();
        });
    });

    it('should filter countries by currency', async () => {
        axios.get.mockResolvedValueOnce({
            data: [
                { id: 1, name: 'Country 1', currency: 'Currency 1', alpha_2_code: 'C1', alpha_3_code: 'C1' },
                { id: 2, name: 'Country 2', currency: 'Currency 2', alpha_2_code: 'C2', alpha_3_code: 'C2' }
            ]
        });

        const { getByText, getByLabelText } = render(<Countries />);

        await waitFor(() => {
            expect(getByText('Country 1')).toBeInTheDocument();
            expect(getByText('Country 2')).toBeInTheDocument();
        });

        fireEvent.change(getByLabelText('Filter by currency'), { target: { value: 'Currency 1' } });

        expect(getByText('Country 1')).toBeInTheDocument();
        expect(queryByText('Country 2')).not.toBeInTheDocument();
    });
});
