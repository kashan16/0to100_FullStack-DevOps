document.getElementById('getWeatherBtn').addEventListener('click' , async() => {
    const city = document.getElementById('cityInput').value;
    const weatherInfoDiv = document.getElementById('weatherInfo');
    const ErrorInfoDiv = document.getElementById('errorInfo');

    weatherInfoDiv.innerHTML = '';
    ErrorInfoDiv.innerHTML = '';

    if(city === '') {
        ErrorInfoDiv.textContent = 'Please enter city name';
        return;
    }

    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=b3fca609ef1941f9b64115838242110&q=${city}&aqi=no`);
        const data = await response.json();

        if(!response.ok) {
            ErrorInfoDiv.textContent = 'Error fetching data';
        }

        weatherInfoDiv.innerHTML = `
            <h2>Weather in ${city}</h2>
            <p>Temperature : ${data.current.temp_c}°C</p>
            <p>Condition : ${data.current.condition.text}</p>
            <p>Humidity : ${data.current.humidity}%</p>
            <p>Wind Speed : ${data.current.wind_kph} km/h</p>
        `
        weatherInfoDiv.classList.add('visible');
    } catch (error) {
        ErrorInfoDiv.textContent = `Error : ${error.message}`;
        ErrorInfoDiv.classList.add('visible');
    }
})