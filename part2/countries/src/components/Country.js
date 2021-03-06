import React from 'react';
import Weather from './Weather';

const Country = ( {country} ) => {

    const languagesList = country.languages.map((lang) => {
       return <li key={lang.iso639_2}>{lang.name}</li>;
    })

    const currencyList = country.currencies.map((cur) => {
        return <span key={cur.code}>{cur.name} {cur.symbol}</span>
    })

    const timezonesList = country.timezones.map((tz, idx) => {
        return <span key={idx}>{tz} | </span>;
    })

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
            <Weather city={country.capital} />
        </div>
    );
};

export default Country;