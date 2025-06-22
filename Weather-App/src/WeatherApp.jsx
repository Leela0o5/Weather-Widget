import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import "./WeatherApp.css";
import { useState } from "react";
export default function WeatherApp() {
  const [weatherInfo, setweatherInfo] = useState({
    city: "Nellore",
    feels_like: 35.06,
    humidity: 32,
    temp: 34.97,
    tempMax: 34.97,
    tempMin: 34.97,
    weather: "overcast clouds",
  });
  let updateInfo = (newInfo)=>{
       setweatherInfo(newInfo);
  };
  return (
    <div className="weatherApp">
      <h1>Weather App made with ❤️</h1>
      <SearchBox updateInfo={updateInfo}></SearchBox>
      <InfoBox info={weatherInfo}></InfoBox>
    </div>
  );
}
