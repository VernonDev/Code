import {
  fetchCharacter,
  fetchOneCharacter,
} from "../connectors/disneyConnector.js";
import { formatDisneyCharacter } from "../helpers/disneyHelper.js";

export const getDisneyHandler = async (req, res) => {
  try {
    const character = await fetchCharacter();
    const formattedCharacter = formatDisneyCharacter(character);
    res.status(200).json(formattedCharacter);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch characher", error });
  }
};

export const getDisneyCharacter = async (req, res) => {
  const characterId = req.params.characterId;
  try {
    const character = await fetchOneCharacter(characterId);
    //const formattedOneCharacter = formattedOneCharacters(character);
    res.status(200).json(character);
    //console.log(formattedOneCharacter);
  } catch (error) {
    res.status(500).json({
      message: `Failed to fetch character for category ${characterId}`,
      error,
    });
  }
};

export const checkForCharacterByName = async (characterId, characterName) => {
  try {
    const character = await fetchOneCharacter(characterId); // Fetch the character by ID

    // Check if the fetched character's name matches the desired name
    if (
      character.name &&
      character.name.toLowerCase() === characterName.toLowerCase()
    ) {
      return {
        exists: true,
        character, // Return the character data if it exists
      };
    } else {
      return {
        exists: false,
        message: `Character with ID ${characterId} does not match the name ${characterName}`,
      };
    }
  } catch (error) {
    console.error(`Error checking character with ID ${characterId}:`, error);
    throw error; // Re-throw the error for further handling
  }
};
