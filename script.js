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

const weekday = document.querySelector('.weekday')
const dayTemp = document.querySelector('.day-temp')
const dayPic = document.querySelector('.day-pic')

const sideItems = document.querySelector('.i')
const delBtn = document.querySelector('.delete')
const item2 = document.querySelector('.item')


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

console.log(dayTemp.textContent)
    
// const now = new Date()
// console.log(now)


if (!localStorage.getItem('places')) {
    let location = []
    localStorage.setItem('places', JSON.stringify(location))
}

if (!localStorage.getItem('temps')) {
    let temps = []
    localStorage.setItem('temps', JSON.stringify(temps))
}

window.addEventListener('DOMContentLoaded', renderSidebar)

form.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeather()
    input.value = ''
})

// Convert to C/F
const f = document.querySelector('.f')
const c = document.querySelector('.c')
let x = 0
let y = 0

f.addEventListener('click', () => {
    c.classList.remove('active')
    c.classList.add('disabled')
    f.classList.add('active')
    f.classList.remove('disabled')
    console.log('F -> ' + temp.textContent + f.classList + ' | C -> ' + c.classList)
    x += 1
    y = 0
    console.log('x -> ' + x)
    if (x == 1) {
        temp.textContent = cToF(temp.textContent).toFixed(0) + '°'        
        high.textContent = cToF(high.textContent).toFixed(0)+ '°'
        low.textContent = cToF(low.textContent).toFixed(0) + '°'
        day.forEach((item, i) => {
            const sHigh = item.querySelector('.s-high')
            const sLow = item.querySelector('.s-low')
            console.log(sHigh, sLow)
            sHigh.textContent = cToF(sHigh.textContent).toFixed(0) + '°'
            sLow.textContent = cToF(sLow.textContent).toFixed(0) + '°'
        })
    }
})

c.addEventListener('click', () => {
    c.classList.remove('disabled')
    c.classList.add('active')
    f.classList.remove('active')
    f.classList.add('disabled')
    console.log('C -> ' + temp.textContent + c.classList + ' | F -> ' + f.classList)
    y += 1
    x = 0
    console.log('y -> ' + y)
    if (y == 1) {
        temp.textContent = fToC(temp.textContent).toFixed(0) + '°'
        high.textContent = fToC(high.textContent).toFixed(0) + '°'
        low.textContent = fToC(low.textContent).toFixed(0) + '°'

        day.forEach((item, i) => {
            const sHigh = item.querySelector('.s-high')
            const sLow = item.querySelector('.s-low')
            console.log(sHigh, sLow)
            sHigh.textContent = fToC(sHigh.textContent).toFixed(0) + '°'
            sLow.textContent = fToC(sLow.textContent).toFixed(0) + '°'
        })
    }
})

// Delete Items from sidebar




// API Functionality n shi
async function getWeather() {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?key=CC4XZ6KTPU63HBE3C3V22JNRL`)
    const weatherData = await response.json()
    console.log(weatherData)

    // Set values
    city.textContent = weatherData.resolvedAddress
    temp.textContent = weatherData.currentConditions.temp.toFixed(0) + '°'
    date.textContent = 'Last update at: ' + weatherData.currentConditions.datetime
    feels.textContent = 'Feels like ' + weatherData.currentConditions.feelslike.toFixed(0) + '°'
    humidity.textContent = weatherData.currentConditions.humidity + '% Humidty'
    high.textContent = weatherData.days[0].tempmax.toFixed(0) + '°'
    low.textContent = weatherData.days[0].tempmin.toFixed(0) + '°'
    windS.textContent = weatherData.currentConditions.windspeed + 'mph'
    windDir.textContent = weatherData.currentConditions.winddir + '°'
    vis.textContent = weatherData.currentConditions.visibility + ' mi'
    uv.textContent = weatherData.currentConditions.uvindex + ' of 11'
    precipitation.textContent = weatherData.currentConditions.precip + ' in'
    sunset.textContent = weatherData.currentConditions.sunset
    sunrise.textContent = weatherData.currentConditions.sunrise
    pressure.textContent = weatherData.currentConditions.pressure + ' in'

    

    // Get pics
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

    // Get Day of the Week instead of date
    const calendarDay = new Date()
    const dowIndex = calendarDay.getDay()
    const dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dowName =  dow[dowIndex]

    // Add locations to array for storing
    saveLocations(weatherData.resolvedAddress, weatherData.currentConditions.temp.toFixed(0))

    day.forEach((item, i) => {
        const weekday = item.querySelector('.weekday')
        const dayTemp = item.querySelector('.day-temp')
        const dayPic = item.querySelector('.day-pic')
        const sHigh = item.querySelector('.s-high')
        const sLow = item.querySelector('.s-low')

        weekday.textContent = dow[i]
        sHigh.textContent = weatherData.days[i].tempmax.toFixed(0) + '°'
        sLow.textContent = weatherData.days[i].tempmin.toFixed(0) + '°'

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

// Conversion helper functions
function cToF(temps) {
    const conv = (parseInt(temps) * 1.8) + 32
    temps.textContent = conv
    return conv
}

function fToC(temps) {
    const conv = (parseInt(temps) - 32) * (5/9)
    temps.textContent = conv
    console.log(conv)
    return conv
}

function saveLocations(cityName, cityTemp) {
    // Store Items in local storage
    let locations = JSON.parse(localStorage.getItem('places'))
    let temps = JSON.parse(localStorage.getItem('temps'))
    
    // Add locations to array for storing
    const exists = locations.findIndex(c => c.toLowerCase() === cityName.toLowerCase())
    if (exists == -1) {
        locations.push(cityName)
        temps.push(cityTemp)
    }
    else {
        temps[exists] = cityTemp
    }
    
    // Save to storage
    localStorage.setItem('places', JSON.stringify(locations))
    localStorage.setItem('temps', JSON.stringify(temps))


    renderSidebar()
}

function renderSidebar() {
    const saved = JSON.parse(localStorage.getItem('places'))
    const savedTemps = JSON.parse(localStorage.getItem('temps'))
    sideItems.textContent = ''

    saved.forEach((city, i) => {
        // Add items to sidebar
        const sideItem = document.createElement('div')
        sideItem.classList.add('item')

        const iName = document.createElement('h3')
        iName.classList.add('name')
        iName.textContent = city

        const iTemp = document.createElement('h3')
        iTemp.classList.add('temp')
        iTemp.textContent = savedTemps[i] + '°'

        const del = document.createElement('img')
        del.classList.add('delete')
        del.src = 'Assets/delete.png'

        sideItems.appendChild(sideItem)
        sideItem.appendChild(del)
        sideItem.appendChild(iName)
        sideItem.appendChild(iTemp)
    })
}

// delBtn.addEventListener('click', () => {
//     const places = JSON.parse(localStorage.getItem('places'))
//     const temps = JSON.parse(localStorage.getItem('temps'))

//     const idx = places.findIndex(c => c == city)
//     if (idx !==  -1) {
//         places.splice(idx, 1)
//         temps.splice(idx, 1)
//         localStorage.setItem('places', JSON.stringify(places))
//         localStorage.setItem('temps', JSON.stringify(temps))
//     }
//     item2.remove()
// })