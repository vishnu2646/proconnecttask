import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../../context/AuthContext';
import { TokenContext } from '../../context/TokenContext';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import AirPollution from '../../components/airPollution/AirPollution';
import AirQualites from '../../components/airQualites/AirQualites';
import './dashboard.css';

const Dashboard = () => {

    const navigate = useNavigate();

    const { updateToken } = useContext(TokenContext);

    const { updateUser } = useContext(AuthContext);

    const [weatherData, setWeatherData] = useState();

    const [forecastData, setForecastData] = useState();

    const [filtredForcastData, setFiltredForcastData] = useState([]);

    const getUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/login/success`, { withCredentials: true });
            updateUser(response.data);
            updateToken(response.data.user.token);
        } catch (error) {
            console.log(error);
            navigate("/login");
        }
    };

    const fetchWeather = () => {
        const currentWeatherFetch = fetch(
            `${process.env.REACT_APP_WEATHER_URL}/weather?q=chennai&appid=${process.env.REACT_APP_WEATHER_APP_ID}&units=metric`
        );

        const forecastFetch = fetch(
            `${process.env.REACT_APP_WEATHER_URL}/forecast?q=chennai&appid=${process.env.REACT_APP_WEATHER_APP_ID}&units=metric`
        );

        Promise.all([currentWeatherFetch, forecastFetch]).then(async (response) => {
            const weatherResponse = await response[0].json();
            const forecastResponse = await response[1].json();

            setWeatherData(weatherResponse);
            setForecastData(forecastResponse['list']);
        }).catch(err => {
            console.error(err);
        });
    }

    const handleForecastDetails = () => {
        const today = moment().format('DD-MM-YYYY'); 
        const tomorrow = moment().add(1, 'days').format('DD-MM-YYYY');

        if (forecastData) {
            const data = forecastData.filter(d => {
                const date = moment(d.dt_txt).format('DD-MM-YYYY');
                return date === today || date === tomorrow;
            });
            setFiltredForcastData(data);
        }
    }

    useEffect(() => {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchWeather();

        // Fetch weather data every 5 minutes
        const interval = setInterval(() => {
            fetchWeather();
        }, 5 * 60 * 1000); // 5 minutes in milliseconds

        // Cleanup the internal created.
        return () => clearInterval(interval);
    }, []);

    return (
        <main>
            <article className='container'>
                <div className="content-left">
                    <WeatherCard data={weatherData}/>
                </div>
                <div className="content-right">
                    <div className="d-flex align-items-center flex-wrap card card-lg gap-3 highlights">
                        <div className='d-flex align-items-center flex-wrap gap-5 w-100'>
                            <div>
                                <h3>Today Highlights</h3>
                                <AirPollution />
                            </div>

                            <div className="d-flex align-items-center gap-5 flex-row">
                                <div className="sunrise">
                                    <h3 className="title-2">Sunrise</h3>
                                    <i className="fa-solid fa-sun"></i>
                                    <p>{moment(weatherData?.sys?.sunrise).format('LT')}</p>
                                </div>
                                <div className="sunset">
                                    <h3 className="title-2">Sunset</h3>
                                    <i className="fa-solid fa-moon"></i>
                                    <p>{moment(weatherData?.sys?.sunset).format('LT')}</p>
                                </div>
                            </div>
                        </div>
                        <AirQualites data={weatherData}/>
                    </div>
                </div>
            </article>
            {/* Forecast */}
            <div className='forecast p-3'>
                <div className="forecast-header">
                    <h3 className="title-2" onClick={handleForecastDetails}>Forecast</h3>
                    <span className='detials' onClick={handleForecastDetails}>view <i className="fa-solid fa-chevron-right"></i></span>
                </div>

                <div className="forecastdatas">
                    {
                        filtredForcastData && filtredForcastData?.map((data, index) => (
                            <div className="card card-sm forecast-card" key={index}>
                                <p className='date'>{moment(data?.dt_txt).format('lll')}</p>
                                <img className='m-auto' src={`/icons/${data?.weather[0]?.icon}.png`} alt="icon" width="50px" height="50px" />
                                <p>{data?.main?.temp}°C</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </main>
    )
}

export default Dashboard