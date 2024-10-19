import express from "express";
import { getDisneyHandler } from "./handlers/disneyHandler.js";

const app = express()
const port = 3000


app.get('/home',(req,res)=>{
    res.send('Hello')
})

app.get('/character', getDisneyHandler);




app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })