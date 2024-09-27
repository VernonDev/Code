import express from'express'
import { getJokeHandler } from './chuckNorrisHandler';

const app = express()
const port = 3000


// Route that returns a random Chuck Norris joke
app.get('/random-joke', getJokeHandler);



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})