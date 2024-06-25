    import React, { useEffect, useState } from 'react';
    import axios from 'axios';

    const Countries = () => {
        const [countries, setCountries] = useState([]);
        const [filteredCountries, setFilteredCountries] = useState([]);
        const baseUrl = 'http://127.0.0.1:3000/api/v1/countries/';

        useEffect(() => {
            (async () => {
                try {
                    let response = await axios.get(`${baseUrl}`);

                    if (response.data) {
                        setCountries(response.data);
                        setFilteredCountries(response.data);
                    } else {
                        console.log('An error occurred while getting countries list');
                    }
                } catch (error) {
                    console.log(error.message);
                }
            })();
        }, []);

        const handleDelete = async (id) => {
            try {
                let response = await axios.delete(`${baseUrl}${id}`);

                if (response.status === 200) {
                    alert('Delete successful');
                    setFilteredCountries(filteredCountries.filter(country => country.id !== id));
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        const handleFilter = (currency) => {
            const filteredCountries = countries.filter(country => country.currency === currency);
            setFilteredCountries(filteredCountries);
        };

        return (
            <div className="container">
                <div className='w-full d-flex justify-content-between align-items-center'>
                    <h2>Countries Table</h2>
                    <select className="form-select form-select-sm" aria-label="Small select example" onChange={(e) => handleFilter(e.target.value)}>
                        <option defaultValue='Filter by currency'>Filter by currency</option>
                        {countries.map(country => (
                            <option key={country.id} value={country.currency}>{country.currency}</option>
                        ))}
                    </select>
                </div>

                {filteredCountries.length > 0 ? (
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
                            {filteredCountries.sort((a, b) => a.id - b.id).map(country => (
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
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>No countries to show</div>
                )}
            </div>
        );
    };

    export default Countries;
