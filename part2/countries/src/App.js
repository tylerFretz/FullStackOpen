import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Countries from './components/Countries';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [hasFilter, setHasFilter] = useState(false);
  const [weather, setWeather] = useState([]);

  const fetchCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(fetchCountries, [])

  const key = process.env.REACT_APP_API_KEY;

  console.log(key);

  const getWeather = () => {
    axios.get(`http://api.weatherstack.com/current?access_key=${key}&query=Toronto`)
         .then((response) => {
           setWeather(response.data)
         })
  };

  useEffect(getWeather, [])


  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(countryFilter.toLowerCase());
  });

  const hasExactMatch = filteredCountries.some((country) => {
    return country.name.toLowerCase() === countryFilter.toLowerCase();
  });

  let exactFilteredCountries;
  if (hasExactMatch) {
    exactFilteredCountries = filteredCountries.filter((country) => {
      return country.name.toLowerCase() === countryFilter.toLowerCase();
    });
  }

  const handleCountryFilter = event => {
    setCountryFilter(event.target.value)

    if (event.target.value === "") setHasFilter(false);
    else setHasFilter(true);
  }

  const handleClick = event => {
    setCountryFilter(event.target.id)
  }

 
  return (
    <>
    <h1>Country Look-Up Tool</h1>
      <Filter value={countryFilter} onChange={handleCountryFilter}/>
      {hasFilter && hasExactMatch && (
        <Countries countries={exactFilteredCountries} />
      )}
      {hasFilter && !hasExactMatch && (
        <Countries countries={filteredCountries} handleClick={handleClick}/>
      )}
    </>
  )
}

export default App