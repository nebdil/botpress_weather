require('dotenv').config()
const request = require('request');

module.exports = function(bp) {
  // Listens for a first message (this is a Regex)
  // GET_STARTED is the first message you get on Facebook Messenger
  bp.hear(/GET_STARTED|hello|hi|test|hey|holla/i, (event, next) => {
    event.reply('#welcome') // See the file `content.yml` to see the block
  })

  // You can also pass a matcher object to better filter events
  bp.hear({
    type: /message|text/i,
    text: /exit|bye|goodbye|quit|done|leave|stop/i
  }, (event, next) => {
    event.reply('#goodbye', {
      // You can pass data to the UMM bloc!
      reason: 'unknown'
    })
  })

  // if wants some suggestions
  bp.hear('WELCOME.B1', (event, next) => {
    event.reply('#askLocation')
  })

  // if does not want suggestions
  bp.hear('WELCOME.B2', (event, next) => {
    event.reply('#noSuggestion')
  })

  // API call for current weather
  bp.hear({ type: 'location' }, (event, next) => {
    let lat = event.raw.payload.coordinates.lat;
    let lon = event.raw.payload.coordinates.long;
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.W_API}`
    request(url, function (err, response, body) {
      if(err){
        console.log('error:', error);
      } else {
        let weather = JSON.parse(body)
        console.log('description: ', weather.weather[0].description)
        console.log('temp min: ', weather.main.temp_min)
        console.log('temp max: ', weather.main.temp_max)
        console.log('city: ', weather.name)
        event.reply('#askLocation_reply', { weather: weather })
      }
    });
  })
}
