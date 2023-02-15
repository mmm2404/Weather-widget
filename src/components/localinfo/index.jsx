import React from 'react'
import s from './localinfo.module.css'


function LocalInfo({today: { city, country, date, population}}) {
    return (
        <div className={s.container}>
            <p className={s.line_one}> {city}, {country}</p>
            <p className={s.line_two}> {date}</p>
            <p>Population: {population.toLocaleString()}</p>  
        </div>
    )
}

export default LocalInfo