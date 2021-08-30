const apiId = `29208b73370f059e99cc7bf55d2c2054`;
const search =  document.getElementById('submit');
const input = document.getElementById('input');
const day__dom = document.getElementById('day');
const month__dom = document.getElementById('month');
const weekday__dom = document.getElementById('weekday');
const hour__dom = document.getElementById('hour');
const minute__dom = document.getElementById('minute');
const temp__dom = document.getElementById('temp');
const feelslike__dom = document.getElementById('feels-like')
const pressure__dom = document.getElementById('pressure')
const humidity__dom = document.getElementById('humidity')
const visibility__dom = document.getElementById('visibility')
const cloud__dom = document.getElementById('cloud')
const windspeed__dom = document.getElementById('wind-speed')
const sky__dom = document.getElementById('sky');
const bg = document.getElementById('bg')

const fetching = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiId}&units=metric`;

    fetch(url)
    .then(res => res.json())
    .then(data => getData(data));//fetching the city data to get the lat and lon for onecall api
}

const getData = (fetchData1) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${fetchData1.coord.lat}&lon=${fetchData1.coord.lon}&exclude=minutely,alerts&appid=${apiId}&units=metric`;

    toDate(fetchData1)//display human readable date
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data))
    document.getElementById('name').textContent = `${fetchData1.name}`;
}

const displayData = (fetchData2) =>{
    const temp = `${fetchData2.current.temp}`;
    const feelsLike = `${fetchData2.current.feels_like}`;
    const pressure = `${fetchData2.current.pressure}`
    const humidity = `${fetchData2.current.humidity}`;
    const visibility = `${fetchData2.current.visibility / 1000}`;
    const cloud = `${fetchData2.current.clouds}`;
    const windspeed =  `${fetchData2.current.wind_speed}`
    const main = `${fetchData2.current.weather[0].main}`;
    const icon = `http://openweathermap.org/img/wn/${fetchData2.current.weather[0].icon}@2x.png`;
    sky__dom.src = icon;
    temp__dom.textContent = temp.concat('°');
    feelslike__dom.textContent = feelsLike.concat('°');
    pressure__dom.textContent = pressure;
    humidity__dom.textContent = humidity;
    visibility__dom.textContent = visibility;
    cloud__dom.textContent = cloud;
    windspeed__dom.textContent = windspeed;

    switch(main){
        case 'Clear':
            bg.src = 'img/clear.gif';
        break;
        case 'Clouds':
            bg.src = 'img/clouds.gif';
        break;
        case 'Haze':
            bg.src = 'img/fog.gif';
        break;
        case 'Mist':
            bg.src = 'img/fog.gif';
        break;
        case 'Fog':
            bg.src = 'img/fog.gif';
        break;
        case 'Rain':
            bg.src = 'img/rain.gif';
        break;
        case 'Snow':
            bg.src = 'img/snow.gif';
        break;
        case 'Thunderstorm':
            bg.src = 'img/thunderstorm.gif';
        break;
    }
    // if(main == 'Clear'){
    //     bg.src = 'img/clouds.gif';
    // }
    // else if(main == 'Clouds'){
    //     bg.src = 
    // }
    console.log(main)
}
const toDate = (dateData) => {
    const dt = dateData.dt * 1000;
    const date = new Date(dt);
    const weekDay = date.toLocaleString("en-US", {weekday: "long"})
    const month = date.toLocaleString("en-US", {month: "long"})
    const day = date.toLocaleString("en-US", {day: "numeric"})
    const year = date.toLocaleString("en-US", {year: "numeric"})
    const hour = date.toLocaleString("en-US", {hour: "numeric"})
    const minute = date.toLocaleString("en-US", {minute: "numeric"})
    const arrOfHour =[12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12]
    
    day__dom.textContent = day;
    month__dom.textContent = month;
    weekday__dom.textContent = weekDay;
    hour__dom.textContent = arrOfHour[date.getHours()];
    minute__dom.textContent = minute;
    // console.log(arrOfHour[date.getHours()])//change to display data to the dom
}
search.addEventListener('click', (e) =>{
    e.preventDefault();
    fetching();
})