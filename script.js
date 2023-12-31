const searchBar = document.querySelector('.search-bar')
const searchButton = document.querySelector('.search-button')
const mainContainer = document.querySelector('.main-container')
const inputContainer = document.querySelector('.input-container')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature-text')
const humidityText = document.querySelector('.humidity')
const windText = document.querySelector('.wind')
const locationIcon = '<i class="fa-solid fa-location-dot" style="color: #ffffff;"></i>'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric'
const API_KEY = '4553a38df853cb0639c7ef21f6eba2be'

async function fetchData() {
    try {
        const response = await fetch(`${BASE_URL}&q=${searchBar.value}&appid=${API_KEY}`)
        const data = await response.json()

        const locationContainer = document.createElement('div')
        locationContainer.classList.add('location-container')
        locationContainer.innerHTML = locationIcon

        const locationText = document.createElement('p')
        locationText.innerText = data.name

        if (data.name) {
            temperature.innerText = Math.round(data.main.temp) + "°C"
            humidityText.innerText = data.main.humidity + "%"
            windText.innerText = Math.round(data.wind.speed) + " km/h"
        } else {
            locationText.innerText = 'Please enter a valid location'
            temperature.innerText = "Search for a location"
            humidityText.innerText = "N/A"
            windText.innerText = "N/A"
        }

        locationContainer.append(locationText)
        inputContainer.after(mainContainer.appendChild(locationContainer))

        searchBar.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                removeElement(locationContainer)
            }
        })
        searchButton.addEventListener('click', function () {
            removeElement(locationContainer)
        })

        if (data.weather[0].main === 'Smoke') {
            weatherIcon.src = 'https://cdn-icons-png.flaticon.com/512/1197/1197102.png'
        } else if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = 'https://cdn-icons-png.flaticon.com/512/7084/7084486.png'
        } else if (data.weather[0].main === 'Clear') {
            weatherIcon.src = 'https://icons-for-free.com/iconfiles/png/512/sunny+temperature+weather+icon-1320196637430890623.png'
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = 'https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png'
        } else if (data.weather[0].main === 'Drizzle') {
            weatherIcon.src = 'https://cdn-icons-png.flaticon.com/512/4837/4837659.png'
        } else if (data.weather[0].main === 'Mist') {
            weatherIcon.src = 'https://cdn-icons-png.flaticon.com/512/1197/1197102.png'
        } else if (data.weather[0].main === 'Haze') {
            weatherIcon.src = 'https://cdn-icons-png.flaticon.com/512/1197/1197102.png'
        } else if (data.weather[0].main === 'Snow') {
            weatherIcon.src = 'https://e7.pngegg.com/pngimages/35/938/png-clipart-snowflakes-snowflakes-thumbnail.png'
        } 
        else {
            weatherIcon.src = 'https://icons-for-free.com/iconfiles/png/512/sunny+temperature+weather+icon-1320196637430890623.png'
        }

        if (!response.ok) {
            throw new Error('Something bad happened')
        }
    }
    catch (error) {
        console.log(error)
    }
}


searchBar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && searchBar.value !== '') {
        fetchData()
        searchBar.value = ''
    }
})

searchButton.addEventListener('click', function () {
    if (searchBar.value !== '') {
        fetchData()
        searchBar.value = ''
    }
})

function removeElement(element) {
    element.remove()
}