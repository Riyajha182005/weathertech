
async function fetchWeather(city) {
    const apiKey = 'd52f0d002cef465a88e41901250502';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    document.querySelector('.city').textContent = data.location.name;
    document.querySelector('.temp').textContent = `${data.current.temp_c}°C`;
    document.querySelector('.humidity').textContent = `${data.current.humidity}%`;
    document.querySelector('.wind').textContent = `${data.current.wind_kph} km/h`;
    document.querySelector('.weather-icon').src = data.current.condition.icon;
}

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.searchButton');
    const searchInput = document.querySelector('.search input');
    
    searchButton.addEventListener('click', () => {
        const city = searchInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });
    
    fetchWeather('New Delhi');
});

