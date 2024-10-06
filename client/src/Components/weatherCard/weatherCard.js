import React from "react";
import moment from "moment";
import './weatherCard.css';

const WeatherCard = ({data, nodate}) => {
    return (
        <div className="card weather-card">
            <div className="card-body">
                <div className='top'>
                    <div>
                        {!nodate && <h5>{moment(data?.dt_txt).format('DD-MM-yyyy')}</h5>}
                        <p className='mb-0'>{data?.name}</p>
                        <p className="weather-description">{data?.weather[0]?.description}</p>
                    </div>
                    <img
                        alt="weather"
                        className="weather-icon"
                        src={`icons/${data?.weather[0]?.icon}.png`}
                    />
                </div>
                <div className='bottom'>
                    <p className="temperature">{Math.round(data?.main?.temp)}°C</p>
                    <div className="details">
                        <div className="parameter-row">
                            <span className="parameter-label">Details</span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label">Feels like</span>
                            <span className="parameter-value">
                            {Math.round(data?.main?.feels_like)}°C
                            </span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label">Wind</span>
                            <span className="parameter-value">{data?.wind?.speed} m/s</span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label">Humidity</span>
                            <span className="parameter-value">{data?.main?.humidity}%</span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label">Pressure</span>
                            <span className="parameter-value">{data?.main?.pressure} hPa</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
