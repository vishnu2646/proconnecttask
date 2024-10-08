import React from "react";
import moment from "moment";
import './weatherCard.css';

const WeatherCard = ({data, nodate}) => {
    return (
        <>
            <section className='section current-weather'>
                <div className="card card-lg current-weather-card">
                    <h2 className="title-2 card-title">Now</h2>

                    <div className="weapper">
                        <p className='heading'>{Math.round(data?.main?.temp)}°C</p>
                        <img src={`/icons/${data?.weather[0]?.icon}.png`} alt="weathericon" width="100" height="100" className='weather-icon' />
                    </div>

                    <p className="body-3">{data?.weather[0]?.description}</p>

                    <ul className="meta-list">
                        <li className="meta-item">
                            <i className="fa-solid fa-calendar-days"></i>

                            <p className='title-3 meta-text'>{moment(data?.dt_txt).format('LL')}</p>
                        </li>

                        <li className="meta-item">
                            <i className="fa-solid fa-location"></i>

                            <p className='title-3 meta-text'>{data?.name}</p>
                        </li>
                    </ul>
                </div>
            </section>
            <section className='section forecast'>
                <h2 className="title-2"> 5 Days Forecast</h2>
                
                <div className="card card-lg forecast-card">
                    <ul>
                        <li className='card-item'>
                            <div className="icon-wrapper">
                                <img src="/icons/01n.png" width="26" height="26px" className='weather-icon' alt="weather-icon" />

                                <span className="sapn">
                                    <p className="title-2">25</p>
                                </span>
                            </div>

                            <p className="label-1">17 Feb</p>

                            <p className='label-1'>Friday</p>
                        </li>

                        <li className='card-item'>
                            <div className="icon-wrapper">
                                <img src="/icons/01n.png" width="26" height="26px" className='weather-icon' alt="weather-icon" />

                                <span className="sapn">
                                    <p className="title-2">25</p>
                                </span>
                            </div>

                            <p className="label-1">17 Feb</p>

                            <p className='label-1'>Friday</p>
                        </li>

                        <li className='card-item'>
                            <div className="icon-wrapper">
                                <img src="/icons/01n.png" width="26" height="26px" className='weather-icon' alt="weather-icon" />

                                <span className="sapn">
                                    <p className="title-2">25</p>
                                </span>
                            </div>

                            <p className="label-1">17 Feb</p>

                            <p className='label-1'>Friday</p>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default WeatherCard;
