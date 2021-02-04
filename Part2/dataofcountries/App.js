import axios from 'axios'
import React, { useState, useEffect } from 'react'

/*const Filter = ({result, country}) => {
  const filterbyName = (country) => (
    country.name.toLowerCase().includes(
      filter.toLowerCase()
    )
  )
  return (
    <ul> {results.filter(filterbyName).map(country => <CountryDetails key={country.name} country={country}/>)}
    </ul> 
  )

}*/
const api_key = process.env.REACT_APP_API_KEY

const CountryDetails = ({country}) => {
  return (
    <>
    <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}> {language.name} </li>)}
      </ul>
      <img src={country.flag} width="300" alt=""/>
      <Weather capital={country.capital} />
      </>
  )
}

const ListofCountries = ({result,handleClick}) => {
  if(result.length === 1) {
    console.log("found 1 country")
    return (
      <CountryDetails country={result[0]} />
    )
  }
  if (1 < result.length && result.length < 10) { 
    console.log("A few results found")
    return (
      result.map((country) => 
      <ul key={country.name}>
        {country.name} <button onClick={() => handleClick(country)}>show </button>
      </ul>)
    )
  }return (
    <p>Too many matches, specify another filter</p>
  )
  
}

const Weather = ({capital}) => {
  const [weather, setWeather] = useState(undefined)
  const params = {
    access_key: api_key,
    query: {capital}
  }
  console.log("MOI",params)

  useEffect(() => {
    console.log('fetching weather report')
    axios
      .get('https://api.weatherstack.com/current', {params})
      .then(response => {
        console.log(responce.data)
        setWeather(response.data)
    }).catch(err => console.log(err))
  }, [])

  /*if(weather) {
    return (
      <>
      <h1> Weather in {capital}</h1>
      <p><b>Temperature: </b>{weather.main.temp} Celsius</p>
      <p><b>Wind: </b>{weather.wind.speed} <b>Direction: </b>{weather.wind.deg} degrees</p>
      </>
    )
  }
  */
  return(
    <>
    </>
  )

}

const App = ()=> {
  const [filter, setFilter] = useState('')
  const [result, setResult] = useState([])

  const handleFilter = (event) => setFilter(event.target.value) 
  const handleClick = (country) => {
    setFilter(country.name)
  }

  const filterCountrybyName = (country) => (
    country.name.toLowerCase().includes(filter.toLowerCase())
  )
  

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(responce => {
        console.log('promise fulfilled')
        setResult(responce.data)
      })
  },[])

  return (
    <div>
      <h1>Search for a country</h1> 
      <div>
          Find country: <input value={filter} onChange={handleFilter}/>
          {console.log(filter)}
      </div>
      <div>
          <ListofCountries result={result.filter(filterCountrybyName)} handleClick={handleClick}/>
      </div>

    </div>
  )
}

export default App;
