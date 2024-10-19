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

// Fetch joke by category from Chuck Norris API
export const fetchJokeByCategory = async (category) => {
  try {
    const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching joke by category ${category}`, error);
    throw error;
  }
};

// Fetch available categories from Chuck Norris API
export const fetchCategories = async () => {
  try {
    const response = await axios.get('https://api.chucknorris.io/jokes/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories from Chuck Norris API', error);
    throw error;
  }
};
