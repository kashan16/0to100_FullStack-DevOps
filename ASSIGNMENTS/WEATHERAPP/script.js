const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const themeIcon = document.getElementById('themeIcon');
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherInfoDiv = document.getElementById('weatherInfo');
const errorInfoDiv = document.getElementById('errorInfo');
const loadingDiv = document.getElementById('loadingDiv');
const recentSearchesContainer = document.getElementById('recentSearchesContainer');

const API_KEY = 'b3fca609ef1941f9b64115838242110';

// Theme Toggle Logic
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');

    themeIcon.src = isDarkMode ? 'dark-mode-icon.svg' : 'light-mode-icon.svg';
    themeIcon.alt = isDarkMode ? 'Dark mode' : 'Light mode';

    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Apply Saved Theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.src = 'dark-mode-icon.svg';
        themeIcon.alt = 'Dark mode';
    } else {
        themeIcon.src = 'light-mode-icon.svg';
        themeIcon.alt = 'Light mode';
    }
});

// Fetch Weather Data
getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();

    weatherInfoDiv.style.display = 'none';
    errorInfoDiv.style.display = 'none';
    loadingDiv.style.display = 'block';

    if (!city) {
        errorInfoDiv.textContent = 'Please enter a city name';
        errorInfoDiv.style.display = 'block';
        loadingDiv.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error.message || 'Failed to fetch weather data');
        }

        weatherInfoDiv.innerHTML = `
            <h2>Weather in ${data.location.name}</h2>
            <p>Temperature: ${data.current.temp_c}°C</p>
            <p>Condition: ${data.current.condition.text}</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind Speed: ${data.current.wind_kph} km/h</p>
        `;
        weatherInfoDiv.style.display = 'block';

        // Save to recent searches
        updateRecentSearches(city);
    } catch (error) {
        errorInfoDiv.textContent = error.message;
        errorInfoDiv.style.display = 'block';
    } finally {
        loadingDiv.style.display = 'none';
    }
});

// Update Recent Searches
function updateRecentSearches(city) {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    if (!recentSearches.includes(city)) {
        recentSearches.unshift(city);
        if (recentSearches.length > 5) recentSearches.pop();
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
    renderRecentSearches(recentSearches);
}

// Render Recent Searches
function renderRecentSearches(searches) {
    recentSearchesContainer.innerHTML = searches
        .map(city => `<button class="recent-search">${city}</button>`)
        .join('');

    document.querySelectorAll('.recent-search').forEach(button => {
        button.addEventListener('click', () => {
            cityInput.value = button.textContent;
            getWeatherBtn.click();
        });
    });
}

// Load Recent Searches on Page Load
document.addEventListener('DOMContentLoaded', () => {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    renderRecentSearches(recentSearches);
});
