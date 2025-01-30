const Weather = ({ weather }) => {
    if (!weather) return null;

    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    return (
        <div>
            <h3>Weather in {weather.name}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            <img src={iconUrl} alt={weather.weather[0].description} />
            <p>Wind: {weather.wind.speed} m/s</p>
        </div>
    );
};

export default Weather;