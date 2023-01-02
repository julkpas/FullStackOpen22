import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      <form>
        <table>
          <tbody>
            <tr>
              <td>find countries </td><td><input value={props.MyFilter} onChange={props.onFilterChange} /></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}
const Country = (props) => {
  //console.log('Country',props.name)
  return (
    <div key={props.name}>
      {props.name} {<button onClick={() => props.setNewFilter(props.name.toLowerCase())}>{props.text}</button>}
    </div>
  )
}
const WeatherLines = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <tr><td>{props.text}</td><td>{props.temperature}{props.wind}</td><td>{props.ms}{props.cel}</td></tr>
        </tbody>
      </table>
    </div>
  )
}
const Weather = (props) => {
 console.log('Weather-component: ',props)
  return (
    <div key={props.city}>
      <h2>Weather in {props.city}</h2>
      <WeatherLines text={'temperature'}  temperature={props.temp} cel={'Celcius'}/>
      <img src={'http://openweathermap.org/img/wn/'+ props.icon+'@2x.png'} alt='Sää-kuvake'></img>
      <WeatherLines text={'wind'} wind={props.wind} ms={'m/s'} />  
    </div>
  )
}
const CountryStatistics = (props) => {
  return (
    <div>
      <table>
        <tbody>
            <tr>
             <td style={{width: 40}}>{props.text}</td><td style={{width: 50}}>{props.cap}{props.area}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
 }
 const Languages = (props) => {
//console.log('Language: ',props)
  return (
    <div>
      <li>{props.name}</li>
    </div>
  )
 }
const Countries = (props) => {
  const arrayLenght = props.countriesDb.filter(data => data.name.common.toLowerCase().match(props.MyFilter)).length

  if (props.MyFilter === '') {
    return null
  }
  else if (arrayLenght > 10) {
    return <div>Too many matches, spesify another filter</div>
  }
  else if(arrayLenght === 1){
    return (
      <div>
          {props.countriesDb.filter(data => data.name.common.toLowerCase().match(props.MyFilter))
          .map(data => 
            <div key={data.id+100}>
              <h2>{data.name.common}</h2>
              <CountryStatistics key={data.capital} text='capital' cap={data.capital} />
              <CountryStatistics key={data.area} text='area' area={data.area} />
              <h3>{'languages:'}</h3>
              <div>
                {Object.values(data.languages).map(language => ( <Languages key={language} name={language} />))}
              </div>
              <div key={data.id}>
                <img style={{padding: 5}} src={data.flags.png} alt={'Flag'}></img>
                {GetWeather(data.capital)}
              </div>
            </div>)}
      </div>
    )
  }
  return (
    <div>
      {props.countriesDb.filter(data => data.name.common.toLowerCase().match(props.MyFilter))
      .map(data => <Country name={data.name.common} text={'show'} setNewFilter={props.setNewFilter}/>)}
    </div>
  )
}
const GetWeather = (capital) => {
  const [weather, setWeather] = useState(null)
  //const [counter, setCounter] = useState(0) 
  //console.log('GetWeather: ', capital)
  
  const api_key = '&APPID=' + process.env.REACT_APP_NOT_SECRET_CODE
  const units = '&units=metric'
  console.log('SearchString: ', capital+api_key+units)
 //'http://api.openweathermap.org/data/2.5/weather?q='

  const getData = () => {
    axios.get('http://api.openweathermap.org/data/2.5/weather?q='+capital+api_key+units)
         .then(response => {
                  console.log('Weather promise fulfilled',response.data)
                  setWeather(response.data)
          })
          .catch(error => {
                  console.log('No data, error: ',error)
          })
          //setCounter(counter + 1)
          //console.log('Counter: ',counter)
  }
// eslint-disable-next-line
  useEffect(getData,[])

  if(weather === null)
    return null

  //console.log('render', weather.length, 'weather')

  return (
    <div>
      <Weather city={capital} wind={weather.wind.speed} temp={weather.main.temp} icon={weather.weather[0].icon}/>
    </div>
  )
}
function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('useEffect')
    axios
      .get('http://localhost:3001/countries')
      .then(response => {
        console.log('Countries promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')  

  const HandleFilterChange = (event) => {
    //console.log('handleFilterChange', event.target.value)
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <Filter MyFilter={newFilter} onFilterChange={HandleFilterChange} />
      <Countries countriesDb={countries} MyFilter={newFilter} setNewFilter={setNewFilter} getWeather={GetWeather} />
    </div>
  )
}

export default App
