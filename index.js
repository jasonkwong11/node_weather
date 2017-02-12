var Client = require('node-rest-client').Client;
const client = new Client();

process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');
 

var apiKey = 'lszGWElRufBBbuGWwtJc95DPfp0NGXH5'

const initialize = () => {
  console.log('Checking the weather? Please enter a city, zipcode, or quit.')

  process.stdin.on('data', function (text){

    if (text === '\n'){
      console.log('Que? Please enter a city or zipcode or quit.')
      return initialize();
    }

    console.log('Here is the weather for ', util.inspect(text).substr(1, text.length-1));
    if (text === 'quit\n'){
      done();
    }

    //GET the location key from Accuweather API
    client.get('http://dataservice.accuweather.com//locations/v1/search?apikey=' + apiKey + '&q=' + text, (data, response) => {
      console.log(`We found the ${data.length} matches for your query...`);

      if (data.length === 0){
        client.removeAllListeners()
        console.log('No matches found. Please try again')
        return initialize();
      }

      if (data.length > 10){
        client.removeAllListeners()
        console.log('Please be more specific')
        return initialize();
      } 
      data.forEach((city) => {console.log(city.EnglishName + ', ' + city.AdministrativeArea.LocalizedName + ', ' + city.AdministrativeArea.CountryID)})
    })
  })
}

initialize()
