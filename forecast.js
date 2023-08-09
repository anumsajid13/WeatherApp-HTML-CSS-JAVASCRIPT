////////////////////////////////////////
//const apiKey="17e5ed6146901394b2f9a17f62dbb772";
const searchButton=document.querySelector(".searchNow button");
//const searchButton2=document.querySelector(".searchNow input").value;
var searchButton2="";
console.log(searchButton2);
var lat;
var long;
var weatherforecastE1=document.getElementById('weatherforecast');
var currentE1=document.getElementById('current');

let otherdayforecast='';

async function showAddress(searchButton2) {


    //Finding the city code using city name through an API 
    const url1 = `https://foreca-weather.p.rapidapi.com/location/search/${searchButton2}?lang=en`;
    const options1 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7a56a3ce58mshe0a9ef9613c7f24p1f98fejsncdd919347700',
            'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url1, options1);
        var result1 = await response.json();
        console.log(result1);
    } catch (error) {
        console.error(error);
    }

    var locationId=result1.locations[0].id;
    console.log(`LocationID: ${locationId}`);

/////////////////////////////////////////////////////////
        todayforecast="";
    
     const url =`https://foreca-weather.p.rapidapi.com/forecast/daily/${locationId}?alt=0&tempunit=C&windunit=MS&periods=8&dataset=full`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7a56a3ce58mshe0a9ef9613c7f24p1f98fejsncdd919347700',
            'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        var result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }

    var forecast7Day = result.forecast;
    otherdayforecast="";
    forecast7Day.forEach((day,index) => {

        var dayOfWeek = day.date;
        var max = day.maxTemp;
        var min = day.minTemp;
        var image=day.symbolPhrase;

        //converting day of week(date) into day name
        var days=["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"];
        const d = new Date(dayOfWeek);
        let day_no = d.getDay();//we got the day in numbered form eg. 0 for Monday
        console.log(`dayNO: ${dayOfWeek}`);
        console.log(`dayNO: ${day_no}`);
        var src="";
        if( /thunder/.test(image))
        {
                src="https://openweathermap.org/img/wn/11d@2x.png";
        }
        else if( /rain/.test(image) || /rai/.test(image))
        {
                src="https://openweathermap.org/img/wn/10d@2x.png";
        }
        else if (/clear/.test(image))
        {
                src="https://openweathermap.org/img/wn/01d@2x.png";
        }
        else if (/showers/.test(image))
        {
                src="https://openweathermap.org/img/wn/09d@2x.png";
        }
        else if (/cloud/.test(image))
        {
                src="https://openweathermap.org/img/wn/02d@2x.png";
        }
     //   var nightForecast = day.night.maxTemp;

     console.log("output");
                    console.log(`Day of week: ${days[day_no]}`);
                    console.log(`Max Temp:" ${max}`);
                    console.log(`Min Temp:" ${min}`);


        if(index==0)
        {

            currentE1.innerHTML=`
            <div class="today" id="current">
            <img src=${src} class="w-icon">
            <div class="others">
            <div class="day">${days[day_no]}</div>
            <div class="temp">Max ${max}</div>
            <div class="temp">Min ${min}</div>
             </div>
            `
        }
        else if(index>0 && index<7)
        {
            otherdayforecast+=`
            <div class="forecast-item">
            <div class="day">${days[day_no]}</div>
            <img src=${src} class="w-icon">
            <div class="temp">Max ${max}</div>
            <div class="temp">Min ${min}</div>
                </div>
            `
        }
  
       
    
            weatherforecastE1.innerHTML=otherdayforecast;
            
           document.querySelector(".Remove").style.display="block";

    
      
    })

}
searchButton.addEventListener("click",()=>{
    var searchButton2=document.querySelector(".searchNow input").value;
    showAddress(searchButton2);
})










