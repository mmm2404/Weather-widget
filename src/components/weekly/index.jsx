import React, {useState} from 'react';
import s from './weekly.module.css'

function Weekly({weekData}) {
  const [showResults, setShowResults] = useState(false);

  
    return (
  <>
  <button className={s.btn}  onClick={() => setShowResults(true)}> 5 days forecast </button>
  {showResults ?
        (<div className={s.gridList}>
          {weekData.map((data) => (
              <div key={data.key} className={s.day}>
             
                  <p className={s.info}>{data.days}</p> 
                                
                <img
                  src={`https://openweathermap.org/img/w/${data.icon}.png`}
                  alt={data.icon}
                  className={s.weather__icon}
                />
                <div className={s.info}>
                  {`${Math.floor(data.lTemp)}`}°C  - {`${Math.ceil(data.hTemp)}`}°C
                </div>
                <p>{data.desc}</p>
          
              </div>
          ))}
        </div>) :( null)}
        </>
    );
  }
  
  export default Weekly;
  