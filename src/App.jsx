import './App.css';
import { kelvinToFahrenheit, kelvinToCelcius } from "./convertTemps.js";
import React, { useState } from 'react';

function App() {

  //current temp values
 const [temp,setTemp] = useState([0]);
 const [feelsLike, setFeelsLike] = useState([0]);
 const [tempMin, setTempMin] = useState([0]);
 const [tempMax, setTempMax] = useState([0]);

 //fahrenheit temp values
 const [tempF,setTempF] = useState([0]);
 const [feelsLikeF, setFeelsLikeF] = useState([0]);
 const [tempMinF, setTempMinF] = useState([0]);
 const [tempMaxF, setTempMaxF] = useState([0]);

 //celcius temp values
 const [tempC,setTempC] = useState([0]);
 const [feelsLikeC, setFeelsLikeC] = useState([0]);
 const [tempMinC, setTempMinC] = useState([0]);
 const [tempMaxC, setTempMaxC] = useState([0]);

 //other weather states
 const [windSpeed, setWindSpeed] = useState([0]);
 const [cloudiness, setCloudiness] = useState([0]);
 const [cloudState, setCloudState] = useState([""]);

 //query states
 const [city, setCity] = useState([""]);
 const [stateOrCountry, setStateOrCountry] = useState([""]);

 function howCloudy(cloudiness){
  if (cloudiness > 75){
    setCloudState("Very Cloudy ☁");
  } else if (cloudiness > 50){
    setCloudState("Cloudy ☁");
  }else if (cloudiness > 25){
    setCloudState("Slightly Cloudy 🌤");
  } else {
    setCloudState("Clear skies ☀");
  }
 }

async function getWeather(city, country){
  const weatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country},1&appid=43798259c6b658443a0cd71b973accaa`);
  const weatherJson = await weatherPromise.json();
  setTemp(kelvinToFahrenheit(weatherJson.main.temp));
  setFeelsLike(kelvinToFahrenheit(weatherJson.main.feels_like));
  setTempMin(kelvinToFahrenheit(weatherJson.main.temp_min));
  setTempMax(kelvinToFahrenheit(weatherJson.main.temp_max));
  setTempF(kelvinToFahrenheit(weatherJson.main.temp));
  setFeelsLikeF(kelvinToFahrenheit(weatherJson.main.feels_like));
  setTempMinF(kelvinToFahrenheit(weatherJson.main.temp_min));
  setTempMaxF(kelvinToFahrenheit(weatherJson.main.temp_max));
  setTempC(kelvinToCelcius(weatherJson.main.temp));
  setFeelsLikeC(kelvinToCelcius(weatherJson.main.feels_like));
  setTempMinC(kelvinToCelcius(weatherJson.main.temp_min));
  setTempMaxC(kelvinToCelcius(weatherJson.main.temp_max));
  setWindSpeed(weatherJson.wind.speed);
  setCloudiness(weatherJson.clouds.all);
  howCloudy(cloudiness);
}

function fahrenheitToCelcius(){
  setTemp(tempC);
  setFeelsLike(feelsLikeC);
  setTempMin(tempMinC);
  setTempMax(tempMaxC);
 }

function celciusToFahrenheit(){
  setTemp(tempF);
  setFeelsLike(feelsLikeF);
  setTempMin(tempMinF);
  setTempMax(tempMaxF);
}

function onSubmit(event){
  event.preventDefault();
}
/* useEffect(() => {
getWeather();
}, []); */


  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
      <form className="form-group" onSubmit={onSubmit}>
          <label htmlFor="city">City</label>
          <input type="text" name="city" id="city" onChange={(event) => {
            setCity(event.target.value);
            console.log(city);
          }} />
          <label htmlFor="">State (US Only) or Country</label>
          <input type="text" name="state-country" id="state-country" onChange={(event) => {
            setStateOrCountry(event.target.value);
          }} />
          <button className="prettify-button" onClick={() => {getWeather(city,stateOrCountry);}}>🔍</button>
        </form><br /> <br />
          <div>
      <span>Temperature: {Number(temp).toFixed(2)}°</span><br />
      <button className="round-dots" onClick={celciusToFahrenheit}>°F</button> | <button className="round-dots" onClick={fahrenheitToCelcius}>°C</button>
      </div>
      <div className="align-left">
        <span>{cloudState}</span><br />
        <span>Feels Like: {Number(feelsLike).toFixed(2)}°</span><br />
        <span>Low: {Number(tempMin).toFixed(2)}°</span><br />
        <span>High: {Number(tempMax).toFixed(2)}°</span><br />
        <span>Wind Speed: {windSpeed}mph</span><br />
      </div>
      </div>
      </header>
    
    </div>
  );
}

export default App;
