async function moduleProject4() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
  document.querySelector('#weatherWidget').style.display = 'none'
  
  document.querySelector('#citySelect').addEventListener('change', async evt => {
    try {
      // Task 3: Prepare to fetch the weather data
      const citySelect = document.querySelector('#citySelect')
      const weatherWidget = document.querySelector('#weatherWidget')
      const infoElement = document.querySelector('.info')

      citySelect.setAttribute('disabled', 'disabled')
      weatherWidget.style.display = 'none'
      infoElement.textContent = 'Fetching weather data...'

      const city = evt.target.value
      const url = `http://localhost:3003/api/weather?city=${city}`

      // Task 4: Launch a request to the weather API
      const res = await axios.get(url)
      console.log(res.data)

      // Task 5: Handle data fetching success
      infoElement.textContent = ''
      citySelect.removeAttribute('disabled')
      weatherWidget.style.display = 'block'

      // Update the DOM with weather data
      const data = res.data
      document.querySelector('#location div:first-child').textContent = data.location.city
      document.querySelector('#location div:last-child').textContent = data.location.country

      const apparentTempElement = document.querySelector('#apparentTemp div:last-child')
      apparentTempElement.textContent = `${data.current.apparent_temperature}°`

      const todayDescriptionElement = document.querySelector('#todayDescription')
      const descriptionEmoji = descriptions.find(desc => desc[0] === data.current.weather_description)[1]
      todayDescriptionElement.innerHTML = `${descriptionEmoji} <span>${data.current.weather_description}</span>`

      const todayStatsElement = document.querySelector('#todayStats')
      todayStatsElement.innerHTML = `
        <div>${data.current.temperature_min}°/${data.current.temperature_max}°</div>
        <div>Precipitation: ${Math.round(data.current.precipitation_probability * 100)}%</div>
        <div>Humidity: ${data.current.humidity}%</div>
        <div>Wind: ${data.current.wind_speed}m/s</div>
      `

      // Update forecast
      const forecastDays = ['Thursday', 'Friday', 'Saturday'];
      data.forecast.daily.forEach((day, index) => {
        const forecastElement = document.querySelector(`.next-day:nth-child(${index + 1})`)
        const forecastDayOfWeek = forecastDays[index];
        const forecastEmoji = descriptions.find(desc => desc[0] === day.weather_description)[1]
        forecastElement.innerHTML = `
          <div>${forecastDayOfWeek}</div>
          <div>${forecastEmoji}</div>
          <div>${day.temperature_min}°/${day.temperature_max}°</div>
          <div>Precipitation: ${Math.round(day.precipitation_probability * 100)}%</div>
        `
      })
    }
    catch (err) {
      console.error(err)
      document.querySelector('.info').textContent = 'Failed to fetch weather data. Please try again.'
      document.querySelector('#citySelect').removeAttribute('disabled')
    }
  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
