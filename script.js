const form = document.querySelector('form')
const input = document.querySelector('input')
const date = document.querySelector('.date')


const now = new Date()
console.log(now)

// const images = {
//     cloudy: 'sd',
//     sunny: ,
//     rainy: ,
//     windy: ,
//     snowy: ,
//     lightning:
// }

form.addEventListener('submit', (e) => {
    e.preventDefault()
    // getWeather()
})

async function getWeather() {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?key=CC4XZ6KTPU63HBE3C3V22JNRL`)
    const weatherData = await response.json()
    console.log(weatherData)
}
