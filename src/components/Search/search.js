import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [code, setCode] = useState('');
    const [country, setCountry] = useState(null);
    const [error, setError] = useState('');

    const baseUrl = 'http://127.0.0.1:3000/api/v1/countries/';

    const handleSearch = async (inputCode) => {
        const upperCaseCode = inputCode.toUpperCase();

        try {
            let response = await axios.get(`${baseUrl}${upperCaseCode}`);

            if (response.data) {
                setCountry(response.data);
                setError('');
            } else {
                setError('No country found');
                setCountry(null);
            }
        } catch (error) {
            console.error('An error occurred while searching for the country:', error.message);
            setError('An error occurred while searching for the country');
            setCountry(null);
        }
    };

    const handleDelete = async (id) => {
        try {
            let response = await axios.delete(`${baseUrl}${id}`);

            if (response.status === 200) {
                alert('Delete successful');
                setCountry(null);
            }
        } catch (error) {
            console.error('Error deleting country:', error.message);
        }
    };

    return (
        <div className="my-4">
            <div className="mb-2">
                {error && <p>{error}</p>}
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Enter alpha code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button className='btn-primary' onClick={() => handleSearch(code)}>Search</button>
                </form>
            </div>

            <div className="mt-3">
                {country && (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Country Name</th>
                                <th scope="col">Currency</th>
                                <th scope="col">Alpha 2 code</th>
                                <th scope="col">Alpha 3 code</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={country.id}>
                                <td>{country.id}</td>
                                <td>{country.name}</td>
                                <td>{country.currency}</td>
                                <td>{country.alpha_2_code}</td>
                                <td>{country.alpha_3_code}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(country.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Search;