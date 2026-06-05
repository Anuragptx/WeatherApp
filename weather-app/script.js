const apiKey = '2e375799fdb34866bab0f6812c979029';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherCard = document.getElementById('weather-card');
const errorMessage = document.getElementById('error-message');

const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const tempValue = document.getElementById('temp-value');
const condition = document.getElementById('condition');
const humidityValue = document.getElementById('humidity-value');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});

async function getWeather(city) {
    try {
        // Reset state
        errorMessage.style.display = 'none';
        weatherCard.classList.remove('active');
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            } else {
                throw new Error('Failed to fetch weather data');
            }
        }

        const data = await response.json();
        updateUI(data);

    } catch (error) {
        console.error('Error fetching weather:', error);
        errorMessage.textContent = error.message === 'City not found' 
            ? 'City not found. Please try again.' 
            : 'An error occurred. Please try again later.';
        errorMessage.style.display = 'block';
    }
}

function updateUI(data) {
    // Update data
    cityName.textContent = data.name;
    tempValue.textContent = Math.round(data.main.temp);
    condition.textContent = data.weather[0].description;
    humidityValue.textContent = `${data.main.humidity}%`;
    
    // Set icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    // Show card
    weatherCard.classList.add('active');
}
