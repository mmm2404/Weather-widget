import React from 'react'
import pressure from '../../assets/pressure.svg'
import wind_speed from '../../assets/wind_speed.svg'
import humidity from '../../assets/humidity.svg'
import sunrise from '../../assets/sunrise.svg'
import sunset from '../../assets/sunset.svg'
import s from './today.module.css'



function Today({today}) {

    return (
        <div className={s.card_container}>
            <div className={s.text__left}>
                    <img src={`https://openweathermap.org/img/w/${today.icon}.png`} alt={today.icon} className={s.weather__icon}/>
                        <p className={s.temperature}>{`${Math.ceil(today.temp)}`}°C</p> 
                        <p className={s.description}>Feels like {today.feels}, {today.desc}</p>        
                    <img src={pressure} alt="Logo" className={s.unit__icon1}/><span className={s.span}>{today.pressure} hPa</span>
                    <img src={humidity} alt="Logo" className={s.unit__icon}/><span className={s.span}>{today.humidity} %</span>
                    <img src={wind_speed} alt="Logo" className={s.unit__icon}/><span className={s.span}>{today.wind} m/s N</span>
            </div>
            <div className={s.text__right}> 
                    <p className={s.sunrise}><img src={sunrise} alt="Logo" className={s.unit__icon}/> {today.sunrise} A.M.</p>
                    <p><img src={sunset} alt="Logo" className={s.unit__icon}/> {today.sunset} P.M.</p>    
            </div>
        </div>    
    )
}

export default Today
