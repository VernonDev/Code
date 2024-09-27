// jokeHelper.js
// Helper: Format joke response
export const formatJokeResponse = (joke) => {
    return {
      id: joke.id,
      joke: joke.value,
      url: joke.url,
    };
  };
  
 
  