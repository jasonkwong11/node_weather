var Client = require('node-rest-client').Client;
const client = new Client();
const _ = require('lodash')
const mockData = require('./mockData');

process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

const checkRange = (number, numberOfCities) => {
  var array = _.range(1, numberOfCities + 1);
  array.find(() => { number }) ? true : false
}

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

    var apiKey = 'lszGWElRufBBbuGWwtJc95DPfp0NGXH5'

    //GET the location key from Accuweather API ... should return the location key
    client.get('http://dataservice.accuweather.com//locations/v1/search?apikey=' + apiKey + '&q=' + text, (data, response) => {
      console.log(`We found the ${data.length} matches for your query...`);

      if (data.length === 0){
        console.log('No matches found. Please try again')
        return initialize();
      }

      if (data.length > 10){
        console.log('Please be more specific');
        return initialize();
      } 

      var numberOfCities = data.length
     
      data.map((city, index) => {
        console.log(index+1 + '. ' + city.EnglishName + ', ' + city.AdministrativeArea.LocalizedName + ', ' + city.AdministrativeArea.CountryID)
      })
      console.log("Which city is the best match? Enter a number:")
      process.stdin.on('data', function (input){
        //validate input is a Number
        if (!Number(input)){
          console.log("Please enter a valid number...")
        }
        //validate input is a Number && is between 1 and numberOfCities (inclusive)
        if (Number(input) && checkRange(input, data.length)){
          console.log('HERES THE INPUT:')
          console.log(input)
        }

      });
    })

  })
}

initialize()
