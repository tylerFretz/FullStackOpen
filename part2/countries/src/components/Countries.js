import React from 'react';
import Country from './Country';

const Countries = ({countries, handleClick}) => {

    const noCountries = countries.length === 0;
    const tooMany = countries.length > 10;
    const multipleCountries = countries.length > 1 && countries.length <= 10;
    const singleCountry = countries.length === 1;

    const countryList = countries.map((country) => {
        return (
            <ul>
                <li key={country.alpha3Code} className="countryList">
                    {country.name}
                    <button onClick={handleClick} id={country.name}>
                        show
                    </button>
                </li>
            </ul>
        )
    })

    return (
        <div>
            {noCountries && "No countries match this filter"}
            {tooMany && "Too many matches, specify another filter"}
            {multipleCountries && <div>{countryList}</div>}
            {singleCountry && <Country country={countries[0]} />}       
        </div>
    );
};

export default Countries;