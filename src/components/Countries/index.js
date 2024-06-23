import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const baseUrl = 'http://127.0.0.1:3000/api/v1/countries/'

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(`${baseUrl}`);
                
                if (response.data) {
                    setCountries(response.data)
                } else {
                    console.log("An error occured while getting countries list")
                }
            } catch (error) {
                console.log(error.message)
            }
        })();
    }, [])

    const handleDelete = async (id) => {
        try {
            let response = await axios.delete(`${baseUrl}/${id}`)

            if (response.status == 200) {
                alert("Delete successful")
                window.location.reload();
            }
        } catch(error) {
            console.error(error.message)
        }
    }

    return (
        <div>
            <h2>Countries Table</h2>
            {
                countries ? 
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Country Name</th>
                            <th scope="col">Currency</th>
                            <th scope="col">Alpha 2 code</th>
                            <th scope="col">Alpha 3 code</th>
                            <td scope="col">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                countries.sort((a, b) => a.id - b.id).map((country) => {
                                    return (
                                        <tr key={country.id}>
                                            <td>{ country.id }</td>
                                            <td>{ country.name }</td>
                                            <td>{ country.currency }</td>
                                            <td>{ country.alpha_2_code }</td>
                                            <td>{ country.alpha_3_code }</td>
                                            <td>
                                                <button
                                                    onClick={() => handleDelete(country.id)}
                                                    className="btn btn-danger btn-sm"
                                                >Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table> 
                : <div>No countries to show</div>
            }
            
        </div>
    )
}

export default Countries;
