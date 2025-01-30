import React, { useState, useEffect } from 'react';
import Filter from './component/Filter';
import Countries from './component/Countries';
import Info from './component/Info';
import Weather from './component/Weather';
import countryService from './services/country';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService.getAll()
      .then(initialData => setCountries(initialData))
      .catch(error => console.error('Failed to fetch countries:', error));
  }, []);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const countryName = filteredCountries[0].name.common;
      countryService.getOne(countryName)
        .then(data => {
          setSelectedCountry(data);

          if (data.capital && data.capital.length > 0) {
            countryService.getWeather(data.capital[0])
              .then(weatherData => setWeather(weatherData))
              .catch(error => console.error('Error fetching weather data:', error));
          }
        })
        .catch(error => console.error('Error fetching country details:', error));
    } else {
      setSelectedCountry(null);
      setWeather(null);
    }
  }, [filterQuery, countries]);

  const handleFilterChange = (event) => {
    setFilterQuery(event.target.value);
  };

  const handleShowClick = (countryName) => {
    setFilterQuery(countryName);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div>
      <Filter filterQuery={filterQuery} handleFilterChange={handleFilterChange} />
      <div>
        {selectedCountry ? (
          <>
            <Info country={selectedCountry} />
            <Weather weather={weather} />
          </>
        ) : filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          <Countries countries={filteredCountries} handleShowClick={handleShowClick} />
        )}
      </div>
    </div>
  );
};

export default App;