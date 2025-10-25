const form = document.querySelector('form')
const input = document.querySelector('input')

// Data
const date = document.querySelector('.date')
const city = document.querySelector('.city')
const pic = document.querySelector('.pic')
const temp = document.querySelector('.main-temp')
const feels = document.querySelector('.feels')
const humidity = document.querySelector('.humidity')
const high = document.querySelector('.high p')
const low = document.querySelector('.low p')
const windS = document.querySelector('.wind-s p')
const windDir = document.querySelector('.wind-dir p')
const vis = document.querySelector('.visibility p')
const uv = document.querySelector('.uv p')
const precipitation = document.querySelector('.prec p')
const sunrise = document.querySelector('.sunrise p')
const sunset = document.querySelector('.sunset p')
const pressure = document.querySelector('.pressure p')

const day = document.querySelectorAll('.day')


const images = {
        cloudy: 'Assets/icons8-cloud-50.png',
        sunny: 'Assets/icons8-sun-50.png',
        rainy: 'Assets/icons8-heavy-rain-50.png',
        windy: 'Assets/icons8-wind-50.png',
        snowy: 'Assets/icons8-snow-50.png',
        lightning: 'Assets/icons8-cloud-lightning-50.png',
        partiallyCloudy: 'Assets/icons8-partly-cloudy-day-50.png',
        storm: 'Assets/icons8-storm-50.png',

    }
    
// const now = new Date()
// console.log(now)

let locations = []

form.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeather()
    input.value = ''
})

async function getWeather() {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?key=CC4XZ6KTPU63HBE3C3V22JNRL`)
    const weatherData = await response.json()
    console.log(weatherData)

    // Set values
    city.textContent = weatherData.resolvedAddress
    temp.textContent = weatherData.currentConditions.temp + '°'
    date.textContent = weatherData.currentConditions.datetime
    feels.textContent = weatherData.currentConditions.feelslike + '°'
    humidity.textContent = weatherData.currentConditions.humidity + '%'
    high.textContent = weatherData.days[0].tempmax + '°'
    low.textContent = weatherData.days[0].tempmin + '°'
    windS.textContent = weatherData.currentConditions.windspeed + 'mph'
    windDir.textContent = weatherData.currentConditions.winddir + '°'
    vis.textContent = weatherData.currentConditions.visibility + ' mi'
    uv.textContent = weatherData.currentConditions.uvindex + ' of 11'
    precipitation.textContent = weatherData.currentConditions.precip + ' in'
    sunset.textContent = weatherData.currentConditions.sunset
    sunrise.textContent = weatherData.currentConditions.sunrise
    pressure.textContent = weatherData.currentConditions.pressure + ' in'

    if (weatherData.currentConditions.conditions == 'Partially cloudy') {
        pic.src = images.partiallyCloudy
    }

    else if (weatherData.currentConditions.conditions == 'Clear') {
        pic.src = images.sunny
    }
    
    else if (weatherData.currentConditions.conditions == 'Overcast') {
        pic.src = images.cloudy
    }
    
    else if (weatherData.currentConditions.conditions == 'Rain') {
        pic.src = images.rainy
    }

    // Add locations to array for storing
    locations.push(weatherData.resolvedAddress)
    console.log(locations)

    day.forEach((item, i) => {
        const weekday = item.querySelector('.weekday')
        const dayTemp = item.querySelector('.day-temp')
        const dayPic = item.querySelector('.day-pic')
    
        weekday.textContent = weatherData.days[i].datetime
        dayTemp.textContent = weatherData.days[i].tempmax + ' / ' + weatherData.days[i].tempmin

        if (weatherData.days[i].conditions == 'Partially cloudy') {
            dayPic.src = images.partiallyCloudy
        }

        else if (weatherData.days[i].conditions == 'Clear') {
            dayPic.src = images.sunny
        }
        
        else if (weatherData.days[i].conditions == 'Overcast') {
            dayPic.src = images.cloudy
        }
        
        else if (weatherData.days[i].conditions == 'Rain, Partially cloudy') {
            dayPic.src = images.rainy
        }
    })
    
}