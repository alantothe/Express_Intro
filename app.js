const express = require('express')
var bodyParser = require('body-parser')
const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const port = 3000

const today = new Date();
const name = "Alan Malpartida"
let favoriteMovieList = [
  {
  title : 'Fight Club',
  starRating: 5,
  isRecommended: true,
  createdAt: new Date(),
  lastModified: new Date()


}, {
  title: 'Rocky I',
  starRating: 5,
  isRecommended: true,
  createdAt: new Date(),
  lastModified: new Date()


}

];
let newMovieObject ={  
  title: '',
  starRating: 0,
  isRecommended: false,
  createdAt: new Date(),
  lastModified: new Date()
}


//Read
app.get('/', (req, res) => {
  res.json(`Name: ${name} <br> <br> Date: ${today}`)
 
  console.log('Default Route')
})
app.get('/list-movies', (req, res) => {
  console.log("Movies Available")
  console.log(favoriteMovieList)
  res.json(favoriteMovieList)

  
  })
app.get("/single-movie/:singleMovie" , (req, res) => {
  

  const singleMovie = req.params.singleMovie


  const MovieIndex = favoriteMovieList.findIndex((movie)=>{
    console.log("movies", movie )
    console.log("is this the correct title?", singleMovie)
    console.log("condition", movie.title === singleMovie)

    if (movie.title === singleMovie){
      console.log("titles match!")
      return true

    }
    else {
      console.log("titles do not match!")
      return false
    }

    
    


   
  
  })
  
  const foundMovie = favoriteMovieList[MovieIndex] 

  res.json(foundMovie)


})
//Create 
app.post('/add-movie', (req, res) => {
    
    newMovieObject = req.body
    newMovieObject.createdAt = new Date()
    newMovieObject.lastModified = new Date()
    favoriteMovieList.push(newMovieObject)
    console.log(newMovieObject)
    res.send(newMovieObject)


  })
//Update
app.put("/update-movie/:titleToUpDate" , (req, res) => {
  console.log("req params", req.params)
  
  const titleToUpDate = req.params.titleToUpDate

  const originalMovieIndex = favoriteMovieList.findIndex((movie)=>{
    console.log("movies", movie )
    console.log("is this the correct title?", req.params.titleToUpDate)
    console.log("condition", movie.title === req.params.titleToUpDate)

    if (movie.title === req.params.titleToUpDate ){
      console.log("titles match!")
      return true

    }
    else {
      console.log("titles do not match!")
      return false
    }

    
    


   


  
  })
 
 console.log(`Index of title to change is :${originalMovieIndex}`)
 let originalMovie = favoriteMovieList[originalMovieIndex] 


 let updateMovie = {
  title: originalMovie.title,
  starRating: originalMovie.starRating,
  isRecommended: originalMovie.isRecommended,
  createdAt: originalMovie.createdAt,
  lastModified: new Date()

 }
 console.log("Original Movie")
 console.log(updateMovie)

 if (req.body.title !== undefined){
  updateMovie.title = req.body.title
 }
 if (req.body.starRating !== undefined){
  updateMovie.starRating = req.body.starRating
 }
 if (req.body.isRecommended !== undefined){
  updateMovie.isRecommended = req.body.isRecommended
 }
 console.log("Updated Movie")
 console.log(updateMovie)



 favoriteMovieList[originalMovieIndex] = updateMovie

  res.json({
    success: true
  })

  return
})
// Delete 
app.delete("/delete-movie/:titleToDelete", (req, res) => {

  const titleToDelete = req.params.titleToDelete

  const originalMovieIndex = favoriteMovieList.findIndex((movie)=>{
    console.log("movies", movie )
    console.log("is this the correct title?", req.params.titleToDelete)
    console.log("condition", movie.title === req.params.titleToDelete)

    if (movie.title === req.params.titleToDelete ){
      console.log("titles match!")
      return true

    }
    else {
      console.log("titles do not match!")
      return false
    }

    
    


   


  
  })

  console.log("Before Delete") 
  console.log(favoriteMovieList)
  favoriteMovieList.splice(originalMovieIndex, 1)
  console.log("After Delete") 
  console.log(favoriteMovieList)

  res.json({
    hasBeenDeleted: true
  })


})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

