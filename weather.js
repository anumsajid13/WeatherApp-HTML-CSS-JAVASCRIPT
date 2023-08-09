const apiKey="a4cf6f86d0b69fa7b1e28996a03e2291";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const search=document.querySelector(".search input");
const searchButton=document.querySelector(".search button");
const WeatherIcon=document.querySelector(".WeatherIcon");

async function checkweather(city)
{
    const response=await fetch(apiUrl +city+ `&appid=${apiKey}`);
    if(response.status==404)//if wrong name entered
    {
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    else{
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
    document.querySelector(".wind").innerHTML=data.wind.speed + "km/hr";

    if(data.weather[0].main=="Clouds")
    {
        WeatherIcon.src="clouds.png";
    }
    else if(data.weather[0].main=="Clear")
    {
        WeatherIcon.src="clear.png";
    }
    else if(data.weather[0].main=="Rain")
    {
        WeatherIcon.src="rain.png";
    }
    else if(data.weather[0].main=="Drizzle")
    {
        WeatherIcon.src="drizzle.png";
    }
    else if(data.weather[0].main=="Mist")
    {
        WeatherIcon.src="mist.png";
    }
    document.querySelector(".weather").style.display="block";
    document.querySelector(".error").style.display="none";

    }

   

}

searchButton.addEventListener("click",()=>{

    checkweather(search.value);
})

