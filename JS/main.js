const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  const inputdFind = document.getElementById('inputdFind');
  const home = document.getElementById('home');
  
  async function getWeather(currentCity = 'cairo') {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=c6a549e1de0a4fee8fe191912230609&q=${currentCity}&days=7`
      );
      const data = await response.json();
    
      currentDay(data);
      nextDay(data);
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
  getWeather();
  
  function currentDay(data) {
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();
    const dayName = days[dayIndex];
    
    const card = `
      <div class="col-md-4">
        <p class="day">${dayName}</p>
        <div class="cardContainer">
          <div class="card">
            <p class="city">${data.location.name}</p>
            <p class="weather">${data.current.condition.text}</p>
            <img src=${data.current.condition.icon} alt="">
            <p class="temp">${data.current.temp_c}°</p>
            <div class="minmaxContainer">
              <div class="min">
                <p class="minHeading">Min</p>
                <p class="minTemp">${data.current.temp_f}°</p>
              </div>
              <div class="max">
                <p class="maxHeading">Max</p>
                <p class="maxTemp">${data.current.temp_c}°</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    home.innerHTML = card;
  }
  
  function nextDay(data) {
    let card = '';
  
    for (let i = 0; i < data.forecast.forecastday.length - 1; i++) {
      const dayIndex = new Date(data.forecast.forecastday[i + 1].date).getDay();
      const dayName = days[dayIndex];
      
      card += `
        <div class="col-md-4">
          <p class="day">${dayName}</p>
          <div class="cardContainer">
            <div class="card">
              <p class="weather">${data.forecast.forecastday[i + 1].day.condition.text}</p>
              <img src=${data.forecast.forecastday[i + 1].day.condition.icon} alt="">
              <p class="temp">${data.forecast.forecastday[i + 1].day.maxtemp_c}°</p>
              <div class="minmaxContainer">
                <div class="min">
                  <p class="minHeading">Min</p>
                  <p class="minTemp">${data.forecast.forecastday[i + 1].day.mintemp_c}°</p>
                </div>
                <div class="max">
                  <p class="maxHeading">Max</p>
                  <p class="maxTemp">${data.forecast.forecastday[i + 1].day.maxtemp_c}°</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    
    home.innerHTML += card;
  }
  
  inputdFind.addEventListener("keyup", function () {
    getWeather(inputdFind.value);
  });