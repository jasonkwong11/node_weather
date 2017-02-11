const express = require('express')
const rp = require('request-promise')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express()

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

window.alert('HI')
//GET the location key from Accuweather API
app.get('/:city', (req, res) => {
  rp({
    uri: 'http://dataservice.accuweather.com/locations/v1/search',
    qs: {
      q: req.params.city,
      apiKey: 'lszGWElRufBBbuGWwtJc95DPfp0NGXH5',
      language: 'en-us',
      details: true,
      offset: 0,
      alias: 'NoOfficialMatchFound'
    },
    json: true
  })
    .then((data) => {
      res.render('index', data)
    })
    .catch((err) => {
      console.log(err)
      res.render('error')
    })
})

app.listen(3000)

