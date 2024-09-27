// chuckNorrisConnector.js
import axios from 'axios'

// Connector: Fetch joke from Chuck Norris API
export const fetchRandomJoke = async () => {
  try {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    return response.data;
  } catch (error) {
    console.error('Error fetching joke from Chuck Norris API', error);
    throw error;
  }
};


