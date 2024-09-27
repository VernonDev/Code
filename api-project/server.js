import express from'express'
import { getJokeHandler,getJokeByCategoryHandler,getCategoriesHandler } from './chuckNorrisHandler.js';

const app = express()
const port = 3000


// Route that returns a random Chuck Norris joke
app.get('/random-joke', getJokeHandler);

// Route to return a random Chuck Norris joke by category
app.get('/random-joke/:category', getJokeByCategoryHandler);

// Route to return available categories
app.get('/categories', getCategoriesHandler);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})