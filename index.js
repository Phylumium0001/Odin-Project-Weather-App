//Set up a blank HTML document with the appropriate links to your JavaScript and CSS files.

// Write the functions that hit the API. You’re going to want functions that can take a location and return the weather data for that location. For now, just console.log() the information.

// Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.


// Set up a form that will let users input their location and will fetch the weather info (still just console.log() it).
// Display the information on your webpage!
// Add any styling you like!
// Optional: add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API. Use DevTools to test for low-end devices.
// Push that baby to github and share your solution below!
function processWeatherData(data) {
    const weatherData = {
        location: data.location.name,
        temperature_c: data.current.temp_c,
        temperature_f: data.current.temp_f,
        humidity: data.current.humidity,
        precipitation:data.current.precip_mm,
        windSpeed: data.current.wind_kph,
        description: data.current.condition.text,
        icon : data.current.condition.icon
        };
        console.log(weatherData);
        return weatherData
    }
function handleError(err){
    console.log(err)
    if (err.code === 1006){
        alert("Hi")
    }}
function getWeatherData(location) {
    const url = `http://api.weatherapi.com/v1/current.json?key=24731f20665148ee977113548242406&q=${location}&aqi=no`;
    fetch(url)
    
    .then((response) => response.json())
    .then((data)=>{
        console.log(data);
        let obj = processWeatherData(data)
        updateDOMInfo(obj)});
        }
    
    
// Display on the DOM
function createElement(element,className=""){
    if (className !== ""){
        return document.createElement(element).classList.add(className);
    }else{
        return document.createElement(element);
    }
}

function updateDOMInfo(obj) {
    const results = document.querySelector(".results")
    // Location
    const location = document.querySelector(".city-name")
    location.textContent = obj.location
    
    // Temperature
    const temperature = document.querySelector(".temperature")
    temperature.textContent = `${obj.temperature_c}°C`
    // add a new data class

    temperature.dataset.isCelcius = "true"
    temperature.dataset.farhenheit = obj.temperature_f
    temperature.dataset.celcius = obj.temperature_c
    
    // Humidity
    const humidity = document.querySelector(".humidity")
    humidity.textContent = `${obj.humidity} %`

    // Wind Speed
    const windSpeed = document.querySelector(".wind_speed")
    windSpeed.textContent = `${obj.windSpeed} km/h`

    // Description
    const desc = document.querySelector(".desc")
    desc.textContent = `${obj.description} km/h`

    //Precipitaion
    const precipitation = document.querySelector(".precipitation")
    precipitation.textContent = `${obj.precipitation} mm`

    const icon = document.querySelector(".weatherIcon img")
    icon.setAttribute("src",obj.icon)
    }

const submitButton = document.getElementById("submit")
submitButton.addEventListener("click", (e) => {
    e.preventDefault()
    const cityInput = document.getElementById("city")
    const city = cityInput.value;
    getWeatherData(city);
    })

const changeScale = document.querySelector(".changeScale")
changeScale.addEventListener("click",()=>{
    const temperature = document.querySelector(".temperature")
    if(temperature.dataset.isCelcius === "true"){
        temperature.textContent = `${temperature.dataset.farhenheit}°F`
        temperature.dataset.isCelcius = "false"
        }else{
            temperature.textContent = `${temperature.dataset.celcius}°C`
            temperature.dataset.isCelcius = "true"
            }
})