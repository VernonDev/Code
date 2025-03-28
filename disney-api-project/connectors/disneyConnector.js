import axios from "axios";

//fecth characther from disney api

export const fetchCharacter = async () => {
  try {
    const response = await axios.get("https://api.disneyapi.dev/character");
    return response.data;
  } catch (error) {
    console.error("error getting the characters", error);
    throw error;
  }
};

export const fetchOneCharacter = async (characterId) => {
  try {
    const response = await axios.get(`https://api.disneyapi.dev/character/${characterId}`);
    return response.data;
    
  } catch (error) {
    console.error(`error fetching ${characterId}`);
    throw error;
  }
}