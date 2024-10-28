import express from "express";
import { getDisneyHandler,getDisneyCharacter,checkForCharacterByName } from "./handlers/disneyHandler.js";


const app = express()
const port = 3000


app.get('/home',(req,res)=>{
    res.send('Hello')
})

app.get('/character', getDisneyHandler);

app.get('/character/:characterId', getDisneyCharacter);

app.get('/character/:characterId', async (req, res) => {
    const { characterId } = req.params;  // Get the character ID from the route parameters
    const characterName = req.query.name;  // Optionally get the character name from query parameters
  
    try {
      const result = await checkForCharacterByName(characterId, characterName);  // Check for the character by ID and name
  
      if (result.exists) {
        console.log(`Character found:`, result.character);
        res.status(200).json(result.character);  // Send character data back to the client
      } else {
        console.log(result.message);
        res.status(404).json({ message: result.message });  // Send a 404 if the character doesn't match
      }
    } catch (error) {
      console.error('Error checking character:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });





app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })