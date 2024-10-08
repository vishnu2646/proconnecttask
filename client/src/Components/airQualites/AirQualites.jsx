import React from "react";
import './qualites.css';

const AirQualites = ({data}) => {
    return (
        <div className="qualualites mt-4 d-flex align-items-center gap-3 flex-wrap">
            <div className="card card-sm">
                <p className='type'>Humidity</p>
                <div className='d-flex align-items-center gap-5 justify-content-between'>
                    <img src={`icons/${data?.weather[0]?.icon}.png`} width="40px" height="40px" alt="icons" />
                    <p className='value'>{data?.main?.humidity}%</p>
                </div>
            </div>
            <div className="card card-sm">
                <p className='type'>Pressure</p>
                <div className='d-flex align-items-center gap-5 justify-content-between'>
                    <img src={`icons/${data?.weather[0]?.icon}.png`} width="40px" height="40px" alt="icons" />
                    <p className='value'>{data?.main?.pressure}hPa</p>
                </div>
            </div>
            <div className="card card-sm">
                <p className='type'>Wind</p>
                <div className='d-flex align-items-center gap-5 justify-content-between'>
                    <img src={`icons/${data?.weather[0]?.icon}.png`} width="40px" height="40px" alt="icons" />
                    <p className='value'>{data?.wind?.speed}m/s</p>
                </div>
            </div>
            <div className="card card-sm">
                <p className='type'>Feels Like</p>
                <div className='d-flex align-items-center gap-5 justify-content-between'>
                    <img src={`icons/${data?.weather[0]?.icon}.png`} width="40px" height="40px" alt="icons" />
                    <p className='value'>{data?.main?.feels_like}°C</p>
                </div>
            </div>
        </div>
    );
};

export default AirQualites;
