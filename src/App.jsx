
import React,{useCallback, useEffect, useState} from 'react'
import './App.css';
import Search from './components/search';
import Weather from './components/weather';
import axios from 'axios'
import Loader from './components/loader';




const api = {
  key:'d97552081833fcdfe7a17f3c7b64c93d',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [state, setState] = useState({
    value: '',
    lon:[],
    lat:[],
    current: {},
    weekInfo: [],
    loading: false,
    error: false,
  })
  
  const handleInputChange = e => {
    setState({
      ...state,
      value: e.target.value,
    })
  };

  const [lat, setLat] = useState([]);
  const [lon, setLong] = useState([]); 
  const [mount, setMount] = useState(false)   


  const handleLocation = useCallback(() =>{
    if(navigator.geolocation)       
   navigator.geolocation.getCurrentPosition(
     function success(position) {
       setLat(position.coords.latitude);
       setLong(position.coords.longitude);  
             axios.get(`${api.base}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`)
             .then(response => {
          
              handleResponse(response);
             })                
             
     },
   
     function error (error){
             if(error.PERMISSION_DENIED)
             {
             alert("Please enter the city tou need in the search box");
             }
     }      
    // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    )},[lon, lat])

  useEffect(()=>{
    if(!mount) {
      setMount(true);
    handleLocation();
    } 
  },[handleLocation, mount])
  
    



  const handleSearchCity = e => {
    e.preventDefault();
    setState({
      ...state,
      loading: true,
   
    })

    axios.get(`${api.base}forecast?q=${state.value}&units=metric&appid=${api.key}`)
    
    .then(response => {
          
      handleResponse(response);
    })
    .catch(error => {
      console.log(error);

      setState({
        ...state,
        loading: false,
        error: true,
        current: {},
        weekInfo: [],
        
      })
    })
  }

      
const handleResponse = useCallback((response) =>{ 
    
      const data = response.data
      
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const currentDate = new Date()
      const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
        months[currentDate.getMonth()]
      }`;

      const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString().slice(0, 5)
      const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString().slice(0, 5)

      const current = {
        city: data.city.name,
        country: data.city.country,
        date,
        population: data.city.population,
        desc: data.list[0].weather[0].description,
        feels: data.list[0].main.feels_like,
        icon: data.list[0].weather[0].icon,
        temp: data.list[0].main.temp,
        hTemp: data.list[0].main.temp_max,
        lTemp: data.list[0].main.temp_min,
        sunrise,
        sunset,
        clouds: data.list[0].clouds,
        humidity: data.list[0].main.humidity,
        wind: data.list[0].wind.speed,
        pressure: data.list[0].main.pressure,
      }

      const weekData = data.list.filter(day => {
        return day.dt_txt.endsWith("15:00:00")
      })
      const weekInfo = weekData.map((data, index) => {
        return{
          key:index,
          main: data.weather[0].main,
          days: new Date(data.dt * 1000).toLocaleString("en", { weekday: 'long',day: 'numeric',month:'long' }),
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
          hTemp: data.main.temp_max,
          lTemp: data.main.temp_min,
        }})

      setState({
        ...state,
        current,
        weekInfo,
        loading: false,
        error: false,
        value:'',
      })
      
    },[state])

  
  return (


    <div className="App">
      <div className='navigation'>
      <Search 
        value={state.value}
        data = {state}
        showResult={(state.weatherInfo || state.error) && true}
        change={handleInputChange}
        submit={handleSearchCity} 
      />
      <img onClick={handleLocation} src="https://img.icons8.com/color/48/000000/gps-device.png" alt="geolocation sign" title="press to find out weather in your location" />
     </div>
     {
        state.loading === true ? 
        <Loader /> :
      <div>  
        {state.current.country !== undefined ? 
        <div className="weather">
          <Weather today={state.current} weekly={state.weekInfo} />
        </div> : 
        state.error ? 
        <p className="error__loc">Sorry! we do not have any information on specified location.</p> :
        <div>

        </div>
        }
      </div>
      }

    </div>
  );
}

export default App;

