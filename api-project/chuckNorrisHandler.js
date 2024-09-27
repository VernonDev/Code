// jokeHandler.js
import { fetchRandomJoke,fetchJokeByCategory,fetchCategories } from './chuckNorrisConnector.js';
import { formatJokeResponse,formatRandomResponse } from './chuckNorrisHelper.js';

// Handler: Get joke and send response
export const getJokeHandler = async (req, res) => {
  try {
    const joke = await fetchRandomJoke();
    const formattedJoke = formatJokeResponse(joke);
    res.status(200).json(formattedJoke);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch joke', error });
  }
};

// Handler: Get a random joke by category
export const getJokeByCategoryHandler = async (req, res) => {
  const category = req.params.category;
  try {
    const joke = await fetchJokeByCategory(category);
    const formattedRandomJoke = formatRandomResponse(joke);
    res.status(200).json(formattedRandomJoke);
  } catch (error) {
    res.status(500).json({ message: `Failed to fetch joke for category ${category}`, error });
  }
};

// Handler: Get available joke categories
export const getCategoriesHandler = async (req, res) => {
  try {
    const categories = await fetchCategories();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error });
  }
};

