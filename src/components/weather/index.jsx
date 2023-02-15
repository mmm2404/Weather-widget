import React from 'react';
import s from "./weather.module.css";
import LocalInfo from '../localinfo';
import Today from '../today';
import Weekly from '../weekly';


export default function Weather ({today, weekly}){

    return(
        <>
        <div className={s.container_daily}>
            <div className={s.local_info}>
            <LocalInfo today={today}/>
            </div>
            <div className={s.today_weather}>
            <Today today={today}/>
            </div>
        </div>

           <div className={s.weekly}>
           <Weekly weekData={ weekly } />
           </div>
        </>      
      
    )
}