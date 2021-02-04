import axios from 'axios'
import React, { useState, useEffect } from 'react'

const api_key = process.env.REACT_APP_API_KEY;
console.log("Moi",api_key,"Moi")
//const api_key = 'eecaf23dfba8a80fd02ec06032662c45'
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
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
    }).catch(err => console.log(err))
  }, [])

  if(weather !== undefined) {
    {console.log(weather)}
    return (
      <>
      <h1> Weather in {capital}</h1>
      <p><b>Temperature: </b>{weather.current.temperature} Celsius</p>
      <img src={weather.current.weather_icons[0]}></img>
      <p><b>Wind: </b>{weather.current.wind_speed} <b>Direction: </b>{weather.current.wind_degree} degrees</p>
      </>
    )
  }

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
      }).catch((error) => console.log(error)) 
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
