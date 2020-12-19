import React, { useState, useEffect } from 'react';
import axios from '../../../phonebook/node_modules/axios';

const Weather = ({city}) => {
    const [weather, setWeather] = useState('');
    const key = process.env.REACT_APP_API_KEY;

    try {
    useEffect(()=>{
        axios.get(`http://api.weatherstack.com/current?access_key=${key}&query=${city}`)
            .then(response=>{
                setWeather(response.data)
            })
    },[])
    }
    catch (err) {
        setWeather("API ERROR")
    }
    console.log(weather)

    if ( ! weather ) {
		return (
			<div></div>
		)
	}

// getting error 105 from weatherstack. free plan does not allow https
    return (
        <div>
            <h2>
                <span>Weather in </span>
                <span>{city}</span>
            </h2>
            <span>
                <strong>Temperature: </strong>
                {weather.current.temperature}
            </span>
            
        </div>
    )
}

export default Weather