import React, { useState, useEffect } from "react";
import "./airPollution.css";
import axios from "axios";

const AirPollution = () => {
    const [ariPollutionData, setAirPollutionData] = useState();

    const fetchAirPollution = async () => {
        try {
            const responseData = await axios.get(`${process.env.REACT_APP_WEATHER_URL}/air_pollution?lat=${process.env.REACT_APP_LATTITUDE}&lon=${process.env.REACT_APP_LONGITUDE}&appid=042ff49120b973c527a36199028dc5b5&units=metric`);
            setAirPollutionData(responseData.data['list'][0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAirPollution();

        // Fetch weather data every 5 minutes
        const interval = setInterval(() => {
            fetchAirPollution();
        }, 5 * 60 * 1000); // 5 minutes in milliseconds

        // Cleanup the internal created.
        return () => clearInterval(interval);
    }, []);
    

    return (
        <div className="quality-card">
            <div className="card-header">
                <p className='title-3'>Air Quality Index</p>
            </div>
            <ul className="card-list d-flex align-items-center flex-wrap gap-4">
                <li className="card-list-item">
                    <p>PM2</p>
                    <h1>{ariPollutionData?.components?.pm2_5}</h1>
                </li>
                <li className="card-list-item">
                    <p>Co2</p>
                    <h1>{ariPollutionData?.components?.co}</h1>
                </li>
                <li className="card-list-item">
                    <p>NH3</p>
                    <h1>{ariPollutionData?.components?.nh3}</h1>
                </li>
                <li className="card-list-item">
                    <p>So2</p>
                    <h1>{ariPollutionData?.components?.so2}</h1>
                </li>
            </ul>
        </div>
    );
};

export default AirPollution;
