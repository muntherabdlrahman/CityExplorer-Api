const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
// let weatherData= require('./data/weather.json')
app.use(cors()) // after you initialize your express app instance
const axios = require('axios'); // require the package
const { response } = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const MOVIES_API_KEY=process.env.MOVIES_API_KEY;


// a server endpoint (api)
app.get('/', (req, res) => { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})


app.get('/weather', (req, res) => {
  let weather;
  let lat = req.query.lat
  let lon = req.query.lon

  let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_BIT_API}&lat=${lat}&lon=${lon}`
  let weatherBitResp = axios.get(url).then(response => {
    // res.json(response.data);
    weather = response.data

    let forecastArr = weather.data.map((item, index) => {
      return new ForeCast(item)
    });
    res.json(forecastArr)
  }).catch(error=>res.send({message:error.message}));
});


app.get('/movies', (req, res) => {
  let movies;
  let query = req.query.query

  let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIES_API_KEY}&query=${query}`
  let moviesResp = axios.get(moviesUrl).then(response => {
    movies = response.data.results;

    let callMovies = movies.map(el => {
      return new Movies(el);
    });

    res.json(callMovies);
    
  }).catch(error=>res.send({message:error.message}));
});

class ForeCast {
  constructor(weatherData) {
    this.date = weatherData.valid_date
    this.description = weatherData.weather.description
  }

}

class Movies{
  constructor(moviesData){
      this.title=moviesData.original_title;
      this.votes=moviesData.vote_count
      this.img='http://image.tmdb.org/t/p/w342'+moviesData.poster_path;
      
  }
}



// app.listen(process.PORT) // kick start the express server to work
app.listen(PORT, () => {
  console.log('started server on port 8000')
}) // kick start the express server to work