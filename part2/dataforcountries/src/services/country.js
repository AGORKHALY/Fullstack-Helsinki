import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`);
    return request.then(response => response.data);
};

const getOne = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`);
    return request.then(response => response.data);
};

const getWeather = (city) => {
    const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const request = axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`
    );
    return request.then(response => response.data);
};

export default { getAll, getOne, getWeather };