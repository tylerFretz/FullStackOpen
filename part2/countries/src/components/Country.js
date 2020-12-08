import React, { useState, useEffect } from 'react';

const Country = ( {country} ) => {

    const [weather, setWeather] = useState([]);

    const languagesList = country.languages.map((lang) => {
       return <li key={lang.iso639_2}>{lang.name}</li>;
    })

    const currencyList = country.currencies.map((cur) => {
        return <span key={cur.code}>{cur.name} {cur.symbol}</span>
    })

    const timezonesList = country.timezones.map((tz, idx) => {
        return <span key={idx}>{tz} | </span>;
    })

      const key = process.env.REACT_APP_API_KEY;

  const getWeather = () => {
    axios.get(`http://api.weatherstack.com/current?access_key=${key}&query=Toronto`)
         .then((response) => {
           setWeather(response.data);
    });
  };

  useEffect(getWeather, [])

    return (
        <div>
            <h2>{country.name}</h2>
            <div>
                <img height="100px" width="200px" src={country.flag} alt="national flag"></img>
            </div>
            <div>
                <span>
                    <strong>Capital: </strong>
                    {country.capital}
                </span>
                <br/>
                <span>
                    <strong>Population: </strong>
                    {country.population}
                </span>
                <br/>
                <span>
                    <strong>Region: </strong>
                    {country.subregion}
                </span>
                <br />
                <span>
                    <strong>Currencies used: </strong>
                    {currencyList}
                </span>
                <br/>
                <span>
                    <strong>Timezones: </strong>
                    {timezonesList}
                </span>
                <br/>
            </div>
            <div>
                <h3>Languages: </h3>
                <ul>{languagesList}</ul>
            </div>
            <div>
                <h3>Currencies used: </h3>
                <ul>{currencyList}</ul>
            </div>
        </div>
    );
};

export default Country;