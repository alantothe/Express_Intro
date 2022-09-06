const express = require('express')
const app = express()
const port = 3000
const favoriteMovieList = ["Fight Club", "Rocky I"]
const today = new Date();
const name = "Alan Malpartida"



let moviesString = null;
let newMovie = null


// favoriteMovieList += 


app.get('/', (req, res) => {
  res.send(`Name: ${name} <br> <br> Date: ${today}`)
 
  console.log('Default Route')
})

app.get('/add-movie', (req, res) => {
  console.log(req.query)
  newMovie = req.query.newMovie
  favoriteMovieList.push(newMovie)
  res.send(`New Movie: <b>  ${newMovie}`)
})

app.get('/list-movies', (req, res) => {
  console.log(favoriteMovieList)
  moviesString = favoriteMovieList.toString();
  res.send(`List of Favorite Movies: <b> ${moviesString}`)
  
  })




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

