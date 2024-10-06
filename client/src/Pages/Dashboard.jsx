import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/AuthContext';
import { TokenContext } from '../context/TokenContext';
import WeatherCard from '../components/WeatherCard/WeatherCard';

const Dashboard = () => {

    const navigate = useNavigate();

    const { updateToken } = useContext(TokenContext);

    const { currentUser, updateUser } = useContext(AuthContext);

    const isCurrentUserValid = currentUser && Object.keys(currentUser).length > 0;

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
        <div className='container'>
            <div className='d-flex align-items-center mt-3 gap-3'>
                <span>Welcome, </span>{isCurrentUserValid && <h3>{currentUser.user?.displayName}</h3>}
                <button className='btn btn-outline-info' onClick={handleForecastDetails}>Forecast Data</button>
            </div>
            {
                weatherData && Object.keys(weatherData).length > 0 && (
                    <div className='tiles d-flex align-items-center'>
                        <WeatherCard data={weatherData} nodate />
                    </div>
                )
            }
            <div className='d-flex align-items-center gap-3 w-100 overflow-auto'>
                {
                    filtredForcastData && filtredForcastData?.map((data, index) => (
                        <div key={index}>
                            <WeatherCard data={data} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Dashboard