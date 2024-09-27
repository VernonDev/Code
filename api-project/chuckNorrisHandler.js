// jokeHandler.js
import { fetchRandomJoke } from './chuckNorrisConnector.js';
import { formatJokeResponse } from './chuckNorrisHelper.js';

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


