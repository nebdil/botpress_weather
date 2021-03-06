require('dotenv').config()
const request = require('request');

module.exports = function(bp) {
  bp.hear(/GET_STARTED|hello|hi|test|hey|holla/i, (event, next) => {
    // GET_STARTED is the first message you get on Facebook Messenger
    event.reply('#welcome')
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
      if (err){
        console.log('error:', error);
      } else {
        let weather = JSON.parse(body)
        if (weather.main.temp_max >= 10) {
          event.reply('#askLocation_replyHot', { weather: weather })
        } else if (weather.main.temp_max >= -5) {
          event.reply('#askLocation_replyWarm', { weather: weather })
        } else {
          event.reply('#askLocation_replyCold', { weather: weather })
        }
      }
    })
  })

  // if the user thanks me
  bp.hear(/thank/i, (event, next) => {
    event.reply('#thanks')
  })

  // if leaving
  bp.hear(/exit|bye|goodbye|quit|done|leave|stop/i, (event, next) => {
    event.reply('#goodbye')
  })
}
