const { weatherTypes } = require('./configs/weather_types.json');

// Initialize weather
let currWeather = -1;

// Initialize time
let hour = 12;
let minute = 0;

function updateWeather() {
  // Cycle to next weather pattern based on current one
  currWeather = (currWeather + 1) % weatherTypes.length;
  mp.world.setWeatherTransition(weatherTypes[currWeather]);
  console.log(`Weather is now ${weatherTypes[currWeather]}...`);
}

function updateTime() {
  // Update minutes
  minute += 5;
  if (minute >= 60) {
    minute = 0;
    hour += 1;
  }

  // Update hour
  if (hour >= 24) {
    hour = 0;
  }

  mp.world.time.set(hour, minute, 0);
}

// Update time by 5 minutes every 10 seconds
setInterval(() => {
  updateTime();
}, 10000);

// Change weather every 10 minutes
setInterval(() => {
  updateWeather();
}, 600000);
