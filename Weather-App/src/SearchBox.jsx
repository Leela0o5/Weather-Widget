import TextField from "@mui/material/TextField";
import "./searchBox.css";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
  const API_KEY = import.meta.env.VITE_API_KEY;
  let getWeatherInfo = async () => {
    try {
      let res = await fetch(
        `${API_URL}q=${city}&appid=${API_KEY}&units=metric`
      );
      let JSONres = await res.json();
      console.log(JSONres);
      let result = {
        city: city,
        temp: JSONres.main.temp,
        tempMin: JSONres.main.temp_min,
        tempMax: JSONres.main.temp_max,
        humidity: JSONres.main.humidity,
        feels_like: JSONres.main.feels_like,
        weather: JSONres.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      setError(true);
      throw err;
    }
  };

  let handleChange = (event) => {
    setCity(event.target.value);
     if (error) setError(false);
  };
  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(city);
      setCity("");
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
    } catch (err) {
      setError(true);
      throw err;
    }
  };

  return (
    <div className="searchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <div className="subBtn">
          <Button variant="contained" type="submit">
            Search
          </Button>
        </div>
        {error ? <p style={{ color: "red" }}>No such place Exists!</p> : null}
      </form>
    </div>
  );
}
